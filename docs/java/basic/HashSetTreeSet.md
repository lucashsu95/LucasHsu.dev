---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: java, hashset, treeset, set, 集合, 資料結構, 哈希表, 紅黑樹, java教學, 程式設計, 效能比較, 排序
  - - meta
    - name: description
      content: 深入比較Java HashSet與TreeSet的特性差異、效能表現和使用場景。完整教學包含程式範例、時間複雜度分析，幫助你選擇最適合的Set集合實作。
  - - meta
    - name: og:title
      content: Java HashSet vs TreeSet 完整比較教學 | Set集合選擇指南
  - - meta
    - name: og:description
      content: 深入比較Java HashSet與TreeSet的特性差異、效能表現和使用場景。完整教學包含程式範例、時間複雜度分析，幫助你選擇最適合的Set集合實作。
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
      content: Java HashSet vs TreeSet 完整比較教學 | Set集合選擇指南
  - - meta
    - name: twitter:description
      content: 深入比較Java HashSet與TreeSet的特性差異、效能表現和使用場景。完整教學包含程式範例、時間複雜度分析。
---

# Java HashSet vs TreeSet 比較指南

## 什麼是 Java Set？

Set 是一個不允許重複元素的集合，類似一個只收納獨特物品的魔法箱。與 List 不同，Set 沒有索引，無法通過位置存取元素，只能檢查元素是否存在。

Set 的核心特性：
- **沒有索引**，無法使用 `get(index)` 方法
- 專注於元素的**存在性檢查**而非位置
- **不允許重複元素**，自動去重
- **無序性**（除非是有序的實作如 TreeSet）

## HashSet 特性

HashSet 是一個「快速但無序」的集合實作。

### 主要特點
- **無序**：元素順序無法預測，不保證插入順序
- **高效能**：基於哈希表實作，平均時間複雜度 O(1)
- **允許 null**：可以儲存一個 null 元素

### 程式碼範例

```java
import java.util.HashSet;
import java.util.Set;

public class HashSetExample {
    public static void main(String[] args) {
        Set<String> cities = new HashSet<>();
        
        // 添加元素
        cities.add("台北");
        cities.add("高雄");
        cities.add("台中");
        cities.add("台北"); // 重複元素會被忽略
        
        System.out.println("HashSet: " + cities);
        // 可能輸出: [台中, 台北, 高雄] (順序隨機)
        
        Set<Integer> numbers = new HashSet<>();
        numbers.add(30);
        numbers.add(10);
        numbers.add(20);
        
        System.out.println("數字: " + numbers);
        // 可能輸出: [20, 10, 30] (順序隨機)
    }
}
```

## TreeSet 特性

TreeSet 是一個「自動排序」的集合實作。

### 主要特點
- **自動排序**：元素會按照自然順序或自訂規則排序
- **有序**：維持元素的排序順序
- **不允許 null**：加入 null 會拋出 NullPointerException
- **較慢**：基於紅黑樹實作，時間複雜度 O(log n)

### 程式碼範例

```java
import java.util.Set;
import java.util.TreeSet;

public class TreeSetExample {
    public static void main(String[] args) {
        Set<String> cities = new TreeSet<>();
        
        // 添加元素
        cities.add("台北");
        cities.add("高雄");
        cities.add("台中");
        cities.add("台北"); // 重複元素會被忽略
        
        System.out.println("TreeSet: " + cities);
        // 輸出: [台中, 台北, 高雄] (按字典順序排序)
        
        Set<Integer> numbers = new TreeSet<>();
        numbers.add(30);
        numbers.add(10);
        numbers.add(20);
        
        System.out.println("數字: " + numbers);
        // 輸出: [10, 20, 30] (按數字大小排序)
    }
}
```

### TreeSet 範圍查詢範例

```java
// 範例：維護有序的分數列表
Set<Integer> scores = new TreeSet<>();
scores.add(85);
scores.add(92);
scores.add(78);

System.out.println("排序後的分數: " + scores);
// 輸出: [78, 85, 92]

// TreeSet 提供的範圍查詢方法
TreeSet<Integer> scoreSet = (TreeSet<Integer>) scores;
System.out.println("80分以上: " + scoreSet.tailSet(80));
// 輸出: [85, 92]
```

## 詳細比較

### 效能分析

$O(\log n)$ 可以理解為，當集合中的元素數量 $n$ 增加時，所需時間的增長速度非常緩慢。

我們可以這樣理解：HashSet的極致速度來自於它對元素存放位置的「直接映射」，而TreeSet的速度稍慢，是因為它必須從樹的根節點開始，不斷地與其他元素進行比較，才能找到正確的插入或尋找位置。這是一種效能與功能的權衡取捨：TreeSet犧牲了一點點速度，來換取自動排序這個強大功能 。   

4.4 特殊元素：null 元素可以放嗎？
HashSet：HashSet允許儲存一個null元素 。   

TreeSet：TreeSet則不允許儲存null元素，如果你嘗試加入，程式會立即拋出NullPointerException（空指針異常） 。   

這個看似簡單的差異，其實是由TreeSet的底層排序機制所決定的。由於TreeSet需要對所有元素進行比較（透過compareTo()方法），而null值無法進行任何比較，因此為了避免程式錯誤，它從一開始就禁止了null元素的加入 。   

4.5 獨一無二的秘訣：怎麼判斷兩個元素是重複的？
Set 集合的共同特性是元素不重複，但 HashSet 和 TreeSet 對「重複」的定義不同：

**HashSet** 使用 `hashCode()` 和 `equals()` 方法判斷重複：
- 如果兩個元素的哈希值和內容都相等，HashSet 認為它們重複

**TreeSet** 使用 `compareTo()` 方法判斷重複：
- 如果 `compareTo()` 返回 0，TreeSet 認為元素相等，即使其他方面不同

> ⚠️ **注意**：在 TreeSet 中儲存自定義物件時，必須確保 `compareTo()` 方法邏輯嚴謹，正確定義「唯一性」。例如，如果只根據學生總分排序，相同分數的不同學生會被視為重複而只保留一個。

### 核心差異對照表

| 特徵          | HashSet              | TreeSet                  |
| ------------- | -------------------- | ------------------------ |
| 排序          | 無序                 | 自動排序（自然或自訂）   |
| 底層結構      | 哈希表（Hash Table） | 紅黑樹（Red-Black Tree） |
| 操作效率      | 平均 O(1)            | O(log n)                 |
| 是否允許 null | 允許（一個）         | 不允許                   |
## 應用場景選擇

選擇依據：效能優先選 HashSet，排序需求選 TreeSet。

| 應用情境                                           | 推薦    | 理由                                                                   |
| -------------------------------------------------- | ------- | ---------------------------------------------------------------------- |
| 快速去重與檢查<br>記錄遊戲成就ID、統計網頁訪問者IP | HashSet | 只需快速確認資料存在性和唯一性，HashSet 的極致效能是最佳選擇           |
| 排序或範圍查詢<br>學生成績排名、維護字母順序名單   | TreeSet | 需要自動排序功能和範圍查詢（如找出90分以上學生），TreeSet 提供這些功能 | **簡而言之**： |
- 不關心資料順序，只希望快速存取 → **HashSet**
- 需要自動排序集合，即使犧牲效能 → **TreeSet**

## 總結

HashSet 和 TreeSet 都遵循 Set 集合的「不儲存重複元素」核心原則，但實現方式大不相同：

- **HashSet**：追求極致速度的「無序」魔法箱
- **TreeSet**：能自動分類排序的「有序」圖書館書架  
- **LinkedHashSet**：結合 HashSet 速度和插入順序維護的折中方案

程式設計沒有萬能工具，只有最適合當下情境的選擇。根據對這兩者特性的理解，在面對去重或組織資料問題時，就能做出明智的決策。