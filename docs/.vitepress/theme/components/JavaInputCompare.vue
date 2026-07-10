<script setup>
import { ref, computed } from "vue";

const mode = ref("args");
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
  if (scannerName.value.trim()) scannerSubmitted.value = true;
}

function resetScanner() {
  scannerName.value = "";
  scannerSubmitted.value = false;
}
</script>

<template>
  <div class="input-compare">
    <div class="tabs">
      <button :class="['tab', { active: mode === 'args' }]" @click="mode = 'args'">
        String[] args
      </button>
      <button :class="['tab', { active: mode === 'scanner' }]" @click="mode = 'scanner'">
        Scanner
      </button>
    </div>

    <div v-if="mode === 'args'" class="panel">
      <div class="terminal">
        <div class="line muted">$ java A hello world</div>
        <div class="line">
          <span class="key">args[0]</span> = <span class="str">"{{ argsParts[0] || "—" }}"</span>
        </div>
        <div class="line">
          <span class="key">args[1]</span> = <span class="str">"{{ argsParts[1] || "—" }}"</span>
        </div>
        <div class="line out">{{ argsOutput }}</div>
      </div>
      <label class="field">
        模擬命令列參數（空格分隔）
        <input v-model="argsInput" placeholder="hello world" />
      </label>
      <p class="hint">程式啟動前就已確定，不會等待使用者輸入</p>
    </div>

    <div v-else class="panel">
      <div class="terminal">
        <div class="line muted">$ java A</div>
        <div class="line">
          請輸入名字：<span v-if="!scannerSubmitted" class="cursor">▌</span>
        </div>
        <div v-if="scannerSubmitted" class="line str">{{ scannerName }}</div>
        <div v-if="scannerSubmitted" class="line out">Hello {{ scannerName }}</div>
      </div>
      <div v-if="!scannerSubmitted" class="row">
        <input
          v-model="scannerName"
          placeholder="輸入名字..."
          @keyup.enter="runScanner"
        />
        <button class="btn" @click="runScanner">執行</button>
      </div>
      <button v-else class="btn secondary" @click="resetScanner">重新模擬</button>
      <p class="hint">程式執行中暫停，等待使用者輸入</p>
    </div>
  </div>
</template>

<style scoped>
.input-compare {
  margin: 1.5rem 0;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  font-size: 0.8125rem;
}

.tab.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 600;
}

.terminal {
  background: #0d1117;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  min-height: 100px;
}

.line {
  margin: 0.25rem 0;
  line-height: 1.6;
  color: #e5e7eb;
}

.muted { color: #6b7280; }
.key { color: #79c0ff; }
.str { color: #7ee787; }
.out { color: #e76f00; margin-top: 0.5rem; }

.cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  color: var(--vp-c-text-2);
  font-size: 0.8125rem;
}

.row {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  font-size: 0.875rem;
}

.btn {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: var(--vp-c-brand-text);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
}

.btn.secondary {
  background: transparent;
  border: 1px solid var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.hint {
  margin-top: 0.75rem;
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}
</style>
