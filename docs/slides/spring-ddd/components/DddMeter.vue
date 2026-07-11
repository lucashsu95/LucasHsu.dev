<script setup lang="ts">
import { computed, ref } from "vue";

const level = ref(0);

const stages = [
  { percent: 0, name: "貧血模型", status: "危險", color: "#f85149" },
  { percent: 25, name: "Value Object", status: "起步", color: "#e76f00" },
  { percent: 50, name: "充血模型與領域語言", status: "漸入佳境", color: "#d4a72c" },
  { percent: 75, name: "Aggregate 與 Repository", status: "穩健", color: "#5382a1" },
  { percent: 100, name: "Domain Event 與 Bounded Context", status: "完美", color: "#7ee787" },
];

const aspects = [
  { unlockAt: 25, bad: "金額用 double、狀態用魔法字串", good: "Money / OrderStatus 把規則寫進型別" },
  { unlockAt: 50, bad: "商業規則散落 N 個 Service，改不齊", good: "行為住進實體，每條規則只有一份" },
  { unlockAt: 50, bad: "setter 全開，狀態隨人改壞", good: "沒有 setter，實體自我守護不變條件" },
  { unlockAt: 75, bad: "想改哪張表就改哪張，一致性看緣分", good: "Aggregate 界定交易邊界，改動必經 root" },
  { unlockAt: 100, bad: "跨模組直接互呼，改一處動全身", good: "Domain Event 解耦，Bounded Context 分家" },
];

const stage = computed(() => stages[level.value]);
const percent = computed(() => stage.value.percent);
</script>

<template>
  <section class="ddd-meter" aria-labelledby="ddd-meter-title">
    <header>
      <p class="tag">$ spring run DomainLab</p>
      <span class="status" :style="{ color: stage.color }">● {{ stage.status }}</span>
    </header>
    <h2 id="ddd-meter-title">
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
.ddd-meter {
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

.ddd-meter h2 {
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
