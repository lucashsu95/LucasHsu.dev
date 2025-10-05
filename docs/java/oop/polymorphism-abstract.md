---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta  
    - name: keywords
      content: Java多型教學, Polymorphism多型實現, Java抽象類別Abstract, 組合模式Composite Pattern, Interface進階應用, extends vs implements差異, 通知系統設計, 智慧家庭設備控制, Java繼承與介面比較, 物件導向設計模式, OOP進階概念, Java多重介面實作, 抽象類別實戰應用, 多型與組合設計
  - - meta
    - name: description
      content: 深入學習Java多型（Polymorphism）與抽象類別！透過通知系統和智慧家庭設備實例，完整掌握「同一介面，多種實作」的威力。涵蓋組合模式、多重介面應用、extends vs implements差異比較，從基礎概念到進階設計模式，建立紮實的OOP抽象思維能力。
  - - meta
    - property: og:title  
      content: Java多型與抽象類別完全解析 | Polymorphism進階設計模式實戰
  - - meta
    - property: og:description
      content: 透過通知系統和智慧家庭設備實例，深度學習Java多型概念與抽象類別應用。從遙控器比喻到組合模式實作，完整掌握「同一介面，多種實作」的設計思維，提升物件導向抽象能力。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/java-cover.jpg
  - - meta
    - property: og:url
      content: https://lucashsu95.github.io/LucasHsu.dev/java/oop/class-object-interface.html  
  - - meta
    - property: og:site_name
      content: LucasHsu.dev - 程式開發教學
  - - meta
    - property: article:author
      content: 許恩綸
  - - meta
    - property: article:published_time
      content: 2024-10-05T00:00:00+08:00
  - - meta
    - property: article:modified_time  
      content: 2024-10-05T00:00:00+08:00
  - - meta
    - property: article:section
      content: Java程式設計
  - - meta
    - property: article:tag
      content: Java多型
  - - meta
    - property: article:tag  
      content: Polymorphism
  - - meta
    - property: article:tag
      content: 抽象類別
  - - meta
    - property: article:tag
      content: 組合模式
  - - meta
    - property: article:tag
      content: OOP進階
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:site
      content: "@lucashsu95"
  - - meta
    - name: twitter:creator
      content: "@lucashsu95"  
  - - meta
    - name: twitter:title
      content: Java多型與抽象類別完全解析 | Polymorphism進階設計模式實戰
  - - meta
    - name: twitter:description
      content: 透過通知系統實例深度學習Java多型概念！從遙控器比喻到組合模式實作，完整掌握「同一介面，多種實作」設計思維，提升OOP抽象能力。
  - - link
    - rel: canonical
      href: https://lucashsu95.github.io/LucasHsu.dev/java/oop/polymorphism-abstract.html
  - - meta
    - name: robots
      content: index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1
  - - script
    - type: application/ld+json
      content: |
        {
          "@context": "https://schema.org",
          "@type": "TechnicalArticle",
          "headline": "Java多型與抽象類別完全解析 | Polymorphism進階設計模式實戰",
          "description": "深入學習Java多型（Polymorphism）與抽象類別！透過通知系統和智慧家庭設備實例，完整掌握『同一介面，多種實作』的威力，涵蓋組合模式與進階OOP設計思維。",
          "author": {
            "@type": "Person", 
            "name": "許恩綸",
            "url": "https://lucashsu95.github.io/LucasHsu.dev/"
          },
          "publisher": {
            "@type": "Organization",
            "name": "LucasHsu.dev",
            "url": "https://lucashsu95.github.io/LucasHsu.dev/"
          },
          "datePublished": "2024-10-05T00:00:00+08:00",
          "dateModified": "2024-10-05T00:00:00+08:00",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://lucashsu95.github.io/LucasHsu.dev/java/oop/polymorphism-abstract.html"
          },
          "image": "https://lucashsu95.github.io/LucasHsu.dev/images/java-cover.jpg",
          "articleSection": "Java程式設計",
          "keywords": ["Java多型", "Polymorphism", "抽象類別", "組合模式", "Interface進階", "extends vs implements", "通知系統設計", "OOP進階"],
          "about": [
            {
              "@type": "Thing",
              "name": "Java多型（Polymorphism）",
              "description": "同一介面多種實作的設計概念與應用"
            },
            {
              "@type": "Thing", 
              "name": "抽象類別（Abstract Class）",
              "description": "介於介面與具體類別間的抽象設計"
            },
            {
              "@type": "Thing",
              "name": "組合模式（Composite Pattern）",
              "description": "透過組合實現複雜功能的設計模式"
            }
          ],
          "teaches": [
            "多型概念與實際應用",
            "抽象類別設計與實作",
            "組合模式設計思維",
            "通知系統架構設計",
            "extends vs implements差異",
            "多重介面組合應用"
          ],
          "audience": {
            "@type": "Audience",
            "audienceType": "Java程式設計學習者"
          },
          "educationalLevel": "初學者",
          "learningResourceType": "實戰教學文章",
          "programmingLanguage": "Java",
          "typicalAgeRange": "18-45"
        }
---

# 第三章：抽象的力量 - 多型與組合設計

## 3.1 多型（Polymorphism）：同一介面，多種實作

### 什麼是多型？

想像一個遙控器（介面），它只有「開機」、「關機」按鈕。無論你控制的是 Sony 電視還是 Samsung 電視，你只需要按相同的按鈕。這就是多型的威力：

> **同一個操作，根據不同物件類型，產生不同的行為**

### 魔法時刻：一行程式碼，多種結果

實做一個開啟所有燈具的方法`turnOnAllLight()`

```java
class LightController {
    public void turnOnAllLight() {
        System.out.println("=== 一行程式碼，多種執行結果 ===");
        // 神奇的事情：同一行程式碼，產生 5 種不同的輸出！
        for (SmartLight light : lights) {
            light.turnOn(); // 每個燈泡執行自己品牌的 turnOn()
        }
    }
}

public class App {
    public static void main(String[] args) {
        LightController controller = new LightController();
        controller.turnOnAllLight();
        controller.showAllLightStatus();
    }
}
```

**輸出結果：**
```
=== 一行程式碼，多種執行結果 ===
xiaomi 燈泡瞬間點亮
osram 專業燈具點亮
philips 智慧燈泡優雅點亮
yeelight 智慧燈啟動
ikea 燈具溫馨啟動
=== 所有燈具狀態總覽 ===
xiaomi: ON | 亮度: 50% | 色溫: 4000K
osram: ON | 亮度: 50% | 色溫: 3500K
philips: ON | 亮度: 50% | 色溫: 3000K
yeelight: ON | 亮度: 50% | 色溫: 4000K
ikea: ON | 亮度: 50% | 色溫: 2700K
```

**關鍵理解：**
- 程式碼只知道 `SmartLight` 介面
- 實際執行時，會根據物件的**真實類型**調用對應的方法
- 這讓程式碼具有極大的彈性

## 3.2 情境實戰：跨平台通知系統

### 問題描述

你的應用需要發送通知給使用者。一開始只用電子郵件，後來要加**簡訊、App 推播**...

**不使用 OOP 的做法（災難）：**

```java
public class NotificationManager {
    public void sendNotification(String type, String message) {
        if (type.equals("email")) {
            System.out.println("發送郵件: " + message);
            // 郵件 API 邏輯...
        } else if (type.equals("sms")) {
            System.out.println("發送簡訊: " + message);
            // 簡訊 API 邏輯...
        } else if (type.equals("push")) {
            System.out.println("發送推播: " + message);
            // 推播 API 邏輯...
        }
        // 每次新增通知方式，都要改這個方法...
    }
}
```

### OOP 解決方案

**步驟 1：定義 Notifier 介面**

```java
/**
 * Notifier 介面：定義通知服務的行為契約
 */
interface Notifier {
    void send(String message);
}
```

**步驟 2：實作各種通知類別**

```java
// 電子郵件通知
class EmailNotifier implements Notifier {
    @Override
    public void send(String message) {
        System.out.println("發送電子郵件通知: " + message);
        // 真實的郵件 API 呼叫...
    }
}

// 簡訊通知
class SmsNotifier implements Notifier {
    @Override
    public void send(String message) {
        System.out.println("發送簡訊通知: " + message);
        // 真實的簡訊 API 呼叫...
    }
}

// App 推播通知
class PushNotifier implements Notifier {
    @Override
    public void send(String message) {
        System.out.println("發送 App 推播通知: " + message);
        // 真實的推播 API 呼叫...
    }
}
```

**步驟 3：統一使用（多型的威力）**

```java
class NotificationService {
    // 這個方法只認識 Notifier 介面，不關心具體實作
    public static void sendNotification(Notifier notifier, String message) {
        System.out.println("準備發送通知...");
        notifier.send(message);
        System.out.println("通知發送完成\n");
    }
    
    public static void main(String[] args) {
        // 創建不同的通知器
        Notifier email = new EmailNotifier();
        Notifier sms = new SmsNotifier();
        Notifier push = new PushNotifier();
        
        // 用同一個方法發送不同類型的通知
        sendNotification(email, "您的帳號已成功註冊");
        sendNotification(sms, "您的訂單已出貨");
        sendNotification(push, "您有新訊息");
    }
}
```

## 3.3 組合模式：多重通知器

### 新需求：重要通知要同時發送多種方式

```java
/**
 * CompositeNotifier：組合多個通知器
 * 它本身也是一個 Notifier！（這就是組合模式的精髓）
 */
class CompositeNotifier implements Notifier {
    private List<Notifier> notifiers;
    
    public CompositeNotifier(List<Notifier> notifiers) {
        this.notifiers = notifiers;
    }
    
    @Override
    public void send(String message) {
        System.out.println("正在透過多個渠道發送重要通知...");
        for (Notifier notifier : notifiers) {
            notifier.send(message);
        }
    }
}
```

**使用組合通知器：**

```java
class CompositeDemo {
    public static void main(String[] args) {
        // 創建重要通知器：同時發送郵件和簡訊
        List<Notifier> importantChannels = Arrays.asList(
            new EmailNotifier(),
            new SmsNotifier()
        );
        
        Notifier importantNotifier = new CompositeNotifier(importantChannels);
        
        // 神奇的地方：它也是一個 Notifier，可以用同樣的方式呼叫
        NotificationService.sendNotification(
            importantNotifier,
            "您的密碼已被重設，請立即確認！"
        );
    }
}
```

## 3.4 多重能力組合：Interface 的進階應用

### 情境：智慧家庭設備有不同的能力組合

- 智慧燈泡：可控制 + 可調光 + 可調色溫
- 智慧音響：可控制 + 可調音量
- 智慧風扇：可控制 + 可調轉速

### 拆解能力為多個 Interface

```java
// 基本控制能力
interface Controllable {
    void powerOn();
    void powerOff();
    boolean isOn();
}

// 亮度調節能力
interface Dimmable {
    void setBrightness(int level);
    int getBrightness();
}

// 色溫調節能力
interface ColorTemperatureAdjustable {
    void setColorTemperature(int temp);
    int getColorTemperature();
}

// 音量控制能力
interface VolumeControllable {
    void setVolume(int level);
    int getVolume();
}
```

### 組合不同能力

```java
// 智慧音響：基本控制 + 音量控制
class SmartSpeaker implements Controllable, VolumeControllable {
    private boolean isOn = false;
    private int volume = 50;
    
    @Override
    public void powerOn() {
        isOn = true;
        System.out.println("音響開啟");
    }
    
    @Override
    public void powerOff() {
        isOn = false;
        System.out.println("音響關閉");
    }
    
    @Override
    public boolean isOn() {
        return isOn;
    }
    
    @Override
    public void setVolume(int level) {
        volume = level;
        System.out.println("音量調整至 " + level);
    }
    
    @Override
    public int getVolume() {
        return volume;
    }
}

// 高階智慧燈泡：基本控制 + 亮度調節 + 色溫調節
class AdvancedSmartLight implements Controllable, Dimmable, ColorTemperatureAdjustable {
    // 實作所有介面的方法...
}
```
## 3.5 三種 OOP 關係：extends 繼承 vs implements 介面 vs 抽象類別

### Inheritance (extends)：繼承關係

```java
// 父類別：定義動物的基本特徵
class Animal {
    protected String name;
    protected int age;
    
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // 所有動物都有的行為
    public void sleep() {
        System.out.println(name + " 正在睡覺...");
    }
    
    public void eat() {
        System.out.println(name + " 正在吃東西...");
    }
    
    // 可以被覆寫的方法
    public void makeSound() {
        System.out.println(name + " 發出聲音...");
    }
}

// 子類別：繼承父類別的所有特徵
class Dog extends Animal {
    private String breed;
    
    public Dog(String name, int age, String breed) {
        super(name, age);  // 呼叫父類別建構子
        this.breed = breed;
    }
    
    // 覆寫父類別方法
    @Override
    public void makeSound() {
        System.out.println(name + " 汪汪叫！");
    }
    
    // 新增子類別特有的方法
    public void wagTail() {
        System.out.println(name + " 搖尾巴表示開心");
    }
}

class Cat extends Animal {
    public Cat(String name, int age) {
        super(name, age);
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " 喵喵叫～");
    }
    
    public void climb() {
        System.out.println(name + " 爬到高處");
    }
}
```

**繼承的使用範例：**

```java
public class InheritanceDemo {
    public static void main(String[] args) {
        // 創建不同動物
        Dog myDog = new Dog("旺財", 3, "黃金獵犬");
        Cat myCat = new Cat("小咪", 2);
        
        // 繼承來的方法，所有子類別都有
        myDog.sleep();    // 繼承自 Animal
        myCat.eat();      // 繼承自 Animal
        
        // 各自覆寫的方法，展現多型
        myDog.makeSound(); // 輸出：旺財 汪汪叫！
        myCat.makeSound(); // 輸出：小咪 喵喵叫～
        
        // 子類別特有的方法
        myDog.wagTail();   // Dog 類別特有
        myCat.climb();     // Cat 類別特有
        
        // 多型應用：父類別引用指向子類別物件
        Animal[] animals = {myDog, myCat};
        for (Animal animal : animals) {
            animal.makeSound();  // 會呼叫各自覆寫的版本
        }
    }
}
```

### Abstract Class（抽象類別）

```java
// 抽象類別：定義動物的共同特徵，但某些方法必須由子類別實作
public abstract class Animal {
    protected String name;
    protected int age;
    
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // 具體方法：所有動物都有相同實作
    public void sleep() {
        System.out.println(name + " 正在睡覺...");
    }
    
    // 抽象方法：每種動物必須有自己的實作
    public abstract void makeSound();
    public abstract void move();
}

public class Bird extends Animal {
    public Bird(String name, int age) {
        super(name, age);
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " 啾啾叫");
    }
    
    @Override
    public void move() {
        System.out.println(name + " 在天空飛翔");
    }
}
```

### 三種關係的對比表格

| 特徵         | Interface（implements）            | Abstract Class（extends）  | Concrete Class（extends） |
| ------------ | ---------------------------------- | -------------------------- | ------------------------- |
| **設計目的** | 定義「能力」（can-do）             | 定義「身份」+ 共同實作     | 定義「具體類型」          |
| **繼承數量** | 可實作多個                         | 只能繼承一個               | 只能繼承一個              |
| **方法實作** | 預設抽象方法（Java 8+可有default） | 可以有具體方法和抽象方法   | 全部都是具體方法          |
| **建構子**   | 不能有                             | 可以有                     | 可以有                    |
| **屬性**     | 只能有 public static final         | 可以有各種屬性             | 可以有各種屬性            |
| **使用時機** | 不同類別有相同能力時               | 有共同屬性和部分共同行為時 | 完全共用實作邏輯時        |
| **關鍵字**   | `implements`                       | `extends`                  | `extends`                 |
| **多型支援** | ✅ 支援                             | ✅ 支援                     | ✅ 支援                    |
| **設計原則** | 優先使用（更靈活）                 | 謹慎使用（有共同實作時）   | 謹慎使用（避免深層繼承）  |

### 經典設計原則

> **「優先使用組合而非繼承，優先使用介面而非抽象類別」**

**為什麼？**
- **繼承**創造了強耦合關係
- **組合**提供更大的彈性
- **介面**定義契約而不強制實作方式
- **抽象類別**介於兩者之間，適合有共同實作的場景