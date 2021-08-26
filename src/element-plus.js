import {
  ElAlert,
  ElConfigProvider,
  ElEmpty,
  ElInput,
  ElSelect,
  ElTabs,
  ElTabPane,
  ElSwitch,
  ElColorPicker,
  ElDialog,
  ElTag,
  ElPopover,
  ElButton,
  ElForm,
  ElFormItem,
  ElCheckbox,
  ElIcon,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from "element-plus";
import "element-plus/packages/theme-chalk/src/index.scss";
import "element-plus/packages/theme-chalk/src/base.scss";
// import "@/styles/element-variables.scss";

const components = [
  ElAlert,
  ElConfigProvider,
  ElEmpty,
  ElInput,
  ElSelect,
  ElTabs,
  ElTabPane,
  ElSwitch,
  ElColorPicker,
  ElDialog,
  ElTag,
  ElPopover,
  ElButton,
  ElForm,
  ElFormItem,
  ElCheckbox,
  ElIcon,
];

const plugins = [ElLoading, ElMessage, ElMessageBox, ElNotification];

export default (app) => {
  // 注册组件
  if (components.length) {
    components.forEach((component) => {
      app.component(component.name, component);
    });
  }

  // 注册插件
  if (plugins.length) {
    plugins.forEach((plugin) => {
      app.use(plugin);
    });
  }
};
