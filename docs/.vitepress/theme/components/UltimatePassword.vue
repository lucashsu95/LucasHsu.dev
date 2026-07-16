<script setup>
import { ref, computed, onMounted } from "vue";

const MIN = 1;
const MAX = 100;
const MAX_ATTEMPTS = 10;

const target = ref(0);
const guess = ref("");
const attempts = ref(0);
const history = ref([]);
const message = ref("");
const status = ref("playing"); // playing | won | lost

const remaining = computed(() => MAX_ATTEMPTS - attempts.value);
const isOver = computed(() => status.value !== "playing");

function randomTarget() {
  target.value = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}

function submitGuess() {
  if (isOver.value) return;
  const val = parseInt(guess.value);
  if (isNaN(val) || val < MIN || val > MAX) {
    message.value = `請輸入 ${MIN} 到 ${MAX} 之間的整數`;
    return;
  }

  attempts.value += 1;
  let hint = "";
  if (val === target.value) {
    status.value = "won";
    hint = "🎉 恭喜，猜中了！";
  } else if (val < target.value) {
    hint = "太小了，再大一點 ↑";
  } else {
    hint = "太大了，再小一點 ↓";
  }

  history.value.unshift({ value: val, hint, attempt: attempts.value });
  message.value = hint;
  guess.value = "";

  if (status.value === "won") {
    message.value = `🎉 恭喜！你在第 ${attempts.value} 次猜中了 ${target.value}`;
  } else if (attempts.value >= MAX_ATTEMPTS) {
    status.value = "lost";
    message.value = `💥 次數用盡！正確答案是 ${target.value}`;
  }
}

function restart() {
  randomTarget();
  guess.value = "";
  attempts.value = 0;
  history.value = [];
  message.value = "";
  status.value = "playing";
}

onMounted(() => {
  randomTarget();
});
</script>

<template>
  <div class="ultimate-password">
    <div class="header">
      <span class="title">終極密碼</span>
      <span class="range">範圍 {{ MIN }} – {{ MAX }}</span>
    </div>

    <div class="stats">
      <div class="stat">
        <span class="stat-label">剩餘次數</span>
        <span class="stat-value" :class="{ danger: remaining <= 3 }">{{ remaining }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">已猜次數</span>
        <span class="stat-value">{{ attempts }} / {{ MAX_ATTEMPTS }}</span>
      </div>
    </div>

    <div class="controls">
      <input
        v-model="guess"
        type="number"
        :min="MIN"
        :max="MAX"
        placeholder="輸入你的猜測..."
        :disabled="isOver"
        @keyup.enter="submitGuess"
      />
      <button class="btn" :disabled="isOver" @click="submitGuess">猜！</button>
    </div>

    <p
      v-if="message"
      class="message"
      :class="status"
    >
      {{ message }}
    </p>

    <div class="history">
      <div class="history-title">猜測紀錄</div>
      <ul v-if="history.length">
        <li v-for="item in history" :key="item.attempt">
          <span class="badge">#{{ item.attempt }}</span>
          <span class="guess-val">{{ item.value }}</span>
          <span class="hint-text">{{ item.hint }}</span>
        </li>
      </ul>
      <p v-else class="empty">還沒有猜測紀錄，開始挑戰吧！</p>
    </div>

    <button class="btn restart" @click="restart">重新開始</button>
  </div>
</template>

<style scoped>
.ultimate-password {
  margin: 1.5rem 0;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  font-family: var(--vp-font-family-base);
  font-size: 0.875rem;
}

.header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.range {
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}

.stats {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.stat-value.danger {
  color: #c74634;
}

.controls {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  min-width: 80px;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  font-size: 0.875rem;
}

input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: var(--vp-c-brand-text);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
  transition: opacity 0.2s;
}

.btn:hover:not(:disabled) {
  opacity: 0.85;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.message {
  margin: 0.875rem 0 0;
  padding: 0.625rem 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
}

.message.playing {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.message.won {
  background: var(--vp-c-green-soft, rgba(45, 212, 191, 0.15));
  color: var(--vp-c-green-1, #2dd4bf);
}

.message.lost {
  background: rgba(199, 70, 52, 0.12);
  color: #c74634;
}

.history {
  margin-top: 1rem;
}

.history-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.history ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.history li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.625rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
}

.badge {
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.125rem 0.375rem;
}

.guess-val {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.hint-text {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  margin-left: auto;
}

.empty {
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  margin: 0;
}

.restart {
  margin-top: 1rem;
  background: transparent;
  border: 1px solid var(--vp-c-brand);
  color: var(--vp-c-brand);
}
</style>
