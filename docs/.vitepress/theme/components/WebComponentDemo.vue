<script setup>
import { ref, computed } from "vue";

const tab = ref("custom");

/* ---------- Custom Elements ---------- */
const ceName = ref("my-counter");
const ceCount = ref(0);
const ceLog = ref([]);

const ceValid = computed(() => /^[a-z][a-z0-9]*-[a-z0-9-]*$/.test(ceName.value));
const ceTagName = computed(() => (ceValid.value ? `<${ceName.value}>` : "（名稱無效）"));

function ceIncrement() {
  ceCount.value += 1;
  ceLog.value.unshift({ type: "connectedCallback", text: `計數更新為 ${ceCount.value}` });
}

function ceReset() {
  ceCount.value = 0;
  ceLog.value.unshift({ type: "attributeChangedCallback", text: "count 屬性重置為 0" });
}

function ceMount() {
  ceLog.value.unshift({ type: "connectedCallback", text: `元素 <${ceName.value}> 已掛載到 DOM` });
}

function ceUnmount() {
  ceLog.value.unshift({ type: "disconnectedCallback", text: `元素 <${ceName.value}> 已從 DOM 移除` });
}

/* ---------- Shadow DOM ---------- */
const sdExternalColor = ref("#e74c3c");
const sdInternalColor = ref("#3498db");
const sdExternalApplied = ref(false);

const sdExternalStyle = computed(() => {
  if (!sdExternalApplied.value) return "";
  return `color: ${sdExternalColor.value}; font-weight: bold;`;
});

/* ---------- Slots ---------- */
const slotTitle = ref("我的卡片");
const slotBody = ref("這是透過預設 slot 投影進來的內容。");
const slotFooter = ref("頁尾資訊 © 2026");

const slotPreview = computed(() => {
  const lines = [];
  lines.push(`<my-card>`);
  lines.push(`  <span slot="title">${slotTitle.value || "（空）"}</span>`);
  lines.push(`  ${slotBody.value || "（空）"}`);
  lines.push(`  <span slot="footer">${slotFooter.value || "（空）"}</span>`);
  lines.push(`</my-card>`);
  return lines.join("\n");
});
</script>

<template>
  <div class="wc-demo">
    <div class="tabs">
      <button :class="['tab', { active: tab === 'custom' }]" @click="tab = 'custom'">
        Custom Elements
      </button>
      <button :class="['tab', { active: tab === 'shadow' }]" @click="tab = 'shadow'">
        Shadow DOM
      </button>
      <button :class="['tab', { active: tab === 'slots' }]" @click="tab = 'slots'">
        Slots
      </button>
    </div>

    <!-- Custom Elements -->
    <div v-if="tab === 'custom'" class="panel">
      <p class="desc">
        Custom Element 是開發者自訂的全新 HTML 標籤，透過
        <code>customElements.define()</code> 註冊，並擁有完整的生命週期回呼。
      </p>

      <div class="demo-box">
        <div class="ce-preview">
          <span class="ce-tag">{{ ceTagName }}</span>
          <div class="ce-display">
            <span class="ce-count">{{ ceCount }}</span>
          </div>
          <div class="ce-actions">
            <button class="btn" @click="ceIncrement">+1</button>
            <button class="btn secondary" @click="ceReset">重置</button>
          </div>
        </div>

        <div class="ce-lifecycle">
          <div class="lc-title">生命週期回呼</div>
          <ul>
            <li :class="{ on: ceLog.length > 0 }"><code>connectedCallback</code> 掛載到 DOM</li>
            <li :class="{ on: ceCount > 0 }"><code>attributeChangedCallback</code> 屬性變動</li>
            <li><code>disconnectedCallback</code> 從 DOM 移除</li>
            <li><code>adoptedCallback</code> 移動到新文件</li>
          </ul>
          <div class="lc-log">
            <div v-if="ceLog.length" class="lc-log-title">事件紀錄</div>
            <ul v-if="ceLog.length">
              <li v-for="(e, i) in ceLog" :key="i">
                <span class="lc-type">{{ e.type }}</span>
                <span class="lc-text">{{ e.text }}</span>
              </li>
            </ul>
            <p v-else class="lc-empty">尚無事件，點擊上方按鈕試試看。</p>
          </div>
          <div class="lc-mount">
            <button class="btn ghost" @click="ceMount">模擬掛載</button>
            <button class="btn ghost" @click="ceUnmount">模擬移除</button>
          </div>
        </div>
      </div>

      <label class="field">
        自訂標籤名稱（須含連字號 <code>-</code>，如 my-counter）
        <input v-model="ceName" :class="{ invalid: !ceValid }" placeholder="my-counter" />
      </label>
      <p class="hint">
        標籤名稱必須包含一個連字號，這是瀏覽器用來區分原生標籤與自訂標籤的規則。
      </p>
    </div>

    <!-- Shadow DOM -->
    <div v-else-if="tab === 'shadow'" class="panel">
      <p class="desc">
        Shadow DOM 為元件建立獨立的 DOM 與樣式作用域。外部 CSS 無法穿透影響內部樣式，
        內部樣式也不會外洩——這就是「樣式隔離」。
      </p>

      <div class="demo-box">
        <div class="sd-col">
          <div class="sd-label">外部頁面（Light DOM）</div>
          <div class="sd-external">
            <p class="sd-note">這段文字受外部 CSS 控制：</p>
            <p class="sd-target" :style="sdExternalStyle">
              我是被 Shadow 包住的元素
            </p>
            <label class="sd-toggle">
              <input type="checkbox" v-model="sdExternalApplied" />
              對外部元素套用紅色粗體
            </label>
            <div class="sd-color-row">
              <span>外部顏色</span>
              <input type="color" v-model="sdExternalColor" />
            </div>
          </div>
        </div>

        <div class="sd-col">
          <div class="sd-label">Shadow DOM 內部</div>
          <div class="sd-shadow">
            <p class="sd-note">內部樣式固定為藍色，不受外部影響：</p>
            <p class="sd-inner" :style="{ color: sdInternalColor }">
              我是被 Shadow 包住的元素
            </p>
            <div class="sd-color-row">
              <span>內部顏色</span>
              <input type="color" v-model="sdInternalColor" />
            </div>
          </div>
        </div>
      </div>

      <p class="hint">
        勾選左側「套用紅色粗體」後，只有外部元素變色；右側 Shadow 內部的藍色文字紋風不動——
        證明樣式被隔離在各自的範圍中。
      </p>
    </div>

    <!-- Slots -->
    <div v-else class="panel">
      <p class="desc">
        Slot 讓使用者在標籤內撰寫的內容「投影」進元件的預留位置。具名 slot 對應
        <code>slot="name"</code>，未命名的內容則進入預設 slot。
      </p>

      <div class="demo-box">
        <div class="slot-col">
          <div class="sd-label">渲染結果</div>
          <div class="slot-card">
            <div class="slot-header">
              <slot v-if="false" />
              <span class="slot-filled">{{ slotTitle || "（無標題）" }}</span>
            </div>
            <div class="slot-body">
              {{ slotBody || "（無內容）" }}
            </div>
            <div class="slot-footer">
              {{ slotFooter || "（無頁尾）" }}
            </div>
          </div>
        </div>

        <div class="slot-col">
          <div class="sd-label">原始碼</div>
          <pre class="slot-code">{{ slotPreview }}</pre>
        </div>
      </div>

      <div class="slot-fields">
        <label class="field">
          <span>具名 slot：title</span>
          <input v-model="slotTitle" placeholder="我的卡片" />
        </label>
        <label class="field">
          <span>預設 slot（body）</span>
          <input v-model="slotBody" placeholder="投影進來的內容" />
        </label>
        <label class="field">
          <span>具名 slot：footer</span>
          <input v-model="slotFooter" placeholder="頁尾資訊" />
        </label>
      </div>
      <p class="hint">
        修改上方輸入框，右側卡片會即時更新——這就是 slot 把外部內容「投影」進元件模板的過程。
      </p>
    </div>
  </div>
</template>

<style scoped>
.wc-demo {
  margin: 1.5rem 0;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  font-family: var(--vp-font-family-base);
  font-size: 0.875rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.tab {
  flex: 1;
  min-width: 120px;
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  font-size: 0.8125rem;
}

.tab.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 600;
}

.panel {
  animation: fade 0.25s ease;
}

@keyframes fade {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.desc {
  margin: 0 0 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.desc code,
.field code,
.hint code {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  padding: 0.0625rem 0.375rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  color: var(--vp-c-brand);
}

.demo-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  .demo-box {
    grid-template-columns: 1fr;
  }
}

/* Custom Elements */
.ce-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px dashed var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.ce-tag {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  padding: 0.25rem 0.625rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
}

.ce-display {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--vp-c-brand-soft);
  border: 2px solid var(--vp-c-brand);
}

.ce-count {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.ce-actions {
  display: flex;
  gap: 0.5rem;
}

.ce-lifecycle {
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.lc-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.ce-lifecycle ul {
  list-style: none;
  margin: 0 0 0.75rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.ce-lifecycle > ul > li {
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  padding-left: 1.25rem;
  position: relative;
  transition: color 0.2s;
}

.ce-lifecycle > ul > li.on {
  color: var(--vp-c-text-1);
}

.ce-lifecycle > ul > li::before {
  content: "○";
  position: absolute;
  left: 0;
  color: var(--vp-c-border);
}

.ce-lifecycle > ul > li.on::before {
  content: "●";
  color: var(--vp-c-brand);
}

.ce-lifecycle code {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand);
}

.lc-log {
  border-top: 1px solid var(--vp-c-border);
  padding-top: 0.625rem;
}

.lc-log-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.375rem;
}

.lc-log ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-height: 120px;
  overflow-y: auto;
}

.lc-log li {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  font-size: 0.75rem;
}

.lc-type {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand);
  font-weight: 600;
  white-space: nowrap;
}

.lc-text {
  color: var(--vp-c-text-2);
}

.lc-empty {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin: 0;
}

.lc-mount {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.625rem;
}

/* Shadow DOM */
.sd-col,
.slot-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sd-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.sd-external,
.sd-shadow {
  flex: 1;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
}

.sd-external {
  background: var(--vp-c-bg);
}

.sd-shadow {
  background: var(--vp-c-bg-alt, var(--vp-c-bg));
  border-style: dashed;
  border-color: var(--vp-c-brand);
}

.sd-note {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin: 0 0 0.5rem;
}

.sd-target,
.sd-inner {
  font-size: 1rem;
  margin: 0 0 0.75rem;
  transition: color 0.2s;
}

.sd-toggle {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  margin-bottom: 0.5rem;
}

.sd-color-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}

.sd-color-row input[type="color"] {
  width: 36px;
  height: 28px;
  padding: 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: none;
  cursor: pointer;
}

/* Slots */
.slot-card {
  flex: 1;
  border: 1px solid var(--vp-c-brand);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.slot-header {
  padding: 0.625rem 0.875rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 700;
  font-size: 0.9375rem;
}

.slot-body {
  padding: 0.875rem;
  color: var(--vp-c-text-1);
  line-height: 1.6;
  min-height: 48px;
}

.slot-footer {
  padding: 0.5rem 0.875rem;
  border-top: 1px solid var(--vp-c-border);
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.slot-code {
  flex: 1;
  margin: 0;
  padding: 0.875rem;
  border-radius: 8px;
  background: #0d1117;
  color: #e5e7eb;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre;
}

.slot-fields {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .slot-fields {
    grid-template-columns: 1fr;
  }
}

/* Shared form + button */
.field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  color: var(--vp-c-text-2);
  font-size: 0.8125rem;
}

.field input {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  font-size: 0.875rem;
}

.field input.invalid {
  border-color: #c74634;
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
  transition: opacity 0.2s, transform 0.15s ease;
}

.btn:hover {
  opacity: 0.85;
}

.btn:active {
  transform: translateY(1px);
}

.btn.secondary {
  background: transparent;
  border: 1px solid var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.btn.ghost {
  background: transparent;
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-2);
  font-size: 0.8125rem;
  padding: 0.375rem 0.75rem;
}

.btn.ghost:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  opacity: 1;
}

.hint {
  margin-top: 0.75rem;
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  line-height: 1.6;
}
</style>
