/**
 * 地图图层操作相关事件
 */

export default {
    /**
     * 图层排序
     * @param {*} view 视图
     * @param {*} data 传递数据
     */
    onLayerOrder: (view, data) => {
        if (!data || !data.layerIds) {
            console.log("缺少传递数据 { layerIds }");
            return false;
        }

        const { layerIds } = data;

        const layerCount = view.map.layers.items.length;
        const baseLayerCount = layerCount - layerIds.length;

        layerIds.forEach((id, index) => {
            const layer = view.map.findLayerById(id);
            view.map.reorder(layer, baseLayerCount + index + 1);
        });
    },
    /**
     * 图层可见性
     * @param {*} view 视图
     * @param {*} data 传递数据
     */
    setLayerVisible: (view, data) => {
        try {
            const { id, visible } = data;
            const layer = view.map.findLayerById(id);
            if (layer) {
                layer.visible = visible;
            }
        } catch (err) {
            console.log(err);
        }


    },
};
