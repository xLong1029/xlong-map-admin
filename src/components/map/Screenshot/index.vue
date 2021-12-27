<template>
  <div>
    <div id="screenshotContainer" class="screenshot hide">
      <img class="screenshot-img" />
      <div class="screenshot-input mt-20">
        <label class="text">在图片中添加文字: </label>
        <el-input
          id="screenshotInput"
          v-model="text"
          style="width: 335px"
          placeholder="请输入文字"
        ></el-input>
        <div>
          <el-button id="screenshotDownloadBtn" type="primary">下载图片</el-button>
          <el-button id="closeBtn" @click="onClose">取消截图</el-button>
        </div>
      </div>
    </div>
    <div id="maskDiv" class="hide screenshotCursor"></div>
  </div>
</template>

<script setup>
import { ref } from "@vue/runtime-core";

const emit = defineEmits(["close"]);

const text = ref("");

// 关闭
const onClose = () => {
  text.value = "";

  const screenshotContainer = document.getElementById("screenshotContainer");
  screenshotContainer.classList.add("hide");

  emit("close");
};
</script>

<style lang="scss" scoped>
#screenshotContainer {
  z-index: 1000;
}

.screenshot {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  background-color: rgba(76, 76, 76, 0.85);

  &.hide {
    display: none;
  }

  .el-button {
    margin-top: 16px;
  }
}

#maskDiv {
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  border: 2px dashed $primary-color;

  &.hide {
    display: none;
  }
}

.screenshot {
  &-img {
    margin-top: 60px;
    border: 10px solid white;
    border-radius: 4px;
    max-height: 70%;
    max-width: 70%;
  }

  &-input {
    width: 70%;
    margin: 0 auto;

    .text {
      margin-right: 10px;
      color: #ffffff;
    }
  }
}
</style>
