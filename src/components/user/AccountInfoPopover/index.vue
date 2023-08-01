<template>
  <el-popover :placement="placement" :width="220" :trigger="trigger">
    <template #reference>
      <slot></slot>
    </template>
    <div class="user-info-container">
      <ul class="user-info-list">
        <li class="user-info-list-item">
          <span>账号：</span><span>{{ isNull(user.username) }}</span>
        </li>
        <li class="user-info-list-item">
          <span>昵称：</span><span>{{ user.nickName }}</span>
        </li>
        <li class="user-info-list-item">
          <span>角色：</span>
          <RoleTag />
        </li>
      </ul>
      <div class="user-info-operate">
        <span class="btn" @click="onAccountSetting(true)">
          <el-icon class="mr-5"><User /></el-icon>
          账户设置
        </span>
        <span class="btn" @click="onLogout">
          <el-icon class="mr-5"><SwitchButton /></el-icon>
          退出登录
        </span>
      </div>
    </div>
  </el-popover>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import { ElMessageBox } from "element-plus";
import {
  User,
  SwitchButton
} from "@element-plus/icons-vue";
// 通用模块
import common from "common";
// 过滤器
import filter from "common/filter";
// 组件
import RoleTag from "components/user/RoleTag/index.vue";

const props = defineProps({
  placement: {
    type: String,
    default: "bottom",
  },
  trigger: {
    type: String,
    default: "hover",
  },
});

const emit = defineEmits(["on-account-setting"]);

const { store, toPage } = common();

const { isNull } = filter();

// 用户信息
const user = computed(() => store.getters.user);
const title = computed(() => store.getters.sysTitle);

const onAccountSetting = (val) => {
  emit("on-account-setting", val);
};

// 退出登录
const onLogout = () => {
  ElMessageBox.confirm("确认退出登录吗？", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    try {
      await store.dispatch("user/logout");
      await store.dispatch("permission/generateRoutes", null);
      ElMessage.success(`您已退出${title.value}`);
      toPage("/login");
    } catch (err) {
      console.log(err);
      toPage("/login");
    }
  });
};
</script>

<style lang="scss" scoped>
.user-info {
  &-list {
    &-item {
      margin-bottom: 10px;
    }
  }

  &-operate {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    border-top: $border;

    .btn {
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        color: $primary-color;
      }
    }
  }
}
</style>
