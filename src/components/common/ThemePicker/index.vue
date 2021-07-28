<template>
  <el-color-picker
    v-model="theme"
    :predefine="[
      '#409EFF',
      '#1890ff',
      '#304156',
      '#212121',
      '#11a983',
      '#13c2c2',
      '#6959CD',
      '#f5222d',
    ]"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script>
// 获取element-plus版本号
import { version } from "element-plus/package.json";
import { computed, watch, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
// Element Plus主题
const ORIGINAL_THEME = "#409EFF";

export default {
  setup(props, { emit }) {
    const store = useStore();

    const chalk = ref("");
    const theme = ref("");

    const defaultTheme = computed(() => store.state.settings.theme);

    watch(
      () => defaultTheme.value,
      (val) => {
        theme.value = val;
      },
      {
        immediate: true,
      }
    );

    watch(
      () => theme.value,
      async (val) => {
        if (typeof val !== "string") return;
        const oldVal = chalk.value ? theme.value : ORIGINAL_THEME;
        const themeCluster = getThemeCluster(val.replace("#", ""));

        // 全局修改自定义的$primary-color
        document.getElementsByTagName("body")[0].style.setProperty("--primaryColor", val);

        const getHandler = (id) => {
          return () => {
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
        };

        if (!chalk.value) {
          const url = `https://unpkg.com/element-plus@${version}/lib/theme-chalk/index.css`;
          await getCSSString(url);
        }

        const chalkHandler = getHandler("chalk-style");
        chalkHandler();

        emit("change", val);
      }
    );

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
      theme,
    };
  },
};
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
