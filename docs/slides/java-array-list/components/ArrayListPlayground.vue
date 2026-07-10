<script setup lang="ts">
import { ref, computed } from "vue";

const mode = ref<"array" | "list">("array");
const arraySize = 5;
const arrayCells = ref<(number | null)[]>([10, 20, null, null, null]);
const listItems = ref<number[]>([10, 20]);
const newValue = ref("");
const arrayError = ref("");
const selectedIndex = ref<number | null>(null);

function setArrayCell(index: number) {
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

function removeFromList(index: number) {
  listItems.value.splice(index, 1);
}

const arrayFilled = computed(() => arrayCells.value.filter((v) => v !== null).length);
</script>

<template>
  <div class="playground">
    <div class="mode-tabs">
      <button :class="['tab', { active: mode === 'array' }]" @click="mode = 'array'">
        Array（固定 {{ arraySize }}）
      </button>
      <button :class="['tab', { active: mode === 'list' }]" @click="mode = 'list'">
        List（動態）
      </button>
    </div>

    <div v-if="mode === 'array'" class="panel">
      <div class="memory-row">
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
      <div class="stats">length = {{ arraySize }}（固定）· 已填入 {{ arrayFilled }} 個</div>
      <div class="field-row">
        <input v-model="newValue" type="number" placeholder="數值" />
        <button class="btn" @click="selectedIndex !== null && setArrayCell(selectedIndex)">
          設定 [{{ selectedIndex ?? "?" }}]
        </button>
        <button class="btn warn" @click="tryAddToArray">add()</button>
      </div>
      <p v-if="arrayError" class="error">{{ arrayError }}</p>
      <p class="hint">點選格子後設定值；嘗試 add() 會看到錯誤</p>
    </div>

    <div v-else class="panel">
      <div class="memory-row list-row">
        <div v-for="(item, i) in listItems" :key="'l' + i" class="cell filled list-cell">
          <span class="idx">get({{ i }})</span>
          <span class="val">{{ item }}</span>
          <button class="remove" @click="removeFromList(i)">×</button>
        </div>
        <div v-if="listItems.length === 0" class="empty">（空列表）</div>
      </div>
      <div class="stats">size() = {{ listItems.length }}（可變）</div>
      <div class="field-row">
        <input v-model="newValue" type="number" placeholder="數值" @keyup.enter="addToList" />
        <button class="btn" @click="addToList">add()</button>
      </div>
      <p class="hint">可隨時 add() 與 remove()，底層會自動擴展</p>
    </div>
  </div>
</template>

<style scoped>
.playground {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.8rem;
}

.mode-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.tab {
  flex: 1;
  padding: 8px;
  border: 1px solid rgba(83, 130, 161, 0.4);
  border-radius: 8px;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
}

.tab.active {
  background: rgba(83, 130, 161, 0.15);
  border-color: #5382a1;
  color: #e76f00;
}

.memory-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.cell {
  width: 64px;
  padding: 8px 4px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.cell.filled {
  border-color: #5382a1;
  background: rgba(83, 130, 161, 0.1);
}

.cell.selected {
  border-color: #e76f00;
  box-shadow: 0 0 8px rgba(231, 111, 0, 0.3);
}

.idx {
  display: block;
  font-size: 0.65rem;
  color: #6b7280;
}

.val {
  display: block;
  font-size: 1rem;
  color: #7ee787;
  margin-top: 2px;
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
  color: #6b7280;
  padding: 20px;
}

.stats {
  font-size: 0.7rem;
  color: #9ca3af;
  margin-bottom: 10px;
}

.field-row {
  display: flex;
  gap: 6px;
}

input {
  flex: 1;
  padding: 6px 10px;
  background: #161b22;
  border: 1px solid rgba(83, 130, 161, 0.3);
  border-radius: 6px;
  color: #e5e7eb;
  font-family: inherit;
}

.btn {
  padding: 6px 12px;
  background: #5382a1;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.75rem;
}

.btn.warn {
  background: #c74634;
}

.error {
  color: #f87171;
  font-size: 0.75rem;
  margin-top: 8px;
}

.hint {
  font-size: 0.7rem;
  color: #6b7280;
  margin-top: 8px;
}
</style>
