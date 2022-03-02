<template>
  <div ref="rightPanel" :class="{ show: show }" class="rightPanel-container">
    <div class="rightPanel-background" @click="show = !show" />
    <div class="rightPanel">
      <div
        class="handle-button"
        :style="{ 'background-color': theme }"
        @click="show = !show"
      >
        <i :class="show ? 'el-icon-close' : 'el-icon-s-tools'" />
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { addClass, removeClass } from "@/utils";
import { useStore } from "vuex";
import {
  ref,
  computed,
  onBeforeUnmount,
  onMounted,
  watch,
} from "@vue/runtime-core";

const props = defineProps({
  clickNotClose: {
    default: false,
    type: Boolean,
  },
});

const store = useStore();

const show = ref(false);
const rightPanel = ref(null);
const theme = computed(() => store.getters.theme);

watch(
  () => show,
  (newVal) => {
    if (newVal && !props.clickNotClose) {
      this.addEventClick();
    }
    if (newVal) {
      addClass(document.body, "showRightPanel");
    } else {
      removeClass(document.body, "showRightPanel");
    }
  }
);

onMounted(() => {
  insertToBody();
});

onBeforeUnmount(() => {
  const elx = rightPanel.value;
  if (elx) {
    elx.remove();
  }
});

const addEventClick = () => {
  window.addEventListener("click", this.closeSidebar);
};

const closeSidebar = (evt) => {
  const parent = evt.target.closest(".rightPanel");
  if (!parent) {
    this.show = false;
    window.removeEventListener("click", this.closeSidebar);
  }
};

const insertToBody = () => {
  const elx = rightPanel.value;
  const body = document.querySelector("body");
  body.insertBefore(elx, body.firstChild);
};
</script>

<style>
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>

<style lang="scss" scoped>
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.rightPanel {
  width: 100%;
  max-width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000;
}

.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .rightPanel-background {
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}

.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -48px;
  top: 50%;
  margin-top: -24px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  background: $primary-color;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
