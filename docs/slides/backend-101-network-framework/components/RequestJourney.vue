<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { animate } from 'animejs'

// 「從瀏覽器到伺服器」互動版：
// - 上方 5 步驟 stepper 可點擊跳轉；下方可暫停 / 上一步 / 下一步 / 重播
// - 中間拓撲：瀏覽器、DNS、伺服器三個節點，封包是帶文字的小膠囊，沿軌道飛行
// - 下方左卡說明這一步在做什麼，右卡顯示這一步真正傳的內容（網址列、DNS 紀錄、握手、HTTP 原文）
// - 不再用單一條 9 秒的 timeline，而是「狀態機 + 逐步播放」，所以可以隨時暫停、跳步、重播
// - 投影片實際出現在畫面上才開始播放（IntersectionObserver），離開時回到待機
// - prefers-reduced-motion / 列印：直接顯示第 5 步終態

const props = withDefaults(defineProps<{ autoplay?: boolean }>(), { autoplay: true })

type NodeId = 'browser' | 'dns' | 'server'
type Tone = 'req' | 'ok'
interface Flight { from: NodeId; to: NodeId; label: string; tone: Tone }
interface StepDef { title: string; nodes: NodeId[]; links: Array<'bd' | 'ds'>; flights: Flight[] }

const URL_TEXT = 'lucashsu.dev'
const totalSteps = 5

// 拓撲固定座標（viewBox 900x132）
const NODE_X: Record<NodeId, number> = { browser: 110, dns: 450, server: 790 }
const TRACK_Y = 98

const NODES: Array<{ id: NodeId; name: string; sub: string }> = [
  { id: 'browser', name: '瀏覽器', sub: '你的電腦' },
  { id: 'dns', name: 'DNS', sub: '查 IP 的服務' },
  { id: 'server', name: '伺服器', sub: '提供網頁的機器' },
]

const STEPS: StepDef[] = [
  { title: '輸入網址', nodes: ['browser'], links: [], flights: [] },
  {
    title: 'DNS 查詢',
    nodes: ['browser', 'dns'],
    links: ['bd'],
    flights: [
      { from: 'browser', to: 'dns', label: 'A? lucashsu.dev', tone: 'req' },
      { from: 'dns', to: 'browser', label: '140.82.121.4', tone: 'ok' },
    ],
  },
  {
    title: '連線',
    nodes: ['browser', 'server'],
    links: ['bd', 'ds'],
    flights: [
      { from: 'browser', to: 'server', label: 'SYN', tone: 'req' },
      { from: 'server', to: 'browser', label: 'SYN+ACK', tone: 'ok' },
      { from: 'browser', to: 'server', label: 'ACK', tone: 'req' },
    ],
  },
  {
    title: '送請求',
    nodes: ['browser', 'server'],
    links: ['bd', 'ds'],
    flights: [{ from: 'browser', to: 'server', label: 'GET /index.html', tone: 'req' }],
  },
  {
    title: '收回應',
    nodes: ['browser', 'server'],
    links: ['bd', 'ds'],
    flights: [{ from: 'server', to: 'browser', label: '200 OK + HTML', tone: 'ok' }],
  },
]

const root = ref<HTMLElement | null>(null)
const pktEl = ref<SVGGElement | null>(null)

const step = ref(0) // 0 = 待機，1..5 = 目前步驟
const legs = ref(0) // 目前步驟已出發的封包數，用來逐行顯示右卡內容
const typed = ref(0) // 網址列已打出的字數
const landed = ref(false) // 目前步驟的封包是否已抵達
const pulse = ref(false)
const playing = ref(false)
const pkt = reactive({ label: '', tone: 'req' as Tone, vis: false })

let runId = 0
let cur: ReturnType<typeof animate> | null = null
let settleCur: (() => void) | null = null
let animateOK = true
let io: IntersectionObserver | null = null

const activeNodes = computed<NodeId[]>(() => (step.value > 0 ? STEPS[step.value - 1].nodes : []))
const activeLinks = computed(() => (step.value > 0 ? STEPS[step.value - 1].links : []))
const progress = computed(() => step.value / totalSteps)

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

function skipMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('print').matches
  )
}

// 停掉目前飛行中的封包；先讓 runId 失效，等待中的 async 流程醒來後會自行退出
function halt(): number {
  runId += 1
  try {
    cur?.pause()
  } catch {
    // 忽略
  }
  cur = null
  settleCur?.()
  settleCur = null
  return runId
}

// 不播動畫，直接顯示第 n 步完成後的樣子
function settle(n: number) {
  const def = STEPS[n - 1]
  step.value = n
  legs.value = def.flights.length
  typed.value = URL_TEXT.length
  pulse.value = false
  landed.value = true
  const last = def.flights[def.flights.length - 1]
  if (last && pktEl.value) {
    pkt.label = last.label
    pkt.tone = last.tone
    pkt.vis = true
    pktEl.value.style.transform = `translateX(${NODE_X[last.to]}px)`
  } else {
    pkt.vis = false
  }
}

function fly(f: Flight): Promise<void> {
  return new Promise<void>((resolve) => {
    const el = pktEl.value
    pkt.label = f.label
    pkt.tone = f.tone
    pkt.vis = true
    if (!el) {
      resolve()
      return
    }
    settleCur = resolve
    const dist = Math.abs(NODE_X[f.to] - NODE_X[f.from])
    cur = animate(el, {
      translateX: [NODE_X[f.from], NODE_X[f.to]],
      duration: Math.max(420, dist * 1.9),
      ease: 'inOutQuad',
      onComplete: () => {
        settleCur = null
        resolve()
      },
    })
  })
}

async function playStep(n: number, id: number) {
  const def = STEPS[n - 1]
  step.value = n
  legs.value = 0
  landed.value = false
  pulse.value = false
  pkt.vis = false
  typed.value = n === 1 ? 0 : URL_TEXT.length

  if (!animateOK) {
    settle(n)
    return
  }

  if (n === 1) {
    pulse.value = true
    for (let i = 1; i <= URL_TEXT.length; i += 1) {
      typed.value = i
      await sleep(55)
      if (id !== runId) return
    }
    await sleep(350)
    if (id !== runId) return
    pulse.value = false
    landed.value = true
    return
  }

  for (let i = 0; i < def.flights.length; i += 1) {
    legs.value = i + 1
    await fly(def.flights[i])
    if (id !== runId) return
    if (i < def.flights.length - 1) {
      await sleep(180)
      if (id !== runId) return
    }
  }
  landed.value = true
}

async function play(from?: number) {
  const id = halt()
  playing.value = true
  let n = from ?? (step.value === 0 || step.value >= totalSteps ? 1 : step.value)
  for (; n <= totalSteps; n += 1) {
    await playStep(n, id)
    if (id !== runId) return
    await sleep(animateOK ? 750 : 1400)
    if (id !== runId) return
  }
  playing.value = false
}

function pause() {
  halt()
  playing.value = false
  if (step.value > 0) settle(step.value)
}

async function goTo(n: number) {
  const target = Math.min(totalSteps, Math.max(1, n))
  const id = halt()
  playing.value = false
  await playStep(target, id)
}

function toggle() {
  if (playing.value) pause()
  else void play()
}

function replay() {
  void play(1)
}

function resetIdle() {
  halt()
  playing.value = false
  step.value = 0
  legs.value = 0
  typed.value = 0
  landed.value = false
  pulse.value = false
  pkt.vis = false
}

onMounted(() => {
  if (skipMotion()) {
    animateOK = false
    settle(totalSteps)
    return
  }
  if (typeof IntersectionObserver === 'undefined' || !root.value) {
    if (props.autoplay) replay()
    return
  }
  // Slidev 會預先掛載相鄰頁面；只有真的看得到才開始播，離開就回到待機
  io = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((e) => e.isIntersecting)
      if (visible) {
        if (props.autoplay) replay()
      } else {
        resetIdle()
      }
    },
    { threshold: 0.5 },
  )
  io.observe(root.value)
})

onUnmounted(() => {
  io?.disconnect()
  io = null
  halt()
})
</script>

<template>
  <div ref="root" class="jr">
    <!-- 步驟列 -->
    <div class="jr-steps" role="tablist" aria-label="請求旅程的五個步驟">
      <button
        v-for="(s, i) in STEPS"
        :key="s.title"
        type="button"
        role="tab"
        class="jr-chip"
        :class="{ 'is-cur': step === i + 1, 'is-done': step > i + 1 }"
        :aria-selected="step === i + 1"
        @click="goTo(i + 1)"
      >
        <span class="jr-chip__n">{{ i + 1 }}</span>
        <span class="jr-chip__t">{{ s.title }}</span>
      </button>
    </div>
    <div class="jr-bar" aria-hidden="true"><i :style="{ transform: `scaleX(${progress})` }" /></div>

    <!-- 拓撲 -->
    <div class="jr-stage">
      <svg viewBox="0 0 900 132" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="jr-t jr-d">
        <title id="jr-t">請求旅程拓撲：瀏覽器、DNS、伺服器</title>
        <desc id="jr-d">封包從瀏覽器出發，經 DNS 查到 IP、與伺服器握手連線、送出請求，最後收回伺服器的回應。</desc>

        <line :x1="NODE_X.browser" :y1="TRACK_Y" :x2="NODE_X.dns" :y2="TRACK_Y" class="jr-link" :class="{ 'is-hi': activeLinks.includes('bd') }" />
        <line :x1="NODE_X.dns" :y1="TRACK_Y" :x2="NODE_X.server" :y2="TRACK_Y" class="jr-link" :class="{ 'is-hi': activeLinks.includes('ds') }" />

        <g v-for="n in NODES" :key="n.id" class="jr-node" :class="{ 'is-on': activeNodes.includes(n.id), 'is-pulse': pulse && n.id === 'browser' }">
          <line :x1="NODE_X[n.id]" y1="62" :x2="NODE_X[n.id]" :y2="TRACK_Y" class="jr-drop" />
          <circle :cx="NODE_X[n.id]" :cy="TRACK_Y" r="3.5" class="jr-dot" />
          <rect class="jr-card-bg" :x="NODE_X[n.id] - 84" y="6" width="168" height="56" rx="10" />
          <g :transform="`translate(${NODE_X[n.id] - 66} 23)`" class="jr-ico">
            <template v-if="n.id === 'browser'">
              <rect x="0" y="0" width="22" height="17" rx="3" />
              <line x1="0" y1="5" x2="22" y2="5" />
              <circle cx="3.5" cy="2.5" r="0.8" />
            </template>
            <template v-else-if="n.id === 'dns'">
              <circle cx="11" cy="9" r="8" />
              <ellipse cx="11" cy="9" rx="3.6" ry="8" />
              <line x1="3" y1="9" x2="19" y2="9" />
            </template>
            <template v-else>
              <rect x="0" y="0" width="22" height="7" rx="1.8" />
              <rect x="0" y="10" width="22" height="7" rx="1.8" />
              <circle cx="4.5" cy="3.5" r="1" />
              <circle cx="4.5" cy="13.5" r="1" />
            </template>
          </g>
          <text :x="NODE_X[n.id] - 30" y="30" class="jr-node__t">{{ n.name }}</text>
          <text :x="NODE_X[n.id] - 30" y="47" class="jr-node__s">{{ n.sub }}</text>
        </g>

        <!-- 封包：外層 g 只交給 anime 動 transform，內層 g 由 Vue 控制顯示 -->
        <g ref="pktEl" class="jr-pkt">
          <g class="jr-pkt__in" :class="[pkt.tone === 'ok' ? 'is-ok' : 'is-req', { 'is-vis': pkt.vis }]">
            <rect x="-66" :y="TRACK_Y - 13" width="132" height="26" rx="13" />
            <text x="0" :y="TRACK_Y + 4">{{ pkt.label }}</text>
          </g>
        </g>
      </svg>
    </div>

    <!-- 說明與內容 -->
    <div class="jr-cards">
      <div class="jr-card">
        <div class="jr-card__k">這一步在做什麼</div>
        <div v-if="step === 0" class="jr-desc">看一個請求從瀏覽器出發、到收到網頁的完整旅程。<span class="jr-mute">按「播放」，或直接點上面的步驟。</span></div>
        <div v-else-if="step === 1" class="jr-desc">
          你在瀏覽器打 <code>lucashsu.dev</code>，按 Enter
          <span class="jr-mute">像在手機通訊錄裡輸入朋友的名字。</span>
        </div>
        <div v-else-if="step === 2" class="jr-desc">
          問 DNS 伺服器：「<code>lucashsu.dev</code> 的 IP 是多少？」→ <code>140.82.121.4</code>
          <span class="jr-mute">名字換成電話號碼。</span>
        </div>
        <div v-else-if="step === 3" class="jr-desc">
          TCP 三次握手，建立到 <code>140.82.121.4:443</code> 的連線
          <span class="jr-mute">先確認對方有接電話：喂？有。好。</span>
          <span class="jr-mute">443 是 HTTPS，實際上後面還會多一輪 TLS 加密握手，這裡先略過。</span>
        </div>
        <div v-else-if="step === 4" class="jr-desc">
          送出 HTTP 請求：<code>GET /index.html HTTP/1.1</code>
          <span class="jr-mute">連上之後，開口說你要什麼。</span>
        </div>
        <div v-else class="jr-desc">
          伺服器回 <code class="jr-ok">200 OK</code> + HTML，瀏覽器畫出來
          <span class="jr-mute">對方把東西遞過來，你拆開看。</span>
        </div>
      </div>

      <div class="jr-card">
        <div class="jr-card__k">這一步真正傳的內容</div>
        <div :key="step" class="jr-code">
          <template v-if="step === 0">
            <div class="jr-ln on"><span class="jr-dim">// 還沒開始</span></div>
          </template>

          <template v-else-if="step === 1">
            <div class="jr-ln on"><span class="jr-k">網址列</span><span>https://{{ URL_TEXT.slice(0, typed) }}<i v-if="pulse" class="jr-caret" /></span></div>
            <div class="jr-ln" :class="{ on: typed >= URL_TEXT.length }"><span class="jr-k">狀態</span><span>還沒有任何封包離開你的電腦</span></div>
          </template>

          <template v-else-if="step === 2">
            <div class="jr-ln" :class="{ on: legs >= 1 }"><span class="jr-k jr-k--req">問</span><span>lucashsu.dev 的 A 紀錄是？</span></div>
            <div class="jr-ln" :class="{ on: legs >= 2 }"><span class="jr-k jr-k--ok">答</span><span>140.82.121.4</span></div>
          </template>

          <template v-else-if="step === 3">
            <div class="jr-ln" :class="{ on: legs >= 1 }"><span class="jr-k jr-k--req">SYN</span><span>瀏覽器 → 伺服器　可以連嗎</span></div>
            <div class="jr-ln" :class="{ on: legs >= 2 }"><span class="jr-k jr-k--ok">SYN+ACK</span><span>伺服器 → 瀏覽器　可以</span></div>
            <div class="jr-ln" :class="{ on: legs >= 3 }"><span class="jr-k jr-k--req">ACK</span><span>瀏覽器 → 伺服器　好，連上了</span></div>
          </template>

          <template v-else-if="step === 4">
            <div class="jr-ln" :class="{ on: legs >= 1 }" style="--d: 0ms"><span class="jr-m">GET /index.html HTTP/1.1</span></div>
            <div class="jr-ln" :class="{ on: legs >= 1 }" style="--d: 120ms"><span class="jr-m">Host: lucashsu.dev</span></div>
            <div class="jr-ln" :class="{ on: legs >= 1 }" style="--d: 240ms"><span class="jr-m">Accept: text/html</span></div>
          </template>

          <template v-else>
            <div class="jr-resp">
              <div class="jr-resp__raw">
                <div class="jr-ln" :class="{ on: legs >= 1 }" style="--d: 0ms"><span class="jr-m jr-ok">HTTP/1.1 200 OK</span></div>
                <div class="jr-ln" :class="{ on: legs >= 1 }" style="--d: 120ms"><span class="jr-m">Content-Type: text/html</span></div>
                <div class="jr-ln" :class="{ on: landed }" style="--d: 0ms"><span class="jr-m">&lt;html&gt; ... &lt;/html&gt;</span></div>
              </div>
              <div class="jr-page" :class="{ on: landed }" aria-hidden="true">
                <i class="jr-page__bar" />
                <i class="jr-page__h" />
                <i class="jr-page__l" />
                <i class="jr-page__l" />
                <i class="jr-page__l jr-page__l--s" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 控制 -->
    <div class="jr-ctl tc-xs">
      <button type="button" class="jr-btn" :disabled="step <= 1" @click="goTo(step - 1)">上一步</button>
      <button type="button" class="jr-btn jr-btn--main" @click="toggle">{{ playing ? '暫停' : '播放' }}</button>
      <button type="button" class="jr-btn" :disabled="step >= totalSteps" @click="goTo(step + 1)">下一步</button>
      <button type="button" class="jr-btn" @click="replay">重播</button>
      <span class="jr-progress" aria-live="polite">步驟 {{ step }}/{{ totalSteps }}</span>
    </div>
  </div>
</template>

<style scoped>
.jr {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
}

/* 步驟列 */
.jr-steps {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.jr-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  font: inherit;
  font-size: 12.5px;
  color: var(--fg-3);
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 999px;
  cursor: pointer;
  transition: color 0.25s, border-color 0.25s, background 0.25s;
}

.jr-chip:hover { border-color: var(--line-2); }
.jr-chip:focus-visible { outline: 1px solid var(--accent); outline-offset: 2px; }

.jr-chip__n {
  display: grid;
  place-items: center;
  flex: none;
  width: 18px;
  height: 18px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  border: 1px solid currentColor;
  border-radius: 50%;
}

.jr-chip__t { white-space: nowrap; }
.jr-chip.is-done { color: var(--fg-2); border-color: var(--accent-line); }
.jr-chip.is-cur { color: var(--accent-2); border-color: var(--accent); background: var(--accent-wash); }

.jr-bar {
  height: 2px;
  background: var(--line);
  border-radius: 2px;
  overflow: hidden;
}

.jr-bar i {
  display: block;
  height: 100%;
  background: var(--accent);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 拓撲 */
.jr-stage svg {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 900 / 132;
}

.jr-link {
  stroke: var(--line-2);
  stroke-width: 1.2;
  stroke-dasharray: 3 6;
  transition: stroke 0.3s, opacity 0.3s;
  opacity: 0.55;
}
.jr-link.is-hi { stroke: var(--accent); opacity: 0.9; }

.jr-drop { stroke: var(--line); stroke-width: 1; }
.jr-dot { fill: var(--line-2); transition: fill 0.3s; }

.jr-card-bg {
  fill: rgba(255, 255, 255, 0.025);
  stroke: var(--line);
  stroke-width: 1;
  transition: fill 0.3s, stroke 0.3s;
}

.jr-ico {
  fill: none;
  stroke: var(--fg-3);
  stroke-width: 1.4;
  stroke-linecap: round;
  transition: stroke 0.3s;
}
.jr-ico circle { fill: var(--fg-3); stroke: none; }
.jr-ico ellipse, .jr-ico line, .jr-ico rect { fill: none; }
.jr-ico circle:first-child:not(:last-child) { fill: none; stroke: inherit; }

.jr-node__t {
  fill: var(--fg-3);
  font-size: 14px;
  font-weight: 600;
  transition: fill 0.3s;
}
.jr-node__s {
  fill: var(--fg-3);
  font-family: var(--font-mono);
  font-size: 10px;
  opacity: 0.8;
}

.jr-node.is-on .jr-card-bg { fill: var(--accent-wash); stroke: var(--accent); }
.jr-node.is-on .jr-ico { stroke: var(--accent-2); }
.jr-node.is-on .jr-ico circle { fill: var(--accent-2); }
.jr-node.is-on .jr-node__t { fill: var(--accent-2); }
.jr-node.is-on .jr-dot { fill: var(--accent); }

.jr-node.is-pulse .jr-card-bg { animation: jr-pulse 0.9s ease-in-out infinite; }
@keyframes jr-pulse {
  0%, 100% { stroke-width: 1; }
  50% { stroke-width: 3; }
}

/* 封包 */
.jr-pkt__in { opacity: 0; transition: opacity 0.2s; }
.jr-pkt__in.is-vis { opacity: 1; }
.jr-pkt__in rect { stroke-width: 1.2; }
.jr-pkt__in text {
  font-family: var(--font-mono);
  font-size: 11px;
  text-anchor: middle;
}
.jr-pkt__in.is-req rect { fill: var(--accent-wash); stroke: var(--accent); }
.jr-pkt__in.is-req text { fill: var(--accent-2); }
.jr-pkt__in.is-ok rect { fill: var(--ok-wash); stroke: var(--ok); }
.jr-pkt__in.is-ok text { fill: var(--ok); }

/* 兩張卡 */
.jr-cards {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 10px;
}

.jr-card {
  height: 142px;
  padding: 12px 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line);
  border-radius: 10px;
}

.jr-card__k {
  margin-bottom: 8px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.04em;
  color: var(--fg-3);
}

.jr-desc { font-size: 13.5px; line-height: 1.65; color: var(--fg-2); }
.jr-mute { display: block; margin-top: 4px; font-size: 12px; line-height: 1.55; color: var(--fg-3); }
.jr-ok { color: var(--ok); }

.jr code {
  padding: 1px 6px;
  font-family: var(--font-mono);
  font-size: 0.92em;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 4px;
}

/* 右卡：逐行出現 */
.jr-code { display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: var(--fg-2); }
.jr-ln {
  display: flex;
  align-items: baseline;
  gap: 12px;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.35s ease var(--d, 0ms), transform 0.35s ease var(--d, 0ms);
}
.jr-ln.on { opacity: 1; transform: none; }
.jr-k {
  flex: none;
  min-width: 64px;
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--fg-3);
}
.jr-k--req { color: var(--accent-2); }
.jr-k--ok { color: var(--ok); }
.jr-m { font-family: var(--font-mono); font-size: 12.5px; }
.jr-dim { font-family: var(--font-mono); color: var(--fg-3); }

.jr-caret {
  display: inline-block;
  width: 7px;
  height: 14px;
  margin-left: 2px;
  vertical-align: -2px;
  background: var(--accent);
  animation: jr-blink 0.8s steps(1) infinite;
}
@keyframes jr-blink { 50% { opacity: 0; } }

/* 第 5 步：原文 + 縮圖頁面 */
.jr-resp { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
.jr-resp__raw { display: flex; flex-direction: column; gap: 6px; }

.jr-page {
  display: flex;
  flex: none;
  flex-direction: column;
  gap: 5px;
  width: 112px;
  padding: 8px;
  border: 1px solid var(--line-2);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  opacity: 0.35;
  transition: opacity 0.5s ease 0.1s;
}
.jr-page.on { opacity: 1; }
.jr-page i { display: block; height: 4px; border-radius: 2px; background: var(--line-2); }
.jr-page__bar { height: 6px !important; margin-bottom: 2px; background: var(--accent-line) !important; }
.jr-page__h { width: 62%; height: 7px !important; background: var(--accent) !important; opacity: 0; transition: opacity 0.4s ease 0.35s; }
.jr-page__l { opacity: 0; transition: opacity 0.4s ease 0.55s; }
.jr-page__l--s { width: 70%; transition-delay: 0.7s; }
.jr-page.on .jr-page__h, .jr-page.on .jr-page__l { opacity: 1; }

/* 控制列 */
.jr-ctl {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-mono);
}

.jr-btn {
  padding: 2px 14px;
  font-family: var(--font-mono);
  font-size: inherit;
  line-height: inherit;
  color: var(--accent);
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 999px;
  cursor: pointer;
}
.jr-btn:hover:not(:disabled) { border-color: var(--accent); }
.jr-btn:focus-visible { outline: 1px solid var(--accent); outline-offset: 2px; }
.jr-btn:disabled { color: var(--fg-3); cursor: default; opacity: 0.5; }
.jr-btn--main { background: var(--accent-wash); border-color: var(--accent-line); }

.jr-progress { margin-left: 6px; font-variant-numeric: tabular-nums; color: var(--fg-3); }

@media (prefers-reduced-motion: reduce) {
  .jr-ln, .jr-page, .jr-page i, .jr-bar i, .jr-pkt__in { transition: none; }
  .jr-caret, .jr-node.is-pulse .jr-card-bg { animation: none; }
}

/* PDF 匯出 / 列印：顯示第 5 步終態，隱藏控制列 */
@media print {
  .jr-ctl { display: none; }
  .jr-ln, .jr-page, .jr-page i { opacity: 1 !important; transform: none !important; }
}
</style>