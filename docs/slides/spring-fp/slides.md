---
theme: seriph
title: Spring Boot × FP — 從 0% 到 100% 的體質改造
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
  ogTitle: Spring Boot × FP — 從 0% 到 100% 的體質改造
  description: 用同一段結帳邏輯，走完 FP 採用度 0% 到 100% 的五個階段
exportFilename: spring-fp
---

<div class="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#0d1117] to-[#14231a]"></div>

<div class="relative z-10">
  <p class="font-mono text-sm text-[#7ee787] mb-6">$ spring run FunctionalLab --level=0..100</p>
  <h1 class="text-5xl">
    <span class="accent-spring">Spring Boot</span>
    <span class="text-white"> × FP</span>
  </h1>
  <p class="mt-4 text-xl text-gray-300 font-mono">
    <span class="muted">//</span> 從 0%（缺點全開）到 100%（完美）的體質改造
  </p>
  <div class="mt-14 grid grid-cols-5 gap-3 font-mono text-sm text-center">
    <div class="concept-card"><strong>0%</strong><br><span class="muted">地雷區</span></div>
    <div class="concept-card"><strong>25%</strong><br><span class="muted">Stream</span></div>
    <div class="concept-card"><strong>50%</strong><br><span class="muted">純函數</span></div>
    <div class="concept-card"><strong>75%</strong><br><span class="muted">Result</span></div>
    <div class="concept-card"><strong>100%</strong><br><span class="muted">Core/Shell</span></div>
  </div>
</div>

<!--
開場定調：FP 不是把 Spring Boot 改寫成 Haskell，而是一套漸進式的「消滅缺點」工程。
全程用同一段訂單結帳邏輯。預計 35–45 分鐘。
-->

---
layout: default
hideInToc: true
---

<p class="font-mono text-xs text-gray-500"><span class="accent-green">$</span> cat refactor-plan.md</p>

# 今日路線：一段結帳邏輯的五次進化

<div class="grid grid-cols-2 gap-4 mt-7">
  <div v-click class="concept-card"><strong>0% / 病灶盤點</strong><br><span class="muted">NPE、共享狀態、隱藏副作用</span></div>
  <div v-click class="concept-card"><strong>25% / 宣告式起步</strong><br><span class="muted">Stream 與 Optional</span></div>
  <div v-click class="concept-card"><strong>50% / 純函數</strong><br><span class="muted">record 不可變、測試零 mock</span></div>
  <div v-click class="concept-card"><strong>75% → 100% / 架構收尾</strong><br><span class="muted">Result、組合、Core/Shell</span></div>
</div>

<div v-click class="mt-6 terminal-card text-sm">
  <span class="accent-orange">目標：</span>每往右一格，就少一類會半夜叫你起床的 bug。
</div>

---
layout: section
transition: fade
---

<p class="font-mono accent-orange">PART 01 — 0%</p>

# 命令式地雷區

<p class="font-mono muted">先誠實面對多數專案的起點</p>

---
layout: two-cols
layoutClass: gap-8
---

# 每一行都是地雷

```java {all|3|6|8-12|18-19|all}
@Service
public class OrderService {
    private double total; // 共享可變狀態

    public Order checkout(Long id) {
        Order order = repo.findById(id).get();
        total = 0;
        for (OrderItem item : order.getItems()) {
            if (item != null
                && item.getPrice() != null) {
                total += item.getPrice()
                       * item.getQty();
            }
        }
        if (order.getCoupon() != null) {
            // ...巢狀 if 打折...
        }
        order.setTotal(total);
        emailService.send(order);
        return repo.save(order);
    }
}
```

::right::

<div class="terminal-card mt-14">
  <p class="terminal-label">SMELL REPORT</p>
  <div v-click>× <code>total</code> 欄位：單例 Service，兩個請求共用</div>
  <div v-click>× 裸奔 <code>.get()</code>：NPE 看運氣</div>
  <div v-click>× null 檢查防不完</div>
  <div v-click>× 測「算錢」卻真的寄信</div>
  <div v-click class="mt-3 accent-orange">改任何一行都怕動全身</div>
</div>

<!--
重點：問題不是「醜」，是四類缺陷疊在一起——併發、null、副作用、耦合。
-->

---
---

# 0% 的缺點清單

<div class="grid grid-cols-2 gap-4 mt-6">
  <div v-click class="concept-card"><strong>NPE 隨時引爆</strong><br><span class="muted">findById().get()、getPrice() 都可能是 null</span></div>
  <div v-click class="concept-card"><strong>併發直接壞掉</strong><br><span class="muted">共享欄位 total，Service 預設單例</span></div>
  <div v-click class="concept-card"><strong>無法單獨測試</strong><br><span class="muted">驗折扣要先 mock repository 和 email</span></div>
  <div v-click class="concept-card"><strong>改 A 壞 B</strong><br><span class="muted">計算、狀態、I/O 全綁在一起</span></div>
</div>

<div v-click class="mt-6 text-center text-lg font-mono">
  FP 的採用是一條<span class="accent-spring">光譜</span>，不是開關 —— 一格一格往右走
</div>

---
layout: section
transition: fade
---

<p class="font-mono accent-orange">PART 02 — 25%</p>

# Stream 與 Optional

<p class="font-mono muted">不動架構，只用 JDK 內建工具</p>

---
transition: fade
---

# 迴圈 → 管線

````md magic-move
```java
double total = 0;
for (OrderItem item : order.getItems()) {
    if (item != null && item.getPrice() != null) {
        total += item.getPrice() * item.getQty();
    }
}
```

```java
double total = order.getItems().stream()
    .filter(Objects::nonNull)
    .mapToDouble(i -> i.getPrice() * i.getQty())
    .sum();
```
````

<div v-click class="mt-5 grid grid-cols-2 gap-4 text-sm">
  <div class="concept-card"><strong>命令式</strong><br><span class="muted">手寫「怎麼做」：迴圈、累加、防呆</span></div>
  <div class="concept-card"><strong>宣告式</strong><br><span class="muted">說「做什麼」：過濾、映射、加總</span></div>
</div>

<!--
Magic Move：同一段邏輯，從「怎麼做」變成「做什麼」。意圖浮上來，雜訊沉下去。
-->

---
---

# null 判斷 → Optional 管線

```java {1-2|4-8|all}
Order order = orderRepository.findById(id)
    .orElseThrow(() -> new OrderNotFoundException(id));

double discounted = Optional.ofNullable(order.getCoupon())
    .filter(Coupon::isValid)
    .map(c -> total * 0.9)
    .orElse(total);
```

<div class="mt-6 grid grid-cols-2 gap-4 text-sm">
  <div v-click class="concept-card"><strong>消滅了</strong><br><span class="muted">裸奔 .get()、巢狀 null 檢查、共享欄位</span></div>
  <div v-click class="concept-card"><strong>還沒解決</strong><br><span class="muted">order 仍可變、計算仍和 I/O 綁在一起</span></div>
</div>

<div v-click class="mt-5 terminal-card text-sm">
  <span class="accent-green">map / filter</span> 就是 FP 的 Functor：資料進容器，用函數描述變換。
</div>

---
layout: section
transition: fade
---

<p class="font-mono accent-orange">PART 03 — 50%</p>

# 不可變資料與純函數

<p class="font-mono muted">本次改造投資報酬率最高的一步</p>

---
layout: two-cols
layoutClass: gap-7
---

# 把「計算」抽離「流程」

```java {1|3-13|all}
public record Pricing(BigDecimal subtotal, BigDecimal total) {}

public final class PricingRules { // 純函數
    static Pricing price(
        List<OrderItem> items,
        Optional<Coupon> coupon) {

        BigDecimal subtotal = /* stream 加總 */;
        BigDecimal total = coupon
            .filter(Coupon::isValid)
            .map(c -> subtotal.multiply(RATE_90))
            .orElse(subtotal);
        return new Pricing(subtotal, total);
    }
}
```

::right::

## Service 變薄

```java
public Order checkout(Long id) {
    Order order = findOrder(id);
    Pricing pricing = PricingRules.price(
        order.items(), order.coupon());
    return repo.save(
        order.withTotal(pricing.total()));
}
```

<div v-click class="mt-4 concept-card text-sm">
  <strong>取資料 → 純計算 → 存回去</strong><br>
  <span class="muted">record 沒有 setter；純函數不碰 DB、不寄信、不看時鐘</span>
</div>

---
layout: two-cols
layoutClass: gap-7
---

# 測試的解放

## 0% 的測試

```java
@SpringBootTest
class OrderServiceTest {
    @MockBean OrderRepository repo;
    @MockBean EmailService email;
    // ...啟動容器、stub 回傳值...
    // 只是想驗「打九折」
}
```

::right::

## 50% 的測試

```java
@Test
void 有效優惠券打九折() {
    var items = List.of(
        new OrderItem("鍵盤",
            new BigDecimal("1000"), 1));

    Pricing p = PricingRules.price(
        items, Optional.of(validCoupon()));

    assertThat(p.total())
        .isEqualByComparingTo("900");
}
```

<p v-click class="mt-4 text-sm accent-green font-mono">零 mock · 零容器 · 毫秒級</p>

<!--
這一頁是說服團隊的關鍵：純函數的測試不需要任何 Spring 基礎設施。
-->

---
---

# 動手拉拉看

<FpMeter />

<!--
邀請學員把拉桿逐格右移，觀察每一格「翻綠」的是哪一條缺點。
對應網站上的互動文章：/springboot/fp-in-spring-boot
-->

---
layout: section
transition: fade
---

<p class="font-mono accent-orange">PART 04 — 75%</p>

# Result 型別與函數組合

<p class="font-mono muted">錯誤與規則都變成「值」</p>

---
---

# 錯誤寫進型別

```java {1-4|6-11|all}
public sealed interface Result<T> {
    record Ok<T>(T value) implements Result<T> {}
    record Err<T>(String reason) implements Result<T> {}
}

// 呼叫端 switch 窮舉：漏接錯誤直接編譯不過
return switch (result) {
    case Ok<Pricing>(Pricing p) -> ResponseEntity.ok(p);
    case Err<Pricing>(String reason) ->
        ResponseEntity.badRequest().body(reason);
};
```

<div v-click class="mt-5 terminal-card text-sm">
  比「希望大家記得 try-catch」可靠得多 ——
  <span class="accent-orange">錯誤處理從紀律問題變成編譯問題</span>。
</div>

---
---

# 商業規則 = 可拼裝的管線

```java {1-5|7-10|all}
static UnaryOperator<Pricing> memberDiscount(Member m) {
    return p -> m.isVip()
        ? p.withTotal(p.total().multiply(RATE_95))
        : p;
}

Function<Pricing, Pricing> rules =
    memberDiscount(member)
        .andThen(couponDiscount(coupon))
        .andThen(freeShippingOver(new BigDecimal("1000")));
```

<div class="mt-5 grid grid-cols-2 gap-4 text-sm">
  <div v-click class="concept-card"><strong>加規則</strong><br><span class="muted">多寫一個函數、多 andThen 一次</span></div>
  <div v-click class="concept-card"><strong>不用改舊程式</strong><br><span class="muted">開放封閉原則的 FP 版</span></div>
</div>

---
layout: section
transition: fade
---

<p class="font-mono accent-orange">PART 05 — 100%</p>

# Functional Core, Imperative Shell

<p class="font-mono muted">核心絕對純粹，副作用住在邊界</p>

---
layout: two-cols
layoutClass: gap-7
---

# 殼與核心

```java {all|4-5|7-8|10-16|all}
@Service
public class CheckoutService { // Shell
    public CheckoutResponse checkout(Long id) {
        Order order = repo.findById(id)   // I/O
            .orElseThrow(...);

        CheckoutDecision decision = CheckoutCore
            .decide(order.snapshot(), clock.instant());

        return switch (decision) {
            case Approved a -> {
                repo.save(a.pricedOrder());        // I/O
                events.publish(new OrderPriced(a)); // I/O
                yield CheckoutResponse.ok(a);
            }
            case Rejected r ->
                CheckoutResponse.fail(r.reason());
        };
    }
}
```

::right::

## 核心全是純函數

```java
public final class CheckoutCore {
    public static CheckoutDecision decide(
        OrderSnapshot order, Instant now) {

        if (order.items().isEmpty())
            return new Rejected("空訂單");

        Pricing pricing = /* 純計算 */;
        return new Approved(
            order.withPricing(pricing));
    }
}
```

<div v-click class="mt-4 terminal-card text-sm">
  <p class="terminal-label">兩個關鍵設計</p>
  <div>1. 時間也是輸入：核心不偷看時鐘</div>
  <div class="mt-1">2. 核心回傳「決定」，殼負責「執行」</div>
</div>

---
---

# 0% vs 100%

| 指標 | 0% | 100% |
| --- | --- | --- |
| 可測試性 | mock 三個依賴才能開測 | 核心零 mock，毫秒級 |
| Null 安全 | NPE 看運氣 | Optional + record 寫進型別 |
| 可預測性 | 取決於當下狀態 | 相同輸入永遠相同輸出 |
| 併發安全 | 共享可變欄位，必壞 | 不可變資料，天生安全 |
| 錯誤處理 | 例外亂飛，全靠猜 | Result + switch 窮舉 |
| 擴充規則 | 往巢狀 if 裡塞 | 多一個函數、多一次 andThen |

<!--
逐列對照：每一列都是 0% 清單裡的一個缺點，在 100% 都有對應解藥。
-->

---
---

# 常見疑慮

<div class="space-y-3 mt-5">
  <div v-click class="concept-card"><strong>Spring 到處是副作用，衝突嗎？</strong><br><span class="muted">互補：Spring 管殼（DI、交易、事件），FP 管核心。@Transactional 包在 Shell 上，Core 不知道交易存在。</span></div>
  <div v-click class="concept-card"><strong>一直 new 物件，效能爆嗎？</strong><br><span class="muted">JVM 對短命小物件極快（TLAB + 分代 GC）。先換來正確性，壓測有熱點再談。</span></div>
  <div v-click class="concept-card"><strong>一定要走到 100%？</strong><br><span class="muted">每一格都是穩定停靠點：25% 已消滅 NPE 大宗；50% 讓核心測試零 mock。</span></div>
</div>

---
---

# 今日重點

<div class="grid grid-cols-2 gap-4 mt-5">
  <div v-click class="concept-card"><strong>25%</strong><br><span class="muted">Stream 宣告式、Optional 進型別</span></div>
  <div v-click class="concept-card"><strong>50%</strong><br><span class="muted">record 不可變、純函數零 mock</span></div>
  <div v-click class="concept-card"><strong>75%</strong><br><span class="muted">Result 編譯期把關、andThen 組規則</span></div>
  <div v-click class="concept-card"><strong>100%</strong><br><span class="muted">副作用住邊界，核心絕對純粹</span></div>
</div>

<div v-click class="mt-7 text-center text-lg font-mono">
  完美不是「沒有副作用」，是<span class="accent-orange">副作用全部住在邊界</span>。
</div>

---
layout: end
class: text-center
---

# Refactor complete.

<p class="mt-5 font-mono muted">下一步：互動版文章 /springboot/fp-in-spring-boot</p>

<div class="mt-10 terminal-card inline-block text-left text-sm">
  <div><span class="accent-green">$</span> spring run FunctionalLab --level=100</div>
  <div class="accent-orange mt-2">stream → record → result → core/shell</div>
</div>

<!--
延伸閱讀回文章：FP 入門指南、Functor、Monad、Point-Free，以及姊妹篇 Spring Boot × DDD。
-->
