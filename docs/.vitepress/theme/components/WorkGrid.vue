<script setup>
import { workGridSections } from "../data/siteData.js";

const basePath = "/LucasHsu.dev";
</script>

<template>
  <div class="lh-workgrid">
    <section
      v-for="section in workGridSections"
      :key="section.title"
      class="lh-workgrid__section"
    >
      <h2 class="lh-workgrid__heading">{{ section.title }}</h2>

      <div class="lh-workgrid__grid">
        <article
          v-for="item in section.items"
          :key="item.link"
          class="lh-workgrid__card"
        >
          <a :href="`${basePath}${item.link}`" class="lh-workgrid__thumb">
            <img
              v-if="item.image"
              :src="`${basePath}${item.image}`"
              :alt="item.title"
              loading="lazy"
            />
            <div v-else class="lh-workgrid__placeholder">
              <span>{{ item.title.slice(0, 2) }}</span>
            </div>
            <span v-if="item.year" class="lh-workgrid__year">{{ item.year }}</span>
          </a>

          <div class="lh-workgrid__body">
            <h3 class="lh-workgrid__title">
              <a :href="`${basePath}${item.link}`">{{ item.title }}</a>
            </h3>

            <div class="lh-workgrid__tags">
              <span v-for="tag in item.tags" :key="tag" class="lh-tag">{{
                tag
              }}</span>
            </div>

            <div class="lh-workgrid__actions">
              <a
                :href="`${basePath}${item.link}`"
                class="lh-workgrid__btn"
              >
                詳細
              </a>
              <a
                v-if="item.demo"
                :href="item.demo"
                class="lh-workgrid__btn lh-workgrid__btn--demo"
                target="_blank"
                rel="noopener noreferrer"
              >
                DEMO
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.lh-workgrid {
  margin: 2rem 0;
}

.lh-workgrid__section {
  margin-bottom: 3rem;
}

.lh-workgrid__heading {
  margin: 0 0 1.25rem;
  padding-bottom: 0.5rem;
  font-family: var(--vp-font-family-display);
  font-size: 1.35rem;
  font-weight: 700;
  border-bottom: 2px solid var(--lh-accent-soft);
}

.lh-workgrid__grid {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .lh-workgrid__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .lh-workgrid__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.lh-workgrid__card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--lh-radius-lg);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.lh-workgrid__card:hover {
  transform: translateY(-2px);
  border-color: var(--lh-accent-bright);
  box-shadow: var(--lh-shadow);
}

.lh-workgrid__thumb {
  position: relative;
  display: block;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.lh-workgrid__year {
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  padding: 0.15rem 0.5rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  font-weight: 700;
  color: #fff;
  background: rgba(23, 23, 43, 0.72);
  backdrop-filter: blur(4px);
  border-radius: 4px;
}

.lh-workgrid__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.lh-workgrid__card:hover .lh-workgrid__thumb img {
  transform: scale(1.03);
}

.lh-workgrid__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-family: var(--vp-font-family-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--lh-accent-bright);
  background: var(--lh-accent-soft);
}

.lh-workgrid__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem;
}

.lh-workgrid__title {
  margin: 0 0 0.5rem;
  font-family: var(--vp-font-family-display);
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.35;
}

.lh-workgrid__title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.lh-workgrid__title a:hover {
  color: var(--lh-accent-bright);
}

.lh-workgrid__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

.lh-workgrid__actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
}

.lh-workgrid__btn {
  flex: 1;
  padding: 0.4rem 0.6rem;
  font-size: 0.78rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  color: var(--lh-accent);
  background: var(--lh-accent-soft);
  border-radius: 6px;
  transition: background 0.15s ease;
}

.lh-workgrid__btn:hover {
  background: var(--lh-accent-soft);
  color: var(--lh-accent-bright);
}

.lh-workgrid__btn--demo {
  color: #fff;
  background: var(--lh-brand-gradient);
}

.lh-workgrid__btn--demo:hover {
  filter: brightness(1.08);
  color: #fff;
}
</style>
