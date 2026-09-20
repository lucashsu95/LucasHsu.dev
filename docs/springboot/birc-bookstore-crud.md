---
title: birc 實戰：從 npm 到 Book CRUD | LucasHsu.dev
description: npm 裝 birc-generator，建 bookstore 專案，生 Book CRUD 與 Flyway 遷移，再接 ConfigurationProperties、Docker、Spring Profiles 與 CORS。
head:
  - - meta
    - name: keywords
      content: birc, birc-generator, Spring Boot 4, Flyway, CRUD, record, ConfigurationProperties, Docker, Spring Profiles, CORS, MapStruct, Optional
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

<div class="mt-4 text-sm muted">檔名 parse 成表名：create_book_table → 表 <code>book</code>。寫 create_books_table 會建成 <code>books</code>，跟 Entity 對不上。</div>

`jpa.hibernate.ddl-auto` 是 `validate`，所以要先執行遷移。`migrate` 只建表。

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

## 改版要記住的四件事

### record

進出 API 用 record。Entity 不出 Controller。細節見 [Record DTO](/springboot/record-dto-projection)。

### `@ConfigurationProperties`

一組相關設定收成類別，不要到處 `@Value`。課堂看得到實檔的方式：

```bash
birc add file-upload
```

會生 `FileStorageProperties`（prefix `file-storage`）。SSO、外部 API client 也是同一套路。yml 插在 `# birc-generator:config-anchor` 後面，那一行不要刪。

完整綁定規則見 [@ConfigurationProperties](/springboot/configuration-properties)。

### Docker 與 Profiles

產生器沒有生 `application-dev.yml` / `application-prod.yml`。共用設定在一份 `application.yml`，值用 `${DB_URL}` 這類環境變數。

| 檔                        | `SPRING_PROFILES_ACTIVE` |
| ------------------------- | ------------------------ |
| `docker-compose.yml`      | `dev`                    |
| `docker-compose.prod.yml` | `prod`                   |

本機 `bootRun` 的 `DB_URL` host 是 `127.0.0.1`。容器裡的 App 讀 compose 的 `environment:`，host 必須是服務名 `db`。密碼不要寫進映像，放 `.env`。

之後若要依環境關 Swagger、改 log，再自己加 `application-prod.yml`。優先順序與切換方式見 [Spring Profiles](/springboot/spring-profiles)。

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

之後加模組：`birc add openapi`、`birc add file-upload`。

## 延伸閱讀

- [Spring Profiles：dev/prod 切換](/springboot/spring-profiles)
- [@ConfigurationProperties](/springboot/configuration-properties)
- [Record DTO Projection](/springboot/record-dto-projection)
- [@Valid 用於 Service 層](/springboot/valid-service)
- [Checkstyle / PMD / Spotless](/springboot/code-quality-tools)
