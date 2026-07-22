<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { stats } from "../data/siteData.js";

const boardRef = ref(null);
const displayValues = ref(stats.map(() => 0));
let observer = null;

function animateValue(index, target, duration = 1200) {
  const start = performance.now();
  const from = 0;

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    displayValues.value[index] = Math.round(from + (target - from) * eased);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function startAnimations() {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  stats.forEach((stat, i) => {
    if (prefersReduced) {
      displayValues.value[i] = stat.value;
    } else {
      animateValue(i, stat.value, 1000 + i * 150);
    }
  });
}

onMounted(() => {
  if (!boardRef.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimations();
          observer?.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(boardRef.value);
});

onUnmounted(() => {
  observer?.disconnect();
});

function formatSuffix(suffix, value) {
  if (suffix === "rd") return value === 3 ? "rd" : "th";
  if (suffix === "th") return "th";
  return suffix;
}
</script>

<template>
  <section ref="boardRef" class="lh-statboard" aria-label="Key achievements">
    <p class="lh-section-label">Scoreboard</p>
    <h2 class="lh-section-title">戰績記分板</h2>

    <div class="lh-statboard__grid">
      <article
        v-for="(stat, i) in stats"
        :key="stat.label"
        class="lh-statboard__item lh-animate"
        :style="{ '--lh-delay': `${i * 80}ms` }"
      >
        <div class="lh-statboard__value">
          <span class="lh-statboard__number">{{ displayValues[i] }}</span>
          <span v-if="stat.suffix" class="lh-statboard__suffix">{{
            formatSuffix(stat.suffix, stat.value)
          }}</span>
        </div>
        <p class="lh-statboard__label">{{ stat.label }}</p>
        <p class="lh-statboard__detail">{{ stat.detail }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.lh-statboard {
  max-width: 1152px;
  margin: 0 auto;
  padding: 3rem 1.5rem 1rem;
}

.lh-statboard__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .lh-statboard__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.lh-statboard__item {
  padding: 1.25rem 1rem;
  text-align: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--lh-radius-lg);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.lh-statboard__item:hover {
  border-color: var(--lh-accent-bright);
  box-shadow: var(--lh-shadow);
}

.lh-statboard__value {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.15rem;
}

.lh-statboard__number {
  font-family: var(--vp-font-family-mono);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  line-height: 1;
  background: var(--lh-brand-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lh-statboard__suffix {
  font-family: var(--vp-font-family-mono);
  font-size: 1rem;
  font-weight: 600;
  color: var(--lh-gold);
}

.lh-statboard__label {
  margin: 0.5rem 0 0;
  font-family: var(--vp-font-family-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.lh-statboard__detail {
  margin: 0.25rem 0 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
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
