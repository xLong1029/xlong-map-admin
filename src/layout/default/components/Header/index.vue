<template>
  <div class="header-content flex">
    <div class="header-content-left">
      <div class="logo-container">
        <img class="logo" :src="logoImg" :title="title" />
        <div>
          <div class="title">{{ title }}</div>
          <div class="sub-english">XLONG JIALIDUN MAP MANAGEMENT SYSTEM</div>
        </div>
      </div>
      <Navbar />
    </div>
    <div v-if="user && user.realName" class="header-content-right">
      <AccountInfoPopover @on-account-setting="setAccountSettingVisible(true)">
        <div class="user-info">
          <span class="user-avatar">
            <img :src="user.avatar ? user.avatar : defaultAvatarImg" />
          </span>
          <span>{{ isNull(user.nickName) }}</span>
        </div>
      </AccountInfoPopover>
      <div class="operate-icon">
        <i
          v-if="setFull"
          class="iconfont icon-quxiaoquanping"
          @click="onFullExit"
          title="取消全屏"
        ></i>
        <i
          v-else
          class="iconfont icon-quanping"
          @click="onFullScreen"
          title="全屏显示"
        ></i>
      </div>
    </div>

    <AccountSetting
      :visible="accountSettingVisible"
      @close="setAccountSettingVisible(false)"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
// 过滤器
import filter from "common/filter";
// 组件
import AccountSetting from "components/user/AccountSetting/index.vue";
import AccountInfoPopover from "components/user/AccountInfoPopover/index.vue";
import Navbar from "./Navbar/index.vue";
// 图片
import logoImg from "assets/images/logo.png";
import defaultAvatarImg from "assets/images/default-avatar.png";

const store = useStore();

const { isNull } = filter();

// 标题
const title = computed(() => store.getters.sysTitle);

// 用户信息
const user = computed(() => store.getters.user);

// 是否显示账户设置
const accountSettingVisible = ref(false);

// 是否设置全屏
const setFull = ref(false);

// 显示账户设置
const setAccountSettingVisible = (val) => {
  accountSettingVisible.value = val;
};

// 全屏显示
const onFullScreen = () => {
  setFull.value = true;
  let e = document.documentElement;

  if (e.requestFullscreen) e.requestFullscreen();
  else if (e.mozRequestFullScreen) e.mozRequestFullScreen();
  else if (e.webkitRequestFullscreen) e.webkitRequestFullscreen();
  else if (e.msRequestFullscreen) e.msRequestFullscreen();
};

// 退出全屏
const onFullExit = () => {
  setFull.value = false;
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
};
</script>

<style lang="scss" scoped>
.header-content {
  justify-content: space-between;
  padding: 0 20px;
  height: $header-height;
  align-items: center;
  color: #fff;
  width: 100%;

  &-left {
    display: flex;
    align-items: center;

    .logo-container {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }

    .logo {
      height: 45px;
      margin-right: 12px;
    }
    .title {
      font-weight: 600;
      font-size: 18px;
      color:#fff;
      font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
    }

    .sub-english {
      font-size: 12px;
      margin-top: 2px;
      color: rgba(255,255,255,0.75);
      transform:scale(0.84);
      margin-left: -8%;
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

.operate-icon {
  margin-left: 20px;
  padding-left: 20px;
  position: relative;

  &::after {
    position: absolute;
    content: "";
    display: block;
    width: 1px;
    height: 80%;
    margin-top: 8%;
    background: #dcdcdc;
    left: 0;
    top: 0;
  }

  .iconfont {
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
