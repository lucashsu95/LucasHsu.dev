<template>
  <div class="lh-stats">
    <div class="lh-stats__head">
      <span class="lh-stats__pulse" aria-hidden="true"></span>
      <span class="lh-stats__head-text">Site Stats</span>
    </div>

    <div class="lh-stats__row">
      <span class="lh-stats__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </span>
      <div class="lh-stats__info">
        <span class="lh-stats__label">總訪問量</span>
        <span class="lh-stats__value">
          <span id="busuanzi_container_site_pv">
            <span id="busuanzi_value_site_pv" class="lh-stats__num">–</span>
          </span>
          <span class="lh-stats__unit">次</span>
        </span>
      </div>
    </div>

    <div class="lh-stats__row">
      <span class="lh-stats__icon lh-stats__icon--gold" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </span>
      <div class="lh-stats__info">
        <span class="lh-stats__label">訪客數</span>
        <span class="lh-stats__value">
          <span id="busuanzi_container_site_uv">
            <span id="busuanzi_value_site_uv" class="lh-stats__num">–</span>
          </span>
          <span class="lh-stats__unit">人次</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyLayout",
};
</script>

<style scoped>
.lh-stats {
  position: relative;
  padding: 0.9rem 1rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--lh-radius-lg);
  overflow: hidden;
}

.lh-stats::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
  background: var(--lh-brand-gradient);
}

.lh-stats__head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.85rem;
}

.lh-stats__pulse {
  position: relative;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
}

.lh-stats__pulse::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #22c55e;
  animation: lh-pulse 1.8s ease-out infinite;
}

@keyframes lh-pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

.lh-stats__head-text {
  font-family: var(--vp-font-family-mono);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.lh-stats__row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.5rem 0;
}

.lh-stats__row + .lh-stats__row {
  border-top: 1px solid var(--vp-c-divider);
}

.lh-stats__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  color: var(--lh-accent);
  background: var(--lh-accent-soft);
  border-radius: 8px;
}

.lh-stats__icon--gold {
  color: var(--lh-gold);
  background: var(--lh-gold-soft);
}

.lh-stats__info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.lh-stats__label {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.lh-stats__value {
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
  font-family: var(--vp-font-family-mono);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.lh-stats__unit {
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
}
</style>
