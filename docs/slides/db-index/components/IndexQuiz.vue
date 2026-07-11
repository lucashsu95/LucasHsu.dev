<script setup lang="ts">
import { ref } from "vue";

const answer = ref<string | null>(null);
const options = [
  ["a", "WHERE UPPER(name) = 'ZHANG'"],
  ["b", "WHERE name LIKE '%明'"],
  ["c", "WHERE name LIKE '張%'"],
];
</script>

<template>
  <section class="quiz" aria-labelledby="index-quiz-title">
    <p class="tag">CHECKPOINT_01</p>
    <h2 id="index-quiz-title">name 欄位有 B-Tree 索引。哪個查詢「用得到」索引？</h2>
    <div class="answers">
      <button
        v-for="[key, text] in options"
        :key="key"
        :class="{ chosen: answer === key }"
        :aria-pressed="answer === key"
        @click="answer = key"
      >
        <kbd>{{ key.toUpperCase() }}</kbd><code>{{ text }}</code>
      </button>
    </div>
    <p v-if="answer" class="feedback" :class="{ correct: answer === 'c' }" aria-live="polite">
      {{ answer === "c"
        ? "✓ 正確：後置通配符保留了 B-Tree 的有序性，可以先定位到「張」再範圍掃描。"
        : answer === "a"
          ? "× 對索引欄位套函數，破壞了索引的排序——除非另建函數索引。"
          : "× 前置通配符讓 B-Tree 的有序性無用武之地，只能全表掃描。" }}
    </p>
  </section>
</template>

<style scoped>
.quiz {
  margin-top: 12px;
  font-family: "JetBrains Mono", monospace;
}

.tag {
  color: #7ee787;
  font-size: 11px;
  letter-spacing: 0.12em;
}

.quiz h2 {
  margin: 4px 0 14px;
  font-size: 21px;
}

.answers {
  display: grid;
  gap: 9px;
}

button {
  display: grid;
  grid-template-columns: 32px 1fr;
  align-items: center;
  gap: 10px;
  padding: 11px;
  border: 1px solid #30363d;
  border-radius: 9px;
  background: #0d1117;
  color: #c9d1d9;
  cursor: pointer;
  text-align: left;
  font: inherit;
}

button code {
  background: none;
  color: inherit;
}

button.chosen {
  border-color: #00a4b4;
}

kbd {
  border: 1px solid #00a4b4;
  border-radius: 5px;
  padding: 3px;
  color: #6ee7f0;
  text-align: center;
}

.feedback {
  margin-top: 12px;
  color: #ffa657;
}

.feedback.correct {
  color: #7ee787;
}

button:focus-visible {
  outline: 3px solid #7ee787;
  outline-offset: 2px;
}
</style>
