---
theme: seriph
title: 後端群體驗營 Day2 — 訂單系統
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
  sans: Inter
  mono: JetBrains Mono
css: unocss
stylesheet: ./style.css
drawings:
  persist: true
  enabled: true
selectable: true
exportFilename: cb-day2-order-system
---

<div class="cover-glow"></div>
<div class="relative z-10 flex flex-col items-center justify-center h-full">
  <div v-motion :initial="{ y: -20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 200, duration: 500 } }" class="text-center">
    <img src="./birc.webp" class="h-16 mx-auto mb-3" alt="BIRC Logo" />
  </div>
  <h1 v-motion :initial="{ y: 30, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 350, duration: 500 } }" class="text-5xl font-bold text-center">
    <span class="text-[#3B82F6]">BIRC 商智中心</span>
  </h1>
  <p v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 500, duration: 500 } }" class="text-lg text-gray-400 mt-2 text-center">
    Business Intelligence Center — 推動校園數位人才培育
  </p>
  <p v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 1000, duration: 400 } }" class="mt-6 text-xs text-gray-600">
    2026 後端群體驗營
  </p>
</div>

---
layout: cover
transition: slide-left
---

<div class="cover-glow"></div>
<div class="relative z-10">
  <div v-motion :initial="{ y: -20, opacity: 0 }" :enter="{ y: 0, opacity: 1 }" class="kicker">$ java OrderSystem --mode interactive</div>
  <h1 v-motion :initial="{ y: 24, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 180 } }">
    <span class="text-[#3B82F6]">Backend</span> <span class="text-white">體驗營</span> <span class="text-[#10B981]">Day2</span>
  </h1>
  <p class="text-xl text-gray-300 mt-4 font-mono">// 訂單系統 — 從陣列到「真實世界的後端」</p>
  <div class="mt-14 grid grid-cols-3 gap-5 text-sm">
    <div class="concept-card blue"><b>平行陣列</b><br><span>組織多筆資料</span></div>
    <div class="concept-card green"><b>庫存判斷</b><br><span>避免超賣的關鍵</span></div>
    <div class="concept-card amber"><b>訂單邏輯</b><br><span>購物車的靈魂</span></div>
  </div>
</div>

---
layout: default
---

# 🔄 昨天回顧

<div class="grid grid-cols-2 gap-6 mt-6">
  <div class="p-5 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <h3 class="text-[#3B82F6] font-bold text-lg mb-3">🎯 Day 1 學了什麼</h3>
    <ul class="space-y-2 text-gray-300 text-sm">
      <li>✓ 變數 — 存東西的盒子</li>
      <li>✓ 條件判斷 — if/else 分支</li>
      <li>✓ 迴圈 — while 重複執行</li>
      <li>✓ Scanner — 讀取輸入</li>
    </ul>
  </div>
  <div class="p-5 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <h3 class="text-[#10B981] font-bold text-lg mb-3">💡 今天要做的事</h3>
    <ul class="space-y-2 text-gray-300 text-sm">
      <li>📦 用平行陣列存商品資料</li>
      <li>🛒 做一個超簡化的購物車</li>
      <li>📊 加入庫存判斷（避免超賣）</li>
    </ul>
  </div>
</div>

<div v-click class="callout mt-6">💡 <b>重點</b>：同樣的工具（變數、if/else、while、陣列），可以做出完全不同的東西！</div>

---
layout: default
---

# 📖 今天會遇到的新名詞

<div class="grid grid-cols-3 gap-4 mt-6">
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <b class="text-[#3B82F6] text-lg">變數</b>
    <p class="text-gray-300 text-sm mt-2">存東西的盒子，例如 <code>int stock = 10;</code></p>
  </div>
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <b class="text-[#10B981] text-lg">陣列</b>
    <p class="text-gray-300 text-sm mt-2">一排盒子，例如 <code>int[] prices = {30, 65};</code></p>
  </div>
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
    <b class="text-[#F59E0B] text-lg">資料庫</b>
    <p class="text-gray-300 text-sm mt-2">永久保存資料的地方，例如 SQLite</p>
  </div>
</div>

<div v-click class="grid grid-cols-3 gap-4 mt-4">
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <b class="text-[#3B82F6] text-lg">if / else</b>
    <p class="text-gray-300 text-sm mt-2">判斷條件，決定走哪條路</p>
  </div>
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <b class="text-[#10B981] text-lg">while 迴圈</b>
    <p class="text-gray-300 text-sm mt-2">重複執行，直到條件不滿足</p>
  </div>
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
    <b class="text-[#F59E0B] text-lg">SQL</b>
    <p class="text-gray-300 text-sm mt-2">和資料庫溝通的語言，例如 <code>SELECT * FROM products</code></p>
  </div>
</div>

---
layout: default
---

# 🎯 今日目標

<div class="mt-6 space-y-3">
  <div v-click class="flex items-center gap-4 p-4 rounded-lg bg-[#1E293B]">
    <span class="text-3xl">🛒</span>
    <div>
      <b class="text-[#3B82F6] text-lg">做出一個可互動的訂單系統</b>
      <p class="text-gray-400 mt-1">商品清單 + 選購 + 結帳</p>
    </div>
  </div>
  <div v-click class="flex items-center gap-4 p-4 rounded-lg bg-[#1E293B]">
    <span class="text-3xl">📦</span>
    <div>
      <b class="text-[#10B981] text-lg">理解「庫存扣減」的邏輯</b>
      <p class="text-gray-400 mt-1">買到剩 0 件就不能再買</p>
    </div>
  </div>
  <div v-click class="flex items-center gap-4 p-4 rounded-lg bg-[#1E293B]">
    <span class="text-3xl">🧠</span>
    <div>
      <b class="text-[#F59E0B] text-lg">把資料放進真正的資料庫</b>
      <p class="text-gray-400 mt-1">建立資料表 + 新增資料 + 查詢資料</p>
    </div>
  </div>
</div>

---
layout: default
---

# 🛒 購物車的靈魂

你點外送 App 按下「加入購物車」後，後端發生了什麼？

<div class="timeline mt-8">
  <div v-click class="time-node"><b>1. 讀取商品</b><br><span>從資料庫拿商品清單</span></div>
  <div v-click class="time-arrow">→</div>
  <div v-click class="time-node green"><b>2. 檢查庫存</b><br><span>還有貨嗎？</span></div>
  <div v-click class="time-arrow">→</div>
  <div v-click class="time-node amber"><b>3. 扣庫存</b><br><span>把它從架上拿掉</span></div>
  <div v-click class="time-arrow">→</div>
  <div v-click class="time-node"><b>4. 計算金額</b><br><span>加總所有商品</span></div>
</div>

<div v-click class="callout mt-8">🎯 <b>這些都是後端</b> — 你看不到，但它一直在運作</div>

<div class="mt-6 text-center">
  <a href="https://github.com/lucashsu95/day2-order-system" target="_blank" class="px-5 py-2 rounded-lg bg-[#3B82F6] text-white font-bold inline-block">
    📦 取得範例程式碼
  </a>
</div>

---
layout: default
class: scroll-y
---

# 📦 步驟一：陣列就是資料的容器

<div class="stage-badge mb-4">第一部 — 先用陣列保存商品資料</div>

```java {1-4|6-9|11-15|all}
import java.util.Scanner;

// 陣列：把多筆商品資料暫時放在程式記憶體裡
String[] products = {"可樂", "三明治", "薯條", "餅乾", "果汁"};
int[] prices = {30, 65, 45, 35, 40};

// 印出商品選單
for (int i = 0; i < products.length; i++) {
    System.out.println((i + 1) + ". " + products[i] + " → " + prices[i] + " 元");
}

// 讓使用者選購
Scanner scanner = new Scanner(System.in);
System.out.print("請輸入想買的商品編號 (1-" + products.length + ")：");
int choice = scanner.nextInt();

System.out.println("你選擇了：" + products[choice - 1]);
System.out.println("價格：" + prices[choice - 1] + " 元");
```

<div v-click class="grid grid-cols-2 gap-4 mt-4">
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <b class="text-[#3B82F6]">陣列在做什麼？</b>
    <p class="text-gray-300 text-sm mt-2">它就是目前存放商品資料的地方：名稱放在 `products`，價格放在 `prices`。</p>
  </div>
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
    <b class="text-[#F59E0B]">它的限制是什麼？</b>
    <p class="text-gray-300 text-sm mt-2">程式結束後資料就消失，而且資料筆數與查詢能力都有限。</p>
  </div>
</div>

---
layout: default
---

# 🔢 陣列索引 Index 是什麼？

<div class="stage-badge mb-4">Step 1.5 — 陣列的「門牌號碼」</div>

```java {1-2|4-8|9-13|all}
// 陣列的 index 從 0 開始！
String[] products = {"可樂", "三明治", "薯條", "餅乾", "果汁"};

//                      ↑        ↑          ↑        ↑        ↑
//    index:            0        1          2        3        4
//  products[0] = "cola"
//  products[1] = "sandwich"
//  products[4] = "juice"     ← 最後一個是 length - 1
```

<div v-click class="grid grid-cols-2 gap-4 mt-4">
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
    <b class="text-[#F59E0B]">⚠️ 常見錯誤</b>
    <p class="text-gray-300 text-sm mt-2">
      products[5] → <b class="text-red-400">ArrayIndexOutOfBoundsException</b><br>
      <span class="text-gray-400 text-xs">index 最大只能是 length - 1</span>
    </p>
  </div>
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <b class="text-[#10B981]">💡 為什麼從 0 開始？</b>
    <p class="text-gray-300 text-sm mt-2">
      index 代表「距離起點幾個位置」<br>
      <span class="text-gray-400 text-xs">第 1 個元素 = 距離起點 0 個位置</span>
    </p>
  </div>
</div>

---
layout: default
class: scroll-y
---

## 🛒 步驟二：多商品訂單

<div class="stage-badge mb-4">去查看範例程式碼的<code>Step2.java</code>邏輯</div>

```java
int totalAmount = 0; // 總金額
int orderCount = 0; // 買了幾個
try (Scanner scanner = new Scanner(System.in)) {
    while (true) {
        System.out.println("商品列表：");
        for (int i = 0; i < products.length; i++) {
            System.out.println((i + 1) + ". " + products[i] + " → " + prices[i] + " 元");
        }
        System.out.println("0. 結帳");
        System.out.print("請選擇商品編號：");
        int choice = scanner.nextInt();

        if (choice == 0) {
            break; // 結帳跳出迴圈
        }

        if (choice >= 1 && choice <= products.length) {
            System.out.print("買幾個？");
            int quantity = scanner.nextInt();
            int subtotal = prices[choice - 1] * quantity;
            totalAmount += subtotal;
            orderCount += quantity;
        }
    }
}

System.out.println("總共購買：" + orderCount + " 件");
System.out.println("總金額：" + totalAmount + " 元");
```

---
layout: default
---

# 🧠 迴圈的妙用

<div class="grid grid-cols-2 gap-6 mt-6">
  <div v-click class="p-5 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <h3 class="text-[#3B82F6] font-bold text-lg mb-3">🔄 while (true) 迴圈</h3>
    <ul class="space-y-2 text-gray-300 text-sm">
      <li>• 不斷顯示商品選單</li>
      <li>• 讓使用者可以一直買</li>
      <li>• 輸入 0 才跳出</li>
    </ul>
    <p class="text-[#10B981] text-xs mt-3">→ 這就是「購物車」的迴圈！</p>
  </div>
  <div v-click class="p-5 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <h3 class="text-[#10B981] font-bold text-lg mb-3">💰 累加金額</h3>
    <ul class="space-y-2 text-gray-300 text-sm">
      <li>• totalAmount += subtotal</li>
      <li>• 每買一個就加一次</li>
      <li>• 最後就是總金額</li>
    </ul>
    <p class="text-[#F59E0B] text-xs mt-3">→ 這就是「結帳」的計算！</p>
  </div>
</div>

<div v-click class="callout mt-6">💡 <b>重點</b>：迴圈讓使用者可以一直買，break 讓使用者可以結帳</div>

---
layout: default
---

# 📦 步驟三：庫存判斷（重點）

<div class="stage-badge mb-4">第一部 — 陣列裡也可以保存庫存</div>

```java {1|3-8|10-14|all}
int[] stock = {10, 5, 8, 12, 7};  // 庫存數量

// 檢查庫存
if (stock[index] == 0) {
    System.out.println("❌ " + products[index] + " 已售完，無法購買！");
    continue;  // 跳過這次，回到迴圈開頭
}
// 庫存不足
if (quantity > stock[index]) {
    System.out.println("❌ 庫存不足！只剩 " + stock[index] + " 個");
    continue;
}
// 扣庫存
stock[index] -= quantity;
```

---
layout: default
---

# 🚀 第二部開始：資料要保存在哪裡？

<div class="stage-badge mb-4">這一部要完成：把 Java 陣列換成 SQLite 資料庫</div>

<div class="grid grid-cols-3 gap-4 mt-8 items-center text-center">
  <div v-click class="concept-card blue">
    <div class="text-3xl mb-2">📦</div>
    <b class="text-[#3B82F6]">原本</b>
    <p class="text-gray-300 text-sm mt-2">商品資料在<br>Java 陣列裡</p>
  </div>
  <div v-click class="text-3xl text-[#F59E0B]">→</div>
  <div v-click class="concept-card green">
    <div class="text-3xl mb-2">🗄️</div>
    <b class="text-[#10B981]">這一部</b>
    <p class="text-gray-300 text-sm mt-2">Java 透過 JDBC<br>和 SQLite 溝通</p>
  </div>
</div>

<div v-click class="grid grid-cols-2 gap-5 mt-8">
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <b class="text-[#3B82F6]">我們要做什麼？</b>
    <p class="text-gray-300 text-sm mt-2">建立 `products` 資料表，放入商品名稱、價格與庫存，接著用 Java 讀取與修改資料。</p>
  </div>
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <b class="text-[#10B981]">怎麼溝通？</b>
    <p class="text-gray-300 text-sm mt-2">Java 撰寫 SQL，JDBC 負責傳送 SQL；SQLite 執行後保存結果。</p>
  </div>
</div>

<div v-click class="callout mt-6">🎯 先讓資料保存下來，下一部才有可能讓瀏覽器讀取和購買。</div>

---
layout: default
---

# 🚀 第二部：把資料換成資料庫

<div class="stage-badge mb-4">第二部 — 不換購物車邏輯，只換資料的來源</div>

<div class="grid grid-cols-3 gap-4 mt-6 text-center">
  <div class="concept-card blue">
    <div class="text-3xl mb-2">📦</div>
    <b class="text-[#3B82F6]">原本</b>
    <p class="text-gray-300 text-sm mt-2">資料放在 Java 陣列</p>
  </div>
  <div class="flex items-center justify-center text-3xl text-[#F59E0B]">→</div>
  <div class="concept-card green">
    <div class="text-3xl mb-2">🗄️</div>
    <b class="text-[#10B981]">現在</b>
    <p class="text-gray-300 text-sm mt-2">資料放在資料庫表格</p>
  </div>
</div>

<div v-click class="callout mt-6">🎯 商品名稱、價格、庫存這些「資料」不變；改變的是它們被保存、查詢的位置。</div>

---
layout: default
class: scroll-y
---

# 📁 第一部分會用到哪些檔案？

<div class="stage-badge mb-4">第一部 — 用 Java Array 完成互動式購買</div>

<div class="grid grid-cols-2 gap-6 mt-6">
  <div class="p-5 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <h3 class="text-[#3B82F6] font-bold text-lg mb-3">專案檔案</h3>
    <pre class="text-gray-300 text-sm">day2-order-system/
└─ BuyProductArray.java</pre>
  </div>
  <div class="p-5 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <h3 class="text-[#10B981] font-bold text-lg mb-3">資料存放的地方</h3>
    <div class="text-gray-300 text-sm space-y-2">
      <p>資料暫時保存在 Java 記憶體裡。</p>
    </div>
  </div>
</div>

<div class="mt-5 p-5 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
  <h3 class="text-[#F59E0B] font-bold text-lg mb-3">▶️ 如何啟動第一部分？</h3>
  <pre class="text-gray-300 text-sm">cd day2-order-system
javac BuyProductArray.java
java BuyProductArray</pre>
  <p class="text-gray-400 text-xs mt-3">輸入商品編號與數量完成購買；輸入 `0` 結束。程式關閉後，陣列庫存會消失。</p>
</div>

---
layout: default
---

# ✅ 檢查點 1

<div class="grid grid-cols-3 gap-4 mt-6">
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <b class="text-[#10B981] text-lg">✓ 我能說出</b>
    <ul class="text-gray-300 text-sm mt-2 space-y-1">
      <li>• 陣列是什麼？</li>
      <li>• index 從 0 開始</li>
      <li>• while 迴圈做什麼？</li>
    </ul>
  </div>
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
    <b class="text-[#F59E0B] text-lg">? 我還不太確定</b>
    <ul class="text-gray-300 text-sm mt-2 space-y-1">
      <li>• index 跟 length 的關係</li>
      <li>• break 跟 continue 的差別</li>
      <li>• 為什麼要 stock[index] -= 1</li>
    </ul>
  </div>
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <b class="text-[#3B82F6] text-lg">💡 馬上複習</b>
    <p class="text-gray-300 text-sm mt-2">回到前面的「迴圈的妙用」投影片，重新看一次程式碼流程。</p>
  </div>
</div>

---
layout: default
class: scroll-y
---

# 📁 第二部分會用到哪些檔案？

<div class="stage-badge mb-4">第二部 — 用 Java JDBC 操作 SQLite</div>

<div class="grid grid-cols-2 gap-6 mt-6">
  <div class="p-5 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <h3 class="text-[#3B82F6] font-bold text-lg mb-3">專案檔案</h3>
    <pre class="text-gray-300 text-sm">day2-order-system/
├─ BuyProduct.java
├─ products.db
└─ lib/
   └─ sqlite-jdbc-3.53.4.0.jar</pre>
  </div>
  <div class="p-5 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <h3 class="text-[#10B981] font-bold text-lg mb-3">每個檔案的用途</h3>
    <div class="text-gray-300 text-sm space-y-2">
      <p><b class="text-white">BuyProduct.java</b>：Java 購買程式</p>
      <p><b class="text-white">products.db</b>：第一次執行時自動建立，保存商品與庫存</p>
      <p><b class="text-white">sqlite-jdbc...</b>：讓 Java 能連線 SQLite</p>
    </div>
  </div>
</div>

<div class="mt-5 p-5 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
  <h3 class="text-[#F59E0B] font-bold text-lg mb-3">▶️ 如何啟動第二部分？</h3>
  <pre class="text-gray-300 text-sm">cd day2-order-system
javac -cp "lib/sqlite-jdbc-3.53.4.0.jar" BuyProduct.java
java -cp ".;lib/sqlite-jdbc-3.53.4.0.jar" BuyProduct</pre>
  <p class="text-gray-400 text-xs mt-3">程式會先自動建立資料表與商品資料，再執行購買；看到「購買成功！」後，用 SQLite Viewer 查看 stock 是否減少。</p>
</div>

---
layout: default
class: scroll-y
---

# 📖 JDBC 五兄弟小卡

<div class="grid grid-cols-3 gap-4 mt-4">
  <div v-click class="p-3 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <b class="text-[#3B82F6]">① Connection</b>
    <p class="text-gray-300 text-xs mt-1">建立資料庫連線，就像拿起電話</p>
  </div>
  <div v-click class="p-3 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <b class="text-[#10B981]">② PreparedStatement</b>
    <p class="text-gray-300 text-xs mt-1">準備好要問的問題（SQL）</p>
    <p class="text-gray-400 text-xs mt-1">`?` 是先留空格，再用 setInt() 安全填值</p>
  </div>
  <div v-click class="p-3 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
    <b class="text-[#F59E0B]">③ ResultSet</b>
    <p class="text-gray-300 text-xs mt-1">資料庫回答的結果</p>
  </div>
</div>

<div v-click class="grid grid-cols-2 gap-4 mt-4">
  <div class="p-3 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <b class="text-[#3B82F6]">④ executeQuery()</b>
    <p class="text-gray-300 text-xs mt-1">執行 SELECT，回傳 ResultSet</p>
  </div>
  <div class="p-3 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <b class="text-[#10B981]">⑤ executeUpdate()</b>
    <p class="text-gray-300 text-xs mt-1">執行 INSERT/UPDATE，回傳影響筆數</p>
  </div>
</div>

---
layout: default
---

# ✅ 檢查點 2

<div class="grid grid-cols-3 gap-4 mt-6">
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <b class="text-[#10B981] text-lg">✓ 我能說出</b>
    <ul class="text-gray-300 text-sm mt-2 space-y-1">
      <li>• JDBC 是什麼？</li>
      <li>• Connection / PreparedStatement / ResultSet</li>
      <li>• products.db 裡有哪些欄位？</li>
    </ul>
  </div>
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
    <b class="text-[#F59E0B] text-lg">? 我還不太確定</b>
    <ul class="text-gray-300 text-sm mt-2 space-y-1">
      <li>• executeQuery vs executeUpdate</li>
      <li>• 為什麼要 close()</li>
      <li>• SQL 語法怎麼寫？</li>
    </ul>
  </div>
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <b class="text-[#3B82F6] text-lg">💡 馬上複習</b>
    <p class="text-gray-300 text-sm mt-2">回到前面的「JDBC 五兄弟小卡」，重新看一次每個物件的用途。</p>
  </div>
</div>

---
layout: default
---

# 🧰 用 VS Code 看資料庫

<div class="stage-badge mb-4">Step 2.2 — 安裝 SQLite Viewer，直接看資料</div>

<div class="grid grid-cols-2 gap-6 mt-5">
  <div class="p-5 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <h3 class="text-[#3B82F6] font-bold text-lg mb-3">安裝套件</h3>
    <ol class="space-y-2 text-gray-300 text-sm">
      <li>1. 開啟 VS Code 的 Extensions</li>
      <li>2. 搜尋 <b>SQLite Viewer</b></li>
      <li>3. 安裝作者為 <b>qwtel</b> 的套件</li>
    </ol>
    <p class="text-gray-400 text-xs mt-4">也可以在終端機執行：</p>
    <pre style="font-size: 12px" class="text-gray-300 mt-2">code --install-extension qwtel.sqlite-viewer</pre>
  </div>
  <div class="p-5 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <h3 class="text-[#10B981] font-bold text-lg mb-3">打開資料</h3>
    <ol class="space-y-2 text-gray-300 text-sm">
      <li>在 VS Code 開啟 `products.db`</li>
      <li>點選資料表 `products`</li>
      <li>直接看到欄位和每一筆資料</li>
    </ol>
    <p class="text-[#10B981] text-xs mt-4">這就是資料庫裡真正保存的資料。</p>
  </div>
</div>

<div v-click class="callout mt-6">💡 Java JDBC 負責連線並執行 SQL；SQLite Viewer 負責讓我們用表格畫面觀察資料。</div>

---
layout: default
class: scroll-y
---

# ☕ Java 連線 SQLite 完成互動式購買

<div class="stage-badge mb-4">Step 2.5 — 列出全部商品，讓使用者選購</div>

```java {1-4|6-12|14-25|all}
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Scanner;

public class BuyProduct {
  public static void main(String[] args) throws Exception {
    initializeDatabase();
    try (Connection connection = DriverManager.getConnection("jdbc:sqlite:products.db");
        Scanner scanner = new Scanner(System.in)) {
      while (true) {
        printProducts(connection);
        System.out.print("請輸入商品 id（輸入 0 結束）：");
        int productId = scanner.nextInt();
        if (productId == 0) break;

        System.out.print("請輸入購買數量：");
        int quantity = scanner.nextInt();
        buyProduct(connection, productId, quantity);
      }
    }
  }
}
```

<div v-click class="grid grid-cols-2 gap-5 mt-4">
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30 text-sm">
    <b class="text-[#3B82F6]">這個版本先學會</b>
    <p class="text-gray-300 mt-2">列出全部商品，讓使用者選擇商品與購買數量。</p>
  </div>
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30 text-sm">
    <b class="text-[#10B981]">下一步</b>
    <p class="text-gray-300 mt-2">把 Scanner 輸入改成前端傳入的 API 請求。</p>
  </div>
</div>

<div v-click class="mt-5 p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
  <b class="text-[#F59E0B]">▶️ 如何啟動</b>
  <pre class="text-gray-300 text-sm mt-3">cd day2-order-system
javac -cp "lib/sqlite-jdbc-3.53.4.0.jar" BuyProduct.java
java -cp ".:lib/sqlite-jdbc-3.53.4.0.jar" BuyProduct</pre>
  <p class="text-gray-400 text-xs mt-2">輸入商品 id 與數量完成購買；輸入 `0` 結束，再用 SQLite Viewer 查看 stock。</p>
</div>

---
layout: default
class: scroll-y
---

# 📁 第三部分會用到哪些檔案？

<div class="stage-badge mb-4">第三部 — 用 Java API 串接瀏覽器前端</div>

<div class="grid grid-cols-2 gap-6 mt-6">
  <div class="p-5 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <h3 class="text-[#3B82F6] font-bold text-lg mb-3">專案檔案</h3>
    <pre class="text-gray-300 text-sm">day2-order-system/
├─ BuyProductApi.java
├─ shop.html
├─ products.db
└─ lib/
   └─ sqlite-jdbc-3.53.4.0.jar</pre>
  </div>
  <div class="p-5 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <h3 class="text-[#10B981] font-bold text-lg mb-3">每個檔案的用途</h3>
    <div class="text-gray-300 text-sm space-y-2">
      <p><b class="text-white">BuyProductApi.java</b>：提供商品與購買 API</p>
      <p><b class="text-white">shop.html</b>：瀏覽器看到的購物頁面</p>
      <p><b class="text-white">products.db</b>：保存商品與庫存</p>
      <p><b class="text-white">sqlite-jdbc...</b>：讓 API 連線 SQLite</p>
    </div>
  </div>
</div>

<div class="mt-5 p-5 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
  <h3 class="text-[#F59E0B] font-bold text-lg mb-3">▶️ 如何啟動第三部分？</h3>
  <pre class="text-gray-300 text-sm">cd day2-order-system
javac -cp "lib/sqlite-jdbc-3.53.4.0.jar" BuyProductApi.java
java -cp ".:lib/sqlite-jdbc-3.53.4.0.jar" BuyProductApi</pre>
  <p class="text-gray-400 text-xs mt-3">看到 `http://localhost:8080` 後，用瀏覽器開啟網址操作購物頁面。</p>
</div>

---
layout: default
class: scroll-y
---

# 🌐 第三部開始：讓瀏覽器加入進來

<div class="stage-badge mb-4">這一部要完成：用 `shop.html` 操作 Java API</div>

<div class="grid grid-cols-5 gap-3 mt-7 items-center text-center">
  <div class="concept-card blue">
    <div class="text-3xl mb-2">🖥️</div>
    <b class="text-[#3B82F6]">shop.html</b>
    <p class="text-gray-300 text-sm mt-2">顯示商品<br>送出數量</p>
  </div>
  <div class="text-2xl text-[#F59E0B]">→</div>
  <div class="concept-card amber">
    <div class="text-3xl mb-2">⚙️</div>
    <b class="text-[#F59E0B]">Java API</b>
    <p class="text-gray-300 text-sm mt-2">接收請求<br>回傳 JSON</p>
  </div>
  <div class="text-2xl text-[#F59E0B]">→</div>
  <div class="concept-card green">
    <div class="text-3xl mb-2">🗄️</div>
    <b class="text-[#10B981]">SQLite</b>
    <p class="text-gray-300 text-sm mt-2">查詢商品<br>更新庫存</p>
  </div>
</div>

<div class="grid grid-cols-2 gap-5 mt-7">
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <b class="text-[#3B82F6]">shop.html 做什麼？</b>
    <p class="text-gray-300 text-sm mt-2">它是瀏覽器看到的購物頁面，用 JavaScript 呼叫 API，顯示商品、庫存與購買結果。</p>
  </div>
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
    <b class="text-[#F59E0B]">前端怎麼溝通？</b>
    <p class="text-gray-300 text-sm mt-2"><code>GET /api/products</code> 取得商品；<code>POST /api/buy</code> 送出商品編號與數量。</p>
  </div>
</div>

<div class="callout mt-6">🎯 瀏覽器不直接連 SQLite；它只和 Java API 溝通，API 再透過 JDBC 操作資料庫。</div>

---
layout: default
class: scroll-y
---

# 🚀 第三部：Java API 串接前端

<div class="stage-badge mb-4">Step 3.1 — 把命令列程式變成前端可以呼叫的 API</div>

<div class="grid grid-cols-3 gap-4 mt-6 text-center">
  <div class="concept-card blue"><b class="text-[#3B82F6]">前端</b><p class="text-gray-300 text-sm mt-2">送出<br><code>productId</code>、<code>quantity</code></p></div>
  <div class="concept-card amber"><b class="text-[#F59E0B]">Java API</b><p class="text-gray-300 text-sm mt-2">接收請求<br>執行 JDBC</p></div>
  <div class="concept-card green"><b class="text-[#10B981]">SQLite</b><p class="text-gray-300 text-sm mt-2">檢查庫存<br>扣除數量</p></div>
</div>

<div class="callout mt-5">💡 API 版本只是把原本的 JDBC 邏輯包在 HTTP 請求裡，資料庫操作本身沒有消失。</div>

---
layout: default
class: scroll-y
---

# 🚀 第三部：Java API 串接前端 — 程式碼

<div class="stage-badge mb-4">Step 3.1 — 把命令列程式變成前端可以呼叫的 API</div>

```java {1-4|6-9|11-20|all}
// BuyProductApi.java
// 🔵 這段是 HTTP 伺服器的固定寫法，先照抄，重點看下面的 SQL
server.createContext("/api/products", BuyProductApi::handleProducts);
server.createContext("/api/buy", BuyProductApi::handleBuy);

private static void handleBuy(HttpExchange exchange) throws IOException {
  Map<String, String> form = parseForm(requestBody(exchange));
  int productId = Integer.parseInt(form.get("productId"));
  int quantity = Integer.parseInt(form.get("quantity"));

  String updateSql = "UPDATE products SET stock = stock - ? "
      + "WHERE id = ? AND stock >= ?";

  try (Connection connection = DriverManager.getConnection("jdbc:sqlite:products.db");
      PreparedStatement statement = connection.prepareStatement(updateSql)) {
    statement.setInt(1, quantity);
    statement.setInt(2, productId);
    statement.setInt(3, quantity);
    sendJson(exchange, statement.executeUpdate() == 1 ? 200 : 409,
        "{\"message\":\"購買完成\"}");
  }
}
```

---
layout: default
class: scroll-y
---

# 💻 這些指令在做什麼？

<div class="grid grid-cols-2 gap-5 mt-5">
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <b class="text-[#3B82F6] text-lg">javac — 編譯</b>
    <p class="text-gray-300 text-sm mt-2">把人類看得懂的 .java 變成機器看得懂的 .class</p>
    <pre class="text-gray-300 text-[11px] mt-2">javac -cp "lib/sqlite-jdbc-3.53.4.0.jar" BuyProductApi.java</pre>
    <p class="text-gray-400 text-xs mt-1">`-cp` 告訴編譯器去哪裡找 JDBC 套件</p>
  </div>
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <b class="text-[#10B981] text-lg">java — 執行</b>
    <p class="text-gray-300 text-sm mt-2">把編譯好的 .class 跑起來</p>
    <pre class="text-gray-300 text-[11px] mt-2">java -cp ".:lib/sqlite-jdbc-3.53.4.0.jar" BuyProductApi</pre>
    <p class="text-gray-400 text-xs mt-1">`.:lib/...` 表示同時在目前目錄和 lib 資料夾找</p>
  </div>
</div>

---
layout: default
class: scroll-y
---

# ▶️ 啟動後端與前端

<div class="stage-badge mb-4">Step 3.2 — 編譯 API、啟動伺服器、開啟瀏覽器</div>

<div class="grid grid-cols-2 gap-5 mt-4">
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <b class="text-[#3B82F6]">先確認資料夾</b>
    <pre class="text-gray-300 mt-2">day2-order-system/
├─ BuyProduct.java
├─ BuyProductApi.java
├─ shop.html
├─ products.db
└─ lib/
  └─ sqlite-jdbc-3.53.4.0.jar</pre>
    <p class="text-gray-400 text-xs mt-2">請在 `day2-order-system/` 資料夾開啟終端機。</p>
  </div>
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <b class="text-[#10B981]">執行順序</b>
    <ol class="text-gray-300 text-sm mt-2 space-y-1">
      <li>先編譯：產生 `BuyProduct.class`</li>
      <li>再執行：啟動 API 與前端伺服器</li>
      <li>瀏覽器開啟 `http://localhost:8080`</li>
    </ol>
  </div>
</div>

<div class="mt-4">
  <b class="text-[#3B82F6]">macOS / Linux</b>
</div>

```bash
# 1. 編譯簡單 JDBC 版本
javac -cp "lib/sqlite-jdbc-3.53.4.0.jar" BuyProduct.java

# 2. 編譯 API 版本
javac -cp "lib/sqlite-jdbc-3.53.4.0.jar" BuyProductApi.java

# 3. 執行：啟動 Java API 與 shop.html
java -cp ".:lib/sqlite-jdbc-3.53.4.0.jar" BuyProductApi

# 4. 開啟瀏覽器
open http://localhost:8080
```

<div class="mt-4">
  <b class="text-[#F59E0B]">Windows</b>
</div>

```powershell
# Windows 只需把 classpath 分隔符號改成 ;
javac -cp "lib\sqlite-jdbc-3.53.4.0.jar" BuyProduct.java
javac -cp "lib\sqlite-jdbc-3.53.4.0.jar" BuyProductApi.java
java -cp ".;lib\sqlite-jdbc-3.53.4.0.jar" BuyProductApi
```

<div class="callout mt-4">💡 看到「購物前端：http://localhost:8080」後，開啟瀏覽器即可購買商品；購買成功會即時刷新庫存。</div>

---
layout: default
---

# 🛒 用瀏覽器完成購買

<div class="stage-badge mb-4">Step 3.3 — 前端串接 BuyProduct API</div>

<div class="grid grid-cols-3 gap-4 mt-6 text-center">
  <div class="concept-card blue">
    <div class="text-3xl mb-2">📋</div>
    <b class="text-[#3B82F6]">讀取商品</b>
    <p class="text-gray-300 text-sm mt-2">前端呼叫<br><code>GET /api/products</code></p>
  </div>
  <div class="concept-card amber">
    <div class="text-3xl mb-2">🛍️</div>
    <b class="text-[#F59E0B]">送出訂單</b>
    <p class="text-gray-300 text-sm mt-2">輸入數量後呼叫<br><code>POST /api/buy</code></p>
  </div>
  <div class="concept-card green">
    <div class="text-3xl mb-2">📦</div>
    <b class="text-[#10B981]">更新庫存</b>
    <p class="text-gray-300 text-sm mt-2">Java 執行 SQL<br>前端重新載入商品</p>
  </div>
</div>

<div class="callout mt-8">🎯 瀏覽器不直接碰 SQLite：前端呼叫 Java API，Java 再透過 JDBC 操作資料庫。</div>

---
layout: default
---

# 🔁 從陣列到資料庫，再到前端

<div class="grid grid-cols-5 gap-3 mt-8 items-center text-center">
  <div class="concept-card blue">
    <div class="text-3xl mb-2">🖥️</div>
    <b class="text-[#3B82F6]">前端</b>
    <p class="text-gray-300 text-sm mt-2">商品列表<br>輸入購買數量</p>
  </div>
  <div class="text-3xl text-[#F59E0B]">→</div>
  <div class="concept-card amber">
    <div class="text-3xl mb-2">⚙️</div>
    <b class="text-[#F59E0B]">Java API</b>
    <p class="text-gray-300 text-sm mt-2">接收請求<br>檢查庫存</p>
  </div>
  <div class="text-3xl text-[#F59E0B]">→</div>
  <div class="concept-card green">
    <div class="text-3xl mb-2">🗄️</div>
    <b class="text-[#10B981]">SQLite</b>
    <p class="text-gray-300 text-sm mt-2">扣除庫存<br>保存資料</p>
  </div>
</div>

<div class="grid grid-cols-2 gap-4 mt-6">
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30 text-sm">
    <b class="text-[#10B981]">購買成功</b>
    <p class="text-gray-300 mt-2">SQLite 更新 stock，Java API 回傳結果，前端重新載入商品。</p>
  </div>
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30 text-sm">
    <b class="text-[#F59E0B]">庫存不足</b>
    <p class="text-gray-300 mt-2">資料庫不執行扣除，API 回傳錯誤，前端顯示提示。</p>
  </div>
</div>

<div class="callout mt-6">💡 陣列是起點；真正的訂單系統，還需要前端、API 與資料庫一起合作。</div>

---
layout: default
---

# ✅ 檢查點 3

<div class="grid grid-cols-3 gap-4 mt-6">
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <b class="text-[#10B981] text-lg">✓ 我能說出</b>
    <ul class="text-gray-300 text-sm mt-2 space-y-1">
      <li>• 前端、API、資料庫的角色</li>
      <li>• javac 跟 java 的差別</li>
      <li>• 什麼是 HTTP 請求？</li>
    </ul>
  </div>
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
    <b class="text-[#F59E0B] text-lg">? 我還不太確定</b>
    <ul class="text-gray-300 text-sm mt-2 space-y-1">
      <li>• API 端點是什麼？</li>
      <li>• -cp 參數為什麼要寫？</li>
      <li>• JSON 格式是什麼？</li>
    </ul>
  </div>
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <b class="text-[#3B82F6] text-lg">💡 馬上複習</b>
    <p class="text-gray-300 text-sm mt-2">回到「這些指令在做什麼」投影片，重新看一次每個指令的用途。</p>
  </div>
</div>

---
layout: center
class: text-center
---

<div v-motion :initial="{ scale: 0.8, opacity: 0 }" :enter="{ scale: 1, opacity: 1, transition: { duration: 500 } }" class="text-6xl mb-6">🎉</div>

<h1 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 200, duration: 500 } }" class="text-4xl font-bold mb-4">
  <span class="text-[#3B82F6]">恭喜！</span>
</h1>

<p v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 400, duration: 500 } }" class="text-lg text-gray-300 mb-6">
  你今天做出了一個會動的訂單系統
</p>

<p v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 600, duration: 500 } }" class="text-xl text-gray-400 mb-8">
  這就是後端的真實面貌
</p>

<p v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 1200, duration: 400 } }" class="mt-8 text-sm text-gray-600">
  LucasHsu.dev — 2026 商智中心後端群體驗營
</p>
