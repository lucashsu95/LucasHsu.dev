<script setup>
const basePath = "/LucasHsu.dev";

const pills = [
  "國手選拔備取",
  "全國技能競賽第三名",
  "112 金手獎",
  "乙級網頁設計",
];
</script>

<template>
  <section class="lh-hero" aria-label="Introduction">
    <div class="lh-hero__grid" aria-hidden="true"></div>
    <div class="lh-hero__glow" aria-hidden="true"></div>

    <div class="lh-hero__inner">
      <div class="lh-hero__content lh-animate" style="--lh-delay: 0ms">
        <p class="lh-hero__eyebrow">Competition Athlete / Developer</p>
        <h1 class="lh-hero__name">
          許恩綸
          <span class="lh-hero__alias">Lucas Hsu</span>
        </h1>
        <p class="lh-hero__tagline">
          全國技能競賽網頁技術選手 · 程式設計金手獎 · 技術筆記與作品集
        </p>

        <div class="lh-hero__pills">
          <span v-for="pill in pills" :key="pill" class="lh-hero__pill">
            {{ pill }}
          </span>
        </div>

        <div class="lh-hero__actions">
          <a :href="`${basePath}portfolio/`" class="lh-btn lh-btn--primary">
            查看作品集
          </a>
          <a
            href="https://github.com/lucashsu95"
            class="lh-btn lh-btn--ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a :href="`${basePath}about/`" class="lh-btn lh-btn--ghost">
            關於我
          </a>
        </div>
      </div>

      <div class="lh-hero__visual lh-animate" style="--lh-delay: 120ms">
        <div class="lh-hero__avatar-ring">
          <img
            :src="`${basePath}/logo/avatar.webp`"
            alt="Lucas Hsu avatar"
            class="lh-hero__avatar"
            width="280"
            height="280"
            loading="eager"
          />
        </div>
        <div class="lh-hero__rank-card">
          <span class="lh-hero__rank-label">Latest Rank</span>
          <span class="lh-hero__rank-value">#3</span>
          <span class="lh-hero__rank-detail">54 屆全國技能競賽</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lh-hero {
  position: relative;
  overflow: hidden;
  width: 100vw;
  max-width: 100vw;
  left: 50%;
  margin-left: -50vw;
  padding: 4rem 1.5rem 3rem;
  background: var(--lh-surface);
  border-bottom: 1px solid var(--lh-surface-border);
}

.lh-hero__grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(var(--lh-grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--lh-grid-line) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 80%);
}

.lh-hero__glow {
  position: absolute;
  top: -20%;
  right: 10%;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(200, 80, 192, 0.2) 0%, transparent 70%);
  pointer-events: none;
}

.lh-hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 2.5rem;
  max-width: 1152px;
  margin: 0 auto;
  align-items: center;
}

@media (min-width: 960px) {
  .lh-hero {
    padding: 5rem 2rem 4rem;
  }

  .lh-hero__inner {
    grid-template-columns: 1fr auto;
    gap: 3rem;
  }
}

.lh-hero__eyebrow {
  margin: 0 0 0.75rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--lh-gold-bright);
}

.lh-hero__name {
  margin: 0;
  font-family: var(--vp-font-family-display);
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #fff;
}

.lh-hero__alias {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.55em;
  font-weight: 600;
  letter-spacing: 0.02em;
  background: linear-gradient(90deg, var(--lh-accent-bright), var(--lh-gold-bright));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lh-hero__tagline {
  margin: 1rem 0 0;
  max-width: 36rem;
  font-size: 1.05rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.72);
}

.lh-hero__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.lh-hero__pill {
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--lh-surface-border);
  border-radius: 999px;
}

.lh-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.lh-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.25rem;
  font-family: var(--vp-font-family-display);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--lh-radius);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.lh-btn--primary {
  color: #fff;
  background: linear-gradient(135deg, #4158d0, #c850c0);
  box-shadow: 0 4px 16px rgba(200, 80, 192, 0.35);
}

.lh-btn--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(200, 80, 192, 0.45);
}

.lh-btn--ghost {
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--lh-surface-border);
}

.lh-btn--ghost:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.lh-hero__visual {
  position: relative;
  display: flex;
  justify-content: center;
}

.lh-hero__avatar-ring {
  position: relative;
  padding: 4px;
  border-radius: 50%;
  background: var(--lh-brand-gradient);
  box-shadow: 0 0 48px rgba(200, 80, 192, 0.25);
}

.lh-hero__avatar {
  display: block;
  width: min(240px, 60vw);
  height: min(240px, 60vw);
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid var(--lh-surface);
}

.lh-hero__rank-card {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem;
  background: var(--lh-surface-elevated);
  border: 1px solid var(--lh-surface-border);
  border-radius: var(--lh-radius);
  box-shadow: var(--lh-shadow-lg);
}

.lh-hero__rank-label {
  font-family: var(--vp-font-family-mono);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--lh-gold-bright);
}

.lh-hero__rank-value {
  font-family: var(--vp-font-family-mono);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  color: #fff;
}

.lh-hero__rank-detail {
  margin-top: 0.15rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.lh-animate {
  animation: lh-fade-up 0.7s ease both;
  animation-delay: var(--lh-delay, 0ms);
}

@keyframes lh-fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 959px) {
  .lh-hero__rank-card {
    right: 50%;
    transform: translateX(50%);
    bottom: -1rem;
  }
}
</style>
