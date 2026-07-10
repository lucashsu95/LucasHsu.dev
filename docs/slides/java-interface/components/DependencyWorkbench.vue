<script setup lang="ts">
import { computed, ref } from "vue";

type Channel = "Email" | "SMS" | "Push";

const mode = ref<"coupled" | "contract">("contract");
const selected = ref<Channel[]>(["Email", "SMS"]);
const dispatched = ref(false);

const arrows = computed(() =>
  mode.value === "coupled"
    ? "Service ──▶ Email / SMS / Push"
    : "Service ──▶ Notifier ◀── implementations",
);

function toggle(channel: Channel) {
  selected.value = selected.value.includes(channel)
    ? selected.value.filter((item) => item !== channel)
    : [...selected.value, channel];
  dispatched.value = false;
}
</script>

<template>
  <section class="workbench" aria-label="通知依賴互動工作台">
    <div class="toolbar">
      <button
        :class="{ active: mode === 'coupled' }"
        :aria-pressed="mode === 'coupled'"
        @click="
          mode = 'coupled';
          dispatched = false;
        "
      >
        直接耦合
      </button>
      <button
        :class="{ active: mode === 'contract' }"
        :aria-pressed="mode === 'contract'"
        @click="
          mode = 'contract';
          dispatched = false;
        "
      >
        依賴契約
      </button>
    </div>

    <div class="channels">
      <button
        v-for="channel in ['Email', 'SMS', 'Push'] as Channel[]"
        :key="channel"
        :class="{ selected: selected.includes(channel) }"
        :aria-pressed="selected.includes(channel)"
        @click="toggle(channel)"
      >
        {{ channel }}
      </button>
    </div>

    <div class="map">
      <span class="prompt">$ deps --graph</span>
      <strong>{{ arrows }}</strong>
      <small v-if="mode === 'coupled'">新增管道 → 修改 Service</small>
      <small v-else>新增管道 → 實作 Notifier，於組裝端接線</small>
    </div>

    <button
      class="run"
      :disabled="selected.length === 0"
      @click="dispatched = true"
    >
      ▶ dispatch()
    </button>

    <div class="trace" aria-live="polite">
      <template v-if="dispatched">
        <div v-if="mode === 'contract'">
          service = NotificationService → Notifier.send()
        </div>
        <div v-for="channel in selected" :key="channel">
          ↳ {{ channel }}Notifier.send("maintenance")
        </div>
      </template>
      <span v-else class="muted">// select channels, then dispatch</span>
    </div>
  </section>
</template>

<style scoped>
.workbench {
  border: 1px solid #30363d;
  border-radius: 14px;
  padding: 14px;
  background: #0d1117;
  color: #e6edf3;
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
}

.toolbar,
.channels {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

button {
  border: 1px solid #30363d;
  border-radius: 7px;
  padding: 7px 11px;
  background: #161b22;
  color: #8b949e;
  cursor: pointer;
  font: inherit;
}

.toolbar button {
  flex: 1;
}

button.active,
button.selected {
  border-color: #5382a1;
  color: #fff;
  box-shadow: inset 3px 0 #e76f00;
}

.channels button {
  flex: 1;
}

.map {
  display: grid;
  gap: 8px;
  min-height: 74px;
  padding: 12px;
  border: 1px dashed #30363d;
  border-radius: 8px;
}

.prompt {
  color: #7ee787;
}

.map small,
.muted {
  color: #6e7681;
}

.run {
  width: 100%;
  margin: 10px 0;
  border-color: #e76f00;
  background: #e76f00;
  color: white;
}

.run:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.trace {
  min-height: 60px;
  padding: 10px;
  border-radius: 8px;
  background: #010409;
  color: #7ee787;
  line-height: 1.6;
}

button:focus-visible {
  outline: 3px solid #7ee787;
  outline-offset: 2px;
}
</style>
