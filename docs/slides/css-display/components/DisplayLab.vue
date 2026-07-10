<script setup lang="ts">
import { computed, ref } from "vue";
const css=ref(`display: flex;\ngap: 12px;\njustify-content: center;\nalign-items: center;`);
const items=ref(["A","B","C"]); const drag=ref<number|null>(null);
const allowed=new Set(["display","gap","justify-content","align-items","flex-direction","flex-wrap"]);
const patterns:Record<string,RegExp>={display:/^(block|inline|flex|grid|inline-flex|inline-grid|block flex|inline flex|block grid|inline grid)$/,gap:/^\d+(px|rem)$/, "justify-content":/^(start|center|end|space-between|space-around)$/,"align-items":/^(start|center|end|stretch)$/,"flex-direction":/^(row|column)$/,"flex-wrap":/^(nowrap|wrap)$/};
const safeStyle=computed(()=>{const out:Record<string,string>={};for(const rule of css.value.split(";")){const [k0,...v0]=rule.split(":");const k=k0?.trim(),v=v0.join(":").trim();if(allowed.has(k)&&patterns[k]?.test(v))out[k]=v}return out});
function drop(at:number){if(drag.value===null||drag.value===at)return;const next=[...items.value];const [m]=next.splice(drag.value,1);next.splice(at,0,m);items.value=next;drag.value=null}
</script>
<template>
  <div class="lab">
    <div class="editor"><Monaco v-model="css" lang="css" :height="190"/></div>
    <div class="stage" :style="safeStyle">
      <button v-for="(item,i) in items" :key="item" draggable="true" @dragstart="drag=i" @dragover.prevent @drop="drop(i)">{{ item }}</button>
    </div>
  </div>
</template>
<style scoped>
.lab{display:grid;grid-template-columns:1fr 1.15fr;gap:14px;width:820px;max-width:100%;font:12px "JetBrains Mono"}.editor,.stage{height:220px;border:1px solid #fb718555;border-radius:14px;overflow:hidden;background:#160e11}.stage{padding:18px;background-image:radial-gradient(#fb718520 1px,transparent 1px);background-size:16px 16px}.stage button{width:62px;height:62px;border:1px solid #fdba74;border-radius:16px;background:#fb718522;color:#fff;font-size:20px;cursor:grab}
@media print{.lab{display:block}.editor,.stage{height:170px}.stage{display:flex;gap:12px;background:#fff1f2}.stage button{color:#751a2d}}
</style>
