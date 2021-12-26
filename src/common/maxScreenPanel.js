/*
 * 模块 : 全屏工具栏相关
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2021-11-29
 * 版本 : version 1.0
 */
import { onMounted } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";

const VITE_APP_ENV =
    import.meta.env.VITE_APP_ENV;
const VITE_APP_BASE_URL =
    import.meta.env.VITE_APP_BASE_URL;

export default function() {
    const url = ref("");

    onMounted(() => {
        setUrl();
    });

    // 配置地址
    const setUrl = () => {
        // 开发环境使用本地地址
        if (VITE_APP_ENV === "development") {
            url.value = window.location.origin;
        } else {
            url.value = VITE_APP_BASE_URL;
        }
    };

    /**
     * 关闭面板
     * 
     * @param {*} emit 触发事件
     * @param {*} props 组件接受参数
     */
    const onClosePanel = (emit, props) => {
        emit("close", {
            panel: props.panel,
            index: props.index,
            active: false,
        });
    };

    /**
     * 面板最小
     * 
     * @param {*} emit 触发事件
     * @param {*} props 组件接受参数
     */
    const onMinimizePanel = (emit, props) => {
        emit("minimize", {
            panel: props.panel,
            index: props.index,
            active: true,
        });
    };

    /**
     * 面板最大化
     * 
     * @param {*} emit 触发事件
     * @param {*} props 组件接受参数
     */
    const onMaximizePanel = (emit, props) => {
        emit("maximize", {
            panel: props.panel,
            index: props.index,
            active: false,
        });
    };

    return {
        url,
        setUrl,
        onClosePanel,
        onMinimizePanel,
        onMaximizePanel
    };
}