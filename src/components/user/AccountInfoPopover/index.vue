<template>
  <el-popover placement="bottom" :width="220" trigger="hover">
    <template #reference>
      <slot></slot>
    </template>
    <div class="user-info-container">
      <ul class="user-info-list">
        <li class="user-info-list-item">
          <span>账号：</span><span>{{ isNull(user.username) }}</span>
        </li>
        <li class="user-info-list-item">
          <span>昵称：</span><span>{{ user.nickname }}</span>
        </li>
        <li class="user-info-list-item">
          <span>角色：</span><el-tag v-if="user.roles.indexOf('admin') >= 0" size="small">管理员</el-tag>
        </li>
      </ul>
      <div class="user-info-operate">
        <span class="btn" @click="onAccountSetting(true)">
          <i class="el-icon-user"></i>
          账户设置
        </span>
        <span class="btn" @click="onLogout">
          <i class="el-icon-switch-button"></i>
          退出登录
        </span>
      </div>
    </div>
  </el-popover>
</template>

<script>
import { computed } from "@vue/reactivity";
import { ElMessage } from "element-plus";
// 通用模块
import common from "common";
// 过滤器
import filter from "common/filter";

export default {
  name: "AccountInfoPopover",

  emits: ["on-account-setting"],

  setup(props, { emit }) {
    const { store, toPage } = common();

    const { isNull } = filter();

    // 用户信息
    const user = computed(() => store.getters.user);

    const onAccountSetting = (val) => {
      emit("on-account-setting", val);
    };

    // 注销
    const onLogout = async () => {
      // TODO:需要用户确认退出
      try {
        await store.dispatch("user/logout");
        await store.dispatch("permission/generateRoutes", null);
        ElMessage.success(`您已退出${title.value}`);
        toPage("/login");
      } catch (err) {
        console.log(err);
        toPage("/login");
      }
    };

    return {
      user,
      isNull,
      onAccountSetting,
      onLogout,
    };
  },
};
</script>
<style lang="scss" scoped>
.user-info {
  &-list {
    &-item {
      width: 50%;
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

      &:hover {
        color: $primary-color;
      }
    }
  }
}
</style>
