<script setup lang="ts">
import { computed } from 'vue'
// 重用站上現成的下載卡片；它吃的是 VitePress 的 --vp-c-* 變數，下面在外層對應到簡報的色票
import FileDownloadCard from '../../../.vitepress/theme/components/FileDownloadCard.vue'

// 用 import.meta.glob 取得 Vite 處理過的網址，部署在子路徑（--base）時也不會壞
const files = import.meta.glob('../demo/*', { query: '?url', import: 'default', eager: true }) as Record<string, string>

const props = defineProps<{ file: string }>()
const href = computed(() => files[`../demo/${props.file}`])
</script>

<template>
  <div v-if="href" class="dl">
    <FileDownloadCard :file-name="file" :download-url="href" />
  </div>
</template>

<style scoped>
.dl {
  --vp-c-bg: var(--surface);
  --vp-c-bg-soft: var(--surface-2);
  --vp-c-border: var(--line-2);
  --vp-c-brand: var(--accent);
  --vp-c-brand-1: var(--accent);
  --vp-c-brand-dark: var(--accent-wash);
  --vp-c-brand-text: var(--accent);
  --vp-c-text-1: var(--fg);
  --vp-c-text-2: var(--fg-3);
  font-family: var(--font-sans);
}
</style>
