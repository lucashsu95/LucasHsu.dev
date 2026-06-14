---
title: Spring Profiles：dev/prod 切換 + Docker 環境變數 | LucasHsu.dev
description: 用 Spring Profiles 在 dev / staging / prod 環境間切換設定，結合 application-{profile}.yml 與 Docker 環境變數，實現容器化部署的設定管理。
head:
  - - meta
    - name: keywords
      content: Spring Boot, Profiles, application.yml, dev, prod, Docker, 環境變數, 多環境設定
  - - meta
    - property: og:title
      content: Spring Profiles：dev/prod 切換 + Docker 環境變數
  - - meta
    - property: og:description
      content: 用 Spring Profiles 實現多環境設定切換，結合 Docker 環境變數容器化部署。
  - - meta
    - property: og:type
      content: article
---

# Spring Profiles：dev/prod 切換，銜接 Day1 Docker 環境變數

> `application-{profile}.yml` 讓每個環境有自己的設定，透過 `spring.profiles.active` 切換。Docker 部署時搭配 `SPRING_PROFILES_ACTIVE` 環境變數，不改程式碼就能換環境。

這一篇會學到的

1. Profile 是什麼、為什麼需要
2. 命名規則跟載入順序
3. 切換 Profile 的四種方式
4. 多環境設定檔長怎樣
5. `@Profile` 怎麼讓 Bean 認環境
6. 怎麼跟 Docker 環境變數銜接

## 為什麼需要 Profile？

> 開發用 localhost，正式用 production-db，每次部署都要手動改？那是上個世紀的做法。

不同環境會有不同的設定：

| 設定項 | 開發環境 (dev) | 正式環境 (prod) |
|--------|---------------|----------------|
| 資料庫 | `localhost:3306` | `production-db:3306` |
| 日誌等級 | `DEBUG` | `WARN` |
| Swagger | 開啟 | 關閉 |
| 上傳路徑 | `/tmp/upload` | `/data/upload` |

沒有 Profile 的時候：

```yaml
# application.yml — 改環境就要手動改檔
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/dev    # 每次部署都要記得改
```

**Profile 解決方案：** 定義多份 `application-{profile}.yml`，根據啟用的 profile 自動載入對應的設定，切換環境不用改程式碼。

## Profile 檔案命名規則

```
application.yml                ← 共用設定（所有環境都會載入）
application-dev.yml            ← 開發環境專用
application-staging.yml        ← 測試/暫存環境
application-prod.yml           ← 正式環境
application-test.yml           ← 單元測試用
```

### 載入順序

```yaml
# application.yml（共用）
server:
  port: 8080

spring:
  profiles:
    active: dev     # ← 啟用 dev profile
```

```yaml
# application-dev.yml（開發環境）
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/dev_db
    username: root
    password: root

logging:
  level:
    tw.edu.ntub: DEBUG
```

```yaml
# application-prod.yml（正式環境）
spring:
  datasource:
    url: jdbc:mysql://production-db:3306/prod_db
    username: ${DB_USERNAME}           # 用環境變數
    password: ${DB_PASSWORD}

logging:
  level:
    tw.edu.ntub: WARN
```

啟動時，Spring Boot 會先載入 `application.yml`，再載入 `application-{active}.yml`。同一個屬性，**profile 專屬檔會覆蓋共用檔**。

## 啟用 Profile 的方式

### 方式一：application.yml 設定（開發用）

```yaml
spring:
  profiles:
    active: dev
```

### 方式二：啟動參數（最常用）

```bash
java -jar app.jar --spring.profiles.active=prod
```

### 方式三：環境變數（Docker / CI/CD 首選）

```bash
export SPRING_PROFILES_ACTIVE=prod
java -jar app.jar
```

### 方式四：Docker 執行

```bash
docker run -e SPRING_PROFILES_ACTIVE=prod my-app
```

### 優先順序（由高到低）

1. 啟動參數 `--spring.profiles.active=prod`
2. 環境變數 `SPRING_PROFILES_ACTIVE`
3. `application.yml` 裡的設定

## 多環境設定範例

### 開發環境 application-dev.yml

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/pet_sitter
    username: root
    password: root
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: update

springdoc:
  swagger-ui:
    enabled: true
    path: /api

logging:
  level:
    tw.edu.ntub: DEBUG
```

### 正式環境 application-prod.yml

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://${DB_HOST}:${DB_PORT}/${DB_NAME}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  jpa:
    show-sql: false
    hibernate:
      ddl-auto: validate      # 正式環境不做自動更新

springdoc:
  swagger-ui:
    enabled: false             # 關閉 Swagger
  api-docs:
    enabled: false

logging:
  level:
    tw.edu.ntub: WARN
```

### 測試環境 application-test.yml

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:testdb      # 測試用 H2 記憶體資料庫
    driver-class-name: org.h2.Driver
  jpa:
    hibernate:
      ddl-auto: create-drop

springdoc:
  swagger-ui:
    enabled: false
```

## Profile 群組（Spring Boot 2.4+）

> 一個 profile 不夠？那就組一團。

Spring Boot 2.4 引入了 `spring.profiles.group`，可以把多個 profile 組合成一組：

```yaml
# application.yml
spring:
  profiles:
    group:
      dev: [dev, local-db, swagger]
      prod: [prod, prod-db, no-swagger]
```

啟用 `dev` 時，會依序載入：
1. `application.yml`
2. `application-dev.yml`
3. `application-local-db.yml`
4. `application-swagger.yml`

啟用 `prod` 時，會依序載入：
1. `application.yml`
2. `application-prod.yml`
3. `application-prod-db.yml`
4. `application-no-swagger.yml`

## @Profile 條件註解

除了設定檔切換，`@Profile` 讓 Bean 只在特定環境才建立：

```java
@Component
@Profile("dev")         // ❗ 只在 dev profile 時才建立這個 Bean
public class DevDataSourceConfig {
    @Bean
    public DataSource dataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .build();
    }
}
```

```java
@Component
@Profile("prod")        // ❗ 只在 prod profile 時才建立
public class ProdDataSourceConfig {
    @Bean
    public DataSource dataSource() {
        return DataSourceBuilder.create()
            .url("jdbc:mysql://production-db:3306/prod")
            .build();
    }
}
```

```java
@Component
@Profile("!test")       // ❗ 不在 test profile 時才建立（排除法）
public class SchedulerService {
    @Scheduled(cron = "0 0 2 * * ?")
    public void dailyTask() { ... }
}
```

### 使用場景

| @Profile 設定 | 效果 |
|--------------|------|
| `@Profile("dev")` | 僅 dev |
| `@Profile("dev & swagger")` | dev **且** swagger 都啟用（AND） |
| `@Profile("dev \|\| staging")` | dev **或** staging（OR） |
| `@Profile("!prod")` | 非 prod 環境 |
| `@Profile("!test")` | 非 test 環境（例如排程） |

## Docker 部署：環境變數傳遞

> 寫 `application-prod.yml` 的時候，密碼打 `******` 只是裝可愛，真正的秘密要交給環境變數。

### Dockerfile

```dockerfile
FROM openjdk:11-jre-slim

WORKDIR /app
COPY build/libs/app.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 執行容器

```bash
# 方法一：單一環境變數
docker run -e SPRING_PROFILES_ACTIVE=prod \
           -e DB_HOST=192.168.1.100 \
           -e DB_PORT=3306 \
           -e DB_NAME=pet_sitter \
           -e DB_USERNAME=admin \
           -e DB_PASSWORD=secret \
           -p 8080:8080 \
           my-app

# 方法二：使用 env-file
docker run --env-file ./prod.env -p 8080:8080 my-app
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_PROFILES_ACTIVE: prod
      DB_HOST: mysql
      DB_PORT: 3306
      DB_NAME: pet_sitter
      DB_USERNAME: admin
      DB_PASSWORD: ${DB_PASSWORD}
    depends_on:
      - mysql

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: pet_sitter
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

### 環境變數映射對照

Spring Boot 支援把 `.` 和 `-` 轉換為大寫底線的環境變數：

| application.yml | 環境變數 |
|----------------|---------|
| `spring.datasource.url` | `SPRING_DATASOURCE_URL` |
| `server.port` | `SERVER_PORT` |
| `spring.profiles.active` | `SPRING_PROFILES_ACTIVE` |
| `app.jwt.secret` | `APP_JWT_SECRET` |
| `spring.jpa.hibernate.ddl-auto` | `SPRING_JPA_HIBERNATE_DDL_AUTO` |

## 實戰檢查清單

### 開發環境 (dev)

- [ ] `spring.jpa.show-sql=true` 方便除錯
- [ ] `spring.jpa.hibernate.ddl-auto=update` 自動建表
- [ ] Swagger 開啟
- [ ] Log 等級 `DEBUG`

### 正式環境 (prod)

- [ ] 資料庫密碼使用環境變數，不寫死
- [ ] `spring.jpa.hibernate.ddl-auto=validate` 或 `none`
- [ ] `spring.jpa.show-sql=false`
- [ ] Swagger 關閉
- [ ] Log 等級 `WARN` 以上
- [ ] 加上 `spring.profiles.active=prod` 啟動參數

### Docker 容器

- [ ] 使用 `SPRING_PROFILES_ACTIVE=prod` 環境變數
- [ ] 敏感資訊（密碼、金鑰）用環境變數注入
- [ ] 正式環境不把 `application-prod.yml` 寫死密碼
- [ ] 使用 `--env-file` 或 Docker secrets 管理機密

## 總結

1. **多環境設定**：`application-{profile}.yml` 按環境拆分
2. **切換方式**：啟動參數、環境變數、application.yml 三種
3. **@Profile**：條件式建立 Bean，適合環境特定的元件
4. **Profile 群組**：Spring Boot 2.4+ 組合多個 profile
5. **Docker 整合**：`SPRING_PROFILES_ACTIVE` 環境變數 + `--env-file`
6. **安全**：正式環境的敏感資訊一律用環境變數，不寫死
