<script setup lang="ts">
import { ref } from "vue";

const answer = ref<string | null>(null);
const options = [
  ["a", "插入異常：沒有學生就存不了課程"],
  ["b", "更新異常：改一筆漏一筆，資料不一致"],
  ["c", "刪除異常：刪掉學生，課程也跟著消失"],
];
</script>

<template>
  <section class="quiz" aria-labelledby="nf-quiz-title">
    <p class="tag">CHECKPOINT_01</p>
    <h2 id="nf-quiz-title">「王老師」改名為「王教授」，要 UPDATE 37 筆課程記錄，漏了 3 筆。這是哪種異常？</h2>
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
        ? "✓ 正確：同一項事實存了 37 份，就要更新 37 次——正規化後老師名字只存一份。"
        : "再想想：關鍵字是「改」——插入異常卡在新增，刪除異常發生在刪掉最後一筆時。" }}
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
  font-size: 19px;
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
  border-color: #4479a1;
}

kbd {
  border: 1px solid #4479a1;
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
