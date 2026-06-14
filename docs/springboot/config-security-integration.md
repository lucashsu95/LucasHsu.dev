---
title: 整合實作：Profile-based Config + Security | LucasHsu.dev
description: 整合 Spring Profiles 與 Spring Security，實作多環境設定管理，在 dev/prod 間切換安全策略、CORS、JWT 設定，並驗證 Docker 部署流程。
head:
  - - meta
    - name: keywords
      content: Spring Boot, Profiles, Security, ConfigurationProperties, JWT, CORS, Docker, 整合實作
  - - meta
    - property: og:title
      content: 整合實作：Profile-based Config + Security
  - - meta
    - property: og:description
      content: 整合 Spring Profiles 與 Security，實作多環境設定管理與 CORS/JWT 設定切換。
  - - meta
    - property: og:type
      content: article
---

# 整合實作：Profile-based Config + Security 整合練習

> 把 `@ConfigurationProperties` 和 Spring Profiles 結合 Security 設定，用 `application-{profile}.yml` 切換 CORS、JWT、Swagger 權限，並用 Docker 環境變數注入機敏資料。一次打通設定檔 + 安全整合。

這一篇會學到的

1. 怎麼規劃多環境設定檔結構
2. 用 `AppProperties` 集中管裡所有設定
3. SecurityConfig 怎麼配合 Profile 切換
4. CORS 怎麼依環境自動切換
5. JWT secret 怎麼用環境變數注入
6. 完整的 Docker 部署流程

## 情境說明

我們要實作一個 REST API 專案，滿足以下需求：

| 需求 | dev | staging | prod |
|------|-----|---------|------|
| CORS 允許來源 | `http://localhost:3000` | `https://staging.example.com` | `https://example.com` |
| JWT secret | 寫死方便測試 | 環境變數 | 環境變數 |
| Swagger | 開啟 | 開啟（IP 限制） | 關閉 |
| H2 Console | 開啟 | 關閉 | 關閉 |
| 資料庫 | H2 memory | MySQL staging | MySQL prod |

## 設定檔結構規劃

```
src/main/resources/
├── application.yml                  # 共用設定
├── application-dev.yml              # 開發環境
├── application-staging.yml          # 測試/暫存環境
├── application-prod.yml             # 正式環境
```

### application.yml（共用）

```yaml
server:
  port: 8080

spring:
  profiles:
    active: dev           # 預設 dev，正式環境用環境變數覆蓋

app:
  jwt:
    secret: ${APP_JWT_SECRET:dev-secret-key-change-in-prod}
    expiration: 86400000
  cors:
    allowed-origins: ${APP_CORS_ORIGINS:http://localhost:3000}
```

### application-dev.yml

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:devdb
    driver-class-name: org.h2.Driver
  h2:
    console:
      enabled: true
      path: /h2-console
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

### application-prod.yml

```yaml
spring:
  datasource:
    url: jdbc:mysql://${DB_HOST}:${DB_PORT}/${DB_NAME}?useSSL=true
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  jpa:
    show-sql: false
    hibernate:
      ddl-auto: validate

springdoc:
  swagger-ui:
    enabled: false
  api-docs:
    enabled: false

logging:
  level:
    tw.edu.ntub: WARN
```

## AppProperties 集中管理

> 與其讓設定散落在各 Service，不如通通關進一個類別，要改設定就去翻它。

把所有應用程式設定收在一個 `@ConfigurationProperties` 類別：

```java
@Component
@ConfigurationProperties(prefix = "app")
@Validated
public class AppProperties {

    @Valid
    private Jwt jwt = new Jwt();

    @Valid
    private Cors cors = new Cors();

    // getter / setter

    public static class Jwt {
        @NotBlank(message = "JWT secret 不能為空")
        private String secret;

        @Min(3600)
        private Long expiration = 86400000L;   // 預設 24 小時

        // getter / setter
    }

    public static class Cors {
        private List<String> allowedOrigins = new ArrayList<>();

        // getter / setter
    }
}
```

### 使用 AppProperties 的 Service

```java
@Service
public class JwtService {

    private final AppProperties appProperties;

    public JwtService(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    public String generateToken(String username) {
        AppProperties.Jwt jwtConfig = appProperties.getJwt();

        return Jwts.builder()
            .setSubject(username)
            .setExpiration(new Date(System.currentTimeMillis() + jwtConfig.getExpiration()))
            .signWith(SignatureAlgorithm.HS256, jwtConfig.getSecret())
            .compact();
    }
}
```

## SecurityConfig 整合 Profiles

### 基礎 SecurityConfig

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AppProperties appProperties;

    public SecurityConfig(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(appProperties.getCors().getAllowedOrigins());
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
```

### H2 Console — 只在 dev 環境開啟

```java
@Configuration
@Profile("dev")                     // ❗ 只在 dev 生效
public class DevSecurityConfig {

    @Bean
    public SecurityFilterChain devFilterChain(HttpSecurity http) throws Exception {
        http
            .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/h2-console/**").permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }
}
```

## CORS 設定按環境切換

> dev 允許 localhost，prod 只接受自家網域。不用寫 if-else，靠 Profile 自動切就好。

利用 `@ConfigurationProperties` + Profile 切換，不用寫死不同環境的 CORS：

```yaml
# application.yml
app:
  cors:
    allowed-origins: ${APP_CORS_ORIGINS:http://localhost:3000}
```

```yaml
# application-staging.yml
app:
  cors:
    allowed-origins: https://staging.example.com
```

```yaml
# application-prod.yml
app:
  cors:
    allowed-origins: https://example.com
```

啟動時，Spring Boot 會根據 `spring.profiles.active` 載入對應的 `app.cors.allowed-origins`，自動覆蓋共用設定。

## 環境變數注入 JWT 機密

> 寫 `application-prod.yml` 的時候，密碼不要直接打上去。那不是秘密，那是等著被駭。

正式環境不應該把 JWT secret 寫在 yaml 裡：

```yaml
# ❌ 不該這樣做
app:
  jwt:
    secret: my-hardcoded-secret
```

```yaml
# ✅ 使用環境變數
app:
  jwt:
    secret: ${APP_JWT_SECRET}
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
      APP_JWT_SECRET: ${APP_JWT_SECRET}          # 從 .env 讀取
      APP_CORS_ORIGINS: https://example.com
      DB_HOST: mysql
      DB_PORT: 3306
      DB_NAME: pet_sitter_prod
      DB_USERNAME: admin
      DB_PASSWORD: ${DB_PASSWORD}
    depends_on:
      - mysql

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: pet_sitter_prod
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

### .env 檔案（正式環境用，不進版控）

```bash
# .env（不提交到 git）
APP_JWT_SECRET=your-256-bit-secret-key-here
DB_PASSWORD=prod-database-password
```

## Docker 部署驗證

### 本機測試 profile 切換

```bash
# 開發模式（預設 dev）
./gradlew bootRun

# 指定 staging 模式
./gradlew bootRun --args='--spring.profiles.active=staging'

# 用 jar 指定 prod
java -jar build/libs/app.jar --spring.profiles.active=prod
```

### Docker 建置與執行

```bash
# 1. 打包
./gradlew bootJar

# 2. 建置映像
docker build -t my-app:latest .

# 3. 執行（使用 .env）
docker run --env-file ./prod.env -p 8080:8080 my-app:latest
```

### 驗證清單

| 檢查項目 | 指令 / 方式 |
|---------|-------------|
| 啟用的 profile | `http://localhost:8080/actuator/info` 或看啟動 log |
| CORS 是否正確 | curl 加上不同 `Origin` header 測試 |
| Swagger 是否關閉 | 正式環境 `curl /api` 應回 404 |
| JWT 是否可用 | 登入後取得 token 並帶上 header 訪問 API |
| 資料庫連線 | 看啟動 log 是否有連線成功訊息 |

## 總結

### 學到的整合技巧

| 技術 | 作用 |
|------|------|
| `@ConfigurationProperties` | 集中管理 App 設定，類型安全 |
| `application-{profile}.yml` | 按環境分開設定檔 |
| `${...}` 環境變數 | 注入機敏資料，不寫死 |
| `@Profile` | 條件式建立 Bean（dev 限定 H2 Console） |
| Docker `--env-file` | 容器化部署的環境變數傳遞 |

### 三層設定架構

```
application.yml（共用）
    ├── application-dev.yml       ← 開發用：H2、DEBUG、Swagger 開啟
    ├── application-staging.yml   ← 測試用：MySQL staging、CORS
    └── application-prod.yml      ← 正式用：MySQL prod、關閉 Swagger
```

### 安全提醒

1. **JWT secret** 正式環境用環境變數，不進 yaml
2. **資料庫密碼** 正式環境用環境變數或 Docker secrets
3. **Swagger** 正式環境強制關閉
4. **CORS** 正式環境只允許自家網域
5. **.env 檔案** 加進 `.gitignore`，絕不提交
