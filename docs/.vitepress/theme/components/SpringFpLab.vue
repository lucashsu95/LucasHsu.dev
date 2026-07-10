<script setup>
import { computed, ref } from "vue";

const level = ref(0);

const stages = [
  {
    percent: 0,
    name: "傳統命令式",
    status: "危險",
    color: "#f85149",
    caption: "共享可變狀態 + null 滿地 + 副作用混雜，每一行都是地雷。",
    code: `@Service
public class OrderService {
    private double total; // 共享可變狀態，併發直接壞掉

    public Order checkout(Long id) {
        Order order = orderRepository.findById(id).get(); // 可能 NPE
        total = 0;
        for (OrderItem item : order.getItems()) {
            if (item != null && item.getPrice() != null) { // null 防不完
                total += item.getPrice() * item.getQty();
            }
        }
        if (order.getCoupon() != null) {
            if (order.getCoupon().isValid()) {
                total = total * 0.9; // 計算邏輯埋在流程裡
            }
        }
        order.setTotal(total);    // 直接改物件狀態
        emailService.send(order); // 隱藏副作用
        return orderRepository.save(order);
    }
}`,
  },
  {
    percent: 25,
    name: "Stream 與 Optional",
    status: "起步",
    color: "#e76f00",
    caption: "宣告式取代迴圈、Optional 取代 null 判斷，但狀態還是可變的。",
    code: `public Order checkout(Long id) {
    Order order = orderRepository.findById(id)
        .orElseThrow(() -> new OrderNotFoundException(id)); // 不再裸奔 .get()

    double total = order.getItems().stream()   // 宣告式：說「做什麼」
        .filter(Objects::nonNull)               // 不再手寫「怎麼做」
        .mapToDouble(i -> i.getPrice() * i.getQty())
        .sum();

    double discounted = Optional.ofNullable(order.getCoupon())
        .filter(Coupon::isValid)                // null 判斷變成管線
        .map(c -> total * 0.9)
        .orElse(total);

    order.setTotal(discounted);   // 還是在改物件
    emailService.send(order);     // 副作用還混在計算裡
    return orderRepository.save(order);
}`,
  },
  {
    percent: 50,
    name: "不可變資料與純函數",
    status: "漸入佳境",
    color: "#d4a72c",
    caption: "record 鎖住狀態、計算邏輯抽成純函數，測試不再需要 mock。",
    code: `// record：不可變，沒有 setter，狀態不會被偷改
public record Pricing(BigDecimal subtotal, BigDecimal total) {}

public final class PricingRules { // 純函數：相同輸入 → 相同輸出
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
}`,
  },
  {
    percent: 75,
    name: "Result 型別與函數組合",
    status: "穩健",
    color: "#5382a1",
    caption: "錯誤變成型別的一部分、商業規則組合成管線，編譯器幫你把關。",
    code: `public sealed interface Result<T> {           // 錯誤寫進型別
    record Ok<T>(T value) implements Result<T> {}
    record Err<T>(String reason) implements Result<T> {}
}

// 每條折扣規則都是一個小函數
static UnaryOperator<Pricing> memberDiscount(Member member) {
    return p -> member.isVip()
        ? p.withTotal(p.total().multiply(new BigDecimal("0.95")))
        : p;
}

// 商業規則 = 小函數組合成的管線，加規則不必改舊程式
Function<Pricing, Pricing> rules =
    memberDiscount(member)
        .andThen(couponDiscount(coupon))
        .andThen(freeShippingOver(new BigDecimal("1000")));

Result<Pricing> result = validate(order)  // Err 就短路
    .map(o -> PricingRules.price(o.items(), o.coupon()))
    .map(rules);                          // 呼叫端 switch 窮舉，漏接編譯不過`,
  },
  {
    percent: 100,
    name: "Functional Core, Imperative Shell",
    status: "完美",
    color: "#7ee787",
    caption: "核心 100% 純函數，副作用全部推到最外層的殼。可測、可組合、可預測。",
    code: `// Imperative Shell：只有這層碰 DB / Email / 時鐘（副作用集中在邊界）
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

// CheckoutCore 全是純函數：零 mock、毫秒級測試、絕對可預測`,
  },
];

const aspects = [
  {
    unlockAt: 25,
    bad: "到處 null 檢查，NPE 隨時引爆",
    good: "Optional 讓「可能沒有值」寫進型別",
  },
  {
    unlockAt: 25,
    bad: "for 迴圈手寫「怎麼做」，意圖被淹沒",
    good: "Stream 宣告式表達「做什麼」",
  },
  {
    unlockAt: 50,
    bad: "setter 滿天飛，狀態隨時被任何人偷改",
    good: "record 不可變，資料一出生就定型",
  },
  {
    unlockAt: 50,
    bad: "計算混著 DB 與 Email，測試要 mock 一堆",
    good: "純函數計算，new 出來直接測",
  },
  {
    unlockAt: 75,
    bad: "用例外控制流程，呼叫端不知道會炸什麼",
    good: "Result 型別讓錯誤處理被編譯器強制",
  },
  {
    unlockAt: 100,
    bad: "副作用散落各層，改一行怕動全身",
    good: "副作用集中在殼，核心絕對純粹",
  },
];

const metrics = [
  { label: "可測試性", values: [10, 25, 60, 80, 100] },
  { label: "Null 安全", values: [5, 55, 70, 90, 100] },
  { label: "可預測性", values: [15, 30, 65, 85, 100] },
  { label: "併發安全", values: [5, 15, 60, 75, 100] },
];

const stage = computed(() => stages[level.value]);
const percent = computed(() => stage.value.percent);
</script>

<template>
  <section class="fp-lab" aria-labelledby="fp-lab-title">
    <header class="lab-header">
      <div>
        <p class="eyebrow">$ spring run FunctionalLab</p>
        <h2 id="fp-lab-title">FP 採用度實驗室</h2>
      </div>
      <span class="status" :style="{ color: stage.color }" aria-live="polite">
        ● {{ stage.status }}
      </span>
    </header>

    <div class="slider-block">
      <label for="fp-level">
        拖動拉桿，看同一段結帳邏輯從 <strong>0%（缺點全開）</strong> 進化到
        <strong>100%（完美）</strong>
      </label>
      <input
        id="fp-level"
        v-model.number="level"
        type="range"
        min="0"
        max="4"
        step="1"
        :aria-valuetext="`${percent}%：${stage.name}`"
      />
      <div class="ticks" aria-hidden="true">
        <button
          v-for="(s, index) in stages"
          :key="s.percent"
          type="button"
          :class="{ active: level === index }"
          @click="level = index"
        >
          {{ s.percent }}%
        </button>
      </div>
    </div>

    <div class="stage-title" aria-live="polite">
      <span class="percent" :style="{ color: stage.color }">{{ percent }}%</span>
      <div>
        <p class="stage-name">{{ stage.name }}</p>
        <p class="stage-caption">{{ stage.caption }}</p>
      </div>
    </div>

    <div class="code-panel">
      <p class="panel-label">ORDER SERVICE — {{ percent }}% FP</p>
      <pre><code>{{ stage.code }}</code></pre>
    </div>

    <div class="bottom-grid">
      <div class="checklist">
        <p class="panel-label">體質檢查</p>
        <ul>
          <li
            v-for="aspect in aspects"
            :key="aspect.bad"
            :class="percent >= aspect.unlockAt ? 'good' : 'bad'"
          >
            <span aria-hidden="true">{{ percent >= aspect.unlockAt ? "✓" : "✗" }}</span>
            {{ percent >= aspect.unlockAt ? aspect.good : aspect.bad }}
          </li>
        </ul>
      </div>

      <div class="metrics">
        <p class="panel-label">健康指標</p>
        <div v-for="metric in metrics" :key="metric.label" class="metric">
          <span class="metric-label">{{ metric.label }}</span>
          <div class="bar-track">
            <div
              class="bar-fill"
              :style="{ width: `${metric.values[level]}%`, background: stage.color }"
            ></div>
          </div>
          <span class="metric-value">{{ metric.values[level] }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fp-lab {
  --green: #7ee787;
  --blue: #5382a1;
  margin: 1.75rem 0;
  padding: clamp(1rem, 3vw, 1.5rem);
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 70%, var(--blue));
  border-radius: 16px;
  background:
    linear-gradient(rgba(83, 130, 161, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(83, 130, 161, 0.06) 1px, transparent 1px),
    var(--vp-c-bg-soft);
  background-size: 24px 24px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
}

.lab-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.lab-header h2 {
  margin: 0;
  border: 0;
  font-size: 1.2rem;
}

.eyebrow,
.panel-label,
.status {
  margin: 0;
  color: var(--green);
  font: 700 0.72rem/1.4 var(--vp-font-family-mono);
  letter-spacing: 0.08em;
}

.status {
  white-space: nowrap;
}

.slider-block label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  font-weight: 700;
}

input[type="range"] {
  width: 100%;
  accent-color: v-bind("stage.color");
  cursor: pointer;
}

.ticks {
  display: flex;
  justify-content: space-between;
  margin: 0.25rem 0 1rem;
}

.ticks button {
  padding: 0.2rem 0.45rem;
  border: 1px solid transparent;
  border-radius: 6px;
  background: none;
  color: var(--vp-c-text-3);
  font: 700 0.72rem/1.4 var(--vp-font-family-mono);
  cursor: pointer;
}

.ticks button.active {
  border-color: v-bind("stage.color");
  color: var(--vp-c-text-1);
}

.stage-title {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 0.75rem;
}

.percent {
  font: 800 2rem/1 var(--vp-font-family-mono);
}

.stage-name {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 800;
}

.stage-caption {
  margin: 0.15rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}

.code-panel,
.checklist,
.metrics {
  overflow: auto;
  padding: 1rem;
  border: 1px solid rgba(125, 140, 160, 0.24);
  border-radius: 10px;
  background: #0d1117;
  color: #e5e7eb;
  font-family: var(--vp-font-family-mono);
}

.code-panel pre {
  margin: 0.6rem 0 0;
  padding: 0;
  background: none;
}

.code-panel code {
  display: block;
  padding: 0;
  background: none;
  color: #e5e7eb;
  font-size: 0.74rem;
  line-height: 1.6;
  white-space: pre;
}

.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.checklist ul {
  margin: 0.6rem 0 0;
  padding: 0;
  list-style: none;
}

.checklist li {
  display: grid;
  grid-template-columns: 1.1rem 1fr;
  gap: 0.4rem;
  margin: 0.4rem 0;
  font-size: 0.74rem;
  line-height: 1.5;
}

.checklist li.bad span {
  color: #f85149;
  font-weight: 800;
}

.checklist li.bad {
  color: #ffa198;
}

.checklist li.good span {
  color: var(--green);
  font-weight: 800;
}

.checklist li.good {
  color: #e5e7eb;
}

.metric {
  display: grid;
  grid-template-columns: 4.6em 1fr 2.2em;
  align-items: center;
  gap: 0.5rem;
  margin: 0.55rem 0;
  font-size: 0.72rem;
}

.metric-label {
  color: #8b949e;
}

.metric-value {
  text-align: right;
  color: #e5e7eb;
}

.bar-track {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: #21262d;
}

.bar-fill {
  height: 100%;
  border-radius: 999px;
}

button:focus-visible,
input[type="range"]:focus-visible {
  outline: 3px solid var(--green);
  outline-offset: 3px;
}

@media (max-width: 640px) {
  .bottom-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .bar-fill {
    transition: width 0.3s ease, background-color 0.3s ease;
  }
  .ticks button {
    transition: border-color 0.18s ease, color 0.18s ease;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition: none !important;
    animation: none !important;
  }
}
</style>
