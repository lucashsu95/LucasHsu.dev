<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { createTimeline, stagger, utils } from 'animejs'

// 由 diagram-design skill 產出，於建置時內嵌，確保 Vite 能打包
// 配色對齊 style.css 的 design tokens（accent / ok / err / fg-2）
// 分步播放：anime.js v4 createTimeline 串接 4 個 phase；載入失敗時降級為靜態圖
//
// 修正重點：
// 1. 改用 IntersectionObserver：投影片真的出現在畫面上才播放，離開時倒回起點。
//    （Slidev 會預先掛載相鄰頁面，原本 onMounted 就播，使用者翻到時早就播完了）
// 2. 建立 timeline 前先把所有 [data-phase] 元素設為透明，
//    避免後面階段的元素在一開始先以完整樣子閃現，輪到時才消失再淡入。
// 3. 同一階段內的箭頭與標籤用較大的 stagger，變成一則一則依序出現。
// 4. 匯出 PDF（print 媒體）時直接顯示終態，不播動畫。
// 5. 底部 409 箭頭原本超出生命線與 viewBox，已延伸生命線並加高畫布。

const props = withDefaults(defineProps<{ autoplay?: boolean }>(), { autoplay: true })

type SeqTimeline = ReturnType<typeof createTimeline>

const root = ref<HTMLElement | null>(null)
const currentStep = ref(0)
const totalSteps = 4
const MSG_STAGGER = 220
let tl: SeqTimeline | null = null
let io: IntersectionObserver | null = null

function skipMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('print').matches
  )
}

function phaseTargets(): SVGElement[] {
  const svg = root.value?.querySelector('svg')
  return svg ? Array.from(svg.querySelectorAll<SVGElement>('[data-phase]')) : []
}

// 不依賴 anime：直接清掉行內樣式，確保降級時一定看得到完整圖
function revealAll() {
  phaseTargets().forEach((el) => {
    el.style.opacity = ''
    el.style.transform = ''
  })
}

function showFinal() {
  revealAll()
  currentStep.value = totalSteps
}

function hideAll() {
  utils.set(phaseTargets(), { opacity: 0 })
}

function buildTimeline(): SeqTimeline | null {
  const svg = root.value?.querySelector('svg')
  if (!svg) return null

  // 先隱藏，timeline 才不會讓後面階段的元素提早露臉
  hideAll()

  const timeline = createTimeline({ defaults: { ease: 'outExpo', duration: 500 }, autoplay: false })
  for (let phase = 1; phase <= totalSteps; phase += 1) {
    const group = Array.from(svg.querySelectorAll<SVGElement>(`[data-phase="${phase}"]`))
    if (group.length === 0) continue
    const tag = (el: SVGElement) => el.tagName.toLowerCase()
    const lines = group.filter((el) => tag(el) === 'line')
    const bars = group.filter((el) => el.classList.contains('d-act'))
    const frames = group.filter((el) => tag(el) === 'rect' && !el.classList.contains('d-act'))
    const labels = group.filter((el) => tag(el) === 'text')
    const at: number | string = phase === 1 ? 0 : '+=160'
    let placed = false
    const parallel = () => (placed ? '<' : at)
    if (bars.length > 0) {
      // activation bar：先長出來，再接訊息
      timeline.add(
        bars,
        { opacity: [0, 1], scaleY: [0, 1], transformOrigin: '50% 0%', duration: 450, ease: 'inOutQuad', delay: stagger(MSG_STAGGER) },
        parallel(),
      )
      placed = true
    }
    if (frames.length > 0) {
      // ALT 外框：opacity 淡入
      timeline.add(frames, { opacity: [0, 1], duration: 400, ease: 'outExpo', delay: stagger(MSG_STAGGER) }, parallel())
      placed = true
    }
    if (lines.length > 0) {
      // 線條：依序淡入，一則訊息一則訊息出現
      timeline.add(lines, { opacity: [0, 1], duration: 450, ease: 'outExpo', delay: stagger(MSG_STAGGER) }, parallel())
      placed = true
    }
    if (labels.length > 0) {
      // 標籤：translateY + opacity，節奏與線條一致，會和各自的箭頭配成一對
      timeline.add(
        labels,
        { opacity: [0, 1], translateY: [8, 0], duration: 450, ease: 'outExpo', delay: stagger(MSG_STAGGER) },
        parallel(),
      )
      placed = true
    }
    timeline.call(() => {
      currentStep.value = phase
    })
  }
  return timeline
}

function degrade() {
  try {
    tl?.revert()
  } catch {
    // 降級：忽略 revert 失敗，保持靜態終態
  }
  tl = null
  showFinal()
}

function replay() {
  if (!tl) return
  try {
    currentStep.value = 0
    tl.restart()
  } catch {
    degrade()
  }
}

// 離開畫面：倒回起點並暫停，下次進來可以重播
function rewind() {
  if (!tl) return
  try {
    tl.pause()
    tl.seek(0)
    currentStep.value = 0
  } catch {
    degrade()
  }
}

onMounted(() => {
  // 尊重 prefers-reduced-motion，也涵蓋 PDF 匯出：直接顯示終態
  if (skipMotion()) {
    showFinal()
    return
  }
  try {
    tl = buildTimeline()
    if (!tl) {
      showFinal()
      return
    }
    tl.seek(0)

    if (typeof IntersectionObserver === 'undefined' || !root.value) {
      if (props.autoplay) tl.play()
      return
    }
    // 只有實際看得到才播放。display:none 的預載頁面不算 intersecting，
    // 切換為可見的瞬間才會觸發。
    io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting)
        if (visible) {
          if (props.autoplay) replay()
        } else {
          rewind()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(root.value)
  } catch {
    degrade()
  }
})

onUnmounted(() => {
  io?.disconnect()
  io = null
  try {
    tl?.revert()
  } catch {
    // 降級：忽略 revert 失敗
  }
  tl = null
})
</script>

<template>
  <div ref="root" class="seq-stepped">
    <div class="seq-diagram">
      <svg viewBox="0 0 900 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="b101-seq-title b101-seq-desc">
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

        <!-- lifelines：延伸到 424，涵蓋底部的 409 回應 -->
        <line x1="170" y1="62" x2="170" y2="424" class="d-life"/>
        <line x1="450" y1="62" x2="450" y2="424" class="d-life"/>
        <line x1="730" y1="62" x2="730" y2="424" class="d-life"/>

        <!-- activation bars -->
        <rect x="167" y="96" width="6" height="112" rx="3" class="d-act" data-phase="1"/>
        <rect x="447" y="126" width="6" height="82" rx="3" class="d-act" data-phase="1"/>
        <rect x="727" y="144" width="6" height="30" rx="3" class="d-act" data-phase="1"/>
        <rect x="167" y="260" width="6" height="20" rx="3" class="d-act" data-phase="2"/>
        <rect x="447" y="288" width="6" height="124" rx="3" class="d-act" data-phase="2"/>
        <rect x="727" y="298" width="6" height="24" rx="3" class="d-act" data-phase="2"/>

        <!-- phase 1 : read products -->
        <line x1="176" y1="104" x2="440" y2="104" class="d-req" marker-end="url(#b101-arrow-req)" data-phase="1"/>
        <text x="310" y="96" class="d-lbl d-lbl--acc" data-phase="1">GET /api/products</text>

        <line x1="456" y1="136" x2="720" y2="136" class="d-req" marker-end="url(#b101-arrow-req)" data-phase="1"/>
        <text x="590" y="128" class="d-lbl" data-phase="1">讀取商品清單</text>

        <line x1="720" y1="160" x2="456" y2="160" class="d-res" marker-end="url(#b101-arrow)" data-phase="1"/>
        <text x="590" y="178" class="d-lbl" data-phase="1">商品清單</text>

        <line x1="440" y1="196" x2="176" y2="196" class="d-res" marker-end="url(#b101-arrow)" data-phase="1"/>
        <text x="310" y="214" class="d-lbl" data-phase="1">200 · application/json</text>

        <!-- phase divider -->
        <line x1="104" y1="232" x2="796" y2="232" class="d-rule" data-phase="2"/>
        <text x="104" y="250" class="d-phase" data-phase="2">使用者按下「下單」</text>

        <!-- phase 2 : place order -->
        <line x1="176" y1="268" x2="440" y2="268" class="d-req" marker-end="url(#b101-arrow-req)" data-phase="2"/>
        <text x="310" y="260" class="d-lbl d-lbl--acc" data-phase="2">POST /api/buy · productId + quantity</text>

        <line x1="456" y1="296" x2="720" y2="296" class="d-req" marker-end="url(#b101-arrow-req)" data-phase="2"/>
        <text x="590" y="288" class="d-lbl" data-phase="2">檢查並扣減庫存</text>

        <!-- ALT block -->
        <rect x="140" y="312" width="700" height="114" rx="8" class="d-alt" data-phase="3"/>
        <rect x="140" y="312" width="34" height="14" rx="3" class="d-alt-tab" data-phase="3"/>
        <text x="157" y="322" class="d-alt-tag" data-phase="3">ALT</text>

        <text x="156" y="344" class="d-cond d-cond--ok" data-phase="3">[stock &gt;= quantity]</text>
        <line x1="440" y1="358" x2="176" y2="358" class="d-res d-res--ok" marker-end="url(#b101-arrow-ok)" data-phase="3"/>
        <text x="310" y="350" class="d-lbl d-lbl--ok" data-phase="3">200 · 購買成功</text>

        <line x1="152" y1="376" x2="828" y2="376" class="d-rule d-rule--dashed" data-phase="4"/>

        <text x="156" y="396" class="d-cond d-cond--err" data-phase="4">[stock &lt; quantity]</text>
        <line x1="440" y1="410" x2="176" y2="410" class="d-res d-res--err" marker-end="url(#b101-arrow-err)" data-phase="4"/>
        <text x="310" y="402" class="d-lbl d-lbl--err" data-phase="4">409 · 庫存不足</text>

      </svg>
    </div>
    <div class="seq-controls tc-xs">
      <button type="button" class="seq-replay" @click="replay">重播</button>
      <span class="seq-progress" aria-live="polite">步驟 {{ currentStep }}/{{ totalSteps }}</span>
    </div>
  </div>
</template>

<style scoped>
.seq-stepped {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.seq-diagram {
  display: flex;
  justify-content: center;
  width: 100%;
}

.seq-diagram :deep(svg) {
  /* 確定寬度 + aspect-ratio：fit-content panel 下百分比寬（含 min() 內 %）
     無法解析會掉回內建小尺寸；確定寬 600px 讓 panel 收斂到 600，
     窄螢幕時 max-width:100% 等比縮小 */
  width: 600px;
  max-width: 100%;
  height: auto;
  aspect-ratio: 900 / 440;
  display: block;
}

.seq-diagram text {
  font-family: "Outfit", "PingFang TC", "Noto Sans TC", sans-serif;
}

/* activation bar 以頂端為軸縮放（SVG 需 fill-box） */
.seq-diagram .d-act {
  transform-box: fill-box;
  transform-origin: 50% 0%;
}

/* 播放控制：圖下方置中，僅用既有 tokens */
.seq-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
  font-family: var(--font-mono);
}

.seq-replay {
  font-family: var(--font-mono);
  font-size: inherit;
  line-height: inherit;
  color: var(--accent);
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 2px 12px;
  cursor: pointer;
}

.seq-replay:hover {
  border-color: var(--accent);
}

.seq-replay:focus-visible {
  outline: 1px solid var(--accent);
  outline-offset: 2px;
}

.seq-progress {
  font-variant-numeric: tabular-nums;
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

/* PDF 匯出 / 列印：一律顯示完整終態，隱藏播放控制 */
@media print {
  .seq-controls {
    display: none;
  }
  .seq-diagram svg * {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>