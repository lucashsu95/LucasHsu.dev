<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import {
  awardTimeline,
  certifications,
  liveSystems,
} from "../data/siteData.js";
import awardPhotos from "../data/awardPhotos.generated.js";
import AwardLightbox from "./AwardLightbox.vue";

const medalClass = {
  gold: "lh-medal--gold",
  silver: "lh-medal--silver",
  bronze: "lh-medal--bronze",
  honor: "lh-medal--honor",
};

const categories = ["全部", "程式競賽", "專題競賽", "榮譽"];
const activeCategory = ref("全部");

const filtered = computed(() =>
  activeCategory.value === "全部"
    ? awardTimeline
    : awardTimeline.filter((a) => a.category === activeCategory.value)
);

const counts = computed(() => ({
  total: awardTimeline.length,
  gold: awardTimeline.filter((a) => a.medal === "gold").length,
}));

function photosFor(award) {
  const slug = award?.photosDir;
  if (!slug) return [];
  const list = awardPhotos?.[slug];
  return Array.isArray(list) && list.length > 0 ? list : [];
}

function hasPhotos(award) {
  return photosFor(award).length > 0;
}

const lightboxOpen = ref(false);
const activeAward = ref(null);

const lightboxPhotos = computed(() =>
  activeAward.value ? photosFor(activeAward.value) : []
);

function openLightbox(award) {
  if (!hasPhotos(award)) return;
  activeAward.value = award;
  lightboxOpen.value = true;
}

function closeLightbox() {
  lightboxOpen.value = false;
  activeAward.value = null;
}

const timelineRef = ref(null);
let observer = null;

function observeItems() {
  if (!timelineRef.value) return;
  observer?.disconnect();

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const items = timelineRef.value.querySelectorAll(".lh-tl__item");

  if (prefersReduced) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

function selectCategory(cat) {
  activeCategory.value = cat;
}

watch(activeCategory, async () => {
  await nextTick();
  observeItems();
});

onMounted(() => observeItems());
onUnmounted(() => observer?.disconnect());
</script>

<template>
  <div class="lh-awards">
    <section class="lh-awards__block">
      <div class="lh-tl__header">
        <div>
          <p class="lh-section-label">Achievements</p>
          <h2 class="lh-tl__title">得獎時間線</h2>
        </div>
        <div class="lh-tl__summary">
          <span class="lh-tl__stat">
            <b>{{ counts.total }}</b> 項紀錄
          </span>
          <span class="lh-tl__stat lh-tl__stat--gold">
            <b>{{ counts.gold }}</b> 金獎/國手
          </span>
        </div>
      </div>

      <div class="lh-tl__filters" role="tablist">
        <button
          v-for="cat in categories"
          :key="cat"
          class="lh-tl__chip"
          :class="{ 'is-active': activeCategory === cat }"
          role="tab"
          :aria-selected="activeCategory === cat"
          @click="selectCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>

      <ol ref="timelineRef" class="lh-tl">
        <li
          v-for="(award, i) in filtered"
          :key="`${award.date}-${award.title}`"
          class="lh-tl__item"
          :class="[
            `lh-tl__item--${award.medal}`,
            {
              'lh-tl__item--featured': award.featured,
              'lh-tl__item--photos': hasPhotos(award),
            },
          ]"
          :style="{ '--lh-i': i }"
        >
          <div class="lh-tl__marker" aria-hidden="true">
            <span class="lh-tl__dot"></span>
          </div>

          <div
            class="lh-tl__card"
            :role="hasPhotos(award) ? 'button' : undefined"
            :tabindex="hasPhotos(award) ? 0 : undefined"
            :aria-label="
              hasPhotos(award) ? `查看「${award.title}」得獎照片` : undefined
            "
            @click="openLightbox(award)"
            @keydown.enter.prevent="openLightbox(award)"
            @keydown.space.prevent="openLightbox(award)"
          >
            <div class="lh-tl__card-top">
              <div class="lh-tl__meta">
                <time class="lh-tl__date">{{ award.date }}</time>
                <span class="lh-tl__cat">{{ award.category }}</span>
                <span class="lh-medal" :class="medalClass[award.medal]">{{
                  award.rank
                }}</span>
                <span
                  v-if="award.featured"
                  class="lh-tl__flame"
                  title="精選"
                  >🔥</span
                >
              </div>

              <span
                v-if="hasPhotos(award)"
                class="lh-tl__photo-badge"
                title="查看照片"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
                  />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span>查看照片</span>
              </span>
            </div>

            <p class="lh-tl__name">{{ award.title }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="lh-awards__block">
      <h2 class="lh-awards__heading">烤證照</h2>
      <ul class="lh-awards__certs">
        <li
          v-for="cert in certifications"
          :key="cert.title"
          class="lh-awards__cert"
        >
          <span v-if="cert.featured" class="lh-featured-badge">🔥</span>
          {{ cert.title }}
        </li>
      </ul>
    </section>

    <section class="lh-awards__block">
      <h2 class="lh-awards__heading">系統（上線中）</h2>
      <div class="lh-awards__systems">
        <a
          v-for="system in liveSystems"
          :key="system.url"
          :href="system.url"
          class="lh-awards__system-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span v-if="system.featured" class="lh-featured-badge">🔥</span>
          <span class="lh-awards__system-title">{{ system.title }}</span>
          <span class="lh-awards__system-link">Live →</span>
        </a>
      </div>
    </section>

    <AwardLightbox
      :open="lightboxOpen"
      :photos="lightboxPhotos"
      :title="activeAward?.title || ''"
      :rank="activeAward?.rank || ''"
      :date="activeAward?.date || ''"
      :medal="activeAward?.medal || 'honor'"
      @close="closeLightbox"
    />
  </div>
</template>

<style scoped>
.lh-awards {
  margin: 2.5rem 0;
}

.lh-awards__block {
  margin-bottom: 3rem;
}

.lh-tl__header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.lh-tl__title,
.lh-awards__heading {
  margin: 0;
  font-family: var(--vp-font-family-display);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.lh-awards__heading {
  margin-bottom: 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--lh-accent-soft);
}

.lh-tl__summary {
  display: flex;
  gap: 0.75rem;
}

.lh-tl__stat {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.lh-tl__stat b {
  color: var(--vp-c-text-1);
  font-size: 1rem;
}

.lh-tl__stat--gold b {
  color: var(--lh-gold);
}

.lh-tl__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.75rem;
}

.lh-tl__chip {
  padding: 0.35rem 0.85rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  cursor: pointer;
  transition: color 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}

.lh-tl__chip:hover {
  color: var(--vp-c-text-1);
  border-color: var(--lh-accent);
}

.lh-tl__chip.is-active {
  color: #fff;
  background: var(--lh-brand-gradient);
  border-color: transparent;
}

.lh-tl {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0 0 0 0.5rem;
}

.lh-tl::before {
  content: "";
  position: absolute;
  top: 0.5rem;
  bottom: 0.5rem;
  left: 7px;
  width: 2px;
  background: linear-gradient(
    to bottom,
    var(--lh-accent),
    var(--lh-pink) 55%,
    var(--lh-gold-bright)
  );
  opacity: 0.4;
}

.lh-tl__item {
  position: relative;
  display: grid;
  grid-template-columns: 1.5rem 1fr;
  gap: 1rem;
  padding-bottom: 1.25rem;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  transition-delay: calc(var(--lh-i, 0) * 45ms);
}

.lh-tl__item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.lh-tl__marker {
  display: flex;
  justify-content: center;
  padding-top: 0.35rem;
}

.lh-tl__dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 3px solid var(--lh-accent);
  box-shadow: 0 0 0 3px var(--vp-c-bg);
  transition: transform 0.2s ease;
}

.lh-tl__item--gold .lh-tl__dot {
  border-color: var(--lh-gold-bright);
  box-shadow: 0 0 0 3px var(--vp-c-bg), 0 0 12px var(--lh-gold-bright);
}
.lh-tl__item--silver .lh-tl__dot {
  border-color: var(--lh-medal-silver);
}
.lh-tl__item--bronze .lh-tl__dot {
  border-color: var(--lh-medal-bronze);
}
.lh-tl__item--honor .lh-tl__dot {
  border-color: var(--lh-pink);
}

.lh-tl__card {
  padding: 0.85rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--lh-radius-lg);
  cursor: default;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.lh-tl__item--photos .lh-tl__card {
  cursor: pointer;
}

.lh-tl__item--photos .lh-tl__card:focus-visible {
  outline: 2px solid var(--lh-accent-bright);
  outline-offset: 2px;
}

.lh-tl__item:hover .lh-tl__card {
  border-color: var(--lh-accent);
  box-shadow: var(--lh-shadow);
  transform: translateX(3px);
}

.lh-tl__item:hover .lh-tl__dot {
  transform: scale(1.15);
}

.lh-tl__item--featured .lh-tl__card {
  border-left: 3px solid var(--lh-gold);
}

.lh-tl__card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.4rem;
}

.lh-tl__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.lh-tl__date {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--lh-accent);
}

.lh-tl__cat {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
}

.lh-tl__flame {
  font-size: 0.85rem;
}

.lh-tl__photo-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  flex-shrink: 0;
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--lh-accent);
  background: var(--lh-accent-soft);
  border: 1px solid var(--lh-surface-border);
  border-radius: 999px;
  white-space: nowrap;
}

.lh-tl__name {
  margin: 0;
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.lh-awards__certs {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .lh-awards__certs {
    grid-template-columns: repeat(2, 1fr);
  }
}

.lh-awards__cert {
  padding: 0.65rem 0.85rem;
  font-size: 0.9rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--lh-radius);
}

.lh-awards__systems {
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .lh-awards__systems {
    grid-template-columns: repeat(2, 1fr);
  }
}

.lh-awards__system-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem 1.1rem;
  text-decoration: none;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--lh-surface-border);
  border-radius: var(--lh-radius-lg);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.lh-awards__system-card:hover {
  border-color: var(--lh-accent);
  box-shadow: var(--lh-shadow);
  transform: translateY(-2px);
}

.lh-awards__system-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.lh-awards__system-link {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--lh-accent);
}

@media (prefers-reduced-motion: reduce) {
  .lh-tl__item {
    transition: none;
  }
}
</style>
