<script setup lang="ts">
import { computed, nextTick, ref } from "vue";

type Mode = "args" | "scanner";
type Run = { id: number; mode: Mode; input: string; output: string };

const mode = ref<Mode>("args");
const argsInput = ref("hello world");
const scannerName = ref("");
const error = ref("");
const history = ref<Run[]>([]);
const inputEl = ref<HTMLInputElement | null>(null);
let nextId = 1;

const argsParts = computed(() =>
  argsInput.value.trim() ? argsInput.value.trim().split(/\s+/) : [],
);
const currentOutput = computed(() => {
  if (mode.value === "args")
    return argsParts.value.length ? `Hello ${argsParts.value[0]}` : "";
  return scannerName.value.trim() ? `Hello ${scannerName.value.trim()}` : "";
});

function selectMode(nextMode: Mode) {
  mode.value = nextMode;
  error.value = "";
  nextTick(() => inputEl.value?.focus());
}

function validate() {
  const value = mode.value === "args" ? argsInput.value : scannerName.value;
  if (!value.trim()) {
    error.value =
      mode.value === "args" ? "請至少提供一個啟動參數" : "輸入不可為空白";
    return false;
  }
  if (value.length > 48) {
    error.value = "為了示範清楚，輸入請勿超過 48 個字元";
    return false;
  }
  error.value = "";
  return true;
}

function updateInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  if (mode.value === "args") argsInput.value = value;
  else scannerName.value = value;
  error.value = "";
}

function run() {
  if (!validate()) return;
  const input =
    mode.value === "args" ? argsInput.value.trim() : scannerName.value.trim();
  history.value.unshift({
    id: nextId++,
    mode: mode.value,
    input,
    output: currentOutput.value,
  });
  history.value = history.value.slice(0, 3);
}

function replay(item: Run) {
  selectMode(item.mode);
  if (item.mode === "args") argsInput.value = item.input;
  else scannerName.value = item.input;
}

function clearAll() {
  argsInput.value = "";
  scannerName.value = "";
  history.value = [];
  error.value = "";
  nextTick(() => inputEl.value?.focus());
}
</script>

<template>
  <section class="compare-root" aria-label="Java 輸入方式模擬器">
    <div class="mode-tabs" role="tablist" aria-label="選擇輸入方式">
      <button
        v-for="item in (['args', 'scanner'] as Mode[])"
        :key="item"
        :class="['tab', { active: mode === item }]"
        role="tab"
        :aria-selected="mode === item"
        @click="selectMode(item)"
        @keydown.left.prevent="selectMode('args')"
        @keydown.right.prevent="selectMode('scanner')"
      >
        {{ item === "args" ? "啟動參數 args" : "執行期 Scanner" }}
      </button>
    </div>

    <div class="terminal" aria-live="polite">
      <div class="term-line muted">
        $ java A<span v-if="mode === 'args'"> {{ argsInput || "…" }}</span>
      </div>
      <template v-if="mode === 'args'">
        <div v-for="(part, index) in argsParts.slice(0, 3)" :key="index" class="term-line">
          <span class="label">args[{{ index }}]</span> =
          <span class="val">"{{ part }}"</span>
        </div>
        <div v-if="!argsParts.length" class="term-line muted">args.length = 0</div>
      </template>
      <template v-else>
        <div class="term-line">請輸入名字：<span class="cursor">▌</span></div>
        <div class="term-line muted">程式在 nextLine() 暫停等待</div>
      </template>
      <div v-if="currentOutput" class="term-line output">預期：{{ currentOutput }}</div>
    </div>

    <form class="field-row" @submit.prevent="run">
      <label class="sr-only" for="compare-input">模擬輸入</label>
      <input
        id="compare-input"
        ref="inputEl"
        :value="mode === 'args' ? argsInput : scannerName"
        :placeholder="mode === 'args' ? 'hello world' : '輸入名字'"
        :aria-invalid="Boolean(error)"
        :aria-describedby="error ? 'compare-error' : undefined"
        @input="updateInput"
      />
      <button class="run-btn" type="submit">驗證 ↵</button>
      <button class="reset-btn" type="button" @click="clearAll">清除</button>
    </form>
    <p v-if="error" id="compare-error" class="error" role="alert">{{ error }}</p>
    <p v-else class="hint">
      {{ mode === "args" ? "修改後代表「重新啟動」一次" : "Enter 送出執行期輸入" }}
    </p>

    <div v-if="history.length" class="history">
      <div class="history-title">最近驗證（點擊可重播）</div>
      <button
        v-for="item in history"
        :key="item.id"
        class="history-item"
        type="button"
        @click="replay(item)"
      >
        <span class="badge">{{ item.mode }}</span>
        <span>{{ item.input }}</span>
        <span class="history-output">→ {{ item.output }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.compare-root { font-family: "JetBrains Mono", monospace; font-size: .72rem; }
.mode-tabs, .field-row { display: flex; gap: 7px; }
.mode-tabs { margin-bottom: 8px; }
button, input { font: inherit; }
.tab { flex: 1; padding: 7px; border: 1px solid #5382a166; border-radius: 8px; background: transparent; color: #9ca3af; cursor: pointer; }
.tab.active { background: #5382a126; border-color: #5382a1; color: #ffa657; }
.tab:focus-visible, button:focus-visible, input:focus-visible { outline: 2px solid #7ee787; outline-offset: 2px; }
.terminal { min-height: 104px; margin-bottom: 8px; padding: 10px 12px; border: 1px solid #ffffff1a; border-radius: 10px; background: #0d1117; }
.term-line { margin: 2px 0; line-height: 1.45; }
.muted { color: #6b7280; }
.label { color: #79c0ff; }
.val { color: #7ee787; }
.output { margin-top: 5px; color: #ffa657; }
.cursor { animation: blink 1s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }
input { min-width: 0; flex: 1; padding: 7px 9px; border: 1px solid #5382a14d; border-radius: 6px; background: #161b22; color: #e5e7eb; }
.run-btn, .reset-btn { padding: 7px 10px; border: 0; border-radius: 6px; color: white; cursor: pointer; }
.run-btn { background: #5382a1; }
.reset-btn { background: #374151; }
.hint, .error { min-height: 1rem; margin: 5px 0; font-size: .65rem; }
.hint { color: #6b7280; }
.error { color: #f87171; }
.history { margin-top: 6px; padding-top: 6px; border-top: 1px solid #ffffff14; }
.history-title { margin-bottom: 4px; color: #9ca3af; }
.history-item { display: grid; grid-template-columns: 54px 1fr 1.2fr; width: 100%; gap: 6px; margin: 3px 0; padding: 4px 6px; border: 0; border-radius: 5px; background: #ffffff08; color: #d1d5db; text-align: left; cursor: pointer; }
.history-item:hover { background: #5382a11f; }
.badge { color: #79c0ff; }
.history-output { overflow: hidden; color: #7ee787; text-overflow: ellipsis; white-space: nowrap; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }
@media print {
  .field-row, .history { display: none !important; }
  .cursor { animation: none; }
}
</style>
