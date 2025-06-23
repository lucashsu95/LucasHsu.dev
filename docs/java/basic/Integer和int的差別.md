---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Java int 和 Integer 差別, Java 基本型別, Java 包裝類別, Java autoboxing, Java unboxing, int null, Integer null, Java 集合, Java 型別選擇, Java 新手教學
  - - meta
    - name: og:title
      content: Java int 與 Integer 差異全解析｜基本型別與包裝類別比較、使用時機
  - - meta
    - name: og:description
      content: Java int 和 Integer 有什麼不同？本篇說明 int 與 Integer 的記憶體、null、方法、效能差異，介紹自動裝箱/拆箱，並給出實用範例與選用建議，幫助新手正確選擇型別。
  - - meta
    - name: og:type
      content: article
  - - meta
    - name: og:image
      content: ../assets/java-cover.png
---

# Integer 和 int 的差別

有差別！兩者是不同的資料類型：

### `int` (基本資料類型)
````java
int number = scanner.nextInt();
````
- **基本資料類型** (primitive type)
- 直接儲存數值
- 佔用 4 bytes 記憶體
- **不能為 null**
- 效能較好

### `Integer` (包裝類別)
````java
Integer number = scanner.nextInt();
````
- **物件類型** (wrapper class)
- 儲存物件參考
- 佔用更多記憶體 (物件標頭 + 4 bytes)
- **可以為 null**
- 提供額外的方法

## 自動裝箱/拆箱 (Autoboxing/Unboxing)

Java 會自動轉換：
````java
// 自動裝箱：int → Integer
Integer number = 5;           // 等同於 Integer.valueOf(5)
Integer number2 = scanner.nextInt(); // scanner.nextInt() 回傳 int，自動轉為 Integer

// 自動拆箱：Integer → int  
int value = number;           // 等同於 number.intValue()
````

## 實際差異範例

````java
// int 不能為 null
int num1 = null;              // ❌ 編譯錯誤

// Integer 可以為 null
Integer num2 = null;          // ✅ 正確
if (num2 == null) {
    System.out.println("沒有值");
}

// Integer 有額外方法
Integer num3 = 123;
String str = num3.toString(); // 轉為字串
int max = Integer.MAX_VALUE;  // 取得最大值
````

## 使用建議

- **一般計算**：使用 `int`（效能較好）
- **需要 null 值**：使用 `Integer`
- **集合類別**：必須使用 `Integer`（如 `List<Integer>`）
