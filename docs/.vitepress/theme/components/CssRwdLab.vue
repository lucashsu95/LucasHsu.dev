<script setup>
import { computed, ref } from "vue";

const width = ref(360);
const reducedMotion = ref(false);
const highContrast = ref(false);

const previewStyle = computed(() => ({ width: `${width.value}px` }));
const sizeName = computed(() => {
  if (width.value >= 560) return "寬版：圖文雙欄";
  if (width.value >= 400) return "中版：按鈕並排";
  return "窄版：內容單欄";
});
</script>

<template>
  <section class="lab" aria-labelledby="rwd-lab-title">
    <h3 id="rwd-lab-title">RWD 實驗室</h3>

    <label class="range">
      <span>容器寬度：{{ width }}px</span>
      <input v-model.number="width" type="range" min="280" max="720" step="10">
    </label>

    <div class="presets" aria-label="寬度快速選擇">
      <button v-for="value in [320, 480, 640]" :key="value" type="button" @click="width = value">
        {{ value }}px
      </button>
    </div>

    <div class="preferences">
      <label>
        <input v-model="reducedMotion" type="checkbox">
        模擬 reduced motion
      </label>
      <label>
        <input v-model="highContrast" type="checkbox">
        模擬 high contrast
      </label>
    </div>

    <div class="viewport">
      <article
        :class="['query-container', { reduced: reducedMotion, contrast: highContrast }]"
        :style="previewStyle"
        :aria-label="`響應式預覽，${sizeName}`"
      >
        <div class="card">
          <div class="art" aria-hidden="true">CSS</div>
          <div class="content">
            <h4>容器查詢卡片</h4>
            <p>這張卡依自己的寬度改版，不依瀏覽器 viewport。</p>
            <div class="actions">
              <button type="button">主要操作</button>
              <button type="button">稍後處理</button>
            </div>
          </div>
        </div>
      </article>
    </div>

    <output aria-live="polite">{{ sizeName }}；標題使用 clamp() + cqi。</output>
  </section>
</template>

<style scoped>
.lab {
  margin: 1.5rem 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

h3 { margin: 0 0 0.75rem; }

.range span {
  display: block;
  font-size: 0.875rem;
}

.range input {
  width: 100%;
  accent-color: var(--vp-c-brand-1);
}

.presets,
.preferences {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-top: 0.65rem;
}

button {
  min-height: 2.4rem;
  padding: 0.45rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 7px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font: inherit;
  cursor: pointer;
}

input { accent-color: var(--vp-c-brand-1); }

button:focus-visible,
input:focus-visible {
  outline: 3px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.viewport {
  max-width: 100%;
  margin: 1rem 0;
  overflow-x: auto;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.query-container {
  container: demo / inline-size;
  max-width: 100%;
  transition: width 180ms ease;
}

.card {
  display: grid;
  gap: 0.75rem;
  padding: clamp(0.75rem, 3cqi, 1.5rem);
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.art {
  display: grid;
  min-height: 7rem;
  place-items: center;
  border-radius: 8px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: clamp(1.5rem, 1rem + 4cqi, 3rem);
  font-weight: 800;
}

h4 {
  margin: 0;
  font-size: clamp(1.1rem, 0.9rem + 2cqi, 1.65rem);
}

p { margin: 0.5rem 0; color: var(--vp-c-text-2); }

.actions {
  display: grid;
  gap: 0.5rem;
}

.actions button:first-child {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}

@container demo (width >= 400px) {
  .actions { grid-template-columns: repeat(2, max-content); }
}

@container demo (width >= 560px) {
  .card {
    grid-template-columns: minmax(10rem, 0.75fr) 1.25fr;
    align-items: center;
  }
}

.contrast .card,
.contrast button { border-width: 3px; }

.reduced,
.reduced * {
  scroll-behavior: auto !important;
  transition: none !important;
  animation: none !important;
}

output {
  display: block;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

@media (prefers-reduced-motion: reduce) {
  .query-container,
  .query-container * {
    scroll-behavior: auto !important;
    transition: none !important;
    animation: none !important;
  }
}
</style>
