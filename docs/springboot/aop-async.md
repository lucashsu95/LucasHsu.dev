---
title: Spring Boot AOP + @Async 實作教學 | LucasHsu.dev
description: 用 Spring Boot AOP 實作 Log 記錄，搭配 @Async 非同步機制避免影響主流程，完整範例與常見陷阱一次看懂。
head:
  - - meta
    - name: keywords
      content: Spring Boot, AOP, @Async, Aspect, 非同步, Log, ThreadPoolTaskExecutor
  - - meta
    - property: og:title
      content: Spring Boot AOP + @Async 實作教學
  - - meta
    - property: og:description
      content: 用 Spring Boot AOP 實作 Log 記錄，搭配 @Async 非同步機制避免影響主流程。
  - - meta
    - property: og:type
      content: article
---

# Spring Boot AOP 實作 Log 記錄 + @Async 非同步教學

> 📝 TL;DR：AOP 將 Log、權限等橫切關注點從業務邏輯抽離；@Async 讓耗時操作（如寫 Log）不阻塞主流程。兩者搭配，分工明確，缺一不可。

## 目錄

1. [什麼是 AOP？](#1-什麼是-aop)
2. [AOP 核心術語](#2-aop-核心術語)
3. [實作：用 AOP 自動記錄使用者操作 Log](#3-實作用-aop-自動記錄使用者操作-log)
4. [什麼是非同步？](#4-什麼是非同步)
5. [@Async 是什麼？Spring Boot 如何實現非同步？](#5-async-是什麼spring-boot-如何實現非同步)
6. [@Async 的常見坑](#6-async-的常見坑)
7. [完整整合範例](#7-完整整合範例)
8. [重點總結](#8-重點總結)

---

## 1. 什麼是 AOP？

**AOP（Aspect-Oriented Programming，切面導向程式設計）** 是一種程式設計範式，目的是將**橫切關注點（Cross-Cutting Concerns）** 從業務邏輯中抽離出來。

橫切關注點指的是那些散落在各個地方、與業務邏輯無關但又必須存在的程式碼，例如：

- 記錄 Log
- 權限驗證
- 效能計時
- 交易管理（@Transactional 底層就是 AOP）

### 沒有 AOP 的狀況

```java
public void publishActivity(Long userId, ActivityDto dto) {
    log.info("user {} 開始發布活動", userId);   // 每個方法都要寫
    // 業務邏輯...
    log.info("user {} 發布活動完成", userId);   // 每個方法都要寫
}

public void deleteActivity(Long userId, Long activityId) {
    log.info("user {} 開始刪除活動", userId);   // 重複！
    // 業務邏輯...
    log.info("user {} 刪除活動完成", userId);   // 重複！
}
```

### 有 AOP 的狀況

```java
// 只需加一個 Annotation，AOP 自動處理 log
@LogAction(actionType = "PUBLISH_EVENT")
public void publishActivity(Long userId, ActivityDto dto) {
    // 只剩純業務邏輯
}

@LogAction(actionType = "DELETE_EVENT")
public void deleteActivity(Long userId, Long activityId) {
    // 只剩純業務邏輯
}
```

---

## 2. AOP 核心術語

| 術語 | 說明 | 對應 Annotation |
|------|------|----------------|
| **Aspect（切面）** | 封裝橫切邏輯的類別 | `@Aspect` |
| **Pointcut（切入點）** | 定義「要攔截哪些方法」的規則 | `@Pointcut` |
| **Advice（通知）** | 切入點觸發時要執行的動作 | 見下表 |
| **JoinPoint** | 被攔截的方法執行點，可取得方法名稱、參數等資訊 | 方法參數 |
| **ProceedingJoinPoint** | `@Around` 專用，可控制原方法是否執行 | 方法參數 |

### Advice 類型

| Annotation | 執行時機 |
|------------|---------|
| `@Before` | 方法執行**前** |
| `@After` | 方法執行**後**（無論成功或失敗） |
| `@AfterReturning` | 方法**正常回傳**後 |
| `@AfterThrowing` | 方法**拋出例外**後 |
| `@Around` | **完整包圍**方法，最靈活，最常用 |

---

## 3. 實作：用 AOP 自動記錄使用者操作 Log

### Step 1：建立資料表

```sql
CREATE TABLE user_action_log (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT      NOT NULL,
    action_type VARCHAR(50) NOT NULL,   -- 操作類型，如 PUBLISH_EVENT
    target_type VARCHAR(50),            -- 操作對象類型，如 ACTIVITY
    target_id   BIGINT,                 -- 操作對象 ID
    metadata    JSON,                   -- 彈性欄位
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_action (user_id, action_type),
    INDEX idx_created (created_at)
);
```

### Step 2：建立 Entity 與 Repository

```java
@Entity
@Table(name = "user_action_log")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserActionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String actionType;
    private String targetType;
    private LocalDateTime createdAt;
}

public interface UserActionLogRepository extends JpaRepository<UserActionLog, Long> {
}
```

### Step 3：自訂 Annotation

```java
@Target(ElementType.METHOD)       // 只能標記在方法上
@Retention(RetentionPolicy.RUNTIME) // 執行時期保留，AOP 才讀得到
public @interface LogAction {
    String actionType();
    String targetType() default "";
}
```

### Step 4：在 Service 標記 Annotation

```java
@Service
public class ActivityService {

    @LogAction(actionType = "PUBLISH_EVENT", targetType = "ACTIVITY")
    public void publishActivity(ActivityDto dto) {
        // 業務邏輯，不需要寫任何 log 程式碼
    }

    @LogAction(actionType = "DELETE_EVENT", targetType = "ACTIVITY")
    public void deleteActivity(Long activityId) {
        // 業務邏輯
    }
}
```

### Step 5：建立 Aspect

```java
@Aspect
@Component
@RequiredArgsConstructor
public class UserActionLogAspect {

    private final UserActionLogService logService; // 注入外部 Bean（原因見第 6 節）

    @Around("@annotation(logAction)") // 攔截所有標記 @LogAction 的方法
    public Object logUserAction(ProceedingJoinPoint pjp, LogAction logAction) throws Throwable {

        Long userId = getCurrentUserId();

        Object result = pjp.proceed(); // ⚠️ 一定要呼叫，否則原方法不執行

        // 非同步寫 log，不阻塞主流程
        logService.saveLog(userId, logAction.actionType(), logAction.targetType());

        return result;
    }

    private Long getCurrentUserId() {
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
            .map(auth -> (CustomUserDetails) auth.getPrincipal())
            .map(CustomUserDetails::getUserId)
            .orElse(null);
    }
}
```

---

## 4. 什麼是非同步？

### 同步 vs 非同步

**同步（Synchronous）**：任務一個接一個執行，前一個沒完成，後一個不能開始。

```
主執行緒：[業務邏輯] → [寫 Log DB] → [回傳 Response]
                              ↑
                        使用者等待這段時間
```

**非同步（Asynchronous）**：主任務不等待次要任務完成，交給別的執行緒處理後立刻繼續。

```
主執行緒：[業務邏輯] → [丟給背景執行緒] → [回傳 Response]  ← 使用者立刻收到
                              ↓
背景執行緒：              [寫 Log DB]  ← 慢慢跑，不影響使用者
```

### 為什麼寫 Log 要非同步？

寫入資料庫需要時間，如果每次使用者操作都**同步等待** log 寫完才回傳，會：

- 增加 API 回應時間
- Log 寫失敗時連帶影響業務邏輯

Log 本身不是業務核心，不應該拖慢主流程。

---

## 5. @Async 是什麼？Spring Boot 如何實現非同步？

### @Async 的原理

Spring Boot 的 `@Async` 底層依賴 **TaskExecutor（執行緒池）**。

當你呼叫一個標記 `@Async` 的方法時，Spring 不會讓當前執行緒去執行它，而是：

1. 將該任務**包裝成 Runnable**
2. 丟進**執行緒池（ThreadPoolTaskExecutor）**
3. 由執行緒池中的某條執行緒非同步執行
4. 呼叫方立刻返回，不等待結果

```
呼叫方執行緒
    │
    ├──> Spring AOP Proxy 攔截 @Async 方法
    │         │
    │         └──> 包裝成 Runnable 丟進 TaskExecutor
    │
    └──> 立刻返回（不等待）

執行緒池中的執行緒
    └──> 非同步執行實際邏輯
```

### 啟用 @Async

在 Spring Boot 主程式或任一 `@Configuration` 類加上：

```java
@SpringBootApplication
@EnableAsync  // ← 必須加這個
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### 自訂執行緒池（建議）

不自訂的話，Spring 預設使用 `SimpleAsyncTaskExecutor`，**每次呼叫都建立新執行緒**，效能差。建議自訂：

```java
@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean(name = "logTaskExecutor")
    public TaskExecutor logTaskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(4);        // 核心執行緒數
        executor.setMaxPoolSize(10);        // 最大執行緒數
        executor.setQueueCapacity(500);     // 等待佇列大小
        executor.setThreadNamePrefix("log-async-");
        executor.setRejectedExecutionHandler(new CallerRunsPolicy()); // 佇列滿時，改由呼叫方執行
        executor.initialize();
        return executor;
    }
}
```

指定使用哪個執行緒池：

```java
@Async("logTaskExecutor")  // 指定 Bean 名稱
public void saveLog(...) {
    // ...
}
```

---

## 6. @Async 的常見坑

### ❌ 坑：同一個 Bean 內部呼叫，@Async 失效

```java
@Service
public class MyService {

    public void doSomething() {
        this.saveLog();  // ⚠️ 直接呼叫，繞過 Spring proxy
    }

    @Async
    public void saveLog() {
        // 以為是非同步，實際上是同步執行！
    }
}
```

**原因**：`@Async` 靠 Spring AOP proxy 實現。內部 `this.xxx()` 直接呼叫原始物件，不經過 proxy，`@Async` 完全失效。

### ✅ 正確做法：拆出獨立的 Service Bean

```java
// 獨立的 Service
@Service
public class UserActionLogService {

    private final UserActionLogRepository logRepo;

    @Async("logTaskExecutor")
    public void saveLog(Long userId, String actionType, String targetType) {
        UserActionLog log = UserActionLog.builder()
            .userId(userId)
            .actionType(actionType)
            .targetType(targetType)
            .createdAt(LocalDateTime.now())
            .build();
        logRepo.save(log);
    }
}

// 呼叫方注入外部 Bean
@Aspect
@Component
@RequiredArgsConstructor
public class UserActionLogAspect {

    private final UserActionLogService logService; // ✅ 注入外部 Bean，透過 proxy 呼叫

    @Around("@annotation(logAction)")
    public Object logUserAction(ProceedingJoinPoint pjp, LogAction logAction) throws Throwable {
        Object result = pjp.proceed();
        logService.saveLog(getCurrentUserId(), logAction.actionType(), logAction.targetType()); // ✅ @Async 生效
        return result;
    }
}
```

### 其他注意事項

| 情況 | 說明 |
|------|------|
| `@Async` 方法必須是 `public` | Spring AOP proxy 無法攔截非 public 方法 |
| `@Async` 方法不能是 `final` | proxy 無法覆寫 final 方法 |
| 例外不會傳回呼叫方 | 非同步例外需透過 `AsyncUncaughtExceptionHandler` 另行處理 |
| 回傳值若需要結果 | 回傳 `Future<T>` 或 `CompletableFuture<T>`，記錄 log 通常不需要 |

---

## 7. 完整整合範例

```
src/
├── annotation/
│   └── LogAction.java
├── aspect/
│   └── UserActionLogAspect.java
├── config/
│   └── AsyncConfig.java
├── entity/
│   └── UserActionLog.java
├── repository/
│   └── UserActionLogRepository.java
├── service/
│   ├── ActivityService.java         ← 業務邏輯，標記 @LogAction
│   └── UserActionLogService.java    ← 專責寫 log，標記 @Async
```

### 資料流

```
HTTP Request
    │
    ▼
ActivityService.publishActivity()   ← 標記 @LogAction
    │
    ▼
AOP Proxy 攔截（UserActionLogAspect）
    ├── pjp.proceed()               → 執行業務邏輯
    └── logService.saveLog()        → 丟進執行緒池（非同步）
                                           │
HTTP Response 立刻回傳                     ▼
                                    背景執行緒寫入 MySQL
```

---

## 8. 重點總結

### AOP

- 將 log、權限等橫切關注點從業務邏輯抽離
- `@Around` + 自訂 Annotation 是最靈活的組合
- AOP 只攔截 **Spring Bean 的 public 方法**，同類內部呼叫不觸發

### @Async

- 底層透過 **Spring AOP proxy + ThreadPoolTaskExecutor** 實現
- 必須在設定類加 `@EnableAsync` 才生效
- **同一個 Bean 內部呼叫會失效**，需拆出獨立 Bean
- 建議自訂執行緒池，避免使用預設的 `SimpleAsyncTaskExecutor`

### 組合使用

> AOP 負責「攔截在哪裡記錄」，@Async 負責「讓記錄不影響主流程」。
> 兩者分工明確，缺一不可。
