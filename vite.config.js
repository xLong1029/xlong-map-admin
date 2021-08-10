import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import styleImport from "vite-plugin-style-import";
import settings from "./src/settings";

// const production = process.env.NODE_ENV === "production";

const port = settings.webPort;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            name = name.slice(3);
            return `element-plus/packages/theme-chalk/src/${name}.scss`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        },
      ],
    }),
  ],
  // 引入第三方的配置
  optimizeDeps: {
    include: [
      "element-plus/lib/locale/lang/zh-cn",
    ],
  },
  server: {
    hmr: { overlay: false },
    // 使用IP启动项目
    host: "0.0.0.0",
    // 配置启用的端口号
    port,
  },
  resolve: {
    // 设置别名
    alias: {
      "@": resolve(__dirname, "src/"),
      api: resolve(__dirname, "src/api"),
      mock: resolve(__dirname, "src/mock"),
      common: resolve(__dirname, "src/common"),
      assets: resolve(__dirname, "src/assets"),
      components: resolve(__dirname, "src/components"),
      views: resolve(__dirname, "src/views"),
      utils: resolve(__dirname, "src/utils"),
      router: resolve(__dirname, "src/router"),
      bmob: resolve("src/bmob"),
      "~@": resolve(__dirname, "src/"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 添加公共样式
        additionalData: '@use "@/styles/variables.scss" as *;',
      },
    },
  },
});
