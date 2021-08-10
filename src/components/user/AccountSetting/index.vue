<template>
  <el-dialog
    :title="title"
    :modelValue="visible"
    @close="onClose()"
    :width="550"
    custom-class="account-setting-dialog"
  >
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
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          type="password"
          placeholder="请输入旧密码"
          clearable
          v-model="form.oldPassword"
          @keyup.enter="onSubmit()"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          type="password"
          placeholder="请输入新密码"
          clearable
          v-model="form.newPassword"
          @keyup.enter="onSubmit()"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comfirmPassword">
        <el-input
          type="password"
          placeholder="请输入确认密码"
          clearable
          v-model="form.comfirmPassword"
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
  </el-dialog>
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
// 校验
import { validPassword } from "utils/validate";
// 组件
import RoleTag from "components/user/RoleTag/index.vue";

export default {
  name: "AccountSetting",

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "账户设置",
    },
  },

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
      oldPassword: "",
      newPassword: "",
      comfirmPassword: "",
    });

    // 表单规则
    const rules = reactive({
      nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      realName: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
    });

    const submitLoading = ref(false);

    // 重置表单
    const resetForm = () => {
      form.nickName = user.value.nickName;
      form.realName = user.value.realName;
    };

    onMounted(() => {
      resetForm();
    });

    // 保存修改
    const onSubmit = async () => {
      const valid = await validForm(formRef.value, "信息填写有误，请检查");

      if (valid) {
        try {
          if (form.oldPassword) {
            if (!form.newPassword) {
              ElMessage.warning("请输入新密码");
              return false;
            } else if (!validPassword(form.newPassword)) {
              ElMessage.warning("密码格式为6-16位字母或数组的组合");
              return false;
            } else if (!form.comfirmPassword) {
              ElMessage.warning("请输入确认密码");
              return false;
            } else if (form.newPassword !== form.comfirmPassword) {
              ElMessage.error("确认密码和新密码不一致");
              return false;
            }
          }

          submitLoading.value = true;

          /* Demo-start */
          setTimeout(() => {
            showDevMessage();
            submitLoading.value = false;
          }, 500);
          /* Demo-end */
        } catch (err) {
          ElMessage.error("用户名或者密码不正确");

          submitLoading.value = false;
        }
      }
    };

    const onClose = () => {
      emit("close", false);
      resetForm();
    };
    return {
      user,
      formRef,
      form,
      rules,
      submitLoading,
      isNull,
      onSubmit,
      onClose,
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
