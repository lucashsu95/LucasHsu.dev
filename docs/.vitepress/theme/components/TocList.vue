<!-- 目錄 -->
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import sidebarData from "../sidebarData.json";

const list = computed(() => {
  const list = sidebarData.map((item) => ({ ...item, category: "Docs" }));
  return list.filter((item) => item.link);
});

const sortedList = computed(() => {
  const ls = [...list.value];
  return ls.sort((a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0));
});

const itemsToShow = ref(10);

const visibleList = computed(() => {
  return sortedList.value.slice(0, itemsToShow.value);
});

const loadMore = () => {
  itemsToShow.value += 10;
};

let observer;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore();
    }
  });

  observer.observe(document.querySelector("#load-more-trigger"));
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <div>
    <div v-for="item of visibleList" :key="item.link" class="space-y-3">
      <a :href="item.link">
        <h3 m="0">
          {{ item.text }}
        </h3>
      </a>
      <div class="text-sm space-x-4">
        <div class="inline-block">
          <span class="i-octicon:repo-16 align-middle text-xs opacity-50" />
          <span class="align-middle opacity-50"> 類別： </span>
          <span
            class="rounded-sm bg-[var(--vp-c-bg-mute)] px-6px py-3px align-middle opacity-70"
            style="margin-right: 0.75rem"
            >{{ item.category }}</span
          >
        </div>
        <div class="inline-block opacity-50">
          <span class="i-octicon:history-16 align-middle text-xs" />
          <span class="align-middle">
            更新時間：{{ new Date(item.lastUpdated || 0).toLocaleDateString() }}
          </span>
        </div>
      </div>
    </div>
    <div id="load-more-trigger" style="height: 1px"></div>
  </div>
</template>
