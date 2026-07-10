<script setup lang="ts">
import { computed, ref } from "vue";
const css=ref(`grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));\ngap: 10px;\ngrid-auto-rows: 54px;`);
const width=ref(540),dragging=ref(false);
const patterns:Record<string,RegExp>={
  "grid-template-columns":/^(repeat\((auto-fit|auto-fill|\d+),\s*minmax\(\d+px,\s*1fr\)\)|repeat\(\d+,\s*1fr\)|\d+px(?:\s+\d+px)*)$/,
  gap:/^\d+px$/,"grid-auto-rows":/^\d+px$/
};
const safeStyle=computed(()=>{const out:Record<string,string>={};for(const rule of css.value.split(";")){const [k0,...v0]=rule.split(":");const k=k0?.trim(),v=v0.join(":").trim();if(patterns[k]?.test(v))out[k]=v}return out});
function resize(e:PointerEvent){if(!dragging.value)return;const box=(e.currentTarget as HTMLElement).getBoundingClientRect();width.value=Math.max(300,Math.min(600,e.clientX-box.left))}
</script>
<template>
  <div class="lab">
    <div class="editor"><Monaco v-model="css" lang="css" :height="190"/></div>
    <div class="bench" @pointermove="resize" @pointerup="dragging=false" @pointerleave="dragging=false">
      <div class="stage" :style="{...safeStyle,width:width+'px'}"><i v-for="n in 7" :key="n">{{n}}</i></div>
      <button class="handle" :style="{left:width+'px'}" @pointerdown.prevent="dragging=true" aria-label="拖曳調整寬度">↔</button>
      <span>{{Math.round(width)}}px</span>
    </div>
  </div>
</template>
<style scoped>
.lab{display:grid;grid-template-columns:300px 1fr;gap:12px;width:860px;max-width:100%;font:11px "JetBrains Mono"}.editor,.bench{height:220px;border:1px solid #22d3ee55;border-radius:14px;overflow:hidden;background:#081519}.bench{position:relative;padding:28px 12px 10px;touch-action:none}.stage{display:grid;max-width:calc(100% - 20px)}.stage i{display:grid;place-items:center;background:#22d3ee20;border:1px solid #22d3ee;border-radius:8px;font-style:normal}.handle{position:absolute;top:0;height:100%;width:18px;transform:translateX(-9px);cursor:ew-resize;border:0;border-left:2px solid #38bdf8;background:transparent;color:#38bdf8}.bench>span{position:absolute;top:7px;right:10px;color:#94b8c0}
@media print{.lab{display:block}.editor{height:150px}.bench{height:180px;background:#ecfeff}.handle{display:none}}
</style>
