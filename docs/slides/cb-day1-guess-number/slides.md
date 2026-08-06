---
theme: seriph
title: 後端群體驗營 Day1 — 猜數字遊戲
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
  sans: 'Inter, PingFang TC, Noto Sans TC, sans-serif'
  mono: 'JetBrains Mono, Fira Code, Cascadia Code, Source Code Pro, PingFang TC, Noto Sans TC, monospace'
css: unocss
stylesheet: ./style.css
drawings:
  persist: true
  enabled: true
selectable: true
exportFilename: cb-day1-guess-number
---

<div class="cover-glow"></div>
<div class="relative z-10 flex flex-col items-center justify-center h-full">
  <div v-motion :initial="{ y: -20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 200, duration: 500 } }" class="text-center">
    <img src="./birc.png" class="h-16 mx-auto mb-3" alt="BIRC Logo" />
  </div>
  <h1 v-motion :initial="{ y: 30, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 350, duration: 500 } }" class="text-5xl font-bold text-center">
    <span class="text-[#3B82F6]">BIRC 商智中心</span>
  </h1>
  <p v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 500, duration: 500 } }" class="text-lg text-gray-400 mt-2 text-center">
    Business Intelligence Center — 推動校園數位人才培育
  </p>
  <div v-motion :initial="{ y: 30, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 700, duration: 500 } }" class="mt-8 flex gap-4 text-center text-sm">
    <div class="px-4 py-3 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
      <b class="text-[#3B82F6]">🏆 競賽獲獎</b>
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
  <div v-motion :initial="{ y: -20, opacity: 0 }" :enter="{ y: 0, opacity: 1 }" class="kicker">$ java GuessNumber --mode interactive</div>
  <h1 v-motion :initial="{ y: 24, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 180 } }">
    <span class="text-[#3B82F6]">Backend</span> <span class="text-white">體驗營</span> <span class="text-[#10B981]">Day1</span>
  </h1>
  <p class="text-xl text-gray-300 mt-4 font-mono">// 猜數字遊戲 — 從 0 到「我寫出一個會動的東西」</p>
  <div class="mt-14 grid grid-cols-3 gap-5 text-sm">
    <div class="concept-card blue"><b>變數</b><br><span>存東西的盒子</span></div>
    <div class="concept-card green"><b>條件判斷</b><br><span>if/else 分支</span></div>
    <div class="concept-card amber"><b>迴圈</b><br><span>重複做的事</span></div>
  </div>
</div>

---
layout: default
---

# 🚀 為什麼加入商智中心？

<div class="grid grid-cols-3 gap-4 mt-4">
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#5382A1]/30">
    <h3 class="text-[#5382A1] font-bold mb-3">🏆 競賽成就</h3>
    <div class="grid grid-cols-2 gap-2">
      <img src="./award-1.jpg" class="rounded-lg w-full h-20 object-cover" />
      <img src="./award-2.jpg" class="rounded-lg w-full h-20 object-cover" />
    </div>
  </div>
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <h3 class="text-[#10B981] font-bold mb-3">🤝 社群文化</h3>
    <div class="text-sm text-gray-300 space-y-2">
      <p>⛰️ 與明貴主任一起爬象山</p>
      <p>🚴 與明貴主任騎車環島</p>
      <p>✨ 團隊建立活動</p>
    </div>
  </div>
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
    <h3 class="text-[#F59E0B] font-bold mb-3">⚡ 成長資源</h3>
    <div class="text-sm text-gray-300 space-y-2">
      <p>🎯 北商聯盟競賽指導</p>
      <p>🤖 AI 算力資源支援</p>
      <p>🤝 產學合作經驗</p>
      <p>📜 明貴主任推薦信 (針對優秀成員)</p>
    </div>
  </div>
</div>

<div v-click class="mt-4 p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30 text-center">
  <p class="text-[#F59E0B] font-bold mb-2">📱 追蹤我們的 IG</p>
  <div class="flex items-center justify-center gap-4">
<div class="bg-white p-2 rounded-3">
    <img src="./ig-qr.png" class="h-24 rounded-lg" />
</div>
  </div>
</div>

---
layout: default
---

# 🎯 今日目標


<div class="mt-6 space-y-3">
  <div v-click class="flex items-center gap-4 p-4 rounded-lg bg-[#1E293B]">
    <span class="text-3xl">💻</span>
    <div>
      <b class="text-[#3B82F6] text-lg">寫出一個可互動的 Java 猜數字遊戲</b>
      <p class="text-gray-400 mt-1">從空白檔案開始，一步步完成</p>
    </div>
  </div>
  <div v-click class="flex items-center gap-4 p-4 rounded-lg bg-[#1E293B]">
    <span class="text-3xl">🧠</span>
    <div>
      <b class="text-[#10B981] text-lg">理解變數、條件判斷、迴圈的實際用途</b>
      <p class="text-gray-400 mt-1">不是背文法，是用它們解決問題</p>
    </div>
  </div>
  <div v-click class="flex items-center gap-4 p-4 rounded-lg bg-[#1E293B]">
    <span class="text-3xl">✨</span>
    <div>
      <b class="text-[#F59E0B] text-lg">感受「改一行 code 就不一樣」的成就感</b>
      <p class="text-gray-400 mt-1">親眼看到自己的程式跑起來</p>
    </div>
  </div>
</div>

---
layout: default
---

# 🍳 後端是什麼？

<div class="grid grid-cols-2 gap-6 mt-6">
  <div v-click class="p-6 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30 text-center">
    <div class="text-4xl mb-3">🍽️</div>
    <h3 class="text-[#3B82F6] font-bold text-lg mb-2">前端 = 外場</h3>
    <p class="text-gray-300 text-sm">你看得到的畫面</p>
    <p class="text-gray-500 text-xs mt-1">選單、按鈕、動畫、排版</p>
  </div>
  <div v-click class="p-6 rounded-lg bg-[#1E293B] border border-[#10B981]/30 text-center">
    <div class="text-4xl mb-3">👨‍🍳</div>
    <h3 class="text-[#10B981] font-bold text-lg mb-2">後端 = 廚房</h3>
    <p class="text-gray-300 text-sm">你看不到，但沒有它什麼都端不出來</p>
    <p class="text-gray-500 text-xs mt-1">資料處理、邏輯運算、資料庫</p>
  </div>
</div>

<div v-click class="callout mt-6">💡 <b>一句話</b>：前端負責「好看」，後端負責「能用」</div>

---
layout: default
---

# 📱 舉個例子

你點外送 App 按下「送出訂單」後，後端發生了什麼？

<div class="timeline mt-8">
  <div v-click class="time-node"><b>1. 驗證訂單</b><br><span>資料完整？庫存夠？</span></div>
  <div v-click class="time-arrow">→</div>
  <div v-click class="time-node green"><b>2. 扣庫存</b><br><span>把商品從架上拿掉</span></div>
  <div v-click class="time-arrow">→</div>
  <div v-click class="time-node amber"><b>3. 寫進資料庫</b><br><span>記錄這筆訂單</span></div>
  <div v-click class="time-arrow">→</div>
  <div v-click class="time-node"><b>4. 通知店家</b><br><span>接單了！</span></div>
</div>

<div v-click class="callout mt-8">🎯 <b>這些都是後端</b> — 你看不到，但它一直在運作</div>

---
layout: default
---

# 🛠️ 環境設定

<div class="grid grid-cols-2 gap-4 mt-4">
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#5382A1]">
    <h3 class="text-[#5382A1] font-bold mb-3">📦 Step 1：安裝 JDK 25</h3>
    <div class="text-sm text-gray-300 space-y-2">
      <div class="p-2 rounded bg-[#0d1117] font-mono text-xs">
        <span class="text-gray-500"># macOS</span><br>
        <span class="text-[#10B981]">brew install openjdk@25</span>
      </div>
      <div class="p-2 rounded bg-[#0d1117] font-mono text-xs">
        <span class="text-gray-500"># Windows</span><br>
        <span class="text-[#10B981]">winget install EclipseAdoptium.Temurin.25.JDK</span>
      </div>
      <div class="p-2 rounded bg-[#0d1117] font-mono text-xs">
        <span class="text-gray-500"># Linux</span><br>
        <span class="text-[#10B981]">sudo apt install openjdk-25-jdk</span>
      </div>
    </div>
    <p class="text-xs text-[#10B981] mt-3 font-bold">✦ 終端機打 java -version 看到版本號就成功</p>
  </div>
  <div v-click class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
    <h3 class="text-[#F59E0B] font-bold mb-3">💻 Step 2：安裝 VSCode</h3>
    <div class="text-sm text-gray-300 space-y-2">
      <div class="p-2 rounded bg-[#0d1117] font-mono text-xs">
        <span class="text-gray-500"># macOS（有 Homebrew）</span><br>
        <span class="text-[#10B981]">brew install --cask visual-studio-code</span>
      </div>
      <div class="p-2 rounded bg-[#0d1117] font-mono text-xs">
        <span class="text-gray-500"># macOS（無 Homebrew）</span><br>
        <span class="text-[#10B981]">直接下載 code.visualstudio.com .dmg</span>
      </div>
      <div class="p-2 rounded bg-[#0d1117] font-mono text-xs">
        <span class="text-gray-500"># Windows</span><br>
        <span class="text-[#10B981]">winget install Microsoft.VisualStudioCode</span>
      </div>
      <div class="p-2 rounded bg-[#0d1117] font-mono text-xs">
        <span class="text-gray-500"># Linux</span><br>
        <span class="text-[#10B981]">sudo snap install code</span>
      </div>
    </div>
    <p class="text-xs text-gray-400 mt-3">開啟後安裝 <b class="text-[#F59E0B]">Extension Pack for Java</b></p>
  </div>
</div>

---
layout: default
---

# ✅ 環境確認

請打開你的 IDE，輸入這段 code：

```java {all}
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, 我的名字!");
    }
}
```

<div v-click class="callout mt-3">💡 <b>看到 "Hello, 我的名字!" 就成功了！</b> 在下面打上你自己的名字，舉手讓助教確認</div>

<div v-click class="mt-2 p-2 bg-[#F59E0B]/10 rounded-lg border border-[#F59E0B]/30 text-center text-sm">
  <b class="text-[#F59E0B]">⏱ 3 分鐘</b>
  <span class="text-gray-400 ml-2">卡住的人，旁邊同學或助教會來幫你</span>
</div>

---
layout: default
---

# 🎮 階段一：基本版猜數字

<div class="stage-badge mb-4">Phase 1 - 電腦隨機出 1-100 的數字，你來猜！</div>

```java {1-3|4-5|all}
// 1. 產生隨機數
int answer = (int)(Math.random() * 100) + 1;

// 2. 讀取輸入
Scanner scanner = new Scanner(System.in);

// 3. 迴圈：一直猜到對為止
while (true) {
    System.out.print("猜一個數字：");
    int guess = scanner.nextInt();
    if (guess == answer) {
        System.out.println("答對了！");
        break;
    } else if (guess > answer) {
        System.out.println("太大了！");
    } else {
        System.out.println("太小了！");
    }
}
```

---
layout: default
---

# 🧠 你剛剛用了什麼？

<div class="grid grid-cols-3 gap-4 mt-6">
  <div v-click class="concept-card blue text-center">
    <div class="text-3xl mb-2">📦</div>
    <b class="text-[#3B82F6]">變數</b>
    <p class="text-gray-400 text-xs mt-1">answer, guess</p>
    <span>存東西的盒子</span>
  </div>
  <div v-click class="concept-card green text-center">
    <div class="text-3xl mb-2">🔀</div>
    <b class="text-[#10B981]">條件判斷</b>
    <p class="text-gray-400 text-xs mt-1">if / else if / else</p>
    <span>根據情況做不同事</span>
  </div>
  <div v-click class="concept-card amber text-center">
    <div class="text-3xl mb-2">🔄</div>
    <b class="text-[#F59E0B]">迴圈</b>
    <p class="text-gray-400 text-xs mt-1">while (true)</p>
    <span>重複執行直到跳出</span>
  </div>
</div>

<div v-click class="callout mt-6">💡 <b>重點</b>：你剛剛用的這些工具，就是後端的基礎！</div>

---
layout: default
---

# 🎯 階段二：加入計數器

<div class="stage-badge mb-4">Phase 2 - 讓程式記錄你猜了幾次</div>

```java {1|5|11-13|all}
int count = 0;  // 從 0 開始

while (true) {
    // ... 猜測 code ...
    count++;  // 每猜一次就 +1

    if (guess == answer) {
        System.out.println("答對了！");
        System.out.println("你總共猜了 " + count + " 次！");
        break;
    }
}
```

<div v-click class="callout mt-4" style="border-color: rgba(245, 158, 11, 0.32);">
  <b class="text-[#F59E0B]">💡 思考</b>
  <p class="text-gray-300 text-sm mt-2">為什麼 count 要放在 while 迴圈「外面」？</p>
  <p v-click class="text-[#10B981] text-sm mt-1">→ 因為要跨迴圈保留值，不能每次重來都歸零</p>
</div>

---
layout: default
---

# 🎨 階段三：客製化你的遊戲

<div class="stage-badge mb-3">Phase 3 — 重點體驗</div>

<div class="grid grid-cols-2 gap-4">
  <div v-click class="concept-card blue">
    <h3 class="text-[#3B82F6] font-bold text-sm mb-2">💬 改吐槽訊息</h3>
    <pre class="text-[11px] text-gray-300 leading-tight">String[] msgs = {
  "太大！猜到明年嗎？",
  "太小！看股票嗎？",
  "再大膽一點！"
};
int i = (int)(Math.random()*msgs.length);
System.out.println(msgs[i]);</pre>
  </div>
  <div v-click class="concept-card green">
    <h3 class="text-[#10B981] font-bold text-sm mb-2">🏆 加評級系統</h3>
    <pre class="text-[11px] text-gray-300 leading-tight">if (count <= 5) {
  System.out.println("天才！");
} else if (count <= 10) {
  System.out.println("不錯！");
} else {
  System.out.println("再試試！");
}</pre>
  </div>
</div>

<div v-click class="callout mt-3" style="border-color: rgba(245, 158, 11, 0.32);">🎯 <b>現在換你了！</b>改一行 code，看看有什麼不同</div>

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
      <p>密碼：預設密碼（助教會給）</p>
    </div>
  </div>
  <div v-click class="p-5 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <h3 class="text-[#10B981] font-bold text-lg mb-3">💡 題目說明</h3>
    <div class="text-sm text-gray-300 space-y-2">
      <p>✅ 題目從簡單到困難</p>
      <p>✅ 用 Java 作答</p>
      <p>✅ 提交後系統自動批改</p>
      <p>✅ 餘時間可以挑戰看看！</p>
    </div>
  </div>
</div>

<div v-click class="mt-4 p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
  <h3 class="text-[#F59E0B] font-bold mb-2">📺 <a href="https://drive.google.com/file/d/1vbWbfIXkI7CaOsQ5kttSEkyms1muvbIv/preview" target="_blank">操作說明影片</a></h3>
  <div class="bg-gray-800 rounded-lg h-[300px] flex items-center justify-center text-gray-500 italic">
    (影片請點擊上方連結觀看)
  </div>
</div>

<div v-click class="callout mt-4">🎯 <b>小提示</b>：先完成遊戲再來挑戰，題目不會很難！</div>

---
layout: default
---

# ⏱ 自由發揮時間

<div v-click class="p-5 rounded-lg bg-gradient-to-r from-[#3B82F6]/10 to-[#10B981]/10 border border-[#3B82F6]/20">
  <h3 class="text-2xl font-bold mb-4 text-center">你有 30 分鐘</h3>
  <div class="grid grid-cols-2 gap-3 text-gray-300 text-sm">
    <div>✅ 把遊戲跑起來</div>
    <div>✅ 改成你喜歡的吐槽訊息</div>
    <div>✅ 加上評級系統</div>
    <div>✅ 嘗試加新功能（例如：只能猜 10 次）</div>
  </div>
</div>

<div v-click class="callout mt-4" style="border-color: rgba(245, 158, 11, 0.32);">
  <b class="text-[#F59E0B]">💡 提示</b>
  <span class="text-sm text-gray-400 ml-2">不知道怎麼開始？看看 stage3-custom.java 的成品</span>
</div>

---
layout: default
---

# 🏆 階段四：排行榜（展示）

<div class="stage-badge mb-4">Phase 4 — 觀摩用</div>

用陣列存前三名的次數

```java {1-2|4-12|all}
int[] leaderboard = {999, 999, 999};
String[] names = {"???", "???", "???"};

if (count < leaderboard[0]) {
    leaderboard[2] = leaderboard[1];
    leaderboard[1] = leaderboard[0];
    leaderboard[0] = count;
    names[0] = playerName;
}
```

<div v-click class="callout mt-4">💡 <b>觀摩就好</b>：這個版本不用自己寫，看看陣列怎麼「推擠」就好</div>

---
layout: default
---

# 🎉 秀出你的成果

<div class="grid grid-cols-2 gap-6 mt-4">
  <div>
    <div v-click class="p-4 rounded-lg bg-[#1E293B] mb-3">
      <p class="text-gray-300 mb-2">每個人用 1-2 句話介紹：</p>
      <p class="text-[#10B981] font-mono">「我加了 _____，所以 _____」</p>
    </div>
    <div v-click class="p-4 rounded-lg bg-[#1E293B] mb-3">
      <p class="text-gray-400 text-sm">例如：</p>
      <p class="text-gray-300 text-sm mt-1">「我加了打嗝特效，所以猜錯會說 🫧」</p>
    </div>
    <div v-click class="p-4 rounded-lg bg-[#1E293B]">
      <p class="text-gray-300 text-sm">互相看看別人的版本！</p>
    </div>
  </div>
  <div>
    <div v-click class="concept-card green">
      <h3 class="text-[#10B981] font-bold mb-3">🎯 你剛剛完成了</h3>
      <ul class="space-y-2 text-sm text-gray-300">
        <li>✓ 變數 — 存隨機數、計數器</li>
        <li>✓ 條件判斷 — if/else</li>
        <li>✓ 迴圈 — while</li>
        <li>✓ 陣列 — 存排行榜</li>
        <li>✓ Scanner — 讀取輸入</li>
      </ul>
    </div>
    <div v-click class="callout mt-3" style="border-color: rgba(245, 158, 11, 0.32);">
      <b class="text-[#F59E0B]">📌 重點</b>
      <p class="text-gray-400 text-xs mt-1">這些就是後端的基礎工具！</p>
    </div>
  </div>
</div>

---
layout: default
---

# 🚀 預告：明天

<div v-click class="p-6 rounded-lg bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 border border-[#3B82F6]/20">
  <h3 class="text-2xl font-bold mb-4">
    <span class="text-[#3B82F6]">Day 2</span>：購物網站的後端
  </h3>
  <div class="grid grid-cols-2 gap-3 text-gray-300 text-sm">
    <div>📦 做一個超簡化的訂單系統</div>
    <div>🛒 商品清單 + 選購 + 結帳</div>
    <div>📊 加入庫存判斷</div>
    <div>💡 看見「陣列 → 資料庫」的關聯</div>
  </div>
</div>

<div v-click class="callout mt-4">「昨天你們寫的排行榜，其實就是<span class="text-[#10B981] font-bold">資料庫</span>在做的事的縮小版」</div>

---
layout: center
class: text-center
---

<div v-motion :initial="{ scale: 0.8, opacity: 0 }" :enter="{ scale: 1, opacity: 1, transition: { duration: 500 } }" class="text-6xl mb-6">🎉</div>

<h1 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 200, duration: 500 } }" class="text-4xl font-bold mb-4">
  <span class="text-[#3B82F6]">恭喜！</span>
</h1>

<p v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 400, duration: 500 } }" class="text-lg text-gray-300 mb-6">
  你今天從零開始，寫出了一個會動的 Java 程式
</p>

<p v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 600, duration: 500 } }" class="text-xl text-gray-400 mb-8">
  這就是後端的起點
</p>

<div v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 800, duration: 500 } }">
  <a href="https://github.com/lucashsu95/cb-backend-camp" target="_blank" class="px-6 py-3 rounded-lg bg-[#3B82F6] text-white font-bold hover:bg-[#1d4ed8] transition inline-block">
    📦 範例程式碼
  </a>
</div>

<p v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 1200, duration: 400 } }" class="mt-8 text-sm text-gray-600">
  LucasHsu.dev — 2026 商智中心後端群體驗營
</p>
