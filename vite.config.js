import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import settings from "./src/settings";

import AutoImport from 'unplugin-auto-import/vite'
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const port = settings.webPort;

// 获取打包文件
function getOutputDir() {
    let dir = "xlongMapAdmin";

    // switch (process.env.VUE_APP_ENV) {
    //     case "test":
    //         dir = "xlongMapAdminTest";
    //         break;
    //     case "release":
    //         dir = "xlongMapAdminRelease";
    //         break;
    // }

    return dir;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        build: {
            publicPath: mode === 'development' ? "/" : "/xlong-map-admin/",
            outDir: getOutputDir(),
            // 修改打包块限制大小
            chunkSizeWarningLimit: 1500
        },
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver({
                    importStyle: "sass",
                })],
            }),
            Components({
                resolvers: [
                    ElementPlusResolver({
                        importStyle: "sass",
                    }),
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
            // 是否开启https
            https: false,
        },
        resolve: {
            alias: {
                "@/": `${path.resolve(__dirname, "src")}/`,
                "api": `${path.resolve(__dirname, "src")}/api`,
                "mock": `${path.resolve(__dirname, "src")}/mock`,
                "common": `${path.resolve(__dirname, "src")}/common`,
                "assets": `${path.resolve(__dirname, "src")}/assets`,
                "components": `${path.resolve(__dirname, "src")}/components`,
                "views": `${path.resolve(__dirname, "src")}/views`,
                "utils": `${path.resolve(__dirname, "src")}/utils`,
                "router": `${path.resolve(__dirname, "src")}/router`,
                "bmob": `${path.resolve(__dirname, "src")}/bmob`,
                "config": `${path.resolve(__dirname, "src")}/config`
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/styles/variables.scss" as *;`,
                },
            },
            postcss: {
                plugins: [{
                    postcssPlugin: 'internal:charset-removal',
                    AtRule: {
                        // 去除"@charset" must be the first警告
                        charset: (atRule) => {
                            if (atRule.name === 'charset') {
                                atRule.remove();
                            }
                        }
                    }
                }],
            },
        }
    }
});