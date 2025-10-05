---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: java, class, object, interface, 類別, 物件, 介面, 物件導向, oop, java教學, 程式設計, 封裝, 繼承, 多型
  - - meta
    - name: description
      content: Java物件導向程式設計基礎教學：深入學習Class類別、Object物件、Interface介面的概念與應用。透過生活化比喻理解OOP核心原理，適合Java初學者建立扎實基礎。
  - - meta
    - property: og:title
      content: Java Class、Object、Interface 完整入門教學 | 物件導向程式設計基礎
  - - meta
    - property: og:description
      content: Java物件導向程式設計基礎教學：深入學習Class類別、Object物件、Interface介面的概念與應用。透過生活化比喻理解OOP核心原理，適合Java初學者建立扎實基礎。
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
      content: Java Class、Object、Interface 完整入門教學 | 物件導向程式設計基礎
  - - meta
    - name: twitter:description
      content: Java物件導向程式設計基礎教學：深入學習Class類別、Object物件、Interface介面的概念與應用。透過生活化比喻理解OOP核心原理。
---

# Java 的世界：從「藍圖」到「合約」的奇妙旅程

## 引言：初探 Java 世界的三大主角

想像一下，你是一位樂高設計師。你手裡有一份酷炫太空船的<mark>「設計圖」</mark>。這份設計圖上標註了太空船的形狀、每個零件的位置、以及它能發射雷射砲、打開艙門等功能。這份「設計圖」在程式設計的世界中，我們稱之為 類別 <mark>(Class)</mark>。

根據這份設計圖，你組裝出了一個又一個具體的<mark>「太空船模型」</mark>。這些模型，每一個都擁有獨特的編號、可能使用了不同顏色的零件，但它們都共用著設計圖上所定義的「發射雷射砲」功能。這些實體化的模型，我們稱之為 <mark>物件 (Object)</mark>。

然而，如果你的太空船需要裝上一個統一規格的「機器手臂」，無論是哪家公司製造的機器手臂，都必須符合相同的「規格書」才能與你的太空船連接。這份只定義了「能做什麼」，卻不關心「如何實作」的<mark>「規格書」</mark>，就是我們所說的 <mark>介面 (Interface)</mark>。

本報告將透過這些生活化比喻，帶領讀者深入理解 Class、Object 和 Interface 這三位 Java 世界的主角。我們將探討它們各自的職責、彼此間如何緊密合作，最終創造出強大而靈活的程式。

# 第一章：認識實體的「藍圖」與「生命」

## 1.1 什麼是「類別」(Class)？程式世界的「設計圖」

類別可以被視為物件的「藍圖」或「範本」，它定義了特定資料結構的樣貌，並將相關的資料與操作這些資料的方法封裝在一起。它本身不包含任何具體的資料，僅僅是描述了物件將會是什麼樣子，以及它能做哪些事情。

一個常見的比喻是「食譜」。食譜詳細說明了做一道菜需要哪些材料（例如麵粉、雞蛋），以及如何烹煮（例如攪拌、烘烤），但食譜本身並不能被吃。類別正是如此，它只是一份指令清單，用來告訴程式如何創造一個可用的實體。

一個類別的設計通常包含以下幾個核心要素：
- **屬性 (Fields)**：代表類別的資料或狀態，像是食譜中的「材料」。
- **方法 (Methods)**：代表類別的行為或功能，像是食譜中的「烹煮步驟」。
- **建構子 (Constructors)**：一種特殊的方法，在物件被創造的瞬間被呼叫，用來初始化物件的屬性。

以下是一個簡單的 Student 類別程式碼範例，它就像是學生的「設計圖」：

```java
// 定義一個名為 'Student' 的類別，就像是學生的設計圖
public class Student {
    // 屬性，代表學生的資料
    String name;
    int studentId;

    // 建構子，當物件被創建時，用來給予它初始的生命
    public Student(String name, int studentId) {
        // 使用 this 關鍵字來區分屬性與參數
        this.name = name;
        this.studentId = studentId;
    }

    // 方法，代表學生的行為
    public void introduce() {
        System.out.println("嗨，我的名字是 " + name + "，學號是 " + studentId);
    }
}
```


這個類別的設計體現了物件導向程式設計中的「封裝」（Encapsulation）原則，將資料 (name, studentId) 與操作資料的方法 (introduce()) 綁定在一起，這不僅使得程式碼更有組織性，也保護了資料不被外部隨意修改。

## 1.2 什麼是「物件」(Object)？藍圖下的「具體生命」

如果說類別是設計圖，那麼物件就是根據這份設計圖實際建造出來的「實體」。

一個物件是類別的一個具體實例（Instance），當類別被用於創建物件時，該物件會擁有自己獨立的一份屬性變數，並可以使用類別所定義的方法。

延續食譜的比喻，<mark>物件就像是按照食譜做出來的「餅乾」</mark>。每一塊餅乾（物件）都有自己獨立的甜度或大小，但它們都共用著食譜定義的「烘烤」和「裝飾」方法。

在 Java 中，我們使用 `new` 關鍵字來從類別創建物件。這個過程會向記憶體申請空間，並為新的物件分配獨立的儲存區域，這解釋了為什麼每個物件可以有自己獨立的屬性值。
以下程式碼展示了如何根據 `Student` 類別創造出兩個獨立的學生物件：

```java
// 創造兩個不同的學生物件
Student studentA = new Student("小明", 2023001); // 這是一個具體的「小明」物件
Student studentB = new Student("小華", 2023002); // 這是一個具體的「小華」物件

// 呼叫物件的方法，讓它們各自執行自己的行為
studentA.introduce(); // 輸出：嗨，我的名字是 小明，學號是 2023001
studentB.introduce(); // 輸出：嗨，我的名字是 小華，學號是 2023002
```


儘管 `studentA` 和 `studentB` 都來自同一個 `Student` 類別，它們在<mark>記憶體中是獨立的存在，擁有各自的屬性值，但它們共同遵循著類別定義的行為</mark>。物件是物件導向程式設計的核心，它將現實世界的概念以一種可程式化的方式模型化，讓程式碼更直觀、更易於管理。

## 1.3 隱藏的超級英雄：Object 類別

在 Java 的世界裡，所有類別（無論是你自己創建的，還是 Java 語言內建的）最終都自動繼承自一個名為 `java.lang.Object` 的「超級類別」。這就像是所有動物最終都屬於一個共同的生物界一樣。

Object 類別就像是所有物件的「DNA」，它賦予了所有物件一些最基本的共同能力，例如 `toString()`、`equals()`、`hashCode()` 等方法。這些方法為所有 Java 物件提供了通用的行為和功能，是 Java 語言設計中的一個強制性規範，而不是可選項。

這種「萬物皆源於 Object」的設計，為 Java 程式碼提供了高度的一致性與互通性。因為所有物件本質上都是 `Object` 的一種，因此你可以將不同類型的物件（例如 `Student`、`Car`）存儲在一個 Object 陣列中，這便是<mark>多型 (Polymorphism)</mark> 的一個最基礎的應用。

例如，即使我們沒有在 `Student` 類別裡定義 `toString()` 方法，但因為它繼承自 Object

所以可以直接使用：

```java
Student studentC = new Student("小花", 2023003);

// 即使沒有在 Student 類別中定義，仍然可以呼叫 toString()
System.out.println(studentC.toString()); // 會輸出類似 Student@... 的字串
```


Object 類別不僅提供這些基礎方法，它更是整個 Java 類別體系能夠協同運作的基石。它賦予了所有物件一個共同的身份，使得 Java 的集合框架（如 ArrayList）能夠處理任何類型的物件，無需為每種資料類型編寫不同的程式碼。

# 第二章：定義行為的「合約」：Interface 介面

## 2.1 什麼是「介面」(Interface)？程式世界的「規格合約」

介面是一個純粹的「合約」或「規格書」。它只定義了類別必須提供的公共方法簽名（method signature），也就是「能做什麼」，但不提供具體的實現（怎麼做）。

一個絕佳的比喻是電器插座的「規格」。這個規格只定義了插座是三孔的、可以傳輸電力，但它不關心你插上去的是吹風機還是電風扇。吹風機和電風扇是不同的類別，但它們都必須遵守相同的插座規格。

在 Java 中，我們使用 interface 關鍵字來定義介面，並且介面不能直接被實例化，因為它沒有具體的行為可以執行。

```java
// 定義一個名為 'Driveable' 的介面，它是一個「可駕駛」的合約
public interface Driveable {
    // 這個合約規定，所有實現它的類別都必須提供這兩個方法
    void start(); // 啟動
    void stop();  // 停止
}
```

介面的核心設計思想是「關注點分離」（Separation of Concerns）—— 將「介面」（外部使用者能看到和使用的部分）與「實現」（內部的具體邏輯）分開。這使得程式碼更模組化，方便後續維護和擴充。
一個值得注意的點是，從 Java 8 開始，介面可以包含有具體實現的 `default` 方法和 `static` 方法。這是一項重要的語言設計決策，它解決了一個長期存在的難題：如果你要為一個已經被廣泛使用的介面添加一個新方法，所有實作這個介面的類別都會因為缺少新方法的實現而編譯錯誤。

`default` 方法的出現，允許你在介面中提供一個預設的實現，這樣那些舊的、沒有更新的類別也能夠繼續正常運作，而不會被破壞，這展現了 Java 語言在維護向後相容性上的務實考量。

## 2.2 類別與介面的互動：簽署「合約」並履行

一個類別若要實作一個介面，必須使用 `implements` 關鍵字，並為介面中定義的所有抽象方法提供具體的程式碼實現。

想像一個汽車類別「簽署」了「可駕駛」的合約，它必須遵守合約，提供自己獨特的「啟動引擎」和「停止引擎」的具體方法。

如果它沒有提供這些方法的實現，程式就無法通過編譯，這確保了程式碼的嚴謹性與可靠性。

```java
// 'Car' 類別實作了 'Driveable' 介面
public class Car implements Driveable {
    @Override
    public void start() {
        System.out.println("汽車引擎啟動了...");
    }

    @Override
    public void stop() {
        System.out.println("汽車引擎停止了...");
    }
}
```

::: danger 注意
介面（Iterface）為 Java 提供了多重繼承的能力，這是類別所無法做到的。傳統的多重類別繼承（例如，一個類別同時繼承 `ParentA` 和 `ParentB`）可能導致「鑽石問題」（diamond problem）：如果 `ParentA` 和`ParentB` 都有一個同名但不同實現的方法，子類別應該繼承哪一個？

介面因為只定義方法簽名，不提供實現，因此完美地迴避了這個問題。

當一個類別實作多個介面時，它必須被迫自己提供一個唯一的、明確的實現，從而解決了潛在的衝突。
:::


## 2.3 介面的多重能力：打破單一繼承的限制

一個類別可以同時實作多個介面，從而獲得多種不同的能力。這使得一個類別可以扮演多重角色，而不受限於單一類別繼承的限制。

例如，一輛智慧型汽車，它既可以實作「可駕駛」的介面，也可以實作「可播放音樂」的介面。

```java
// 定義一個 'Playable' 介面
public interface Playable {
    void play();
    void pause();
}

// 'SmartCar' 類別同時實作了兩個介面
public class SmartCar implements Driveable, Playable {
    // 必須實現 Driveable 的 start() 和 stop()
    @Override
    public void start() { /*... 具體程式碼... */ }

    @Override
    public void stop() { /*... 具體程式碼... */ }

    // 同時必須實現 Playable 的 play() 和 pause()
    @Override
    public void play() { /*... 具體程式碼... */ }

    @Override
    public void pause() { /*... 具體程式碼... */ }
}
```


以下表格總結了類別與介面的主要差異，以幫助讀者更清楚地對比兩者：

| 特徵     | 類別 (Class)                        | 介面 (Interface)                                         |
| -------- | ----------------------------------- | -------------------------------------------------------- |
| 關鍵字   | class                               | interface                                                |
| 實例化   | 可以被實例化，創建物件。            | 不能直接實例化，需要由類別來實現。                       |
| 繼承機制 | 透過 extends 繼承，只支援單一繼承。 | 透過 implements 實現，支援多重實現。                     |
| 建構子   | 可以有建構子。                      | 不能有建構子。                                           |
| 方法類型 | 可以包含抽象方法與具體方法。        | 預設為抽象方法，Java 8 後可包含 default 和 static 方法。 |
| 變數類型 | 可為任意類型。                      | 預設為 public static final。                             |
| 設計目的 | 作為物件的藍圖，定義資料與行為。    | 作為能力合約，定義一組必須實現的方法。                   |


# 總結

透過前面兩章的探討，我們已經建立了對 Java 三大核心概念的基礎理解：

- **類別 (Class)**：程式世界的「設計圖」，定義物件的屬性與方法
- **物件 (Object)**：根據類別創造出的具體實體，擁有獨立的資料和行為
- **介面 (Interface)**：定義行為的「合約」，實現多重能力和統一操作

這三個概念構成了 Java 物件導向程式設計的基石。類別提供結構藍圖，物件承載具體資料，介面定義能力合約，它們共同協作創造出強大而靈活的程式架構。

掌握了這些基礎概念後，你已經具備了深入學習 Java 物件導向程式設計的基礎。建議繼續學習這些概念的進階應用與實際開發情境。
