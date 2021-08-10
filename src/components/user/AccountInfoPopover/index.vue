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
          <span>角色：</span
          >
          <role-tag/>
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
import { ElMessageBox } from "element-plus";
// 通用模块
import common from "common";
// 过滤器
import filter from "common/filter";
// 组件
import RoleTag from "components/user/RoleTag/index.vue";

export default {
  name: "AccountInfoPopover",

  props: {
    placement: {
      type: String,
      default: "bottom",
    },
    trigger: {
      type: String,
      default: "hover",
    },
  },

  components: { RoleTag },

  emits: ["on-account-setting"],

  setup(props, { emit }) {
    const { store, toPage } = common();

    const { isNull } = filter();

    // 用户信息
    const user = computed(() => store.getters.user);

    const onAccountSetting = (val) => {
      emit("on-account-setting", val);
    };

    // 退出登录
    const onLogout = () => {
      ElMessageBox.confirm("确认登录吗？", "温馨提示", {
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
