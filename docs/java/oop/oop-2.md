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

# 第四章：重返戰場 - 用 OOP 重構第一章的災難

## 4.1 回顧第一章的問題

還記得第一章那個混亂的 `LightController` 嗎？

```java
// 第一章的惡夢程式碼
public class DeviceController {
    public void controlDevice(String type, String brand, String action) {
        if (type.equals("light")) {
            if (brand.equals("philips")) {
                if (action.equals("on")) {
                    System.out.println("philips 智慧燈泡優雅點亮");
                } else if (action.equals("off")) {
                    // ...
                }
            } else if (brand.equals("xiaomi")) {
                // 又是一堆 if-else...
            }
            // ... 100+ 行的災難
        } else if (type.equals("fan")) {
            // ...
        }
    }
}
```

**問題清單：**
- 程式碼重複率極高
- 新增品牌要修改多處
- 難以測試
- 難以維護
- 違反多項設計原則

## 4.2 OOP 重構方案：完整架構

### 步驟 1：設計介面層次

```java
import java.util.*;

// 1. 基礎控制介面
interface Controllable {
    void powerOn();
    void powerOff();
    boolean isOn();
    String getDeviceInfo();
}

// 2. 燈具專屬介面
interface SmartLight extends Controllable {
    void setBrightness(int level);
    void setColorTemperature(int temp);
}

// 3. 風扇專屬介面
interface SmartFan extends Controllable {
    void setSpeed(int level);
}

// 4. 音響專屬介面
interface SmartSpeaker extends Controllable {
    void setVolume(int level);
    void play(String media);
    void pause();
}
```

### 步驟 1.5：引入抽象類別優化設計

```java
abstract class AbstractSmartDevice implements Controllable {
    protected String brand;
    protected boolean isOn = false;
    protected String deviceType;

    public AbstractSmartDevice(String brand, String deviceType) {
        this.brand = brand;
        this.deviceType = deviceType;
    }

    // 通用的開關邏輯 - 模板方法模式
    @Override
    public void powerOn() {
        if (!isOn) {
            isOn = true;
            System.out.println(getDeviceInfo() + " 正在啟動...");
            onPowerOn(); // 呼叫子類別特定邏輯
            System.out.println(getDeviceInfo() + " 已就緒");
        } else {
            System.out.println(getDeviceInfo() + " 已經是開啟狀態");
        }
    }

    @Override
    public void powerOff() {
        if (isOn) {
            isOn = false;
            System.out.println(getDeviceInfo() + " 正在關閉...");
            onPowerOff(); // 呼叫子類別特定邏輯
            System.out.println(getDeviceInfo() + " 已關閉");
        } else {
            System.out.println(getDeviceInfo() + " 已經是關閉狀態");
        }
    }

    @Override
    public boolean isOn() {
        return isOn;
    }

    @Override
    public String getDeviceInfo() {
        return brand + " (" + deviceType + ")";
    }

    // 抽象方法：子類別必須實作特定的開關邏輯
    protected abstract void onPowerOn();

    protected abstract void onPowerOff();

    // 通用工具方法
    protected void validateRange(int value, int min, int max, String paramName) {
        if (value < min || value > max) {
            throw new IllegalArgumentException(
                    paramName + " 範圍錯誤: " + value + " (應介於 " + min + "-" + max + " 之間)");
        }
    }

    protected void logAdjustment(String parameter, int value, String unit) {
        System.out.println(getDeviceInfo() + " " + parameter + "調整至 " + value + unit);
    }
}

/**
 * 智慧燈泡抽象基類
 * 提供燈泡共同的亮度和色溫功能
 */
abstract class AbstractSmartLight extends AbstractSmartDevice implements SmartLight {
    protected int brightness = 50;
    protected int colorTemp = 3000;

    public AbstractSmartLight(String brand) {
        super(brand, "智慧燈泡");
    }

    @Override
    public void setBrightness(int level) {
        if (!isOn) {
            System.out.println("請先開啟 " + getDeviceInfo());
            return;
        }

        try {
            validateRange(level, 1, 100, "亮度");
            brightness = level;
            logAdjustment("亮度", level, "%");
        } catch (IllegalArgumentException e) {
            System.out.println("錯誤: " + e.getMessage());
        }
    }

    @Override
    public void setColorTemperature(int temp) {
        if (!isOn) {
            System.out.println("請先開啟 " + getDeviceInfo());
            return;
        }

        try {
            validateRange(temp, 2700, 6500, "色溫");
            colorTemp = temp;
            logAdjustment("色溫", temp, "K");
        } catch (IllegalArgumentException e) {
            System.out.println("錯誤: " + e.getMessage());
        }
    }

    public int getBrightness() {
        return brightness;
    }

    public int getColorTemp() {
        return colorTemp;
    }
}


/**
 * 智慧風扇抽象基類
 */
abstract class AbstractSmartFan extends AbstractSmartDevice implements SmartFan {
    protected int speed = 1;
    protected int maxSpeed = 5;

    public AbstractSmartFan(String brand, int maxSpeed) {
        super(brand, "智慧風扇");
        this.maxSpeed = maxSpeed;
    }

    @Override
    public void setSpeed(int level) {
        if (!isOn) {
            System.out.println("請先開啟 " + getDeviceInfo());
            return;
        }

        try {
            validateRange(level, 1, maxSpeed, "風速");
            speed = level;
            logAdjustment("風速", level, " 檔");
            onSpeedChanged(level);
        } catch (IllegalArgumentException e) {
            System.out.println("錯誤: " + e.getMessage());
        }
    }

    protected void onSpeedChanged(int level) {
        // 預設實作：無特殊效果
    }

    public int getSpeed() {
        return speed;
    }

    public int getMaxSpeed() {
        return maxSpeed;
    }
}


/**
 * 智慧音響抽象基類
 */
abstract class AbstractSmartSpeaker extends AbstractSmartDevice implements SmartSpeaker {
    protected int volume = 50;
    protected boolean isPlaying = false;
    protected String currentMedia = "";

    public AbstractSmartSpeaker(String brand) {
        super(brand, "智慧音響");
    }

    @Override
    public void setVolume(int level) {
        try {
            validateRange(level, 0, 100, "音量");
            volume = level;
            logAdjustment("音量", level, "%");
        } catch (IllegalArgumentException e) {
            System.out.println("錯誤: " + e.getMessage());
        }
    }

    @Override
    public void play(String media) {
        if (!isOn) {
            System.out.println("請先開啟 " + getDeviceInfo());
            return;
        }

        currentMedia = media;
        isPlaying = true;
        System.out.println(getDeviceInfo() + " 播放: " + media);
    }

    @Override
    public void pause() {
        if (isPlaying) {
            isPlaying = false;
            System.out.println(getDeviceInfo() + " 暫停播放");
        } else {
            System.out.println(getDeviceInfo() + " 目前沒有在播放");
        }
    }

    @Override
    protected void onPowerOff() {
        if (isPlaying) {
            pause();
        }
    }

    public boolean isPlaying() {
        return isPlaying;
    }

    public String getCurrentMedia() {
        return currentMedia;
    }
}
```

### 步驟 2：實作各品牌設備

```java
/**
 * Philips 智慧燈泡
 * 繼承抽象基類，專注於品牌特色
 */
class PhilipsLight extends AbstractSmartLight {

    public PhilipsLight() {
        super("Philips");
    }

    @Override
    protected void onPowerOn() {
        System.out.println("Philips 專利光效算法啟動");
        System.out.println("柔和光線逐漸亮起，保護您的眼睛");
    }

    @Override
    protected void onPowerOff() {
        System.out.println("Philips 智慧調光，溫和淡出");
        System.out.println("進入節能待機模式");
    }
}

/**
 * 小米智慧燈泡 - 優雅重構版
 * 強調快速響應和智能化
 */
class XiaomiLight extends AbstractSmartLight {

    public XiaomiLight() {
        super("小米");
    }

    @Override
    protected void onPowerOn() {
        System.out.println("小米閃電啟動技術");
        System.out.println("AI 自動調節至最佳亮度");
    }

    @Override
    protected void onPowerOff() {
        System.out.println("小米智能關閉，可隨時手機喚醒");
        System.out.println("超低功耗待機");
    }
}

/**
 * IKEA 智慧燈泡
 */
class IkeaLight extends AbstractSmartLight {

    public IkeaLight() {
        super("IKEA");
    }

    @Override
    protected void onPowerOn() {
        System.out.println("IKEA 家居智能生態啟動");
        System.out.println("北歐簡約設計，溫馨照明");
    }

    @Override
    protected void onPowerOff() {
        System.out.println("IKEA 環保節能，自然熄滅");
    }
}


/**
 * Dyson 智慧風扇
 */
class DysonFan extends AbstractSmartFan {

    public DysonFan() {
        super("Dyson", 10); // Dyson 支援 10 檔風速
    }

    @Override
    protected void onPowerOn() {
        System.out.println("Dyson 氣流倍增技術啟動");
        System.out.println("空氣品質檢測中...");
        System.out.println("HEPA H13 濾網系統就緒");
    }

    @Override
    protected void onPowerOff() {
        System.out.println("Dyson 記錄本次使用數據");
        System.out.println("自動濾網保護模式");
    }

    @Override
    protected void onSpeedChanged(int level) {
        if (level <= 3) {
            System.out.println("Dyson 靜音模式：< 35dB 超靜音運行");
        } else if (level <= 6) {
            System.out.println("Dyson 標準模式：360° 環形送風");
        } else {
            System.out.println("Dyson 強力模式：最大 290L/s 風量輸出");
        }
    }
}

/**
 * Sony 智慧音響
 */
class SonySpeaker extends AbstractSmartSpeaker {

    public SonySpeaker() {
        super("Sony");
    }

    @Override
    protected void onPowerOn() {
        System.out.println("Sony EXTRA BASS 技術啟動");
        System.out.println("Hi-Res Audio 認證音質就緒");
        System.out.println("藍牙 5.0 連接穩定");
    }

    @Override
    protected void onPowerOff() {
        System.out.println("Sony 電池續航：剩餘 24 小時");
    }

}
```

### 步驟 3：建立智慧家庭控制系統

```java
/**
 * SmartHomeSystem：智慧家庭控制系統
 */
class SmartHomeSystem {
    private List<Controllable> allDevices = new ArrayList<>();
    private List<SmartLight> lights = new ArrayList<>();
    private List<SmartFan> fans = new ArrayList<>();
    private List<SmartSpeaker> speakers = new ArrayList<>();

    /**
     * 註冊設備：自動識別類型並加入對應清單
     */
    public void registerDevice(Controllable device) {
        allDevices.add(device);

        // 利用 instanceof 判斷設備類型
        if (device instanceof SmartLight) {
            lights.add((SmartLight) device);
        } else if (device instanceof SmartFan) {
            fans.add((SmartFan) device);
        } else if (device instanceof SmartSpeaker) {
            speakers.add((SmartSpeaker) device);
        }

        System.out.println("已註冊設備: " + device.getDeviceInfo());
    }

    /**
     * 場景模式 1：回家模式
     */
    public void executeHomeScene() {
        System.out.println("\n === 執行回家場景 ===");

        // 開啟所有燈具，亮度 70%
        for (SmartLight light : lights) {
            light.powerOn();
            light.setBrightness(70);
            light.setColorTemperature(3000);
        }

        // 開啟風扇，低速
        for (SmartFan fan : fans) {
            fan.powerOn();
            fan.setSpeed(1);
        }

        // 開啟音響，播放輕音樂
        for (SmartSpeaker speaker : speakers) {
            speaker.powerOn();
            speaker.setVolume(30);
            speaker.play("輕音樂播放清單");
        }
    }

    /**
     * 場景模式 2：睡眠模式
     */
    public void executeSleepScene() {
        System.out.println("=== 執行睡眠場景 ===");

        // 調暗所有燈具
        for (SmartLight light : lights) {
            light.setBrightness(10);
            light.setColorTemperature(2700);
        }

        // 關閉風扇
        for (SmartFan fan : fans) {
            fan.powerOff();
        }

        // 音響播放白噪音
        for (SmartSpeaker speaker : speakers) {
            speaker.setVolume(20);
            speaker.play("白噪音");
        }

        // 5 秒後關閉所有燈具
        System.out.println("5 秒後將關閉所有燈具...");
        for (SmartLight light : lights) {
            light.powerOff();
        }
    }

    /**
     * 場景模式 3：派對模式
     */
    public void executePartyScene() {
        System.out.println("=== 執行派對場景 ===");

        // 所有燈具全亮
        for (SmartLight light : lights) {
            light.powerOn();
            light.setBrightness(100);
            light.setColorTemperature(4000);
        }

        // 風扇強力運轉
        for (SmartFan fan : fans) {
            fan.powerOn();
            fan.setSpeed(3);
        }

        // 音響大聲播放
        for (SmartSpeaker speaker : speakers) {
            speaker.powerOn();
            speaker.setVolume(80);
            speaker.play("派對音樂");
        }
    }

    /**
     * 一鍵關閉所有設備
     */
    public void powerOffAll() {
        System.out.println("\n=== 關閉所有設備 ===");
        for (Controllable device : allDevices) {
            device.powerOff();
        }
    }

    /**
     * 顯示所有設備狀態
     */
    public void showAllDevicesStatus() {
        System.out.println("\n=== 設備狀態總覽 ===");
        for (Controllable device : allDevices) {
            String status = device.isOn() ? "開啟" : "關閉";
            System.out.println(device.getDeviceInfo() + ": " + status);
        }
    }
}
```

### 步驟 4：完整測試（展示抽象類別的優雅）

```java
public class SmartHomeDemo {
    public static void main(String[] args) {
        // 創建智慧家庭系統
        SmartHomeSystem home = new SmartHomeSystem();

        // 註冊各種設備 - 展示多型的威力
        System.out.println("=== 正在註冊設備 ===");
        home.registerDevice(new PhilipsLight());
        home.registerDevice(new XiaomiLight());
        home.registerDevice(new IkeaLight()); // 新品牌，零修改！
        home.registerDevice(new DysonFan());
        home.registerDevice(new SonySpeaker());

        // 顯示初始狀態
        home.showAllDevicesStatus();

        // 測試個別設備的優雅行為
        System.out.println("\n=== 測試設備特色功能 ===");
        testDeviceFeatures();

        // 測試場景模式
        home.executeHomeScene();
        home.showAllDevicesStatus();

        home.executePartyScene();
        home.showAllDevicesStatus();

        home.executeSleepScene();
        home.showAllDevicesStatus();

        // 一鍵關閉
        home.powerOffAll();
        home.showAllDevicesStatus();
    }

    /**
     * 展示抽象類別帶來的優雅行為
     */
    private static void testDeviceFeatures() {
        PhilipsLight philips = new PhilipsLight();
        XiaomiLight xiaomi = new XiaomiLight();
        DysonFan dyson = new DysonFan();

        // 展示統一的開關邏輯 + 品牌特色
        philips.powerOn();
        philips.setBrightness(90);
        philips.setColorTemperature(6000);

        System.out.println("\n" + "=".repeat(50));

        xiaomi.powerOn();
        xiaomi.setBrightness(100);
        xiaomi.setColorTemperature(2800);

        System.out.println("\n" + "=".repeat(50));

        dyson.powerOn();
        dyson.setSpeed(8);

        System.out.println("\n" + "=".repeat(50));

        // 測試錯誤處理
        System.out.println("=== 測試錯誤處理 ===");
        try {
            xiaomi.setBrightness(150); // 超出範圍
        } catch (Exception e) {
            // 抽象類別已處理，不會拋出異常
        }

        // 測試未開機狀態的保護機制
        XiaomiLight offLight = new XiaomiLight();
        offLight.setBrightness(50); // 應該提示先開機

        System.out.println("\n" + "=".repeat(50));

        // 清理
        philips.powerOff();
        xiaomi.powerOff();
        dyson.powerOff();
    }
}
```

### 抽象類別帶來的優雅效果

**1. 代碼重用率提升**
```java
// 之前：每個燈泡都要寫相同的驗證邏輯
public void setBrightness(int level) {
    if (level < 1 || level > 100) {
        System.out.println("亮度範圍錯誤...");
        return;
    }
    // 重複的邏輯...
}

// 現在：統一在抽象基類處理
public void setBrightness(int level) {
    validateRange(level, 1, 100, "亮度"); // 一行搞定！
    // 專注於品牌特色...
}
```

**2. 一致的用戶體驗**
```java
// 所有設備都有統一的開關行為
Philips Hue Pro (智慧燈泡) 正在啟動...
Philips 專利光效算法啟動
Philips Hue Pro (智慧燈泡) 已就緒

小米 智能彩光燈泡 (智慧燈泡) 正在啟動...
小米閃電啟動技術
小米 智能彩光燈泡 (智慧燈泡) 已就緒
```

**3. 強制的品質標準**
```java
// 抽象方法確保每個品牌都實作特定邏輯
protected abstract void onPowerOn();    // 必須實作
protected abstract void onPowerOff();   // 必須實作
```

**4. 易於擴展的架構**
```java
// 新增品牌只需專注於差異化特色
public class TeslaLight extends AbstractSmartLight {
    public TeslaLight() {
        super("Tesla", "Solar Light");
    }
    
    @Override
    protected void onPowerOn() {
        System.out.println("Tesla 太陽能充電技術");
        System.out.println("當前電量：95%（太陽能補充中）");
    }
    
    // 繼承所有驗證、錯誤處理、統一介面...
}
```

## 4.3 新增品牌：抽象類別讓擴展更優雅

現在公司簽下了新品牌，看看抽象類別讓擴展變得多麼簡單優雅：

```java
/**
 * Tesla 智慧燈泡 - 展示極簡擴展
 * 只需專注於品牌特色，其他都自動繼承！
 */
public class TeslaLight extends AbstractSmartLight {
    
    public TeslaLight() {
        super("Tesla", "Solar Smart Light");
    }
    
    @Override
    protected void onPowerOn() {
        System.out.println("Tesla 太陽能供電系統啟動");
        System.out.println("電池電量：98%（太陽能持續充電中）");
        System.out.println("Tesla AI 光線智能分析啟動");
    }
    
    @Override
    protected void onPowerOff() {
        System.out.println("Tesla 環保模式：多餘電力回饋電網");
        System.out.println("本次使用節省 CO2：0.2kg");
    }
}

/**
 * Apple HomePod 智慧音響 - 展示音響類別擴展
 */
public class AppleHomePod extends AbstractSmartSpeaker {
    
    public AppleHomePod() {
        super("Apple", "HomePod mini");
    }
    
    @Override
    protected void onPowerOn() {
        System.out.println("Apple H1 晶片啟動");
        System.out.println("空間音訊計算引擎就緒");
        System.out.println("HomeKit 安全連線建立");
    }
    
    @Override
    protected void onPowerOff() {
        System.out.println("Apple 端到端加密保護隱私");
        System.out.println("Siri 離線語音識別待機");
    }
    
    @Override
    protected void onVolumeChanged(int level) {
        System.out.println("Apple Adaptive EQ 自動調節");
        if (level > 75) {
            System.out.println("Apple 防失真技術：保持音質純淨");
        }
    }
    
    @Override
    protected void onPlayStarted(String media) {
        System.out.println("Apple Music 無損音質串流");
        System.out.println("Dolby Atmos 沉浸式音效啟動");
    }
}
```

**對比：抽象類別 vs 純介面實作**

| 特徵           | 純介面實作                | 抽象類別實作               |
| -------------- | ------------------------- | -------------------------- |
| **程式碼行數** | Tesla: ~60 行             | Tesla: ~25 行              |
| **重複邏輯**   | 每個類別都要寫驗證        | 統一在基類處理             |
| **錯誤處理**   | 各自實作，容易不一致      | 統一標準，品質保證         |
| **維護成本**   | 修改一個邏輯要改 N 個地方 | 修改基類，所有子類自動更新 |
| **學習成本**   | 新人要理解每個類別的邏輯  | 理解基類就懂 80%           |
| **測試成本**   | 每個類別都要寫完整測試    | 基類測試過，子類只測特色   |

**使用新品牌：**

```java
public class ExtensionDemo {
    public static void main(String[] args) {
        SmartHomeSystem home = new SmartHomeSystem();
        
        // 新品牌設備，完全不需要修改任何舊程式碼！
        home.registerDevice(new TeslaLight());
        home.registerDevice(new AppleHomePod());
        
        // 所有場景模式自動支援新品牌
        home.executeHomeScene();
        
        // 展示抽象類別的威力
        System.out.println("\n=== 展示統一的錯誤處理 ===");
        TeslaLight tesla = new TeslaLight();
        tesla.powerOn();
        
        // 抽象基類的驗證邏輯自動保護
        tesla.setBrightness(150);  // 自動提示錯誤
        tesla.setColorTemperature(1000);  // 自動提示錯誤
        
        // 正常使用
        tesla.setBrightness(80);   // 觸發 Tesla 特色邏輯
        tesla.setColorTemperature(5000);  // 觸發 Tesla 特色邏輯
    }
}
```

## 4.4 重構前後對比

### 真實案例對比

**場景：新增一個 Tesla 智慧燈泡**

**第一章方式：**
1. 在 `controlDevice` 方法裡新增 `else if (brand.equals("tesla"))` 區塊
2. 在 `setBrightness` 方法裡新增 `else if (brand.equals("tesla"))` 區塊
3. 在 `setColorTemperature` 方法裡新增 `else if (brand.equals("tesla"))` 區塊
4. 在 `showAllDevicesStatus` 方法裡新增處理邏輯
5. 測試時發現影響了其他品牌（耦合太高）
6. 花費時間：2-3 小時，還可能引入 bug

**OOP 方式：**
1. 新增一個 `TeslaLight.java` 檔案
2. 實作 `SmartLight` 介面
3. 完成！所有功能自動支援
4. 花費時間：10 分鐘，零風險

## 4.5 進階挑戰：作業題目

### 作業 1：線上購物車系統

**需求描述：**
設計一個線上購物車系統，支援不同類型的商品：
- 實體商品：需要計算運費
- 數位商品：無需運費，可立即下載
- 訂閱服務：按月計費，自動續約

每種商品有不同的計價方式和配送方式。

**提示：**
1. 設計一個 `Product` 介面
2. 可能需要 `Shippable`、`Downloadable` 等能力介面
3. 思考如何處理折扣、促銷等功能

### 作業 2：檔案處理系統

**需求描述：**
設計一個檔案處理系統，支援不同格式：
- 文字檔（.txt）：可讀取、寫入、搜尋
- 圖片檔（.jpg, .png）：可壓縮、調整大小
- 影片檔（.mp4）：可剪輯、加字幕

**提示：**
1. 設計 `FileHandler` 介面
2. 考慮 `Readable`、`Writable`、`Compressible` 等能力介面
3. 思考如何處理檔案驗證、錯誤處理

### 作業 3：遊戲角色系統

**需求描述：**
設計一個 RPG 遊戲的角色系統：
- 戰士：高血量、物理攻擊
- 法師：低血量、魔法攻擊
- 弓箭手：中血量、遠程攻擊

角色可以裝備不同武器，學習不同技能。

**提示：**
1. 設計 `Character` 介面或抽象類別
2. 考慮 `Attackable`、`Defendable`、`Healable` 等能力
3. 思考如何處理等級提升、技能學習

---

## 從混亂到秩序的旅程

我們經歷了：

1. **第一章：混亂體驗**
   - 感受到 if-else 地獄的痛苦
   - 理解為什麼需要更好的設計

2. **第二章：概念學習**
   - 理解 Class、Object、Interface 的本質
   - 掌握物件導向的基礎思維

3. **第三章：抽象理解**
   - 體會多型的強大威力
   - 學會用組合來解決複雜問題

4. **第四章：實戰應用**
   - 用 OOP 重構混亂的程式碼
   - 看到設計原則帶來的實際價值