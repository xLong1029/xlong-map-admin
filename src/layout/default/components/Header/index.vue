<template>
  <div class="header-content flex">
    <div class="header-content-left">
      <img class="logo" :src="logo" />
      <span class="title">{{ title }}</span>
    </div>
    <div v-if="user && user.realname" class="header-content-right">
      <account-info-popover @on-account-setting="setAccountSettingVisible(true)">
        <div class="user-info">
          <span v-if="user.avatar" class="user-avatar">
            <img :src="user.avatar" />
          </span>
          <span>{{ isNull(user.realname) }}</span>
        </div>
      </account-info-popover>
    </div>
    <account-setting
      :visible="accountSettingVisible"
      @close="setAccountSettingVisible(false)"
    />
  </div>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
// 过滤器
import filter from "common/filter";
// 组件
import AccountSetting from "components/user/AccountSetting/index.vue";
import AccountInfoPopover from "components/user/AccountInfoPopover/index.vue";
// logo图片
import logo from "assets/images/logo.png";

export default {
  name: "AppHeader",

  components: {
    AccountInfoPopover,
    AccountSetting,
  },

  setup() {
    const store = useStore();

    const { isNull } = filter();

    // 标题
    const title = computed(() => store.getters.sysTitle);

    // 用户信息
    const user = computed(() => store.getters.user);

    // 是否显示账户设置
    const accountSettingVisible = ref(false);

    // 显示账户设置
    const setAccountSettingVisible = (val) => {
      accountSettingVisible.value = val;
    };

    return {
      logo,
      title,
      user,
      isNull,
      accountSettingVisible,
      setAccountSettingVisible,
    };
  },
};
</script>

<style lang="scss" scoped>
.header-content {
  justify-content: space-between;
  padding: 10px 20px;
  height: $header-height;
  align-items: center;
  color: #333;

  &-left {
    display: flex;
    align-items: center;

    .logo {
      height: 28px;
      margin-right: 15px;
    }

    .title {
      font-size: 20px;
    }
  }

  &-right {
    display: flex;
    align-items: center;

    &-item {
      cursor: pointer;
      margin-left: 20px;

      .el-icon-s-custom {
        margin-right: 2px;
      }
    }
  }
}

.user-info {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.user-avatar {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
