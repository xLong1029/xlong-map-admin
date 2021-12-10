import {
  ElTransfer,
  ElRadio,
  ElRow,
  ElCol,
  ElPagination,
  ElTable,
  ElCard,
  ElMenu,
  ElAlert,
  ElConfigProvider,
  ElEmpty,
  ElInput,
  ElSelect,
  ElTabs,
  ElSwitch,
  ElColorPicker,
  ElDialog,
  ElTag,
  ElPopover,
  ElButton,
  ElForm,
  ElCheckbox,
  ElIcon,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from "element-plus";
import "@/styles/element-variables.scss";
// 基于断点的隐藏类样式
import 'element-plus/theme-chalk/display.css';

const components = [
  ElTransfer,
  ElRadio,
  ElRow,
  ElCol,
  ElPagination,
  ElTable,
  ElCard,
  ElMenu,
  ElAlert,
  ElConfigProvider,
  ElEmpty,
  ElInput,
  ElSelect,
  ElTabs,
  ElSwitch,
  ElColorPicker,
  ElDialog,
  ElTag,
  ElPopover,
  ElButton,
  ElForm,
  ElCheckbox,
  ElIcon,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification
];

export default (app) => {
  // 注册组件
  if (components.length) {
    components.forEach((component) => {
      app.use(component);
    });
  }
};
