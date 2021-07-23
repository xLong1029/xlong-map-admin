import {
  ElEmpty,
  ElTree,
  ElCollapseItem,
  ElOption,
  ElInput,
  ElSelect,
  ElTabs,
  ElTabPane,
  ElSwitch,
  ElColorPicker,
  ElDialog,
  ElPopconfirm,
  ElTag,
  ElPopover,
  ElDrawer,
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

// 语言包，Element Plus默认英文
import lang from "element-plus/lib/locale/lang/zh-cn";
import "dayjs/locale/zh-cn";
import { locale } from 'element-plus';

const components = [
  ElEmpty,
  ElTree,
  ElCollapseItem,
  ElOption,
  ElInput,
  ElSelect,
  ElTabs,
  ElTabPane,
  ElSwitch,
  ElColorPicker,
  ElDialog,
  ElPopconfirm,
  ElTag,
  ElPopover,
  ElDrawer,
  ElButton,
  ElForm,
  ElFormItem,
  ElCheckbox,
  ElIcon,
];

const plugins = [ElLoading, ElMessage, ElMessageBox, ElNotification];

export default (app) => {
  // 设置语言
  locale(lang);

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
