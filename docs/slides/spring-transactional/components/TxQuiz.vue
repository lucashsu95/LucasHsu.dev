<script setup lang="ts">
import { ref } from "vue";

const answer = ref<string | null>(null);
const options = [
  ["a", "processUser() 加上 @Transactional，就一定有寫入事務"],
  ["b", "同類別內 this.saveUser() 呼叫，也會經過 AOP 代理"],
  ["c", "攔截器以方法名決定事務行為，process* 可能被當成唯讀"],
];
</script>

<template>
  <section class="quiz" aria-labelledby="tx-quiz-title">
    <p class="tag">CHECKPOINT_01</p>
    <h2 id="tx-quiz-title">關於全域事務攔截器，哪一句正確？</h2>
    <div class="answers">
      <button
        v-for="[key, text] in options"
        :key="key"
        :class="{ chosen: answer === key }"
        :aria-pressed="answer === key"
        @click="answer = key"
      >
        <kbd>{{ key.toUpperCase() }}</kbd>{{ text }}
      </button>
    </div>
    <p v-if="answer" class="feedback" :class="{ correct: answer === 'c' }" aria-live="polite">
      {{ answer === "c"
        ? "✓ 正確：命名決定命運——不符合寫入規則的方法名，會落入唯讀合約。"
        : "再想想：攔截器優先級更高，而 this. 呼叫繞過代理。" }}
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
  font-size: 22px;
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

button.chosen {
  border-color: #e76f00;
}

kbd {
  border: 1px solid #6db33f;
  border-radius: 5px;
  padding: 3px;
  color: #9be26b;
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
