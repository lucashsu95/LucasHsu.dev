---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: java interface, java介面, interface教學, java多型, polymorphism, 通知系統, 設計模式, java OOP, 程式設計原則, 依賴反轉, 組合模式, java教學, 軟體架構
  - - meta
    - name: description
      content: 透過實際的跨平台通知系統案例，深入學習Java Interface設計。從基礎概念到進階組合模式，完整掌握介面在軟體架構中的應用，適合Java開發者提升程式設計技能。
  - - meta
    - property: og:title
      content: Java Interface 完整教學 | 跨平台通知系統實戰開發
  - - meta
    - property: og:description
      content: 透過實際的跨平台通知系統案例，深入學習Java Interface設計。從基礎概念到進階組合模式，完整掌握介面在軟體架構中的應用。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/java-cover.jpg
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Java Interface 完整教學 | 跨平台通知系統實戰開發
  - - meta
    - name: twitter:description
      content: 透過實際通知系統案例學習Java Interface，從基礎到進階組合模式，提升軟體架構設計能力。
---

# 生活化情境：跨平台通知系統
## 問題描述：發送通知

想像你的應用程式需要發送通知給使用者。最一開始，你只打算用電子郵件來通知。

**初始設計（不推薦）：**
你可能會寫一個 `NotificationManager` 類別，裡面有一個方法專門處理發送電子郵件的邏輯。

```java
public class NotificationManager {
    public void sendEmail(String message) {
        System.out.println("傳送電子郵件通知： " + message);
        // ... 複雜的郵件伺服器連線、API 呼叫等實作細節
    }
}
```

這個設計看起來沒問題，直到有一天，你的產品經理跑來告訴你：「我們需要增加**簡訊**通知，下個月可能還要加上**App推播**通知。」

這時，你的 `NotificationManager` 類別就會開始膨脹，你會在裡面加入新的方法，甚至使用 `if/else` 或 `switch` 語句來判斷要用哪種方式傳送，這將導致程式碼變得難以維護且脆弱。


## 第一階段解決方案：使用 interface

為了解決這個問題，我們應該專注於「發送通知」這個行為本身。無論是電子郵件、簡訊還是推播，它們的共同行為都是「發送一個訊息」。因此，我們定義一個 `Notifier` 介面來代表這個行為。

### 1. 定義 `Notifier` 介面

這個介面定義了所有通知器都必須遵循的契約：有一個 `send` 方法。

```java
// Notifier.java
/**
 * 定義通知服務的行為契約。
 * 任何能「發送」訊息的類別都必須實作此介面。
 */
public interface Notifier {
    void send(String message);
}
```

### 2. 實作具體的通知類別

現在，我們可以為每種通知方式建立一個獨立的類別，它們都實作 `Notifier` 介面。這讓每個類別都只專注於自己的職責，完全符合「單一職責原則」。

```java
// EmailNotifier.java
/**
 * 透過電子郵件發送通知的具體實作。
 */
public class EmailNotifier implements Notifier {
    @Override
    public void send(String message) {
        System.out.println("發送電子郵件通知: " + message);
        // 這裡可以放真實的電子郵件發送邏輯
    }
}

// SmsNotifier.java
/**
 * 透過簡訊發送通知的具體實作。
 */
public class SmsNotifier implements Notifier {
    @Override
    public void send(String message) {
        System.out.println("發送簡訊通知: " + message);
        // 這裡可以放真實的簡訊 API 呼叫邏輯
    }
}
```

### 3. 核心程式碼

現在，你的主程式或其他服務，只需要處理 `Notifier` 介面，而不需要知道具體是哪一種實作。這就是依賴反轉原則的體現：高層次的程式碼依賴於抽象（介面），而不是具體實作。

```java
// Main.java
public class Main {
    public static void main(String[] args) {
        // 使用電子郵件通知
        System.out.println("--- 使用 EmailNotifier ---");
        Notifier emailNotifier = new EmailNotifier();
        sendNotification(emailNotifier, "您的帳號已成功註冊。");

        System.out.println("\n--- 使用 SmsNotifier ---");
        // 使用簡訊通知
        Notifier smsNotifier = new SmsNotifier();
        sendNotification(smsNotifier, "您的訂單已出貨，編號: 12345。");
    }

    // 這個方法不關心是哪一種通知方式，它只知道要傳送訊息。
    public static void sendNotification(Notifier notifier, String message) {
        System.out.println("準備發送通知...");
        notifier.send(message); // 呼叫介面的方法
        System.out.println("通知發送完成。\n");
    }
}
```

**執行結果：**

```
--- 使用 EmailNotifier ---
準備發送通知...
發送電子郵件通知: 您的帳號已成功註冊。
通知發送完成。

--- 使用 SmsNotifier ---
準備發送通知...
發送簡訊通知: 您的訂單已出貨，編號: 12345。
通知發送完成。
```

這個設計的優點在於：

- **可擴展性（Extensibility）**： 如果未來需要新增「`App` 推播通知」，你只需要建立一個 `PushNotifier` 類別來實作 `Notifier` 介面即可，完全不需要修改現有的 `Main` 類別。

- **鬆散耦合（Loose Coupling）**： `Main` 類別與 `EmailNotifier` 和 `SmsNotifier` 之間沒有直接的依賴關係，它們只透過 `Notifier` 介面進行溝通。

## 延伸問題：組合通知

新需求來了！你的產品經理現在希望發送一種特殊的通知：**「重要通知」**。這種通知必須同時透過電子郵件和簡訊兩種方式發送，以確保使用者一定能收到。

如果沒有介面，你可能又需要在 `NotificationManager` 中寫一個新的方法，裡面包含發送郵件和簡訊的邏輯。但這會重複程式碼，並且隨著需求越來越複雜，程式會越來越難以管理。

**延伸解決方案：利用 `interface` 實現多樣化組合**

介面的強大之處在於它提供了**多型（Polymorphism）**的基礎，你可以將任何實作了 `Notifier` 介面的物件，都視為 `Notifier` 類型來處理。這讓我們可以建立一個新的通知器，它將多個通知器「組合」起來，實現複雜的發送行為。

### 1. 建立 `CompositeNotifier` 類別

這個類別本身也實作 `Notifier` 介面，但它的 `send` 方法不會自己發送，而是**委託（Delegate）**給它內部持有的所有 `Notifier` 實例來完成。

```java
import java.util.List;

// CompositeNotifier.java
/**
 * 組合多個通知器，實現同時發送給多個渠道。
 * 這本身也是一個通知器。
 */
public class CompositeNotifier implements Notifier {
    private final List<Notifier> notifiers;

    public CompositeNotifier(List<Notifier> notifiers) {
        this.notifiers = notifiers;
    }

    @Override
    public void send(String message) {
        System.out.println("正在透過多個渠道發送通知...");
        for (Notifier notifier : notifiers) {
            notifier.send(message);
        }
    }
}
```

### 2. 更新主程式

現在，要發送「重要通知」時，我們只需要建立一個 `CompositeNotifier` 實例，將 `EmailNotifier` 和 `SmsNotifier` 傳入即可。主程式的 sendNotification 方法**完全不需要修改**，因為 `CompositeNotifier` 本身就是一個 `Notifier`！

```java
// Main.java (更新後)
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // ... (省略先前程式碼)

        System.out.println("--- 發送重要通知 (Email + SMS) ---");
        // 建立一個集合，包含所有需要的通知器
        List<Notifier> importantNotifiers = Arrays.asList(new EmailNotifier(), new SmsNotifier());
        
        // 將這些通知器組合起來，變成一個新的通知器
        Notifier compositeNotifier = new CompositeNotifier(importantNotifiers);
        
        // 呼叫同一個方法，但這次它會自動發送給兩個渠道
        sendNotification(compositeNotifier, "您的密碼已成功重設，請確認！");
    }

    public static void sendNotification(Notifier notifier, String message) {
        // ... (方法內容不變)
    }
}
```

**執行結果：**

```
... (省略先前結果)

--- 發送重要通知 (Email + SMS) ---
準備發送通知...
正在透過多個渠道發送通知...
發送電子郵件通知: 您的密碼已成功重設，請確認！
發送簡訊通知: 您的密碼已成功重設，請確認！
通知發送完成。
```

這個延伸方案完美地體現了 `interface` 的三大優點：

1. **擴展性**： 在不修改任何現有程式碼的情況下，新增了一個全新的通知行為（組合發送）。
2. **多型性**： `CompositeNotifier` 可以被視為一個普通的 `Notifier` 來使用，這讓我們的程式碼更具彈性。
3. **可讀性與可維護性**： 每個類別的職責都非常清晰，`CompositeNotifier` 負責組合，`EmailNotifier` 負責發送郵件，核心方法則只負責呼叫 `send`。

總結來說，`interface` 不僅僅是語法，它代表了一種設計思維：將「是什麼」（`is-a`）的繼承關係，轉變為「能做什麼」（`can-do`）的行為契約。這個思維讓你能夠用更優雅、更具擴展性的方式來應對軟體開發中不斷變化的需求。