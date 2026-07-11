---
title: "Spring Boot × Functional Programming：從 0% 到 100% 的體質改造 | LucasHsu.dev"
description: 把 FP 概念一步步引進 Spring Boot：從 0% 的命令式地雷區，經過 Stream、Optional、record、純函數、Result 型別，走到 100% 的 Functional Core, Imperative Shell。
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Spring Boot, Functional Programming, FP, Stream, Optional, record, 純函數, Result, Either, Functional Core Imperative Shell
  - - meta
    - property: og:title
      content: Spring Boot × Functional Programming：從 0% 到 100% 的體質改造
  - - meta
    - property: og:description
      content: 用同一段結帳邏輯，示範 FP 採用度從 0% 到 100% 的五個階段，每一階段消滅哪些缺點。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/springboot-cover.webp
---

<script setup>
import SpringFpLab from "../.vitepress/theme/components/SpringFpLab.vue"
</script>

# Spring Boot × Functional Programming：從 0% 到 100% 的體質改造

> 📝 TL;DR：FP 不是要你把 Spring Boot 改寫成 Haskell，而是一套「消滅缺點」的漸進式改造：**0% 的程式碼每一行都是地雷**（NPE、共享狀態、隱藏副作用），每往上採用一階 FP 概念，就拆掉一種地雷；**走到 100% 時，核心邏輯是純函數、副作用全部集中在邊界**——零 mock、毫秒級測試、絕對可預測，這就是完美狀態。

<SlideButton
  slug="spring-fp"
  title="Spring Boot × FP：從 0% 到 100%"
  description="用互動投影片走完五個階段：Stream、純函數、Result 到 Functional Core, Imperative Shell。"
/>

## 先玩再讀：FP 採用度實驗室

同一段「訂單結帳」邏輯，把拉桿從 0% 拉到 100%，觀察程式碼、體質檢查與健康指標怎麼變化：

<SpringFpLab />

## 前置知識

- **Java 基礎** — lambda、方法參考（`Coupon::isValid`）
- **FP 核心概念** — 建議先讀 [FP 入門指南](/concepts/fp/functional-programming-intro)，進階可補 [Functor](/concepts/fp/functor-guide) 與 [Monad](/concepts/fp/monad-guide)
- **Spring 分層架構** — 知道 Controller / Service / Repository 各自負責什麼

## 為什麼 Spring Boot 專案需要 FP？

典型的 Spring Boot Service 層長年累積下來，常見三大病灶：

| 病灶         | 症狀                                             | FP 的解藥                     |
| ------------ | ------------------------------------------------ | ----------------------------- |
| null 蔓延    | 到處 `if (x != null)`，漏一個就 NPE              | `Optional` 把「可能沒有值」寫進型別 |
| 可變狀態     | setter 滿天飛，物件在任何一層都可能被改          | `record` 不可變資料           |
| 副作用混雜   | 計算邏輯和 DB、Email、時間混在一起，測試要 mock 一堆 | 純函數 + 副作用推到邊界       |

FP 的採用是一條**光譜**，不是開關。下面用同一段結帳邏輯，走完 0% → 100% 的五個階段。

## 0%：命令式地雷區

先誠實面對多數專案的起點：

```java
@Service
public class OrderService {
    private double total; // ❌ 共享可變狀態，兩個請求同時進來直接算錯

    public Order checkout(Long id) {
        Order order = orderRepository.findById(id).get(); // ❌ 裸奔 .get()，可能 NPE
        total = 0;
        for (OrderItem item : order.getItems()) {
            if (item != null && item.getPrice() != null) { // ❌ null 防不完
                total += item.getPrice() * item.getQty();
            }
        }
        if (order.getCoupon() != null) {
            if (order.getCoupon().isValid()) {
                total = total * 0.9; // ❌ 折扣規則埋在流程裡，想加規則只能繼續巢狀
            }
        }
        order.setTotal(total);    // ❌ 直接改物件狀態
        emailService.send(order); // ❌ 隱藏副作用，測「算錢」卻真的寄信
        return orderRepository.save(order);
    }
}
```

這段程式碼的缺點清單：

- **NPE 隨時引爆**：`findById().get()`、`getPrice()` 都可能是 null。
- **併發直接壞掉**：`total` 是欄位，Spring 的 Service 預設是單例，兩個請求共用同一個 `total`。
- **無法單獨測試**：想驗證折扣算對不對，得先 mock `orderRepository` 和 `emailService`。
- **改 A 壞 B**：計算、狀態、I/O 全綁在一起，動任何一行都怕。

## 25%：Stream 與 Optional——宣告式起步

第一階不需要任何新架構，只用 JDK 內建的工具：

```java
public Order checkout(Long id) {
    Order order = orderRepository.findById(id)
        .orElseThrow(() -> new OrderNotFoundException(id)); // ✅ 不再裸奔 .get()

    double total = order.getItems().stream()   // ✅ 宣告式：說「做什麼」
        .filter(Objects::nonNull)
        .mapToDouble(i -> i.getPrice() * i.getQty())
        .sum();

    double discounted = Optional.ofNullable(order.getCoupon())
        .filter(Coupon::isValid)                // ✅ null 判斷變成管線
        .map(c -> total * 0.9)
        .orElse(total);

    order.setTotal(discounted);
    emailService.send(order);
    return orderRepository.save(order);
}
```

**消滅了**：裸 null 檢查、手寫迴圈、共享欄位 `total`（改成區域變數）。

**還沒解決**：`order` 仍然是可變的、計算邏輯仍然和 I/O 綁在一起。

:::tip Stream 的本質就是 FP
`map` / `filter` / `reduce` 正是 [Functor 與映射](/concepts/fp/functor-guide) 的實際應用——把資料放進容器，用函數描述變換，而不是手動操作每個元素。
:::

## 50%：不可變資料與純函數——測試從此不用 mock

第二階是本次改造**投資報酬率最高**的一步：把「計算」從「流程」裡抽出來。

```java
// record：不可變，沒有 setter，狀態一出生就定型
public record Pricing(BigDecimal subtotal, BigDecimal total) {}

// 純函數：相同輸入 → 相同輸出，不碰 DB、不寄信、不看時鐘
public final class PricingRules {

    static Pricing price(List<OrderItem> items, Optional<Coupon> coupon) {
        BigDecimal subtotal = items.stream()
            .map(i -> i.price().multiply(BigDecimal.valueOf(i.qty())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal total = coupon.filter(Coupon::isValid)
            .map(c -> subtotal.multiply(new BigDecimal("0.9")))
            .orElse(subtotal);

        return new Pricing(subtotal, total);
    }
}

// Service 變薄：取資料 → 純計算 → 存回去
public Order checkout(Long id) {
    Order order = findOrder(id);
    Pricing pricing = PricingRules.price(order.items(), order.coupon());
    return orderRepository.save(order.withTotal(pricing.total()));
}
```

看看測試變成什麼樣子：

```java
@Test
void 有效優惠券打九折() {
    // 不用 @SpringBootTest、不用 mock、不用啟動容器
    var items = List.of(new OrderItem("鍵盤", new BigDecimal("1000"), 1));

    Pricing pricing = PricingRules.price(items, Optional.of(validCoupon()));

    assertThat(pricing.total()).isEqualByComparingTo("900");
}
```

**消滅了**：可變狀態（`record` 沒有 setter）、mock 地獄（純函數 `new` 都不用，直接呼叫）。

**還沒解決**：錯誤處理仍靠例外、折扣規則寫死在一個方法裡。

## 75%：Result 型別與函數組合——錯誤與規則都變成「值」

第三階引入兩個 FP 核心武器：

### 1. Result 型別：讓錯誤處理被編譯器強制

```java
public sealed interface Result<T> {
    record Ok<T>(T value) implements Result<T> {}
    record Err<T>(String reason) implements Result<T> {}

    default <R> Result<R> map(Function<T, R> fn) {
        return switch (this) {
            case Ok<T>(T value) -> new Ok<>(fn.apply(value));
            case Err<T>(String reason) -> new Err<>(reason);
        };
    }
}
```

呼叫端用 `switch` 窮舉，**漏接錯誤直接編譯不過**——這比「希望大家記得 try-catch」可靠得多：

```java
return switch (result) {
    case Ok<Pricing>(Pricing p) -> ResponseEntity.ok(p);
    case Err<Pricing>(String reason) -> ResponseEntity.badRequest().body(reason);
};
```

### 2. 函數組合：商業規則變成可拼裝的管線

```java
// 每條折扣規則都是一個小函數
static UnaryOperator<Pricing> memberDiscount(Member member) {
    return p -> member.isVip()
        ? p.withTotal(p.total().multiply(new BigDecimal("0.95")))
        : p;
}

static UnaryOperator<Pricing> couponDiscount(Optional<Coupon> coupon) {
    return p -> coupon.filter(Coupon::isValid)
        .map(c -> p.withTotal(p.total().multiply(new BigDecimal("0.9"))))
        .orElse(p);
}

// 商業規則 = 小函數組合成的管線，加規則不必改舊程式
Function<Pricing, Pricing> rules =
    memberDiscount(member)
        .andThen(couponDiscount(coupon))
        .andThen(freeShippingOver(new BigDecimal("1000")));

Result<Pricing> result = validate(order)              // Err 就短路
    .map(o -> PricingRules.price(o.items(), o.coupon()))
    .map(rules);
```

**消滅了**：用例外控制流程、巢狀 if 折扣規則。新增「週年慶折扣」只要多寫一個函數、多 `andThen` 一次——這就是開放封閉原則的 FP 版。

:::tip 這裡的 `Result.map` 就是 Monad 的雛形
「把值裝進容器、失敗就短路、成功就繼續變換」正是 [Monad](/concepts/fp/monad-guide) 解決的問題；`andThen` 組管線的手法則對應 [Point-Free 與管線化](/concepts/fp/point-free)。
:::

## 100%：Functional Core, Imperative Shell——完美狀態

最後一階是架構層級的收尾：**核心 100% 純函數，副作用全部推到最外層的殼**。

```java
// ===== Imperative Shell：只有這層碰 DB / Email / 時鐘 =====
@Service
public class CheckoutService {

    public CheckoutResponse checkout(Long id) {
        Order order = orderRepository.findById(id)              // I/O
            .orElseThrow(() -> new OrderNotFoundException(id));

        CheckoutDecision decision =
            CheckoutCore.decide(order.snapshot(), clock.instant()); // 純函數核心

        return switch (decision) {
            case Approved a -> {
                orderRepository.save(a.pricedOrder());          // I/O
                events.publishEvent(new OrderPriced(a));        // I/O
                yield CheckoutResponse.ok(a);
            }
            case Rejected r -> CheckoutResponse.fail(r.reason());
        };
    }
}

// ===== Functional Core：全是純函數，連「現在幾點」都用參數傳進來 =====
public final class CheckoutCore {

    public static CheckoutDecision decide(OrderSnapshot order, Instant now) {
        if (order.items().isEmpty()) {
            return new Rejected("空訂單");
        }
        Pricing pricing = PricingRules.price(order.items(), order.coupon())
            .transform(DiscountRules.forMember(order.member(), now));
        return new Approved(order.withPricing(pricing));
    }
}
```

注意兩個關鍵設計：

1. **時間也是輸入**：`clock.instant()` 在殼取得，用參數傳進核心。核心不偷看時鐘，所以「跨年折扣」的測試不用凍結系統時間。
2. **核心回傳「決定」而不是「執行」**：`CheckoutCore` 回傳 `Approved` / `Rejected` 這種**描述**，由殼負責真正存檔、發事件。計算與副作用徹底分離。

到這裡，體質檢查全綠：

| 指標       | 0%                        | 100%                              |
| ---------- | ------------------------- | --------------------------------- |
| 可測試性   | 要 mock 三個依賴才能開測  | 核心零 mock，毫秒級單元測試       |
| Null 安全  | NPE 看運氣                | `Optional` + `record` 寫進型別    |
| 可預測性   | 結果取決於當下狀態        | 相同輸入永遠相同輸出              |
| 併發安全   | 共享可變欄位，必壞        | 不可變資料，天生執行緒安全        |
| 錯誤處理   | 例外亂飛，呼叫端全靠猜    | `Result` + `switch` 窮舉，編譯器把關 |
| 擴充規則   | 繼續往巢狀 if 裡塞        | 多寫一個函數、多 `andThen` 一次   |

## 常見疑慮

**Q：Spring 不是到處都是副作用（DI、AOP、@Transactional）嗎？跟 FP 不衝突？**

不衝突，反而互補。Spring 負責的正是「殼」的工作——注入依賴、管交易、發事件；FP 負責的是殼裡面那顆「核心」。`@Transactional` 包在 Shell 的方法上，Core 根本不知道交易存在。

**Q：`BigDecimal` + `record` 一直建新物件，效能不會爆嗎？**

JVM 對短命小物件的分配極快（TLAB + 分代 GC 就是為此設計的）。除非壓測證明熱點在物件分配，否則先換來的可測試性與正確性遠比奈秒級的差距值錢。

**Q：一定要走到 100% 嗎？**

拉桿的每一格都是穩定的停靠點：只到 25% 也已經消滅了 NPE 大宗來源；到 50% 就能讓核心邏輯的測試不用 mock。但方向是明確的——**每往右一格，就少一類會半夜叫你起床的 bug**。

## 結語

FP 在 Spring Boot 裡不是信仰問題，是工程問題：

- **0% 的每個缺點**（NPE、共享狀態、mock 地獄、例外亂飛）都有對應的 FP 解藥。
- **改造是漸進的**：Stream/Optional → record/純函數 → Result/組合 → Functional Core, Imperative Shell。
- **100% 的完美狀態**不是「沒有副作用」，而是「副作用全部住在邊界，核心絕對純粹」。

## 延伸閱讀

- [Spring Boot × DDD：從貧血模型到完整領域防線](/springboot/ddd-in-spring-boot) — 姊妹篇：同樣的拉桿，換成 DDD 視角
- [FP 入門指南](/concepts/fp/functional-programming-intro) — 純函數、副作用、不可變性的第一課
- [Functor 容器與映射的藝術](/concepts/fp/functor-guide) — 理解 `Optional.map` 背後的抽象
- [Monad FP設計的終極抽象](/concepts/fp/monad-guide) — `Result` 短路行為的理論基礎
- [Point-Free 與管線化](/concepts/fp/point-free) — `andThen` 組合管線的思考方式
- [Clean Architecture 簡潔解析](/concepts/clean-architecture) — Functional Core, Imperative Shell 的近親
- [Record DTO Projection 實戰指南](/springboot/record-dto-projection) — `record` 在 Spring Data 的實戰
