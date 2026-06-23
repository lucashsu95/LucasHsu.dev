---
title: "Spring Boot Specification 動態查詢指南 | LucasHsu.dev"
description: 深入掌握 Spring Data JPA Specification，動態組裝查詢條件、處理 join/subquery，搭配分頁排序打造彈性後端查詢架構
head:
  - - meta
    - name: keywords
      content: Spring Boot, JPA, Specification, 動態查詢, Criteria API, QueryDSL, 分頁
  - - meta
    - property: og:title
      content: "Spring Boot Specification 動態查詢指南"
  - - meta
    - property: og:description
      content: 深入掌握 Spring Data JPA Specification，動態組裝查詢條件、處理 join/subquery
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/springboot-cover.webp
---

# Spring Boot Specification 完全指南：動態查詢的設計與實戰

> 📝 TL;DR：`Specification` 就像樂高積木——每個條件是一塊小積木，動態組合出你要的查詢。**條件存在才加入，不存在就跳過**，從此告別又臭又長的 `if` 拼字串地獄。

## 前置知識

- **JPA 基礎** - 知道 Entity、Repository 是什麼
- **Spring Data JPA** - 用過 `JpaRepository`
- **Lambda / 函式式介面** - 了解 Java 8 lambda 語法

## 什麼是 Specification？

在 Spring Data JPA 中，`Specification` 是一個用來**動態組裝查詢條件**的介面，定義在 `org.springframework.data.jpa.domain.Specification<T>` 裡。它本質上是對 JPA Criteria API 的一層封裝，讓開發者不需要寫死 SQL 或 JPQL，就能根據執行時的條件，組合出對應的 `WHERE` 子句。

它的核心介面非常簡單，是一個函式式介面：

```java
public interface Specification<T> {
    Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder);
}
```

| 參數 | 作用 | 白話文 |
|------|------|--------|
| `Root<T>` | 代表查詢的主體 Entity | 你可以從這裡取得欄位 |
| `CriteriaQuery<?>` | 代表整個查詢結構 | 設定 distinct、groupBy、orderBy |
| `CriteriaBuilder` | 提供建立條件的工廠方法 | equal、like、between、and、or... |
| 回傳 `Predicate` | 最終要套用的查詢條件 | 組好的篩選條件 |

簡單來說，Specification 就是「**把一段查詢條件包裝成一個物件**」，這些物件可以被組合、重用、動態拼接，最後丟給 Repository 執行。

## 為什麼需要 Specification？

Spring Data JPA 提供了幾種查詢方式，但各自有限制：

| 方式 | 優點 | 缺點 |
|------|------|------|
| 方法名稱衍生查詢 | 簡單直覺 | 條件一多方法名落落長，**所有條件都是必填** |
| `@Query` 自訂 JPQL/SQL | 靈活度高 | 難以處理動態條件，大量 `if` 拼字串 |
| **Specification** | **動態組合、可重用** | 型別安全較弱（欄位用字串） |

`Specification` 把每個條件變成一個獨立的小單元，再依照「使用者實際傳進來的參數」動態組合，沒有傳的條件就不加入查詢。這正是後台管理系統、報表系統最常見的需求。

## 基本用法

### Entity 範例

```java
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderNo;

    private String status; // PENDING, PAID, SHIPPED, CANCELLED

    private BigDecimal totalAmount;

    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> items;

    // getters / setters
}
```

### Repository 要繼承 `JpaSpecificationExecutor`

```java
public interface OrderRepository
        extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
}
```

`JpaSpecificationExecutor` 提供了一系列接收 `Specification` 的方法：

```java
List<T> findAll(Specification<T> spec);
Page<T> findAll(Specification<T> spec, Pageable pageable);
long count(Specification<T> spec);
Optional<T> findOne(Specification<T> spec);
```

### 建立一個簡單的 Specification

```java
public class OrderSpecifications {

    public static Specification<Order> hasStatus(String status) {
        return (root, query, cb) ->
                status == null ? null : cb.equal(root.get("status"), status);
    }

    public static Specification<Order> amountGreaterThan(BigDecimal amount) {
        return (root, query, cb) ->
                amount == null ? null : cb.greaterThan(root.get("totalAmount"), amount);
    }
}
```

:::warning ⚠️ null 回傳是關鍵
當條件不存在時，回傳 `null` 即可。Spring Data JPA 在組合條件時，會自動忽略 `null` 的 Predicate，這正是動態查詢的關鍵。
:::

### 使用方式

```java
Specification<Order> spec = Specification
        .where(OrderSpecifications.hasStatus("PAID"))
        .and(OrderSpecifications.amountGreaterThan(new BigDecimal("1000")));

List<Order> result = orderRepository.findAll(spec);
```

## 適用情境

### 後台管理系統的多條件查詢
最典型的場景：一個訂單列表頁，使用者可以選填「訂單狀態」、「日期區間」、「客戶名稱」、「金額範圍」等任意組合的篩選條件。

### 報表 / 匯出功能
報表系統往往需要依不同維度（時間、部門、產品線）做篩選與聚合，Specification 可以搭配 `CriteriaQuery` 的 `groupBy`、`having` 做更複雜的統計查詢。

### 多租戶（Multi-tenant）資料隔離
把「租戶 ID 篩選」寫成一個固定的 Specification，每次查詢自動加上，確保資料隔離不會被遺漏。

### 權限相關的資料過濾
一般使用者只能看到自己的資料，主管可以看到整個部門。依登入者角色動態組合不同的 Specification。

### API 查詢參數（Query DTO）動態轉換
前端傳來篩選條件物件（QueryDTO），後端依照非 null 的欄位逐一轉換成 Specification 並組合，是非常常見的 RESTful 查詢設計模式。

## 進階操作

### 條件組合：`and()` / `or()` / `not()`

```java
Specification<Order> spec = Specification
        .where(OrderSpecifications.hasStatus("PAID"))
        .and(OrderSpecifications.amountGreaterThan(new BigDecimal("1000")))
        .or(OrderSpecifications.hasStatus("SHIPPED"));
```

也可以用 `not()` 來反轉條件：

```java
Specification<Order> notCancelled = Specification.not(OrderSpecifications.hasStatus("CANCELLED"));
```

### 用 `Specification.where(null)` 當起點，避免 NPE

如果不從 `Specification.where(...)` 開始，而是直接 `spec1.and(spec2)`，當 `spec1` 為 `null` 時會丟出 `NullPointerException`：

```java
Specification<Order> spec = Specification.where(null);

if (status != null) {
    spec = spec.and(OrderSpecifications.hasStatus(status));
}
if (minAmount != null) {
    spec = spec.and(OrderSpecifications.amountGreaterThan(minAmount));
}
```

### 關聯查詢（Join）

當篩選條件涉及關聯 Entity（例如：依「客戶名稱」查訂單）時，需要在 `toPredicate` 內進行 join：

```java
public static Specification<Order> hasCustomerName(String name) {
    return (root, query, cb) -> {
        if (name == null) return null;
        Join<Order, Customer> customer = root.join("customer", JoinType.LEFT);
        return cb.like(customer.get("name"), "%" + name + "%");
    };
}
```

:::tip 💡 Join 小技巧
若同一個查詢中多次用到同一個 join（例如 where 條件和 order by 都要 join customer），建議用 `root.getJoins()` 檢查是否已經 join 過，避免重複 join 造成笛卡兒積或資料重複。
:::

### 子查詢（Subquery）

例如：查詢「訂單項目中包含某商品」的訂單：

```java
public static Specification<Order> containsProduct(Long productId) {
    return (root, query, cb) -> {
        if (productId == null) return null;
        Subquery<Long> subquery = query.subquery(Long.class);
        Root<OrderItem> itemRoot = subquery.from(OrderItem.class);
        subquery.select(itemRoot.get("order").get("id"))
                .where(cb.equal(itemRoot.get("product").get("id"), productId));
        return cb.in(root.get("id")).value(subquery);
    };
}
```

### 動態排序

```java
public static Specification<Order> orderByCreatedAtDesc() {
    return (root, query, cb) -> {
        query.orderBy(cb.desc(root.get("createdAt")));
        return cb.conjunction(); // 永遠成立的條件，僅用來掛載排序
    };
}
```

但更常見的做法是**直接使用 `Pageable` 的 `Sort`** 來處理排序，把 Specification 專注在「篩選條件」上，職責更清晰。

### 搭配分頁 `Pageable`

```java
Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
Page<Order> result = orderRepository.findAll(spec, pageable);
```

這是最常見的「列表頁」實作組合：Specification 處理篩選，Pageable 處理分頁與排序。

### 通用 Specification Builder（泛型工具）

為了避免每個 Entity 都要重寫一堆 `equal`、`like`、`between`，可以寫一個泛型工具類：

```java
public class GenericSpecification {

    public static <T> Specification<T> equal(String field, Object value) {
        return (root, query, cb) ->
                value == null ? null : cb.equal(root.get(field), value);
    }

    public static <T> Specification<T> like(String field, String value) {
        return (root, query, cb) ->
                (value == null || value.isBlank())
                        ? null
                        : cb.like(cb.lower(root.get(field)), "%" + value.toLowerCase() + "%");
    }

    public static <T, Y extends Comparable<? super Y>> Specification<T> between(
            String field, Y from, Y to) {
        return (root, query, cb) -> {
            if (from != null && to != null) return cb.between(root.get(field), from, to);
            if (from != null) return cb.greaterThanOrEqualTo(root.get(field), from);
            if (to != null) return cb.lessThanOrEqualTo(root.get(field), to);
            return null;
        };
    }
}
```

搭配查詢條件 DTO 與固定欄位映射，就能組成一個通用的動態查詢框架。

### DTO Projection（避免抓整個 Entity）

如果列表頁只需要顯示部分欄位，可以用 `CriteriaQuery` 的 `multiselect`：

```java
CriteriaQuery<OrderSummaryDto> cq = cb.createQuery(OrderSummaryDto.class);
Root<Order> root = cq.from(Order.class);

cq.select(cb.construct(OrderSummaryDto.class,
        root.get("id"), root.get("orderNo"), root.get("totalAmount")));

Predicate predicate = OrderSpecifications.hasStatus("PAID")
        .toPredicate(root, cq, cb);

cq.where(predicate);
```

### Specification + 泛型 Repository / Service 模式

在大型系統中，常見的設計是：

```java
public interface BaseRepository<T, ID>
        extends JpaRepository<T, ID>, JpaSpecificationExecutor<T> {
}

public abstract class BaseService<T, ID, Q> {

    protected abstract Specification<T> buildSpecification(Q queryDto);

    public Page<T> search(Q queryDto, Pageable pageable) {
        return getRepository().findAll(buildSpecification(queryDto), pageable);
    }

    protected abstract BaseRepository<T, ID> getRepository();
}
```

各個業務 Service 只要實作 `buildSpecification`，把「QueryDTO → Specification」的轉換邏輯集中管理，維護性大幅提升。

## 與其他工具的配合

### 與 QueryDSL 的比較

| 比較項目 | Specification | QueryDSL |
|---------|--------------|----------|
| 型別安全 | 欄位用字串，編譯期不檢查 | 用 Q-Class，編譯期檢查 |
| 學習成本 | 較低，原生支援 | 需額外設定 APT、產生 Q-Class |
| 與 Spring Data 整合 | `JpaSpecificationExecutor` | `QuerydslPredicateExecutor`（較新版本已 deprecated） |
| 適合場景 | 中小型動態查詢 | 大型專案、希望強型別檢查 |

兩者也可以**混合使用**：用 QueryDSL 的 `BooleanBuilder` 取代手寫 `CriteriaBuilder`，再透過 `JPAQueryFactory` 執行。

### 與 MapStruct 整合做 DTO 轉換

查詢出來的 Entity 通常不會直接回給前端，而是要轉成 DTO。常見流程：

1. `QueryDTO` → 透過 Specification 組裝查詢條件
2. 查詢結果 `Page<Order>`（Entity）
3. 用 `MapStruct` 的 `Mapper` 把 `Order` 轉成 `OrderResponseDto`

```java
@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderResponseDto toDto(Order order);
}
```

Specification 負責「找出哪些資料」，MapStruct 負責「資料要怎麼呈現」，職責分離。

### 與 Bean Validation（`@Valid`）結合做查詢條件驗證

查詢條件 DTO 也可以加上驗證規則，避免不合理的查詢：

```java
public class OrderQueryDto {

    private String status;

    @PastOrPresent
    private LocalDate startDate;

    @PastOrPresent
    private LocalDate endDate;

    @AssertTrue(message = "startDate 必須早於或等於 endDate")
    public boolean isDateRangeValid() {
        return startDate == null || endDate == null || !startDate.isAfter(endDate);
    }
}
```

### 與 Swagger / OpenAPI 整合

查詢條件 DTO 搭配 `springdoc-openapi`，讓每個篩選欄位自動出現在 API 文件中：

```java
@Operation(summary = "查詢訂單列表")
@GetMapping("/orders")
public Page<OrderResponseDto> search(
        @ParameterObject OrderQueryDto queryDto,
        @ParameterObject Pageable pageable) {
    return orderService.search(queryDto, pageable);
}
```

### 與 Hibernate / 資料庫索引的考量

Specification 最終會被 Hibernate 轉成實際的 SQL，要特別注意：

- **避免在大表上對 `%xxx%` 模糊查詢**，這會導致索引失效，建議改用全文檢索（如 Elasticsearch）
- **多條件 join 時注意 N+1 問題**：建議使用 `fetch()` 或搭配 `@EntityGraph`
- 開啟 Hibernate SQL log（`spring.jpa.show-sql=true`）檢查實際產生的 SQL 是否能命中索引

### 與測試工具（H2 / Testcontainers）整合

使用 `@DataJpaTest` 進行整合測試：

```java
@DataJpaTest
class OrderRepositoryTest {

    @Autowired
    private OrderRepository orderRepository;

    @Test
    void shouldFilterOrdersByStatus() {
        Specification<Order> spec = OrderSpecifications.hasStatus("PAID");
        List<Order> result = orderRepository.findAll(spec);
        assertThat(result).allMatch(o -> "PAID".equals(o.getStatus()));
    }
}
```

由於 Specification 是純粹的 Java 物件組合，也可以對「Specification 組裝邏輯」做單元測試（不連資料庫），只驗證傳入不同 QueryDTO 時產生的組合是否正確。

## 常見問題 FAQ

### Q1：Specification 和 `@Query` 哪個比較好？

看場景。Specification 適合「條件可選、動態組合」的查詢；`@Query` 適合「條件固定、效能優化」的查詢。兩者可以共存。

### Q2：多個 Specification 組合時效能會變差嗎？

不會。Specification 只是組裝條件的工具，最終還是產生一條 SQL。效能取決於 SQL 本身和資料庫索引，不是 Specification 的數量。

### Q3：欄位名稱用字串好不安全，怎麼辦？

建議搭配 JPA Static Metamodel（透過 `hibernate-jpamodelgen` 產生 `Order_` 類別），用 `Order_.status` 取代字串 `"status"`，提升型別安全。

## 最佳實踐

### ✅ 推薦做法

1. **Specification 依 Entity 分類** - 放在獨立的 `*Specifications` 類別中，方法命名語意化（如 `hasStatus`、`createdBetween`）
2. **統一使用 `Specification.where(null)` 作為起點** - 避免 NPE
3. **轉換邏輯集中在 Service 層** - 放在固定方法（如 `buildSpecification`），方便單元測試
4. **搭配 JPA Static Metamodel** - 用 `Order_.status` 取代字串，提升型別安全

### ❌ 常見錯誤

1. **欄位名稱打錯** - 字串 `"stauts"` 編譯期不會報錯，執行期才炸
2. **重複 Join** - 同一個 join 寫多次造成笛卡兒積
3. **在 Specification 裡做複雜業務邏輯** - Specification 只該組裝條件，業務邏輯留在 Service

## 總結

1. **Specification = 樂高積木** - 每個條件獨立，動態組合
2. **條件存在才加入** - null 回傳即忽略，實現「選填式」搜尋
3. **進階玩法** - join、subquery、動態排序、泛型 Builder
4. **搭配 Pagination** - 列表頁標配：Specification + Pageable
5. **注意型別安全** - 字串欄位名稱是最大弱點，建議用 Metamodel 補強
6. **效能要自己把關** - Specification 只是組裝工具，SQL 品質還是開發者的責任
