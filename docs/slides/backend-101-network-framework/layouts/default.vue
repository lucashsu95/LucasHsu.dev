<script setup lang="ts">
import { useSlideContext } from '@slidev/client'

const { $page } = useSlideContext()
</script>

<template>
  <div class="slidev-layout">
    <slot />
    <div class="slidev-slidev-page-number">{{ String($page).padStart(2, '0') }}</div>
  </div>
</template>
