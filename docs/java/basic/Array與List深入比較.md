---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: java, array, list, arraylist, 陣列, 列表, 資料結構, java教學, 程式設計, 集合框架
  - - meta
    - name: description
      content: 深入比較Java Array與List的差異、使用時機與效能分析。完整教學包含基礎語法、實作範例和選擇指南，適合Java初學者到進階開發者。
  - - meta
    - name: og:title
      content: Java Array 與 List 完整比較教學 | 陣列 vs 列表深度解析
  - - meta
    - name: og:description
      content: 深入比較Java Array與List的差異、使用時機與效能分析。完整教學包含基礎語法、實作範例和選擇指南，適合Java初學者到進階開發者。
  - - meta
    - name: og:type
      content: article
  - - meta
    - name: og:image
      content: ../assets/java-cover.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Java Array 與 List 完整比較教學 | 陣列 vs 列表深度解析
  - - meta
    - name: twitter:description
      content: 深入比較Java Array與List的差異、使用時機與效能分析。完整教學包含基礎語法、實作範例和選擇指南。
---

# Java Array 與 List 完整教學

在 Java 程式設計中，Array（陣列）和 List（列表）是兩種最常用的資料結構。本篇文章將從基礎開始，帶你完整了解它們的使用方式、差異以及應用場景。

## 什麼是 Array（陣列）？

Array 是 Java 中最基本的資料結構之一，用來儲存相同類型的多個元素。它在記憶體中佔據連續的空間，每個元素都可以通過索引來存取。

### Array 的基本使用

```java
// 宣告並初始化陣列的幾種方式
int[] numbers1 = new int[5];           // 創建長度為 5 的整數陣列
int[] numbers2 = {1, 2, 3, 4, 5};      // 直接初始化
int[] numbers3 = new int[]{1, 2, 3, 4, 5}; // 另一種初始化方式

// 存取陣列元素
numbers1[0] = 10; // 設定第一個元素
numbers1[1] = 20; // 設定第二個元素

// 讀取陣列元素
System.out.println(numbers1[0]); // 輸出: 10
System.out.println(numbers2[2]); // 輸出: 3

// 取得陣列長度
System.out.println(numbers2.length); // 輸出: 5
```

### Array 的特點

- **固定大小**：一旦創建，大小就無法改變
- **型別安全**：只能儲存同一種資料型別
- **索引存取**：使用 `array[index]` 的方式存取
- **高效能**：直接記憶體存取，速度很快

## 什麼是 List（列表）？

List 是 Java 集合框架中的一個介面，提供了動態陣列的功能。最常用的實作類別是 `ArrayList`。

### List 的基本使用

```java
import java.util.ArrayList;
import java.util.List;

// 創建 List 的幾種方式
List<Integer> numbers1 = new ArrayList<>();
List<String> names = new ArrayList<>();
List<Integer> numbers2 = new ArrayList<>(List.of(1, 2, 3, 4, 5));

// 添加元素
numbers1.add(10);
numbers1.add(20);
names.add("Alice");
names.add("Bob");

// 存取元素
System.out.println(numbers1.get(0)); // 輸出: 10
System.out.println(names.get(1));    // 輸出: Bob

// 修改元素
numbers1.set(0, 100); // 將索引 0 的元素改為 100

// 刪除元素
numbers1.remove(1); // 刪除索引 1 的元素
names.remove("Alice"); // 直接刪除指定值

// 取得大小
System.out.println(numbers1.size()); // 輸出當前元素數量
```

### List 的特點

- **動態大小**：可以隨時增加或減少元素
- **豐富的方法**：提供多種操作方法（add, remove, contains 等）
- **泛型支援**：使用 `<>` 指定元素類型
- **只能儲存物件**：不能直接儲存基本資料型別

## Array vs List 基本差異

| 特性      | Array          | List                 |
| --------- | -------------- | -------------------- |
| 大小      | 固定不變       | 動態調整             |
| 語法      | `array[index]` | `list.get(index)`    |
| 添加元素  | 不支援         | `list.add(element)`  |
| 刪除元素  | 不支援         | `list.remove(index)` |
| 長度/大小 | `array.length` | `list.size()`        |
| 基本型別  | 直接支援       | 需要包裝類別         |

## 實際應用範例

### 使用 Array 的情況

```java
// 適合用 Array：已知固定數量的資料
public class StudentGrades {
    public static void main(String[] args) {
        // 學期有固定的 4 次考試
        int[] examScores = new int[4];
        examScores[0] = 85;
        examScores[1] = 92;
        examScores[2] = 78;
        examScores[3] = 96;
        
        // 計算平均分數
        int total = 0;
        for (int i = 0; i < examScores.length; i++) {
            total += examScores[i];
        }
        double average = (double) total / examScores.length;
        System.out.println("平均分數: " + average);
    }
}
```

### 使用 List 的情況

```java
// 適合用 List：不確定數量的資料
import java.util.ArrayList;
import java.util.List;

public class ShoppingList {
    public static void main(String[] args) {
        List<String> items = new ArrayList<>();
        
        // 動態添加購物項目
        items.add("牛奶");
        items.add("麵包");
        items.add("蘋果");
        
        // 可能會改變主意，刪除某些項目
        items.remove("麵包");
        
        // 又想到要買的東西
        items.add("雞蛋");
        items.add("起司");
        
        // 列印購物清單
        System.out.println("購物清單:");
        for (String item : items) {
            System.out.println("- " + item);
        }
        
        System.out.println("總共 " + items.size() + " 項商品");
    }
}
```

## Array 與 List 的深入比較

當你掌握了基本用法後，讓我們深入探討它們的底層機制和進階差異。

## 1. 核心差異：固定尺寸 vs. 動態尺寸

這是所有其他差異的根源。

### Array（陣列）的記憶體管理
在宣告時就必須指定大小，且之後無法改變。這使得陣列在記憶體中是一塊連續的、預先分配好的空間，因此它的存取速度極快，因為電腦可以直接透過索引計算出元素的記憶體位置。

```java
// 陣列宣告後大小固定為3
String[] array = new String[3]; 
array[0] = "A";
array[1] = "B";
array[2] = "C";

// 試圖添加第四個元素會導致索引越界錯誤 (ArrayIndexOutOfBoundsException)
// array[3] = "D";
```

### List（列表）的動態擴展
ArrayList 是最常見的 List 實現，它是一個可變動長度的陣列。當你不斷 add() 新元素，而底層陣列空間不足時，ArrayList 會自動創建一個更大的新陣列，並將所有舊元素複製過去。這個過程雖然方便，但會產生額外的效能開銷。

```java
import java.util.ArrayList;
import java.util.List;

// 列表宣告後可以動態添加元素
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");
list.add("D"); // 可以輕鬆添加新元素
```

### 效能比較表格

| 特性      | Array (陣列)             | List (列表, 尤其是ArrayList)         |
| --------- | ------------------------ | ------------------------------------ |
| 尺寸      | 固定，宣告時決定         | 動態，可隨時增加或移除               |
| 效能      | 隨機存取極快 (O(1))      | 隨機存取快 (O(1))                    |
| 記憶體    | 靜態分配，無額外開銷     | 動態分配，有記憶體開銷 (因複製)      |
| 插入/刪除 | 不支援，需手動創建新陣列 | 方便，但中間插入/刪除效能較差 (O(n)) |

## 2. 元素型別：基本型別 vs. 物件

### Array（陣列）- 直接支援基本型別
可以直接存放基本型別 (primitive types)，例如 int、double、char。這使得陣列非常高效，因為它直接在記憶體中儲存數值，而不是物件參考。

```java
// 陣列可以直接存放基本型別 int
int[] intArray = new int[3];
intArray[0] = 10;
intArray[1] = 20;
intArray[2] = 30;

// 也可以存放物件
String[] stringArray = new String[3];
stringArray[0] = "Hello";
stringArray[1] = "World";
```

### List（列表）- 只能存放物件
只能存放物件，不能直接存放基本型別。這就是為什麼需要使用包裝類別（如 Integer、Double）。這個過程稱為自動裝箱 (Autoboxing)，會將基本型別自動包裝成對應的物件。

```java
import java.util.ArrayList;
import java.util.List;

// 列表使用泛型來指定元素類型
List<Integer> intList = new ArrayList<>();
intList.add(10); // 這裡發生了 Autoboxing (int -> Integer)
intList.add(20);

List<String> stringList = new ArrayList<>();
stringList.add("Hello");
stringList.add("World");

// 取出時也會發生 Unboxing (Integer -> int)
int value = intList.get(0); // 自動轉換為 int
```

## 3. 泛型與型別擦除 (Generics & Type Erasure)

這是較為進階的概念，但對理解 Java 的型別系統很重要。

### List（列表）的泛型特性
List 支援泛型 (`List<String>`)，這是一個強大的特性，可以在編譯時期確保型別安全。然而，泛型只在編譯時期有效，在執行時期會被型別擦除 (Type Erasure)。

```java
List<String> strList = new ArrayList<>();
List<Integer> intList = new ArrayList<>();

// 在編譯時期，兩者是不同型別；但在執行時期，它們都被擦除為 List
System.out.println(strList.getClass() == intList.getClass()); // 輸出 true
```

### Array（陣列）的型別保留
在執行時期保留了其元素型別的資訊。`String[]` 和 `Integer[]` 是完全不同的型別。

```java
String[] strArray = new String[5];
Integer[] intArray = new Integer[5];

// 在執行時期，兩者是不同型別
System.out.println(strArray.getClass() == intArray.getClass()); // 輸出 false
System.out.println(strArray.getClass().getName()); // 輸出: [Ljava.lang.String;
System.out.println(intArray.getClass().getName()); // 輸出: [Ljava.lang.Integer;
```

## 如何選擇使用 Array 或 List？

### 使用 Array 的時機
- 資料大小固定且已知
- 需要最高的存取效能
- 需要使用基本型別以節省記憶體
- 多維陣列的數學計算

```java
// 範例：表示 3x3 的棋盤
char[][] chessBoard = new char[3][3];
chessBoard[1][1] = 'X';
```

### 使用 List 的時機
- 資料大小會動態變化
- 需要經常插入或刪除元素
- 需要使用集合框架的豐富方法
- 程式碼的可讀性和維護性更重要

```java
// 範例：管理動態的使用者清單
List<String> activeUsers = new ArrayList<>();
activeUsers.add("user1");
activeUsers.add("user2");
// 使用者離線時可以輕鬆移除
activeUsers.remove("user1");
```
