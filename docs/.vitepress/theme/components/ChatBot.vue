<script setup>
import { ref, computed, nextTick } from "vue";

// 訊息結構：{ id, role: 'user' | 'bot', text }
let msgId = 0;
const messages = ref([
  {
    id: msgId++,
    role: "bot",
    text: "嗨！我是示範用聊天機器人 🤖 點下方快捷問題，或直接輸入訊息試試看。",
  },
]);

const input = ref("");
const isTyping = ref(false);
const scrollRef = ref(null);

// 快捷回覆主題
const quickReplies = [
  { label: "什麼是聊天機器人？", topic: "intro" },
  { label: "怎麼處理使用者輸入？", topic: "input" },
  { label: "機器人如何回應？", topic: "response" },
  { label: "重設對話", topic: "reset" },
];

// 根據輸入內容產生機器人回應
function robotMessage(text) {
  const t = text.toLowerCase();

  if (t.includes("重設") || t.includes("reset") || t.includes("清空")) {
    return "對話已重設 ✅ 有什麼我可以幫你的嗎？";
  }
  if (t.includes("輸入") || t.includes("input") || t.includes("表單")) {
    return "處理使用者輸入通常會用 v-model 綁定文字框，並在送出時呼叫 handleMessageSubmit() 把訊息加入陣列，再清空輸入框。";
  }
  if (t.includes("回應") || t.includes("response") || t.includes("回覆") || t.includes("reply")) {
    return "機器人回應可以用 robotMessage() 這類函式，依據關鍵字比對產生對應文字，並加上一點延遲（例如 500ms）模擬「正在輸入」的感覺。";
  }
  if (t.includes("聊天") || t.includes("chatbot") || t.includes("機器人") || t.includes("bot")) {
    return "聊天機器人就是一個能接收使用者訊息、並自動產生回應的程式。前端常用 Vue 的響應式資料來管理訊息列表。";
  }
  if (t.includes("你好") || t.includes("hi") || t.includes("hello") || t.includes("嗨")) {
    return "你好 👋 很高興見到你！想了解聊天機器人的哪個部分呢？";
  }
  if (t.trim() === "") {
    return "我沒聽清楚，可以再說一次嗎？";
  }
  return `你說的是「${text}」吧？這是一個示範機器人，我會針對「輸入」「回應」「聊天機器人」等關鍵字回應，也可以點下方的快捷問題 😊`;
}

// 送出使用者訊息
function handleMessageSubmit(text) {
  const content = (text ?? input.value).trim();
  if (!content || isTyping.value) return;

  // 加入使用者訊息（靠右對齊）
  messages.value.push({ id: msgId++, role: "user", text: content });
  input.value = "";
  scrollToBottom();

  // 顯示「正在輸入」指示器
  isTyping.value = true;
  scrollToBottom();

  // 500ms 延遲後回應
  setTimeout(() => {
    const reply = robotMessage(content);
    messages.value.push({ id: msgId++, role: "bot", text: reply });
    isTyping.value = false;
    scrollToBottom();
  }, 500);
}

// 點擊快捷回覆
function onQuickReply(topic) {
  const map = {
    intro: "什麼是聊天機器人？",
    input: "怎麼處理使用者輸入？",
    response: "機器人如何回應？",
    reset: "重設對話",
  };
  handleMessageSubmit(map[topic] ?? topic);
}

// 重設對話
function resetChat() {
  messages.value = [
    {
      id: msgId++,
      role: "bot",
      text: "對話已重設 ✅ 有什麼我可以幫你的嗎？",
    },
  ];
  input.value = "";
  isTyping.value = false;
  scrollToBottom();
}

// 自動捲動到底部
async function scrollToBottom() {
  await nextTick();
  const el = scrollRef.value;
  if (el) el.scrollTop = el.scrollHeight;
}

const canSend = computed(() => input.value.trim().length > 0 && !isTyping.value);
</script>

<template>
  <div class="chatbot">
    <div class="chat-header">
      <span class="chat-title">💬 互動聊天機器人</span>
      <button class="reset-link" @click="resetChat">重設</button>
    </div>

    <div ref="scrollRef" class="chat-window" aria-live="polite">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="msg-row"
        :class="msg.role === 'user' ? 'user' : 'bot'"
      >
        <div class="avatar" aria-hidden="true">
          {{ msg.role === "user" ? "🧑" : "🤖" }}
        </div>
        <div class="bubble">{{ msg.text }}</div>
      </div>

      <div v-if="isTyping" class="msg-row bot">
        <div class="avatar" aria-hidden="true">🤖</div>
        <div class="bubble typing">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>

    <div class="quick-replies">
      <button
        v-for="q in quickReplies"
        :key="q.topic"
        class="quick-btn"
        :disabled="isTyping"
        @click="onQuickReply(q.topic)"
      >
        {{ q.label }}
      </button>
    </div>

    <form class="chat-input" @submit.prevent="handleMessageSubmit()">
      <input
        v-model="input"
        type="text"
        placeholder="輸入訊息..."
        :disabled="isTyping"
        aria-label="訊息輸入框"
      />
      <button class="send-btn" type="submit" :disabled="!canSend">送出</button>
    </form>
  </div>
</template>

<style scoped>
.chatbot {
  margin: 1.5rem 0;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  font-family: var(--vp-font-family-base);
  font-size: 0.875rem;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.875rem;
}

.chat-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.reset-link {
  padding: 0.25rem 0.625rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  font-family: inherit;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.reset-link:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.chat-window {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  max-height: 320px;
  overflow-y: auto;
  padding: 0.25rem;
  margin-bottom: 0.875rem;
}

.msg-row {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}

.msg-row.user {
  flex-direction: row-reverse;
}

.avatar {
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  font-size: 0.9375rem;
  line-height: 1;
}

.bubble {
  max-width: 78%;
  padding: 0.5625rem 0.8125rem;
  border-radius: 12px;
  line-height: 1.55;
  word-break: break-word;
  white-space: pre-wrap;
}

.msg-row.bot .bubble {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
  border-bottom-left-radius: 4px;
}

.msg-row.user .bubble {
  background: var(--vp-c-brand);
  color: var(--vp-c-brand-text);
  border-bottom-right-radius: 4px;
}

/* 正在輸入指示器 */
.bubble.typing {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.bubble.typing .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  animation: blink 1.2s infinite ease-in-out;
}

.bubble.typing .dot:nth-child(2) {
  animation-delay: 0.2s;
}

.bubble.typing .dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-2px); }
}

.quick-replies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.875rem;
}

.quick-btn {
  padding: 0.4375rem 0.8125rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-family: inherit;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.quick-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.quick-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chat-input {
  display: flex;
  gap: 0.5rem;
}

.chat-input input {
  flex: 1;
  min-width: 80px;
  padding: 0.5625rem 0.8125rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  font-size: 0.875rem;
}

.chat-input input:focus {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 1px;
  border-color: var(--vp-c-brand);
}

.chat-input input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-btn {
  padding: 0.5625rem 1.125rem;
  background: var(--vp-c-brand);
  color: var(--vp-c-brand-text);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  transition: opacity 0.2s, transform 0.1s;
}

.send-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.send-btn:active:not(:disabled) {
  transform: scale(0.97);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .bubble {
    max-width: 85%;
  }

  .quick-btn {
    flex: 1 1 auto;
    text-align: center;
  }
}
</style>
