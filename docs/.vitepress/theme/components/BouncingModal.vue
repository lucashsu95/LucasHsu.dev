<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";

const isOpen = ref(false);
const modalRef = ref(null);
const titleId = "bouncing-modal-title";
const lastFocused = ref(null);
const log = ref([]);

const scrollLocked = computed(() => isOpen.value);

function pushLog(msg) {
  log.value = [...log.value, msg].slice(-4);
}

function openModal() {
  if (isOpen.value) return;
  lastFocused.value = document.activeElement;
  isOpen.value = true;
  lockScroll();
  pushLog("彈跳視窗已開啟");
  nextTick(() => {
    const first = modalRef.value?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    (first || modalRef.value)?.focus();
  });
}

function closeModal(reason) {
  if (!isOpen.value) return;
  isOpen.value = false;
  unlockScroll();
  if (reason) pushLog(reason);
  nextTick(() => lastFocused.value?.focus());
}

function onBackdropClick(e) {
  // 只有點到背景遮罩本身才關閉，點到對話框內部不關閉
  if (e.target === e.currentTarget) closeModal("背景點擊 → 關閉");
}

function onKeydown(e) {
  if (!isOpen.value) return;
  if (e.key === "Escape") {
    e.preventDefault();
    closeModal("Esc 鍵 → 關閉");
    return;
  }
  if (e.key === "Tab") trapFocus(e);
}

function trapFocus(e) {
  const focusable = modalRef.value?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable || focusable.length === 0) return;
  const list = Array.from(focusable);
  const first = list[0];
  const last = list[list.length - 1];
  const active = document.activeElement;

  if (e.shiftKey) {
    if (active === first || !modalRef.value.contains(active)) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (active === last || !modalRef.value.contains(active)) {
      e.preventDefault();
      first.focus();
    }
  }
}

function lockScroll() {
  document.body.style.overflow = "hidden";
}

function unlockScroll() {
  document.body.style.overflow = "";
}

onMounted(() => {
  document.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
  unlockScroll();
});
</script>

<template>
  <div class="bouncing-modal">
    <button class="trigger" @click="openModal">開啟彈跳視窗</button>

    <p class="hint">
      點擊上方按鈕開啟。開啟後可嘗試：點擊背景遮罩關閉、按
      <kbd>Esc</kbd> 關閉、用 <kbd>Tab</kbd> 在對話框內循環焦點。
    </p>

    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isOpen"
          class="overlay"
          :class="{ 'scroll-locked': scrollLocked }"
          @click="onBackdropClick"
        >
          <div
            ref="modalRef"
            class="dialog"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="titleId"
            tabindex="-1"
          >
            <header class="dialog-head">
              <h2 :id="titleId" class="dialog-title">互動彈跳視窗</h2>
              <button class="close" aria-label="關閉" @click="closeModal('關閉按鈕 → 關閉')">
                ×
              </button>
            </header>

            <div class="dialog-body">
              <p>這是一個具備完整無障礙支援的對話框示範。</p>
              <ul class="feature-list">
                <li><strong>背景點擊關閉</strong>：點擊半透明遮罩即可關閉。</li>
                <li><strong>滾動鎖定</strong>：開啟時頁面背景無法捲動。</li>
                <li><strong>焦點陷阱</strong>：<kbd>Tab</kbd> 會在對話框內循環，不會跑到背景。</li>
              </ul>
              <label class="field">
                試著用 Tab 在下方欄位間移動：
                <input type="text" placeholder="輸入一些文字..." />
              </label>
              <div class="row">
                <button class="btn" @click="closeModal('確認按鈕 → 關閉')">確認</button>
                <button class="btn secondary" @click="closeModal('取消按鈕 → 關閉')">
                  取消
                </button>
              </div>
            </div>

            <footer class="dialog-foot">
              <span class="badge" :class="{ on: scrollLocked }">
                滾動鎖定：{{ scrollLocked ? "啟用" : "關閉" }}
              </span>
              <span class="badge on">焦點陷阱：啟用</span>
            </footer>
          </div>
        </div>
      </Transition>
    </Teleport>

    <div v-if="log.length" class="log" aria-live="polite">
      <span v-for="(entry, i) in log" :key="i" class="log-item">{{ entry }}</span>
    </div>
  </div>
</template>

<style scoped>
.bouncing-modal {
  margin: 1.5rem 0;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  font-size: 0.875rem;
}

.trigger {
  padding: 0.625rem 1.25rem;
  background: var(--vp-c-brand);
  color: var(--vp-c-brand-text);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  transition: filter 0.2s, transform 0.1s;
}

.trigger:hover {
  filter: brightness(1.08);
}

.trigger:active {
  transform: scale(0.97);
}

.hint {
  margin-top: 0.875rem;
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  line-height: 1.6;
}

kbd {
  display: inline-block;
  padding: 0.0625rem 0.375rem;
  border: 1px solid var(--vp-c-border);
  border-bottom-width: 2px;
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
}

/* 遮罩層：teleport 到 body，覆蓋整個視窗 */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(2px);
}

.overlay.scroll-locked {
  overflow: hidden;
}

/* 對話框本體 */
.dialog {
  width: 100%;
  max-width: 460px;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  outline: none;
}

.dialog-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.125rem 1.25rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.dialog-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.close {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 1.375rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.close:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.dialog-body {
  padding: 1.25rem;
  color: var(--vp-c-text-1);
  line-height: 1.7;
}

.feature-list {
  margin: 0.75rem 0 1rem;
  padding-left: 1.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.feature-list li {
  margin: 0.375rem 0;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.8125rem;
}

.field input {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-family: inherit;
  font-size: 0.875rem;
}

.field input:focus {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 1px;
  border-color: var(--vp-c-brand);
}

.row {
  display: flex;
  gap: 0.5rem;
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
}

.btn.secondary {
  background: transparent;
  border: 1px solid var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.dialog-foot {
  display: flex;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  border-top: 1px solid var(--vp-c-border);
}

.badge {
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  font-size: 0.75rem;
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-3);
}

.badge.on {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.log {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.875rem;
  padding-top: 0.875rem;
  border-top: 1px dashed var(--vp-c-border);
}

.log-item {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
}

/* 開啟 / 關閉動畫 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-active .dialog,
.modal-leave-active .dialog {
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .dialog,
.modal-leave-to .dialog {
  opacity: 0;
  transform: translateY(16px) scale(0.96);
}
</style>
