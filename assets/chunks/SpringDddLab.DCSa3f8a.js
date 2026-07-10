import{_ as S,u as h,o as n,c as i,a as e,n as d,t as a,b as c,l as E,v as D,F as u,g as p,i as A,j as m,k as y}from"./nolebase.CxbwP8Ak.js";const I={class:"ddd-lab","aria-labelledby":"ddd-lab-title"},k={class:"lab-header"},f={class:"slider-block"},P=["aria-valuetext"],L={class:"ticks","aria-hidden":"true"},x=["onClick"],N={class:"stage-title","aria-live":"polite"},w={class:"stage-name"},M={class:"stage-caption"},R={class:"code-panel"},C={class:"panel-label"},T={class:"bottom-grid"},B={class:"checklist"},G={"aria-hidden":"true"},q={class:"metrics"},V={class:"metric-label"},$={class:"bar-track"},j={class:"metric-value"},z={__name:"SpringDddLab",setup(F){h(O=>({v5d50b1b2:o.value.color}));const s=A(0),v=[{percent:0,name:"貧血模型",status:"危險",color:"#f85149",caption:"Entity 只有 getter/setter，規則散落在 Service，非法狀態隨時出現。",code:`@Entity
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
}`},{percent:25,name:"Value Object",status:"起步",color:"#e76f00",caption:"值物件取代原始型別偏執，驗證寫進型別，負數金額根本建不出來。",code:`// 值物件：不可變 + 自帶驗證，非法值無法存在
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
}`},{percent:50,name:"充血模型與領域語言",status:"漸入佳境",color:"#d4a72c",caption:"行為搬進實體、方法名說業務的話，不變條件由物件自己守護。",code:`@Entity
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
}`},{percent:75,name:"Aggregate 與 Repository",status:"穩健",color:"#5382a1",caption:"聚合根界定一致性邊界：想動內部？一律跟 root 說。",code:`@Entity
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
public interface OrderRepository extends JpaRepository<Order, Long> {}`},{percent:100,name:"Domain Event 與 Bounded Context",status:"完美",color:"#7ee787",caption:"領域事件解耦模組、限界上下文各管各的模型。完整的領域防線。",code:`@Entity
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
// —— 不再用一個萬能 Entity 撐全站`}],g=[{unlockAt:25,bad:"金額用 double、狀態用魔法字串",good:"Money / OrderStatus 把規則寫進型別"},{unlockAt:25,bad:"同一段驗證 if 複製貼上到每個 Service",good:"值物件自帶驗證，非法值建不出來"},{unlockAt:50,bad:"商業規則散落 N 個 Service，找不到也改不齊",good:"行為住進實體，每條規則只有一份"},{unlockAt:50,bad:"setter 全開，任何一層都能把狀態改壞",good:"沒有 setter，實體自我守護不變條件"},{unlockAt:75,bad:"想改哪張表就改哪張，一致性看緣分",good:"Aggregate 界定交易邊界，改動必經 root"},{unlockAt:100,bad:"跨模組直接互呼，改一處動全身",good:"Domain Event 解耦，Bounded Context 分家"}],_=[{label:"不變條件",values:[10,35,70,85,100]},{label:"業務語意",values:[5,30,75,85,100]},{label:"修改安全",values:[15,25,60,80,100]},{label:"模組解耦",values:[10,15,35,65,100]}],o=m(()=>v[s.value]),l=m(()=>o.value.percent);return(O,r)=>(n(),i("section",I,[e("header",k,[r[1]||(r[1]=e("div",null,[e("p",{class:"eyebrow"},"$ spring run DomainLab"),e("h2",{id:"ddd-lab-title"},"DDD 採用度實驗室")],-1)),e("span",{class:"status",style:d({color:o.value.color}),"aria-live":"polite"}," ● "+a(o.value.status),5)]),e("div",f,[r[2]||(r[2]=e("label",{for:"ddd-level"},[c(" 拖動拉桿，看同一個訂單模型從 "),e("strong",null,"0%（貧血、缺點全開）"),c(" 進化到 "),e("strong",null,"100%（完美）")],-1)),E(e("input",{id:"ddd-level","onUpdate:modelValue":r[0]||(r[0]=t=>s.value=t),type:"range",min:"0",max:"4",step:"1","aria-valuetext":`${l.value}%：${o.value.name}`},null,8,P),[[D,s.value,void 0,{number:!0}]]),e("div",L,[(n(),i(u,null,p(v,(t,b)=>e("button",{key:t.percent,type:"button",class:y({active:s.value===b}),onClick:H=>s.value=b},a(t.percent)+"% ",11,x)),64))])]),e("div",N,[e("span",{class:"percent",style:d({color:o.value.color})},a(l.value)+"%",5),e("div",null,[e("p",w,a(o.value.name),1),e("p",M,a(o.value.caption),1)])]),e("div",R,[e("p",C,"ORDER MODEL — "+a(l.value)+"% DDD",1),e("pre",null,[e("code",null,a(o.value.code),1)])]),e("div",T,[e("div",B,[r[3]||(r[3]=e("p",{class:"panel-label"},"領域防線檢查",-1)),e("ul",null,[(n(),i(u,null,p(g,t=>e("li",{key:t.bad,class:y(l.value>=t.unlockAt?"good":"bad")},[e("span",G,a(l.value>=t.unlockAt?"✓":"✗"),1),c(" "+a(l.value>=t.unlockAt?t.good:t.bad),1)],2)),64))])]),e("div",q,[r[4]||(r[4]=e("p",{class:"panel-label"},"健康指標",-1)),(n(),i(u,null,p(_,t=>e("div",{key:t.label,class:"metric"},[e("span",V,a(t.label),1),e("div",$,[e("div",{class:"bar-fill",style:d({width:`${t.values[s.value]}%`,background:o.value.color})},null,4)]),e("span",j,a(t.values[s.value]),1)])),64))])])]))}},U=S(z,[["__scopeId","data-v-6194e835"]]);export{U as S};
