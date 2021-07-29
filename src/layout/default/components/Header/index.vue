<template>
  <!-- eslint-disable -->
  <div class="header-content flex">
    <div class="header-content-left">
      <img class="logo" :src="logo" />
      <span class="title">{{ title }}</span>
    </div>
    <div v-if="user && user.realname" class="header-content-right">
      <!-- <el-popover placement="bottom" :width="250" trigger="hover">
        <template #reference>
          <div class="user-info">
            <span v-if="user.avatar" class="user-avatar">
              <img :src="user.avatar" />
            </span>
            {{ isNull(user.realname) }}
          </div>
        </template>
        <div class="user-info-container">
          <div class="user-info-title">
            <span>用户信息</span>
            <a class="url-btn fr" @click="setAccountSettingVisible(true)">
              账户设置
              <i class="el-icon-arrow-right"></i>
            </a>
          </div>
          <ul class="user-info-list mt-10">
            <li class="user-info-list-item">
              账号：{{ isNull(user.username) }}
            </li>
            <li class="user-info-list-item">昵称：{{ user.nickname }}</li>
            <li class="user-info-list-item">
              真实姓名：{{ isNull(user.realname) }}
            </li>
            <li class="user-info-list-item">
              角色：
              <el-tag v-if="user.roles.indexOf('admin') >= 0">管理员</el-tag>
            </li>
          </ul>
        </div>
      </el-popover> -->
      <account-info-popover @on-account-setting="setAccountSettingVisible(true)">
        <div class="user-info">
          <span v-if="user.avatar" class="user-avatar">
            <img :src="user.avatar" />
          </span>
          <span>{{ isNull(user.realname) }}</span>
        </div>
      </account-info-popover>
      <el-popconfirm title="确认退出系统吗？" @confirm="logout()">
        <template #reference>
          <span class="header-content-right-item link">注销</span>
        </template>
      </el-popconfirm>
    </div>
    <account-setting
      :visible="accountSettingVisible"
      @close="setAccountSettingVisible(false)"
    />
  </div>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
// 过滤器
import filter from "common/filter";
// 通用模块
import common from "common";
// 组件
import AccountSetting from "components/user/AccountSetting/index.vue";
// logo图片
import logo from "assets/images/logo.png";
// 组件
import AccountInfoPopover from "components/user/AccountInfoPopover/index.vue";

export default {
  name: "AppHeader",

  components: {
    AccountInfoPopover,
    AccountSetting,
  },

  setup() {
    const { store, toPage } = common();

    const { isNull } = filter();

    // 标题
    const title = computed(() => store.getters.sysTitle);

    // 用户信息
    const user = computed(() => store.getters.user);

    // 是否显示账户设置
    const accountSettingVisible = ref(false);

    // 注销账户
    const logout = async () => {
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
      logout,
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
