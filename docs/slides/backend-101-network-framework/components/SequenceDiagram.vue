<script setup lang="ts">
// 由 diagram-design skill 產出，於建置時內嵌，確保 Vite 能打包
// 配色對齊 style.css 的 design tokens（accent / ok / err / fg-2）
</script>

<template>
  <div class="seq-diagram">
    <svg viewBox="0 0 900 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="b101-seq-title b101-seq-desc">
      <title id="b101-seq-title">前後端如何溝通 — 一次下單的完整對話</title>
      <desc id="b101-seq-desc">瀏覽器先送出 GET /api/products 讀取商品，Java API 查詢記憶體商品清單後回傳 200。接著使用者點擊下單，瀏覽器送出 POST /api/buy，ALT 片段顯示庫存足夠時回傳 200 購買成功，庫存不足時回傳 409 衝突。</desc>

      <defs>
        <pattern id="b101-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.07)"/>
        </pattern>
        <marker id="b101-arrow" markerWidth="9" markerHeight="6.5" refX="8" refY="3.25" orient="auto">
          <polygon points="0 0, 9 3.25, 0 6.5" fill="var(--fg-3)"/>
        </marker>
        <marker id="b101-arrow-req" markerWidth="9" markerHeight="6.5" refX="8" refY="3.25" orient="auto">
          <polygon points="0 0, 9 3.25, 0 6.5" fill="var(--accent)"/>
        </marker>
        <marker id="b101-arrow-ok" markerWidth="9" markerHeight="6.5" refX="8" refY="3.25" orient="auto">
          <polygon points="0 0, 9 3.25, 0 6.5" fill="var(--ok)"/>
        </marker>
        <marker id="b101-arrow-err" markerWidth="9" markerHeight="6.5" refX="8" refY="3.25" orient="auto">
          <polygon points="0 0, 9 3.25, 0 6.5" fill="var(--err)"/>
        </marker>
      </defs>

      <rect width="100%" height="100%" class="d-bg"/>
      <rect width="100%" height="100%" fill="url(#b101-dots)"/>

      <!-- participants -->
      <g class="d-pill d-pill--acc">
        <rect x="104" y="26" width="132" height="28" rx="14"/>
        <text x="170" y="45">瀏覽器</text>
      </g>
      <g class="d-pill d-pill--ok">
        <rect x="384" y="26" width="132" height="28" rx="14"/>
        <text x="450" y="45">Java API</text>
      </g>
      <g class="d-pill">
        <rect x="664" y="26" width="132" height="28" rx="14"/>
        <text x="730" y="45">商品資料</text>
      </g>

      <!-- lifelines -->
      <line x1="170" y1="62" x2="170" y2="392" class="d-life"/>
      <line x1="450" y1="62" x2="450" y2="392" class="d-life"/>
      <line x1="730" y1="62" x2="730" y2="392" class="d-life"/>

      <!-- activation bars -->
      <rect x="167" y="96" width="6" height="112" rx="3" class="d-act"/>
      <rect x="447" y="126" width="6" height="82" rx="3" class="d-act"/>
      <rect x="727" y="144" width="6" height="30" rx="3" class="d-act"/>
      <rect x="167" y="260" width="6" height="20" rx="3" class="d-act"/>
      <rect x="447" y="288" width="6" height="100" rx="3" class="d-act"/>
      <rect x="727" y="298" width="6" height="24" rx="3" class="d-act"/>

      <!-- phase 1 : read products -->
      <line x1="176" y1="104" x2="440" y2="104" class="d-req" marker-end="url(#b101-arrow-req)"/>
      <text x="310" y="96" class="d-lbl d-lbl--acc">GET /api/products</text>

      <line x1="456" y1="136" x2="720" y2="136" class="d-req" marker-end="url(#b101-arrow-req)"/>
      <text x="590" y="128" class="d-lbl">讀取商品清單</text>

      <line x1="720" y1="160" x2="456" y2="160" class="d-res" marker-end="url(#b101-arrow)"/>
      <text x="590" y="178" class="d-lbl">商品清單</text>

      <line x1="440" y1="196" x2="176" y2="196" class="d-res" marker-end="url(#b101-arrow)"/>
      <text x="310" y="214" class="d-lbl">200 · application/json</text>

      <!-- phase divider -->
      <line x1="104" y1="232" x2="796" y2="232" class="d-rule"/>
      <text x="104" y="250" class="d-phase">使用者按下「下單」</text>

      <!-- phase 2 : place order -->
      <line x1="176" y1="268" x2="440" y2="268" class="d-req" marker-end="url(#b101-arrow-req)"/>
      <text x="310" y="260" class="d-lbl d-lbl--acc">POST /api/buy · productId + quantity</text>

      <line x1="456" y1="296" x2="720" y2="296" class="d-req" marker-end="url(#b101-arrow-req)"/>
      <text x="590" y="288" class="d-lbl">檢查並扣減庫存</text>

      <!-- ALT block -->
      <rect x="140" y="312" width="700" height="106" rx="8" class="d-alt"/>
      <rect x="140" y="312" width="34" height="14" rx="3" class="d-alt-tab"/>
      <text x="157" y="322" class="d-alt-tag">ALT</text>

      <text x="156" y="344" class="d-cond d-cond--ok">[stock &gt;= quantity]</text>
      <line x1="440" y1="358" x2="176" y2="358" class="d-res d-res--ok" marker-end="url(#b101-arrow-ok)"/>
      <text x="310" y="350" class="d-lbl d-lbl--ok">200 · 購買成功</text>

      <line x1="152" y1="376" x2="828" y2="376" class="d-rule d-rule--dashed"/>

      <text x="156" y="396" class="d-cond d-cond--err">[stock &lt; quantity]</text>
      <line x1="440" y1="406" x2="176" y2="406" class="d-res d-res--err" marker-end="url(#b101-arrow-err)"/>
      <text x="310" y="398" class="d-lbl d-lbl--err">409 · 庫存不足</text>

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
  width: 100%;
  max-width: 900px;
  height: auto;
  max-height: 298px;
  display: block;
}

.seq-diagram text {
  font-family: "Outfit", "PingFang TC", "Noto Sans TC", sans-serif;
}

.d-bg { fill: #0e1013; }

/* participants */
.d-pill rect {
  fill: rgba(255, 255, 255, 0.028);
  stroke: var(--line-2);
  stroke-width: 1;
}
.d-pill--acc rect { stroke: var(--accent-line); fill: var(--accent-wash); }
.d-pill--ok rect { stroke: rgba(63, 185, 138, 0.42); fill: var(--ok-wash); }
.d-pill text {
  fill: var(--fg-2);
  font-size: 13px;
  font-weight: 500;
  text-anchor: middle;
  letter-spacing: 0.01em;
}
.d-pill--acc text { fill: var(--accent-2); }
.d-pill--ok text { fill: var(--ok); }

/* structure */
.d-life {
  stroke: var(--line);
  stroke-width: 1;
  stroke-dasharray: 2 5;
}
.d-act {
  fill: rgba(255, 255, 255, 0.09);
  stroke: var(--line-2);
  stroke-width: 1;
}
.d-rule { stroke: var(--line); stroke-width: 1; }
.d-rule--dashed { stroke-dasharray: 4 4; }
.d-alt {
  fill: rgba(255, 255, 255, 0.022);
  stroke: var(--line-2);
  stroke-width: 1;
}
.d-alt-tab { fill: #0e1013; stroke: var(--line-2); stroke-width: 1; }

/* messages */
.d-req { stroke: var(--accent); stroke-width: 1.5; }
.d-res { stroke: var(--fg-3); stroke-width: 1.2; stroke-dasharray: 5 4; }
.d-res--ok { stroke: var(--ok); stroke-width: 1.5; }
.d-res--err { stroke: var(--err); stroke-width: 1.5; }

.d-lbl {
  fill: var(--fg-3);
  font-family: "JetBrains Mono", "PingFang TC", monospace;
  font-size: 10.5px;
  text-anchor: middle;
}
.d-lbl--acc { fill: var(--accent-2); }
.d-lbl--ok { fill: var(--ok); }
.d-lbl--err { fill: var(--err); }

.d-phase {
  fill: rgba(255, 255, 255, 0.32);
  font-family: "JetBrains Mono", "PingFang TC", monospace;
  font-size: 9.5px;
  letter-spacing: 0.16em;
}

.d-cond {
  font-family: "JetBrains Mono", "PingFang TC", monospace;
  font-size: 9.5px;
  letter-spacing: 0.04em;
}
.d-cond--ok { fill: var(--ok); }
.d-cond--err { fill: var(--err); }

.d-alt-tag {
  fill: var(--fg-3);
  font-family: "JetBrains Mono", monospace;
  font-size: 8px;
  letter-spacing: 0.14em;
  text-anchor: middle;
}

.d-foot {
  fill: rgba(255, 255, 255, 0.28);
  font-family: "JetBrains Mono", "PingFang TC", monospace;
  font-size: 9.5px;
  letter-spacing: 0.1em;
  text-anchor: middle;
}
</style>
