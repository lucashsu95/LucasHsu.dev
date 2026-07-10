import{_ as f,u as y,o as s,c as n,a as e,n as c,t as o,b as d,l as O,v as R,F as u,g as p,i as C,j as b,k as g}from"./nolebase.CxbwP8Ak.js";const D={class:"fp-lab","aria-labelledby":"fp-lab-title"},P={class:"lab-header"},S={class:"slider-block"},B=["aria-valuetext"],E={class:"ticks","aria-hidden":"true"},w=["onClick"],T={class:"stage-title","aria-live":"polite"},I={class:"stage-name"},F={class:"stage-caption"},x={class:"code-panel"},A={class:"panel-label"},L={class:"bottom-grid"},N={class:"checklist"},V={"aria-hidden":"true"},$={class:"metrics"},j={class:"metric-label"},z={class:"bar-track"},M={class:"metric-value"},Q={__name:"SpringFpLab",setup(U){y(k=>({f9a2f5d2:l.value.color}));const a=C(0),m=[{percent:0,name:"傳統命令式",status:"危險",color:"#f85149",caption:"共享可變狀態 + null 滿地 + 副作用混雜，每一行都是地雷。",code:`@Service
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
}`},{percent:25,name:"Stream 與 Optional",status:"起步",color:"#e76f00",caption:"宣告式取代迴圈、Optional 取代 null 判斷，但狀態還是可變的。",code:`public Order checkout(Long id) {
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
}`},{percent:50,name:"不可變資料與純函數",status:"漸入佳境",color:"#d4a72c",caption:"record 鎖住狀態、計算邏輯抽成純函數，測試不再需要 mock。",code:`// record：不可變，沒有 setter，狀態不會被偷改
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
}`},{percent:75,name:"Result 型別與函數組合",status:"穩健",color:"#5382a1",caption:"錯誤變成型別的一部分、商業規則組合成管線，編譯器幫你把關。",code:`public sealed interface Result<T> {           // 錯誤寫進型別
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
    .map(rules);                          // 呼叫端 switch 窮舉，漏接編譯不過`},{percent:100,name:"Functional Core, Imperative Shell",status:"完美",color:"#7ee787",caption:"核心 100% 純函數，副作用全部推到最外層的殼。可測、可組合、可預測。",code:`// Imperative Shell：只有這層碰 DB / Email / 時鐘（副作用集中在邊界）
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

// CheckoutCore 全是純函數：零 mock、毫秒級測試、絕對可預測`}],h=[{unlockAt:25,bad:"到處 null 檢查，NPE 隨時引爆",good:"Optional 讓「可能沒有值」寫進型別"},{unlockAt:25,bad:"for 迴圈手寫「怎麼做」，意圖被淹沒",good:"Stream 宣告式表達「做什麼」"},{unlockAt:50,bad:"setter 滿天飛，狀態隨時被任何人偷改",good:"record 不可變，資料一出生就定型"},{unlockAt:50,bad:"計算混著 DB 與 Email，測試要 mock 一堆",good:"純函數計算，new 出來直接測"},{unlockAt:75,bad:"用例外控制流程，呼叫端不知道會炸什麼",good:"Result 型別讓錯誤處理被編譯器強制"},{unlockAt:100,bad:"副作用散落各層，改一行怕動全身",good:"副作用集中在殼，核心絕對純粹"}],_=[{label:"可測試性",values:[10,25,60,80,100]},{label:"Null 安全",values:[5,55,70,90,100]},{label:"可預測性",values:[15,30,65,85,100]},{label:"併發安全",values:[5,15,60,75,100]}],l=b(()=>m[a.value]),i=b(()=>l.value.percent);return(k,r)=>(s(),n("section",D,[e("header",P,[r[1]||(r[1]=e("div",null,[e("p",{class:"eyebrow"},"$ spring run FunctionalLab"),e("h2",{id:"fp-lab-title"},"FP 採用度實驗室")],-1)),e("span",{class:"status",style:c({color:l.value.color}),"aria-live":"polite"}," ● "+o(l.value.status),5)]),e("div",S,[r[2]||(r[2]=e("label",{for:"fp-level"},[d(" 拖動拉桿，看同一段結帳邏輯從 "),e("strong",null,"0%（缺點全開）"),d(" 進化到 "),e("strong",null,"100%（完美）")],-1)),O(e("input",{id:"fp-level","onUpdate:modelValue":r[0]||(r[0]=t=>a.value=t),type:"range",min:"0",max:"4",step:"1","aria-valuetext":`${i.value}%：${l.value.name}`},null,8,B),[[R,a.value,void 0,{number:!0}]]),e("div",E,[(s(),n(u,null,p(m,(t,v)=>e("button",{key:t.percent,type:"button",class:g({active:a.value===v}),onClick:q=>a.value=v},o(t.percent)+"% ",11,w)),64))])]),e("div",T,[e("span",{class:"percent",style:c({color:l.value.color})},o(i.value)+"%",5),e("div",null,[e("p",I,o(l.value.name),1),e("p",F,o(l.value.caption),1)])]),e("div",x,[e("p",A,"ORDER SERVICE — "+o(i.value)+"% FP",1),e("pre",null,[e("code",null,o(l.value.code),1)])]),e("div",L,[e("div",N,[r[3]||(r[3]=e("p",{class:"panel-label"},"體質檢查",-1)),e("ul",null,[(s(),n(u,null,p(h,t=>e("li",{key:t.bad,class:g(i.value>=t.unlockAt?"good":"bad")},[e("span",V,o(i.value>=t.unlockAt?"✓":"✗"),1),d(" "+o(i.value>=t.unlockAt?t.good:t.bad),1)],2)),64))])]),e("div",$,[r[4]||(r[4]=e("p",{class:"panel-label"},"健康指標",-1)),(s(),n(u,null,p(_,t=>e("div",{key:t.label,class:"metric"},[e("span",j,o(t.label),1),e("div",z,[e("div",{class:"bar-fill",style:c({width:`${t.values[a.value]}%`,background:l.value.color})},null,4)]),e("span",M,o(t.values[a.value]),1)])),64))])])]))}},G=f(Q,[["__scopeId","data-v-1eeb21a7"]]);export{G as S};
