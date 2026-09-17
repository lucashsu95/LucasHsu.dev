---
title: birc 實戰：從 npm 到 Book CRUD | LucasHsu.dev
description: 用 npm 安裝 birc-generator，建立 bookstore 專案，生出 Book 的 CRUD 與 Flyway 遷移，並接上 record、ConfigurationProperties、Docker、Spring Profiles 與 CORS。
head:
  - - meta
    - name: keywords
      content: birc, birc-generator, Spring Boot 4, Flyway, CRUD, record, ConfigurationProperties, Docker, Spring Profiles, CORS
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

> 📝 TL;DR：`npm i -g birc-generator` 之後，`birc create bookstore --yes` 開專案（含 ValidGroup、Spotless），`birc make Book --example --fields ...` 一次生齊 CRUD 各層，`birc make:migration` 建 Flyway。CORS 只改 `CORS_ALLOWED_ORIGIN_PATTERNS`。

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

`--yes` 不再問。預設勾 docker、log4j2、ValidGroup、Spotless，並寫入 agent 文件。package 會是 `tw.edu.ntub.birc.bookstore`。

`create` 一定是多模組：API 在根專案，Entity / DAO 在 `modules/bookstore-database-config`，Security 與 CORS 在 `modules/bookstore-config`。

## 起資料庫並載入 .env

```bash
docker compose up -d db
set -a && source .env && set +a
```

PowerShell 寫法見產出專案的 `README.md`。

`docker compose` 會自己讀專案目錄的 `.env` 來起 MySQL。`./gradlew bootRun` 不會讀那個檔，只認目前 shell 的環境變數。沒 `source` 時，`application.yml` 用後備值：

```yaml
url: ${DB_URL:jdbc:mysql://localhost:3306/app}
username: ${DB_USERNAME:root}
password: ${DB_PASSWORD:}
```

也就是庫名 `app`、帳號 `root`、密碼空白。容器裡實際是 `.env` 的庫名（例如 `bookstore`）和隨機密碼，會連不上。

這堂不要 `docker compose up` 把 app 一起 build。Dockerfile 會在容器裡跑 Gradle，課堂會空等。

## 一次生齊：`birc make`

| 你想做的事 | 指令 |
| --- | --- |
| 一次生 Entity、DAO、Mapper、DTO、Service、Controller | `birc make Book` |
| Entity + DAO + Flyway | `birc make:model Book --migration` |
| 只生 SQL | `birc make:migration create_book_table` |

`make:model --controller` 只加 Controller，不加 Service / Mapper。Controller 會 import 不存在的 `BookService`，編不過。

`--fields` 沒配 `--example` 只會提醒，欄位不會寫進 Entity。沒加 `--example` 的 Controller 也沒有 CRUD 方法。

## 課堂指定指令

```bash
birc make Book --example --fields title:String,author:String,isbn:String,price:BigDecimal,publishedAt:LocalDate
birc make:migration create_book_table
```

表名是 entity 的 snake_case：`book`。HTTP 路徑是 `/api/books`。遷移檔請用 `create_book_table`（單數）；寫 `create_books_table` 會建成表 `books`，跟 `@Table(name = "book")` 對不上。

DTO 是 Java record：`BookCreateRequest`、`BookResponse`。Entity 仍是 JPA class。CRUD 實作在 `BaseServiceImpl`，`BookServiceImpl` 只把 DAO 與 Mapper 丟進 `super`。

## 改 Flyway SQL

遷移範本不管 `--fields`。`--example` 時預設欄位是 `id`、`name`、時間戳。把 `src/main/resources/db/migration/V1__create_book_table.sql` 改成跟 Entity 對齊：

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

`jpa.hibernate.ddl-auto` 是 `validate`。不跑遷移，bootRun 會失敗：

```bash
birc migrate
```

Flyway Community 做不到 rollback。`birc migrate:rollback` 只會說明：再寫一筆往前的遷移。課堂把表打壞：`birc migrate:reset --force`。

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
    "author": "Eric Evans",
    "isbn": "9780321125217",
    "price": 1800,
    "publishedAt": "2003-08-30"
  }'
```

接著 `GET /api/books/1`、`PUT`、`DELETE`。id 不存在會走專案內的 `NotFoundException`，回 404。

## ValidGroup

`--yes` 會生 `validation/ValidGroup.java`：`Create`、`Update`、`Delete`、`Submit` 四個空介面，給 Bean Validation 的 `groups` 用。

`birc make Book --example` 之後：

- Controller：`@Validated(ValidGroup.Create.class)` / `@Validated(ValidGroup.Update.class)`
- `BookCreateRequest` 每個欄位：`@NotNull(groups = {ValidGroup.Create.class, ValidGroup.Update.class})`

要用 `@Validated`，不是 `@Valid`。`@Valid` 不吃 groups。

骨架現在新增跟更新都必填，方便立刻打 CRUD。之後若更新不必帶 isbn，把 isbn 的 `groups` 改成只含 `Create` 即可，不必拆兩份 DTO。

`Delete` 給「刪除還要帶原因、確認碼、version」的 body；只刪 id 就不用。`Submit` 給草稿可少填、送審要全填。預設 CRUD 不要標這兩組，也不要刪掉介面。

缺 `title` 的 POST 應回 400，進不了 Service。`ExceptionHandleController` 只攔 `ProjectException`；驗證失敗是 Spring 的 `MethodArgumentNotValidException`，要統一 JSON 再自己加 handler。

## Spotless

`--yes` 會在根目錄放 `spotless_formatter.xml`（Eclipse 4.31），並把 Spotless 接到 Gradle。掃 controller、service、entity、dao 的 Java：排版、清 unused import、去行尾空白、檔案結尾換行。不管命名、不管潛在 bug，不要再另裝 Checkstyle 跟它搶排版。

```bash
./gradlew spotlessApply    # 直接改檔，commit 前跑
./gradlew spotlessCheck    # 只檢查，CI 用這個
```

Windows 用 `.\gradlew.bat`。CI 不要跑 `spotlessApply`。

細節見 [@Valid 用於 Service 層](/springboot/valid-service)、[Checkstyle / PMD / Spotless](/springboot/code-quality-tools)。

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

| 檔 | `SPRING_PROFILES_ACTIVE` |
| --- | --- |
| `docker-compose.yml` | `dev` |
| `docker-compose.prod.yml` | `prod` |

本機 `bootRun` 的 `DB_URL` host 是 `127.0.0.1`。容器裡的 App 讀 compose 的 `environment:`，host 必須是服務名 `db`。密碼不要寫進映像，放 `.env`。

之後若要依環境關 Swagger、改 log，再自己加 `application-prod.yml`。優先順序與切換方式見 [Spring Profiles](/springboot/spring-profiles)。

### CORS

只改環境變數，重啟 Spring：

```bash
CORS_ALLOWED_ORIGIN_PATTERNS=http://localhost:5173
```

逗號分隔、不要尾斜線、不要 `*`。`SecurityConfig` 已經用 `http.cors()` 接 `CorsConfigurationSource`。不要在 `WebMvcConfigurer` 加 `addCorsMappings`，preflight 會被 Security 擋成 401。

空白 = 不開放跨來源。curl 不受 CORS 限制；瀏覽器從 Vite 打 API 才會。

## 指令速查

```bash
npm i -g birc-generator
birc create bookstore --yes && cd bookstore
docker compose up -d db
set -a && source .env && set +a

birc make Book --example --fields title:String,author:String,isbn:String,price:BigDecimal,publishedAt:LocalDate
birc make:migration create_book_table
# 改 V1 SQL、PUBLIC_PATHS、CORS
birc migrate
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
