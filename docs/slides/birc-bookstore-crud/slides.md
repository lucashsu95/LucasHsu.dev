---
theme: seriph
title: Springboot4 實戰 — 從 npm 到 Book CRUD
layout: cover
ui:
  nav: false
transition: slide-left
mdc: true
comark: true
download: true
lineNumbers: true
routerMode: hash
colorSchema: dark
fonts:
  sans: "Inter"
  mono: "JetBrains Mono"
css: unocss
stylesheet: ./style.css
drawings:
  persist: true
  enabled: true
  presenterOnly: false
selectable: true
record: user
seoMeta:
  ogImage: https://lucashsu95.github.io/LucasHsu.dev/images/springboot-cover.webp
  ogTitle: Springboot4 實戰 — 從 npm 到 Book CRUD
  description: npm 安裝 birc-generator，用 birc 生 Spring Boot 4 書店 CRUD，並講
    record、ConfigurationProperties、Docker、Profiles 與 CORS
exportFilename: birc-bookstore-crud
---

<div class="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#0d1117] to-[#14231a]"></div>

<div class="relative z-10">
  <p class="font-mono text-sm text-[#7ee787] mb-6">$ npm i -g birc-generator</p>
  <h1 class="text-5xl">
    <span class="accent-spring">Springboot4</span>
    <span class="text-white"> 實戰</span>
  </h1>
  <p class="mt-4 text-xl text-gray-300 font-mono">
    <span class="muted">//</span> 從 npm 裝產生器，做到一本 Book 的真 CRUD
  </p>
  <div class="mt-14 grid grid-cols-4 gap-3 font-mono text-sm text-center">
    <div class="concept-card"><strong>create</strong><br><span class="muted">開專案</span></div>
    <div class="concept-card"><strong>make</strong><br><span class="muted">CRUD 骨架</span></div>
    <div class="concept-card"><strong>migrate</strong><br><span class="muted">Flyway</span></div>
    <div class="concept-card"><strong>profiles</strong><br><span class="muted">dev / prod</span></div>
  </div>
</div>

<!--
課堂約 70–90 分鐘。一邊講一邊讓學生跟著打指令。
-->

---
layout: default
hideInToc: true
---

<p class="font-mono text-xs text-gray-500"><span class="accent-green">$</span> cat syllabus.md</p>

# 今天會做完什麼

<div class="grid grid-cols-2 gap-4 mt-7">
  <div v-click class="concept-card"><strong>01 / 安裝</strong><br><span class="muted">npm i -g birc-generator，確認 birc 能跑</span></div>
  <div v-click class="concept-card"><strong>02 / 開專案</strong><br><span class="muted">birc create bookstore --yes</span></div>
  <div v-click class="concept-card"><strong>03 / Book CRUD</strong><br><span class="muted">make + Flyway，真的打得到 API</span></div>
  <div v-click class="concept-card"><strong>04 / 改版</strong><br><span class="muted">ValidGroup、Spotless、record、Docker、CORS</span></div>
</div>

<div v-click class="mt-6 terminal-card text-sm">
  <span class="accent-orange">目標：</span>下課時本機有一個能增刪改查的書店 API，而且知道 .env 怎麼切環境。
</div>

---
layout: default
---

# 先對齊工具版本

| 要有 | 版本 | 用來幹嘛 |
| --- | --- | --- |
| Node | 18 以上 | 跑 `birc` |
| Docker | 能跑 `docker compose` | 只起 MySQL |
| Java | 21（之後 Gradle 會抓 toolchain） | Spring Boot 4.0.5 |

<div class="mt-6 terminal-card text-sm">
  <p class="terminal-label">CHECK</p>
  <div><span class="cmd">node -v</span></div>
  <div><span class="cmd">docker compose version</span></div>
</div>

<div v-click class="mt-4 muted text-sm">
  Java 現在不用先裝齊。第一次 <code>./gradlew bootRun</code> 會靠 toolchain 補。
</div>

---
layout: section
transition: fade
---

<p class="font-mono accent-orange">PART 01</p>

# 從 npm 裝 birc

<p class="font-mono muted">CLI 叫 birc，套件名是 birc-generator</p>

---
---

# 為什麼不手抄舊專案？

以前開 BIRC 後端，常是把舊 Controller 改名再貼一次。套件路徑改到一半、DAO 繼承寫錯、例外類從 starter 抓來用，之後還得再修。

<div class="grid grid-cols-2 gap-4 mt-6">
  <div v-click class="concept-card"><strong>create</strong><br><span class="muted">多模組 Spring Boot 4 骨架</span></div>
  <div v-click class="concept-card"><strong>make</strong><br><span class="muted">一組 CRUD 該有的層</span></div>
</div>

<div v-click class="mt-6 terminal-card text-sm">
  安裝入口只有一個：<code>npm i -g birc-generator</code>
</div>

---
---

# 安裝

```bash
npm i -g birc-generator
birc -v
birc -h
```

<div class="mt-5 terminal-card text-sm">
  <p class="terminal-label">WSL / macOS 權限</p>
  <div>裝不進去時，先確認你用 nvm 或自己的 prefix，不要習慣性 sudo。</div>
  <div class="mt-2">更新用 <code>birc update</code>，等價 <code>npm i -g birc-generator@latest</code>。</div>
</div>

---
---

# 指令地圖（今天會用到的）

| 指令 | 做什麼 |
| --- | --- |
| `birc create` | 開多模組專案 |
| `birc make` | Entity + DAO + Mapper + DTO + Service + Controller |
| `birc make:model --migration` | Entity + DAO，順便生 Flyway |
| `birc make:migration` | 只生 SQL |
| `birc migrate` | 真的跑 `flywayMigrate` |
| `birc add` | 之後再加 email / openapi / file-upload |

<div v-click class="mt-5 text-sm font-mono accent-orange">
  一次把 Mapper、Service、Controller 都生好：<code>birc make</code>
</div>

---
layout: section
transition: fade
---

<p class="font-mono accent-orange">PART 02</p>

# 開一個 bookstore

<p class="font-mono muted">create 一定是多模組，沒有單模組選項</p>

---
---

# 建專案

挑一個空目錄（不要建在別人的 git repo 裡）：

```bash
mkdir -p ~/birc-lab && cd ~/birc-lab
birc create bookstore --yes
cd bookstore
```

<div class="mt-5 grid grid-cols-2 gap-4 text-sm">
  <div class="concept-card"><strong>--yes</strong><br><span class="muted">不問了。docker / log4j2 / ValidGroup / Spotless 預設勾</span></div>
  <div class="concept-card"><strong>package</strong><br><span class="muted">bookstore → tw.edu.ntub.birc.bookstore</span></div>
</div>

<div v-click class="mt-4 muted text-sm">
  想自己勾功能就拿掉 <code>--yes</code>，互動選。課堂為了同步，用 <code>--yes</code>。
</div>

---
---

# 資料夾長這樣

```
bookstore/
  Application.java
  build.gradle / settings.gradle / gradlew
  .bircrc.json          ← birc 找專案根用這個
  .env / .env.example   ← create 有勾 docker 才會複製
  docker-compose.yml
  docker-compose.prod.yml
  modules/bookstore-config
  modules/bookstore-database-config
```

<div class="mt-5 terminal-card text-sm">
  API 在根專案。Entity / DAO 在 <code>*-database-config</code>。Security、CORS 在 <code>*-config</code>。
</div>

---
---

# 先起資料庫，不要整包 compose up

容器只跑資料庫。App 用本機 `bootRun`，比較快、也好 debug。

```bash
docker compose up -d db
set -a && source .env && set +a
```

PowerShell：

```powershell
docker compose up -d db
Get-Content .env | ForEach-Object {
  if ($_ -match '^\s*([^#][^=]*)=(.*)$') {
    Set-Item -Path "Env:$($matches[1].Trim())" -Value $matches[2].Trim().Trim('"')
  }
}
```

<div v-click class="mt-4 text-sm accent-orange">
  <code>docker compose</code> 會自己讀專案裡的 <code>.env</code> 來起 MySQL。<code>bootRun</code> 不會。沒 <code>source</code> 時 JVM 用 yml 後備值：庫名 <code>app</code>、帳號 <code>root</code>、密碼空白，跟容器裡的庫名和隨機帳密對不上。
</div>

---
layout: section
transition: fade
---

<p class="font-mono accent-orange">PART 03</p>

# 生一本 Book 的 CRUD

<p class="font-mono muted">骨架用 make，表用 Flyway，不要靠 ddl-auto:update</p>

---
---

# 一次生齊：birc make

| 指令 | 會寫出什麼 |
| --- | --- |
| `birc make Book` | Entity、DAO、Mapper、DTO、Service、Controller |
| `birc make:model Book --migration` | Entity、DAO，加上 Flyway |
| `birc make:controller Book` | 只有 Controller |

<div v-click class="mt-5 terminal-card text-sm">
  <p class="terminal-label">注意</p>
  <div><code>make:model --controller</code> 只加 Controller，不加 Service / Mapper。</div>
  <div class="mt-2">Controller 會 import 不存在的 <code>BookService</code>，編不過。</div>
</div>

---
---

# 課堂指定指令

一次把各層生齊，Flyway 另開一筆：

```bash
birc make Book --example --fields title:String,author:String,isbn:String,price:BigDecimal,publishedAt:LocalDate
birc make:migration create_book_table
```

<div class="mt-5 grid grid-cols-2 gap-4 text-sm">
  <div class="concept-card"><strong>--example</strong><br><span class="muted">才有 CRUD 方法與 @Column。沒加只是空殼</span></div>
  <div class="concept-card"><strong>--fields</strong><br><span class="muted">沒配 --example 只會提醒，欄位不會寫進 Entity</span></div>
</div>

<div class="mt-4 text-sm muted">遷移檔名用單數 <code>create_book_table</code>，才會建成表 <code>book</code>。</div>

---
---

# 會寫出哪些檔

| 層 | 路徑（精簡） |
| --- | --- |
| Entity / DAO | `modules/.../databaseconfig/entity/Book.java`、`BookDAO.java` |
| DTO | `dto/BookCreateRequest.java`、`BookResponse.java`（**record**） |
| Mapper | `mapper/BookMapper.java`（MapStruct） |
| Service | `BookService` + `BookServiceImpl extends BaseServiceImpl` |
| Controller | `/api/books` |
| Flyway | `src/main/resources/db/migration/V1__create_book_table.sql` |

<div v-click class="mt-4 text-sm">
  表名是 snake_case 的 entity：<code>book</code>。URL 是 <code>/api/books</code>（名稱後面加 s）。
</div>

---
---

# 遷移檔要手改欄位

`make:migration` 的範本不管 `--fields`。`--example` 時預設只有 `id`、`name`、時間戳。

把 `V1__create_book_table.sql` 改成跟 Entity 對齊：

```sql
CREATE TABLE book (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(32) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    published_at DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

<div class="mt-4 text-sm muted">檔名 parse 成表名：create_book_table → 表 <code>book</code>。寫 create_books_table 會建成 <code>books</code>，跟 Entity 對不上。</div>

---
---

# 套用遷移

`application.yml` 裡 `jpa.hibernate.ddl-auto` 是 **validate**。沒跑 Flyway，bootRun 會起不來。

```bash
# 同一個 shell，.env 還在
birc migrate
```

這條會呼叫專案裡的 Gradle wrapper `flywayMigrate`，不是只印指令。

<div class="mt-5 terminal-card text-sm">
  <p class="terminal-label">ROLLBACK？</p>
  <div>Flyway Community 做不到 rollback。</div>
  <div class="mt-2"><code>birc migrate:rollback</code> 只會告訴你：再寫一筆往前的遷移。</div>
  <div class="mt-2">課堂打壞表：<code>birc migrate:reset --force</code>（flywayClean + migrate）。</div>
</div>

---
---

# 課堂必改：否則 API 全是 401

`create` 一定帶 `SecurityConfig`。除了 swagger 與 health，其餘 `authenticated()`。

今天還沒做登入，先把書本 API 放行：

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

檔在 `modules/bookstore-config/.../config/SecurityConfig.java`。

<div v-click class="mt-4 text-sm accent-orange">
  這是課堂捷徑。正式專案不要把寫入端點長期放在 PUBLIC_PATHS。
</div>

---
---

# 啟動

```bash
./gradlew bootRun
```

Windows：`.\gradlew.bat bootRun`

等看到 Tomcat 8080。第一次會下載 Gradle 與依賴，慢慢等。

<div class="mt-5 concept-card text-sm">
  <strong>不要</strong>這時候 <code>docker compose up</code> 把 app 也建進映像。Dockerfile 會在容器裡跑 Gradle，課堂會卡住。
</div>

---
---

# 真的打 CRUD

```bash
curl -s -X POST http://localhost:8080/api/books \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Domain-Driven Design",
    "author": "Eric Evans",
    "isbn": "9780321125217",
    "price": 1800,
    "publishedAt": "2003-08-30"
  }'
```

```bash
curl -s http://localhost:8080/api/books/1
curl -s -X PUT http://localhost:8080/api/books/1 -H 'Content-Type: application/json' -d '{ ... }'
curl -s -X DELETE http://localhost:8080/api/books/1
```

<div class="mt-4 text-sm muted">成功長 Result.success(data)。id 不存在會 NotFoundException → HTTP 404。</div>

---
---

# 請求 / 回應是 record，不是 Entity

```java
public record BookCreateRequest(
        @NotNull(groups = {ValidGroup.Create.class, ValidGroup.Update.class})
        String title,
        // author, isbn, price, publishedAt...
) {}

public record BookResponse(
        Long id,
        String title,
        String author,
        String isbn,
        BigDecimal price,
        LocalDate publishedAt
) {}
```

<div class="mt-5 terminal-card text-sm">
  Controller 只轉 DTO。Entity 不出 API。這是這次改版要記住的邊界。
</div>

---
---

# CRUD 實際跑在 BaseServiceImpl

`BookServiceImpl` 幾乎是空的。create / getById / update / deleteById 寫在 `BaseServiceImpl`：

1. `mapper.toEntity(request)` → `dao.save`
2. 找不到丟 `NotFoundException`（專案自己的 `ProjectException`）
3. update 用 MapStruct `updateEntity`

<div class="mt-5 text-sm">
  額外業務（例如依 ISBN 查重）寫在 <code>BookService</code> / <code>BookServiceImpl</code>，不要重寫那四個 CRUD。
</div>

---
layout: section
transition: fade
---

<p class="font-mono accent-orange">PART 03‑B</p>

# 擴充：Author 與 MapStruct

<p class="font-mono muted">加上作者表、FK、Optional 與 @Mapping</p>

---
---

# 建 Author Entity

```bash
birc make Author --example --fields name:String,birthYear:Integer,nationality:String
birc make:migration create_author_table
```

### FK 遷移檔（共 3 個）

| # | 檔案 | 用途 |
|---|------|------|
| V1 | `create_book_table.sql` | 建 Book 表（已完成） |
| V2 | `add_author_fk_to_book.sql` | ALTER TABLE 加 author_id FK |
| V3 | `create_author_table.sql` | 建 Author 表 |

```bash
birc make:migration add_author_fk_to_book
```

---
---

# V2：ALTER TABLE 加 FK

```sql
ALTER TABLE book ADD COLUMN author_id BIGINT NULL;
ALTER TABLE book ADD CONSTRAINT fk_book_author
  FOREIGN KEY (author_id) REFERENCES author(id);
```

```bash
birc migrate
```

<div class="mt-5 terminal-card text-sm">
  三個遷移檔會依序跑。FK 放在 Author 表建好之前，確保 ALTER TABLE 不會報錯。
</div>

---
---

# MapStruct：@Mapping 帶出關聯

`BookMapper` 加一段 JOIN，把作者名字帶進 DTO：

```java {3,6}
@Mapper(componentModel = "spring")
public interface BookMapper {
    @Mapping(source = "author.name", target = "authorName")  // ← 帶出作者名稱
    BookDTO toDTO(Book entity);

    @Mapping(target = "author", ignore = true)               // ← 建書時不處理關聯
    Book toEntity(BookDTO dto);
}
```

<div class="mt-5 text-sm">
  <code>author</code> 關聯用 <code>Optional</code> 安全取值，找不到就不塞。
</div>

---
---

# Optional：安全處理關聯

Service 層取關聯時，用 `Optional` 避免 NullPointerException：

```java
Optional.ofNullable(entity.getAuthor())
    .map(Author::getName)
    .orElse(null);
```

<div class="mt-5 terminal-card text-sm">
  Entity 的關聯欄位用 <code>Optional</code> 包一層，永遠不會炸。這是在 <code>BaseServiceImpl</code> 裡處理關聯的標準做法。
</div>

---
layout: section
transition: fade
---

<p class="font-mono accent-orange">PART 04</p>

# ValidGroup 與 Spotless

<p class="font-mono muted">create --yes 預設勾這兩個，Book 的驗證跟排版都靠它們</p>

---
---

# ValidGroup：同一份 DTO，兩套必填

Bean Validation 的 `groups` 決定「這次請求要跑哪些註解」。專案裡是空的 marker interface，檔在 `validation/ValidGroup.java`。

| 組 | 何時用 |
| --- | --- |
| `Create` | POST 新增 |
| `Update` | PUT 更新 |
| `Delete` | 刪除還要帶 body（原因、確認碼、version） |
| `Submit` | 送審，比草稿嚴 |

<div v-click class="mt-5 terminal-card text-sm">
  只刪 id 的 <code>DELETE /api/books/1</code> 不用 Delete 這組。Submit 留給之後「草稿可少填、送審要全填」。
</div>

---
---

# 接到 Book 的兩端必須同一組

Controller：

```java
@PostMapping
public Result<BookResponse> create(
        @Validated(ValidGroup.Create.class) @RequestBody BookCreateRequest request)

@PutMapping("/{id}")
public Result<BookResponse> update(
        @PathVariable Long id,
        @Validated(ValidGroup.Update.class) @RequestBody BookCreateRequest request)
```

DTO：

```java
public record BookCreateRequest(
        @NotNull(groups = {ValidGroup.Create.class, ValidGroup.Update.class})
        String title,
        // author, isbn, price, publishedAt 也一樣
) {}
```

<div class="mt-4 text-sm muted">
  要用 <code>@Validated</code>，不是 <code>@Valid</code>。<code>@Valid</code> 不吃 groups。
</div>

---
---

# 為什麼不全部裸寫 @NotNull？

骨架現在 Create / Update 都必填，是為了能馬上打 CRUD。之後若更新允許只改書名：

```java
@NotNull(groups = ValidGroup.Create.class)
String isbn;

@NotNull(groups = {ValidGroup.Create.class, ValidGroup.Update.class})
String title;
```

POST 缺 isbn → 400。PUT 可以不帶 isbn，title 仍必填。還是同一份 `BookCreateRequest`，不必拆兩個 class。

<div v-click class="mt-5 text-sm accent-orange">
  <code>Delete</code> / <code>Submit</code> 今天是空的，不要刪。預設 CRUD 也不要標這兩組。
</div>

---
---

# 課堂驗驗證

缺 `title` 打一次：

```bash
curl -i -X POST http://localhost:8080/api/books \
  -H 'Content-Type: application/json' \
  -d '{"author":"Eric Evans","isbn":"9780321125217","price":1800,"publishedAt":"2003-08-30"}'
```

應是 400。這條不會進 Service。

<div class="mt-5 concept-card text-sm">
  <code>ExceptionHandleController</code> 只攔 <code>ProjectException</code>。驗證失敗走 Spring 預設的 <code>MethodArgumentNotValidException</code>，之後要統一 JSON 再自己加 <code>@ExceptionHandler</code>。
</div>

---
---

# Spotless：只管格式，不改邏輯

`--yes` 會在專案根放 `spotless_formatter.xml`（Eclipse 4.31），Gradle 接 Spotless plugin。

掃這些 Java：

- `controller/`
- `service/**`
- `modules/**/entity/**`
- `modules/**/dao/`

會做：依 xml 排版、清沒用的 import、去行尾空白、檔案結尾換行。

<div class="mt-5 text-sm muted">
  不管命名、不管潛在 bug。不要再另裝 Checkstyle 跟它搶排版。
</div>

---
---

# 兩個指令

```bash
./gradlew spotlessApply    # 直接改檔
./gradlew spotlessCheck    # 只檢查，CI 用這個
```

Windows：`.\gradlew.bat spotlessApply`

<div class="mt-5 terminal-card text-sm">
  <p class="terminal-label">習慣</p>
  <div>commit 前跑 <code>spotlessApply</code>，再看 diff。</div>
  <div class="mt-2">CI 跑 <code>spotlessCheck</code>，不要在 CI 裡 Apply（會改檔）。</div>
</div>

---
layout: section
transition: fade
---

<p class="font-mono accent-orange">PART 05</p>

# 這次改版要講的

<p class="font-mono muted">record、設定綁定、Docker、Profiles、CORS</p>

---
---

# 1. DTO 改成 record

以前常見 Lombok `@Data` class。現在 CreateRequest / Response 是 Java record。

| | class + setter | record |
| --- | --- | --- |
| 可變性 | 呼叫端可改欄位 | 建立後就不能改 |
| 樣板 | getter/setter/equals 自己產 | 編譯器給 |
| 定位 | 容易跟 Entity 長得太像 | 一眼看出這是 API 語言 |

<div v-click class="mt-5 text-sm">
  Entity 仍是 class（JPA 要無參建構子與可變欄位）。record 留給進出 API 的資料。
</div>

---
---

# 2. @ConfigurationProperties

散落的 `@Value("${file-storage.base-path}")` 難找、難驗證。改版的 feature 把一組設定收成類別。

```java
@Validated
@Component
@ConfigurationProperties(prefix = "file-storage")
public class FileStorageProperties {
    @NotBlank
    private String basePath = "./uploads";
    @Min(1)
    private long maxFileSizeBytes = 10 * 1024 * 1024L;
}
```

課堂要看到實檔：

```bash
birc add file-upload
```

yml 會插在 `# birc-generator:config-anchor` **後面**。那一行不要刪。

---
---

# @Value 還是 Properties？

| 用 | 何時 |
| --- | --- |
| `@ConfigurationProperties` | 一組相關設定（SSO、上傳、外部 API） |
| `@Value` | 單一一兩個值，例如今天的 CORS 字串 |

CORS 目前在 `SecurityConfig` 用 `@Value("${app.cors.allowed-origin-patterns:}")`。不是疏漏，是它真的只有一個字串。

<div class="mt-5 text-sm muted">
  更深的綁定規則見網站文章：/springboot/configuration-properties
</div>

---
---

# 3. Docker：兩份 compose

`create` 預設勾 Docker，會有：

| 檔 | profile | 用途 |
| --- | --- | --- |
| `docker-compose.yml` | `SPRING_PROFILES_ACTIVE=dev` | 本機。db 對外映射 port，app 還開 JDWP 5005 |
| `docker-compose.prod.yml` | `SPRING_PROFILES_ACTIVE=prod` | 映像用 `DOCKER_IMAGE` + `APP_TAG`，db 不對外開 port |

密碼、庫名、CORS 都從 `.env` 進來。不要把密鑰寫死在映像或 yml 裡。

---
---

# .env 怎麼接到 Spring

`.env` 裡這些鍵，Spring 用 `${}` 讀：

```
DB_URL=jdbc:mysql://127.0.0.1:3306/bookstore
DB_USERNAME=bookstore_user
DB_PASSWORD=...
CORS_ALLOWED_ORIGIN_PATTERNS=
```

`application.yml`：

```yaml
spring:
  datasource:
    url: ${DB_URL:jdbc:mysql://localhost:3306/app}
    username: ${DB_USERNAME:root}
    password: ${DB_PASSWORD:}
app:
  cors:
    allowed-origin-patterns: ${CORS_ALLOWED_ORIGIN_PATTERNS:}
```

容器裡的 App 不讀你筆電上的 `.env` 檔，讀 compose 的 `environment:`。所以 compose 才要再寫一次 `DB_URL: jdbc:mysql://db:3306/${DB_DATABASE}`（host 是服務名 `db`，不是 127.0.0.1）。

---
---

# 4. Spring Profiles：dev / prod

產生器**沒有**生 `application-dev.yml` / `application-prod.yml`。共用設定在一份 `application.yml`，用環境變數換值。

切換靠環境變數：

| 方式 | 例子 |
| --- | --- |
| compose（本機） | `SPRING_PROFILES_ACTIVE: dev` |
| compose（正式） | `SPRING_PROFILES_ACTIVE: prod` |
| 本機 bootRun | `export SPRING_PROFILES_ACTIVE=dev` |
| 啟動參數 | `java -jar app.jar --spring.profiles.active=prod` |

之後若要依 profile 關 Swagger、改 log 等級，再自己加 `application-prod.yml`。profile 檔會覆蓋共用檔。

---
---

# 本機 vs 正式，對照記

| | 本機 bootRun | compose prod |
| --- | --- | --- |
| DB host | `127.0.0.1`（.env 的 DB_URL） | `db`（compose 服務名） |
| profile | 你 export 的，或預設 | `prod` |
| 密碼 | `.env`，create 時隨機產生 | 同一個鍵，值自己換掉 |
| ddl | Flyway + `validate` | 一樣，不要改成 `update` |

<div class="mt-5 text-sm accent-orange">
  正式環境不要把密碼寫進 yml，走環境變數。
</div>

---
layout: section
transition: fade
---

<p class="font-mono accent-orange">PART 06</p>

# CORS 怎麼設

<p class="font-mono muted">只改一個環境變數，不要去加 addCorsMappings</p>

---
---

# 為什麼前端會覺得「後端沒開 CORS」

瀏覽器跨 Origin 會先發 OPTIONS preflight。

這次改版把 CORS 掛在 **Spring Security 的 filter chain**：

```java
http.csrf(csrf -> csrf.disable())
    .cors(Customizer.withDefaults())
```

只在 `WebMvcConfigurer.addCorsMappings` 登記時，Security 會先擋掉 OPTIONS（401），瀏覽器永遠看不到 `Access-Control-*`。

<div class="mt-5 terminal-card text-sm">
  空白 = 不開放跨來源。本機 curl 不受 CORS 影響；Vite <code>localhost:5173</code> 會。
</div>

---
---

# 正確改法

`.env`：

```bash
CORS_ALLOWED_ORIGIN_PATTERNS=http://localhost:5173
```

多個前端用逗號：

```bash
CORS_ALLOWED_ORIGIN_PATTERNS=http://localhost:5173,https://bookstore.example.edu.tw
```

規則：

- 不要尾斜線（`http://localhost:5173/` 不行）
- 不要 `*` / `http://*` / `https://*`（啟動直接失敗）
- 改完要**重啟** Spring，bootRun 不會熱重載 .env

然後重新 `source .env` 再 `./gradlew bootRun`。

---
---

# 對應到程式

```java
@Bean
public CorsConfigurationSource corsConfigurationSource(
        @Value("${app.cors.allowed-origin-patterns:}") String allowedOriginPatterns) {
    // split、trim、去掉尾斜線
    // 是 * 就 throw IllegalStateException
    config.setAllowedOriginPatterns(patterns);
    config.setAllowCredentials(!patterns.isEmpty());
}
```

compose 已經把同一變數傳進容器：

```yaml
environment:
  CORS_ALLOWED_ORIGIN_PATTERNS: ${CORS_ALLOWED_ORIGIN_PATTERNS:-}
```

dev 跟 prod 換的是 `.env` 的值，不是改 Java。

---
---

# 課堂驗 CORS

用瀏覽器或前端 fetch，不要只用 curl（curl 不跑 CORS）。

1. `.env` 空白 → 瀏覽器預檢失敗
2. 設成 `http://localhost:5173` → 該 Origin 過
3. 設成 `*` → 應用程式啟動失敗

<div class="mt-6 concept-card text-sm">
  作業如果接 Vue，Origin 填 Vite 的那個，不要填 API 自己的 8080。
</div>

---
---

# 今日路線回顧

<div class="grid grid-cols-2 gap-4 mt-5">
  <div v-click class="concept-card"><strong>npm → birc</strong><br><span class="muted">npm i -g birc-generator</span></div>
  <div v-click class="concept-card"><strong>create --yes</strong><br><span class="muted">docker、ValidGroup、Spotless</span></div>
  <div v-click class="concept-card"><strong>make + migrate</strong><br><span class="muted">make 一次生齊各層；Flyway 要手改欄位</span></div>
  <div v-click class="concept-card"><strong>env 切環境</strong><br><span class="muted">Profiles 跟 CORS 都走 .env</span></div>
</div>

<div v-click class="mt-6 terminal-card text-sm">
  下課前確認：POST /api/books 有 id 回來，GET 看得到，DELETE 再 GET 是 404。
</div>

---
---

# 指令速查

```bash
npm i -g birc-generator
birc create bookstore --yes && cd bookstore
docker compose up -d db
set -a && source .env && set +a

birc make Book --example --fields title:String,author:String,isbn:String,price:BigDecimal,publishedAt:LocalDate
birc make:migration create_book_table
# 改 V1 SQL → 改 PUBLIC_PATHS → 改 CORS
birc migrate
./gradlew bootRun
./gradlew spotlessApply
```

之後要加模組：`birc add openapi`、`birc add file-upload`。

---
layout: end
class: text-center
---

# Bookstore is open.

<p class="mt-5 font-mono muted">下一步：Spring Profiles 文章，把 dev/prod 再拆細</p>

<div class="mt-10 terminal-card inline-block text-left text-sm">
  <div><span class="accent-green">$</span> birc make Book --example --fields ...</div>
  <div class="accent-orange mt-2">create → make → migrate → bootRun</div>
</div>

<!--
延伸：/springboot/birc-bookstore-crud、/springboot/spring-profiles、/springboot/configuration-properties
-->
