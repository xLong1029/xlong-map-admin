<template>
  <div class="describe-container">
    <el-card shadow="never"
      ><p>
        xlong-map-element-plus 是一套基于 Vite + Vue3 + Element Plus + Bmob
        开发的单页面客户端渲染地图信息系统示例。
      </p>
      <p class="red">
        温馨提示：如果要测试删除功能，请自行添加再删除，请保留我原有的测试数据
      </p>
      <br />
      <img :src="qrcodeImg" />
      <p class="mt-5">扫一扫，关注xLong设计</p>
      <br />
      <p class="red">*此项目做学习Vite和Vue3测试使用，请勿商用</p></el-card
    >
  </div>
</template>

<script setup>
import qrcodeImg from "@/assets/images/qrcode.jpg";
</script>

<style lang="scss" scoped>
.describe-container {
  display: flex; 
  padding: 15px;

  :deep(.el-card){
    width: 100%;
    text-align: center;
  }
}
</style>
