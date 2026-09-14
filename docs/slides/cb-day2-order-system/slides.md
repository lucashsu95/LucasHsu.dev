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

---
layout: default
---

# 📦 步驟一：陣列就是資料的容器

<div class="stage-badge mb-4">第一部 — 先用陣列保存商品資料</div>

```java {1-3|5-8|10-12|all}
// 陣列：把多筆商品資料暫時放在程式記憶體裡
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

<div class="stage-badge mb-4">第一部 — 用陣列完成訂單邏輯</div>

```java {1-2|4-5|7-20|all}
int totalAmount = 0;  // 總金額
int orderCount = 0;   // 買了幾個
while (true) {
    System.out.println("商品列表：");
    for (int i = 0; i &lt; products.length; i++) {
        System.out.println((i + 1) + ". " + products[i] + " → " + prices[i] + " 元");
    }
    System.out.println("0. 結帳");
    System.out.print("請選擇商品編號：");
    int choice = scanner.nextInt();

    if (choice == 0) {
        break;  // 結帳跳出迴圈
    }

    if (choice >= 1 && choice &lt;= products.length) {
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

# 🚀 第二部：把資料換成資料庫

<div class="stage-badge mb-4">第二部 — 不換購物車邏輯，只換資料的來源</div>

<div class="grid grid-cols-3 gap-4 mt-6 text-center">
  <div v-click class="concept-card blue">
    <div class="text-3xl mb-2">📦</div>
    <b class="text-[#3B82F6]">原本</b>
    <p class="text-gray-300 text-sm mt-2">資料放在 Java 陣列</p>
  </div>
  <div v-click class="flex items-center justify-center text-3xl text-[#F59E0B]">→</div>
  <div v-click class="concept-card green">
    <div class="text-3xl mb-2">🗄️</div>
    <b class="text-[#10B981]">現在</b>
    <p class="text-gray-300 text-sm mt-2">資料放在資料庫表格</p>
  </div>
</div>

<div v-click class="callout mt-6">🎯 商品名稱、價格、庫存這些「資料」不變；改變的是它們被保存、查詢的位置。</div>

---
layout: default
---

# 🧩 同一份資料，換一個家

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

<div v-click class="callout mt-6">💡 <b>關鍵操作</b>：不是重新做一個系統，而是把 `products`、`prices`、`stock` 的資料來源換成 `products` 資料表。</div>

---
layout: default
---

# 🗄️ 第二部：真的操作資料庫

<div class="stage-badge mb-4">Step 2.1 — 準備 Java 的 SQLite 驅動</div>

<div class="grid grid-cols-2 gap-6 mt-5">
  <div v-click class="p-5 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <h3 class="text-[#3B82F6] font-bold text-lg mb-3">下載 SQLite JDBC Driver</h3>
    <ol class="space-y-2 text-gray-300 text-sm">
      <li>1. 下載 <a href="https://github.com/xerial/sqlite-jdbc/releases/download/3.53.4.0/sqlite-jdbc-3.53.4.0.jar" target="_blank" class="text-[#3B82F6] underline">sqlite-jdbc-3.53.4.0.jar</a></li>
      <li>2. 放到 Java 專案的 `lib/` 資料夾</li>
      <li>3. Java 透過這個 JAR 連線 SQLite</li>
    </ol>
    <p class="text-gray-400 text-xs mt-4">這個 JAR 讓 Java 能使用 SQLite，不需要另外啟動資料庫伺服器。</p>
  </div>
  <div v-click class="p-5 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <h3 class="text-[#10B981] font-bold text-lg mb-3">SQLite 是單一檔案</h3>
    <ul class="space-y-2 text-gray-300 text-sm">
      <li>✓ 不用安裝 MySQL Server</li>
      <li>✓ 不用設定帳號和密碼</li>
      <li>✓ `products.db` 就是完整資料庫</li>
      <li>✓ Java 透過 JAR 讀取和修改它</li>
    </ul>
  </div>
</div>

<div v-click class="callout mt-6">🎯 SQLite 官網提供資料庫引擎；Java 課堂使用的 JDBC JAR 通常下載自 Xerial 的 `sqlite-jdbc` Releases。</div>

---
layout: default
---

# 🧰 用 VS Code 看資料庫

<div class="stage-badge mb-4">Step 2.2 — 安裝 SQLite Viewer，直接看資料</div>

<div class="grid grid-cols-2 gap-6 mt-5">
  <div v-click class="p-5 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <h3 class="text-[#3B82F6] font-bold text-lg mb-3">安裝套件</h3>
    <ol class="space-y-2 text-gray-300 text-sm">
      <li>1. 開啟 VS Code 的 Extensions</li>
      <li>2. 搜尋 <b>SQLite Viewer</b></li>
      <li>3. 安裝作者為 <b>qwtel</b> 的套件</li>
    </ol>
    <p class="text-gray-400 text-xs mt-4">也可以在終端機執行：</p>
    <pre style="font-size: 12px" class="text-gray-300 mt-2">code --install-extension qwtel.sqlite-viewer</pre>
  </div>
  <div v-click class="p-5 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <h3 class="text-[#10B981] font-bold text-lg mb-3">打開資料</h3>
    <ol class="space-y-2 text-gray-300 text-sm">
      <li>1. 在 VS Code 開啟 `products.db`</li>
      <li>2. 點選資料表 `products`</li>
      <li>3. 直接看到欄位和每一筆資料</li>
    </ol>
    <p class="text-[#10B981] text-xs mt-4">這就是資料庫裡真正保存的資料。</p>
  </div>
</div>

<div v-click class="callout mt-6">💡 Java JDBC 負責連線並執行 SQL；SQLite Viewer 負責讓我們用表格畫面觀察資料。</div>

---
layout: default
---

# 🧱 建立商品資料表

<div class="stage-badge mb-4">Step 2.3 — CREATE TABLE</div>

```sql {1-7|8-13|all}
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    stock INTEGER NOT NULL
);

INSERT INTO products (name, price, stock) VALUES
    ('cola', 30, 10),
    ('sandwich', 65, 5),
    ('chips', 45, 8),
    ('cookie', 35, 12),
    ('juice', 40, 7);
```

<div v-click class="grid grid-cols-3 gap-4 mt-4 text-center text-sm">
  <div class="concept-card blue"><b class="text-[#3B82F6]">欄位 column</b><br><span>id、name、price、stock</span></div>
  <div class="concept-card green"><b class="text-[#10B981]">資料列 row</b><br><span>一筆商品資料</span></div>
  <div class="concept-card amber"><b class="text-[#F59E0B]">資料表 table</b><br><span>所有商品的集合</span></div>
</div>

---
layout: default
---

# 👀 讓資料庫把資料印出來

<div class="stage-badge mb-4">Step 2.4 — SELECT</div>

```sql {1|3-7|9-10|all}
-- 看全部商品
SELECT * FROM products;

-- 只看還有庫存的商品
SELECT name, price, stock
FROM products
WHERE stock > 0
ORDER BY price;

-- 找出 cola，準備檢查庫存
SELECT * FROM products WHERE name = 'cola';
```

<div v-click class="callout mt-5">💡 在終端機執行查詢，或用 SQLite Viewer 打開資料表，都能看到後端程式平常讀取的資料。</div>

<div v-click class="mt-5 p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30 text-sm">
  <b class="text-[#10B981]">你現在看見的是：</b>
  <span class="text-gray-300">一張有 id、name、price、stock 欄位的 products 表。</span>
</div>

---
layout: default
class: scroll-y
---

# ☕ Java 連線 SQLite 完成購買

<div class="stage-badge mb-4">Step 2.5 — Java JDBC：更新資料，再讀回結果</div>

```java {1-4|6-10|12-24|26-40|all}
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class BuyProduct {
  public static void main(String[] args) throws Exception {
    int productId = 1;
    int quantity = 2;

    String updateSql = "UPDATE products "
        + "SET stock = stock - ? "
        + "WHERE id = ? AND stock >= ?";

    try (Connection connection = DriverManager.getConnection("jdbc:sqlite:products.db")) {
      // 先檢查庫存，再扣除購買數量
      try (PreparedStatement statement = connection.prepareStatement(updateSql)) {
        statement.setInt(1, quantity);
        statement.setInt(2, productId);
        statement.setInt(3, quantity);

        if (statement.executeUpdate() == 1) {
          System.out.println("購買成功！");
        } else {
          System.out.println("購買失敗：庫存不足或找不到商品");
        }
      }

      // 再查一次，確認資料庫裡的庫存已經更新
      String querySql = "SELECT name, price, stock "
          + "FROM products WHERE id = ?";

      try (PreparedStatement statement = connection.prepareStatement(querySql)) {
        statement.setInt(1, productId);

        try (ResultSet result = statement.executeQuery()) {
          if (result.next()) {
            System.out.println("商品：" + result.getString("name"));
            System.out.println("價格：" + result.getInt("price"));
            System.out.println("剩餘庫存：" + result.getInt("stock"));
          }
        }
      }
    }
  }
}
```

<div v-click class="grid grid-cols-2 gap-5 mt-4">
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30 text-sm">
    <b class="text-[#3B82F6]">Java 負責</b>
    <p class="text-gray-300 mt-2">建立連線、傳入數量、執行 SQL、讀取結果。</p>
  </div>
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30 text-sm">
    <b class="text-[#10B981]">資料庫負責</b>
    <p class="text-gray-300 mt-2">保存商品資料，並在條件符合時扣除庫存。</p>
  </div>
</div>

---
layout: default
class: scroll-y
---

# ▶️ 編譯並執行 Java

<div class="stage-badge mb-4">Step 2.6 — 讓 Java 找得到 SQLite JAR</div>

<div class="grid grid-cols-2 gap-5 mt-4">
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <b class="text-[#3B82F6]">先確認資料夾</b>
    <pre class="text-gray-300 mt-2">order-system/
├─ BuyProduct.java
├─ products.db
└─ lib/
   └─ sqlite-jdbc-3.53.4.0.jar</pre>
    <p class="text-gray-400 text-xs mt-2">請在 `order-system/` 資料夾開啟終端機。</p>
  </div>
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <b class="text-[#10B981]">執行順序</b>
    <ol class="text-gray-300 text-sm mt-2 space-y-1">
      <li>先編譯：產生 `BuyProduct.class`</li>
      <li>再執行：啟動 Java 程式</li>
      <li>最後用 Viewer 查看庫存</li>
    </ol>
  </div>
</div>

<div v-click class="mt-4">
  <b class="text-[#3B82F6]">macOS / Linux</b>
</div>

```bash
# 1. 編譯：-cp 告訴 Java 去 lib 找 SQLite JAR
javac -cp "lib/sqlite-jdbc-3.53.4.0.jar" BuyProduct.java

# 2. 執行：. 代表目前資料夾，: 用來分隔兩個位置
java -cp ".:lib/sqlite-jdbc-3.53.4.0.jar" BuyProduct
```

<div v-click class="mt-4">
  <b class="text-[#F59E0B]">Windows</b>
</div>

```powershell
# Windows 只需把 classpath 分隔符號改成 ;
javac -cp "lib\sqlite-jdbc-3.53.4.0.jar" BuyProduct.java
java -cp ".;lib\sqlite-jdbc-3.53.4.0.jar" BuyProduct
```

<div v-click class="callout mt-4">💡 程式成功執行後，用 SQLite Viewer 打開 `products.db`，查看 `products` 表裡的 stock 是否已經減少。</div>

---
layout: default
---

# 🔁 從陣列到資料庫

<div class="grid grid-cols-2 gap-6 mt-6">
  <div v-click class="p-5 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
    <h3 class="text-[#3B82F6] font-bold text-lg mb-3">今天的學習路線</h3>
    <div class="text-gray-300 text-sm space-y-3">
      <p><b>1.</b> Java 陣列：先理解資料和邏輯</p>
      <p><b>2.</b> SQL 資料表：讓資料可以保存</p>
      <p><b>3.</b> Java JDBC：讓程式連線並操作資料庫</p>
    </div>
  </div>
  <div v-click class="p-5 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <h3 class="text-[#10B981] font-bold text-lg mb-3">下一步會發生什麼？</h3>
    <div class="text-gray-300 text-sm space-y-3">
      <p>Java 使用 JDBC 連線 `products.db`。</p>
      <p>Java 傳入數量，執行庫存更新。</p>
      <p>查詢結果回到 Java，再顯示給使用者。</p>
    </div>
  </div>
</div>

<div v-click class="callout mt-6">💡 今天的關鍵：陣列裡的資料，現在由 Java JDBC 從真正的 SQLite 資料庫讀取與修改。</div>

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
