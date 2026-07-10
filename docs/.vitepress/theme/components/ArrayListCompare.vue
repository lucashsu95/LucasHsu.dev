<script setup>
import { ref, computed } from "vue";

const mode = ref("array");
const arraySize = 5;
const arrayCells = ref([10, 20, null, null, null]);
const listItems = ref([10, 20]);
const newValue = ref("");
const arrayError = ref("");
const selectedIndex = ref(null);

function setArrayCell(index) {
  const val = parseInt(newValue.value);
  if (isNaN(val)) return;
  const next = [...arrayCells.value];
  next[index] = val;
  arrayCells.value = next;
  newValue.value = "";
  arrayError.value = "";
}

function tryAddToArray() {
  arrayError.value = "Array 大小固定！無法 add()，需建立新陣列";
}

function addToList() {
  const val = parseInt(newValue.value);
  if (isNaN(val)) return;
  listItems.value.push(val);
  newValue.value = "";
}

function removeFromList(index) {
  listItems.value.splice(index, 1);
}

const arrayFilled = computed(() => arrayCells.value.filter((v) => v !== null).length);
</script>

<template>
  <div class="array-list-compare">
    <div class="tabs">
      <button :class="['tab', { active: mode === 'array' }]" @click="mode = 'array'">
        Array（固定 {{ arraySize }}）
      </button>
      <button :class="['tab', { active: mode === 'list' }]" @click="mode = 'list'">
        List（動態）
      </button>
    </div>

    <div v-if="mode === 'array'" class="panel">
      <div class="cells">
        <div
          v-for="(cell, i) in arrayCells"
          :key="'a' + i"
          :class="['cell', { filled: cell !== null, selected: selectedIndex === i }]"
          @click="selectedIndex = i"
        >
          <span class="idx">[{{ i }}]</span>
          <span class="val">{{ cell ?? "—" }}</span>
        </div>
      </div>
      <p class="stats">length = {{ arraySize }}（固定）· 已填入 {{ arrayFilled }} 個</p>
      <div class="row">
        <input v-model="newValue" type="number" placeholder="數值" />
        <button class="btn" @click="selectedIndex !== null && setArrayCell(selectedIndex)">
          設定 [{{ selectedIndex ?? "?" }}]
        </button>
        <button class="btn warn" @click="tryAddToArray">add()</button>
      </div>
      <p v-if="arrayError" class="error">{{ arrayError }}</p>
      <p class="hint">點選格子後設定值；嘗試 add() 會看到 Array 的限制</p>
    </div>

    <div v-else class="panel">
      <div class="cells">
        <div v-for="(item, i) in listItems" :key="'l' + i" class="cell filled list-cell">
          <span class="idx">get({{ i }})</span>
          <span class="val">{{ item }}</span>
          <button class="remove" title="remove" @click="removeFromList(i)">×</button>
        </div>
        <div v-if="listItems.length === 0" class="empty">（空列表）</div>
      </div>
      <p class="stats">size() = {{ listItems.length }}（可變）</p>
      <div class="row">
        <input v-model="newValue" type="number" placeholder="數值" @keyup.enter="addToList" />
        <button class="btn" @click="addToList">add()</button>
      </div>
      <p class="hint">可隨時 add() 與 remove()，底層會自動擴展</p>
    </div>
  </div>
</template>

<style scoped>
.array-list-compare {
  margin: 1.5rem 0;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab {
  flex: 1;
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

.cells {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.cell {
  width: 72px;
  padding: 0.5rem 0.25rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  background: var(--vp-c-bg);
}

.cell.filled {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.cell.selected {
  border-color: #e76f00;
  box-shadow: 0 0 0 2px rgba(231, 111, 0, 0.2);
}

.idx {
  display: block;
  font-size: 0.6875rem;
  color: var(--vp-c-text-3);
}

.val {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-top: 0.125rem;
}

.list-cell .remove {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: none;
  background: #c74634;
  color: white;
  font-size: 12px;
  cursor: pointer;
  line-height: 1;
}

.empty {
  color: var(--vp-c-text-3);
  padding: 1.25rem;
}

.stats {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
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
}

.btn {
  padding: 0.5rem 0.875rem;
  background: var(--vp-c-brand);
  color: var(--vp-c-brand-text);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.8125rem;
}

.btn.warn {
  background: #c74634;
}

.error {
  color: #f87171;
  font-size: 0.8125rem;
  margin-top: 0.5rem;
}

.hint {
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  margin-top: 0.75rem;
}
</style>
