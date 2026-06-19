<script setup>
import { computed } from "vue";

const props = defineProps({
  slug: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, default: "" },
  pdf: { type: String, default: "" },
});

const basePath = "/LucasHsu.dev/";

const slideUrl = computed(() => `${basePath}slides/${props.slug}/index.html`);
const pdfUrl = computed(() => props.pdf || `${basePath}slides/${props.slug}.pdf`);
const thumbnailUrl = computed(() => props.thumbnail || `${basePath}slides/${props.slug}/thumbnail.png`);
</script>

<template>
  <article class="slide-card">
    <a :href="slideUrl" class="slide-thumbnail" target="_self" rel="noopener">
      <img
        :src="thumbnailUrl"
        :alt="title"
        loading="lazy"
      />
    </a>
    <div class="slide-content">
      <h3 class="slide-title">{{ title }}</h3>
      <p class="slide-description">{{ description }}</p>
      <div class="slide-actions">
        <a :href="slideUrl" class="slide-btn slide-btn-primary" target="_self" rel="noopener">
          開啟投影片
        </a>
        <a :href="pdfUrl" class="slide-btn slide-btn-secondary" download>
          下載 PDF
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.slide-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.slide-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.slide-thumbnail {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  flex-shrink: 0;
}

.slide-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.slide-card:hover .slide-thumbnail img {
  transform: scale(1.02);
}

.slide-content {
  display: flex;
  flex-direction: column;
  padding: 16px;
  flex: 1;
}

.slide-title {
  margin: 0 0 8px;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.slide-description {
  margin: 0 0 16px;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  flex: 1;
}

.slide-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.slide-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 0;
  padding: 10px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.slide-btn-primary {
  background-color: var(--vp-c-brand);
  color: var(--vp-c-brand-text);
  border: 1px solid var(--vp-c-brand);
}

.slide-btn-primary:hover {
  background-color: var(--vp-c-brand-dark);
  border-color: var(--vp-c-brand-dark);
  color: var(--vp-c-brand-text);
}

.slide-btn-secondary {
  background-color: transparent;
  color: var(--vp-c-brand);
  border: 1px solid var(--vp-c-brand);
}

.slide-btn-secondary:hover {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

@media (max-width: 640px) {
  .slide-card {
    max-width: none;
  }

  .slide-btn {
    flex: 1 1 calc(50% - 4px);
  }
}
</style>