---
title: '@Valid 從 Controller 到 Service 的驗證鍊 | LucasHsu.dev'
description: 從 Controller 的 DTO @Valid 驗證到 Service 層的 @Validated 方法驗證，搭配 message interpolation 與錯誤處理，建立完整的輸入防禦鍊。
head:
  - - meta
    - name: keywords
      content: Spring Boot, @Valid, @Validated, Bean Validation, DTO 驗證, Controller 驗證, Service 層驗證, message interpolation, 單元測試
  - - meta
    - property: og:title
      content: '@Valid 用於 Service 層 | LucasHsu.dev'
  - - meta
    - property: og:description
      content: Controller DTO @Valid 到 Service @Validated 的完整驗證鍊與 message interpolation。
  - - meta
    - property: og:type
      content: article
---

# `@Valid` 從 Controller 到 Service 的驗證鍊

> 📝 TL;DR：Controller 用 `@Valid @RequestBody` 攔截非法請求，Service 加上 `@Validated` 讓單元測試也能觸發驗證。兩層都驗證，整套系統才夠嚴密。搭配 `message = "{min}"` 或 `message = "${validatedValue}"` 可以讓錯誤訊息更精準。

## 背景

`@Valid` 在 Spring Boot 中最常見的用法是 Controller 層的 DTO 驗證。但其實它也可以用在 Service 層 — 讓單元測試和其他 Service 呼叫時也有自動驗證。

這篇從 Controller 開始講，再延伸到 Service。

---

## Controller 層的 DTO 驗證

先從最基本的開始：前端傳進來的 JSON 怎麼在第一關就被攔下來。

### 定義 DTO

> 你要先決定欄位的規矩，而不是等爛資料進來再處理。

```java
public record CreateUserDTO(
    @NotBlank(message = "姓名不能為空")
    @Size(min = 1, max = 20, message = "姓名長度要在 {min} 到 {max} 之間")
    String name,

    @Min(value = 0, message = "年齡不能小於 {value}")
    @Max(value = 200, message = "年齡不能大於 {value}")
    Integer age,

    @Email(message = "請輸入有效的 Email 格式")
    String email,

    @Pattern(regexp = "09\\d{8}", message = "手機號碼格式不正確")
    String phone
) {}
```

`message` 裡面的 `{min}`、`{max}`、`{value}` 是 Bean Validation 的**訊息參數插值**，會自動代換成 annotation 上對應的屬性值。

### 在 Controller 使用

```java
@RestController
@RequestMapping("/users")
public class UserController {

    @PostMapping
    public ResponseEntity<?> createUser(
            @Valid @RequestBody CreateUserDTO dto) {
        // 走到這裡表示驗證通過
        return ResponseEntity.ok("OK");
    }
}
```

### 統一的錯誤回應

驗證失敗時 Spring 會丟 `MethodArgumentNotValidException`，你可以用 `@RestControllerAdvice` 統一攔截：

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }
}
```

> 💡 這樣前端收到 `{"age": "年齡不能小於 0", "email": "請輸入有效的 Email 格式"}`，直接就能顯示在對應欄位。

### message 的兩種插值

| 語法 | 說明 | 範例 |
|------|------|------|
| `{min}` `{max}` `{value}` | 代換 annotation 屬性值 | `@Min(5)` → `{value}` = `5` |
| `${validatedValue}` | 使用者實際輸入的值（EL 表達式） | 輸入 `-1` → `${validatedValue}` = `-1` |

實戰用法：

```java
public record OrderDTO(
    @Min(value = 1, message = "數量最少為 {value}，你只輸入了 ${validatedValue}")
    @Max(value = 99, message = "數量最多為 {value}，請量大再買")
    Integer quantity
) {}
```

這樣錯誤訊息會長這樣：「數量最少為 1，你只輸入了 -1」— 完全不用拼接字串。

---

## Service 層的驗證

> Controller 驗證過了不代表 Service 被呼叫時資料一定正確 — 單元測試直接 Service.create() 就可能跳過 Controller。

### 基本用法

```java
record Person(@Size(min = 1, max = 10) String name) {}

@Validated
public class MyService {

    void addStudent(@Valid Person person, @Max(2) int degrees) {
        // ...
    }
}
```

### 關鍵點

1. **加上 `@Validated` 註解**：在 Service 類別上加上 `@Validated`，Spring 才會對方法參數進行驗證。
2. **使用 `@Valid` 標註參數**：在需要驗證的參數前加上 `@Valid`。
3. **支援方法級別驗證**：可以直接驗證基本類型參數（如 `@Max(2) int degrees`）。

### 為什麼要用在 Service 層？

#### 問題：只在 Controller 驗證的缺點

如果驗證邏輯只在 Controller 層：
- Service 單元測試時需要手動驗證
- 其他 Service 呼叫時可能會漏掉驗證
- 驗證邏輯散落在不同地方

#### 解決：Service 層驗證

```java
@Service
@Validated
public class UserService {

    public void createUser(@Valid CreateUserDTO dto) {
        // 驗證通過後才會執行
        // ...
    }
}

// 單元測試
@Test
void testCreateUser() {
    CreateUserDTO invalidDto = new CreateUserDTO("");
    assertThrows(ConstraintViolationException.class,
        () -> userService.createUser(invalidDto));
}
```

Service 驗證失敗會丟 `ConstraintViolationException`，和 Controller 的 `MethodArgumentNotValidException` 不同，需要分開處理。

```java
@ExceptionHandler(ConstraintViolationException.class)
public ResponseEntity<?> handleServiceValidation(
        ConstraintViolationException ex) {

    Map<String, String> errors = new HashMap<>();
    ex.getConstraintViolations().forEach(violation ->
        errors.put(violation.getPropertyPath().toString(),
                   violation.getMessage()));
    return ResponseEntity.badRequest().body(errors);
}
```

### 兩層驗證的差異

| 位置 | 註解 | 例外處理 | 適用場景 |
|------|------|----------|----------|
| Controller | `@Valid @RequestBody` | `MethodArgumentNotValidException` | 前端請求進來的 DTO |
| Service | `@Validated` + `@Valid` | `ConstraintViolationException` | 內部呼叫、單元測試 |

---

## 與 DTO 轉換的關係

中心專案使用 `JavaBeanUtils.copy()` 自寫 transformer 來處理 DTO 轉換，而不是使用 `ModelMapper` 或 `MapStruct`。

```java
public class UserTransformer {
    public static User toEntity(UserDTO dto) {
        User user = new User();
        JavaBeanUtils.copy(dto, user);
        return user;
    }
}
```

DTO 驗證 + DTO 轉換兩者搭配，形成一個完整的輸入防禦鍊：

```
請求 → Controller (@Valid) → Service (@Validated) → Entity
                                        ↓
                                單元測試也強制驗證
```

## 參考資源

- [Spring Validation 官方文件](https://docs.spring.io/spring-framework/reference/core/validation/beanvalidation.html)
- [Spring Boot REST API 範例](https://spring.io/guides/tutorials/rest/)
- [Bean Validation message interpolation](https://docs.jboss.org/hibernate/validator/8.0/reference/en-US/html_single/#section-message-interpolation)
