<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
  open: { type: Boolean, default: false },
  photos: { type: Array, default: () => [] },
  title: { type: String, default: "" },
  rank: { type: String, default: "" },
  date: { type: String, default: "" },
  medal: { type: String, default: "honor" },
});

const emit = defineEmits(["close"]);

const basePath = "/LucasHsu.dev";
const index = ref(0);
const dialogRef = ref(null);

const medalClass = {
  gold: "lh-medal--gold",
  silver: "lh-medal--silver",
  bronze: "lh-medal--bronze",
  honor: "lh-medal--honor",
};

const total = computed(() => props.photos.length);
const currentSrc = computed(() => {
  const src = props.photos[index.value];
  if (!src) return "";
  return src.startsWith("http") ? src : `${basePath}${src}`;
});

const hasTitle = computed(() => Boolean(props.title?.trim()));
const hasRank = computed(() => Boolean(props.rank?.trim()));
const hasDate = computed(() => Boolean(props.date?.trim()));
const showInfo = computed(
  () => hasTitle.value || hasRank.value || hasDate.value || total.value > 0
);

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      index.value = 0;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);

watch(
  () => props.photos,
  () => {
    index.value = 0;
  }
);

function close() {
  emit("close");
}

function prev() {
  if (total.value <= 1) return;
  index.value = (index.value - 1 + total.value) % total.value;
}

function next() {
  if (total.value <= 1) return;
  index.value = (index.value + 1) % total.value;
}

function onKeydown(e) {
  if (!props.open) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft") prev();
  if (e.key === "ArrowRight") next();
}

/** Pointer swipe */
let pointerId = null;
let startX = 0;
let startY = 0;
let tracking = false;

function onPointerDown(e) {
  pointerId = e.pointerId;
  startX = e.clientX;
  startY = e.clientY;
  tracking = true;
  e.currentTarget.setPointerCapture?.(e.pointerId);
}

function onPointerUp(e) {
  if (!tracking || e.pointerId !== pointerId) return;
  tracking = false;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
  if (dx < 0) next();
  else prev();
}

function onPointerCancel() {
  tracking = false;
  pointerId = null;
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <Transition name="lh-lb">
      <div
        v-if="open && photos.length"
        class="lh-lb"
        role="dialog"
        aria-modal="true"
        :aria-label="title || '得獎照片'"
        @click.self="close"
      >
        <button
          type="button"
          class="lh-lb__close"
          aria-label="關閉"
          @click="close"
        >
          ×
        </button>

        <button
          v-if="total > 1"
          type="button"
          class="lh-lb__nav lh-lb__nav--prev"
          aria-label="上一張"
          @click="prev"
        >
          ‹
        </button>

        <div
          ref="dialogRef"
          class="lh-lb__stage"
          @pointerdown="onPointerDown"
          @pointerup="onPointerUp"
          @pointercancel="onPointerCancel"
        >
          <img
            :src="currentSrc"
            :alt="title || '得獎照片'"
            class="lh-lb__img"
            draggable="false"
          />
        </div>

        <button
          v-if="total > 1"
          type="button"
          class="lh-lb__nav lh-lb__nav--next"
          aria-label="下一張"
          @click="next"
        >
          ›
        </button>

        <div v-if="showInfo" class="lh-lb__info">
          <div class="lh-lb__info-main">
            <span
              v-if="hasRank"
              class="lh-medal"
              :class="medalClass[medal] || medalClass.honor"
            >{{ rank }}</span>
            <time v-if="hasDate" class="lh-lb__date">{{ date }}</time>
            <p v-if="hasTitle" class="lh-lb__title">{{ title }}</p>
          </div>
          <span v-if="total > 0" class="lh-lb__count">
            {{ index + 1 }} / {{ total }}
          </span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lh-lb {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: center;
  justify-items: center;
  padding: 3.5rem 1rem 1.25rem;
  background: rgba(15, 15, 30, 0.88);
  backdrop-filter: blur(8px);
}

.lh-lb__close {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  font-size: 1.75rem;
  line-height: 1;
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.lh-lb__close:hover {
  background: rgba(255, 255, 255, 0.18);
}

.lh-lb__stage {
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(960px, 100%);
  max-height: calc(100vh - 9rem);
  touch-action: pan-y;
  user-select: none;
}

.lh-lb__img {
  max-width: 100%;
  max-height: calc(100vh - 9rem);
  object-fit: contain;
  border-radius: var(--lh-radius);
  box-shadow: var(--lh-shadow-lg);
}

.lh-lb__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.75rem;
  height: 2.75rem;
  display: grid;
  place-items: center;
  font-size: 2rem;
  line-height: 1;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.lh-lb__nav:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lh-lb__nav--prev {
  left: 0.75rem;
}

.lh-lb__nav--next {
  right: 0.75rem;
}

.lh-lb__info {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  width: min(960px, 100%);
  margin-top: 0.75rem;
  padding: 0.85rem 1rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--lh-radius-lg);
  color: #fff;
}

.lh-lb__info-main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.lh-lb__date {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--lh-gold-bright);
}

.lh-lb__title {
  flex: 1 1 100%;
  margin: 0;
  font-family: var(--vp-font-family-display);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.4;
}

.lh-lb__count {
  flex-shrink: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.75);
}

.lh-lb-enter-active,
.lh-lb-leave-active {
  transition: opacity 0.2s ease;
}

.lh-lb-enter-from,
.lh-lb-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .lh-lb__nav {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 1.6rem;
  }

  .lh-lb__nav--prev {
    left: 0.35rem;
  }

  .lh-lb__nav--next {
    right: 0.35rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lh-lb-enter-active,
  .lh-lb-leave-active {
    transition: none;
  }
}
</style>
