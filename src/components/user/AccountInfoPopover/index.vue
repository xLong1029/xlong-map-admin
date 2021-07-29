<template>
  <el-popover placement="bottom" :width="250" trigger="hover">
    <template #reference>
      <slot></slot>
    </template>
    <div class="user-info-container">
      <div class="user-info-title">
        <span>用户信息</span>
        <a class="url-btn fr" @click="onAccountSetting(true)">
          账户设置
          <i class="el-icon-arrow-right"></i>
        </a>
      </div>
      <ul class="user-info-list mt-10">
        <li class="user-info-list-item">账号：{{ isNull(user.username) }}</li>
        <li class="user-info-list-item">昵称：{{ user.nickname }}</li>
        <li class="user-info-list-item">真实姓名：{{ isNull(user.realname) }}</li>
        <li class="user-info-list-item">
          角色：
          <el-tag v-if="user.roles.indexOf('admin') >= 0">管理员</el-tag>
        </li>
      </ul>
    </div>
  </el-popover>
</template>

<script>
import { computed } from "@vue/reactivity";
// 过滤器
import filter from "common/filter";
import { useStore } from "vuex";

export default {
  name: "AccountInfoPopover",

  emits: ["on-account-setting"],

  setup(props, { emit }) {
    const store = useStore();

    const { isNull } = filter();

    // 用户信息
    const user = computed(() => store.getters.user);

    const onAccountSetting = (val) => {
      emit("on-account-setting", val);
    };

    return {
      user,
      isNull,
      onAccountSetting,
    };
  },
};
</script>
<style lang="scss" scoped>
.user-info {
  &-title {
    padding-top: 5px;
    padding-bottom: 10px;
    border-bottom: $border;

    .url-btn {
      &:hover {
        color: $primary-color;
      }
    }
  }

  &-list {
    &-item {
      margin: 10px 0;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
