/*
 * 模块 : 列表页码相关
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2021-09-02
 * 版本 : version 1.0
 */
import { ref, reactive } from "@vue/runtime-core";

export default function() {
    // 列表加载
    const listLoading = ref(false);

    const page = reactive({
        // 当前页面
        pageNo: 1,
        // 每页条数
        pageSize: 10,
        // 每页条数选择
        pageSizes: [10, 20, 40, 60],
        // 总数
        total: 0
    });

    // 表格数据
    const listData = ref([]);
    // 表格高度
    const tableHeight = ref("500");
    // 全选选项列表
    const selectList = ref([]);
    // 表格配置属性
    const tableProps = ref({
        prop: "key",
        label: "title"
    });

    // 筛选参数
    const filterParams = ref({});
    // 默认参数
    const defaultParams = ref({});

    /**
     * 配置页码
     *
     * @param {Object} data 数据
     */
    const setPage = data => {
        page.total = data.count;
        page.pageNo = data.page;
        page.pageSize = data.size;
    };

    /**
     * 设置表格固定高度
     *
     * @param {Number} tableReduceH 缩减高度
     */
    const setTableHeight = tableReduceH => {
        const windowH = window.innerHeight;
        tableHeight.value = windowH - tableReduceH;
    };

    /**
     * 获取选项id
     *
     * @param {Array} selection 选项
     */
    const getSelectList = selection => {
        selectList.value = [...selection];
    };

    /**
     * 清空选项
     */
    const clearSelect = () => {
        selectList.value = [];
    };

    return {
        listLoading,
        page,
        listData,
        tableHeight,
        selectList,
        tableProps,
        filterParams,
        defaultParams,
        setPage,
        setTableHeight,
        getSelectList,
        clearSelect
    };
}