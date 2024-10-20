<template>
  <div
    class="custom-aside p-4 bg-slate-50 border-l-4 border-slate-300 rounded-md shadow-md"
  >
    <div class="mb-4">
      <span
        id="busuanzi_container_site_pv"
        class="text-lg font-semibold text-gray-700"
      >
        本站總訪問量
        <span id="busuanzi_value_site_pv" class="text-blue-500"></span> 次
      </span>
    </div>
    <div class="mb-4">
      <span
        id="busuanzi_container_site_uv"
        class="text-lg font-semibold text-gray-700"
      >
        本站訪客數
        <span id="busuanzi_value_site_uv" class="text-green-500"></span> 人次
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyLayout",
};
</script>

<style scoped>
.custom-aside {
  color: gray;
  opacity: 0.6;
}
</style>
