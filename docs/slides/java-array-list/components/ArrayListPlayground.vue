<script setup lang="ts">
import { computed, ref } from "vue";

type Mode = "array" | "list";

const mode = ref<Mode>("list");
const arrayCells = ref<(number | null)[]>([10, 20, null, null, null]);
const listItems = ref([10, 20, 30]);
const capacity = ref(4);
const newValue = ref("40");
const insertIndex = ref("1");
const message = ref("拖曳元素可重新排序");
const copied = ref(0);
const shifted = ref(0);
const draggingIndex = ref<number | null>(null);

const arrayFilled = computed(
  () => arrayCells.value.filter((value) => value !== null).length,
);
const slots = computed(() =>
  Array.from({ length: capacity.value }, (_, index) => listItems.value[index]),
);

function parseValue() {
  const value = Number(newValue.value);
  if (!Number.isInteger(value)) {
    message.value = "請輸入整數";
    return null;
  }
  return value;
}

function growIfNeeded() {
  if (listItems.value.length < capacity.value) return;
  const old = capacity.value;
  capacity.value = old + Math.max(1, old >> 1);
  copied.value += listItems.value.length;
  message.value = `容量不足：建立 ${capacity.value} 格並複製 ${listItems.value.length} 個元素`;
}

function addToList() {
  const value = parseValue();
  if (value === null) return;
  if (listItems.value.length >= 9) {
    message.value = "投影片示範上限為 9 個元素，請刪除或重設";
    return;
  }
  growIfNeeded();
  listItems.value.push(value);
  if (!message.value.startsWith("容量不足"))
    message.value = "尾端加入：沒有搬移既有元素";
}

function insertToList() {
  const value = parseValue();
  const index = Number(insertIndex.value);
  if (value === null) return;
  if (listItems.value.length >= 9) {
    message.value = "投影片示範上限為 9 個元素，請刪除或重設";
    return;
  }
  if (!Number.isInteger(index) || index < 0 || index > listItems.value.length) {
    message.value = `索引需介於 0 與 ${listItems.value.length}`;
    return;
  }
  growIfNeeded();
  const moves = listItems.value.length - index;
  listItems.value.splice(index, 0, value);
  shifted.value += moves;
  message.value = `插入 index ${index}：向右搬移 ${moves} 個元素`;
}

function removeFromList(index: number) {
  listItems.value.splice(index, 1);
  const moves = listItems.value.length - index;
  shifted.value += moves;
  message.value = `刪除 index ${index}：向左搬移 ${moves} 個元素；capacity 不縮小`;
}

function setArrayCell(index: number) {
  const value = parseValue();
  if (value === null) return;
  arrayCells.value[index] = value;
  message.value = `array[${index}] = ${value}；length 仍是 ${arrayCells.value.length}`;
}

function dropOn(target: number) {
  const from = draggingIndex.value;
  draggingIndex.value = null;
  if (from === null || from === target) return;
  const [item] = listItems.value.splice(from, 1);
  listItems.value.splice(target, 0, item);
  shifted.value += Math.abs(target - from);
  message.value = `受控拖曳 ${from} → ${target}：資料已重新排列`;
}

function reset() {
  listItems.value = [10, 20, 30];
  capacity.value = 4;
  copied.value = 0;
  shifted.value = 0;
  message.value = "已重設；拖曳元素可重新排序";
}
</script>

<template>
  <section class="playground" aria-label="Array 與 ArrayList 互動模型">
    <div class="mode-tabs" role="tablist">
      <button
        v-for="item in (['array', 'list'] as Mode[])"
        :key="item"
        :class="['tab', { active: mode === item }]"
        role="tab"
        :aria-selected="mode === item"
        @click="mode = item"
      >
        {{ item === "array" ? "Array：固定 length" : "ArrayList：size / capacity" }}
      </button>
    </div>

    <template v-if="mode === 'array'">
      <div class="memory-row">
        <button
          v-for="(cell, index) in arrayCells"
          :key="index"
          class="cell"
          type="button"
          @click="setArrayCell(index)"
        >
          <span class="idx">[{{ index }}]</span>
          <span class="val">{{ cell ?? "—" }}</span>
        </button>
      </div>
      <div class="stats">
        length = {{ arrayCells.length }}（配置後固定） · 已使用 {{ arrayFilled }}
      </div>
      <p class="hint">輸入整數，再點一格寫入；Array 沒有 add()</p>
    </template>

    <template v-else>
      <div class="memory-row" aria-label="ArrayList 底層容量">
        <div
          v-for="(item, index) in slots"
          :key="index"
          :class="['cell', { empty: item === undefined, dragging: draggingIndex === index }]"
          :draggable="item !== undefined"
          @dragstart="draggingIndex = item === undefined ? null : index"
          @dragover.prevent
          @drop.prevent="dropOn(index)"
        >
          <span class="idx">{{ index }}</span>
          <span class="val">{{ item ?? "空" }}</span>
          <button
            v-if="item !== undefined"
            class="remove"
            type="button"
            :aria-label="`刪除索引 ${index}`"
            @click="removeFromList(index)"
          >×</button>
        </div>
      </div>
      <div class="meter" aria-label="容量使用率">
        <span :style="{ width: `${(listItems.length / capacity) * 100}%` }"></span>
      </div>
      <div class="stats">
        size = <b>{{ listItems.length }}</b> · capacity = <b>{{ capacity }}</b>
        · 複製 {{ copied }} · 搬移 {{ shifted }}
      </div>
    </template>

    <div class="controls">
      <input v-model="newValue" type="number" aria-label="新整數" placeholder="整數" />
      <template v-if="mode === 'list'">
        <button class="btn" type="button" @click="addToList">add</button>
        <input v-model="insertIndex" class="index-input" type="number" aria-label="插入索引" />
        <button class="btn secondary" type="button" @click="insertToList">insert</button>
        <button class="btn reset" type="button" @click="reset">重設</button>
      </template>
    </div>
    <p class="message" aria-live="polite">{{ message }}</p>
  </section>
</template>

<style scoped>
.playground { font-family: "JetBrains Mono", monospace; font-size: .68rem; }
.mode-tabs, .memory-row, .controls { display: flex; gap: 6px; }
.mode-tabs { margin-bottom: 8px; }
button, input { font: inherit; }
.tab { flex: 1; padding: 7px; border: 1px solid #5382a166; border-radius: 7px; background: transparent; color: #9ca3af; cursor: pointer; }
.tab.active { border-color: #5382a1; background: #5382a126; color: #ffa657; }
.memory-row { min-height: 58px; align-items: center; flex-wrap: wrap; margin-bottom: 6px; }
.cell { position: relative; width: 52px; min-width: 52px; padding: 7px 3px; border: 2px solid #5382a1; border-radius: 7px; background: #5382a11a; color: inherit; text-align: center; cursor: grab; }
button.cell { cursor: pointer; }
.cell.empty { border-style: dashed; border-color: #ffffff26; background: transparent; }
.cell.dragging { opacity: .4; }
.idx { display: block; color: #6b7280; font-size: .58rem; }
.val { display: block; margin-top: 2px; color: #7ee787; font-size: .9rem; }
.empty .val { color: #4b5563; }
.remove { position: absolute; top: -7px; right: -7px; width: 18px; height: 18px; padding: 0; border: 0; border-radius: 50%; background: #c74634; color: white; line-height: 18px; cursor: pointer; }
.meter { height: 4px; margin: 6px 0; overflow: hidden; border-radius: 2px; background: #ffffff18; }
.meter span { display: block; height: 100%; background: linear-gradient(90deg, #5382a1, #e76f00); transition: width .2s; }
.stats { margin: 5px 0 8px; color: #9ca3af; }
.controls { align-items: stretch; }
input { min-width: 0; width: 72px; padding: 6px 8px; border: 1px solid #5382a14d; border-radius: 5px; background: #161b22; color: #e5e7eb; }
.index-input { width: 44px; }
.btn { padding: 6px 9px; border: 0; border-radius: 5px; background: #5382a1; color: white; cursor: pointer; }
.btn.secondary { background: #e76f00; }
.btn.reset { margin-left: auto; background: #374151; }
.message, .hint { min-height: 1rem; margin: 6px 0 0; color: #ffa657; }
.hint { color: #6b7280; }
button:focus-visible, input:focus-visible { outline: 2px solid #7ee787; outline-offset: 2px; }
@media print {
  .controls, .remove { display: none !important; }
  .cell { break-inside: avoid; }
}
</style>
