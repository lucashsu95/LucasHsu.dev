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
    record、Docker、Profiles 與 CORS
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
    <div class="concept-card"><strong>migrate + seed</strong><br><span class="muted">Flyway 建表、Seeder 塞列</span></div>
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
  <div v-click class="concept-card"><strong>03 / Book CRUD</strong><br><span class="muted">make + migrate + seed，真的打得到 API</span></div>
  <div v-click class="concept-card"><strong>04 / 加關聯</strong><br><span class="muted">Author、FK、MapStruct 帶出 authorName</span></div>
  <div v-click class="concept-card"><strong>05 / 改版</strong><br><span class="muted">ValidGroup、Spotless、record、上傳、Docker、CORS</span></div>
</div>

<div v-click class="mt-5 terminal-card text-sm">
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
| Java | 25（之後 Gradle 會抓 toolchain） | Spring Boot 4.0.5 |

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
| `birc make:migration` | 只生 SQL：`create_` / `add_` / `change_` |
| `change_{欄}_on_{表}_table` | 改型別：先改 Entity，再出 `MODIFY COLUMN` |
| `--soft-delete` | `make` 時加 `@SoftDelete` + `deleted_at` |
| `birc make:seeder` | 只生 Java Seeder |
| `birc migrate` | 真的跑 `flywayMigrate`，只建表 |
| `birc seed` | 執行 Seeder，才有示範資料 |
| `birc add` | auth / permission / file-upload / gitlab-ci / sentry |

---
transition: fade
---

<p class="font-mono accent-orange">PART 02</p>

# 開一個 bookstore

<p class="font-mono muted">create 一定是多模組，沒有單模組選項</p>

---
transition: fade
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
transition: fade
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
transition: fade
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
layout: section
transition: fade
---

<p class="font-mono accent-orange">PART 03</p>

# 生一本 Book 的 CRUD

<p class="font-mono muted">骨架用 make，表用 Flyway，示範列用 Seeder，不要靠 ddl-auto:update</p>

---
transition: fade
---

# 一次生齊：birc make

| 指令 | 會寫出什麼 |
| --- | --- |
| `birc make Book` | Entity、DAO、Mapper、DTO、Service、Controller |
| `birc make:model Book --migration` | Entity、DAO，加上 Flyway |
| `birc make Book --migration --seed` | 各層 + Flyway SQL + `BookSeeder.java` |
| `birc make:controller Book` | 只有 Controller |

<div v-click class="mt-5 terminal-card text-sm">
  <p class="terminal-label">注意</p>
  <div><code>make:model --controller</code> 只加 Controller，不加 Service / Mapper。</div>
  <div class="mt-2">Controller 會 import 不存在的 <code>BookService</code>，編不過。</div>
</div>

---
transition: fade
---

# 課堂指定指令

一行把各層、建表 SQL、Seeder 都生出來：

```bash
birc make Book --fields title:String,isbn:String,price:BigDecimal,publishedAt:LocalDate --migration --seed
```

<div class="mt-3 text-sm accent-orange">
  注意沒有 <code>author</code>。作者等一下要做成**另一張表的關聯**，現在先不要生成字串欄位，否則之後會跟 <code>Author</code> 撞名。
</div>

<div class="mt-5 grid grid-cols-3 gap-3 text-sm">
  <div class="concept-card"><strong>--fields</strong><br><span class="muted">寫你自己的欄位。有它就是完整產出：欄位、CRUD、@Column</span></div>
  <div class="concept-card"><strong>--migration</strong><br><span class="muted">讀 Entity 產建表 SQL</span></div>
  <div class="concept-card"><strong>--seed</strong><br><span class="muted">產 BookSeeder.java，不是 INSERT</span></div>
</div>

<div class="mt-4 text-sm muted">
  <code>--fields</code> 或 <code>--example</code> 有一個就是完整產出，不必兩個一起加。差別只在欄位是你指定的，還是範本的 <code>id</code> / <code>name</code>。
</div>

<div class="mt-2 text-sm accent-orange">
  這行只是「產生檔案」。要進資料庫還要 <code>birc migrate</code> 和 <code>birc seed</code>。
</div>

---
transition: fade
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
| Seeder | `seeder/BookSeeder.java`（`--seed` 才有） |

<div v-click class="mt-4 text-sm">
  表名是 snake_case 的 entity：<code>book</code>。URL 是 <code>/api/books</code>（名稱後面加 s）。
</div>

---
transition: fade
---

# `--migration` 直接讀 Entity

`--migration` 直接讀 Entity Java 檔，自動產生對應的 Flyway SQL，不用手改欄位。

Entity 裡的 `@Column`、型別、長度限制都會反映在 SQL 裡。**要修改既有表結構，請新增一筆遷移**（例如 `add_...`、`change_...`），不要覆寫既有 migration.

```bash
# 一次產出 Entity + Migration SQL + Seeder（檔案而已）
birc make Book --fields \
  title:String,isbn:String,price:BigDecimal,publishedAt:LocalDate \
  --migration --seed --public-read
```

<div class="mt-4 text-sm muted">
  SQL 裡只有 <code>CREATE TABLE</code>。示範資料不會寫成 <code>INSERT</code>，那是 Seeder 的事。
</div>

---
transition: fade
---

# 套用遷移

`application.yml` 裡 `jpa.hibernate.ddl-auto` 是 **validate**。沒跑 Flyway，bootRun 會起不來。

```bash
# 同一個 shell，.env 還在
birc migrate
```

這條會呼叫專案裡的 Gradle wrapper `flywayMigrate`，不是只印指令。**只建表，不塞資料。**

<div class="mt-5 terminal-card text-sm">
  <p class="terminal-label">ROLLBACK？</p>
  <div>Flyway Community 做不到 rollback。</div>
  <div class="mt-2"><code>birc migrate:rollback</code> 只會告訴你：再寫一筆往前的遷移。</div>
  <div class="mt-2">課堂打壞表：<code>birc migrate:reset --force</code>（flywayClean + migrate）。</div>
  <div class="mt-2 accent-orange">reset 之後表會回來，示範列不會，要再跑一次 <code>birc seed</code>。</div>
</div>

---
transition: fade
---

# 示範資料走 Seeder，不走 SQL

`--seed` 產的是 Java，不是 `INSERT`。有 Entity 就照欄位帶 `setXxx`：

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

<div class="mt-4 terminal-card text-sm">
  <div><span class="cmd">birc seed</span> 才會真的執行它。</div>
  <div class="mt-2">表結構的唯一來源是 Flyway；示範列的唯一來源是 Seeder。兩邊不要混。</div>
</div>

---
transition: fade
---

# 完整流程是三步

```bash
birc make Book --fields ... --migration --seed   # 只產檔案
birc migrate                                    # 只建表
birc seed                                       # 才真的塞示範資料
```

<div class="mt-5 grid grid-cols-3 gap-3 text-sm">
  <div class="concept-card"><strong>make</strong><br><span class="muted">寫檔案，什麼都還沒進 DB</span></div>
  <div class="concept-card"><strong>migrate</strong><br><span class="muted">schema 進 DB</span></div>
  <div class="concept-card"><strong>seed</strong><br><span class="muted">資料列進 DB</span></div>
</div>

<div v-click class="mt-5 text-sm accent-orange">
  最常見的卡點：跑完 <code>migrate</code> 就去 <code>GET /api/books</code>，拿到空陣列以為壞了。少的是 <code>birc seed</code>。
</div>

<div v-click class="mt-3 text-sm muted">
  事後才想補 Seeder：<code>birc make:seeder BookSeeder</code>（命名跟 Laravel 一樣帶後綴）。
</div>

---
transition: fade
---

# 課堂必改：否則 API 全是 401

在 `modules/bookstore-config/src/main/java/tw/edu/ntub/birc/bookstore/config/` 建立一個 `BookSecurityCustomizer.java`

機制都在你產出的專案裡：SecurityConfig 預設是 `anyRequest().authenticated()`

**注意兩件事：**
1. 沒接 auth 模組時，沒有任何東西能通過 `authenticated()`（沒登入端點、沒 JWT filter），所以沒列進去的路徑一律鎖死——「全開」必須明確列。
2. 放行路徑只能走 `publicPaths()`，不要在 `customize()` 裡自己調 authorizeHttpRequests（Spring 不准在 anyRequest 之後再加 matcher）。

```java {4}
public interface BookSecurityCustomizer {

    default List<String> publicPaths() {
        return List.of("/api/books", "/api/books/**");
    }

    default void customize(HttpSecurity http) throws Exception {}
}
```

---
transition: fade
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
transition: fade
---

# 真的打 CRUD

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

```bash
curl -s http://localhost:8080/api/books          # 先看 seed 的資料在不在

curl -s http://localhost:8080/api/books/1

curl -s -X PUT http://localhost:8080/api/books/1 \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Domain-Driven Design",
    "isbn": "9780321125217",
    "price": 1800,
    "publishedAt": "2003-08-30"
  }'

curl -s -X DELETE http://localhost:8080/api/books/1
```

<div class="mt-4 text-sm muted">成功長 Result.result(data)。id 不存在會 NotFoundException → HTTP 404。</div>

<div v-click class="mt-3 text-sm accent-orange">
  第一條 <code>GET /api/books</code> 就是 <code>birc seed</code> 的驗收：看得到示範資料才算真的塞進去了。空陣列＝漏跑 seed。
</div>

---
transition: fade
---

# 請求 / 回應是 record，不是 Entity

```java
public record BookCreateRequest(
        @NotNull(groups = {ValidGroup.Create.class, ValidGroup.Update.class})
        String title,
        // isbn, price, publishedAt...
) {}

public record BookResponse(
        Long id,
        String title,
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

<p class="font-mono muted">作者表、FK、改欄、軟刪、Optional 與 @Mapping</p>

---
---

# 建 Author CRUD

```bash
birc make Author --fields name:String,birthYear:Integer,nationality:String --migration --seed --public
```

<div class="mt-5 grid grid-cols-2 gap-4 text-sm">
  <div class="concept-card"><strong>--migration</strong><br><span class="muted">讀 Entity 產建表 SQL（Author 沒有關聯，就是單純一張表）</span></div>
  <div class="concept-card"><strong>--seed</strong><br><span class="muted">產 AuthorSeeder.java，裡面是 setXxx</span></div>
</div>

```bash
birc migrate   # 建 author 表
birc seed      # 塞村上春樹、東野圭吾
```

**Seeder**

```java
author.setName("村上春樹");
author.setBirthYear(1949);
author.setNationality("日本");
```

<div v-click class="mt-3 text-sm accent-orange">
  <code>make Author</code> 也生了 Controller，所以多了 <code>/api/authors</code>。要打它就把 <code>/api/authors</code>、<code>/api/authors/**</code> 一起加進 <code>PUBLIC_PATHS</code>，不然一律 401。
</div>

---

# 給 Book 表加 FK 欄位

```bash
birc make:migration add_author_id_to_book_table
birc migrate
```

<div class="mt-5 terminal-card text-sm">
  <div>欄位名是 <code>{ref}_id</code>、而且 <code>{ref}</code> 的表找得到時，才會一併 <code>ADD CONSTRAINT ... FOREIGN KEY</code>。</div>
  <div class="mt-2 accent-orange">所以順序很重要：<code>author</code> 表要先建好。表還不存在時只會給你一個 <code>BIGINT</code>，不加 constraint。</div>
</div>

---
---

# 改 Book Entity 加關聯

```java {7-10}
@Entity
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private Author author;

    // ... 其他欄位
}
```

<div class="mt-5 terminal-card text-sm">
  <code>@ManyToOne</code> 建立多對一關聯，<code>.LAZY</code> 避免預載入。
</div>

---

# 改 BookResponse 加 authorName

```java{4}
public record BookResponse(
    Long id,
    String title,
    String authorName,  // ← 新增
    String isbn,
    BigDecimal price,
    LocalDate publishedAt
) {}
```

<div class="mt-5 terminal-card text-sm">
  birc 不會自己改 record，要手動加 <code>authorName</code> 欄位。
</div>

---

# 改 BookMapper 加 @Mapping

```java {3,4,6,7}
@Mapper(componentModel = "spring")
public interface BookMapper {
    @Mapping(source = "author.name", target = "authorName")  // ← 讀出來：帶作者名稱
    BookResponse toResponse(Book book);

    @Mapping(target = "author", ignore = true)               // ← 寫進去：先不處理
    Book toEntity(BookCreateRequest request);
}
```

<div class="mt-5 text-sm">
  帶出 <code>authorName</code> 就走這條：宣告在 Mapper，Service 不用寫程式。
</div>

<div v-click class="mt-3 text-sm accent-orange">
  但 <code>ignore = true</code> 表示 POST 設不了作者——新建的書永遠沒有 Author。下一頁補起來。
</div>

---

# POST 怎麼指定作者

前端只會傳一個 id，不會傳整個 Author 物件。兩邊各改一處：

<div class="grid grid-cols-2 gap-4 mt-4">

<div class="good-card">
<span class="label">① DTO 收 authorId</span>

```java
public record BookCreateRequest(
    String title,
    // isbn, price, publishedAt...
    Long authorId   // 不填就是沒作者
) {}
```

</div>

<div class="good-card">
<span class="label">② Mapper 換成 Author</span>

```java
@Mapping(source = "authorId", target = "author")
Book toEntity(BookCreateRequest request);

default Author toAuthor(Long id) {
    if (id == null) return null;
    Author a = new Author();
    a.setId(id);        // 只要 FK
    return a;
}
```

</div>

</div>

<div class="mt-4 text-sm muted">
  不用去查 <code>author</code> 表：寫入 <code>book</code> 只需要 <code>author_id</code> 這個值。傳不存在的 id 會被 FK constraint 擋下來，想先回 400 就自己在 Service 檢查一次。
</div>

---

# 改 BookDAO 加 @EntityGraph

```java {2-6}
public interface BookDAO extends BaseDAO<Book> {
    @EntityGraph(attributePaths = {"author"})
    List<Book> findAll();

    @EntityGraph(attributePaths = {"author"})
    Optional<Book> findById(Long id);
}
```

<div class="mt-5 terminal-card text-sm">
  <code>@EntityGraph</code> 覆蓋預設 fetch 策略，一次載入關聯資料，避免 N+1 查詢問題。方法簽名不變，Service 不用改。
</div>

---

# Optional：情境是「查一本不存在的書」

打 `GET /api/books/999`，資料庫裡沒有 999。同一件事，兩種寫法：

<div class="grid grid-cols-2 gap-4 mt-4">

<div class="bad-card">
<span class="label">❌ 回 null</span>

```java
Book book = dao.findByIdOrNull(id);
// book 是 null
return mapper.toResponse(book);
```

</div>

<div class="good-card">
<span class="label">✅ 回 Optional</span>

```java
Book book = dao.findById(id)
    .orElseThrow(() ->
        new NotFoundException("Book: " + id));
return mapper.toResponse(book);
```

</div>

</div>

<div class="grid grid-cols-2 gap-4 mt-3 text-sm">
  <div class="text-center"><span class="accent-orange">NullPointerException → 500</span><br><span class="muted">前端看到伺服器爆掉，還要翻 log</span></div>
  <div class="text-center"><span class="accent-green">NotFoundException → 404</span><br><span class="muted">前端知道是「沒這本書」</span></div>
</div>

<div v-click class="mt-4 text-sm muted">
  重點不是「Optional 比較潮」，是 <code>null</code> 可以被忘記檢查、<code>Optional</code> 不行——你非得寫 <code>orElseThrow</code> 之類的收尾才拿得到 <code>Book</code>。
</div>

---

# 忘記檢查 vs 編譯器逼你檢查

<div class="grid grid-cols-2 gap-4 mt-4">

<div class="bad-card">
<span class="label">❌ 每個呼叫端都要自己記得</span>

```java
Book book = dao.findByIdOrNull(id);
if (book == null) {            // 漏寫就是 500
    throw new NotFoundException("...");
}
return book.getTitle();
```

</div>

<div class="good-card">
<span class="label">✅ 漏寫就編不過</span>

```java
// Optional<Book> 沒有 getTitle()
return dao.findById(id)
    .map(Book::getTitle)       // 有才轉換
    .orElse("(未知書名)");      // 沒有給預設值
```

</div>

</div>

<div class="mt-5 grid grid-cols-3 gap-3 text-sm">
  <div class="concept-card"><strong>orElseThrow</strong><br><span class="muted">沒有就丟例外 → CRUD 用這個</span></div>
  <div class="concept-card"><strong>orElse</strong><br><span class="muted">沒有就給預設值</span></div>
  <div class="concept-card"><strong>ifPresent</strong><br><span class="muted">有才做，沒有就跳過</span></div>
</div>

<div class="mt-4 text-sm muted">
  <code>BaseServiceImpl.getById</code> 已經是第一種，所以 Book 的 CRUD 你一行都不用寫。
</div>

---

# 那 author 是 null 呢？

情境換了：書存在，但 `author_id` 沒填。這次**不要**自己用 Optional。

<div class="grid grid-cols-2 gap-4 mt-4">

<div class="bad-card">
<span class="label">❌ 在 Service 手動拆關聯</span>

```java
BookResponse res = mapper.toResponse(book);
String name = Optional
    .ofNullable(book.getAuthor())
    .map(Author::getName)
    .orElse(null);
// 再想辦法塞回 record…（record 不能改）
```

</div>

<div class="good-card">
<span class="label">✅ 交給 Mapper 宣告</span>

```java
@Mapping(source = "author.name",
         target = "authorName")
BookResponse toResponse(Book book);

// Service 只有這行
return mapper.toResponse(book);
```

</div>

</div>

<div class="mt-4 terminal-card text-sm">
  <p class="terminal-label">為什麼右邊不會 NPE</p>
  <div class="font-mono text-xs">authorName = book.getAuthor() == null ? null : book.getAuthor().getName();</div>
  <div class="mt-2">MapStruct 產的 code 自己補了 null 檢查。沒作者就是 <code>authorName: null</code>，你不用再包一層。</div>
</div>

<div v-click class="mt-4 text-sm accent-orange">
  分工：<code>Optional</code> 管「這筆資料存不存在」，<code>@Mapping</code> 管「欄位怎麼搬」。不是二選一，是用在不同地方。
</div>

---
---

# 改欄位：先改 Entity，再 `change_*`

`make:migration` 認檔名：`create_` 建表、`add_` 加欄、`change_` 改型別。

`change_*` 出 `MODIFY COLUMN`，**新型別只讀 Entity**。找不到那個欄位就失敗、不寫檔——猜錯的 MODIFY 會截斷既有資料。

課堂自己加一個用不到的欄，專門看遷移長什麼：

```java
@Column(name = "stock")
private Integer stock;   // 加在 Book.java，DTO 不用動
```

```bash
birc make:migration add_stock_to_book_table
# 打開 SQL：ADD COLUMN stock INT NULL
birc migrate

# 把 Integer 改成 Long，再：
birc make:migration change_stock_on_book_table
# 打開 SQL：MODIFY COLUMN stock BIGINT NULL
birc migrate
```

<div class="mt-3 terminal-card text-sm">
  <div>故意打 <code>change_foo_on_book_table</code>：Entity 沒有 foo，應失敗、不寫檔。</div>
  <div class="mt-2 accent-orange">改完 Entity 先停 bootRun 再 migrate。<code>validate</code> 對不上會起不來。</div>
</div>

---
---

# 軟刪：`--soft-delete`

硬刪是 `DELETE FROM`。軟刪是多一欄 `deleted_at`：刪的時候填時間戳，列還在，查詢當它不存在。

`make` 時加旗標，Entity 跟 SQL 一次到位：

```bash
birc make Review --fields content:String --migration --soft-delete --public
birc migrate
```

Entity 會有 Hibernate `@SoftDelete(columnName = "deleted_at", strategy = TIMESTAMP)`。建表 SQL 多 `deleted_at TIMESTAMP NULL`。`deleteById` 不用改。

<div class="mt-4 terminal-card text-sm">
  <div>沒有 restore / withTrashed。之後要救回來得自己寫。</div>
  <div class="mt-2 accent-orange">不要對已有表跑 <code>add_deleted_at_to_book_table</code>：那不是 Entity 欄位，產生器會退回 VARCHAR(50)。軟刪請在 make 時加旗標。</div>
</div>

---
---

# 課堂：刪一筆 Review，再看 SQL

`PUBLIC_PATHS` 放行 `/api/reviews`、`/api/reviews/**`，重啟 `bootRun`：

```bash
curl -s -X POST http://localhost:8080/api/reviews \
  -H 'Content-Type: application/json' \
  -d '{"content":"好看"}'
curl -s http://localhost:8080/api/reviews
curl -s -X DELETE http://localhost:8080/api/reviews/1
curl -s http://localhost:8080/api/reviews      # 空陣列
curl -s http://localhost:8080/api/reviews/1    # 404
```

列還在，只是 API 當它沒了：

```bash
docker compose exec db mysql -u"$DB_USER" -p"$DB_PASSWORD" "$DB_DATABASE" \
  -e "SELECT id, content, deleted_at FROM review;"
```

<div class="mt-3 text-sm accent-orange">
  <code>deleted_at</code> 有值。GET 是 404，不是因為列被清掉。
</div>

---
transition: fade
---

# 登入：`birc add auth`

現在我們來加入登入功能，birc-generator提供了快速加入登入模組的方法。

再加入前我們可以先做git儲存
```bash
git init
git add .
git commit -m "init"
```

接著加入 auth 模組
```bash
birc add auth
```

可以看到新增了檔些檔案。

---
transition: fade
class: scroll-y
---

# 登入：`birc add auth`

**產生假資料**
```bash
birc make:seeder AuthUser
```

再 `AuthUserSeeder.java` 加入這三行，密碼沒有人在明文儲存的
```java
package tw.edu.ntub.birc.bookstore.seeder;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import tw.edu.ntub.birc.bookstore.databaseconfig.dao.AuthUserDAO;
import tw.edu.ntub.birc.bookstore.databaseconfig.entity.AuthUser;

@Component
@RequiredArgsConstructor
public class AuthUserSeeder implements Seeder {

    private final AuthUserDAO authUserDAO;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run() {
        if (authUserDAO.count() > 0) {
            return;
        }
        AuthUser authUser = new AuthUser();
        authUser.setAccount("tester");
        authUser.setPassword(passwordEncoder.encode("secert"));
        authUser.setDisplayName("tester");
        authUserDAO.save(authUser);
    }
}
```

最後執行 seed 把資料產生到 db
```bash
birc seed
```

---
---

# 登入：`birc add auth`

**測試**

```bash
curl -i -X POST http://localhost:8080/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"account":"tester","password":"secret"}'
curl -s http://localhost:8080/api/auth/me -H "Authorization: Bearer $TOKEN"
```

<div class="mt-4 grid grid-cols-3 gap-3 text-sm">
  <div class="concept-card"><strong>會生什麼</strong><br><span class="muted">auth_users 、 /api/auth/login 、 /api/auth/me、JWT filter</span></div>
  <div class="concept-card"><strong>Token 在標頭</strong><br><span class="muted">成功看 <code>X-Auth-Token</code>，body 只回帳號與權限</span></div>
  <div class="concept-card"><strong>之後帶 Bearer</strong><br><span class="muted">沒帶 → 401。權限不夠 → 403</span></div>
</div>

<div class="mt-3 text-sm muted">
  <code>JWT_SECRET</code> 寫在 <code>.env</code>。
</div>

---
transition: fade
class: scroll-y
---

# 權限：`birc add permission`

能成功登入之後，就是權限的部分了，相信各位都知道什麼時候要回401，什麼時候要回403

```bash
birc add permission
```

會生 `RequirePermission.java`、`PermissionAspect.java`、`SecurityUtils.java`，gradle 接 `spring-boot-starter-aspectj`。

**產生資料表 auth_roles 的假資料**

現在來產生權限角色的資料

```bash
birc make:seeder AuthRole
```

```java
AuthRole user = new AuthRole();
user.setPosition("ROLE_USER");
authRoleDAO.save(user);

AuthRole admin = new AuthRole();
admin.setPosition("ROLE_ADMIN");
authRoleDAO.save(admin);
```
執行 seed 指令來產生資料到 DB 裡
```bash
birc seed
```

---
layout: default
---

# 權限：`birc add permission`

**使用方式**
有提供有很多種方式，越複雜的專案越會使用 `SecurityUtils` 這樣的功具來管理大量的角色權限
```java
// 單一權限
@RequirePermission("ROLE_ADMIN")
// 多重權限（任一符合即可，等同 hasAnyAuthority）
@RequirePermission({"ROLE_ADMIN", "ROLE_AUDITOR"})
// 搭配 SecurityUtils 常用組合
@RequirePermission(SecurityUtils.HAS_SYS_ADMIN_AUTHORITY)
```

**在 Controller 使用**

那我們現在回到Book的Controller.java 先簡單的為刪除api 加上權限的驗證

```java
@RequirePermission("ROLE_ADMIN")
@DeleteMapping("/{id}")
public Result<Void> delete(@PathVariable Long id) { ... }
```

---
---

# 課堂：刪書要有 admin

先 POST 一本當砲灰，用回傳的 id（不要刪 seed 的 1）：

```bash
# 1. 沒帶 token → 403 缺少權限
curl -i -X DELETE http://localhost:8080/api/books/$ID

# 2. tester 沒有 ROLE_ADMIN，帶 JWT 仍 403
# 從 X-Auth-Token 抄到 TOKEN=
curl -si -X POST http://localhost:8080/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"account":"tester","password":"secret"}'
curl -i -X DELETE http://localhost:8080/api/books/$ID \
  -H "Authorization: Bearer $TOKEN"
```

<div class="mt-3 text-sm accent-orange">
  舊 JWT 的 claim 不會跟著 UPDATE 變，一定要再登入一次。
</div>

**SecurityUtils 常用權限組合**

```java
// 系統管理員或一般管理員
public static final String HAS_SYS_ADMIN_AUTHORITY =
    "hasAnyAuthority('ROLE_SYS_ADMIN', 'ROLE_ADMIN')";
// 管理員 + 承辦人
public static final String HAS_ADMIN_AND_HANDLER_AUTHORITY =
    "hasAnyAuthority('ROLE_SYS_ADMIN', 'ROLE_ADMIN', 'ROLE_AUDITOR')";
```

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
        // isbn, price, publishedAt 也一樣
) {}
```

<div class="mt-4 text-sm muted">
  要用 <code>@Validated</code>，不是 <code>@Valid</code>。<code>@Valid</code> 不吃 groups。
</div>

---
---

# 為什麼不全部裸寫 @NotNull？

骨架現在 Create / Update 都必填，是為了能馬上打 CRUD。之後若更新允許只改書名：

```java {2,5}
public record BookCreateRequest(
        @NotNull(groups = ValidGroup.Create.class)              // 只有新增必填
        String isbn,

        @NotNull(groups = {ValidGroup.Create.class, ValidGroup.Update.class})
        String title                                            // 兩邊都必填
) {}
```

POST 缺 isbn → 400。PUT 可以不帶 isbn，title 仍必填。還是同一份 `BookCreateRequest`，不必拆成兩份 DTO。

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
  -d '{"isbn":"9780321125217","price":1800,"publishedAt":"2003-08-30"}'
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
---

# 3. 三種啟動，選一個

`create` 預設勾 Docker，會有兩份 compose。**這堂課用第一種。**

<div class="grid grid-cols-3 gap-3 mt-4 text-sm">
  <div class="good-card">
    <span class="label">每天寫程式</span>
    <div class="font-mono text-xs mt-1">docker compose up -d db</div>
    <div class="font-mono text-xs">./gradlew bootRun</div>
    <p class="muted mt-2">只起 MySQL。App 在本機，改完重啟、能 debug。容器裡不跑 Gradle。</p>
  </div>
  <div class="concept-card">
    <span class="label" style="color:#8b949e">本機整包容器</span>
    <div class="font-mono text-xs mt-1">docker compose up</div>
    <p class="muted mt-2">讀 <code>docker-compose.yml</code>。容器裡 <strong>build</strong> App（慢）、db 對外映射、開 JDWP 5005。給不會裝 Java 的人，或要測「跟容器長一樣」。</p>
  </div>
  <div class="concept-card">
    <span class="label" style="color:#8b949e">測試機 / 正式機</span>
    <div class="font-mono text-xs mt-1">docker compose -f docker-compose.prod.yml up -d</div>
    <p class="muted mt-2">從 Harbor <strong>pull</strong> 映像，不在機器上 build。db 不對外開 port。CI 只改 <code>APP_TAG</code>。</p>
  </div>
</div>

<div class="mt-4 text-sm accent-orange">
  沒加 <code>-f</code> 就是那份沒有 <code>.prod</code> 的。課堂不要 <code>docker compose up</code> 把 app 也建進去，第一次會卡很久。
</div>

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
---

# Harbor：`birc add gitlab-ci`

實驗室的 CI **都會把映像推到 Harbor**。沒有 `birc harbor`：Harbor 是倉庫，`birc add gitlab-ci` 生的是 `.gitlab-ci.yml`。

```bash
birc add gitlab-ci
```

模板帶進**這個專案**的名字，不是寫死 teaching-platform。bookstore 會變成：

| 寫進 yml 的 | 值 |
| --- | --- |
| `IMAGE_NAME` | `$HARBOR_URL/bookstore/bookstore_app` |
| `DEPLOY_DIR` | `/opt/bookstore/backend` |

Harbor 位址、帳密、要部哪台，全部是 GitLab CI/CD Variables（`HARBOR_*`、`BETA_*`、`ONLINE_*`）。不要寫進檔，也不要用 Docker build-arg。

<div class="mt-4 text-sm muted">
  會問 GitLab 專案路徑（CI 只在那個 repo 跑），可留空。<code>SSH_HOST_KEY</code> 用 <code>ssh-keyscan -t ed25519 &lt;host&gt;</code>，沒填 pipeline 直接失敗。
</div>

---
---

# 兩個環境，兩條流水線

映像名：`$HARBOR_URL/bookstore/bookstore_app`（專案名會換）。伺服器目錄 `/opt/bookstore/backend`。

| 分支 | 會跑什麼 |
| --- | --- |
| `development` / MR | `build-beta` → `deploy-beta`（tag `beta-` + 短 sha） |
| `main` | `build-online`；**`deploy-online` 要手動按** |

CI 只改伺服器 `.env` 的 `APP_TAG`。第一次部署要自己先填：

```
DOCKER_IMAGE=harbor.xxx/bookstore/bookstore_app
APP_TAG=latest
```

之後 `docker compose -f docker-compose.prod.yml pull app && up -d --no-deps app`。db 沒起來才會順便起。

<div class="mt-4 text-sm accent-orange">
  這堂不必真的 push。之後作業／專題的 CI 也是這條路：GitLab 建映像 → push Harbor → 機器 pull。
</div>

---
---

# Sentry：`birc add sentry`

```bash
birc add sentry
```

會生 `SentryConfig` 跟 yml。專案開在 [sentry.ntubimdbirc.tw](https://sentry.ntubimdbirc.tw/)，DSN 從那邊複製，放 `.env`，空白 = 不送：

```
SENTRY_DSN=https://xxxx@sentry.ntubimdbirc.tw/1
```

本機 `source .env` 再重啟。正式機同一鍵寫在伺服器 `.env`（compose prod 已經接了 `SENTRY_DSN`）。

<div class="mt-4 grid grid-cols-2 gap-4 text-sm">
  <div class="concept-card"><strong>會送</strong><br><span class="muted">沒接住的 5xx、真的爆掉的例外</span></div>
  <div class="concept-card"><strong>故意不送</strong><br><span class="muted">4xx、<code>NotFoundException</code>、驗證失敗。否則每次打錯 API 都告警</span></div>
</div>

<div class="mt-4 text-sm muted">
  過濾寫在 <code>BeforeSendCallback</code>：<code>ProjectException</code> 看 <code>getHttpStatus()</code> 是不是 4xx。之後自己加例外，不必改這份設定。
</div>

<div v-click class="mt-3 text-sm accent-orange">
  課堂驗：暫時在 Controller 丟一個 <code>new RuntimeException("sentry-test")</code>，重整後 Sentry 要看得到；<code>GET /api/books/999</code> 的 404 不該出現。
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
  <div v-click class="concept-card"><strong>make → migrate → seed</strong><br><span class="muted">make 一次產檔；進 DB 是 migrate 建表、seed 塞列</span></div>
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

birc make Book --fields title:String,isbn:String,price:BigDecimal,publishedAt:LocalDate \
  --migration --seed
# 改 PUBLIC_PATHS（books / files）→ 改 CORS
birc migrate
birc seed
./gradlew bootRun
# 之後：birc add file-upload，再放行 /api/files/**
./gradlew spotlessApply
```

之後要加模組：`birc add auth`、`birc add permission`、`birc add file-upload`、`birc add gitlab-ci`（Harbor）、`birc add sentry`。`--yes` 已經有 OpenAPI，不必再 add。

<div class="mt-3 text-sm muted">
  進階：<code>birc db:wipe</code> 只跑 <code>flywayClean</code>，把 schema 清掉不重建；要清掉再建回來才是 <code>birc migrate:reset --force</code>。
</div>

---
layout: end
class: text-center
---

# Bookstore is open.

<p class="mt-5 font-mono muted">下一步：Spring Profiles 文章，把 dev/prod 再拆細</p>

<div class="mt-10 terminal-card inline-block text-left text-sm">
  <div><span class="accent-green">$</span> birc make Book --fields ... --migration --seed</div>
  <div class="accent-orange mt-2">create → make → migrate → seed → bootRun</div>
</div>

<!--
延伸：/springboot/birc-bookstore-crud、/springboot/spring-profiles
-->