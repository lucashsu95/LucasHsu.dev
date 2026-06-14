---
title: '@ConfigurationProperties 設定檔綁定 | LucasHsu.dev'
description: 深入 Spring Boot @ConfigurationProperties，從基本繫結、嵌套物件、List/Map 到 @Validated 驗證，搭配鬆綁規則與 IDEA 提示，寫出好維護的設定檔。
head:
  - - meta
    - name: keywords
      content: Spring Boot, @ConfigurationProperties, @Value, application.yml, 設定檔, 鬆綁規則, JSR-303
  - - meta
    - property: og:title
      content: '@ConfigurationProperties 設定檔綁定'
  - - meta
    - property: og:description
      content: 深入 Spring Boot @ConfigurationProperties，從繫結、驗證到 IDE 提示完整教學。
  - - meta
    - property: og:type
      content: article
---

# @ConfigurationProperties 設定檔綁定

> `@ConfigurationProperties` 把 `application.yml` 的設定值一對一映射到 Java 類別。簡單來說，就是把設定檔變成一隻聽話的狗，你餵什麼牠就吃什麼，連驗證都幫你做好了。

這一篇會學到的

1. `@ConfigurationProperties` 怎麼用
2. 嵌套物件、List、Map 怎麼綁
3. 鬆綁規則是什麼
4. 怎麼用 `@Validated` 檢查設定值
5. 跟 `@Value` 差在哪、什麼時候用哪個

## 為什麼需要 @ConfigurationProperties？

Spring Boot 專案中，設定檔隨處可見：

```yaml
server:
  port: 8080
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db
```

傳統用 `@Value` 一個一個抓：

```java
@Service
public class OrderService {
    @Value("${order.max-count}")
    private Integer maxCount;

    @Value("${order.payment.timeout}")
    private Integer paymentTimeout;
    // ... 越來越多，散落各處
}
```

當設定項一多，`@Value` 就變得很難維護：

- 每個欄位都要手動寫 `${...}`
- 沒有類型檢查（編譯期不知道寫錯）
- 散落在各 Service，不知道有哪些設定

**`@ConfigurationProperties` 解決這些問題：**

```java
@Component
@ConfigurationProperties(prefix = "order")
public class OrderProperties {
    private Integer maxCount = 10;         // 有預設值
    private Payment payment = new Payment();

    // getter / setter

    public static class Payment {
        private Integer timeout = 30;       // 預設 30 分鐘
        // getter / setter
    }
}
```

## 基本用法

### Step 1：定義設定類別

```java
@Component
@ConfigurationProperties(prefix = "server.file")
public class FileProperties {
    private String name;
    private String url;
    private String path;

    // getter / setter
}
```

### Step 2：在 application.yml 設定值

```yaml
server:
  file:
    name: upload
    url: /file
    path: /data/upload
```

### Step 3：注入使用

```java
@Service
public class FileService {
    private final FileProperties fileProperties;

    public FileService(FileProperties fileProperties) {
        this.fileProperties = fileProperties;
    }

    public void upload(MultipartFile file) {
        Path uploadPath = Paths.get(fileProperties.getPath());
        // ...
    }
}
```

### 啟用方式（二選一）

**方式一：@Component + @ConfigurationProperties（最簡單）**

```java
@Component
@ConfigurationProperties(prefix = "server.file")
public class FileProperties { ... }
```

**方式二：@EnableConfigurationProperties（不需要 @Component）**

```java
@Configuration
@EnableConfigurationProperties(FileProperties.class)
public class AppConfig { ... }
```

第二種方式適合設定類別屬於 library / 共用模組的情況。

## 嵌套物件綁定

設定檔常常有多層結構，`@ConfigurationProperties` 支援嵌套類別自動綁定：

```yaml
app:
  jwt:
    secret: my-secret-key
    expiration: 86400000
  cache:
    type: redis
    ttl: 3600
    redis:
      host: localhost
      port: 6379
```

對應的 Java 類別：

```java
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private Jwt jwt = new Jwt();
    private Cache cache = new Cache();

    // getter / setter

    public static class Jwt {
        private String secret;
        private Long expiration;
        // getter / setter
    }

    public static class Cache {
        private String type;
        private Integer ttl;
        private Redis redis = new Redis();

        // getter / setter

        public static class Redis {
            private String host;
            private Integer port;
            // getter / setter
        }
    }
}
```

使用時：

```java
appProperties.getJwt().getSecret();
appProperties.getCache().getRedis().getHost();
```

## List 與 Map 綁定

### List 綁定

```yaml
app:
  cors:
    allowed-origins:
      - https://example.com
      - https://api.example.com
    allowed-methods:
      - GET
      - POST
      - PUT
```

```java
@Component
@ConfigurationProperties(prefix = "app.cors")
public class CorsProperties {
    private List<String> allowedOrigins = new ArrayList<>();
    private List<String> allowedMethods = new ArrayList<>();
    // getter / setter
}
```

### Map 綁定

```yaml
app:
  rate-limit:
    plans:
      free: 100
      basic: 1000
      premium: 10000
```

```java
@Component
@ConfigurationProperties(prefix = "app.rate-limit")
public class RateLimitProperties {
    private Map<String, Integer> plans = new HashMap<>();
    // getter / setter
}
```

## 鬆綁規則（Relaxed Binding）

> 白話文：yaml 裡寫 `my-property`，Java 裡寫 `myProperty`，Spring 自己知道它們是同一個東西。

Spring Boot 的 `@ConfigurationProperties` 支援**鬆綁命名**，也就是 yaml 裡的寫法跟 Java 屬性名稱不需要完全一致：

| 屬性寫法 | Java 屬性 |
|---------|-----------|
| `my-property` | `myProperty` |
| `my_property` | `myProperty` |
| `MY_PROPERTY` | `myProperty` |
| `myProperty` | `myProperty` |

```yaml
order:
  payment-timeout: 30    # 連字號寫法
  payment_timeout: 30    # 底線寫法（也能對應到 paymentTimeout）
```

```java
@Component
@ConfigurationProperties(prefix = "order")
public class OrderProperties {
    private Integer paymentTimeout;    // 全部對應到這個欄位
    // getter / setter
}
```

:::tip 💡 最佳實踐
yaml 一律用 `kebab-case`（連字號），Java 屬性一律用 `camelCase`。這是 Spring Boot 官方慣例，也最符合各自語言的命名風格。
:::

## 參數驗證

> 寫程式最怕什麼？開機就爆炸不如早點爆炸。

加上 `@Validated` 就能用 JSR-303 Bean Validation 檢查設定值：

```yaml
app:
  jwt:
    secret: my-secret-key
    expiration: 86400000
```

```java
@Component
@ConfigurationProperties(prefix = "app")
@Validated
public class AppProperties {

    @Valid
    private Jwt jwt = new Jwt();

    // getter / setter

    public static class Jwt {
        @NotBlank(message = "JWT secret 不能為空")
        private String secret;

        @Min(value = 3600, message = "JWT expiration 至少 1 小時")
        @Max(value = 86400000, message = "JWT expiration 不能超過 24 小時")
        private Long expiration;

        // getter / setter
    }
}
```

啟動時如果設定值不符合驗證規則，Spring Boot 會直接拋 `BindValidationException` 並中止啟動，提早發現錯誤。

## 啟用設定提示（IDE 自動完成）

> 寫 yaml 還要翻文件？讓 IDEA 幫你自動完成。

新增相依性，讓 IDEA 在寫 `application.yml` 時有自動完成：

```groovy
// build.gradle
annotationProcessor 'org.springframework.boot:spring-boot-configuration-processor'
```

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

編譯後會在 `META-INF/spring-configuration-metadata.json` 產生設定中繼資料，IDEA 就會跳出提示和說明。

## 與 @Value 的比較

> `@ConfigurationProperties` 像是工具箱，`@Value` 像是瑞士刀。不是誰取代誰，是看場合用哪個。

| 比較項目 | @ConfigurationProperties | @Value |
|---------|------------------------|--------|
| 類型安全 | ✅ 編譯期檢查型別 | ❌ 執行期才發現 |
| 鬆綁規則 | ✅ 支援 | ❌ 不支援 |
| 嵌套物件 | ✅ 自動綁定 | ❌ 需要手動 |
| JSR-303 驗證 | ✅ 支援 @Validated | ❌ 需要自己寫 |
| 成群設定管理 | ✅ 集中管理 | ❌ 散落各處 |
| SpEL 表達式 | ❌ 不支援 | ✅ 支援 #{...} |
| 單一設定值 | ✅ 稍重 | ✅ 輕量方便 |

### 使用建議

- **一群相關設定** → `@ConfigurationProperties`
- **單一或少數設定** → `@Value`
- **需要在設定用 SpEL** → `@Value`

## 總結

1. **集中管理**：一群相關設定封裝成一個類別，比 `@Value` 整齊
2. **類型安全**：編譯期檢查型別，不用等到執行期爆炸
3. **嵌套綁定**：自動對應多層 yaml 結構
4. **鬆綁規則**：yaml 用 kebab-case，Java 用 camelCase
5. **驗證支援**：`@Validated` + JSR-303 在啟動時檢查
6. **IDE 提示**：加上 `configuration-processor` 讓 IDEA 幫你自動完成
