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
  <div v-motion :initial="{ y: 30, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 700, duration: 500 } }" class="mt-8 flex gap-4 text-center text-sm">
    <div class="px-4 py-3 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
      <b class="text-[#3B82F6]">🏆 全國競賽獲獎</b>
    </div>
    <div class="px-4 py-3 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
      <b class="text-[#10B981]">🤝 業師輔導</b>
    </div>
    <div class="px-4 py-3 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
      <b class="text-[#F59E0B]">🚀 專案實作</b>
    </div>
  </div>
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
  <div v-click class="p-5 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <h3 class="text-[#3B82F6] font-bold text-lg mb-3">🎯 Day 1 學了什麼</h3>
    <ul class="space-y-2 text-gray-300 text-sm">
      <li>✓ 變數 — 存東西的盒子</li>
      <li>✓ 條件判斷 — if/else 分支</li>
      <li>✓ 迴圈 — while 重複執行</li>
      <li>✓ Scanner — 讀取輸入</li>
    </ul>
  </div>
  <div v-click class="p-5 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
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
      <b class="text-[#F59E0B] text-lg">看見「陣列 → 資料庫」的關聯</b>
      <p class="text-gray-400 mt-1">購物車</p>
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

---
layout: default
---

# 📦 步驟一：商品清單

<div class="stage-badge mb-4">Phase 1 — 用平行陣列存商品資料</div>

```java {1-3|5-8|10-12|all}
// 平行陣列：同 index 對應同一個商品
String[] products = {"cola", "sandwich", "chips", "cookie", "juice"};
int[] prices = {30, 65, 45, 35, 40};

// 印出商品選單
for (int i = 0; i < products.length; i++) {
    System.out.println((i + 1) + ". " + products[i] + " → " + prices[i] + " 元");
}

// 讓使用者選購
System.out.print("請輸入想買的商品編號 (1-" + products.length + ")：");
int choice = scanner.nextInt();
```

<div v-click class="callout mt-4">💡 <b>平行陣列</b>：兩個陣列長度相同，同一個 index 對應同一個商品</div>

---
layout: default
---

# 🔢 陣列索引 Index 是什麼？

<div class="stage-badge mb-4">Step 1.5 — 陣列的「門牌號碼」</div>

```java {1-2|4-8|9-13|all}
// 陣列的 index 從 0 開始！
String[] products = {"cola", "sandwich", "chips", "cookie", "juice"};

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
---

# 🧠 你剛剛用了什麼？

<div class="grid grid-cols-3 gap-4 mt-6">
  <div v-click class="concept-card blue text-center">
    <div class="text-3xl mb-2">📦</div>
    <b class="text-[#3B82F6]">平行陣列</b>
    <p class="text-gray-400 text-xs mt-1">products + prices</p>
    <span>同一 index = 同一商品</span>
  </div>
  <div v-click class="concept-card green text-center">
    <div class="text-3xl mb-2">🔄</div>
    <b class="text-[#10B981]">For 迴圈</b>
    <p class="text-gray-400 text-xs mt-1">for (int i = 0; ...)</p>
    <span>印出所有商品</span>
  </div>
  <div v-click class="concept-card amber text-center">
    <div class="text-3xl mb-2">🔀</div>
    <b class="text-[#F59E0B]">條件判斷</b>
    <p class="text-gray-400 text-xs mt-1">if (choice >= 1 && ...)</p>
    <span>確認輸入範圍</span>
  </div>
</div>

<div v-click class="callout mt-6">💡 <b>重點</b>：你昨天學的工具，今天馬上用上了！</div>

---
layout: default
class: scroll-y
---

## 🛒 步驟二：多商品訂單

<div class="stage-badge mb-4">Phase 2 — 可以買多個商品，計算總金額</div>

```java {1-2|4-5|7-20|all}
int totalAmount = 0;  // 總金額
int orderCount = 0;   // 買了幾個
while (true) {
    System.out.println("商品列表：");
    for (int i = 0; i < products.length; i++) {
        System.out.println((i + 1) + ". " + products[i] + " → " + prices[i] + " 元");
    }
    System.out.println("0. 結帳");
    System.out.print("請選擇商品編號：");
    int choice = scanner.nextInt();

    if (choice == 0) {
        break;  // 結帳跳出迴圈
    }

    if (choice >= 1 && choice <= products.length) {
        System.out.print("買幾個？");
        int quantity = scanner.nextInt();
        int subtotal = prices[choice - 1] * quantity;
        totalAmount += subtotal;
        orderCount += quantity;
    }
}
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

<div class="stage-badge mb-4">Phase 3 — 買到剩 0 件就不能再買</div>

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

# 🧠 陣列 → 資料庫

<div class="grid grid-cols-2 gap-6 mt-6">
  <div v-click class="p-5 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <h3 class="text-[#3B82F6] font-bold text-lg mb-3">📦 今天用的：平行陣列</h3>
    <pre class="text-sm text-gray-300">String[] products = {...};
int[] prices = {...};
int[] stock = {...};</pre>
    <p class="text-gray-400 text-xs mt-3">簡單、好懂、但有上限</p>
  </div>
  <div v-click class="p-5 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <h3 class="text-[#10B981] font-bold text-lg mb-3">🗄️ 真實世界：資料庫</h3>
    <pre class="text-sm text-gray-300">SELECT * FROM products
WHERE stock > 0
ORDER BY price;</pre>
    <p class="text-gray-400 text-xs mt-3">強大、可搜尋、可擴展</p>
  </div>
</div>

<div v-click class="callout mt-6">💡 <b>重點</b>：你今天做的，就是資料庫在做的事的縮小版！</div>

---
layout: default
class: scroll-y
---

# 🏅 DomJudge 題庫

<div class="stage-badge mb-4">線上練習 — 挑戰自我</div>

<div class="grid grid-cols-2 gap-6 mt-4">
  <div v-click class="p-5 rounded-lg bg-[#1E293B] border border-[#5382A1]/30">
    <h3 class="text-[#5382A1] font-bold text-lg mb-3">🔗 登入系統</h3>
    <div class="text-sm text-gray-300 space-y-2">
      <p>網址：<a href="https://domjudge.ntubimdbirc.tw/login" target="_blank" class="text-[#3B82F6] underline">domjudge.ntubimdbirc.tw</a></p>
      <p>帳號：學號</p>
      <p>密碼：預設密碼（已發Email，如找不到請找助教）</p>
    </div>
  </div>
  <div v-click class="p-5 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <h3 class="text-[#10B981] font-bold text-lg mb-3">💡 題目說明</h3>
    <div class="text-sm text-gray-300 space-y-2">
      <p>✅ 題目從簡單到困難</p>
      <p>✅ 用 Java 作答</p>
      <p>✅ 提交後系統自動批改</p>
      <p>✅ WA 是答案錯誤 RE是程式執行編輯錯誤 </p>
    </div>
  </div>
</div>

<div v-click class="mt-4 p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
  <h3 class="text-[#F59E0B] font-bold mb-2">📺 <a href="https://drive.google.com/file/d/1vbWbfIXkI7CaOsQ5kttSEkyms1muvbIv/preview" target="_blank">操作說明影片</a></h3>
</div>

<div v-click class="callout mt-4">🎯 <b>小提示</b>：先完成遊戲再來挑戰，題目不會很難！</div>

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

<div v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 800, duration: 500 } }">
  <a href="https://github.com/lucashsu95/cb-backend-camp" target="_blank" class="px-6 py-3 rounded-lg bg-[#3B82F6] text-white font-bold hover:bg-[#1d4ed8] transition inline-block">
    📦 範例程式碼
  </a>
</div>

<p v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 1200, duration: 400 } }" class="mt-8 text-sm text-gray-600">
  LucasHsu.dev — 2026 商智中心後端群體驗營
</p>
