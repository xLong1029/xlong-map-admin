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

<script>
import { ref } from "@vue/reactivity";
// 组件
import AccountInfo from "./AccountInfo.vue";
import ChangePwd from "./ChangePwd.vue";

export default {
  name: "AccountSetting",

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "账户设置",
    },
  },

  components: { AccountInfo, ChangePwd },

  setup(props, { emit }) {
    // 当前激活Tab的name
    const activeName = ref("accountInfo");

    const tabs = ref([
      {
        name: "accountInfo",
        label: "用户信息",
        component: "AccountInfo",
      },
      {
        name: "changePwd",
        label: "修改密码",
        component: "ChangePwd",
      },
    ]);

    const onClose = () => {
      emit("close", false);
    };

    return {
      activeName,
      tabs,
      onClose,
    };
  },
};
</script>
<style lang="scss">
.account-setting-dialog {
  .el-dialog__body {
    padding: 10px 20px 10px 0;
  }
}
</style>
