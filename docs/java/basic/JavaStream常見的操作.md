---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: java-stream, java-stream-教學, java-stream-範例, java-stream-操作, java-stream-用法, java-list-stream, java-集合操作, java-8-stream, java-stream-filter, java-stream-map, java-stream-collect, java-stream-常見錯誤
  - - meta
    - name: og:title
      content: Day02 - Java Stream-常見操作與用法總整理
  - - meta
    - name: og:description
      content: Java Stream-怎麼用？本篇整理 Java Stream-最常見的操作與範例，包含 filter、map、collect、reduce、distinct、sorted 等方法，並說明 Stream-特性與常見注意事項，幫助你快速上手 Java 8-函數式寫法。
  - - meta
    - name: og:type
      content: article
  - - meta
    - name: og:image
      content: ../assets/java-cover.png
---

# Java Steam

Java 的 `Stream` 是 Java 8 引入的一個強大工具，可以讓你更簡潔地操作集合資料（像 `List`, `Set` 等），類似 Python 的串列推導式或函數式操作。

以下是 Java Stream 最常見的操作整理（附範例）：

## 🔹 基本結構

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
list.stream()
    .filter(x -> x % 2 == 0)
    .map(x -> x * 10)
    .forEach(System.out::println);
```


## ✅ 常見操作總表（分類 + 範例）

### 🔸 1. 建立 Stream

```java
Stream.of(1, 2, 3);
Arrays.asList(1, 2, 3).stream();
IntStream.range(1, 5);  // 1, 2, 3, 4
```

---

### 🔸 2. `filter`：過濾元素

```java
list.stream().filter(x -> x > 3);
```

---

### 🔸 3. `map`：轉換元素

```java
list.stream().map(x -> x * 2);
```

---

### 🔸 4. `forEach`：對每個元素做事（終端操作）

```java
list.stream().forEach(System.out::println);
```

---

### 🔸 5. `collect`：收集成 List / Set / Map

```java
List<Integer> even = list.stream()
                         .filter(x -> x % 2 == 0)
                         .collect(Collectors.toList());
```

---

### 🔸 6. `reduce`：歸納（加總、乘積、累積）

```java
int sum = list.stream().reduce(0, (a, b) -> a + b);
```

---

### 🔸 7. `sorted`：排序（可加比較器）

```java
list.stream().sorted();
list.stream().sorted(Comparator.reverseOrder());
```

---

### 🔸 8. `distinct`：去重

```java
list.stream().distinct();
```

---

### 🔸 9. `limit` / `skip`：取前幾個 / 跳過前幾個

```java
list.stream().limit(3); // 取前三個
list.stream().skip(2);  // 跳過前兩個
```

---

### 🔸 10. `anyMatch` / `allMatch` / `noneMatch`：條件判斷

```java
list.stream().anyMatch(x -> x > 3);    // 是否有任何一個 > 3
list.stream().allMatch(x -> x > 0);    // 是否全部都 > 0
list.stream().noneMatch(x -> x < 0);   // 是否沒有 < 0 的
```

---

### 🔸 11. `findFirst` / `findAny`：取得第一個 / 任意一個

```java
Optional<Integer> first = list.stream().findFirst();
Optional<Integer> any = list.stream().findAny();
```

---

### 🔸 12. `count`：統計數量

```java
long count = list.stream().filter(x -> x % 2 == 0).count();
```

---

## 🎁 Bonus：轉成 Map

```java
Map<String, Integer> map = list.stream()
    .collect(Collectors.toMap(
        x -> "key" + x,
        x -> x * x
    ));
```

---

## 📌 小提醒

* Stream 只能使用一次（終端操作後就不能再用）
* Stream 不會改變原本的集合（除非你手動處理）
