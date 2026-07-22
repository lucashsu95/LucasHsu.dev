<script setup>
import { featuredWorks, skillTags } from "../data/siteData.js";

const basePath = "/LucasHsu.dev";
</script>

<template>
  <section class="lh-featured" aria-label="Featured works">
    <p class="lh-section-label">Featured</p>
    <h2 class="lh-section-title">精選作品</h2>

    <div class="lh-featured__grid">
      <article
        v-for="(work, i) in featuredWorks"
        :key="work.title"
        class="lh-featured__card lh-animate"
        :style="{ '--lh-delay': `${i * 100}ms` }"
      >
        <a :href="`${basePath}${work.link}`" class="lh-featured__thumb">
          <img
            v-if="work.image"
            :src="`${basePath}${work.image}`"
            :alt="work.title"
            loading="lazy"
          />
          <div v-else class="lh-featured__placeholder">
            <span>{{ work.title.charAt(0) }}</span>
          </div>
        </a>

        <div class="lh-featured__body">
          <h3 class="lh-featured__title">
            <a :href="`${basePath}${work.link}`">{{ work.title }}</a>
          </h3>
          <p class="lh-featured__desc">{{ work.description }}</p>

          <div class="lh-featured__tags">
            <span v-for="tag in work.tags" :key="tag" class="lh-tag">{{
              tag
            }}</span>
          </div>

          <div class="lh-featured__actions">
            <a
              v-if="work.demo"
              :href="work.demo"
              class="lh-featured__btn lh-featured__btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              DEMO
            </a>
            <a
              :href="`${basePath}${work.link}`"
              class="lh-featured__btn lh-featured__btn--ghost"
            >
              詳細
            </a>
          </div>
        </div>
      </article>
    </div>

    <div class="lh-skills">
      <p class="lh-skills__label">Tech Stack</p>
      <div class="lh-skills__tags">
        <span v-for="tag in skillTags" :key="tag" class="lh-tag">{{ tag }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lh-featured {
  max-width: 1152px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
}

.lh-featured__grid {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .lh-featured__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .lh-featured__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.lh-featured__card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--lh-radius-lg);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.lh-featured__card:hover {
  transform: translateY(-3px);
  border-color: var(--lh-accent-bright);
  box-shadow: var(--lh-shadow-lg);
}

.lh-featured__thumb {
  display: block;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.lh-featured__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.lh-featured__card:hover .lh-featured__thumb img {
  transform: scale(1.04);
}

.lh-featured__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-family: var(--vp-font-family-display);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--lh-accent-bright);
  background: var(--lh-accent-soft);
}

.lh-featured__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem;
}

.lh-featured__title {
  margin: 0 0 0.4rem;
  font-family: var(--vp-font-family-display);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.35;
}

.lh-featured__title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.lh-featured__title a:hover {
  color: var(--lh-accent-bright);
}

.lh-featured__desc {
  margin: 0 0 0.75rem;
  flex: 1;
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.lh-featured__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

.lh-featured__actions {
  display: flex;
  gap: 0.5rem;
}

.lh-featured__btn {
  flex: 1;
  padding: 0.45rem 0.6rem;
  font-size: 0.78rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.15s ease;
}

.lh-featured__btn--primary {
  color: #fff;
  background: var(--lh-brand-gradient);
}

.lh-featured__btn--primary:hover {
  filter: brightness(1.08);
}

.lh-featured__btn--ghost {
  color: var(--lh-accent);
  background: transparent;
  border: 1px solid var(--lh-surface-border);
}

.lh-featured__btn--ghost:hover {
  background: var(--lh-accent-soft);
}

.lh-skills {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.lh-skills__label {
  margin: 0 0 0.75rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.lh-skills__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.lh-animate {
  animation: lh-fade-up 0.6s ease both;
  animation-delay: var(--lh-delay, 0ms);
}

@keyframes lh-fade-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
