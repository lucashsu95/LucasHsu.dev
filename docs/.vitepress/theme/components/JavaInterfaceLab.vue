<script setup>
import { computed, nextTick, ref } from "vue";

const design = ref("coupled");
const channels = ref(["email"]);
const trace = ref([]);
const tracePanel = ref(null);

const channelMeta = {
  email: { label: "Email", className: "EmailNotifier", icon: "@" },
  sms: { label: "SMS", className: "SmsNotifier", icon: "#" },
  push: { label: "Push", className: "PushNotifier", icon: "↑" },
};

const selectedChannels = computed(() =>
  channels.value.map((channel) => channelMeta[channel]),
);

const dependencyCaption = computed(() =>
  design.value === "coupled"
    ? "NotificationService → 具體類別（高層直接知道細節）"
    : "NotificationService → Notifier ← 各種實作（兩側依賴契約）",
);

function toggleChannel(channel) {
  channels.value = channels.value.includes(channel)
    ? channels.value.filter((item) => item !== channel)
    : [...channels.value, channel];
}

async function dispatch() {
  if (!channels.value.length) {
    trace.value = ["! 尚未選擇通知管道"];
  } else if (design.value === "coupled") {
    trace.value = [
      "new NotificationService()",
      ...selectedChannels.value.map(
        ({ className, label }) => `service.send${label}() → ${className}.send()`,
      ),
      "完成；新增管道時必須修改 NotificationService",
    ];
  } else {
    trace.value = [
      `注入 Notifier：${selectedChannels.value.map(({ className }) => className).join(", ")}`,
      ...(selectedChannels.value.length > 1
        ? ["CompositeNotifier.send() → 逐一委派"]
        : []),
      ...selectedChannels.value.map(
        ({ className }) => `Notifier.send() ⇢ ${className}.send()`,
      ),
      "完成；呼叫端只依賴 Notifier 契約",
    ];
  }
  await nextTick();
  tracePanel.value?.focus();
}
</script>

<template>
  <section class="interface-lab" aria-labelledby="interface-lab-title">
    <header class="lab-header">
      <div>
        <p class="eyebrow">$ java InterfaceLab</p>
        <h2 id="interface-lab-title">通知依賴實驗室</h2>
      </div>
      <span class="status" aria-hidden="true">● READY</span>
    </header>

    <fieldset class="design-switch">
      <legend>1. 選擇設計</legend>
      <button
        v-for="option in [
          ['coupled', '直接耦合'],
          ['interface', '依賴介面'],
        ]"
        :key="option[0]"
        type="button"
        :class="{ active: design === option[0] }"
        :aria-pressed="design === option[0]"
        @click="design = option[0]"
      >
        {{ option[1] }}
      </button>
    </fieldset>

    <fieldset class="channel-picker">
      <legend>2. 組合通知管道（可複選）</legend>
      <button
        v-for="(meta, key) in channelMeta"
        :key="key"
        type="button"
        class="channel"
        :class="{ selected: channels.includes(key) }"
        :aria-pressed="channels.includes(key)"
        @click="toggleChannel(key)"
      >
        <span class="channel-icon" aria-hidden="true">{{ meta.icon }}</span>
        <span>{{ meta.label }}</span>
        <span class="check" aria-hidden="true">{{ channels.includes(key) ? "✓" : "+" }}</span>
      </button>
    </fieldset>

    <div class="dependency" :class="design" aria-live="polite">
      <p class="panel-label">DEPENDENCY MAP</p>
      <div v-if="design === 'coupled'" class="dep-map">
        <span class="node service">NotificationService</span>
        <span class="arrow" aria-hidden="true">────▶</span>
        <div class="implementations">
          <span v-for="meta in selectedChannels" :key="meta.className" class="node concrete">
            {{ meta.className }}
          </span>
          <span v-if="!selectedChannels.length" class="node empty">未選擇</span>
        </div>
      </div>
      <div v-else class="dep-map">
        <span class="node service">NotificationService</span>
        <span class="arrow" aria-hidden="true">──▶</span>
        <span class="node contract">« interface »<br />Notifier</span>
        <span class="arrow reverse" aria-hidden="true">◀──</span>
        <div class="implementations">
          <span v-for="meta in selectedChannels" :key="meta.className" class="node concrete">
            {{ meta.className }}
          </span>
          <span v-if="!selectedChannels.length" class="node empty">未選擇</span>
        </div>
      </div>
      <p class="dependency-caption">{{ dependencyCaption }}</p>
    </div>

    <button type="button" class="dispatch" @click="dispatch">
      <span aria-hidden="true">▶</span> 發送「系統維護通知」
    </button>

    <div
      ref="tracePanel"
      class="trace"
      tabindex="-1"
      role="status"
      aria-live="polite"
      aria-label="動態派送追蹤"
    >
      <p class="panel-label">DISPATCH TRACE</p>
      <p v-if="!trace.length" class="muted">// 按下發送，觀察執行期派送</p>
      <ol v-else>
        <li v-for="(line, index) in trace" :key="`${index}-${line}`">
          <span>{{ String(index + 1).padStart(2, "0") }}</span>{{ line }}
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.interface-lab {
  --blue: #5382a1;
  --orange: #e76f00;
  --green: #7ee787;
  margin: 1.75rem 0;
  padding: clamp(1rem, 3vw, 1.5rem);
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 70%, var(--blue));
  border-radius: 16px;
  background:
    linear-gradient(rgba(83, 130, 161, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(83, 130, 161, 0.06) 1px, transparent 1px),
    var(--vp-c-bg-soft);
  background-size: 24px 24px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
}

.lab-header,
.dep-map,
.implementations {
  display: flex;
  align-items: center;
}

.lab-header {
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.lab-header h2 {
  margin: 0;
  border: 0;
  font-size: 1.2rem;
}

.eyebrow,
.panel-label,
.status {
  margin: 0;
  color: var(--green);
  font: 700 0.72rem/1.4 var(--vp-font-family-mono);
  letter-spacing: 0.08em;
}

.status {
  color: var(--green);
}

fieldset {
  min-width: 0;
  margin: 0 0 1rem;
  padding: 0;
  border: 0;
}

legend {
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  font-weight: 700;
}

.design-switch {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
}

.design-switch legend {
  grid-column: 1 / -1;
}

button {
  font: inherit;
}

.design-switch button,
.channel {
  min-height: 44px;
  border: 1px solid var(--vp-c-border);
  border-radius: 9px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.design-switch button.active {
  border-color: var(--orange);
  background: color-mix(in srgb, var(--orange) 12%, transparent);
  color: var(--vp-c-text-1);
  box-shadow: inset 3px 0 var(--orange);
}

.channel-picker {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
}

.channel-picker legend {
  grid-column: 1 / -1;
}

.channel {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 0.75rem;
  text-align: left;
}

.channel.selected {
  border-color: var(--blue);
  background: color-mix(in srgb, var(--blue) 14%, transparent);
  color: var(--vp-c-text-1);
}

.channel-icon {
  display: grid;
  width: 1.6rem;
  height: 1.6rem;
  place-items: center;
  border-radius: 5px;
  background: #0d1117;
  color: var(--green);
  font-family: var(--vp-font-family-mono);
}

.check {
  color: var(--orange);
  font-weight: 800;
}

.dependency,
.trace {
  overflow: auto;
  padding: 1rem;
  border: 1px solid rgba(125, 140, 160, 0.24);
  border-radius: 10px;
  background: #0d1117;
  color: #e5e7eb;
  font-family: var(--vp-font-family-mono);
}

.dep-map {
  min-width: 570px;
  gap: 0.65rem;
  margin-top: 0.75rem;
}

.node {
  padding: 0.55rem 0.65rem;
  border: 1px solid #30363d;
  border-radius: 7px;
  font-size: 0.72rem;
  text-align: center;
  white-space: nowrap;
}

.service { border-color: var(--orange); }
.contract { border-color: var(--green); color: var(--green); }
.concrete { border-color: var(--blue); }
.empty { color: #8b949e; border-style: dashed; }
.arrow { color: var(--orange); }
.reverse { color: var(--green); }
.implementations { gap: 0.35rem; flex-wrap: wrap; }

.dependency-caption {
  margin: 0.75rem 0 0;
  color: #8b949e;
  font-size: 0.72rem;
}

.dispatch {
  width: 100%;
  min-height: 46px;
  margin: 0.75rem 0;
  border: 0;
  border-radius: 9px;
  background: var(--orange);
  color: #fff;
  font-weight: 800;
  cursor: pointer;
}

.trace {
  min-height: 108px;
}

.trace:focus-visible,
button:focus-visible {
  outline: 3px solid var(--green);
  outline-offset: 3px;
}

.trace ol {
  margin: 0.6rem 0 0;
  padding: 0;
  list-style: none;
}

.trace li {
  display: grid;
  grid-template-columns: 2rem 1fr;
  gap: 0.5rem;
  margin: 0.3rem 0;
  color: #e5e7eb;
  font-size: 0.78rem;
}

.trace li span,
.muted {
  color: #6e7681;
}

.muted {
  margin: 0.6rem 0 0;
  font-size: 0.78rem;
}

@media (max-width: 640px) {
  .channel-picker {
    grid-template-columns: 1fr;
  }
  .channel-picker legend {
    grid-column: auto;
  }
}

@media (prefers-reduced-motion: no-preference) {
  button {
    transition: border-color 0.18s ease, background-color 0.18s ease, transform 0.18s ease;
  }
  button:hover {
    transform: translateY(-1px);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition: none !important;
    animation: none !important;
  }
}
</style>
