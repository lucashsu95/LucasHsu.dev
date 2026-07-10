<script setup>
import { computed, ref } from "vue";

const options = [
  "block",
  "inline",
  "inline-block",
  "flex",
  "inline-flex",
  "grid",
  "flow-root",
  "contents",
  "none",
];
const display = ref("block");

const summary = computed(() => {
  if (display.value === "none") return "容器與後代不產生 box，也無法聚焦。";
  if (display.value === "contents") return "容器 box 消失；三個子項仍參與外層排版。";
  if (display.value.includes("flex")) return "子項由 Flex 排列；inline 只改變容器對外行為。";
  if (display.value.includes("grid")) return "子項進入兩欄 Grid。";
  if (display.value === "flow-root") return "建立新的 block formatting context。";
  return `容器使用 display: ${display.value}。`;
});

function choose(value) {
  display.value = value;
}
</script>

<template>
  <section class="lab" aria-labelledby="display-lab-title">
    <h3 id="display-lab-title">Display 實驗室</h3>
    <div class="options" role="radiogroup" aria-label="display 值">
      <button
        v-for="value in options"
        :key="value"
        type="button"
        role="radio"
        :aria-checked="display === value"
        :class="{ active: display === value }"
        @click="choose(value)"
      >
        {{ value }}
      </button>
    </div>

    <div class="preview" aria-label="display 排版預覽">
      <span class="context">前方文字</span>
      <div class="demo-box" :style="{ display }">
        <button type="button">A</button>
        <button type="button">B</button>
        <button type="button">C</button>
      </div>
      <span class="context">後方文字</span>
    </div>

    <output aria-live="polite">{{ summary }}</output>
    <p v-if="display === 'none'" class="warning">
      焦點保留在外部模式按鈕；不可把焦點留在即將隱藏的內容中。
    </p>
    <p v-else-if="display === 'contents'" class="warning">
      邊框與背景消失。實務上仍須測試語意元素的無障礙樹支援。
    </p>
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

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

button {
  min-height: 2.25rem;
  padding: 0.4rem 0.65rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 7px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font: inherit;
  cursor: pointer;
}

.options button.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

button:focus-visible {
  outline: 3px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.preview {
  margin: 1rem 0;
  min-height: 9rem;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  line-height: 3.5;
}

.context {
  color: var(--vp-c-text-2);
}

.demo-box {
  width: min(100%, 18rem);
  min-height: 4rem;
  margin: 0.35rem;
  padding: 0.65rem;
  gap: 0.5rem;
  grid-template-columns: repeat(2, 1fr);
  border: 2px dashed var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  vertical-align: middle;
  line-height: 1.5;
}

.demo-box > button {
  border-color: var(--vp-c-brand-1);
}

output {
  display: block;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.warning {
  margin: 0.5rem 0 0;
  color: var(--vp-c-warning-1);
  font-size: 0.875rem;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; }
}
</style>
