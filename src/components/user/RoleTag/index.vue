<template>
  <span v-if="user.roles">
    <el-tag v-if="user.roles.indexOf('admin') >= 0" type="success" size="small"
      >超级管理员</el-tag
    >
    <el-tag v-if="user.roles.indexOf('manage') >= 0" size="small">管理员</el-tag>
    <el-tag v-if="user.roles.indexOf('user') >= 0" type="warning" size="small"
      >普通用户</el-tag
    >
  </span>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

const store = useStore();

// 用户信息
const user = computed(() => store.getters.user);
</script>
<style lang="scss"></style>
