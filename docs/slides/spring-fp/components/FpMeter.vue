<script setup lang="ts">
import { computed, ref } from "vue";

const level = ref(0);

const stages = [
  { percent: 0, name: "傳統命令式", status: "危險", color: "#f85149" },
  { percent: 25, name: "Stream 與 Optional", status: "起步", color: "#e76f00" },
  { percent: 50, name: "不可變資料與純函數", status: "漸入佳境", color: "#d4a72c" },
  { percent: 75, name: "Result 與函數組合", status: "穩健", color: "#5382a1" },
  { percent: 100, name: "Functional Core, Imperative Shell", status: "完美", color: "#7ee787" },
];

const aspects = [
  { unlockAt: 25, bad: "到處 null 檢查，NPE 隨時引爆", good: "Optional 把「可能沒有值」寫進型別" },
  { unlockAt: 50, bad: "setter 滿天飛，狀態隨時被偷改", good: "record 不可變，資料一出生就定型" },
  { unlockAt: 50, bad: "計算混著 I/O，測試要 mock 一堆", good: "純函數計算，直接呼叫直接驗" },
  { unlockAt: 75, bad: "用例外控制流程，呼叫端全靠猜", good: "Result 型別讓錯誤被編譯器強制" },
  { unlockAt: 100, bad: "副作用散落各層，改一行怕動全身", good: "副作用集中在殼，核心絕對純粹" },
];

const stage = computed(() => stages[level.value]);
const percent = computed(() => stage.value.percent);
</script>

<template>
  <section class="fp-meter" aria-labelledby="fp-meter-title">
    <header>
      <p class="tag">$ spring run FunctionalLab</p>
      <span class="status" :style="{ color: stage.color }">● {{ stage.status }}</span>
    </header>
    <h2 id="fp-meter-title">
      <span class="percent" :style="{ color: stage.color }">{{ percent }}%</span>
      {{ stage.name }}
    </h2>
    <input
      v-model.number="level"
      type="range"
      min="0"
      max="4"
      step="1"
      :aria-valuetext="`${percent}%：${stage.name}`"
    />
    <div class="ticks">
      <button
        v-for="(s, index) in stages"
        :key="s.percent"
        type="button"
        :class="{ active: level === index }"
        @click="level = index"
      >
        {{ s.percent }}%
      </button>
    </div>
    <ul aria-live="polite">
      <li
        v-for="aspect in aspects"
        :key="aspect.bad"
        :class="percent >= aspect.unlockAt ? 'good' : 'bad'"
      >
        <span aria-hidden="true">{{ percent >= aspect.unlockAt ? "✓" : "✗" }}</span>
        {{ percent >= aspect.unlockAt ? aspect.good : aspect.bad }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.fp-meter {
  margin-top: 8px;
  font-family: "JetBrains Mono", monospace;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag,
.status {
  color: #7ee787;
  font-size: 11px;
  letter-spacing: 0.12em;
}

.fp-meter h2 {
  margin: 6px 0 10px;
  font-size: 22px;
}

.percent {
  font-weight: 800;
}

input[type="range"] {
  width: 100%;
  accent-color: v-bind("stage.color");
  cursor: pointer;
}

.ticks {
  display: flex;
  justify-content: space-between;
  margin: 2px 0 10px;
}

.ticks button {
  padding: 2px 8px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: none;
  color: #8b949e;
  font: 700 12px/1.4 "JetBrains Mono", monospace;
  cursor: pointer;
}

.ticks button.active {
  border-color: v-bind("stage.color");
  color: #f0f6fc;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 8px;
  margin: 7px 0;
  font-size: 14px;
}

li.bad {
  color: #ffa198;
}

li.bad span {
  color: #f85149;
  font-weight: 800;
}

li.good {
  color: #e6edf3;
}

li.good span {
  color: #7ee787;
  font-weight: 800;
}

button:focus-visible,
input[type="range"]:focus-visible {
  outline: 3px solid #7ee787;
  outline-offset: 2px;
}
</style>
