<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";

interface TestCase {
  code: string;
  label: string;
  expect: "pass" | "fail";
}

interface Instruction {
  id: string;
  text: string;
  ambiguous: boolean;
  constraints: { code: string; label: string }[];
  tests: TestCase[];
  ask: string;
  misread: string;
}

const instructions: Instruction[] = [
  {
    id: "zone",
    text: "這批貨不能走市區，一律上高速公路。",
    ambiguous: false,
    constraints: [
      { code: "forbid_zone", label: "禁行區域 = 市區道路" },
      { code: "require_road", label: "道路類型 ⊆ {高速公路}" },
    ],
    tests: [
      { code: "t_zone_1", label: "台南市府前路，載重 8 t", expect: "fail" },
      { code: "t_zone_2", label: "國道一號南下，載重 8 t", expect: "pass" },
    ],
    ask: "",
    misread: "",
  },
  {
    id: "weight",
    text: "橋梁限重十公噸以下，這批二十公噸。",
    ambiguous: false,
    constraints: [{ code: "bridge_limit", label: "橋梁限重 ≤ 10 t" }],
    tests: [
      { code: "t_wt_1", label: "西螺大橋，載重 12 t", expect: "fail" },
      { code: "t_wt_2", label: "西螺大橋，載重 8 t", expect: "pass" },
    ],
    ask: "",
    misread: "",
  },
  {
    id: "hazmat",
    text: "幫我避開危險品禁行路段。",
    ambiguous: false,
    constraints: [{ code: "hazmat_forbid", label: "禁行清單 = 危險品路段" }],
    tests: [
      { code: "t_hz_1", label: "危險品車進入市區禁行段", expect: "fail" },
      { code: "t_hz_2", label: "危險品車走外環道", expect: "pass" },
    ],
    ask: "",
    misread: "",
  },
  {
    id: "preference",
    text: "危險品那批盡量走外環。",
    ambiguous: true,
    constraints: [{ code: "require_road", label: "必行路段 = 外環（把偏好當硬規則）" }],
    tests: [
      { code: "t_pref_1", label: "外環臨時禁行，車輛被卡在原點", expect: "fail" },
      { code: "t_pref_2", label: "危險品車改走一般道路", expect: "fail" },
    ],
    ask:
      "「盡量走外環」要當成硬性規則嗎？若外環臨時禁行，危險品要停在原地，還是改走一般道路？",
    misread: "把偏好讀成硬規則：外環一禁行，車輛回不了頭，危險品被派進市區路段。",
  },
];

const activeId = ref(instructions[0].id);
const askBack = ref(true);
const parsing = ref(false);

const active = computed(() => instructions.find((i) => i.id === activeId.value)!);
const pending = computed(() => active.value.ambiguous && askBack.value);
const misread = computed(() => active.value.ambiguous && !askBack.value);

const status = computed(() => {
  if (parsing.value) return "解析中";
  if (pending.value) return "待使用者確認";
  if (misread.value) return "解析有誤";
  return "限制已產生";
});

const statusKind = computed(() => {
  if (parsing.value) return "busy";
  if (pending.value) return "wait";
  if (misread.value) return "risk";
  return "ok";
});

let timer: ReturnType<typeof setTimeout> | undefined;
watch([activeId, askBack], () => {
  parsing.value = true;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => (parsing.value = false), 420);
});
onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <section class="cg" aria-labelledby="cg-title">
    <header class="cg-head">
      <p id="cg-title" class="cg-tag">自然語言指令 → 限制式 → 測試案例</p>
      <div class="cg-modes" role="group" aria-label="指令">
        <button
          v-for="(it, index) in instructions"
          :key="it.id"
          type="button"
          :class="{ on: activeId === it.id, risky: it.ambiguous }"
          :aria-pressed="activeId === it.id"
          @click="activeId = it.id"
        >
          指令 {{ index + 1 }}
        </button>
      </div>
      <span class="cg-status" :class="statusKind">{{ status }}</span>
    </header>

    <p class="cg-instruction">「{{ active.text }}」</p>

    <div class="cg-body">
      <div class="cg-left">
        <p class="cg-label">產生的限制式</p>

        <div v-if="parsing" class="cg-skeleton" aria-hidden="true"><i /><i /><i /></div>

        <ul v-else-if="pending" class="cg-empty">
          <li>還沒有可執行的限制式。</li>
          <li>指令沒有給門檻，模型不猜。</li>
        </ul>

        <ul v-else class="cg-constraints">
          <li v-for="c in active.constraints" :key="c.code">
            <code>{{ c.code }}</code>
            <span>{{ c.label }}</span>
          </li>
        </ul>

        <div v-if="misread" class="cg-risk" role="status">
          <b>誤讀後果</b>
          <span>{{ active.misread }}</span>
        </div>
      </div>

      <div class="cg-right">
        <p class="cg-label">自動產生的測試案例</p>

        <div v-if="parsing" class="cg-skeleton" aria-hidden="true"><i /><i /></div>

        <ul v-else-if="pending" class="cg-empty">
          <li>限制式確認後才產生測試案例。</li>
        </ul>

        <ul v-else class="cg-tests">
          <li v-for="t in active.tests" :key="t.code">
            <code>{{ t.code }}</code>
            <span>{{ t.label }}</span>
            <span class="cg-verdict" :class="misread ? 'bad' : 'good'">
              {{ misread ? "未通過" : t.expect === "pass" ? "PASS" : "REJECT" }}
            </span>
          </li>
        </ul>

        <div v-if="pending" class="cg-ask" role="status">
          <b>系統反問</b>
          <span>{{ active.ask }}</span>
        </div>
      </div>
    </div>

    <footer class="cg-foot">
      <label>
        <input v-model="askBack" type="checkbox" />
        <span>模糊指令先反問使用者</span>
      </label>
      <p class="cg-foot-note">
        示範用指令，非 PortAgent 或 DeepFreight 的原始測資。
      </p>
    </footer>
  </section>
</template>

<style scoped>
.cg {
  --accent: #d9a441;
  --accent-soft: #e8ca8e;
  --pass: #86b58f;
  --muted: #8d949b;
  --ink: #f0f1ee;
  --line: rgba(255, 255, 255, 0.11);
  --panel: #14171b;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(20, 23, 27, 0.82);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  overflow: hidden;
  margin-top: 0.8rem;
}

.cg-head {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.55rem 0.9rem;
  border-bottom: 1px solid var(--line);
}

.cg-tag {
  margin: 0;
  font: 700 0.66rem "JetBrains Mono", monospace;
  letter-spacing: 0.12em;
  color: var(--accent-soft);
}

.cg-modes {
  display: flex;
  gap: 0.35rem;
  margin-left: auto;
}

.cg-modes button {
  border: 1px solid var(--line);
  border-radius: 999px;
  background: none;
  color: var(--muted);
  padding: 0.2rem 0.7rem;
  font: 600 0.72rem "PingFang TC", "Noto Sans TC", sans-serif;
  cursor: pointer;
  transition: color 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.cg-modes button:hover {
  color: var(--ink);
}

.cg-modes button:active {
  transform: translateY(1px);
}

.cg-modes button.on {
  border-color: var(--accent);
  color: var(--accent);
}

.cg-modes button.risky:not(.on) {
  border-style: dashed;
}

.cg-status {
  min-width: 6.5rem;
  text-align: right;
  font: 700 0.66rem "JetBrains Mono", monospace;
  letter-spacing: 0.06em;
}

.cg-status.ok {
  color: var(--pass);
}

.cg-status.wait,
.cg-status.busy {
  color: var(--accent);
}

.cg-status.risk {
  color: var(--accent);
}

.cg-instruction {
  margin: 0;
  padding: 0.5rem 0.9rem;
  border-bottom: 1px solid var(--line);
  color: var(--ink);
  font-size: 0.88rem;
  font-weight: 600;
}

.cg-body {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 1.1rem;
  padding: 0.65rem 0.9rem;
}

.cg-label {
  margin: 0 0 0.4rem;
  color: var(--muted);
  font: 700 0.62rem "JetBrains Mono", monospace;
  letter-spacing: 0.16em;
}

.cg-left,
.cg-right {
  display: grid;
  gap: 0.4rem;
  align-content: start;
}

.cg-right {
  border-left: 1px solid var(--line);
  padding-left: 1rem;
}

.cg-constraints,
.cg-tests,
.cg-empty {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.3rem;
}

.cg-constraints li {
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  gap: 0.6rem;
  align-items: baseline;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 0.3rem;
}

.cg-constraints code,
.cg-tests code {
  font-size: 0.62rem;
  color: var(--muted);
}

.cg-constraints span,
.cg-tests span {
  font-size: 0.76rem;
}

.cg-tests li {
  display: grid;
  grid-template-columns: 4.6rem 1fr auto;
  gap: 0.6rem;
  align-items: baseline;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 0.3rem;
}

.cg-tests span {
  color: var(--ink);
}

.cg-verdict {
  font: 700 0.62rem "JetBrains Mono", monospace !important;
  letter-spacing: 0.08em;
}

.cg-verdict.good {
  color: var(--pass);
}

.cg-verdict.bad {
  color: var(--accent);
}

.cg-empty li {
  color: var(--muted);
  font-size: 0.76rem;
  border-top: 1px dashed var(--line);
  padding-top: 0.3rem;
}

.cg-ask,
.cg-risk {
  border: 1px solid rgba(217, 164, 65, 0.42);
  border-radius: 10px;
  background: rgba(217, 164, 65, 0.08);
  padding: 0.4rem 0.6rem;
}

.cg-risk {
  border-color: rgba(217, 164, 65, 0.6);
}

.cg-ask b,
.cg-risk b {
  display: block;
  color: var(--accent);
  font: 700 0.62rem "JetBrains Mono", monospace;
  letter-spacing: 0.14em;
  margin-bottom: 0.15rem;
}

.cg-ask span,
.cg-risk span {
  color: var(--ink);
  font-size: 0.74rem;
  line-height: 1.5;
}

.cg-skeleton {
  display: grid;
  gap: 0.35rem;
}

.cg-skeleton i {
  display: block;
  height: 9px;
  border-radius: 5px;
  background: linear-gradient(90deg, #ffffff10, #ffffff1f, #ffffff10);
  background-size: 200% 100%;
  animation: cg-shimmer 1.1s linear infinite;
}

.cg-skeleton i:nth-child(2) {
  width: 82%;
}

.cg-skeleton i:nth-child(3) {
  width: 58%;
}

@keyframes cg-shimmer {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

.cg-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid var(--line);
  padding: 0.42rem 0.9rem;
  background: rgba(255, 255, 255, 0.015);
}

.cg-foot label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--ink);
  font-size: 0.74rem;
  cursor: pointer;
}

.cg-foot input {
  accent-color: var(--accent);
  cursor: pointer;
}

.cg-foot-note {
  margin: 0;
  color: var(--muted);
  font-size: 0.72rem;
}

.cg-modes button:focus-visible,
.cg-foot input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .cg-body {
    grid-template-columns: 1fr;
  }

  .cg-right {
    border-left: none;
    border-top: 1px solid var(--line);
    padding-left: 0;
    padding-top: 0.6rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cg-skeleton i {
    animation: none;
  }
}

@media print {
  .cg {
    background: #fff !important;
    border-color: #c9d1d4 !important;
    box-shadow: none !important;
  }

  .cg-instruction,
  .cg-constraints span,
  .cg-tests span,
  .cg-ask span,
  .cg-risk span,
  .cg-foot label {
    color: #14191c !important;
  }

  .cg-constraints code,
  .cg-tests code,
  .cg-label,
  .cg-empty li,
  .cg-foot-note,
  .cg-status {
    color: #4a565c !important;
  }

  .cg-verdict.good,
  .cg-status.ok {
    color: #2f6b47 !important;
  }

  .cg-verdict.bad,
  .cg-status.risk,
  .cg-status.wait,
  .cg-status.busy,
  .cg-tag,
  .cg-ask b,
  .cg-risk b,
  .cg-modes button.on {
    color: #8a5f10 !important;
  }

  .cg-ask,
  .cg-risk,
  .cg-foot {
    border-color: #c9d1d4 !important;
    background: #fdfaf3 !important;
  }

  .cg-modes button {
    border-color: #c9d1d4 !important;
    color: #14191c !important;
    background: #fff !important;
  }
}
</style>
