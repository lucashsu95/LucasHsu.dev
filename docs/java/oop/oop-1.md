---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta  
    - name: keywords
      content: Java物件導向程式設計, Java OOP教學, 物件導向程式設計實戰, Java Interface多型, Java程式重構, 智慧家電控制系統, Java設計模式, 物件導向設計原則, Java class object interface, 程式碼重構實例, Java polymorphism教學, 軟體架構設計, Java初學者教學, 程式設計模式實戰
  - - meta
    - name: description
      content: 完整的Java物件導向程式設計(OOP)實戰教學！透過智慧家電控制系統範例，從混亂程式碼逐步重構為優雅OOP設計。深度講解Class、Object、Interface、多型(Polymorphism)等核心概念，搭配實際程式範例，適合Java初學者到進階開發者學習物件導向設計模式。
  - - meta
    - property: og:title  
      content: Java物件導向程式設計完整實戰教學 | OOP重構實例與設計模式深度解析
  - - meta
    - property: og:description
      content: 透過智慧家電控制系統實戰案例，完整學習Java OOP核心概念：Class、Object、Interface、多型。從混亂程式碼到優雅設計的重構過程，包含實際程式範例與設計模式應用。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/java-cover.jpg
  - - meta
    - property: og:url
      content: https://lucashsu95.github.io/LucasHsu.dev/java/oop/oop-1.html  
  - - meta
    - property: og:site_name
      content: LucasHsu.dev - 程式開發教學
  - - meta
    - property: article:author
      content: 許恩綸
  - - meta
    - property: article:published_time
      content: 2024-10-04T00:00:00+08:00
  - - meta
    - property: article:modified_time  
      content: 2024-10-04T00:00:00+08:00
  - - meta
    - property: article:section
      content: Java程式設計
  - - meta
    - property: article:tag
      content: Java
  - - meta
    - property: article:tag  
      content: OOP
  - - meta
    - property: article:tag
      content: 物件導向程式設計
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
      content: Java物件導向程式設計完整實戰教學 | OOP重構實例與設計模式
  - - meta
    - name: twitter:description
      content: 透過智慧家電控制系統實戰，完整學習Java OOP：Class、Object、Interface、多型。從混亂程式碼到優雅設計的重構教學，包含實際範例與設計模式應用。
  - - link
    - rel: canonical
      href: https://lucashsu95.github.io/LucasHsu.dev/java/oop/oop-1.html
  - - meta
    - name: robots
      content: index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1
  - - script
    - type: application/ld+json
      content: |
        {
          "@context": "https://schema.org",
          "@type": "TechnicalArticle",
          "headline": "Java物件導向程式設計完整實戰教學 | OOP重構實例與設計模式深度解析",
          "description": "透過智慧家電控制系統實戰案例，完整學習Java OOP核心概念：Class、Object、Interface、多型。從混亂程式碼到優雅設計的重構過程，包含實際程式範例與設計模式應用。",
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
          "datePublished": "2024-10-04T00:00:00+08:00",
          "dateModified": "2024-10-04T00:00:00+08:00",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://lucashsu95.github.io/LucasHsu.dev/java/oop/oop-1.html"
          },
          "image": "https://lucashsu95.github.io/LucasHsu.dev/images/java-cover.jpg",
          "articleSection": "Java程式設計",
          "keywords": ["Java", "OOP", "物件導向程式設計", "Interface", "多型", "程式重構", "設計模式"],
          "audience": {
            "@type": "Audience",
            "audienceType": "程式設計學習者"
          },
          "educationalLevel": "初學者到進階",
          "learningResourceType": "教學文章",
          "programmingLanguage": "Java"
        }
---


# Java OOP 物件導向程式設計：從混亂到秩序的重構之旅

## 🎯 課程目標

透過實戰情境體驗，從混亂的程式碼出發，深入理解 Class、Object、Interface 的核心概念，最終掌握用物件導向思維解決實際問題的能力。

---

# 第一章：需求地獄 - 體驗混亂的開始

## 1.1 情境背景

你剛進入一家智慧家電新創公司「HomeTech」，第一天上班，主管就丟給你一個緊急任務：

> **"客戶抱怨我們的設備控制 App 經常當機，而且每次新增品牌支援都要等 2 週開發時間。董事會下週要看 demo，你能先做個最基礎的版本嗎？"**

### 初始需求（故意簡化）
- 支援 3 個燈具品牌：Philips、小米、IKEA
- 基本功能：開燈、關燈
- **重要限制**：「先求有，再求好，時間很趕！」

## 1.2 快速交付版本（10 分鐘實作）

```java
// 給學生的起始框架

import java.util.*;

class LightController {
    // 需求：根據brand參數控制不同品牌的燈
    // brand可能的值："philips", "xiaomi", "ikea"
    // action可能的值："on", "off"

    private Map<String, String> lightStatus = new HashMap<>(Map.of(
            "philips", "off",
            "xiaomi", "off",
            "ikea", "off"));

    public void controlLight(String brand, String action) {
        // 你的實作在這裡...
        // 提示：最直接的方式就是if-else判斷
    }

    public void showAllLightStatus() {
        // 這裡先簡單示範
        System.out.println("=== 所有燈具狀態總覽 ===");
        for (Map.Entry<String, String> entry : lightStatus.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue().toUpperCase());
        }

    }
}

// 測試用的main方法
public class App {
    public static void main(String[] args) {
        LightController controller = new LightController();

        // 測試案例
        controller.controlLight("philips", "on");
        controller.controlLight("xiaomi", "off");
        controller.controlLight("ikea", "on");
        controller.controlLight("unknown", "on"); // 如果出現不支援品牌 要如何應變呢?
        controller.showAllLightStatus();
    }
}
```

預期輸出：

```
已將 philips 燈設為 ON
已將 xiaomi 燈設為 OFF
已將 ikea 燈設為 ON
不支援的品牌: unknown
=== 所有燈具狀態總覽 ===
xiaomi: OFF
philips: ON
ikea: ON
```

**看起來還可以？讓我們繼續...**

## 1.3 第一波需求變更（5 分鐘後）

> **主管：「剛接到客戶電話，他們的 Philips 燈泡開關有特殊動畫效果，小米的比較直接，IKEA 的有漸變效果。麻煩調整一下輸出訊息。」**

**測試用的main方法**

```java
public class App {
    public static void main(String[] args) {
        LightController controller = new LightController();

        controller.controlLight("philips", "on");
        controller.controlLight("xiaomi", "on");
        controller.controlLight("ikea", "on");
        controller.showAllLightStatus();

        controller.controlLight("xiaomi", "off");
        controller.controlLight("philips", "off");
        controller.controlLight("ikea", "off");
        controller.showAllLightStatus();
    }
}
```

**預期輸出**

```
philips 智慧燈泡優雅點亮
xiaomi 燈泡瞬間點亮
ikea 燈具溫馨啟動
不支援的品牌: unknown
=== 所有燈具狀態總覽 ===
xiaomi: ON
philips: ON
ikea: ON
xiaomi 燈泡立即關閉
philips 智慧燈泡柔和熄滅
ikea 燈具安靜關閉
=== 所有燈具狀態總覽 ===
xiaomi: OFF
philips: OFF
ikea: OFF
```

## 1.4 第二波需求變更（再 5 分鐘後）

> **主管：「客戶又說要加亮度調節功能。另外，剛簽了兩個新品牌：Osram 和 Yeelight。」**

**新增功能需求(亮度調節功能)：**
初始亮度預設50
```java
// setBrightness(brand, level) - level 1-100

// LightController裡再新增1種方法
public void setBrightness(String brand, int level) {
    // ??
}
```

**新品牌輸出格式：**
```java
// Osram: "Osram專業燈具[動作]"
// Yeelight: "Yeelight智慧燈[動作]"

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
        controller.setBrightness("osram", 75);
        controller.setBrightness("yeelight", 85);

        System.out.println("\n測試案例 3: 錯誤輸入測試");
        controller.setBrightness("philips", 150); // 超出範圍
        controller.controlLight("unknown", "on"); // 不支援品牌

        controller.showAllLightStatus(); // 要輸出status、brightness
    }
}
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
osram 燈泡亮度調節至 75%
yeelight 燈泡亮度調節至 85%

測試案例 3: 錯誤輸入測試
亮度範圍錯誤: 150 (應介於1-100之間)
不支援的品牌: unknown

=== 所有燈具狀態總覽 ===
xiaomi: ON | 亮度: 90%
osram: ON | 亮度: 75%
philips: ON | 亮度: 80%
yeelight: ON | 亮度: 85%
ikea: ON | 亮度: 50%
```


## 1.5 第三波需求變更（再 5 分鐘後）

> **主管：「客戶又說要加色溫調整功能，董事會說要 demo 智慧風扇和智慧音響的控制，用同一個 App。風扇有轉速調節，音響有音量控制。」**

**新增功能需求(色溫調整功能)：**
```java
// setColorTemperature(brand, temp) - temp 2700-6500K

// LightController裡再新增1種方法
public void setColorTemperature(String brand, int temp) {
    // ??
}
```

**LightController 改名為 DeviceController**
```java
public class DeviceController {
    public void controlDevice(String type, String brand, String action) {
        if (type.equals("light")) {
            // 40 行的燈具邏輯
        } else if (type.equals("fan")) {
            // 又要寫一堆 if-else
        } else if (type.equals("speaker")) {
            // 再寫一堆 if-else
        }
    }
    
    public void adjustDevice(String type, String brand, String param, int value) {
        // 這個方法要處理：亮度、色溫、轉速、音量...
        // if (type + brand + param) 的排列組合...
    }
}
```

**關鍵時刻**
- 是否開始抱怨程式碼變得很亂？
- 是否發現很多重複的邏輯？
- 是否開始覺得難以維護？

## 1.6 痛苦度量化

**程式碼複雜度分析表**
| 項目                     | 最初版本 | 當前版本 | 如果有10個品牌會變成 |
| ------------------------ | -------- | -------- | -------------------- |
| controlLight方法行數     | ?        | ?        | ?                    |
| 需要維護的if-else分支    | ?        | ?        | ?                    |
| 新增一個品牌要修改的地方 | ?        | ?        | ?                    |
| 新增一個功能要修改的地方 | ?        | ?        | ?                    |

**關鍵問題：**
1. 如果 bug 出現在某個品牌的某個功能，要怎麼快速定位？
2. 如果要修改所有品牌的開燈邏輯，需要改幾個地方？
3. 新來的同事能快速理解這些程式碼嗎？
4. 這樣的程式碼還能撐多久？

