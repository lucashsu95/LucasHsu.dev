<script setup lang="ts">
import { ref } from "vue";

const answer = ref<string | null>(null);
const options = [
  ["a", "git reset --hard HEAD~1，然後 push -f"],
  ["b", "git revert <commit-id>，然後 push"],
  ["c", "直接刪掉錯誤的程式碼，再提交一次"],
];
</script>

<template>
  <section class="quiz" aria-labelledby="git-quiz-title">
    <p class="tag">CHECKPOINT_01</p>
    <h2 id="git-quiz-title">錯誤的提交「已推送到 main」，團隊五個人都拉了。怎麼回退？</h2>
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
        ? "✓ 正確：已推送的提交用 revert 生成反向提交，歷史保留、隊友安全。"
        : answer === "a"
          ? "× push -f 會重寫公開歷史，五個隊友的本地都會壞掉——等著被追殺。"
          : "× 直接刪程式碼無法追溯原因，歷史裡看不出「這是一次回退」。" }}
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
  border-color: #f05133;
}

kbd {
  border: 1px solid #f05133;
  border-radius: 5px;
  padding: 3px;
  color: #ff8f7a;
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
