<template>
  <div class="bottom-coord">
    <div class="copyright">
      <span
        >Copyright © 2021
        <a class="link" target="blank" href="https://github.com/xLong1029/xlong-map-vue3"
          ><span>{{ companyName }}</span></a
        >
        All Rights Reserved.</span
      >|
      <span
        ><a class="link" target="blank" href="https://github.com/xLong1029"
          ><i class="iconfont icon-github1 mr-5"></i><span>GitHub</span></a
        ></span
      >|
      <span
        ><a class="link" target="blank" href="http://xlong.zcool.com.cn/"
          ><i class="iconfont icon-zcool mr-5"></i><span>站酷</span></a
        ></span
      >|
      <span
        ><a class="link" target="blank" href="http://i.ui.cn/ucenter/358591.html"
          ><i class="iconfont icon-uicn mr-5"></i><span>UI中国</span></a
        ></span
      >|

      <el-popover placement="top" width="130" trigger="hover">
        <template #reference>
          <span>
            <a class="link"
              ><i class="iconfont icon-erweima mr-5"></i><span>微信订阅号</span></a
            ></span
          >
        </template>
        <div class="qrcode-container">
          <img class="qrcode__img" :src="QRCode" />
          <span class="qrcode__title">扫一扫，关注xLong设计</span>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
// 图片
import QRCode from "assets/images/qrcode.jpg";

export default {
  name: "BottomCoord",

  props: {
    companyName: {
      type: String,
      default: "",
    },
  },

  setup() {
    return {
      QRCode,
    };
  },
};
</script>
<style lang="scss" scoped>
.bottom-coord {
  height: 20px;
  width: 100%;
  position: absolute;
  bottom: 0;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .copyright {
    padding: 2px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 0 4px 0 0;
    .link {
      color: $primary-color;

      &:hover {
        span {
          text-decoration: underline;
        }
      }
    }

    .iconfont {
      font-size: 12px;
    }

    > span {
      margin: 0 10px;
    }
  }
}

.qrcode {
  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__img {
    width: 100px;
    height: 100px;
  }

  &__title {
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>
