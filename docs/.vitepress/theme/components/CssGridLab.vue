<script setup>
import { computed, ref } from "vue";

const mode = ref("fixed");
const columns = ref(3);
const minimum = ref(110);
const dense = ref(false);
const featured = ref(true);

const gridStyle = computed(() => ({
  "--columns": columns.value,
  "--minimum": `${minimum.value}px`,
  gridAutoFlow: dense.value ? "row dense" : "row",
}));

const templateLabel = computed(() =>
  mode.value === "fixed"
    ? `repeat(${columns.value}, minmax(0, 1fr))`
    : `repeat(${mode.value}, minmax(${minimum.value}px, 1fr))`
);
</script>

<template>
  <section class="lab" aria-labelledby="grid-lab-title">
    <h3 id="grid-lab-title">Grid 實驗室</h3>

    <fieldset>
      <legend>軌道模式</legend>
      <label v-for="value in ['fixed', 'auto-fit', 'auto-fill']" :key="value">
        <input v-model="mode" type="radio" name="grid-mode" :value="value">
        {{ value }}
      </label>
    </fieldset>

    <div class="controls">
      <label v-if="mode === 'fixed'">
        <span>欄數：{{ columns }}</span>
        <input v-model.number="columns" type="range" min="1" max="5">
      </label>
      <label v-else>
        <span>最小軌道：{{ minimum }}px</span>
        <input v-model.number="minimum" type="range" min="80" max="180" step="10">
      </label>
      <label class="check">
        <input v-model="featured" type="checkbox">
        第一項跨兩欄
      </label>
      <label class="check">
        <input v-model="dense" type="checkbox">
        `grid-auto-flow: dense`
      </label>
    </div>

    <div
      :class="['grid', `mode-${mode}`]"
      :style="gridStyle"
      :aria-label="`網格預覽，template 為 ${templateLabel}`"
    >
      <button
        v-for="number in 7"
        :key="number"
        type="button"
        :class="{ featured: number === 1 && featured }"
        :aria-label="`網格項目 ${number}${number === 1 && featured ? '，跨兩欄' : ''}`"
      >
        {{ number }}
      </button>
    </div>

    <output aria-live="polite">
      grid-template-columns: {{ templateLabel }}；auto-flow: {{ dense ? "row dense" : "row" }}
    </output>
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

fieldset {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin: 0;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

legend { padding: 0 0.35rem; font-weight: 600; }
label { cursor: pointer; }

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 0.75rem;
  margin: 1rem 0;
}

.controls label > span { display: block; font-size: 0.875rem; }
.controls input[type="range"] { width: 100%; }
.check { align-self: end; }
input { accent-color: var(--vp-c-brand-1); }

input:focus-visible,
button:focus-visible {
  outline: 3px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.grid {
  display: grid;
  gap: 0.65rem;
  min-height: 10rem;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.mode-fixed {
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
}

.mode-auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--minimum)), 1fr));
}

.mode-auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--minimum)), 1fr));
}

.grid button {
  min-width: 0;
  min-height: 3.5rem;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 7px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.grid button.featured { grid-column: span 2; }

output {
  display: block;
  margin-top: 0.75rem;
  overflow-wrap: anywhere;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; }
}
</style>
