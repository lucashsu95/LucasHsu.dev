<script setup lang="ts">
import { ref } from "vue";

const answer = ref<string | null>(null);
const options = [
  ["a", "Usecase：在商業邏輯裡加一段查快取的程式"],
  ["b", "Controller：收到請求先看看快取有沒有"],
  ["c", "Repository：包一層 CacheUserRepository，先查快取再查 DB"],
];
</script>

<template>
  <section class="quiz" aria-labelledby="layer-quiz-title">
    <p class="tag">CHECKPOINT_01</p>
    <h2 id="layer-quiz-title">使用者抱怨查詢太慢，你決定加快取（Cache）。該改哪一層？</h2>
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
        ? "✓ 正確：快取是「資料怎麼拿」的細節——包一層 Repository 裝飾器，Usecase 完全不用動。"
        : "再想想：快取跟「做什麼」（商業邏輯）無關，它是「怎麼拿資料」的細節——該藏在資料存取層。" }}
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

button.chosen {
  border-color: #a371f7;
}

kbd {
  border: 1px solid #a371f7;
  border-radius: 5px;
  padding: 3px;
  color: #d2a8ff;
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
