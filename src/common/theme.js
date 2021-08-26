/*
 * 模块 : 修改主题色
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 20201-08-26
 * 版本 : version 1.0
 */
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
// 获取element-plus版本号
import { version } from "element-plus/package.json";
// Element Plus主题
const ORIGINAL_THEME = "#409EFF";

export default function() {

  const store = useStore();

  const chalk = ref("");
  const theme = ref("");

  const defaultTheme = computed(() => store.state.settings.theme);

  const changeTheme = async (val) => {
    if (typeof val !== "string") return;
    // const oldVal = chalk.value ? theme.value : ORIGINAL_THEME;
    const oldVal = ORIGINAL_THEME;

    const themeCluster = getThemeCluster(val.replace("#", ""));

    // 全局修改自定义的$primary-color
    document.getElementsByTagName("body")[0].style.setProperty("--primaryColor", val);

    const getHandler = (id) => {
        const originalCluster = getThemeCluster(oldVal.replace("#", ""));
        const newStyle = updateStyle(chalk.value, originalCluster, themeCluster);

        let styleTag = document.getElementById(id);
        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.setAttribute("id", id);
          document.head.appendChild(styleTag);
        }
        styleTag.innerText = newStyle;
    };

    if (!chalk.value) {
      // const url = `https://unpkg.com/element-plus@${version}/lib/theme-chalk/index.css`; // 适用于 v1.0.0-beta 等版本
      // Element Plus v1.1.0-beta 破坏性变更 ，参考：https://github.com/element-plus/element-plus/discussions/3020
      const url = `https://unpkg.com/element-plus@${version}/dist/index.css`;
      await getCSSString(url);
    }

    getHandler("chalk-style");
  }

  
  const updateStyle = (style, oldCluster, newCluster) => {
    let newStyle = style;
    oldCluster.forEach((color, index) => {
      newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
    });
    return newStyle;
  };

  const getCSSString = (url, variable) => {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          chalk.value = xhr.responseText.replace(/@font-face{[^}]+}/, "");
          resolve();
        }
      };
      xhr.open("GET", url);
      xhr.send();
    });
  };

  const getThemeCluster = (theme) => {
    const clusters = [theme];
    for (let i = 0; i <= 9; i++) {
      clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
    }
    clusters.push(shadeColor(theme, 0.1));
    return clusters;
  };

  const tintColor = (color, tint) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);

    if (tint === 0) {
      // when primary color is in its rgb space
      return [red, green, blue].join(",");
    } else {
      red += Math.round(tint * (255 - red));
      green += Math.round(tint * (255 - green));
      blue += Math.round(tint * (255 - blue));

      red = red.toString(16);
      green = green.toString(16);
      blue = blue.toString(16);

      return `#${red}${green}${blue}`;
    }
  };

  const shadeColor = (color, shade) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);

    red = Math.round((1 - shade) * red);
    green = Math.round((1 - shade) * green);
    blue = Math.round((1 - shade) * blue);

    red = red.toString(16);
    green = green.toString(16);
    blue = blue.toString(16);

    return `#${red}${green}${blue}`;
  };

  return {
    store,
    chalk,
    theme,
    defaultTheme,
    changeTheme
  };
}
