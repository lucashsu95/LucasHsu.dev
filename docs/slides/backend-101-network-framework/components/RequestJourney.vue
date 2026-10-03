<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { createTimeline, stagger } from 'animejs'

// 「從瀏覽器到伺服器」5 步驟自動播放：頂部三節點拓撲（瀏覽器 ⇄ DNS ⇄ 伺服器）
// 封包按步驟在節點間飛行（只用固定 viewBox 座標的 translateX + opacity），
// 拓撲帶下方單行「傳送字幕」同步顯示當下誰傳了什麼給誰，被飛行方向對應的連線同步亮起，
// 下方 5 步驟清單同步高亮；載入失敗或 reduced-motion 時降級為靜態終態。
// 5 步驟文案、飛行路徑與時序沿用原文，一字未改。

const props = withDefaults(defineProps<{ autoplay?: boolean }>(), { autoplay: true })

type RjTimeline = ReturnType<typeof createTimeline>

const root = ref<HTMLElement | null>(null)
const currentStep = ref(0)
const totalSteps = 5
let tl: RjTimeline | null = null

// 傳送字幕：隨封包飛行同步切換（單行、JS 字串集中定義方便改詞）
// 索引：0 step1；1 step2 去程；2 step2 回程；3-5 step3 三腿；6 step4；7 step5
const STEPS_CAPTIONS = [
  '01 · 你在瀏覽器輸入網址，按 Enter',
  '02 · 瀏覽器 → DNS：請問「lucashsu.dev」的 IP？',
  '02 · DNS → 瀏覽器：是 140.82.121.4',
  '03 · 瀏覽器 → 伺服器：SYN（可以連嗎）',
  '03 · 伺服器 → 瀏覽器：SYN+ACK（可以）',
  '03 · 瀏覽器 → 伺服器：ACK（好，連上了）',
  '04 · 瀏覽器 → 伺服器：GET /index.html',
  '05 · 伺服器 → 瀏覽器：200 OK + HTML',
] as const
const captionIdx = ref(0)
// 方向線高亮只動 opacity：dim 維持、hi 提到 1；字幕淡入淡出只動 opacity 150ms
const LINK_DIM = 0.35
const LINK_HI = 1
const CAP_FADE = 150

// 拓撲固定座標（viewBox 600x112）：三節點中心 x，不逐幀量測、不追蹤 DOM
const NODE_X = { browser: 85, dns: 300, server: 515 }
const DX_DNS = NODE_X.dns - NODE_X.browser // 215
const DX_SERVER = NODE_X.server - NODE_X.browser // 430

function reduceMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

// 靜態終態：全部步驟 + 三節點高亮 + 5/5（.is-static 把 wash / node-hi 顯示、封包隱藏）
// reduced-motion / print 一律停在 step5 字幕
function showStatic() {
  currentStep.value = totalSteps
  captionIdx.value = STEPS_CAPTIONS.length - 1
  root.value?.classList.add('is-static')
}

function buildTimeline(): RjTimeline | null {
  const packet = root.value?.querySelector<SVGGElement>('.rj-pkt')
  const pktA = root.value?.querySelector<SVGCircleElement>('.pkt-a')
  const pktB = root.value?.querySelector<SVGCircleElement>('.pkt-b')
  const hiBrowser = root.value?.querySelector<SVGRectElement>('.rj-node[data-node="browser"] .rj-node-hi')
  const hiDns = root.value?.querySelector<SVGRectElement>('.rj-node[data-node="dns"] .rj-node-hi')
  const hiServer = root.value?.querySelector<SVGRectElement>('.rj-node[data-node="server"] .rj-node-hi')
  const steps = root.value ? Array.from(root.value.querySelectorAll<HTMLElement>('.tc-step')) : []
  const washes = steps.map((el) => el.querySelector('.rj-wash'))
  const capEl = root.value?.querySelector<HTMLElement>('.rj-cap__t')
  const linkEls = root.value ? Array.from(root.value.querySelectorAll<SVGLineElement>('.rj-link')) : []
  if (!packet || !pktA || !pktB || !hiBrowser || !hiDns || !hiServer) return null
  if (steps.length !== totalSteps || washes.some((w) => !w)) return null
  if (!capEl || linkEls.length !== 2) return null
  const wash = washes as Element[]
  const [linkBD, linkDS] = linkEls
  // 節點高亮只用 opacity；封包只用 transform（translateX / scale）+ opacity；ease 沿用 outExpo
  const timeline = createTimeline({ defaults: { ease: 'outExpo', duration: 500 }, autoplay: false })
  // 字幕切換 + 方向線高亮：只動 opacity，時間錨點為絕對 ms（推導表見 CAP_ANCHORS）
  function setCap(i: number) {
    captionIdx.value = i
  }
  // i=0 為起手字幕且不做淡入：autoplay=false 或 seek(0) 時字幕仍需可見
  function capAt(i: number, at: number) {
    timeline.call(() => setCap(i), at)
    if (i === 0) return
    timeline.add(capEl as Element, { opacity: [0, 1], duration: CAP_FADE, ease: 'outExpo' }, at)
  }
  function linksAt(bd: number, ds: number, at: number) {
    timeline.add(linkBD, { opacity: [bd, bd], duration: 300, ease: 'outExpo' }, at)
    timeline.add(linkDS, { opacity: [ds, ds], duration: 300, ease: 'outExpo' }, at)
  }

  // step 1 輸入網址：封包在「瀏覽器」節點內 pulse（scale / opacity）
  timeline.add(wash[0], { opacity: [0, 1], duration: 500, ease: 'outExpo', delay: stagger(70) }, 0)
  timeline.add(hiBrowser, { opacity: [0, 1], duration: 400, ease: 'outExpo' }, '<')
  timeline.add(packet, { scale: [1, 1.6], duration: 280, ease: 'outExpo' }, '<')
  timeline.add(packet, { scale: [1.6, 1], duration: 260, ease: 'outExpo' })
  timeline.call(() => {
    currentStep.value = 1
  })

  // step 2 DNS 查詢：去程 450ms → 停一拍 → 回程 450ms
  timeline.add(wash[1], { opacity: [0, 1], duration: 500, ease: 'outExpo', delay: stagger(70) }, '+=200')
  timeline.add(hiDns, { opacity: [0, 1], duration: 400, ease: 'outExpo' }, '<')
  timeline.add(packet, { translateX: [0, DX_DNS], duration: 450, ease: 'outExpo' }, '<')
  timeline.add(packet, { translateX: [DX_DNS, 0], duration: 450, ease: 'outExpo' }, '+=300')
  timeline.call(() => {
    currentStep.value = 2
  })

  // step 3 連線：瀏覽器 ↔ 伺服器快速來回 3 次（模擬三次握手，每腿 200ms）
  timeline.add(wash[2], { opacity: [0, 1], duration: 500, ease: 'outExpo', delay: stagger(70) }, '+=200')
  timeline.add(hiServer, { opacity: [0, 1], duration: 400, ease: 'outExpo' }, '<')
  let pos = 0
  const legs = [DX_SERVER, 0, DX_SERVER, 0, DX_SERVER, 0]
  legs.forEach((to, idx) => {
    const from = pos
    pos = to
    // 首腿與節點高亮並行，其餘腿依序銜接
    if (idx === 0) {
      timeline.add(packet, { translateX: [from, to], duration: 200, ease: 'outExpo' }, '<')
    } else {
      timeline.add(packet, { translateX: [from, to], duration: 200, ease: 'outExpo' })
    }
  })
  timeline.call(() => {
    currentStep.value = 3
  })

  // step 4 送請求：封包瀏覽器 → 伺服器（去程 450ms）
  timeline.add(wash[3], { opacity: [0, 1], duration: 500, ease: 'outExpo', delay: stagger(70) }, '+=200')
  timeline.add(packet, { translateX: [0, DX_SERVER], duration: 450, ease: 'outExpo' }, '<')
  timeline.call(() => {
    currentStep.value = 4
  })

  // step 5 收回應：封包伺服器 → 瀏覽器（回程 450ms，換 ok 色）+ 瀏覽器節點閃一下
  timeline.add(wash[4], { opacity: [0, 1], duration: 500, ease: 'outExpo', delay: stagger(70) }, '+=200')
  timeline.add(pktB, { opacity: [0, 1], duration: 300, ease: 'outExpo' }, '<')
  timeline.add(pktA, { opacity: [1, 0.25], duration: 300, ease: 'outExpo' }, '<')
  timeline.add(packet, { translateX: [DX_SERVER, 0], duration: 450, ease: 'outExpo' }, '<')
  timeline.add(hiBrowser, { opacity: [1, 0.25], duration: 120, ease: 'outExpo' })
  timeline.add(hiBrowser, { opacity: [0.25, 1], duration: 180, ease: 'outExpo' })
  timeline.call(() => {
    currentStep.value = 5
  })
  timeline.call(() => {
    currentStep.value = totalSteps
  })

  // 字幕 / 方向線錨點：at = 對應既有封包 add 解析後的實際起點（ms）
  //   0 = step1 起手 · 2540 = step2 去程 · 3290 = step2 回程
  //   4840 / 5040 / 5240 = step3 三腿 · 6740 = step4 · 8490 = step5
  // 注意：anime v4 的 '<' 是「上一個 child 的結束」（v3 才是開始），故時序為序列化，
  // 實測總長 9240ms。以上數字由 node + animejs 4.5.0 逐一 seek 量測，非手推。
  // bd = 瀏覽器⇄DNS 線、ds = DNS⇄伺服器線；只有 step2 是單段飛行，故只有它把另一段留在 dim，
  // step3 之後封包橫跨整條拓撲，兩段同時亮
  const CAP_ANCHORS = [
    { at: 0, i: 0, bd: LINK_DIM, ds: LINK_DIM },
    { at: 2540, i: 1, bd: LINK_HI, ds: LINK_DIM },
    { at: 3290, i: 2, bd: LINK_HI, ds: LINK_DIM },
    { at: 4840, i: 3, bd: LINK_HI, ds: LINK_HI },
    { at: 5040, i: 4, bd: LINK_HI, ds: LINK_HI },
    { at: 5240, i: 5, bd: LINK_HI, ds: LINK_HI },
    { at: 6740, i: 6, bd: LINK_HI, ds: LINK_HI },
    { at: 8490, i: 7, bd: LINK_HI, ds: LINK_HI },
  ]
  // 一律追加在既有 add 之後：anime v4 的相對 position 於 add 當下即解析，
  // 事後追加的子動畫只帶絕對位置，故完全不影響上方既有時序與總長（仍為 4940ms）。
  for (const a of CAP_ANCHORS) {
    capAt(a.i, a.at)
    linksAt(a.bd, a.ds, a.at)
  }
  return timeline
}

function replay() {
  if (!tl) return
  try {
    currentStep.value = 0
    captionIdx.value = 0
    tl.restart()
  } catch {
    try {
      tl.revert()
    } catch {
      // 降級：忽略 revert 失敗，保持靜態終態
    }
    tl = null
    showStatic()
  }
}

onMounted(() => {
  // 尊重 prefers-reduced-motion：直接顯示終態
  if (reduceMotion()) {
    showStatic()
    return
  }
  try {
    tl = buildTimeline()
    if (!tl) {
      showStatic()
      return
    }
    // timeline 初始化即套用起始影格（不經 CSS 隱藏，避免動畫被抑制時空白）
    tl.seek(0)
    if (props.autoplay) tl.play()
  } catch {
    try {
      tl?.revert()
    } catch {
      // 降級：忽略 revert 失敗，保持靜態終態
    }
    tl = null
    showStatic()
  }
})

onUnmounted(() => {
  try {
    tl?.revert()
  } catch {
    // 降級：忽略 revert 失敗
  }
  tl = null
})
</script>

<template>
  <div ref="root" class="rj">
    <div class="rj-topo">
      <svg viewBox="0 0 600 112" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="rj-topo-title rj-topo-desc">
        <title id="rj-topo-title">請求旅程拓撲：瀏覽器、DNS、伺服器</title>
        <desc id="rj-topo-desc">封包從瀏覽器出發，經 DNS 查到 IP、與伺服器握手連線、送出請求，最後收回伺服器的回應。</desc>
        <!-- 節點間連線 -->
        <line x1="85" y1="70" x2="300" y2="70" class="rj-link" />
        <line x1="300" y1="70" x2="515" y2="70" class="rj-link" />
        <!-- 節點到軌道的短垂線 -->
        <line x1="85" y1="38" x2="85" y2="70" class="rj-drop" />
        <line x1="300" y1="38" x2="300" y2="70" class="rj-drop" />
        <line x1="515" y1="38" x2="515" y2="70" class="rj-drop" />
        <!-- 三節點 pills -->
        <g class="rj-node rj-node--acc" data-node="browser">
          <rect class="rj-pill" x="30" y="12" width="110" height="26" rx="13" />
          <rect class="rj-node-hi" x="30" y="12" width="110" height="26" rx="13" />
          <text x="85" y="29">瀏覽器</text>
        </g>
        <g class="rj-node" data-node="dns">
          <rect class="rj-pill" x="245" y="12" width="110" height="26" rx="13" />
          <rect class="rj-node-hi" x="245" y="12" width="110" height="26" rx="13" />
          <text x="300" y="29">DNS</text>
        </g>
        <g class="rj-node" data-node="server">
          <rect class="rj-pill" x="460" y="12" width="110" height="26" rx="13" />
          <rect class="rj-node-hi" x="460" y="12" width="110" height="26" rx="13" />
          <text x="515" y="29">伺服器</text>
        </g>
        <!-- 封包：只用 transform（translateX / scale）+ opacity 移動 -->
        <g class="rj-pkt">
          <circle class="pkt-halo" cx="85" cy="70" r="9" />
          <circle class="pkt-a" cx="85" cy="70" r="5" />
          <circle class="pkt-b" cx="85" cy="70" r="5" />
        </g>
      </svg>
    </div>
    <div class="rj-cap tc-xs">
      <span class="rj-cap__t">{{ STEPS_CAPTIONS[captionIdx] }}</span>
      <span class="rj-cap__p">{{ STEPS_CAPTIONS[STEPS_CAPTIONS.length - 1] }}</span>
    </div>
    <div class="rj-body">
      <div class="tc-steps">
        <div class="tc-step" data-step="1"><span class="rj-wash" aria-hidden="true" /><div class="tc-step__b">
          <div class="tc-step__t">輸入網址</div>
          <div class="tc-step__d">你在瀏覽器打 <code>lucashsu.dev</code>，按 Enter</div>
        </div></div>
        <div class="tc-step" data-step="2"><span class="rj-wash" aria-hidden="true" /><div class="tc-step__b">
          <div class="tc-step__t">DNS 查詢</div>
          <div class="tc-step__d">問 DNS 伺服器：「<code>lucashsu.dev</code> 的 IP 是多少？」→ <code>140.82.121.4</code></div>
        </div></div>
        <div class="tc-step" data-step="3"><span class="rj-wash" aria-hidden="true" /><div class="tc-step__b">
          <div class="tc-step__t">連線</div>
          <div class="tc-step__d">TCP 三次握手，建立到 <code>140.82.121.4:443</code> 的連線</div>
        </div></div>
        <div class="tc-step" data-step="4"><span class="rj-wash" aria-hidden="true" /><div class="tc-step__b">
          <div class="tc-step__t">送請求</div>
          <div class="tc-step__d">送出 HTTP 請求：<code>GET /index.html HTTP/1.1</code></div>
        </div></div>
        <div class="tc-step" data-step="5"><span class="rj-wash" aria-hidden="true" /><div class="tc-step__b">
          <div class="tc-step__t">收回應</div>
          <div class="tc-step__d">伺服器回 <code class="tc-ok">200 OK</code> + HTML，瀏覽器畫出來</div>
        </div></div>
      </div>
    </div>
    <div class="seq-controls tc-xs">
      <button type="button" class="seq-replay" @click="replay">重播</button>
      <span class="seq-progress" aria-live="polite">步驟 {{ currentStep }}/{{ totalSteps }}</span>
    </div>
  </div>
</template>

<style scoped>
.rj {
  width: 100%;
}

.rj-body {
  position: relative;
}

/* 頂部拓撲帶：viewBox 600x112，全寬 600px 等比縮放，約 110px 高（維持原設定，未因字幕而壓縮） */
.rj-topo {
  display: flex;
  justify-content: center;
  width: 100%;
}

.rj-topo svg {
  width: 600px;
  max-width: 100%;
  height: auto;
  aspect-ratio: 600 / 112;
  display: block;
}

.rj-topo text {
  font-family: var(--font-mono);
}

/* 傳送字幕：拓撲帶與步驟列之間的單行 caption（mono / tc-xs / accent-2，上下 --line hairline）
   只動 opacity 淡入，不動任何 layout 屬性 */
.rj-cap {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 2px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono);
  color: var(--accent-2);
}

.rj-cap__t {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* 僅供列印 / PDF：固定顯示 step5 字幕，不受動畫時間影響 */
.rj-cap__p {
  display: none;
}

/* 節點間連線與垂線：1px hairline，只用既有 --line */
.rj-link,
.rj-drop {
  stroke: var(--line);
  stroke-width: 1;
}

/* 連線預設 dim；被飛行方向對應的那一段由 timeline 提到 1 */
.rj-link {
  opacity: 0.35;
}

/* 節點 pills：accent / neutral 配色（只用 --accent / --line / --accent-wash） */
.rj-node .rj-pill {
  fill: none;
  stroke: var(--line);
  stroke-width: 1;
}

.rj-node--acc .rj-pill {
  stroke: var(--accent);
  fill: var(--accent-wash);
}

.rj-node text {
  fill: var(--accent);
  opacity: 0.6;
  font-size: 12px;
  font-weight: 500;
  text-anchor: middle;
  letter-spacing: 0.01em;
}

.rj-node--acc text {
  fill: var(--accent);
  opacity: 1;
}

/* 節點高亮：只動 opacity 的 accent wash 疊層 */
.rj-node-hi {
  fill: var(--accent-wash);
  stroke: var(--accent);
  stroke-width: 1;
  opacity: 0;
}

/* 封包：請求 accent 色、回應 ok 色（只用 opacity 交叉淡入淡出）；靜態 halo 不參演 */
.rj-pkt {
  transform-box: fill-box;
  transform-origin: center;
}

.pkt-a {
  fill: var(--accent);
}

.pkt-b {
  fill: var(--ok);
  opacity: 0;
}

.pkt-halo {
  fill: none;
  stroke: var(--accent);
  stroke-width: 1;
  opacity: 0.3;
}

/* 步驟列：padding 只降不加（7px → 4px），標題與說明併為同一列，壓住垂直預算 */
.rj .tc-step {
  padding-top: 4px;
  padding-bottom: 4px;
}

.tc-step__b {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 8px;
  row-gap: 2px;
  min-width: 0;
}

.tc-step__b .tc-step__t {
  white-space: nowrap;
}

/* 步驟高亮：與 .tc-rowline:hover 同系的左側 accent wash，只動 opacity */
.rj-wash {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--accent-wash), transparent 62%);
  opacity: 0;
  pointer-events: none;
}

/* 靜態終態（降級 / reduced-motion）：全部高亮（三節點全亮），封包隱藏 */
.rj.is-static .rj-wash,
.rj.is-static .rj-node-hi {
  opacity: 1;
}

/* 降級路徑可能已寫入 inline opacity，字幕一律拉回可見（文案已由 showStatic 設為 step5） */
.rj.is-static .rj-cap__t {
  opacity: 1;
}

.rj.is-static .rj-pkt {
  display: none;
}

/* 播放控制：沿用 SequenceDiagram.vue 的 .seq-controls 模式，僅用既有 tokens */
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

/* PDF 匯出 / 列印：一律顯示完整終態（三節點全亮、封包隱藏），隱藏播放控制 */
@media print {
  .seq-controls,
  .rj-pkt,
  .rj-cap__t {
    display: none;
  }
  .rj-cap__p {
    display: block;
  }
  .rj .tc-step,
  .rj-wash,
  .rj-node-hi {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
