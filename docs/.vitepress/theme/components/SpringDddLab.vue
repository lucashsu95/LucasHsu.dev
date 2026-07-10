<script setup>
import { computed, ref } from "vue";

const level = ref(0);

const stages = [
  {
    percent: 0,
    name: "貧血模型",
    status: "危險",
    color: "#f85149",
    caption: "Entity 只有 getter/setter，規則散落在 Service，非法狀態隨時出現。",
    code: `@Entity
public class Order {          // 貧血模型：只有資料，沒有行為
    private String status;    // 魔法字串："PENDING"、"PAID"...
    private double total;     // 金額用 double，精度看運氣
    // getter / setter 全開，任何人都能亂改
}

@Service
public class OrderService {   // Transaction Script：規則全塞在這
    public void pay(Long id, double amount) {
        Order order = orderRepository.findById(id).get();
        if (!"PENDING".equals(order.getStatus())) { // 規則用 if 拼裝
            throw new IllegalStateException("狀態不對");
        }
        order.setStatus("PAID");     // 同一行在 12 個地方出現過
        order.setPaidAmount(amount); // 忘了驗 amount，負數也照收
        emailService.send(order);    // 副作用混雜
        orderRepository.save(order);
    }
}`,
  },
  {
    percent: 25,
    name: "Value Object",
    status: "起步",
    color: "#e76f00",
    caption: "值物件取代原始型別偏執，驗證寫進型別，負數金額根本建不出來。",
    code: `// 值物件：不可變 + 自帶驗證，非法值無法存在
public record Money(BigDecimal amount, Currency currency) {
    public Money {
        if (amount.signum() < 0)
            throw new IllegalArgumentException("金額不可為負");
    }
    public Money plus(Money other) {
        requireSameCurrency(other);
        return new Money(amount.add(other.amount), currency);
    }
}

public enum OrderStatus { PENDING, PAID, SHIPPED, CANCELLED }

@Entity
public class Order {
    @Enumerated(EnumType.STRING)
    private OrderStatus status; // 不再是魔法字串

    @Embedded
    private Money total;        // 驗證住進型別，到處的 if 消失
}`,
  },
  {
    percent: 50,
    name: "充血模型與領域語言",
    status: "漸入佳境",
    color: "#d4a72c",
    caption: "行為搬進實體、方法名說業務的話，不變條件由物件自己守護。",
    code: `@Entity
public class Order {
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    @Embedded private Money total;

    protected Order() {} // 只給 JPA 用

    public void pay(Money amount) { // 領域語言：訂單「付款」
        if (status != OrderStatus.PENDING)
            throw new OrderNotPayableException(id, status);
        if (!amount.equals(total))
            throw new PaymentMismatchException(total, amount);
        this.status = OrderStatus.PAID; // 狀態轉移只有這一條路
    }
    // 沒有 setStatus()：外界改不了狀態，非法狀態不可能出現
}

@Service
public class OrderService {
    @Transactional
    public void pay(Long id, Money amount) {
        Order order = findOrder(id);
        order.pay(amount); // Service 變薄：找到人，請他做事
    }
}`,
  },
  {
    percent: 75,
    name: "Aggregate 與 Repository",
    status: "穩健",
    color: "#5382a1",
    caption: "聚合根界定一致性邊界：想動內部？一律跟 root 說。",
    code: `@Entity
public class Order { // Aggregate Root：一致性邊界的守門人
    @OneToMany(cascade = ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    public void addItem(Product product, int qty) {
        if (status != OrderStatus.PENDING)
            throw new OrderLockedException(id);
        items.add(OrderItem.of(product, qty));
        this.total = calculateTotal(); // 不變條件：total 恆等於明細加總
    }

    public List<OrderItem> items() {
        return List.copyOf(items);     // 外面只拿得到唯讀副本
    }

    public static Order place(Customer customer, List<OrderItem> items) {
        // 工廠方法：出生即合法，不存在「建到一半」的訂單
    }
}

// Repository 只服務聚合根：沒有 OrderItemRepository 這種東西
public interface OrderRepository extends JpaRepository<Order, Long> {}`,
  },
  {
    percent: 100,
    name: "Domain Event 與 Bounded Context",
    status: "完美",
    color: "#7ee787",
    caption: "領域事件解耦模組、限界上下文各管各的模型。完整的領域防線。",
    code: `@Entity
public class Order extends AbstractAggregateRoot<Order> {

    public void pay(Money amount) {
        ensurePayable(amount);              // 守護不變條件
        this.status = OrderStatus.PAID;
        registerEvent(new OrderPaid(id, total)); // 宣告「發生了什麼」
    }
}

// 別的模組自己決定要不要關心（跨聚合、最終一致）
@Component
class ShippingHandler {
    @TransactionalEventListener
    void on(OrderPaid event) {
        shippingService.prepare(event.orderId());
    }
}

// Bounded Context：ordering / shipping / billing 各自一個模組
// 「Product」在訂購上下文是價格與庫存，在物流上下文是重量與尺寸
// —— 不再用一個萬能 Entity 撐全站`,
  },
];

const aspects = [
  {
    unlockAt: 25,
    bad: "金額用 double、狀態用魔法字串",
    good: "Money / OrderStatus 把規則寫進型別",
  },
  {
    unlockAt: 25,
    bad: "同一段驗證 if 複製貼上到每個 Service",
    good: "值物件自帶驗證，非法值建不出來",
  },
  {
    unlockAt: 50,
    bad: "商業規則散落 N 個 Service，找不到也改不齊",
    good: "行為住進實體，每條規則只有一份",
  },
  {
    unlockAt: 50,
    bad: "setter 全開，任何一層都能把狀態改壞",
    good: "沒有 setter，實體自我守護不變條件",
  },
  {
    unlockAt: 75,
    bad: "想改哪張表就改哪張，一致性看緣分",
    good: "Aggregate 界定交易邊界，改動必經 root",
  },
  {
    unlockAt: 100,
    bad: "跨模組直接互呼，改一處動全身",
    good: "Domain Event 解耦，Bounded Context 分家",
  },
];

const metrics = [
  { label: "不變條件", values: [10, 35, 70, 85, 100] },
  { label: "業務語意", values: [5, 30, 75, 85, 100] },
  { label: "修改安全", values: [15, 25, 60, 80, 100] },
  { label: "模組解耦", values: [10, 15, 35, 65, 100] },
];

const stage = computed(() => stages[level.value]);
const percent = computed(() => stage.value.percent);
</script>

<template>
  <section class="ddd-lab" aria-labelledby="ddd-lab-title">
    <header class="lab-header">
      <div>
        <p class="eyebrow">$ spring run DomainLab</p>
        <h2 id="ddd-lab-title">DDD 採用度實驗室</h2>
      </div>
      <span class="status" :style="{ color: stage.color }" aria-live="polite">
        ● {{ stage.status }}
      </span>
    </header>

    <div class="slider-block">
      <label for="ddd-level">
        拖動拉桿，看同一個訂單模型從 <strong>0%（貧血、缺點全開）</strong> 進化到
        <strong>100%（完美）</strong>
      </label>
      <input
        id="ddd-level"
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
      <p class="panel-label">ORDER MODEL — {{ percent }}% DDD</p>
      <pre><code>{{ stage.code }}</code></pre>
    </div>

    <div class="bottom-grid">
      <div class="checklist">
        <p class="panel-label">領域防線檢查</p>
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
.ddd-lab {
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
