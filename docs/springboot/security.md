---
title: Security & Authentication | LucasHsu.dev
description: Spring Security 完整攻略：從 DelegatingFilterProxy、SecurityFilterChain、JWT 實作、例外處理到方法層級安全，一次搞懂。
head:
  - - meta
    - name: keywords
      content: Spring Security, JWT, SecurityFilterChain, DelegatingFilterProxy, PasswordEncoder, BCrypt, CORS, CSRF, OncePerRequestFilter, AuthenticationEntryPoint, AccessDeniedHandler, EnableMethodSecurity, PreAuthorize, Spring Boot 3
  - - meta
    - property: og:title
      content: Security & Authentication | LucasHsu.dev
  - - meta
    - property: og:description
      content: Spring Security 完整攻略 — Filter Chain、JWT 驗證、例外處理、方法層級安全，從頭到尾一篇搞定。
  - - meta
    - property: og:type
      content: article
---

# Security & Authentication

> 沒有 token 就想進來？`SecurityFilterChain` 說：先過我這關。

這一篇會學到的

1. `DelegatingFilterProxy` 跟 `SecurityFilterChain` 到底是什麼
2. 新舊寫法差在哪、為什麼舊的被淘汰
3. `PasswordEncoder`、CORS、CSRF 這些基礎配置怎麼設
4. JWT 驗證從 `JwtTokenProvider` 到 `OncePerRequestFilter` 完整實作
5. 401 / 403 例外處理怎麼統一格式
6. `@PreAuthorize`、`@PostAuthorize` 方法層級安全
7. `SecurityContextHolder` 怎麼在任何層拿到使用者
8. 完整整合範例

## 核心概念

### Tomcat 跟 Spring 的隔閡

Spring Boot 內嵌 Tomcat 處理 HTTP 請求，但 Tomcat 跟 Spring 容器是兩個世界。Tomcat 管理自己的 Filter，Spring 管理自己的 Bean。當 HTTP 請求進來想做驗證，Tomcat 的 Filter 沒辦法直接用 `@Autowired` 叫出 Spring 的 Service。

> 就像你在大樓門口站崗，但門禁系統的資料庫在另一個樓層，你沒辦法直接查。

### DelegatingFilterProxy：橋接兩個世界的空殼

解決辦法是 `DelegatingFilterProxy`。在 Tomcat 註冊一個「空殼 Filter」，這個空殼的唯一工作就是：接到請求後，轉頭走進 Spring 容器，找到名叫 `springSecurityFilterChain` 的 Bean，把控制權交出去。

```
HTTP Request
    │
    ▼
┌─────────────────────┐
│  Tomcat Container    │
│                     │
│  DelegatingFilterProxy (空殼，註冊在 web.xml)
│         │
│         └──→ 轉頭走進 Spring 容器
│                  │
│                  ▼
│         ┌──────────────────┐
│         │ springSecurityFilterChain │
│         │ (實際的 Security 邏輯)    │
│         └──────────────────┘
│
    ▼
實際的 Filter 鏈執行
```

### SecurityFilterChain：新的 Bean 寫法

Spring Security 5 以後，官方推薦直接註冊 `SecurityFilterChain` 為 Bean。

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form.permitAll());

        return http.build();
    }
}
```

> `http.build()` 就是說：配置好了，幫我生出 Filter 鏈。

### 新舊寫法對比

| 層面 | 舊寫法（extends `WebSecurityConfigurerAdapter`） | 新寫法（`SecurityFilterChain` Bean） |
|------|--------------------------------------------------|--------------------------------------|
| 宣告方式 | 繼承 + 覆寫 `configure()` | `@Bean` 方法回傳 |
| 語法 | 方法鏈 + `.and()` | Lambda DSL |
| 彈性 | 單一配置類別 | 多個 Bean，可條件組合 |
| 可測試性 | 低（依賴繼承） | 高（純 Bean） |
| Spring Boot 3 支援 | ❌ 已移除 | ✅ 唯一方式 |

舊寫法：

```java
// ❌ Spring Boot 3.x 已移除 WebSecurityConfigurerAdapter
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
            .and()
            .formLogin();
    }
}
```

新寫法：

```java
// ✅ 純 Bean，Lambda DSL
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form.permitAll());

        return http.build();
    }
}
```

> Spring Boot 3.x 全面移除 `WebSecurityConfigurerAdapter`。還在用舊寫法的，該搬家了。

---

## 基礎配置

### PasswordEncoder

#### BCryptPasswordEncoder

密碼不能存明文，這是常識。Spring Security 推薦 `BCryptPasswordEncoder`。

```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}

// 註冊時加密
String encoded = passwordEncoder.encode("userPlainPassword");
user.setPassword(encoded);

// 登入時比對
boolean matches = passwordEncoder.matches("inputPassword", storedHash);
```

> BCrypt 的特色是每次 encode 同一組密碼都會產生不一樣的 hash（因為內建 salt），所以不要懷疑為什麼資料庫的 hash 跟你想的不一樣。

為什麼是 BCrypt 不是 MD5 或 SHA？

| 演算法 | 可逆？ | 抗彩虹表？ | 可調整強度？ | 結論 |
|--------|--------|-----------|-------------|------|
| MD5 | ❌（但極易碰撞） | ❌ | ❌ | 不要用 |
| SHA-256 | ❌ | ❌（無 salt） | ❌ | 不適合存密碼 |
| BCrypt | ❌ | ✅（內建 salt） | ✅（可調 cost） | ✅ 推薦 |

> **💡** BCrypt 的 cost 參數（預設 10）控制運算強度。硬體越來越快就把 cost 調高，未來性比較好。

#### DelegatingPasswordEncoder：多種編碼格式共存

如果你從舊系統升級，資料庫裡同時有 MD5、SHA-256、BCrypt 的 hash，`DelegatingPasswordEncoder` 可以讓你無痛遷移。

```java
@Bean
public PasswordEncoder passwordEncoder() {
    Map<String, PasswordEncoder> encoders = new HashMap<>();
    encoders.put("bcrypt", new BCryptPasswordEncoder());
    encoders.put("sha256", new MessageDigestPasswordEncoder("SHA-256"));

    return new DelegatingPasswordEncoder("bcrypt", encoders);
}
```

密碼存儲格式變成 `{bcrypt}$2a$10$...` 或 `{sha256}...`，編碼前綴告訴 Spring 用哪個 encoder 驗證。新密碼統一用 bcrypt。

> 遷移步驟：DelegatingPasswordEncoder 能驗證舊編碼，新密碼存 bcrypt。等所有使用者都登過一次，舊編碼的 hash 就全部被 bcrypt 取代了。

---

### CORS

瀏覽器的同源政策（Same-Origin Policy）會阻擋跨域請求。前後端分離時，你的 React/Vue 跑在 `localhost:3000`，API 在 `localhost:8080`，沒設 CORS 就直接被瀏覽器擋掉。

> 瀏覽器：你們兩個 origin 不一樣，不行。你：我們明明說好了⋯⋯

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();

    config.setAllowedOrigins(List.of(
        "http://localhost:3000",
        "https://myapp.com"
    ));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}
```

然後在 `SecurityFilterChain` 啟用：

```java
http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
```

> **💡** `OPTIONS` 方法（preflight 請求）一定要在 allowedMethods 裡，不然瀏覽器會在正式請求前就先失敗了。

---

### CSRF

CSRF（Cross-Site Request Forgery）是攻擊者偽造使用者的請求。傳統解決方案是發送一個隨機 token 給前端，每次請求帶上，Server 驗證。

但如果是 REST API + JWT 的情境：

- JWT 本身就是 token，已經有驗證機制
- 前端通常不是瀏覽器直接發送表單
- CSRF protection 對 stateless API 沒有意義

```java
// REST API + JWT → 關閉 CSRF
http.csrf(csrf -> csrf.disable());
```

何時關、何時開？

| 情境 | CSRF | 原因 |
|------|------|------|
| REST API + JWT（前後端分離） | ❌ 關閉 | JWT 自帶驗證，CSRF token 多餘 |
| 傳統 Form Login + Session | ✅ 開啟 | 瀏覽器自動帶 cookie，容易被偽造 |
| OAuth2 Client（第三方登入） | ✅ 開啟 | 使用 session，需要 CSRF 保護 |
| SPA + Cookie（BFF 模式） | ✅ 開啟 | cookie-based，有 CSRF 風險 |

> CSRF 關閉不是偷懶，是你清楚知道自己在做什麼。REST API 用 JWT 本來就沒有 CSRF 的問題。

---

## JWT 驗證實作

這是整篇的核心。從 token 產生到 filter 攔截，一條龍。

### JWT 結構

JWT（JSON Web Token）由三段組成，用 `.` 連接：

```
header.payload.signature

// 範例
eyJhbGciOiJIUzI1NiJ9.
eyJzdWIiOiJsdWNhcyIsInJvbGUiOiJBRE1JTiJ9.
dGhpcyBpcyBhIHNpZ25hdHVyZQ
```

| 部分 | 內容 | 說明 |
|------|------|------|
| Header | `{"alg":"HS256","typ":"JWT"}` | 簽章演算法、類型 |
| Payload | `{"sub":"lucas","role":"ADMIN","exp":...}` | 聲明（claims），放使用者資訊 |
| Signature | 用 secret 對前兩段簽章 | 確保 token 沒被竄改 |

> JWT 的 payload 是 Base64 編碼，不是加密。不要放密碼、信用卡號這類敏感資料。

### Access Token vs Refresh Token

| | Access Token | Refresh Token |
|--|-------------|---------------|
| 存活時間 | 短（15-30 分鐘） | 長（7-30 天） |
| 用途 | 存取資源 | 換新的 access token |
| 儲存方式 | 前端記憶體 / localStorage | HttpOnly Cookie |
| 風險 | 外洩影響範圍小 | 外洩可以一直換 token |

流程：

```
1. 使用者登入
     │
     ▼
2. Server 驗證帳號密碼
     │
     ▼
3. Server 產生 Access Token（15min）+ Refresh Token（7天）
     │
     ▼
4. 前端存起來，每次請求帶 Access Token
     │
     ▼
5. Access Token 過期 → 用 Refresh Token 換新的
     │
     ▼
6. Refresh Token 也過期 → 重新登入
```

### JwtTokenProvider

負責產生 token、驗證 token、從 token 取出使用者資訊。

```java
@Component
public class JwtTokenProvider {

    private final String secretKey;
    private final long accessTokenValidity;

    public JwtTokenProvider(
        @Value("${jwt.secret}") String secretKey,
        @Value("${jwt.access-token-validity}") long accessTokenValidity
    ) {
        this.secretKey = secretKey;
        this.accessTokenValidity = accessTokenValidity;
    }

    public String generateToken(Long userId, String role) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + accessTokenValidity);

        return Jwts.builder()
            .claim("userId", userId)
            .claim("role", role)
            .setIssuedAt(now)
            .setExpiration(validity)
            .signWith(getSigningKey())
            .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public Long getUserIdFromToken(String token) {
        return parseClaims(token).get("userId", Long.class);
    }

    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
```

> **💡** `jwt.secret` 要用足夠長的 Base64 字串（至少 256 bits），不要用 `"my-secret"` 這種隨便打的。

### JwtAuthenticationFilter

這個 Filter 繼承 `OncePerRequestFilter`，保證每個請求只被過濾一次。任務很單純：

1. 從 `Authorization` header 取出 token
2. 用 `JwtTokenProvider` 驗證
3. 驗證通過 → 把 `UsernamePasswordAuthenticationToken` 設進 `SecurityContextHolder`

```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {

        String token = resolveToken(request);

        if (token != null && jwtTokenProvider.validateToken(token)) {
            Long userId = jwtTokenProvider.getUserIdFromToken(token);
            String role = jwtTokenProvider.getRoleFromToken(token);

            List<SimpleGrantedAuthority> authorities =
                List.of(new SimpleGrantedAuthority("ROLE_" + role));

            UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                    userId, null, authorities
                );

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
```

> 沒有 token 的請求不會被擋（filter 直接放行），擋人是在 `SecurityFilterChain` 的 `authorizeHttpRequests` 裡做的。Filter 只負責「有 token 就設 authentication，沒有就算了」。

### 註冊 Filter 到 SecurityFilterChain

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(
                jwtAuthFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    // corsConfigurationSource() 見上方 CORS 段落
}
```

Filter 在鏈中的位置很重要：

```
SecurityFilterChain 內部（部分列表）
    │
    ▼
 SecurityContextPersistenceFilter   ← 建立 SecurityContext
    │
    ▼
 UsernamePasswordAuthenticationFilter ← 表單登入（預設）
    │
    ▼
 ★ JwtAuthenticationFilter             ← 我們加在這裡（addFilterBefore）
    │
    ▼
 FilterSecurityInterceptor           ← 最後決定允許/拒絕
```

> `addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)` 的意思是：在表單登入 filter 之前先檢查 JWT。有 JWT 就直接通過了，不會跑到表單登入那關。

### 完整流程圖

```
┌──────────┐     POST /api/auth/login      ┌──────────────┐
│  前端     │ ──────────────────────────→   │  AuthController │
│ (React)   │                               └──────┬───────┘
│           │                                     │
│           │                               ┌──────▼───────┐
│           │                               │ 驗證帳號密碼   │
│           │                               │ ↓ 通過        │
│           │                               │ JwtTokenProvider│
│           │                               │ .generateToken()│
│           │                               └──────┬───────┘
│           │     { accessToken, refreshToken }     │
│           │ ←─────────────────────────────────────┘
│           │
│           │     GET /api/orders
│           │     Authorization: Bearer <token>
│           │ ───────────────────────────────────────→
│           │                                     │
│           │                               ┌──────▼───────┐
│           │                               │ JwtAuthentication│
│           │                               │ Filter         │
│           │                               │ ↓ validateToken│
│           │                               │ ↓ 設 Security  │
│           │                               │   ContextHolder│
│           │                               └──────┬───────┘
│           │                                     │
│           │                               ┌──────▼───────┐
│           │                               │ OrderController │
│           │     [{ orderId: 1, ... }]     │ (已認證)      │
│           │ ←─────────────────────────────┘               │
│           │                               └───────────────┘
```

---

## 例外處理

JWT 驗證失敗或權限不足時，Spring Security 會拋例外，但你會拿到 Spring 預設的 HTML 錯誤頁面（Whitelabel Error Page）。REST API 需要統一回傳 JSON。

### AuthenticationEntryPoint：401 未認證

當使用者沒有提供有效的 token 時觸發。

```java
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(
        HttpServletRequest request,
        HttpServletResponse response,
        AuthenticationException authException
    ) throws IOException {

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", 401);
        body.put("error", "Unauthorized");
        body.put("message", "請提供有效的存取令牌");
        body.put("path", request.getRequestURI());

        ObjectMapper mapper = new ObjectMapper();
        response.getWriter().write(mapper.writeValueAsString(body));
    }
}
```

### AccessDeniedHandler：403 無權限

使用者已認證但權限不足（例如一般使用者想打 ADMIN 端的 API）。

```java
@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(
        HttpServletRequest request,
        HttpServletResponse response,
        AccessDeniedException accessDeniedException
    ) throws IOException {

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", 403);
        body.put("error", "Forbidden");
        body.put("message", "您沒有權限執行此操作");
        body.put("path", request.getRequestURI());

        ObjectMapper mapper = new ObjectMapper();
        response.getWriter().write(mapper.writeValueAsString(body));
    }
}
```

### 註冊到 SecurityConfig

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .exceptionHandling(ex -> ex
            .authenticationEntryPoint(jwtAuthEntryPoint)
            .accessDeniedHandler(jwtAccessDeniedHandler)
        )
        // ... 其他配置
        ;
    return http.build();
}
```

統一回傳格式：

```json
{
  "status": 401,
  "error": "Unauthorized",
  "message": "請提供有效的存取令牌",
  "path": "/api/orders"
}
```

> 前後端分離時，前端統一讀 `body.message` 顯示錯誤訊息，不用再猜狀態碼。

---

## 方法層級安全

不只可以擋 URL，還可以直接在方法上宣告誰能呼叫。

### @EnableMethodSecurity

Spring Security 6 以後，用 `@EnableMethodSecurity` 取代舊的 `@EnableGlobalMethodSecurity`。

```java
@Configuration
@EnableMethodSecurity  // 啟用方法層級安全
public class MethodSecurityConfig {
    // 空的也可以，開啟功能就夠了
}
```

> **💡** `@EnableMethodSecurity` 預設就啟用了 `@PreAuthorize`、`@PostAuthorize`、`@Secured`、`@RolesAllowed`，不用額外參數。

### @PreAuthorize：執行前檢查

最常用。在方法執行前用 SPEL（Spring Expression Language）判斷。

```java
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public String dashboard() {
        return "Admin 儀表板";
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasAuthority('USER_DELETE')")
    public void deleteUser(@PathVariable Long id) {
        userService.delete(id);
    }

    @GetMapping("/reports/{reportId}")
    @PreAuthorize("hasRole('ADMIN') || @reportSecurity.canAccess(#reportId, authentication)")
    public Report getReport(@PathVariable Long reportId) {
        return reportService.findById(reportId);
    }
}
```

常見的 SPEL 表達式：

| 表達式 | 說明 |
|--------|------|
| `hasRole('ADMIN')` | 是否有 ADMIN 角色（自動補 `ROLE_` 前綴） |
| `hasAuthority('USER_DELETE')` | 是否有特定權限（不補前綴） |
| `hasAnyRole('ADMIN', 'MANAGER')` | 多選一 |
| `isAuthenticated()` | 是否已認證（不管角色） |
| `permitAll()` | 任何人都能呼叫 |
| `#參數名` | 引用方法參數 |
| `@beanName.method()` | 呼叫 Spring Bean 的方法做判斷 |

### @PostAuthorize：執行後檢查

方法執行完後，根據回傳值決定是否允許。適合「只能看自己的資料」這類場景。

```java
@GetMapping("/profile")
@PostAuthorize("returnObject.userId == authentication.principal")
public UserProfile getProfile() {
    return userProfileService.getCurrentUserProfile();
}
```

> 方法的回傳值用 `returnObject` 引用。不滿足條件會拋 `AccessDeniedException`，但方法已經執行完了。

### @Secured：更簡單的選擇

不支援 SPEL，只能指定角色名稱，功能比較陽春但更單純。

```java
@Secured("ROLE_ADMIN")
public void adminOnlyTask() {
    // 只有 ADMIN 能執行
}
```

何時用哪個？

| 註解 | 支援 SPEL | 彈性 | 適合場景 |
|------|-----------|------|---------|
| `@PreAuthorize` | ✅ | 最高 | 複雜條件、參數判斷 |
| `@PostAuthorize` | ✅ | 高 | 需要根據回傳值決定 |
| `@Secured` | ❌ | 低 | 單純角色檢查 |
| `@RolesAllowed` | ❌ | 低 | JSR-250 標準，跟 Java EE 相容 |

---

## SecurityContextHolder

### 在任何層取得當前使用者

`SecurityContextHolder` 是 Spring Security 存放認證資訊的地方。在任何地方都能拿到：

```java
// Controller
@GetMapping("/me")
public ResponseEntity<?> me() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    Long userId = (Long) auth.getPrincipal();
    // userId 就是我們在 JwtAuthenticationFilter 設進去的值
    return ResponseEntity.ok(userService.findById(userId));
}

// Service
@Service
public class NotificationService {

    public void sendNotification() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) auth.getPrincipal();
        // 不需要從 Controller 層層傳進來
    }
}
```

> Controller 參數直接注入 `Authentication` 也可以，但 `SecurityContextHolder` 在 Service 層也能用，不需要為了拿使用者資訊修改方法簽名。

### ThreadLocal 行為

`SecurityContextHolder` 預設使用 `MODE_THREADLOCAL`，認證資訊只存在當前執行緒。這在大部分情況沒問題，但遇到非同步就要小心。

```java
@Service
public class AsyncService {

    @Async
    public void doSomething() {
        // ❌ 新執行緒拿不到原本的 SecurityContext！
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // auth 是 null
    }
}
```

解法：設定 `MODE_INHERITABLETHREADLOCAL`，讓子執行緒繼承父執行緒的 context。

```java
// 在啟動類或配置中設定
@Configuration
public class SecurityConfig {

    @PostConstruct
    public void setSecurityContextStrategy() {
        SecurityContextHolder.setStrategyName(
            SecurityContextHolder.MODE_INHERITABLETHREADLOCAL
        );
    }
}
```

或使用 `@Async` 搭配 `SecurityContextHolder` 的 DelegatingSecurityContextRunnable：

```java
// Spring Security 提供 DelegatingSecurityContextAsyncTaskExecutor
// 或直接使用 @Async + task executor 設定
```

---

## 常見陷阱

### ❌ 陷阱 1：Filter 被註冊兩次（OncePerRequestFilter 也沒救）

如果你把 `JwtAuthenticationFilter` 同時註冊為 Bean 又在 `SecurityFilterChain` 手動 add，Spring Boot 的 Filter 自動註冊機制可能會讓它跑兩次。

```java
// ❌ JwtAuthenticationFilter 上有 @Component，又被 Spring Boot 自動註冊為 Tomcat Filter
// 解決：在 SecurityConfig 排除自動註冊
@Bean
public FilterRegistrationBean<JwtAuthenticationFilter> registration(
    JwtAuthenticationFilter filter
) {
    FilterRegistrationBean<JwtAuthenticationFilter> registration =
        new FilterRegistrationBean<>(filter);
    registration.setEnabled(false);  // 不自動註冊，讓 SecurityFilterChain 管理
    return registration;
}
```

### ❌ 陷阱 2：Secret Key 太弱

```java
// ❌ 太短，會被暴力破解
@Value("${jwt.secret}")
private String secretKey;  // "my-secret" → 太弱！

// ✅ 至少 256 bits = 32 bytes = Base64 44 字元
// 可以用 openssl rand -base64 64 產生
```

### ❌ 陷阱 3：@PreAuthorize 跟 URL 權限打架

方法上寫 `@PreAuthorize("hasRole('ADMIN')")`，但 URL 配置 `permitAll()` → URL 先放行，方法上的檢查根本不會執行。

```java
// SecurityConfig
.requestMatchers("/api/users/**").permitAll()   // ✅ URL 層先放行

// Controller
@PreAuthorize("hasRole('ADMIN')")              // ❌ 根本進不來這裡！
@GetMapping("/api/users/{id}")
```

> 層級概念：URL filter chain → Controller → @PreAuthorize。URL 層就放行了，方法層的檢查不會執行。權限配置要統一在 filter chain 或方法層級，不要混用。

### ❌ 陷阱 4：CSRF 沒關，POST 請求一直 403

```java
// 前後端分離 + JWT
// ❌ 預設 CSRF 開啟 → 所有 POST/PUT/DELETE 回傳 403
http.csrf(csrf -> csrf.disable());  // ✅ REST API 不需要
```

> 看到 POST 請求回 403 但 GET 正常，十之八九是 CSRF。

---

## 完整範例整合

所有元件組合起來的完整 `SecurityConfig.java`：

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final JwtAuthenticationEntryPoint jwtAuthEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    public SecurityConfig(
        JwtAuthenticationFilter jwtAuthFilter,
        JwtAuthenticationEntryPoint jwtAuthEntryPoint,
        JwtAccessDeniedHandler jwtAccessDeniedHandler
    ) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.jwtAuthEntryPoint = jwtAuthEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // CSRF — REST API 關閉
            .csrf(csrf -> csrf.disable())

            // URL 權限
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )

            // 例外處理
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(jwtAuthEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
            )

            // JWT Filter（在 UsernamePasswordAuthenticationFilter 之前）
            .addFilterBefore(
                jwtAuthFilter,
                UsernamePasswordAuthenticationFilter.class
            )

            // 不使用 session（stateless）
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(
            "http://localhost:3000",
            "https://myapp.com"
        ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

流程總結：

```
HTTP Request
    │
    ▼
CORS Filter（處理跨域）
    │
    ▼
JwtAuthenticationFilter（提取 token → 設 SecurityContext）
    │
    ▼
Exception Translation Filter（捕獲例外 → 丟給 EntryPoint / Handler）
    │
    ▼
FilterSecurityInterceptor（URL 權限檢查）
    │
    ▼
Controller → @PreAuthorize（方法權限檢查）
    │
    ▼
Service（SecurityContextHolder.getAuthentication()）
```

---

## 參考資源

- [Spring Security 官方 Reference](https://docs.spring.io/spring-security/reference/)
- [Spring Security Architecture (Servlet)](https://docs.spring.io/spring-security/reference/servlet/architecture.html)
- [JSON Web Tokens (jwt.io)](https://jwt.io/)
- [Bcrypt 演算法說明](https://en.wikipedia.org/wiki/Bcrypt)
- [Spring Security 6 Migration Guide](https://docs.spring.io/spring-security/reference/migration/index.html)
- [jjwt 函式庫](https://github.com/jwtk/jjwt)
