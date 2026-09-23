---
title: birc 實戰：從 npm 到 Book CRUD | LucasHsu.dev
description: npm 裝 birc-generator，建 bookstore 專案，生 Book CRUD 與 Flyway 遷移，再接檔案上傳、Docker、Spring Profiles 與 CORS。
head:
  - - meta
    - name: keywords
      content: birc, birc-generator, Spring Boot 4, Flyway, CRUD, record, Docker, Spring Profiles, CORS, MapStruct, Optional
  - - meta
    - property: og:title
      content: birc 實戰：從 npm 到 Book CRUD
  - - meta
    - property: og:description
      content: npm 安裝 birc，做出書店 CRUD，並用 .env 切 dev/prod、設定 CORS。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/springboot-cover.webp
---

# birc 實戰：從 npm 到 Book CRUD

> TL;DR：`npm i -g birc-generator` 之後，`birc create bookstore --yes` 開專案（含 ValidGroup、Spotless），`birc make Book --fields ... --migration --seed` 一次產出 CRUD 各層、Flyway migration 與 Seeder。進資料庫是兩步：`birc migrate` 建表、`birc seed` 塞示範列。CORS 只改 `CORS_ALLOWED_ORIGIN_PATTERNS`。

本機只起 MySQL（Docker），App 用 `./gradlew bootRun`。

<SlideButton
  slug="birc-bookstore-crud"
  title="birc 實戰：從 npm 到 Book CRUD"
  description="安裝產生器、生書店 API、接 Flyway，再講 record、設定綁定、dev/prod 與 CORS。"
/>

## 前置

- Node 18 以上（`node -v`）
- Docker（`docker compose version`）
- 一個空目錄，不要建在別人的 git repo 裡

Java 21 第一次跑 Gradle 時會用 toolchain 補，不必先糾結 IDE。

## 安裝

套件名是 `birc-generator`，指令是 `birc`：

```bash
npm i -g birc-generator
birc -v
```

更新：`birc update`（等價 `npm i -g birc-generator@latest`）。

WSL 裝不進去時，用 nvm 或自己的 npm prefix，不要習慣性 `sudo`。

## 開專案

```bash
mkdir -p ~/birc-lab && cd ~/birc-lab
birc create bookstore --yes
cd bookstore
```

`--yes` 使用預設設定：Docker、log4j2、ValidGroup、Spotless，並寫入 agent 文件。

`create` 一定是多模組：API 在根專案，Entity / DAO 在 `modules/bookstore-database-config`，Security 與 CORS 在 `modules/bookstore-config`。

## 起資料庫並載入 .env

```bash
docker compose up -d db
set -a && source .env && set +a
```

`./gradlew bootRun` 需要目前 shell 的資料庫環境變數。這個設定只影響目前的終端機，開新終端機時要重新執行；`.env` 只應載入自己信任的檔案。

Windows PowerShell 不支援 `set -a` 和 `source`，但仍然需要把 `.env` 載入環境變數，才能讓 `bootRun` 讀到相同設定：

```powershell
docker compose up -d db
Get-Content .env | ForEach-Object {
  if ($_ -match '^\s*([^#][^=]*)=(.*)$') {
    Set-Item -Path "Env:$($matches[1].Trim())" -Value $matches[2].Trim().Trim('"')
  }
}
```

`docker compose` 會自動讀 `.env`，但 `./gradlew bootRun` 不會。沒載入環境變數時，`application.yml` 會使用後備值：

```yaml
url: ${DB_URL:jdbc:mysql://localhost:3306/app}
username: ${DB_USERNAME:root}
password: ${DB_PASSWORD:}
```

這通常和容器中的資料庫設定不一致，導致連線失敗。

這堂不要 `docker compose up` 把 app 一起 build。Dockerfile 會在容器裡跑 Gradle，課堂會空等。

## 一次生齊：`birc make`

| 你想做的事                                           | 指令                                              |
| ---------------------------------------------------- | ------------------------------------------------- |
| 一次生 Entity、DAO、Mapper、DTO、Service、Controller | `birc make Book`                                  |
| 一次生齊 + 建表 SQL + Seeder                         | `birc make Book --fields ... --migration --seed`   |
| 只補一支 Seeder                                      | `birc make:seeder BookSeeder`                      |

`make:model --controller` 只加 Controller，不會補齊 Service / Mapper。

`--fields` 或 `--example` 有一個就是完整產出：欄位、CRUD 方法、`@Column` 都會生。差別只在欄位是你指定的，還是範本的 `id` / `name`；兩個一起加沒有額外效果。

## 課堂指定指令

```bash
birc make Book --fields title:String,isbn:String,price:BigDecimal,publishedAt:LocalDate --migration --seed
```

這行只產生檔案，什麼都還沒進資料庫。

刻意沒有 `author`。作者後面會做成 `Author` 表的關聯，現在生一個字串欄位的話，之後加 `private Author author` 就會在同一個類別裡撞名。

表名是 entity 的 snake_case：`book`。HTTP 路徑是 `/api/books`。遷移檔請用 `create_book_table`（單數）；寫 `create_books_table` 會建成表 `books`，跟 `@Table(name = "book")` 對不上。

DTO 是 Java record：`BookCreateRequest`、`BookResponse`。Entity 仍是 JPA class。CRUD 實作在 `BaseServiceImpl`，`BookServiceImpl` 只把 DAO 與 Mapper 丟進 `super`。

## 執行 Migration

`--migration` 會自動讀取 Entity 的欄位與關聯，產生對應的建表 SQL，不用手動改遷移檔。SQL 裡只有 `CREATE TABLE`，示範資料不會寫成 `INSERT`。

```bash
birc migrate
```

`jpa.hibernate.ddl-auto` 是 `validate`，所以要先執行遷移。`migrate` 只建表。

檔名 parse 成表名：`create_book_table` → 表 `book`。寫 `create_books_table` 會建成 `books`，跟 Entity 對不上。

Flyway Community 不支援 rollback；需要修正時請新增一筆遷移。重建資料庫可用 `birc migrate:reset --force`（`flywayClean` + `migrate`）——表會回來，示範列不會，要再跑一次 `birc seed`。

只想清空 schema、不重建，用 `birc db:wipe`（只跑 `flywayClean`）。

### `No Flyway database plugin found to handle jdbc:mysql`

Flyway 的資料庫支援是外掛，少了 MySQL 那顆就報這個。加在**根** `build.gradle` 的 `buildscript`：

```groovy
buildscript {
    dependencies {
        classpath "org.flywaydb:flyway-mysql"
    }
}
```

放進一般的 `dependencies` 沒用，Flyway 的 Gradle task 跑在 buildscript 的 classpath 上。

## 塞示範資料：`birc seed`

`--seed` 產的是 Java Seeder，不是 SQL。有 Entity 時會照欄位帶 `setXxx`：

```java
public class BookSeeder {
    public void run() {
        Book book = new Book();
        book.setTitle("Domain-Driven Design");
        book.setIsbn("9780321125217");
        // price / publishedAt ...
        dao.save(book);
    }
}
```

執行：

```bash
birc seed
```

所以完整流程是三步，不是兩步：

```bash
birc make Book --fields ... --migration --seed   # 只產檔案
birc migrate                                    # 只建表
birc seed                                       # 塞示範列
```

跑完 `migrate` 就去打 `GET /api/books` 會拿到空陣列，那不是壞掉，是還沒 `seed`。事後要補 Seeder 用 `birc make:seeder BookSeeder`（命名跟 Laravel 一樣帶後綴）。

## 課堂必改：否則 API 全是 401

`create` 一定帶 `SecurityConfig`。除了 swagger 與 health，其餘要登入。今天還沒做登入，先放行書本 API。

檔案：`modules/bookstore-config/src/main/java/tw/edu/ntub/birc/bookstore/config/SecurityConfig.java`

```java
public static final List<String> PUBLIC_PATHS = List.of(
        "/swagger-ui/**",
        "/v3/api-docs/**",
        "/actuator/health",
        "/actuator/health/**",
        "/api/books",
        "/api/books/**"
);
```

這是課堂捷徑。正式專案不要把寫入端點長期放在這裡。

## 啟動並打 API

```bash
./gradlew bootRun
```

Windows 用 `.\gradlew.bat bootRun`。

```bash
curl -s -X POST http://localhost:8080/api/books \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Domain-Driven Design",
    "isbn": "9780321125217",
    "price": 1800,
    "publishedAt": "2003-08-30"
  }'
```

先打一次 `GET /api/books`：看得到 `birc seed` 的示範資料，才表示 seed 真的生效了，空陣列就是漏跑。接著 `GET /api/books/1`、`PUT`、`DELETE`。id 不存在會走專案內的 `NotFoundException`，回 404。

## ValidGroup

`--yes` 會生 `validation/ValidGroup.java`，提供 `Create`、`Update`、`Delete`、`Submit` 四組 Bean Validation group。

`birc make Book --fields ...` 之後：

- Controller：`@Validated(ValidGroup.Create.class)` / `@Validated(ValidGroup.Update.class)`
- `BookCreateRequest` 每個欄位：`@NotNull(groups = {ValidGroup.Create.class, ValidGroup.Update.class})`

要用 `@Validated`，不是 `@Valid`；`@Valid` 不支援 groups。預設新增與更新都必填，若更新可省略 `isbn`，將它的 group 改成只含 `Create` 即可。

`Delete` 和 `Submit` 是預留的群組；預設 CRUD 不需要使用，但不要刪除介面。

缺少 `title` 的 POST 會回 400，不會進入 Service。若要統一驗證錯誤格式，需另外處理 `MethodArgumentNotValidException`。

## Spotless

`--yes` 會加入 Spotless，負責 Java 排版、清除 unused import、移除行尾空白與補檔案結尾換行。不負責命名或潛在 bug。

```bash
./gradlew spotlessApply    # 直接改檔，commit 前跑
./gradlew spotlessCheck    # 只檢查，CI 用這個
```

Windows 用 `.\gradlew.bat`。CI 不要跑 `spotlessApply`。

細節見 [@Valid 用於 Service 層](/springboot/valid-service)、[Checkstyle / PMD / Spotless](/springboot/code-quality-tools)。

## 進階：加上作者（Author）

Book API 已經能跑了。接下來加一個作者表，讓每本書可以綁定作者，順便練習 MapStruct 處理 Entity 關聯。

### 建 Author Entity

```bash
birc make Author --fields name:String,birthYear:Integer,nationality:String --migration --seed
```

- `--migration` 讀 Entity 產生建表 SQL。Author 本身沒有關聯，就是單純一張表
- `--seed` 產生 `AuthorSeeder.java`，內容是 `setXxx(...)`，不是 `INSERT`

建表再塞資料：

```bash
birc migrate   # 建 author 表
birc seed      # 執行 AuthorSeeder
```

Seeder 長這樣，遷移檔裡不會有這幾列：

```java
author.setName("村上春樹");
author.setBirthYear(1949);
author.setNationality("日本");
```

`make Author` 也生了 Controller，所以會多一組 `/api/authors`。要打它就把 `/api/authors`、`/api/authors/**` 一起加進 `PUBLIC_PATHS`，否則一律 401。

### 給 Book 表加 FK 欄位

```bash
birc make:migration add_author_id_to_book_table
birc migrate
```

欄位名是 `{ref}_id`、而且 `{ref}` 的表找得到時，才會一併產生 `ADD CONSTRAINT ... FOREIGN KEY`。所以順序有前提：`author` 表要先建好。表還不存在時只會給一個 `BIGINT`，不加 constraint。

### 改欄位型別：`change_{column}_on_{table}_table`

`make:migration` 認檔名：`create_` 建表、`add_` 加欄、`change_` 改型別。

`change_*` 出 `MODIFY COLUMN`，新型別只讀 Entity。Entity 上沒有那個欄位就失敗、不寫檔——猜錯的 MODIFY 會截斷既有資料。所以先改 Java 型別，再產生遷移。

課堂在 `Book.java` 加一個用不到的欄，DTO 不必動：

```java
@Column(name = "stock")
private Integer stock;
```

然後：

```bash
birc make:migration add_stock_to_book_table
birc migrate
```

打開 SQL，應是 `ADD COLUMN stock INT NULL`。把 `Integer` 改成 `Long`，再：

```bash
birc make:migration change_stock_on_book_table
birc migrate
```

打開 SQL，應是 `MODIFY COLUMN stock BIGINT NULL`。

故意打不存在的欄位：

```bash
birc make:migration change_foo_on_book_table
```

應失敗、不寫檔。改完 Entity 先停 `bootRun` 再 migrate；`ddl-auto: validate` 對不上會起不來。

### 軟刪：`--soft-delete`

硬刪是 `DELETE FROM`。軟刪多一欄 `deleted_at`：刪的時候填時間戳，列還在，查詢當它不存在。`deleteById` 不用改。沒有 restore / withTrashed。

在 `make` 時加旗標，Entity 跟 SQL 一次到位。不要對已有表跑 `make:migration add_deleted_at_to_book_table`：`deleted_at` 不是 Entity 欄位，產生器會退回 `VARCHAR(50)`。

```bash
birc make Review --fields content:String --migration --soft-delete
birc migrate
```

Entity 會有 Hibernate `@SoftDelete(columnName = "deleted_at", strategy = TIMESTAMP)`，建表 SQL 多 `deleted_at TIMESTAMP NULL`。

`PUBLIC_PATHS` 放行 `/api/reviews`、`/api/reviews/**`，重啟後自己打一遍：

```bash
curl -s -X POST http://localhost:8080/api/reviews \
  -H 'Content-Type: application/json' \
  -d '{"content":"好看"}'
curl -s http://localhost:8080/api/reviews
curl -s -X DELETE http://localhost:8080/api/reviews/1
curl -s http://localhost:8080/api/reviews      # 空陣列
curl -s http://localhost:8080/api/reviews/1    # 404
```

列還在：

```bash
docker compose exec db mysql -u"$DB_USER" -p"$DB_PASSWORD" "$DB_DATABASE" \
  -e "SELECT id, content, deleted_at FROM review;"
```

`deleted_at` 有值。GET 是 404，不是因為列被清掉。

### 改 Book Entity 加關聯

在 Book.java 加上 Author 的關聯欄位：

```java
@Entity
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)   // [!code ++]
    @JoinColumn(name = "author_id")  // [!code ++]
    private Author author;  // [!code ++]

    // ... 其他欄位
}
```

`@ManyToOne` 建立多對一關聯，`FetchType.LAZY` 避免預載入。

### 預設的 flat mapping

birc 預設生成的 Mapper 是 flat mapping，不處理關聯：

```java
@Mapper(componentModel = "spring")
public interface BookMapper {
    BookResponse toResponse(Book book);
    Book toEntity(BookCreateRequest request);
}
```

這樣 `BookResponse.authorName` 會是 null，因為 MapStruct 不知道要去抓關聯的 Author。

### 手動加 `@Mapping`

如果要帶出作者名稱，手動加 `@Mapping`：

```java {3,6}
@Mapper(componentModel = "spring")
public interface BookMapper {
    @Mapping(source = "author.name", target = "authorName") // ← 讀出來：帶作者名稱
    BookResponse toResponse(Book book);

    @Mapping(target = "author", ignore = true) // ← 寫進去：先不處理
    Book toEntity(BookCreateRequest request);
}
```

帶關聯欄位出去就走這條：宣告在 Mapper，Service 不必寫程式。

`author_id` 可以留空，所以 `book.getAuthor()` 可能是 `null`，但這條 `@Mapping` 不會 NPE——MapStruct 對 `author.name` 這種巢狀來源會自己補 null 檢查，沒作者就是 `authorName: null`。不需要在 Service 再包一層 `Optional.ofNullable(...)`。

後面「Optional 的實戰用法」講的是另一件事：`Optional` 管「這筆資料存不存在」，`@Mapping` 管「欄位怎麼搬」。

`BookResponse` 要先加 `authorName` 欄位（birc 不會自己改 record）：

```java
public record BookResponse(
    Long id,
    String title,
    String authorName,  // [!code ++]
    String isbn,
    BigDecimal price,
    LocalDate publishedAt
) {}
```

### POST 怎麼指定作者

上面的 `ignore = true` 表示寫入方向沒接，新建的書永遠沒有作者。前端只會傳 id，所以 DTO 收 `authorId`，再讓 Mapper 換成 Author：

```java
public record BookCreateRequest(
    String title,
    // isbn, price, publishedAt...
    Long authorId   // 不填就是沒作者
) {}
```

```java
@Mapping(source = "authorId", target = "author")
Book toEntity(BookCreateRequest request);

default Author toAuthor(Long id) {
    if (id == null) {
        return null;
    }
    Author author = new Author();
    author.setId(id);   // 寫入 book 只需要 author_id 這個值
    return author;
}
```

這個寫法不會去查 `author` 表。傳不存在的 id 會被資料庫的 FK constraint 擋下來，想先回 400 就自己在 Service 檢查一次。

### 查詢要帶關聯

用預設的 `findAll()` 查不到 Author（`author` 是 LAZY，不會預載入）。用 `@EntityGraph` 指定要載入的關聯：

```java
public interface BookDAO extends BaseDAO<Book> {
    @EntityGraph(attributePaths = {"author"})
    List<Book> findAll();

    @EntityGraph(attributePaths = {"author"})
    Optional<Book> findById(Long id);
}
```

`@EntityGraph` 會覆蓋預設的 fetch 策略，一次把關聯資料載入，避免 N+1 查詢問題。不需要手寫 JPQL，也不需要改 Service 層——DAO 方法簽名不變，Service 照樣呼叫 `bookDAO.findById(id)`。

### 同一本書，兩種回傳形狀

前面加的 `stock` 只給後台看，一般讀者不該拿到。同一個 Entity、看的人不同就少一個欄位，這在舊專案很常見。

**舊寫法：手動 `ObjectData.add`**

```java
private ObjectData bookObject(Book book, boolean admin) {
    ObjectData data = new ObjectData()
            .add("id", book.getId())
            .add("title", book.getTitle())
            .add("isbn", book.getIsbn())
            .add("price", book.getPrice())
            .add("publishedAt", book.getPublishedAt());
    if (admin) {
        data.add("stock", book.getStock());
    }
    return data;
}
```

每個欄位都要抄一次 key 字串。Entity 加欄位時這裡不會報錯，只是 JSON 少一個 key；key 打錯字也要等前端拿不到值才會發現。回傳型別是一袋 Map，Swagger 看不出裡面有什麼。

**新寫法：Response record + Mapper**

`BookResponse` 多一個 `stock`。欄位是 `null` 時不輸出這個 key，這樣一般讀者的 JSON 跟舊寫法一樣沒有 `stock`：

```java
public record BookResponse(
    Long id,
    String title,
    String authorName,
    String isbn,
    BigDecimal price,
    LocalDate publishedAt,
    @JsonInclude(JsonInclude.Include.NON_NULL) Long stock  // [!code ++]
) {}
```

`@JsonInclude` 只標在 `stock` 上，不要標在整個 record。標在 record 上，沒有作者的書連 `authorName` 都會一起消失。

Mapper 開兩個方法：一般讀者用的忽略 `stock`，後台用的不忽略。

```java
@Mapper(componentModel = "spring")
public interface BookMapper {
    @Mapping(source = "author.name", target = "authorName")
    @Mapping(target = "stock", ignore = true) // ← 一般讀者：不帶庫存
    BookResponse toResponse(Book book);

    @Mapping(source = "author.name", target = "authorName")
    BookResponse toAdminResponse(Book book); // ← 後台：全部帶

    // toEntity ...
}
```

`id`、`title`、`isbn`、`price`、`publishedAt`、`stock` 都沒寫，因為 MapStruct 在編譯時比對名字：`Book` 有 `getTitle()`、`BookResponse` 有 `title`，就自動對上。要寫 `@Mapping` 的只有兩種：名字對不上的（`author.name` → `authorName`），以及刻意不帶的（`stock`）。

編譯後 MapStruct 產生的程式大致長這樣，這就是原本手寫的那段：

```java
public BookResponse toResponse(Book book) {
    if (book == null) {
        return null;
    }
    return new BookResponse(
            book.getId(),
            book.getTitle(),
            book.getAuthor() == null ? null : book.getAuthor().getName(),
            book.getIsbn(),
            book.getPrice(),
            book.getPublishedAt(),
            null);                 // stock 被 ignore
}

public BookResponse toAdminResponse(Book book) {
    // ... 同上，最後一格是 book.getStock()
}
```

產生出來的檔在 `build/generated/sources/annotationProcessor/`，看不懂某個欄位為什麼是 `null` 時，直接打開那支 `BookMapperImpl.java`。

Service 只決定用哪一支。`BaseServiceImpl` 繼承下來的 `mapper` 型別是 `BaseMapper`，看不到 `toAdminResponse`，所以 `BookServiceImpl` 自己留一個 `BookMapper`：

```java
@Service
public class BookServiceImpl
        extends BaseServiceImpl<Book, Long, BookCreateRequest, BookResponse>
        implements BookService {

    private final BookMapper bookMapper;  // [!code ++]

    public BookServiceImpl(BookDAO bookDAO, BookMapper mapper) {
        super(bookDAO, mapper);
        this.bookMapper = mapper;  // [!code ++]
    }

    @Override
    public BookResponse getForAdmin(Long id) {
        Book book = dao.findById(id)
            .orElseThrow(() -> new NotFoundException("查無資料，id：" + id));
        return bookMapper.toAdminResponse(book);
    }
}
```

`BookService` 介面加上 `getForAdmin`。原本繼承來的 `getById` 走 `toResponse`，一般讀者拿不到 `stock`；預設就是安全的那一邊，後台要多開一支才看得到。

新增欄位時，`Book` 跟 `BookResponse` 各加一個同名欄位，兩支方法下次編譯都會帶上，不用回來改 Mapper。

**排除兩個以上的欄位**

一個欄位寫一行，疊在同一個方法上。MapStruct 沒有 `ignore = {"stock", "isbn"}` 這種寫法：

```java
@Mapping(source = "author.name", target = "authorName")
@Mapping(target = "stock", ignore = true)
@Mapping(target = "isbn", ignore = true)
BookResponse toResponse(Book book);
```

`BookResponse` 裡的 `isbn` 也要標 `@JsonInclude(JsonInclude.Include.NON_NULL)`，不然 JSON 會出現 `"isbn": null`。

同一組排除要用在好幾個方法時，把它們收進一個自訂註解，MapStruct 會展開：

```java
@Retention(RetentionPolicy.CLASS)
@Target(ElementType.METHOD)
@Mapping(target = "stock", ignore = true)
@Mapping(target = "isbn", ignore = true)
public @interface HideAdminFields {
}
```

```java
@Mapping(source = "author.name", target = "authorName")
@HideAdminFields
BookResponse toResponse(Book book);
```

以後後台多一個欄位，只改 `HideAdminFields` 一處。

最省事的是讓一般讀者的 record 根本沒有這些欄位。MapStruct 只填目標有的欄位，來源多出來的 `stock`、`isbn` 直接略過，不用寫任何 `ignore`：

```java
public record PublicBookResponse(
    Long id,
    String title,
    String authorName,
    BigDecimal price,
    LocalDate publishedAt
) {}
```

```java
@Mapping(source = "author.name", target = "authorName")
PublicBookResponse toPublicResponse(Book book);
```

不用 `@JsonInclude`，Swagger 上也看得出一般讀者拿不到哪些欄位。代價是多一支 record。要藏的欄位超過一兩個，就走這條。

跟 Laravel Resource 對照：

| Laravel | MapStruct |
| --- | --- |
| `except(['stock'])` | `@Mapping(target = "stock", ignore = true)` |
| `only(['id', 'title'])` | `@BeanMapping(ignoreByDefault = true)`，再逐個 `@Mapping(target = "id")` 點名 |
| `$this->when($admin, $this->stock)` | 兩支方法，Service 選一支；或 `@Mapping(target = "stock", conditionExpression = "java(admin)")` 搭配 `@Context boolean admin` |

兩種身分差很多欄位、或一般讀者根本不該知道那些欄位存在時，拆成兩支 record（`BookResponse`、`AdminBookResponse`），不要全塞進同一支靠 `null` 藏。

## Optional 的實戰用法

Spring Data JPA 的 `.findById()` 回傳 `Optional<T>`，不是 null。這是 Java 8 引入的容器型別，用來表達「可能有值、可能沒有」。

### 舊寫法 vs 新寫法

**舊寫法（不推薦）：**

```java
Book book = bookDAO.findById(id);
if (book == null) {
    throw new NotFoundException("Book not found");
}
return bookMapper.toResponse(book);
```

**新寫法（用 Optional）：**

```java
Book book = bookDAO.findById(id)
    .orElseThrow(() -> new NotFoundException("Book not found"));
return bookMapper.toResponse(book);
```

birc 生成的 `BaseServiceImpl` 已經用 Optional：

```java
public T findById(ID id) {
    return dao.findById(id)
        .orElseThrow(() -> new NotFoundException(
            entityClass.getSimpleName() + " not found: " + id));
}
```

### 常用方法

```java
// 有值就執行，沒有就跳過
bookDAO.findById(id).ifPresent(book -> {
    log.info("Found: {}", book.getTitle());
});

// 有值就轉換，沒有就回傳預設值
String title = bookDAO.findById(id)
    .map(Book::getTitle)
    .orElse("Unknown");

// 有值就轉換，沒有就丟例外
Book book = bookDAO.findById(id)
    .orElseThrow(() -> new NotFoundException("Not found"));
```

Optional 的重點：**不要回傳 null，用 Optional 包起來**。呼叫端決定怎麼處理「沒有」的情況。

## 改版要記住的幾件事

### record

進出 API 用 record。Entity 不出 Controller。細節見 [Record DTO](/springboot/record-dto-projection)。

### 檔案上傳

```bash
birc add file-upload
```

會生 `FileStorageService`、`FileUploadController`（`/api/files`）。yml 插在 `# birc-generator:config-anchor` 後面，那一行不要刪。沒有自己的表。檔丟在 `./uploads`（`FILE_STORAGE_PATH`），不要 commit。`SecurityConfig` 再放行 `/api/files`、`/api/files/**`，然後重啟。

```bash
curl -s -F "file=@./cover.png" http://localhost:8080/api/files
# {"success":true,"data":"a1b2c3d4-....png"}
curl -s -o cover-back.png http://localhost:8080/api/files/a1b2c3d4-....png
curl -s -X DELETE          http://localhost:8080/api/files/a1b2c3d4-....png
```

回傳的是存進去的檔名（UUID + 原副檔名）。Controller 這裡回 `Map`，不是 `Result`。

`store()` 會擋空檔、超過 10MB、副檔名不在白名單、副檔名跟檔頭簽章對不起來（`fake.png` 其實是文字）、以及路徑想跳出 `./uploads`。要收書封用 `store(file, "covers")`，回傳 `covers/uuid.png`，不要自己拼路徑。

### Docker 與 Profiles

三種啟動，選一個：

| 何時 | 怎麼開 | 誰在跑 App |
| --- | --- | --- |
| 每天寫程式（這堂課） | `docker compose up -d db` 再 `./gradlew bootRun` | 本機 JVM。只起 MySQL，改完重啟、能 debug |
| 本機整包容器 | `docker compose up`（讀 `docker-compose.yml`） | 容器裡 **build** 映像，慢；db 對外映射、開 JDWP 5005 |
| 測試機 / 正式機 | `docker compose -f docker-compose.prod.yml up -d` | 從 Harbor **pull**，不在機器上 build；db 不對外開 port |

沒加 `-f` 就是那份沒有 `.prod` 的。課堂不要 `docker compose up` 把 app 也建進去。

產生器沒有生 `application-dev.yml` / `application-prod.yml`。共用設定在一份 `application.yml`，值用 `${DB_URL}` 這類環境變數。

| 檔                        | `SPRING_PROFILES_ACTIVE` |
| ------------------------- | ------------------------ |
| `docker-compose.yml`      | `dev`                    |
| `docker-compose.prod.yml` | `prod`                   |

本機 `bootRun` 的 `DB_URL` host 是 `127.0.0.1`。容器裡的 App 讀 compose 的 `environment:`，host 必須是服務名 `db`。密碼不要寫進映像，放 `.env`。

之後若要依環境關 Swagger、改 log，再自己加 `application-prod.yml`。優先順序與切換方式見 [Spring Profiles](/springboot/spring-profiles)。

### Harbor 與 GitLab CI

實驗室的 CI 都會把映像推到 Harbor。沒有 `birc harbor`——Harbor 是倉庫，指令是生 `.gitlab-ci.yml`：

```bash
birc add gitlab-ci
```

模板帶進這個專案的名字，不是寫死 teaching-platform。`IMAGE_NAME` 是 `$HARBOR_URL/<專案>/<專案>_app`，伺服器目錄 `/opt/<專案>/backend`。Harbor 位址、帳密、要部哪台機器，全部是 GitLab CI/CD Variables，不要寫進檔，也不要用 Docker build-arg。

會問 GitLab 專案路徑（CI 只在那個 repo 跑，可留空）。

| 變數 | 用途 |
| --- | --- |
| `HARBOR_URL` / `HARBOR_USER` / `HARBOR_PASSWORD` | 登入 Harbor、push 映像 |
| `BETA_*`（USER / HOST / SSH_KEY / SSH_HOST_KEY） | `development` 部到測試機 |
| `ONLINE_*` | `main` 部到正式機 |

`SSH_HOST_KEY` 用 `ssh-keyscan -t ed25519 <host>` 的輸出，沒填 pipeline 直接失敗。Password 走 stdin 餵 `docker login`。

`development` / MR → `build-beta` + `deploy-beta`（tag `beta-<sha>`）。`main` → `build-online`，`deploy-online` 要在 GitLab 手動按。

CI 只改伺服器 `.env` 的 `APP_TAG`。第一次部署要自己先填 `DOCKER_IMAGE`，再讓 pipeline 去 `pull` / `up -d --no-deps app`。

### Sentry

```bash
birc add sentry
```

DSN 從 [sentry.ntubimdbirc.tw](https://sentry.ntubimdbirc.tw/) 複製，放 `.env` 的 `SENTRY_DSN`，空白 = 不送。compose prod 已經接了這個鍵。

```
SENTRY_DSN=https://xxxx@sentry.ntubimdbirc.tw/1
```

會送沒接住的 5xx。4xx、`NotFoundException`、驗證失敗會被 `SentryConfig` 的 `BeforeSendCallback` 丟掉——`ProjectException` 看 `getHttpStatus()` 是不是 4xx，之後自己加例外不必改這份設定。

課堂驗：暫時丟 `RuntimeException`，Sentry 要看得到；`GET /api/books/999` 的 404 不該出現。

### CORS

只改環境變數，重啟 Spring：

```bash
CORS_ALLOWED_ORIGIN_PATTERNS=http://localhost:5173
```

多個來源用逗號分隔，不要尾斜線或 `*`。`SecurityConfig` 已經接上 `CorsConfigurationSource`，不要再用 `WebMvcConfigurer` 設定 CORS。

空白 = 不開放跨來源。curl 不受 CORS 限制；瀏覽器從 Vite 打 API 才會。

## 指令速查

```bash
npm i -g birc-generator
birc create bookstore --yes && cd bookstore
docker compose up -d db
set -a && source .env && set +a

birc make Book --fields title:String,isbn:String,price:BigDecimal,publishedAt:LocalDate --migration --seed
# 改 PUBLIC_PATHS、CORS
birc migrate
birc seed
./gradlew bootRun
./gradlew spotlessApply
```

之後加模組：`birc add auth`、`birc add permission`、`birc add clockin`、`birc add file-upload`、`birc add gitlab-ci`（Harbor）、`birc add sentry`。`--yes` 已經有 OpenAPI，不必再 add。沒有 `birc login` / `birc checkin` 這兩個指令。

## 登入：`birc add auth`

`--yes` 不會勾帳號登入。要自己加：

```bash
birc add auth
```

會生 `auth_users` 表、`POST /api/auth/login`、`GET /api/auth/me`，以及掛 JWT 的 filter。專案已經有 `V1__create_book_table.sql` 的話，把產生的 `V1__create_auth_users_table.sql` 改成還沒用過的版本號，再 `birc migrate`。

測試裡的 tester 走 `create-drop`，進不了你的 MySQL。自己寫一個 `AuthUserSeeder`，`birc seed` 才跑：`account=tester`、`password=passwordEncoder.encode("secret")`、`authorities="user:read"`。

```bash
curl -i -X POST http://localhost:8080/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"account":"tester","password":"secret"}'
```

成功時 JWT 在回應標頭 `X-Auth-Token`，不在 body。之後的請求用 `Authorization: Bearer <token>`。沒帶 → 401；權限不夠 → 403。

`JWT_SECRET` 寫在 `.env`，沒有就啟動時產生一把。密碼要先用 `PasswordEncoder` 編碼再塞進 `auth_users`。

## 簽到：`birc add clockin`

```bash
birc add clockin
```

不建自己的表。`ClockInClient` 用帳密去中心簽到系統登入拿 JWT，再把簽到、簽退、查紀錄轉打出去。帳密放環境變數，不要寫進 yml：

```
BIRC_CLOCKIN_ACCOUNT=...
BIRC_CLOCKIN_PASSWORD=...
```

預設打 `140.131.115.44:50035`，要換再設 `BIRC_CLOCKIN_BASE_URL`。

```bash
curl -s -X POST http://localhost:8080/api/clockin/{學號}     # 簽到
curl -s -X PATCH http://localhost:8080/api/clockin/clockout/{帳號}
curl -s http://localhost:8080/api/clockin/today              # 今天還沒簽的人
```

中心系統一律回 HTTP 200，成敗看 body 的 `result`；權限過期是 errorCode `User - AccessDenied`，不是 401。Client 會自己重登再打一次。

課堂如果還沒放行 `/api/clockin/**`，這些端點會 401。要打它就加進 `PUBLIC_PATHS`，或先裝 auth 再帶 Bearer。

## 權限：`birc add permission`

沒有完整 RBAC。這組只給你一個註解、一個 Aspect。要先有 `birc add auth`。

```bash
birc add permission
```

會生 `RequirePermission` 跟 `PermissionAspect`，gradle 接 `spring-boot-starter-aspectj`。標在 Controller 方法上，`value` 是權限代碼字串，例如 `"book:delete"`。Aspect 從 SecurityContext 拿出 authorities **原樣比對**，沒有 `ROLE_` 前綴。

`auth_users.authorities` 是逗號分隔（`user:read,book:delete`），跟 JWT claim 同一組字串。Aspect 不查資料庫，只看 token。改表之後要再登入一次，舊 JWT 不會變。

課堂在 `BookController.delete` 加上 `@RequirePermission("book:delete")`，重啟 `bootRun`。先 POST 一本當砲灰，用回傳的 id（不要刪 seed 的 1），依序打：

```bash
# 1. 沒帶 token（PUBLIC_PATHS 進得了 Controller）→ 403
curl -i -X DELETE http://localhost:8080/api/books/$ID

# 2. tester 只有 user:read，帶 JWT 仍 403
curl -si -X POST http://localhost:8080/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"account":"tester","password":"secret"}'
curl -i -X DELETE http://localhost:8080/api/books/$ID \
  -H "Authorization: Bearer $TOKEN"
```

然後改表，再登入拿新 token：

```sql
UPDATE auth_users SET authorities='user:read,book:delete' WHERE account='tester';
```

DELETE 才 200。舊 token 裡還是 `user:read`。

## 延伸閱讀

- [Spring Profiles：dev/prod 切換](/springboot/spring-profiles)
- [@ConfigurationProperties](/springboot/configuration-properties)
- [Record DTO Projection](/springboot/record-dto-projection)
- [@Valid 用於 Service 層](/springboot/valid-service)
- [Checkstyle / PMD / Spotless](/springboot/code-quality-tools)
