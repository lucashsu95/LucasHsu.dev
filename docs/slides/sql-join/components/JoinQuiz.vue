<script setup lang="ts">
import { ref } from "vue";

const answer = ref<string | null>(null);
const options = [
  ["a", "所有學生都會列出，沒修 Math 的顯示 NULL"],
  ["b", "只剩有修 Math 的學生——LEFT JOIN 被 WHERE 變成 INNER 效果"],
  ["c", "語法錯誤：LEFT JOIN 之後不能接 WHERE"],
];
</script>

<template>
  <section class="quiz" aria-labelledby="join-quiz-title">
    <p class="tag">CHECKPOINT_01</p>
    <h2 id="join-quiz-title">
      LEFT JOIN courses c ... <strong>WHERE</strong> c.course_name = 'Math' 的結果是？
    </h2>
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
    <p v-if="answer" class="feedback" :class="{ correct: answer === 'b' }" aria-live="polite">
      {{ answer === "b"
        ? "✓ 正確：WHERE 在 JOIN 完成後過濾，把 NULL 的列全部濾掉。想保留所有學生，條件要放進 ON。"
        : "再想想：WHERE 是在 JOIN「之後」過濾——沒修 Math 的學生那列 c.course_name 是 NULL，會被濾掉。" }}
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
  font-size: 20px;
}

.quiz h2 strong {
  color: #e76f00;
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
  border-color: #336791;
}

kbd {
  border: 1px solid #336791;
  border-radius: 5px;
  padding: 3px;
  color: #79c0ff;
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
