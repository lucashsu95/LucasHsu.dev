<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

const tasks = [
  { name: "煮咖啡", icon: "☕", duration: 2000 },
  { name: "烤吐司", icon: "🍞", duration: 1500 },
  { name: "煎蛋", icon: "🍳", duration: 1000 },
];

const mode = ref<"sync" | "async" | null>(null);
const running = ref(false);
const elapsed = ref(0);
const progress = ref([0, 0, 0]);
const finishedAt = ref<number | null>(null);
let timer: ReturnType<typeof setInterval> | null = null;

const totalSync = tasks.reduce((sum, t) => sum + t.duration, 0);
const totalAsync = Math.max(...tasks.map((t) => t.duration));

const label = computed(() => {
  if (finishedAt.value !== null) {
    return `完成！總共 ${(finishedAt.value / 1000).toFixed(1)} 秒`;
  }
  if (running.value) return `${(elapsed.value / 1000).toFixed(1)} 秒...`;
  return "選一種方式開始做早餐";
});

function run(selected: "sync" | "async") {
  stop();
  mode.value = selected;
  running.value = true;
  elapsed.value = 0;
  finishedAt.value = null;
  progress.value = [0, 0, 0];

  const startOffsets =
    selected === "sync"
      ? tasks.map((_, i) => tasks.slice(0, i).reduce((s, t) => s + t.duration, 0))
      : tasks.map(() => 0);
  const total = selected === "sync" ? totalSync : totalAsync;

  timer = setInterval(() => {
    elapsed.value += 100;
    progress.value = tasks.map((task, i) => {
      const t = elapsed.value - startOffsets[i];
      return Math.min(100, Math.max(0, (t / task.duration) * 100));
    });
    if (elapsed.value >= total) {
      finishedAt.value = total;
      stop();
    }
  }, 100);
}

function stop() {
  if (timer) clearInterval(timer);
  timer = null;
  running.value = false;
}

onUnmounted(stop);
</script>

<template>
  <section class="race" aria-labelledby="race-title">
    <header>
      <p class="tag">$ node breakfast.js</p>
      <span class="status" aria-live="polite">{{ label }}</span>
    </header>
    <h2 id="race-title">同步 vs 非同步：早餐賽跑</h2>
    <div class="controls">
      <button type="button" :class="{ active: mode === 'sync' }" @click="run('sync')">
        ▶ 同步（一件做完才做下一件）
      </button>
      <button type="button" :class="{ active: mode === 'async' }" @click="run('async')">
        ▶ 非同步（全部同時開工）
      </button>
    </div>
    <div class="tasks">
      <div v-for="(task, i) in tasks" :key="task.name" class="task">
        <span class="task-name">{{ task.icon }} {{ task.name }}（{{ task.duration / 1000 }}s）</span>
        <div class="bar-track">
          <div class="bar-fill" :style="{ width: `${progress[i]}%` }"></div>
        </div>
        <span class="done" :class="{ show: progress[i] >= 100 }">✓</span>
      </div>
    </div>
    <p class="hint">
      同步總時間 = 2 + 1.5 + 1 = <strong>4.5 秒</strong>；
      非同步總時間 = max(2, 1.5, 1) = <strong class="good">2 秒</strong>
    </p>
  </section>
</template>

<style scoped>
.race {
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
  font-size: 12px;
  letter-spacing: 0.1em;
}

.race h2 {
  margin: 6px 0 12px;
  font-size: 22px;
}

.controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 14px;
}

.controls button {
  padding: 10px;
  border: 1px solid #30363d;
  border-radius: 9px;
  background: #0d1117;
  color: #c9d1d9;
  font: 700 13px/1.4 "JetBrains Mono", monospace;
  cursor: pointer;
}

.controls button.active {
  border-color: #f7df1e;
  color: #f0f6fc;
}

.task {
  display: grid;
  grid-template-columns: 200px 1fr 24px;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  font-size: 14px;
}

.bar-track {
  height: 12px;
  overflow: hidden;
  border-radius: 999px;
  background: #21262d;
}

.bar-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #f7df1e, #7ee787);
  transition: width 0.1s linear;
}

.done {
  color: #7ee787;
  font-weight: 800;
  opacity: 0;
}

.done.show {
  opacity: 1;
}

.hint {
  margin-top: 12px;
  color: #8b949e;
  font-size: 13px;
}

.hint .good {
  color: #7ee787;
}

button:focus-visible {
  outline: 3px solid #7ee787;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .bar-fill {
    transition: none;
  }
}
</style>
