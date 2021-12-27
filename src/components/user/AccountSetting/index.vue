<template>
  <el-dialog
    :title="title"
    :modelValue="visible"
    @close="onClose()"
    :width="550"
    custom-class="account-setting-dialog"
  >
    <el-tabs v-model="activeName" tabPosition="left" style="height: 240px">
      <el-tab-pane
        v-for="(item, index) in tabs"
        :key="'tab' + index"
        :label="item.label"
        :name="item.name"
        :lazy="true"
      >
        <component
          v-if="item.name === activeName"
          :is="item.component"
          :title="item.label"
        />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup>
import { ref } from "@vue/runtime-core";
// 组件
import AccountInfo from "./AccountInfo.vue";
import ChangePwd from "./ChangePwd.vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "账户设置",
  },
});

const emit = defineEmits(["close"]);

// 当前激活Tab的name
const activeName = ref("accountInfo");

const tabs = [
  {
    name: "accountInfo",
    label: "用户信息",
    component: AccountInfo,
  },
  {
    name: "changePwd",
    label: "修改密码",
    component: ChangePwd,
  },
];

const onClose = () => {
  emit("close", false);
};
</script>
<style lang="scss">
.account-setting-dialog {
  .el-dialog__body {
    padding: 10px 20px 10px 0;
  }
}
</style>
