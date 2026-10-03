<template>
  <!-- display:contents keeps .slidev-layout > .tc-stage structure flat;
       this wrapper only scopes the JS enhancement, never the layout. -->
  <div ref="root" class="sr-stage">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const root = ref<HTMLElement | null>(null)

// Elements this instance animated (for unmount cleanup).
let animated: HTMLElement[] = []
// data-reveal attributes this instance added at runtime (slides.md untouched).
let autoTagged: HTMLElement[] = []
// Running anime.js instance, if any.
let anim: { pause?: () => void; cancel?: () => void; revert?: () => void } | null = null

function collectTargets(): HTMLElement[] {
  const host = root.value
  if (!host) return []
  // 1. Explicit opt-in wins: author-placed [data-reveal].
  const explicit = Array.from(host.querySelectorAll<HTMLElement>('[data-reveal]'))
  if (explicit.length > 0) return explicit
  // 2. Auto-tag .tc-stage children at runtime so slides.md stays untouched.
  //    Mirrors the CSS .tc-in cascade (which skips .tc-stage__rule) while also
  //    covering .tc-stage__aside children that CSS .tc-in does not reach.
  //    Existing inline --i is preserved for the CSS fallback path.
  const main = host.querySelector('.tc-stage__main')
  const aside = host.querySelector('.tc-stage__aside')
  const picked: HTMLElement[] = []
  if (main) {
    for (const el of Array.from(main.children)) {
      const h = el as HTMLElement
      if (h.classList.contains('tc-stage__rule')) continue
      picked.push(h)
    }
  }
  if (aside) {
    for (const el of Array.from(aside.children)) picked.push(el as HTMLElement)
  }
  if (picked.length === 0) {
    const stage = host.querySelector('.tc-stage')
    if (stage) {
      for (const el of Array.from(stage.children)) {
        const h = el as HTMLElement
        if (h.classList.contains('tc-stage__rule')) continue
        picked.push(h)
      }
    }
  }
  for (const el of picked) {
    if (!el.hasAttribute('data-reveal')) {
      el.setAttribute('data-reveal', '')
      autoTagged.push(el)
    }
  }
  return picked
}

function cleanupInlineStyles() {
  for (const el of animated) {
    el.style.removeProperty('opacity')
    el.style.removeProperty('transform')
  }
  animated = []
}

onMounted(async () => {
  const host = root.value
  if (!host) return
  // Reduced motion: leave the CSS path (which already degrades) alone.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const targets = collectTargets()
  if (targets.length === 0) return
  // Enhancement layer only: anime.js missing -> return and let .tc-in CSS run.
  const mod = await import('animejs').catch(() => null) as unknown as Record<string, unknown> | null
  if (!mod || !root.value) return
  animated = targets
  // Mark JS ownership so the CSS cascade pauses while JS animates.
  // Without this, tc-rise and anime would fight over transform/opacity.
  host.classList.add('sr-js')
  try {
    const animateFn = mod['animate'] as unknown as ((t: unknown, p: Record<string, unknown>) => unknown) | undefined
    const staggerFn = mod['stagger'] as unknown as ((v: number, o: Record<string, unknown>) => unknown) | undefined
    if (typeof animateFn === 'function') {
      // anime.js v4 shape: { animate, stagger }
      anim = animateFn(targets, {
        opacity: [0, 1],
        translateY: [12, 0],
        delay: typeof staggerFn === 'function' ? staggerFn(65, { start: 90 }) : 90,
        duration: 700,
        ease: 'outExpo',
      }) as { pause?: () => void; cancel?: () => void; revert?: () => void }
    } else {
      // anime.js v3 shape: default export callable, stagger on the function
      const anime = (mod['default'] ?? mod) as unknown as ((p: Record<string, unknown>) => unknown) & {
        stagger?: (v: number, o: Record<string, unknown>) => unknown
      }
      if (typeof anime !== 'function') return
      anim = anime({
        targets,
        opacity: [0, 1],
        translateY: [12, 0],
        delay: typeof anime.stagger === 'function' ? anime.stagger(65, { start: 90 }) : 90,
        duration: 700,
        easing: 'easeOutExpo',
      }) as { pause?: () => void; cancel?: () => void; revert?: () => void }
    }
  } catch {
    // Any failure: drop JS ownership so CSS .tc-in remains the visible path.
    host.classList.remove('sr-js')
    cleanupInlineStyles()
  }
})

onUnmounted(() => {
  try {
    if (anim) {
      if (typeof anim.revert === 'function') anim.revert()
      else if (typeof anim.cancel === 'function') anim.cancel()
      else if (typeof anim.pause === 'function') anim.pause()
    }
  } catch {
    // ignore teardown errors
  }
  anim = null
  cleanupInlineStyles()
  for (const el of autoTagged) el.removeAttribute('data-reveal')
  autoTagged = []
})
</script>

<style scoped>
.sr-stage {
  display: contents;
}
/* While JS owns the entrance, pause the CSS cascade to avoid double animation.
   Scoped to .sr-js so the no-JS / reduced-motion path keeps .tc-in intact. */
.sr-stage.sr-js :global(.tc-in > *),
.sr-stage.sr-js :global(.tc-in--fade > *) {
  animation: none !important;
}
</style>
