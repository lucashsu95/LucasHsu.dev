---
theme: seriph
title: Java — Array 與 List 完整比較
layout: cover
ui:
  nav: false
transition: slide-left
mdc: true
comark: true
download: true
lineNumbers: true
routerMode: hash
colorSchema: dark
fonts:
  sans: "Inter"
  mono: "JetBrains Mono"
css: unocss
stylesheet: ./style.css
drawings:
  persist: true
  enabled: true
  presenterOnly: false
selectable: true
record: user
seoMeta:
  ogImage: https://lucashsu95.github.io/LucasHsu.dev/images/java-cover.webp
  ogTitle: Java — Array 與 List 完整比較
  description: 深入比較 Java Array 與 List 的差異、使用時機與效能分析
exportFilename: java-array-list
---

<div
  v-motion
  :initial="{ opacity: 0, scale: 0.9 }"
  :enter="{ opacity: 1, scale: 1, transition: { duration: 600 } }"
  class="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#0d1117] to-[#1a2332]"
></div>

<div class="relative z-10">
  <div
    v-motion
    :initial="{ y: -20, opacity: 0 }"
    :enter="{ y: 0, opacity: 1, transition: { delay: 200, duration: 500 } }"
    class="font-mono text-sm text-[#7ee787] opacity-70 mb-6"
  >
    <span class="text-gray-500">$</span> javac ArrayVsList.java && java ArrayVsList
  </div>

  <h1
    v-motion
    :initial="{ y: 30, opacity: 0 }"
    :enter="{ y: 0, opacity: 1, transition: { delay: 350, duration: 500 } }"
    class="text-5xl font-bold"
  >
    <span class="text-[#5382A1]">Array</span> <span class="text-white">與</span> <span class="text-[#E76F00]">List</span>
  </h1>

  <p
    v-motion
    :initial="{ y: 30, opacity: 0 }"
    :enter="{ y: 0, opacity: 1, transition: { delay: 500, duration: 500 } }"
    class="text-xl text-gray-300 mt-4 font-mono"
  >
    <span class="text-gray-500">//</span> 陣列 vs 列表 — 從基礎到進階
  </p>

  <div
    v-motion
    :initial="{ y: 30, opacity: 0 }"
    :enter="{ y: 0, opacity: 1, transition: { delay: 700, duration: 500 } }"
    class="mt-16 grid grid-cols-2 gap-6 font-mono text-sm"
  >
    <div class="p-4 border border-[#5382A1]/30 rounded-lg">
      <span class="text-[#5382A1]">int[] arr</span> <span class="text-gray-600">→ 固定大小</span>
    </div>
    <div class="p-4 border border-[#E76F00]/30 rounded-lg">
      <span class="text-[#E76F00]">List&lt;T&gt;</span> <span class="text-gray-600">→ 動態調整</span>
    </div>
  </div>

  <div
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { delay: 1000, duration: 400 } }"
    class="mt-8 flex items-center gap-3 font-mono text-xs text-gray-600"
  >
    <carbon-location class="text-[#5382A1]" />
    <span>LucasHsu.dev — 2026</span>
    <carbon-time class="ml-4 text-[#E76F00]" />
    <span>約 40 分鐘</span>
  </div>
</div>

---
layout: default
hideInToc: true
---

<div class="font-mono text-xs text-gray-500 mb-4">
  <span class="text-[#7ee787]">$</span> cat agenda.md
</div>

# 今日大綱

<Toc maxDepth="1" />

<div v-click class="mt-6 p-4 bg-gradient-to-r from-[#5382A1]/10 to-transparent rounded-lg border border-[#5382A1]/30 text-sm">
  <span class="font-bold text-[#5382A1]">💡 學習路線</span><br/>
  先懂基本語法 → 比較差異 → 深入底層機制 → 學會選擇
</div>

---
layout: section
transition: fade
---

<div class="font-mono text-[#E76F00] text-sm mb-2">PART 01</div>

# Array（陣列）

<p class="text-gray-400 text-lg font-mono mt-2">最基本的資料結構</p>

---

# Array 基本使用

```java {1-3|5-8|10|all}
// 宣告並初始化的幾種方式
int[] numbers1 = new int[5];
int[] numbers2 = {1, 2, 3, 4, 5};
int[] numbers3 = new int[]{1, 2, 3, 4, 5};

// 存取元素
numbers1[0] = 10;
numbers1[1] = 20;
System.out.println(numbers1[0]); // 10

// 取得長度
System.out.println(numbers2.length); // 5
```

<div v-click class="mt-4 grid grid-cols-4 gap-3">

<div class="p-3 rounded border border-[#5382A1]/40 text-center text-xs">
  <div class="font-bold text-[#5382A1]">固定大小</div>
  創建後不可變
</div>
<div class="p-3 rounded border border-[#5382A1]/40 text-center text-xs">
  <div class="font-bold text-[#5382A1]">型別安全</div>
  同型別元素
</div>
<div class="p-3 rounded border border-[#5382A1]/40 text-center text-xs">
  <div class="font-bold text-[#5382A1]">索引存取</div>
  array[index]
</div>
<div class="p-3 rounded border border-[#5382A1]/40 text-center text-xs">
  <div class="font-bold text-[#5382A1]">高效能</div>
  連續記憶體
</div>

</div>

---
layout: section
transition: fade
---

<div class="font-mono text-[#E76F00] text-sm mb-2">PART 02</div>

# List（列表）

<p class="text-gray-400 text-lg font-mono mt-2">集合框架的動態陣列</p>

---

# List 基本使用

```java {1-4|6-10|12-16|all}
import java.util.ArrayList;
import java.util.List;

List<Integer> numbers = new ArrayList<>();
List<String> names = new ArrayList<>();

numbers.add(10);
numbers.add(20);
names.add("Alice");

System.out.println(numbers.get(0)); // 10
numbers.set(0, 100);
numbers.remove(1);
System.out.println(numbers.size());
```

<div v-click class="mt-4 grid grid-cols-4 gap-3">

<div class="p-3 rounded border border-[#E76F00]/40 text-center text-xs">
  <div class="font-bold text-[#E76F00]">動態大小</div>
  隨時增減
</div>
<div class="p-3 rounded border border-[#E76F00]/40 text-center text-xs">
  <div class="font-bold text-[#E76F00]">豐富方法</div>
  add/remove/contains
</div>
<div class="p-3 rounded border border-[#E76F00]/40 text-center text-xs">
  <div class="font-bold text-[#E76F00]">泛型支援</div>
  List&lt;T&gt;
</div>
<div class="p-3 rounded border border-[#E76F00]/40 text-center text-xs">
  <div class="font-bold text-[#E76F00]">只存物件</div>
  需包裝類別
</div>

</div>

---
layout: section
transition: fade
---

<div class="font-mono text-[#E76F00] text-sm mb-2">PART 03</div>

# 基本差異對照

<p class="text-gray-400 text-lg font-mono mt-2">一張表看懂兩者</p>

---

# Array vs List

| 特性 | Array | List |
| ---- | ----- | ---- |
| 大小 | 固定不變 | 動態調整 |
| 語法 | `array[index]` | `list.get(index)` |
| 添加 | ❌ 不支援 | `list.add()` |
| 刪除 | ❌ 不支援 | `list.remove()` |
| 長度 | `array.length` | `list.size()` |
| 基本型別 | ✅ 直接支援 | 需包裝類別 |

<div v-click class="mt-6">

<ArrayListPlayground />

</div>

---
layout: section
transition: fade
---

<div class="font-mono text-[#E76F00] text-sm mb-2">PART 04</div>

# 深入比較

<p class="text-gray-400 text-lg font-mono mt-2">固定尺寸 vs 動態尺寸</p>

---
layout: two-cols
layoutClass: gap-8
---

# Array 記憶體管理

宣告時就指定大小，記憶體連續分配：

```java
String[] array = new String[3];
array[0] = "A";
array[1] = "B";
array[2] = "C";
// array[3] = "D"; ← 越界！
```

<div v-click class="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-sm">
⚠️ <code>ArrayIndexOutOfBoundsException</code>
</div>

::right::

# List 動態擴展

空間不足時自動建立更大的陣列並複製：

```java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");
list.add("D"); // ✅ 沒問題
```

<div v-click class="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded text-sm">
⚡ 擴展時有複製開銷，但使用上很方便
</div>

---

# 效能比較

| 特性 | Array | List (ArrayList) |
| ---- | ----- | ---------------- |
| 尺寸 | 固定 | 動態 |
| 隨機存取 | O(1) 極快 | O(1) 快 |
| 記憶體 | 靜態分配 | 動態分配（有複製） |
| 插入/刪除 | 不支援 | 中間操作 O(n) |

<div v-click class="mt-4 p-3 bg-[#5382A1]/10 border border-[#5382A1]/30 rounded text-sm">
💡 隨機存取兩者都快；List 的代價在於動態擴展與中間插入/刪除
</div>

---
layout: section
transition: fade
---

<div class="font-mono text-[#E76F00] text-sm mb-2">PART 05</div>

# 元素型別

<p class="text-gray-400 text-lg font-mono mt-2">基本型別 vs 物件</p>

---
layout: two-cols
layoutClass: gap-8
---

# Array — 直接支援基本型別

```java
int[] intArray = new int[3];
intArray[0] = 10;  // 直接存 int

String[] strArray = new String[3];
strArray[0] = "Hello";
```

<div v-click class="mt-4 p-3 bg-[#5382A1]/10 border border-[#5382A1]/30 rounded text-sm">
✅ 記憶體中直接存數值，非常高效
</div>

::right::

# List — 只能存放物件

```java
List<Integer> intList = new ArrayList<>();
intList.add(10);  // Autoboxing: int → Integer

int value = intList.get(0); // Unboxing
```

<div v-click class="mt-4 p-3 bg-[#E76F00]/10 border border-[#E76F00]/30 rounded text-sm">
📦 自動裝箱/拆箱有微小開銷，但程式碼更簡潔
</div>

---
layout: section
transition: fade
---

<div class="font-mono text-[#E76F00] text-sm mb-2">PART 06</div>

# 泛型與型別擦除

<p class="text-gray-400 text-lg font-mono mt-2">進階型別系統概念</p>

---
layout: two-cols
layoutClass: gap-8
---

# List 的泛型

```java
List<String> strList = new ArrayList<>();
List<Integer> intList = new ArrayList<>();

// 執行時期型別擦除
strList.getClass() == intList.getClass(); // true
```

<div v-click class="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded text-sm">
泛型只在<b>編譯時期</b>有效，執行時被擦除
</div>

::right::

# Array 保留型別

```java
String[] strArray = new String[5];
Integer[] intArray = new Integer[5];

strArray.getClass() == intArray.getClass(); // false
```

<div v-click class="mt-4 p-3 bg-[#5382A1]/10 border border-[#5382A1]/30 rounded text-sm">
Array 在<b>執行時期</b>保留元素型別資訊
</div>

---
layout: section
transition: fade
---

<div class="font-mono text-[#E76F00] text-sm mb-2">PART 07</div>

# 如何選擇？

<p class="text-gray-400 text-lg font-mono mt-2">實際應用場景</p>

---
layout: two-cols
layoutClass: gap-8
---

# 使用 Array 的時機

<div v-click="1" class="space-y-2 text-sm">
  <div class="p-2 rounded border border-[#5382A1]/30">✅ 資料大小固定且已知</div>
  <div class="p-2 rounded border border-[#5382A1]/30">✅ 需要最高存取效能</div>
  <div class="p-2 rounded border border-[#5382A1]/30">✅ 使用基本型別節省記憶體</div>
  <div class="p-2 rounded border border-[#5382A1]/30">✅ 多維陣列數學計算</div>
</div>

```java
// 3x3 棋盤
char[][] board = new char[3][3];
board[1][1] = 'X';
```

::right::

# 使用 List 的時機

<div v-click="1" class="space-y-2 text-sm">
  <div class="p-2 rounded border border-[#E76F00]/30">✅ 資料大小會動態變化</div>
  <div class="p-2 rounded border border-[#E76F00]/30">✅ 經常插入或刪除元素</div>
  <div class="p-2 rounded border border-[#E76F00]/30">✅ 需要集合框架方法</div>
  <div class="p-2 rounded border border-[#E76F00]/30">✅ 可讀性與維護性優先</div>
</div>

```java
List<String> users = new ArrayList<>();
users.add("user1");
users.remove("user1");
```

---

# 實際範例

::code-group

```java [Array — 固定考試成績]
int[] examScores = new int[4];
examScores[0] = 85;
examScores[1] = 92;
examScores[2] = 78;
examScores[3] = 96;

int total = 0;
for (int score : examScores) {
    total += score;
}
double avg = (double) total / examScores.length;
```

```java [List — 動態購物清單]
List<String> items = new ArrayList<>();
items.add("牛奶");
items.add("麵包");
items.remove("麵包");
items.add("雞蛋");

for (String item : items) {
    System.out.println("- " + item);
}
```

::

---

# 今日重點回顧

<div class="grid grid-cols-2 gap-4 mt-4">

<div class="p-4 rounded-lg border border-[#5382A1]/40">
  <div class="font-bold text-[#5382A1] mb-2">Array</div>
  <ul class="text-sm text-gray-400 space-y-1">
    <li>固定大小、連續記憶體</li>
    <li>支援基本型別</li>
    <li>array[index]、.length</li>
    <li>效能極佳的隨機存取</li>
  </ul>
</div>

<div class="p-4 rounded-lg border border-[#E76F00]/40">
  <div class="font-bold text-[#E76F00] mb-2">List</div>
  <ul class="text-sm text-gray-400 space-y-1">
    <li>動態大小、自動擴展</li>
    <li>只能存物件（Autoboxing）</li>
    <li>get/set/add/remove、.size()</li>
    <li>集合框架豐富 API</li>
  </ul>
</div>

</div>

<div v-click class="mt-6 p-4 bg-gradient-to-r from-[#5382A1]/10 to-[#E76F00]/10 rounded-lg border border-gray-700 text-sm text-center">
沒有絕對的「比較好」— 根據<b>資料特性</b>和<b>使用場景</b>選擇
</div>

---
layout: end
class: text-center
---

# 謝謝！

<p class="text-gray-400 mt-4">延伸閱讀：Java Stream、HashSet/TreeSet</p>

<div class="mt-8 font-mono text-sm text-gray-600">
  <span class="text-[#7ee787]">$</span> java --collections-framework
</div>
