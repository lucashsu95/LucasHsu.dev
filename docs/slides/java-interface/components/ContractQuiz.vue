<script setup lang="ts">
import { ref } from "vue";

const answer = ref<string | null>(null);
const options = [
  ["a", "只要宣告 interface，就自動符合 DIP"],
  ["b", "高層政策與低層細節都依賴由高層需求主導的抽象"],
  ["c", "每個 class 都必須建立同名 interface"],
];
</script>

<template>
  <section class="quiz" aria-labelledby="quiz-title">
    <p class="tag">CHECKPOINT_01</p>
    <h2 id="quiz-title">哪一句最準確描述 DIP？</h2>
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
        ? "✓ 正確：重點是抽象的所有權與依賴方向，不是關鍵字。"
        : "再想想：interface 是工具，不是 DIP 的充分條件。" }}
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
  border: 1px solid #5382a1;
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
