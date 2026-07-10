<script setup lang="ts">
import { computed, ref } from "vue";
const css = ref(`position: absolute;\ntop: 36px;\nleft: 48px;\nz-index: 2;`);
const anchor = ref({ x: 48, y: 36 });
const dragging = ref(false);
const allowed = new Set(["position","top","right","bottom","left","inset","z-index"]);
const safeStyle = computed(() => {
  const out: Record<string,string> = {};
  for (const rule of css.value.split(";")) {
    const [rawKey,...rest] = rule.split(":"); const key=rawKey?.trim(); const value=rest.join(":").trim();
    if (allowed.has(key) && /^(absolute|relative|fixed|sticky|-?\d+(?:\.\d+)?(?:px|rem|%)?|auto)$/.test(value)) out[key]=value;
  }
  return out;
});
function move(e: PointerEvent) {
  if (!dragging.value) return;
  const box=(e.currentTarget as HTMLElement).getBoundingClientRect();
  anchor.value={x:Math.max(0,Math.min(260,e.clientX-box.left)),y:Math.max(0,Math.min(125,e.clientY-box.top))};
  css.value=`position: absolute;\ntop: ${Math.round(anchor.value.y)}px;\nleft: ${Math.round(anchor.value.x)}px;\nz-index: 2;`;
}
</script>
<template>
  <div class="lab">
    <div class="editor"><Monaco v-model="css" lang="css" :height="190" /></div>
    <div class="stage" @pointermove="move" @pointerup="dragging=false" @pointerleave="dragging=false">
      <span class="label">position: relative</span>
      <button :style="safeStyle" @pointerdown.prevent="dragging=true">拖我</button>
      <div class="ruler">x {{ Math.round(anchor.x) }} · y {{ Math.round(anchor.y) }}</div>
    </div>
  </div>
</template>
<style scoped>
.lab{display:grid;grid-template-columns:1fr 1.15fr;gap:14px;width:820px;max-width:100%;font:12px "JetBrains Mono"}
.editor,.stage{height:220px;border:1px solid #a78bfa55;border-radius:14px;overflow:hidden;background:#11101a}
.stage{position:relative;background-image:linear-gradient(#a78bfa16 1px,transparent 1px),linear-gradient(90deg,#a78bfa16 1px,transparent 1px);background-size:20px 20px;touch-action:none}
.stage button{cursor:grab;background:#a78bfa;color:#100d18;border:0;border-radius:10px;padding:9px 14px;font-weight:800}.label,.ruler{position:absolute;color:#aaa4bb}.label{top:8px;right:10px}.ruler{bottom:8px;left:10px}
@media print{.lab{display:block}.editor{height:170px}.stage{height:170px;background:#eee}.stage button{background:#6d28d9;color:white}}
</style>
