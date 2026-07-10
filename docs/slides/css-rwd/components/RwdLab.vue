<script setup lang="ts">
import { computed, ref } from "vue";
const css=ref(`display: grid;\ngrid-template-columns: 140px 1fr;\ngap: 14px;\nfont-size: 14px;`);
const width=ref(520),dragging=ref(false);
const patterns:Record<string,RegExp>={display:/^(grid|block|flex)$/,"grid-template-columns":/^(\d+px 1fr|1fr)$/ ,gap:/^\d+px$/,"font-size":/^\d+px$/};
const userStyle=computed(()=>{const out:Record<string,string>={};for(const rule of css.value.split(";")){const [k0,...v0]=rule.split(":");const k=k0?.trim(),v=v0.join(":").trim();if(patterns[k]?.test(v))out[k]=v}return out});
const responsiveStyle=computed(()=>width.value<400?{...userStyle.value,gridTemplateColumns:"1fr"}:userStyle.value);
function resize(e:PointerEvent){if(!dragging.value)return;const box=(e.currentTarget as HTMLElement).getBoundingClientRect();width.value=Math.max(280,Math.min(610,e.clientX-box.left))}
</script>
<template>
  <div class="lab">
    <div class="editor"><Monaco v-model="css" lang="css" :height="190"/></div>
    <div class="bench" @pointermove="resize" @pointerup="dragging=false" @pointerleave="dragging=false">
      <article class="card" :style="{...responsiveStyle,width:width+'px'}">
        <div class="media">IMG</div><div><b>Container-aware card</b><p>{{width < 400 ? "窄版：單欄" : "寬版：雙欄"}} · {{Math.round(width)}}px</p><button>Explore</button></div>
      </article>
      <button class="handle" :style="{left:width+'px'}" @pointerdown.prevent="dragging=true" aria-label="拖曳調整容器">↔</button>
    </div>
  </div>
</template>
<style scoped>
.lab{display:grid;grid-template-columns:300px 1fr;gap:12px;width:860px;max-width:100%;font:11px "JetBrains Mono"}.editor,.bench{height:220px;border:1px solid #4ade8055;border-radius:14px;overflow:hidden;background:#09150e}.bench{position:relative;padding:27px 10px 10px;touch-action:none}.card{max-width:calc(100% - 20px);padding:12px;border:1px solid #4ade80;border-radius:12px;background:#102018;overflow:hidden}.media{min-height:70px;display:grid;place-items:center;border-radius:8px;background:#4ade8022;color:#4ade80}.card b{color:#f2fff6}.card p{margin:.35rem 0;color:#9db7a5}.card button{border:0;border-radius:7px;background:#4ade80;padding:4px 9px;color:#08210f}.handle{position:absolute;top:0;height:100%;width:18px;transform:translateX(-9px);cursor:ew-resize;border:0;border-left:2px solid #bef264;background:transparent;color:#bef264}
@media print{.lab{display:block}.editor{height:150px}.bench{height:180px;background:#f0fdf4}.handle{display:none}.card{width:520px!important;background:#fff}}
</style>
