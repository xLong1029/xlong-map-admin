<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="90px">
    <el-form-item label="账户" prop=""
      ><span>{{ isNull(user.username) }}</span> <span class="ml-10"><role-tag /></span
    ></el-form-item>
    <el-form-item label="昵称" prop="nickName">
      <el-input
        placeholder="请输入昵称"
        clearable
        v-model="form.nickName"
        @keyup.enter="onSubmit()"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="真实姓名" prop="realName">
      <el-input
        placeholder="请输入真实姓名"
        clearable
        v-model="form.realName"
        @keyup.enter="onSubmit()"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" :loading="submitLoading" @click="onSubmit()"
        >保存修改</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { computed, reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
// 表单
import formJs from "common/form.js";
// 过滤器
import filter from "common/filter";
// 通用模块
import common from "common";
// 组件
import RoleTag from "components/user/RoleTag/index.vue";

export default {
  name: "AccountInfo",

  components: { RoleTag },

  setup(props, { emit }) {
    const { store, showDevMessage } = common();
    const { validForm } = formJs();
    const { isNull } = filter();

    // 用户信息
    const user = computed(() => store.getters.user);

    // 表单
    const formRef = ref();

    const form = reactive({
      nickName: "",
      realName: "",
    });

    // 表单规则
    const rules = reactive({
      nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      realName: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
    });

    const submitLoading = ref(false);

    onMounted(() => {
      resetForm();
    });

    // 重置表单
    const resetForm = () => {
      form.nickName = user.value.nickName;
      form.realName = user.value.realName;
    };

    // 保存修改
    const onSubmit = async () => {
      const valid = await validForm(formRef.value, "信息填写有误，请检查");

      if (valid) {
        try {
          submitLoading.value = true;

          /* Demo-start */
          setTimeout(() => {
            showDevMessage();
            submitLoading.value = false;
          }, 500);
          /* Demo-end */
        } catch (err) {
          submitLoading.value = false;
        }
      }
    };

    return {
      user,
      formRef,
      form,
      rules,
      submitLoading,
      isNull,
      onSubmit,
    };
  },
};
</script>
<style lang="scss">
.account-setting-dialog {
  .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>
