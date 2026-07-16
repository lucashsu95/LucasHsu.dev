<script setup>
import { ref, computed } from "vue";

const MIN = 0;
const MAX = 100;
const STEPS = [1, 5, 10];

const count = ref(0);
const step = ref(1);

const atMin = computed(() => count.value <= MIN);
const atMax = computed(() => count.value >= MAX);

const progress = computed(() => {
  if (MAX === MIN) return 0;
  return ((count.value - MIN) / (MAX - MIN)) * 100;
});

const statusText = computed(() => {
  if (atMin.value) return `已達下限 ${MIN}`;
  if (atMax.value) return `已達上限 ${MAX}`;
  return `範圍 ${MIN} – ${MAX}`;
});

function increment() {
  if (atMax.value) return;
  count.value = Math.min(MAX, count.value + step.value);
}

function decrement() {
  if (atMin.value) return;
  count.value = Math.max(MIN, count.value - step.value);
}

function reset() {
  count.value = 0;
}

function setStep(value) {
  step.value = value;
}
</script>

<template>
  <div class="simple-counter" :class="{ 'at-min': atMin, 'at-max': atMax }">
    <div class="display">
      <span class="count" :key="count">{{ count }}</span>
      <span class="status" :class="{ warn: atMin || atMax }">{{ statusText }}</span>
    </div>

    <div class="progress-track">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>

    <div class="controls">
      <button class="btn step-btn" :disabled="atMin" @click="decrement">−</button>
      <button class="btn reset-btn" @click="reset">重置</button>
      <button class="btn step-btn" :disabled="atMax" @click="increment">+</button>
    </div>

    <div class="step-group">
      <span class="step-label">步進值</span>
      <div class="step-options">
        <button
          v-for="s in STEPS"
          :key="s"
          :class="['step-opt', { active: step === s }]"
          @click="setStep(s)"
        >
          +{{ s }}
        </button>
      </div>
    </div>

    <p class="hint">
      點擊 +/− 增減計數；切換步進值可一次跳 {{ STEPS.join(" / ") }}；到達
      {{ MIN }} 或 {{ MAX }} 時按鈕會自動停用。
    </p>
  </div>
</template>

<style scoped>
.simple-counter {
  margin: 1.5rem 0;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.simple-counter.at-max {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.simple-counter.at-min {
  border-color: #c74634;
  box-shadow: 0 0 0 3px rgba(199, 70, 52, 0.15);
}

.display {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.count {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  color: var(--vp-c-brand);
  display: inline-block;
  animation: pop 0.25s ease;
}

@keyframes pop {
  0% { transform: scale(0.85); opacity: 0.4; }
  100% { transform: scale(1); opacity: 1; }
}

.status {
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  transition: color 0.3s ease;
}

.status.warn {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.simple-counter.at-min .status.warn {
  color: #c74634;
}

.progress-track {
  margin: 1rem 0;
  height: 8px;
  border-radius: 999px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--vp-c-brand);
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
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
  transition: transform 0.15s ease, opacity 0.2s ease, background 0.2s ease;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn:active:not(:disabled) {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.step-btn {
  flex: 1;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
}

.reset-btn {
  background: transparent;
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-2);
}

.reset-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.step-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.step-label {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}

.step-options {
  display: flex;
  gap: 0.5rem;
}

.step-opt {
  padding: 0.375rem 0.875rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.8125rem;
  transition: all 0.2s ease;
}

.step-opt:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.step-opt.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 600;
}

.hint {
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  margin-top: 0.75rem;
}

@media (max-width: 480px) {
  .count {
    font-size: 2.5rem;
  }

  .step-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .step-options {
    width: 100%;
  }

  .step-opt {
    flex: 1;
    text-align: center;
  }
}
</style>
