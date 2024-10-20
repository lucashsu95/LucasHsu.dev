<template>
  <!-- Google Tag Manager (noscript) -->
  <noscript
    ><iframe
      :src="`https://www.googletagmanager.com/ns.html?id=${VITE_GOOGLE_ANALYTICS_ID}`"
      height="0"
      width="0"
      style="display: none; visibility: hidden"
    ></iframe
  ></noscript>
  <!-- End Google Tag Manager (noscript) -->
</template>

<script setup>
const VITE_GOOGLE_ANALYTICS_ID = process.env.VITE_GOOGLE_ANALYTICS_ID;
</script>
