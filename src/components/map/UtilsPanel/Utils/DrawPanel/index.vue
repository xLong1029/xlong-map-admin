<template>
  <div v-drag class="util-panel draw-panel">
    <div class="util-panel__header">
      <span>{{ panel.utilName }}工具</span>
      <i class="iconfont icon-guanbi" title="关闭窗口" @click="onClose"></i>
    </div>
    <div :id="panelID" class="util-panel__content draw-panel__content">
      <div class="esri-component esri-widget" v-if="mapViewType == '3D'">
        <div role="toolbar" class="esri-sketch__panel">
          <div role="menu" class="esri-sketch__section esri-sketch__tool-section">
            <button class="esri-sketch__button esri-icon-map-pin draw_tool__button" data-type="point" title="绘制点" type="button"></button>
            <button class="esri-sketch__button esri-icon-polyline draw_tool__button" data-type="polyline" title="绘制线" type="button"></button>
            <button class="esri-sketch__button esri-icon-polygon draw_tool__button" data-type="polygon" title="绘制建筑" type="button"></button>
          </div>
          <div role="menu" class="esri-sketch__section esri-sketch__tool-section" id="drawpanel_actionbuttons" style="display: none">
            <button class="esri-sketch__button" title="退出编辑" type="button" id="drawpanel_done">
              <i class="el-icon-finished"></i>
            </button>
            <button class="esri-sketch__button " title="删除要素" type="button" id="drawpanel_cancel">
              <i class="el-icon-delete"></i>
            </button>
          </div>
          <div role="menu" class="esri-sketch__section esri-sketch__tool-section"  id="drawpanel_undobuttons"  >
            <button aria-label="撤消" class="esri-sketch__button esri-icon-undo"  id="drawpanel_undo" title="撤消" type="button"></button>
            <button aria-label="恢复" class="esri-sketch__button esri-icon-redo"  id="drawpanel_redo" title="恢复" type="button"></button>
          </div>
          <div class="esri-sketch__section">
            <button aria-label="草图设置" class="esri-sketch__button esri-icon-settings" title="草图设置" id="drawpanel_seting" type="button"></button>
          </div>
        </div>
        <div class="esri-sketch__panel esri-sketch__info-panel">
          <div role="menu" id="configurationDiv" class="esri-sketch__menu-container"  style="display: none">
            <header class="esri-sketch__menu-header">
              <span class="esri-sketch__menu-title">草图设置</span>
            </header>
            <div class="esri-sketch__menu-content" aria-label="草图设置">
              <div class="esri-sketch__menu-item-wrapper">
                <div >
                  <table id="configurationTable">
                    <tbody>
                    <tr>
                      <td style="width: 160px;">
                        <label for="enabledcheckbox" id="enabledcheckboxlabel"
                        ><b
                        >捕捉功能启用 (
                          <sapn id="snappingctrlkey">按住Ctrl</sapn>
                          )</b
                        ></label
                        >
                      </td>
                      <td><input type="checkbox" id="enabledcheckbox" checked="" /></td>
                    </tr>
                    <tr>
                      <td style="padding-left: 15px;">
                        <label for="selfsnappingcheckbox" id="selfsnappingcheckboxlabel"> -自我捕捉</label>
                      </td>
                      <td><input type="checkbox" id="selfsnappingcheckbox" /></td>
                    </tr>
                    <tr>
                      <td style="padding-left: 15px;">
                        <label for="featuresnappingcheckbox" id="featuresnappingcheckboxlabel"> -特征捕捉</label>
                      </td>
                      <td><input type="checkbox" id="featuresnappingcheckbox" /></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div role="menu" class="esri-sketch__menu-container"  id="edgeoperationbuttons" style="display: none">
            <header class="esri-sketch__menu-header">
              <span class="esri-sketch__menu-title">边操作</span>
            </header>
            <div class="esri-sketch__menu-content" aria-label="边操作">
              <div class="esri-sketch__menu-item-wrapper">
                <div class="update-options" id="edge">
                  <el-button-group>
                    <el-button type="primary" id="none-edge-button" role_value="none">取消</el-button>
                    <el-button type="primary" id="split-edge-button" role_value="split">拆分</el-button>
                    <el-button type="primary" id="offset-edge-button" role_value="offset">移动</el-button>
                  </el-button-group>
                </div>
            </div>
            </div>
          </div>


      </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "DrawPanel",
  
  props: {
    // 面板
    panel: {
      type: Object,
      default: () => ({
        utilName: "绘制",
      }),
    },
    // 当前面板索引在panelList中的索引
    index: {
      type: Number,
      default: 0,
    },
    mapViewType: {
      type: String,
      default: "3D",
    }
  },

  setup(props, content) {
    // 当前面板ID
    const panelID = "drawPanel";

    // 关闭面板
    const onClose = () => {
      content.emit("close", {
        panel: props.panel,
        index: props.index,
        active: false,
        eventSuffix: "Draw",
        panelID,
      });
    };

    return {
      panelID,
      onClose,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/util-panel.scss";
.draw-panel {
  width: 430px;

  &__content {
    padding: 5px 5px 5px 10px;
  }
}
</style>
