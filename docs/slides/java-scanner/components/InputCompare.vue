<script setup lang="ts">
import { ref, computed } from "vue";

const mode = ref<"args" | "scanner">("args");
const argsInput = ref("hello world");
const scannerName = ref("");
const scannerSubmitted = ref(false);

const argsParts = computed(() =>
  argsInput.value.trim() ? argsInput.value.trim().split(/\s+/) : []
);

const argsOutput = computed(() => {
  if (argsParts.value.length === 0) return "（尚未傳入參數）";
  return `Hello ${argsParts.value[0]}`;
});

function runScanner() {
  scannerSubmitted.value = true;
}

function resetScanner() {
  scannerName.value = "";
  scannerSubmitted.value = false;
}
</script>

<template>
  <div class="compare-root">
    <div class="mode-tabs">
      <button
        :class="['tab', { active: mode === 'args' }]"
        @click="mode = 'args'"
      >
        String[] args
      </button>
      <button
        :class="['tab', { active: mode === 'scanner' }]"
        @click="mode = 'scanner'"
      >
        Scanner
      </button>
    </div>

    <div v-if="mode === 'args'" class="panel">
      <div class="terminal">
        <div class="term-line muted">$ java A hello world</div>
        <div class="term-line">
          <span class="label">args[0]</span> = <span class="val">"{{ argsParts[0] || "—" }}"</span>
        </div>
        <div class="term-line">
          <span class="label">args[1]</span> = <span class="val">"{{ argsParts[1] || "—" }}"</span>
        </div>
        <div class="term-line output">{{ argsOutput }}</div>
      </div>
      <label class="field">
        模擬命令列參數（空格分隔）
        <input v-model="argsInput" placeholder="hello world" />
      </label>
      <p class="hint">程式啟動前就已確定，不會等待使用者輸入</p>
    </div>

    <div v-else class="panel">
      <div class="terminal">
        <div class="term-line muted">$ java A</div>
        <div class="term-line">請輸入名字：<span v-if="!scannerSubmitted" class="cursor">▌</span></div>
        <div v-if="scannerSubmitted" class="term-line val">{{ scannerName }}</div>
        <div v-if="scannerSubmitted" class="term-line output">Hello {{ scannerName }}</div>
      </div>
      <div v-if="!scannerSubmitted" class="field-row">
        <input v-model="scannerName" placeholder="輸入名字..." @keyup.enter="runScanner" />
        <button class="run-btn" @click="runScanner">執行</button>
      </div>
      <button v-else class="reset-btn" @click="resetScanner">重新模擬</button>
      <p class="hint">程式執行中暫停，等待使用者輸入</p>
    </div>
  </div>
</template>

<style scoped>
.compare-root {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.85rem;
}

.mode-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.tab {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid rgba(83, 130, 161, 0.4);
  border-radius: 8px;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s;
}

.tab.active {
  background: rgba(83, 130, 161, 0.15);
  border-color: #5382a1;
  color: #e76f00;
}

.terminal {
  background: #0d1117;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 12px;
  min-height: 120px;
}

.term-line {
  margin: 4px 0;
  line-height: 1.6;
}

.muted {
  color: #6b7280;
}

.label {
  color: #79c0ff;
}

.val {
  color: #7ee787;
}

.output {
  color: #e76f00;
  margin-top: 8px;
}

.cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #9ca3af;
  font-size: 0.75rem;
}

.field-row {
  display: flex;
  gap: 8px;
}

input {
  flex: 1;
  padding: 8px 12px;
  background: #161b22;
  border: 1px solid rgba(83, 130, 161, 0.3);
  border-radius: 6px;
  color: #e5e7eb;
  font-family: inherit;
}

.run-btn,
.reset-btn {
  padding: 8px 16px;
  background: #5382a1;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-family: inherit;
}

.run-btn:hover,
.reset-btn:hover {
  background: #6a9bc0;
}

.hint {
  margin-top: 10px;
  font-size: 0.75rem;
  color: #6b7280;
}
</style>
