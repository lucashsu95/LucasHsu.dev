---
title: "Spring Boot × DDD：從貧血模型到完整領域防線 | LucasHsu.dev"
description: 把 DDD 概念一步步引進 Spring Boot：從 0% 的貧血模型，經過 Value Object、充血實體、Aggregate、Repository，走到 100% 的 Domain Event 與 Bounded Context。
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Spring Boot, DDD, Domain-Driven Design, 貧血模型, Value Object, Aggregate, Repository, Domain Event, Bounded Context, Ubiquitous Language
  - - meta
    - property: og:title
      content: Spring Boot × DDD：從貧血模型到完整領域防線
  - - meta
    - property: og:description
      content: 用同一個訂單模型，示範 DDD 採用度從 0% 到 100% 的五個階段，每一階段補上哪道領域防線。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/springboot-cover.webp
---

<script setup>
import SpringDddLab from "../.vitepress/theme/components/SpringDddLab.vue"
</script>

# Spring Boot × DDD：從貧血模型到完整領域防線

> 📝 TL;DR：DDD 不是先畫一堆架構圖，而是一道一道補上「領域防線」：**0% 的貧血模型裡，Entity 只是資料袋，商業規則散落在各個 Service，非法狀態隨時出現**；每往上採用一階 DDD 戰術模式，就多一道防線——Value Object 讓非法值建不出來、充血實體讓非法狀態不可能存在、Aggregate 讓一致性有邊界；**走到 100%，Domain Event 與 Bounded Context 讓模組徹底解耦**，這就是完美狀態。

## 先玩再讀：DDD 採用度實驗室

同一個「訂單」模型，把拉桿從 0% 拉到 100%，觀察程式碼、領域防線與健康指標怎麼變化：

<SpringDddLab />

## 前置知識

- **JPA 基礎** — Entity、`@Embedded`、關聯映射，建議先讀 [JPA 持久化上下文](/springboot/persistence-context)
- **@Transactional** — 交易邊界的概念，見 [@Transactional 事務管理](/springboot/transactional)
- **分層架構** — 可搭配 [Clean Architecture 簡潔解析](/concepts/clean-architecture) 服用

## 為什麼 Spring Boot 專案需要 DDD？

用 Spring Initializr 開出來的專案天生就是三層架構：Controller → Service → Repository。這個架構本身沒錯，錯的是多數專案把 Entity 寫成**貧血模型**（Anemic Domain Model）之後的連鎖反應：

| 病灶             | 症狀                                                     | DDD 的解藥                          |
| ---------------- | -------------------------------------------------------- | ----------------------------------- |
| 原始型別偏執     | 金額用 `double`、狀態用字串，驗證 if 到處複製            | Value Object 把規則寫進型別         |
| 規則散落         | 「訂單何時能付款」的邏輯出現在 5 個 Service              | 充血實體：行為與資料住在一起        |
| 非法狀態         | setter 全開，任何一層都能把 `PAID` 改回 `PENDING`        | 實體自我守護不變條件                |
| 一致性看緣分     | 想改哪張表就改哪張，`total` 跟明細對不上                 | Aggregate 界定交易邊界              |
| 模組糾纏         | 訂單改一行，物流、金流、通知全部要重測                   | Domain Event + Bounded Context 解耦 |

跟 FP 一樣，DDD 的採用是一條**光譜**。下面用同一個訂單模型走完 0% → 100% 的五個階段。

## 0%：貧血模型——Entity 只是資料袋

先誠實面對多數專案的起點：

```java
@Entity
public class Order {          // ❌ 貧血模型：只有資料，沒有行為
    private String status;    // ❌ 魔法字串："PENDING"、"PAID"...打錯編譯器不會救你
    private double total;     // ❌ 金額用 double，0.1 + 0.2 的精度問題等著你
    // getter / setter 全開，任何人都能亂改
}

@Service
public class OrderService {   // ❌ Transaction Script：所有規則塞在這
    public void pay(Long id, double amount) {
        Order order = orderRepository.findById(id).get();
        if (!"PENDING".equals(order.getStatus())) { // ❌ 規則用 if 拼裝
            throw new IllegalStateException("狀態不對");
        }
        order.setStatus("PAID");     // ❌ 同一行在 12 個地方都出現過
        order.setPaidAmount(amount); // ❌ 忘了驗 amount，負數也照收
        emailService.send(order);    // ❌ 副作用混雜
        orderRepository.save(order);
    }
}
```

這段程式碼的缺點清單：

- **規則沒有家**：「什麼狀態能付款」這條規則屬於訂單，卻寫在 Service。下一個人在 `RefundService` 又寫一次，兩份規則開始漂移。
- **非法狀態隨時出現**：`setStatus("SHIPPED")` 誰都能呼叫，出貨中的訂單可以被改回待付款。
- **程式碼不說業務的話**：PM 說「訂單付款」，程式碼寫 `setStatus` + `setPaidAmount`——中間的翻譯損耗就是 bug 的溫床。

## 25%：Value Object——非法值建不出來

第一階不動架構，先治「原始型別偏執」（Primitive Obsession）：

```java
// 值物件：不可變 + 自帶驗證
public record Money(BigDecimal amount, Currency currency) {
    public Money {
        if (amount.signum() < 0) {
            throw new IllegalArgumentException("金額不可為負");
        }
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
    private OrderStatus status; // ✅ 不再是魔法字串，打錯直接編譯不過

    @Embedded
    private Money total;        // ✅ 驗證住進型別，負數金額根本建不出來
}
```

**補上的防線**：驗證只寫一次、寫在型別裡。從此不用在每個 Service 檢查「金額是不是負的」——因為負的 `Money` 這種東西**不存在**。

**還沒解決**：規則仍散落在 Service、狀態仍可被任意改。

:::tip Value Object 與 record 是天作之合
值物件的三個要求——不可變、以值比較相等、自帶驗證——正好是 Java `record` 的預設行為（compact constructor 負責驗證）。`record` 在持久層的更多用法見 [Record DTO Projection 實戰指南](/springboot/record-dto-projection)。
:::

## 50%：充血模型與領域語言——非法狀態不可能存在

第二階是 DDD 改造**投資報酬率最高**的一步：把行為搬回實體，讓程式碼說業務的話（Ubiquitous Language，通用語言）。

```java
@Entity
public class Order {
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    @Embedded private Money total;

    protected Order() {} // 只給 JPA 用

    public void pay(Money amount) { // ✅ 領域語言：訂單「付款」
        if (status != OrderStatus.PENDING) {
            throw new OrderNotPayableException(id, status);
        }
        if (!amount.equals(total)) {
            throw new PaymentMismatchException(total, amount);
        }
        this.status = OrderStatus.PAID; // ✅ 狀態轉移只有這一條路
    }

    public void cancel() { // ✅ 每條規則都有唯一的家
        if (status == OrderStatus.SHIPPED) {
            throw new OrderAlreadyShippedException(id);
        }
        this.status = OrderStatus.CANCELLED;
    }
    // 注意：沒有 setStatus()。外界改不了狀態，非法狀態不可能出現。
}

@Service
public class OrderService {
    @Transactional
    public void pay(Long id, Money amount) {
        Order order = findOrder(id);
        order.pay(amount); // ✅ Service 變薄：找到人，請他做事
    }
}
```

測試也跟著解放——測「付款規則」不需要碰資料庫：

```java
@Test
void 已出貨的訂單不能取消() {
    Order order = shippedOrder(); // 純物件，不用 @SpringBootTest

    assertThatThrownBy(order::cancel)
        .isInstanceOf(OrderAlreadyShippedException.class);
}
```

**補上的防線**：規則只有一份、住在它所屬的物件裡；沒有 setter，狀態轉移必經守衛。

**還沒解決**：訂單明細（`OrderItem`）還是可以繞過訂單被直接修改，`total` 跟明細可能對不上。

## 75%：Aggregate 與 Repository——一致性有了邊界

第三階引入 DDD 最重要的戰術模式：**聚合（Aggregate）**。聚合根是一致性邊界的守門人——想動邊界內的任何東西，一律跟 root 說。

```java
@Entity
public class Order { // ✅ Aggregate Root：一致性邊界的守門人
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    public void addItem(Product product, int qty) { // ✅ 想動 items？跟 root 說
        if (status != OrderStatus.PENDING) {
            throw new OrderLockedException(id);
        }
        items.add(OrderItem.of(product, qty));
        this.total = calculateTotal(); // ✅ 不變條件：total 恆等於明細加總
    }

    public List<OrderItem> items() {
        return List.copyOf(items);     // ✅ 外面只拿得到唯讀副本
    }

    public static Order place(Customer customer, List<OrderItem> items) {
        // ✅ 工廠方法：出生即合法，不存在「建到一半」的訂單
        Order order = new Order(customer);
        items.forEach(i -> order.addItem(i.product(), i.qty()));
        return order;
    }
}

// ✅ Repository 只服務聚合根：沒有 OrderItemRepository 這種東西
public interface OrderRepository extends JpaRepository<Order, Long> {}
```

兩個設計重點：

1. **一個聚合 = 一個交易**：`@Transactional` 的邊界對齊聚合邊界，`total 恆等於明細加總` 這條不變條件在交易結束時必然成立。搭配 [@Transactional 事務管理](/springboot/transactional) 與[樂觀鎖](/springboot/optimistic-pessimistic-locking)（聚合根加 `@Version`）效果最佳。
2. **跨聚合只用 ID 參照**：`Order` 不持有 `Customer` 實體，只持有 `CustomerId`——聚合之間保持距離，才不會整張物件圖被一次撈起來（順便避開 [N+1 問題](/springboot/data-pagination)）。

**補上的防線**：一致性有了明確邊界，「想改哪張表就改哪張」的年代結束。

**還沒解決**：付款之後要通知物流、金流、Email——這些跨模組的連動還是直接互呼。

## 100%：Domain Event 與 Bounded Context——完美狀態

最後一階從「一個模型」放大到「整個系統」：聚合宣告**發生了什麼**（Domain Event），其他模組自己決定要不要關心；系統依業務語意切成**限界上下文**（Bounded Context）。

```java
@Entity
public class Order extends AbstractAggregateRoot<Order> {

    public void pay(Money amount) {
        ensurePayable(amount);                   // 守護不變條件
        this.status = OrderStatus.PAID;
        registerEvent(new OrderPaid(id, total)); // ✅ 宣告「發生了什麼」
    }
}

// ✅ 別的模組自己決定要不要關心（跨聚合、最終一致）
@Component
class ShippingHandler {
    @TransactionalEventListener
    void on(OrderPaid event) {
        shippingService.prepare(event.orderId());
    }
}

@Component
class NotificationHandler {
    @TransactionalEventListener
    void on(OrderPaid event) {
        emailService.sendReceipt(event.orderId()); // 訂單模組完全不認識它
    }
}
```

Spring Data 的 `AbstractAggregateRoot` 會在 `save()` 時自動發布 `registerEvent()` 累積的事件；`@TransactionalEventListener` 保證「交易成功 commit 之後」才處理——事件機制的細節見 [Application Events + @TransactionalEventListener](/springboot/application-events)。

再配上限界上下文，模組結構長這樣：

```
src/main/java/com/shop/
├── ordering/    # 訂購上下文：Order、Money、OrderPaid
├── shipping/    # 物流上下文：Shipment、「Product」= 重量與尺寸
├── billing/     # 金流上下文：Invoice、「Product」= 稅率與科目
└── catalog/     # 商品上下文：「Product」= 名稱、價格、庫存
```

同一個「Product」在不同上下文是**不同的模型**——這不是重複，是解耦。不再用一個 50 個欄位的萬能 Entity 撐全站。

到這裡，領域防線全數就位：

| 指標           | 0%                                 | 100%                                     |
| -------------- | ---------------------------------- | ---------------------------------------- |
| 非法值         | 負數金額、錯字狀態照收             | Value Object：建構即驗證，非法值不存在   |
| 非法狀態       | setter 全開，狀態隨人改            | 充血實體：狀態轉移必經守衛               |
| 規則位置       | 散落 N 個 Service，改不齊          | 每條規則唯一的家，就在它所屬的物件       |
| 一致性         | 看緣分，`total` 跟明細常對不上     | Aggregate：交易邊界內恆成立              |
| 業務語意       | `setStatus("PAID")` 需要人腦翻譯   | `order.pay(amount)` 與 PM 說同一種語言   |
| 模組耦合       | 訂單改一行，全站重測               | Domain Event + Bounded Context，各管各的 |

## 常見疑慮

**Q：JPA 的 Entity 當領域模型，不會被框架綁死嗎？**

務實的折衷是可以接受的：`protected` 無參建構子給 JPA、`@Embedded` 放值物件、`@Version` 做樂觀鎖，領域行為照寫。真的需要完全隔離（領域模型零註解）再引入獨立的 Persistence Model + Mapper，那是 100% 之後的選修題。

**Q：DDD 跟 @Valid 驗證是什麼關係？**

[@Valid](/springboot/valid-service) 守的是**輸入格式**（DTO：欄位必填、Email 格式），值物件與實體守的是**商業規則**（狀態能不能轉移、金額能不能為負）。前者擋在門口，後者守在核心，兩層都要有。

**Q：小專案也要走到 100% 嗎？**

拉桿每一格都是穩定的停靠點：CRUD 後台停在 25%（值物件治好 double 金額）就很划算；有真實商業規則的核心模組建議至少到 50%。但跟 FP 一樣，方向是明確的——**每往右一格，就少一類「資料怎麼會變成這樣」的靈異事件**。

## 結語

DDD 在 Spring Boot 裡不是換框架，是把防線一道道補回來：

- **0% 的每個缺點**（魔法字串、規則散落、非法狀態、一致性看緣分）都有對應的戰術模式解藥。
- **改造是漸進的**：Value Object → 充血實體 → Aggregate/Repository → Domain Event/Bounded Context。
- **100% 的完美狀態**不是「畫滿架構圖」，而是「非法狀態不可能存在、每條規則有唯一的家、模組之間只透過事件說話」。

## 延伸閱讀

- [Spring Boot × FP：從 0% 到 100% 的體質改造](/springboot/fp-in-spring-boot) — 姊妹篇：同樣的拉桿，換成 FP 視角
- [Clean Architecture 簡潔解析](/concepts/clean-architecture) — 依賴方向與分層的理論基礎
- [@Transactional 事務管理](/springboot/transactional) — 交易邊界如何對齊聚合邊界
- [樂觀鎖與悲觀鎖實作](/springboot/optimistic-pessimistic-locking) — 聚合根 + `@Version` 的併發防護
- [Application Events + @TransactionalEventListener](/springboot/application-events) — Domain Event 的 Spring 實作細節
- [Record DTO Projection 實戰指南](/springboot/record-dto-projection) — `record` 在持久層的實戰
