---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta  
    - name: keywords
      content: Java Class Object Interface教學, Java類別物件介面實戰, Java Interface介面設計, 物件導向設計模式, Java OOP三大支柱, SmartLight介面實作, Java多型實現, 物件建構子用法, Java implements關鍵字, 介面與抽象類別差異, Java繼承與介面, 物件導向程式重構, Class設計原則, Interface合約設計, Java燈泡控制系統
  - - meta
    - name: description
      content: 深入解析Java三大核心概念：Class（類別）、Object（物件）、Interface（介面）！透過智慧燈泡控制系統實例，從生活比喻到程式實作，完整學習介面設計、物件建立、類別實作等OOP基礎。包含SmartLight介面設計、多品牌燈泡類別實作，適合Java初學者建立紮實物件導向基礎。
  - - meta
    - property: og:title  
      content: Java Class Object Interface完全解析 | 物件導向三大支柱實戰教學
  - - meta
    - property: og:description
      content: 透過智慧燈泡系統實例，完整學習Java Class、Object、Interface核心概念。從生活比喻到程式實作，深度解析介面設計、物件建立、類別實作等OOP基礎，建立紮實物件導向程式設計能力。
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
      content: Java Class
  - - meta
    - property: article:tag  
      content: Java Object
  - - meta
    - property: article:tag
      content: Java Interface
  - - meta
    - property: article:tag
      content: 物件導向設計
  - - meta
    - property: article:tag
      content: OOP基礎
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
      content: Java Class Object Interface完全解析 | 物件導向三大支柱實戰教學
  - - meta
    - name: twitter:description
      content: 透過智慧燈泡系統實例，完整學習Java Class、Object、Interface核心概念。從生活比喻到程式實作，深度解析介面設計與物件建立，建立紮實OOP基礎。
  - - link
    - rel: canonical
      href: https://lucashsu95.github.io/LucasHsu.dev/java/oop/class-object-interface.html
  - - meta
    - name: robots
      content: index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1
  - - script
    - type: application/ld+json
      content: |
        {
          "@context": "https://schema.org",
          "@type": "TechnicalArticle",
          "headline": "Java Class Object Interface完全解析 | 物件導向三大支柱實戰教學",
          "description": "深入解析Java三大核心概念：Class（類別）、Object（物件）、Interface（介面）！透過智慧燈泡控制系統實例，從生活比喻到程式實作，完整學習介面設計、物件建立、類別實作等OOP基礎。",
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
            "@id": "https://lucashsu95.github.io/LucasHsu.dev/java/oop/class-object-interface.html"
          },
          "image": "https://lucashsu95.github.io/LucasHsu.dev/images/java-cover.jpg",
          "articleSection": "Java程式設計",
          "keywords": ["Java Class", "Java Object", "Java Interface", "物件導向設計", "介面實作", "類別建構", "SmartLight", "OOP基礎"],
          "about": [
            {
              "@type": "Thing",
              "name": "Java Class類別",
              "description": "Java類別的定義與使用方法"
            },
            {
              "@type": "Thing", 
              "name": "Java Object物件",
              "description": "物件的建立與操作技巧"
            },
            {
              "@type": "Thing",
              "name": "Java Interface介面",
              "description": "介面設計與實作模式"
            }
          ],
          "teaches": [
            "Java Class類別設計原則",
            "Object物件建立與初始化",
            "Interface介面定義與實作",
            "SmartLight介面實戰應用",
            "多品牌燈泡類別設計",
            "建構子的使用方法"
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

# 第二章：尋找秩序 - Class、Object、Interface 的世界

## 2.1 從生活中尋找靈感

讓我們暫停寫程式碼，先思考一個問題：

> **現實生活中，不同品牌的燈泡，在『功能』上有什麼共同點？**

- 都可以開/關
- 都可以調亮度
- 都可以調色溫
- 只是**實作方式**不同

這不就像是：
- 所有車子都有「油門、剎車、方向盤」（共同功能）
- 但 BMW 和 Toyota 的實作細節完全不同（不同實作）

**程式碼能不能也用這種方式設計？**

## 2.2 Java 世界的三大主角

想像一下，你是一位樂高設計師：

### 🎨 Class（類別）：設計圖

就像樂高太空船的**設計圖紙**：
- 標註了形狀、零件位置
- 定義了能發射雷射砲、打開艙門等功能
- **內部電路被保護罩包住，外人看不到也碰不到**
- 但它本身不是太空船，只是一份「說明書」

```java
// 定義一個 Student 類別（設計圖）
public class Student {
    // 屬性：代表學生的資料
    // private：封裝！外部無法直接存取這些資料
    private String name;
    private int studentId;
    
    // 建構子：創建物件時的初始化
    public Student(String name, int studentId) {
        this.name = name;
        this.studentId = studentId;
    }
    
    // 方法：代表學生的行為
    // public：對外開放的介面
    public void introduce() {
        System.out.println("嗨，我是 " + name + "，學號是 " + studentId);
    }

     // 提供安全的存取方式
    public String getName() {
        return name;
    }
    
    // 可以加入驗證邏輯保護資料
    public void setName(String newName) {
        if (newName != null && !newName.trim().isEmpty()) {
            this.name = newName;
        } else {
            System.out.println("姓名不能為空！");
        }
    }
}
```

### 🚀 Object（物件）：具體實體

根據設計圖**組裝出來的太空船模型**：
- 每個模型有自己的編號、顏色
- 但都共用設計圖定義的「發射雷射砲」功能

```java
// 創建兩個不同的學生物件
Student studentA = new Student("John", 2023001);
Student studentB = new Student("Lucas", 2023002);

// 它們是獨立的實體
studentA.introduce(); // 輸出：嗨，我是 John，學號是 2023001
studentB.introduce(); // 輸出：嗨，我是 Lucas，學號是 2023002

studentA.setName("Jack") // 無法直接操作資料 必須透過方法 比較安全!
studentA.introduce(); // 輸出：嗨，我是 Jack，學號是 2023001
```

**關鍵理解：**
- `studentA` 和 `studentB` 在記憶體中是**獨立的存在**
- 它們有**各自的屬性值**
- 但**共用相同的方法邏輯**

### 📋 Interface（介面）：能力合約

就像統一規格的**USB 插座**：
- 定義了「能做什麼」（傳輸資料、供電）
- 不關心「怎麼做」（滑鼠、鍵盤、隨身碟各有實作）
- 只要符合規格，就能使用

```java
// 定義一個「可駕駛」的能力合約
public interface Driveable {
    void start();  // 必須能啟動
    void stop();   // 必須能停止
}

// 汽車實作這個合約
public class Car implements Driveable {
    @Override
    public void start() {
        System.out.println("汽車引擎啟動...");
    }
    
    @Override
    public void stop() {
        System.out.println("汽車引擎停止...");
    }
}

// 摩托車也實作這個合約
public class Motorcycle implements Driveable {
    @Override
    public void start() {
        System.out.println("摩托車發動...");
    }
    
    @Override
    public void stop() {
        System.out.println("摩托車熄火...");
    }
}
```

## 2.3 情境實戰：智慧燈具系統重構

讓我們用這三個概念來重新設計第一章的燈具系統。

### 步驟 1：定義 Interface（能力合約）

```java
/**
 * SmartLight 介面：定義所有智慧燈泡都必須有的能力
 * 這是一個「合約」，所有實作它的類別都必須遵守
 */
interface SmartLight {
    void turnOn(); // 開燈
    void turnOff(); // 關燈
    int getBrightness(); // 取得亮度
    void setBrightness(int level); // 調整亮度 (1-100)
    String getBrand(); // 取得品牌名稱
    boolean isOn(); // 取得燈具狀態
}
```

**思考：為什麼要先定義 Interface？**
- 它強迫我們思考「所有燈泡的共同功能是什麼」
- 它建立了一個統一的「溝通語言」
- 未來新增品牌時，只要遵守這個合約即可

### 步驟 2：實作具體的 Class（品牌燈泡）

**PhilipsLight 類別：Philips 品牌的智慧燈泡**

實作 `SmartLight` 介面，提供 `Philips` 特色的實作

```java
class PhilipsLight implements SmartLight {
    private boolean isOn = false;
    private int brightness = 50;

    @Override
    public void turnOn() {
        isOn = true;
        System.out.println("philips 智慧燈泡優雅點亮");
    }

    @Override
    public void turnOff() {
        isOn = false;
        System.out.println("philips 智慧燈泡柔和熄滅");
    }

    @Override
    public void setBrightness(int level) {
            this.brightness = level;
    }

    @Override
    public String getBrand() {
        return "philips";
    }

    @Override
    public boolean isOn() {
        return isOn;
    }

    @Override
    public int getBrightness() {
        return brightness;
    }
}
```

**XiaomiLight 類別：小米品牌的智慧燈泡**
```java
class XiaomiLight implements SmartLight {
    private boolean isOn = false;
    private int brightness = 50;

    @Override
    public void turnOn() {
        isOn = true;
        System.out.println("xiaomi 燈泡瞬間點亮");
    }

    @Override
    public void turnOff() {
        isOn = false;
        System.out.println("xiaomi 燈泡立即關閉");
    }

    @Override
    public void setBrightness(int level) {
        this.brightness = level;
    }

    @Override
    public String getBrand() {
        return "xiaomi";
    }

    @Override
    public boolean isOn() {
        return isOn;
    }

    @Override
    public int getBrightness() {
        return brightness;
    }
}
```

### 步驟 3：創建 Object 並使用

```java
class LightController {
    private Map<String, SmartLight> lights = new HashMap<>();

    public LightController() {
        lights.put("philips", new PhilipsLight());
        lights.put("xiaomi", new XiaomiLight());
    }

    public void controlLight(String brand, String action) {
        SmartLight light = lights.get(brand);
        if (light == null) {
            System.out.println("不支援的品牌: " + brand);
            return;
        }

        if (action == "on") light.turnOn();
        else if(action == "off") light.turnOff();
        else System.out.println("無效的動作: " + action);
    }

    public void setBrightness(String brand, int level) {
        SmartLight light = lights.get(brand);
        if (light == null) {
            System.out.println("不支援的品牌: " + brand);
            return;
        }
        if (level >= 1 && level <= 100) {
            light.setBrightness(level);
            System.out.println(brand + " 燈泡亮度調節至 " + level + "%");
        } else {
            System.out.println("亮度範圍錯誤: " + level + " (應介於1-100之間)");
        }
    }

    public void showAllLightStatus() {
        System.out.println("=== 所有燈具狀態總覽 ===");
        for (SmartLight light : lights.values()) {
            String status = light.isOn() ? "ON" : "OFF";
            System.out.println(light.getBrand() + ": " + status +
                    " | 亮度: " + light.getBrightness() + "%");
        }
    }
}
public class App {
    public static void main(String[] args) {
        LightController controller = new LightController();

        System.out.println("測試案例 1: 基本開關功能");
        controller.controlLight("philips", "on");
        controller.controlLight("xiaomi", "on");

        System.out.println("\n測試案例 2: 亮度調節功能");
        controller.setBrightness("philips", 80);
        controller.setBrightness("xiaomi", 90);

        System.out.println("\n測試案例 3: 錯誤輸入測試");
        controller.setBrightness("philips", 150); // 超出範圍
        controller.controlLight("unknown", "on"); // 不支援品牌

        System.out.println();
        controller.showAllLightStatus(); // 輸出完整狀態
    }
}
```

## 2.4 關鍵概念總結

### Class vs Object vs Interface

| 概念      | 比喻         | 程式角色               | 能否實例化 |
| --------- | ------------ | ---------------------- | ---------- |
| Interface | 合約書、規格 | 定義「能做什麼」       | ❌ 不能     |
| Class     | 設計圖、範本 | 定義「是什麼、怎麼做」 | ✅ 能       |
| Object    | 實體產品     | 執行實際操作           | 已是實例   |

### 設計原則體現

1. **單一職責原則**：每個類別只負責一個品牌的實作
2. **開放封閉原則**：對擴展開放（新增品牌），對修改封閉（不改舊程式碼）
3. **依賴反轉原則**：依賴抽象（Interface）而非具體實作（Class）

## 2.5 實做剩下內容

實做剩下的`ikea`、`osram`、`yeelight`，色溫調整功能`setColorTemperature()`

**新品牌輸出格式：**
```java
// Osram: "osram 專業燈具[動作]"
// Yeelight: "yeelight 智慧燈[動作]"
```

**預期輸出**

```
測試案例 1: 基本開關功能
philips 智慧燈泡優雅點亮
xiaomi 燈泡瞬間點亮
ikea 燈具溫馨啟動
osram 專業燈具點亮
yeelight 智慧燈啟動

測試案例 2: 亮度調節功能
philips 燈泡亮度調節至 80%
xiaomi 燈泡亮度調節至 90%
ikea 燈泡亮度調節至 75%
osram 燈泡亮度調節至 85%
yeelight 燈泡亮度調節至 70%

測試案例 3: 色溫調節功能
philips 燈泡色溫調節至 2700K
xiaomi 燈泡色溫調節至 5000K
osram 燈具色溫調節至 4000K
yeelight 燈泡色溫調節至 3500K

測試案例 4: 錯誤輸入測試
亮度範圍錯誤: 150 (應介於1-100之間)
不支援的品牌: unknown

=== 所有燈具狀態總覽 ===
xiaomi: ON | 亮度: 90% | 色溫: 5000K
osram: ON | 亮度: 85% | 色溫: 4000K
philips: ON | 亮度: 80% | 色溫: 2700K
yeelight: ON | 亮度: 70% | 色溫: 3500K
ikea: ON | 亮度: 75% | 色溫: 2700K
```


**測試用的main方法**
```java
public class App {
    public static void main(String[] args) {
        LightController controller = new LightController();
        System.out.println("測試案例 1: 基本開關功能");
        controller.controlLight("philips", "on");
        controller.controlLight("xiaomi", "on");
        controller.controlLight("ikea", "on");
        controller.controlLight("osram", "on");
        controller.controlLight("yeelight", "on");

        System.out.println("\n測試案例 2: 亮度調節功能");
        controller.setBrightness("philips", 80);
        controller.setBrightness("xiaomi", 90);
        controller.setBrightness("ikea", 75);
        controller.setBrightness("osram", 85);
        controller.setBrightness("yeelight", 70);
        
        System.out.println("\n測試案例 3: 色溫調節功能");
        controller.setColorTemperature("philips", 2700);
        controller.setColorTemperature("xiaomi", 5000);
        controller.setColorTemperature("osram", 4000);
        controller.setColorTemperature("yeelight", 3500);

        System.out.println("\n測試案例 4: 錯誤輸入測試");
        controller.setBrightness("philips", 150); // 超出範圍
        controller.controlLight("unknown", "on"); // 不支援品牌

        controller.showAllLightStatus();
    }
}
```


