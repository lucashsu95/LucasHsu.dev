<script setup>
import { computed, ref } from "vue";

const modes = ["static", "relative", "absolute", "sticky", "fixed"];
const mode = ref("relative");
const top = ref(16);
const left = ref(20);

const itemStyle = computed(() => ({
  top: mode.value === "static" ? undefined : `${top.value}px`,
  left: ["relative", "absolute", "fixed"].includes(mode.value)
    ? `${left.value}px`
    : undefined,
}));

const description = computed(() => {
  const messages = {
    static: "static 留在文流，inset 不生效。",
    relative: `relative 保留原位，向下 ${top.value}px、向右 ${left.value}px。`,
    absolute: `absolute 脫離文流，相對 .canvas 定位容器移動。`,
    sticky: `sticky 在捲動區到達 top: ${top.value}px 時黏住。`,
    fixed: `fixed 相對捲動區視窗固定；捲動內容時元素停留，可用 top / left 調整位置。`,
  };
  return messages[mode.value];
});
</script>

<template>
  <section class="lab" aria-labelledby="position-lab-title">
    <h3 id="position-lab-title">Position 實驗室</h3>

    <div class="mode-list" role="radiogroup" aria-label="定位模式">
      <button
        v-for="value in modes"
        :key="value"
        type="button"
        role="radio"
        :aria-checked="mode === value"
        :class="{ active: mode === value }"
        @click="mode = value"
      >
        {{ value }}
      </button>
    </div>

    <div class="sliders">
      <label>
        <span>top: {{ top }}px</span>
        <input v-model.number="top" type="range" min="0" max="48" step="4">
      </label>
      <label>
        <span>left: {{ left }}px</span>
        <input
          v-model.number="left"
          type="range"
          min="-40"
          max="80"
          step="4"
          :disabled="!['relative', 'absolute', 'fixed'].includes(mode)"
        >
      </label>
    </div>

    <div class="scrollport" tabindex="0" aria-label="可捲動定位預覽區">
      <div class="canvas">
        <p>正常文流的第一段內容</p>
        <div class="origin" aria-hidden="true">原始位置</div>
        <div :class="['target', mode]" :style="itemStyle">目標元素</div>
        <p v-for="number in 5" :key="number">捲動測試內容 {{ number }}</p>
      </div>
    </div>

    <output class="status" aria-live="polite">{{ description }}</output>
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

.mode-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

button {
  padding: 0.45rem 0.7rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 7px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font: inherit;
  cursor: pointer;
}

button.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

button:focus-visible,
input:focus-visible,
.scrollport:focus-visible {
  outline: 3px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.sliders {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 0.75rem;
  margin: 1rem 0;
}

label span { display: block; font-size: 0.875rem; }
input { width: 100%; accent-color: var(--vp-c-brand-1); }
input:disabled { opacity: 0.45; }

.scrollport {
  position: relative;
  height: 15rem;
  overflow: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  /* transform 建立 containing block，讓 fixed 固定在捲動區視窗內 */
  transform: translateZ(0);
}

.canvas {
  position: relative;
  min-height: 32rem;
  padding: 1rem;
}

.canvas p {
  margin: 0 0 2.5rem;
  color: var(--vp-c-text-2);
}

.origin {
  width: 7rem;
  padding: 0.65rem;
  border: 1px dashed var(--vp-c-divider);
  color: var(--vp-c-text-3);
}

.target {
  width: 7rem;
  padding: 0.65rem;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  font-weight: 600;
}

.target.static { position: static; }
.target.relative { position: relative; }
.target.absolute { position: absolute; }
.target.sticky { position: sticky; z-index: 1; }
.target.fixed { position: fixed; z-index: 2; }

.status {
  display: block;
  margin-top: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto; transition: none !important; }
}
</style>
