<template>
  <div class="describe-container">
    <el-card class="overspread-page" shadow="never">
      <p>
        xlong-map-admin是一套基于 Vite + Vue3 + Element Plus + ArcGis 开发的单页面客户端渲染的地图管理系统示例。
      </p>
      <p class="red">
        温馨提示：
        <ol>
          <li>如果要测试删除功能，请自行添加数据后再删除，请保留我原有的测试数据</li>
          <li>定位功能，按ArcGis官方示例，获取当前定位总是定位到兰州附近</li>
        </ol>
      </p>
      <br />
      <img :src="qrcodeImg" />
      <p class="mt-5">扫一扫，关注xLong设计</p>
      <br />
      <p class="red">*此项目仅做学习Vite和Vue3测试使用，请勿商用</p>
    </el-card>
  </div>
</template>

<script setup>
import qrcodeImg from "@/assets/images/qrcode.jpg";
</script>

<style lang="scss" scoped>
.describe-container {
  :deep(.el-card) {
    text-align: center;
  }
}
</style>
