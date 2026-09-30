<script setup lang="ts">
// 由 diagram-design skill 產出，於建置時內嵌，確保 Vite 能打包
</script>

<template>
  <div class="seq-diagram">
    <svg viewBox="0 0 900 660" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="b101-seq-title b101-seq-desc">
      <title id="b101-seq-title">前後端如何溝通 — 一次下單的完整對話</title>
      <desc id="b101-seq-desc">瀏覽器先送出 GET /api/products 讀取商品，Java API 查詢記憶體商品清單後回傳 200。接著使用者點擊下單，瀏覽器送出 POST /api/buy，ALT 片段顯示庫存足夠時回傳 200 購買成功，庫存不足時回傳 409 衝突。</desc>
      <defs>
        <pattern id="b101-dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="rgba(245,245,245,0.10)"/>
        </pattern>
        <marker id="b101-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#9ca3af"/>
        </marker>
        <marker id="b101-arrow-accent" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#f59e0b"/>
        </marker>
        <marker id="b101-arrow-link" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#3b82f6"/>
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#0d1117"/>
      <rect width="100%" height="100%" fill="url(#b101-dots)" opacity="0.5"/>
      <rect x="90" y="56" width="150" height="44" rx="4" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.45)" stroke-width="1"/>
      <text x="165" y="83" fill="#3b82f6" font-size="14" font-weight="500" font-family="'Geist', sans-serif" text-anchor="middle">瀏覽器</text>
      <rect x="375" y="56" width="150" height="44" rx="4" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.45)" stroke-width="1"/>
      <text x="450" y="83" fill="#10b981" font-size="14" font-weight="500" font-family="'Geist', sans-serif" text-anchor="middle">Java API</text>
      <rect x="660" y="56" width="150" height="44" rx="4" fill="rgba(245,245,245,0.05)" stroke="rgba(245,245,245,0.25)" stroke-width="1"/>
      <text x="735" y="83" fill="#9ca3af" font-size="14" font-weight="500" font-family="'Geist', sans-serif" text-anchor="middle">商品資料</text>
      <line x1="165" y1="100" x2="165" y2="612" stroke="rgba(245,245,245,0.20)" stroke-width="1" stroke-dasharray="3,3"/>
      <line x1="450" y1="100" x2="450" y2="612" stroke="rgba(245,245,245,0.20)" stroke-width="1" stroke-dasharray="3,3"/>
      <line x1="735" y1="100" x2="735" y2="612" stroke="rgba(245,245,245,0.20)" stroke-width="1" stroke-dasharray="3,3"/>
      <rect x="161" y="128" width="8" height="196" fill="rgba(245,245,245,0.06)" stroke="#9ca3af" stroke-width="0.8"/>
      <rect x="446" y="164" width="8" height="420" fill="rgba(245,245,245,0.06)" stroke="#9ca3af" stroke-width="0.8"/>
      <rect x="731" y="200" width="8" height="40" fill="rgba(245,245,245,0.06)" stroke="#9ca3af" stroke-width="0.8"/>
      <rect x="731" y="400" width="8" height="40" fill="rgba(245,245,245,0.06)" stroke="#9ca3af" stroke-width="0.8"/>
      <line x1="169" y1="140" x2="442" y2="140" stroke="#3b82f6" stroke-width="1.4" marker-end="url(#b101-arrow-link)"/>
      <text x="305" y="130" fill="#3b82f6" font-size="11" font-family="'Geist Mono', monospace" text-anchor="middle">GET /api/products</text>
      <line x1="458" y1="180" x2="727" y2="180" stroke="#9ca3af" stroke-width="1.4" marker-end="url(#b101-arrow)"/>
      <text x="592" y="170" fill="#9ca3af" font-size="11" font-family="'Geist Mono', monospace" text-anchor="middle">讀取商品清單</text>
      <line x1="727" y1="220" x2="458" y2="220" stroke="#9ca3af" stroke-width="1.2" stroke-dasharray="5,4" marker-end="url(#b101-arrow)"/>
      <text x="592" y="242" fill="#9ca3af" font-size="11" font-family="'Geist Mono', monospace" text-anchor="middle">商品清單</text>
      <line x1="442" y1="260" x2="169" y2="260" stroke="#9ca3af" stroke-width="1.2" stroke-dasharray="5,4" marker-end="url(#b101-arrow)"/>
      <text x="305" y="282" fill="#9ca3af" font-size="11" font-family="'Geist Mono', monospace" text-anchor="middle">200 · application/json</text>
      <line x1="90" y1="316" x2="810" y2="316" stroke="rgba(245,245,245,0.10)" stroke-width="1"/>
      <text x="90" y="338" fill="rgba(245,245,245,0.35)" font-size="10" font-family="'Geist Mono', monospace" letter-spacing="0.14em">使用者按下「下單」</text>
      <line x1="169" y1="360" x2="442" y2="360" stroke="#3b82f6" stroke-width="1.4" marker-end="url(#b101-arrow-link)"/>
      <text x="305" y="350" fill="#3b82f6" font-size="11" font-family="'Geist Mono', monospace" text-anchor="middle">POST /api/buy · productId + quantity</text>
      <line x1="458" y1="420" x2="727" y2="420" stroke="#9ca3af" stroke-width="1.4" marker-end="url(#b101-arrow)"/>
      <text x="592" y="410" fill="#9ca3af" font-size="11" font-family="'Geist Mono', monospace" text-anchor="middle">檢查並扣減庫存</text>
      <rect x="180" y="450" width="600" height="132" rx="4" fill="rgba(245,245,245,0.04)" stroke="rgba(245,245,245,0.22)" stroke-width="1"/>
      <rect x="180" y="450" width="34" height="16" rx="2" fill="#0d1117" stroke="rgba(245,245,245,0.22)" stroke-width="1"/>
      <text x="197" y="462" fill="#9ca3af" font-size="8" font-family="'Geist Mono', monospace" text-anchor="middle" letter-spacing="0.12em">ALT</text>
      <text x="192" y="482" fill="#10b981" font-size="9" font-family="'Geist Mono', monospace" letter-spacing="0.04em">[stock &gt;= quantity]</text>
      <line x1="442" y1="502" x2="169" y2="502" stroke="#f59e0b" stroke-width="1.6" marker-end="url(#b101-arrow-accent)"/>
      <text x="305" y="496" fill="#f59e0b" font-size="11" font-family="'Geist Mono', monospace" text-anchor="middle">200 · 購買成功</text>
      <line x1="188" y1="518" x2="772" y2="518" stroke="rgba(245,245,245,0.20)" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="192" y="538" fill="#f59e0b" font-size="9" font-family="'Geist Mono', monospace" letter-spacing="0.04em">[stock &lt; quantity]</text>
      <line x1="442" y1="560" x2="169" y2="560" stroke="#9ca3af" stroke-width="1.2" stroke-dasharray="5,4" marker-end="url(#b101-arrow)"/>
      <text x="305" y="554" fill="#9ca3af" font-size="11" font-family="'Geist Mono', monospace" text-anchor="middle">409 · 庫存不足</text>
      <text x="450" y="634" fill="rgba(245,245,245,0.30)" font-size="10" font-family="'Geist Mono', monospace" text-anchor="middle" letter-spacing="0.08em">狀態碼是後端給前端的「明確答案」，不是錯誤訊息</text>
    </svg>
  </div>
</template>

<style scoped>
.seq-diagram {
  display: flex;
  justify-content: center;
  width: 100%;
}
.seq-diagram :deep(svg) {
  width: 100%;
  min-width: 860px;
  height: auto;
  display: block;
}
</style>
