<script setup>
import { ref, onMounted } from "vue";

const { password } = defineProps(["password"]);
const showModal = ref(true);
const pass = ref("");

const keydownHandler = (e) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i"))
  ) {
    e.preventDefault();
  }
};

const contextmenuHandler = (e) => e.preventDefault();
const copyHandler = (e) => e.preventDefault();
const cutHandler = (e) => e.preventDefault();
const wheelHandler = (e) => e.preventDefault();

const removeEvent = () => {
  window.removeEventListener("keydown", keydownHandler);
  window.removeEventListener("contextmenu", contextmenuHandler);
  window.removeEventListener("copy", copyHandler);
  window.removeEventListener("cut", cutHandler);
  window.removeEventListener("wheel", wheelHandler, { passive: false });
  document.body.style.overflow = "auto";
};

const checkPass = () => {
  if (pass.value === password) {
    showModal.value = false;
    removeEvent();
  }
};

const backPage = () => {
  removeEvent();
  window.history.back();
};

onMounted(() => {
  if (password === "") {
    showModal.value = false;
  }
  window.addEventListener("keydown", keydownHandler);
  window.addEventListener("contextmenu", contextmenuHandler);
  window.addEventListener("copy", copyHandler);
  window.addEventListener("cut", cutHandler);
  window.addEventListener("wheel", wheelHandler, { passive: false });
  document.body.style.overflow = "hidden";
});

window.addEventListener("popstate", () => {
  removeEvent();
});
// window.addEventListener("pushstate", () => {
//   removeEvent();
// });
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-show="showModal" class="modal-mask">
        <div class="modal-container">
          <div class="modal-header">
            <button class="modal-button" @click="backPage">返回上一頁</button>
          </div>
          <div class="modal-body">
            <label>
              請輸入密碼:
              <input v-model="pass" @input="checkPass" />
            </label>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 95vw;
  height: 95vh;
  margin: auto;
  padding: 20px 30px;
  background-color: var(--vp-c-bg);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
}

.modal-header,
.modal-body,
.model-footer {
  width: 400px;
  margin-top: 10px;
}

.model-footer {
  text-align: right;
}

.modal-button {
  padding: 4px 8px;
  border-radius: 4px;
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

.modal-button:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>
