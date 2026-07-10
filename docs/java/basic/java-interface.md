---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Java Interface, implements, 多型, constructor injection, DIP, ISP, FunctionalInterface, lambda, sealed interface, 測試替身
  - - meta
    - name: description
      content: 從通知系統理解 Java Interface 的契約、執行期多型、建構子注入與介面演進，並練習可測試的依賴設計。
  - - meta
    - property: og:title
      content: Java Interface：從契約到可測試設計
  - - meta
    - property: og:description
      content: 用通知系統拆解 implements、多型、DIP、ISP、lambda、sealed interface 與測試替身。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/java-cover.webp
---

<script setup>
import JavaInterfaceLab from "../../.vitepress/theme/components/JavaInterfaceLab.vue"
</script>

# Java Interface：從行為契約到可替換依賴

> 本篇聚焦「如何定義與依賴一份行為契約」。若你想先理解執行期多型、抽象類別與繼承的全貌，請讀[多型與抽象類別](/java/oop/polymorphism-abstract)；這裡不重講完整 OOP 階層，而是把介面用在依賴設計與測試上。

## TL;DR

- `interface` 宣告呼叫者可依賴的**行為契約**；`implements` 是類別對契約的承諾。
- 介面型別變數可指向不同實作；同一個 `send()` 會在執行期派送到實際物件。
- 建構子注入讓高層服務接收 `Notifier`，而非在內部 `new EmailNotifier()`。
- 「依賴介面」不會自動滿足 DIP；抽象必須由高層政策需要主導，而且依賴方向確實要反轉。
- 小而聚焦的介面通常更容易實作、組合與替換；這是 ISP 的核心。
- Java 8 起介面可有 `default`、`static` 方法；Java 9 起可有 `private` 方法；Java 17 的 sealed classes/interfaces 正式定版。

<SlideButton
  slug="java-interface"
  title="Java Interface：通知依賴實驗室"
  description="用互動投影片追蹤契約、執行期派送、建構子注入與介面演進。"
/>

## 前置知識

建議先會：

- 類別、物件、方法與建構子
- 參考型別與 `new`
- `public`、`private`、`final`
- `List` 與增強型 `for`

不熟多型也可以繼續；本文會只補足本案例需要的部分。

## 先看問題：高層服務知道太多細節

```java
class NotificationService {
    void notifyUser(String channel, String message) {
        if (channel.equals("email")) {
            new EmailClient().deliver(message);
        } else if (channel.equals("sms")) {
            new SmsClient().deliver(message);
        }
    }
}
```

問題不只是 `if/else` 很長。`NotificationService` 同時知道：

1. 有哪些管道；
2. 每個 SDK 如何建立；
3. 每個 SDK 的呼叫方式。

因此新增管道、替換供應商或測試失敗情境，都可能迫使我們修改高層流程。

## 契約與 `implements`

### 宣告介面

```java
public interface Notifier {
    void send(String message);
}
```

介面描述「能發送訊息」，不規定透過 SMTP、電信商 API 或推播服務。介面中的一般方法在沒有方法本體時，隱含為 `public abstract`；欄位則隱含為 `public static final`，因此不適合存放每個物件各自的可變狀態。

### 類別履行契約

```java
public final class EmailNotifier implements Notifier {
    @Override
    public void send(String message) {
        System.out.println("EMAIL > " + message);
    }
}

public final class SmsNotifier implements Notifier {
    @Override
    public void send(String message) {
        System.out.println("SMS   > " + message);
    }
}
```

`implements` 不會繼承實例狀態，也不會建立物件；它要求類別提供介面抽象方法的合法實作。實作方法必須是 `public`，不能縮小介面方法的可見性。

## 多型：型別看契約，執行看物件

```java
Notifier notifier = new EmailNotifier();
notifier.send("帳號建立完成");

notifier = new SmsNotifier();
notifier.send("驗證碼 8042");
```

編譯器從變數的靜態型別 `Notifier` 判斷「能不能呼叫 `send`」；JVM 在執行期依實際物件選擇 `EmailNotifier.send` 或 `SmsNotifier.send`。這是介面型別上的動態方法派送。

::: tip 本篇與 OOP 進階篇的分工
本文用多型作為「可替換依賴」的工具；[多型與抽象類別](/java/oop/polymorphism-abstract)則從型別階層、抽象類別與組合設計建立完整 OOP 心智模型。
:::

## 動手切換依賴方向

選擇直接耦合或依賴介面，再組合 Email、SMS、Push。按下發送後，觀察 dispatch trace 與箭頭方向。

<JavaInterfaceLab />

## 建構子注入：把選擇移到組裝端

```java
public final class NotificationService {
    private final Notifier notifier;

    public NotificationService(Notifier notifier) {
        this.notifier = notifier;
    }

    public void notifyUser(String message) {
        notifier.send(message);
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Notifier productionNotifier = new EmailNotifier();
        NotificationService service =
            new NotificationService(productionNotifier);

        service.notifyUser("訂單已出貨");
    }
}
```

`NotificationService` 不再決定使用哪個管道；程式進入點（composition root）負責建立並接線物件。建構子參數也讓必要依賴明確，而且欄位可維持 `final`。

### 這和 DIP 的關係，別說過頭

依賴反轉原則（Dependency Inversion Principle）包含兩層意思：

1. 高層政策不應依賴低層細節，兩者應依賴抽象。
2. 抽象不應依賴細節，細節應依賴抽象。

上例中，`Notifier` 由「通知流程需要能發送」這個高層需求定義，低層 `EmailNotifier` 反過來實作它，因此依賴方向有被反轉。可是：

- 只把具體類別包成 `EmailNotifierInterface`，若抽象仍由供應商 API 形狀主導，不一定是良好的 DIP。
- 每個類別都配一個介面，可能只是增加跳轉與樣板。
- 若實作永遠不需替換、邊界也不需要隔離，具體依賴可能更簡單。

所以準確說法是：**介面與注入能協助實現 DIP，但不是使用 `interface` 關鍵字就自動符合 DIP。**

## 組合通知：一個契約，多個委派

```java
import java.util.List;

public final class CompositeNotifier implements Notifier {
    private final List<Notifier> delegates;

    public CompositeNotifier(List<Notifier> delegates) {
        this.delegates = List.copyOf(delegates);
    }

    @Override
    public void send(String message) {
        for (Notifier delegate : delegates) {
            delegate.send(message);
        }
    }
}
```

```java
Notifier important = new CompositeNotifier(List.of(
    new EmailNotifier(),
    new SmsNotifier(),
    new PushNotifier()
));

new NotificationService(important).notifyUser("密碼已變更");
```

`CompositeNotifier` 自己也是 `Notifier`，呼叫端不必知道它內部委派一次或三次。實務上還要明確決定失敗策略：某一管道失敗時停止、繼續，還是收集所有錯誤。

## ISP：不要把所有能力塞進一個胖介面

```java
// 過大的契約：不是每種管道都能排程或撤回
interface NotificationPlatform {
    void send(String message);
    void schedule(String message, Instant at);
    void revoke(String id);
}
```

依介面隔離原則（Interface Segregation Principle），呼叫端不該被迫依賴不需要的方法。可依使用情境拆分：

```java
interface Notifier {
    void send(String message);
}

interface SchedulableNotifier {
    void schedule(String message, Instant at);
}

interface RevocableNotification {
    void revoke(String id);
}
```

介面不是越小越好；應該小到能代表一個內聚能力，又大到讓呼叫端完成一個有意義的工作。

## Interface vs abstract class

| 問題 | Interface | Abstract class |
| --- | --- | --- |
| 主要意圖 | 跨類型定義能力／邊界 | 建立有共同狀態與骨架的家族 |
| 實例欄位 | 不可 | 可以 |
| 建構子 | 不可 | 可以 |
| 類別可擁有數量 | 可實作多個介面 | 只能繼承一個類別 |
| 共用實作 | `default` 方法有限支援 | 可用各種可見性與欄位完整支援 |
| 適合情境 | 替換實作、邊界、能力組合 | 穩定的 is-a 關係、共同不變量 |

不要套用「永遠優先介面」的口號。若子類別真的共享狀態、建構流程與受保護的模板步驟，抽象類別可能更直接；若重點是讓不相關類別共享契約或讓依賴可替換，介面通常更合適。

## 測試替身：不用真的發 Email

介面讓測試可注入可觀察的 fake：

```java
final class RecordingNotifier implements Notifier {
    private final List<String> messages = new ArrayList<>();

    @Override
    public void send(String message) {
        messages.add(message);
    }

    List<String> messages() {
        return List.copyOf(messages);
    }
}
```

```java
@Test
void sendsShipmentMessage() {
    RecordingNotifier fake = new RecordingNotifier();
    NotificationService service = new NotificationService(fake);

    service.notifyUser("訂單已出貨");

    assertEquals(List.of("訂單已出貨"), fake.messages());
}
```

這裡驗證的是服務與協作者的互動結果，不需網路、帳密或 mock framework。介面不是可測試性的唯一方法，但它提供很自然的替換接縫。

## 介面也能有方法本體

### `default` 與 `static`（Java 8+）

```java
public interface Notifier {
    void send(String message);

    default void sendUrgent(String message) {
        send("[URGENT] " + normalize(message));
    }

    static Notifier silent() {
        return message -> { };
    }

    private String normalize(String message) { // Java 9+
        return message.strip();
    }
}
```

- `default`：為實作類別提供可覆寫的預設實作，常用於相容地演進既有介面。
- `static`：屬於介面本身，以 `Notifier.silent()` 呼叫，不參與多型覆寫。
- `private`（Java 9+）：只供介面內的 `default`／`static` 方法重用，實作類別看不到。

新增 `default` 方法雖通常不會迫使既有實作立刻修改，仍可能產生語意不適用、同名衝突等設計問題，不能視為零成本演進。

## `@FunctionalInterface` 與 lambda（Java 8+）

只有一個抽象方法的介面是 functional interface；`default`、`static`、`private` 方法不計入該數量。

```java
@FunctionalInterface
interface Notifier {
    void send(String message);
}

Notifier console = message ->
    System.out.println("CONSOLE > " + message);

new NotificationService(console).notifyUser("本機測試");
```

`@FunctionalInterface` 不是必要語法，但可讓編譯器保護「單一抽象方法」意圖。lambda 是該介面的實例，不是執行期新增一個命名類別供你直接操作。

## `sealed interface`（Java 17 正式版）

當領域允許的變體應該是封閉集合，可限制誰能實作：

```java
public sealed interface DeliveryResult
    permits Delivered, Rejected, Retrying {
}

public record Delivered(String id) implements DeliveryResult {}
public record Rejected(String reason) implements DeliveryResult {}
public record Retrying(int attempt) implements DeliveryResult {}
```

允許的直接實作必須明確是 `final`、`sealed` 或 `non-sealed`。Sealed classes/interfaces 曾在 Java 15、16 預覽，於 **Java 17** 正式定版。它適合封閉的領域代數資料型別，不適合預期第三方自由擴充的 plugin API。

## 練習

### 練習 1：加入 Push

實作 `PushNotifier`，並在組裝端替換 Email。確認 `NotificationService` 不需修改。

### 練習 2：設計失敗策略

讓 `send` 回傳 `DeliveryResult`。比較：

- 第一個失敗就停止；
- 所有管道都嘗試後回傳結果清單。

哪一種適合「帳號安全警報」？把原因寫在測試名稱中。

### 練習 3：套用 ISP

需求新增「排程發送」，但 SMS 供應商不支援排程。請避免在 `SmsNotifier` 中丟出 `UnsupportedOperationException`，改以角色介面建模。

### 練習 4：測試替身

建立 `FailingNotifier`，每次 `send` 都丟例外。替 `NotificationService` 補上錯誤處理測試；不要呼叫真實外部服務。

## FAQ

### Interface 可以 `new` 嗎？

不能直接 `new Notifier()`，因為它沒有完整實作；可以建立實作類別、匿名類別，或在 functional interface 上使用 lambda。

### 一個類別可以實作多個 interface 嗎？

可以，例如 `class PushNotifier implements Notifier, SchedulableNotifier`。若兩個介面的 `default` 方法簽名衝突，類別必須明確覆寫。

### Interface 方法一定都是 `public` 嗎？

一般抽象方法隱含 `public abstract`；Java 9 起介面也可有僅供內部重用的 `private` 方法。介面不能宣告 `protected` 方法。

### 什麼時候不需要介面？

只有單一簡單實作、沒有邊界隔離或替換需求時，直接依賴具體類別可能更清楚。等抽象能表達呼叫端真正需要的角色，再抽取也不遲。

### `default` 方法會破壞「介面只有契約」嗎？

它讓介面能攜帶有限的共同行為，主要解決 API 演進與可組合行為；但不能保存實例狀態，也不應變成藏匿大量流程的工具。

## 來源與延伸閱讀

- [Oracle Java Tutorials: Interfaces](https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html)（教學以 JDK 8 為基準）
- [Java Language Specification §9: Interfaces](https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html)
- [JLS §9.4.3: Interface Method Body](https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html#jls-9.4.3)
- [JLS §9.8: Functional Interfaces](https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html#jls-9.8)
- [JLS §9.1.4: Permitted Direct Subclasses and Subinterfaces](https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html#jls-9.1.4)
- [JEP 409: Sealed Classes](https://openjdk.org/jeps/409)
- [多型與抽象類別：完整 OOP 定位](/java/oop/polymorphism-abstract)

## 最後檢查

看到新需求時，先問：

1. 呼叫端真正需要哪個行為？
2. 抽象名稱是否使用領域語言，而不是供應商名稱？
3. 實作選擇是否留在組裝端？
4. 介面是否迫使實作者提供不適用的方法？
5. 測試能否換入簡單 fake？

Interface 的價值不在「消除所有修改」，而在建立清楚的替換邊界，讓修改更集中、依賴更可見。
