<template>
  <div>
    <template v-if="data.length">
      <Draggable
        :list="data"
        group="item"
        :item-key="props.key"
        handle=".move-btn"
        ghost-class="ghost"
        @end="onChangeSort"
      >
        <template #item="{ element }">
          <div class="transfer-item">
            <el-checkbox
              v-model="element.checked"
              :label="element[props.label]"
              @change="onChangeCheck(element)"
            >
              <div class="name ellipsis" :title="element[props.label]">
                {{ element[props.label] }}
              </div>
            </el-checkbox>
            <div class="operate">
              <i
                v-if="element.visible"
                class="iconfont icon-kejian visible-btn"
                title="图层可见"
                @click="onSetLayerVisible(element, false)"
              >
              </i>
              <i
                v-else
                class="iconfont icon-bukejian visible-btn"
                title="图层不可见"
                @click="onSetLayerVisible(element, true)"
              >
              </i>
              <i class="iconfont icon-yidong move-btn" title="可上下移动排序"> </i>
            </div>
          </div>
        </template>
      </Draggable>
    </template>
    <el-empty v-else :image-size="80"></el-empty>
  </div>
</template>

<script setup>
import Draggable from "vuedraggable";

const thisProps = defineProps({
  // 未选中的数据，在上方
  data: {
    type: Array,
    default: [],
  },
  // 属性
  props: {
    type: Object,
    default: {
      key: "id",
      label: "title",
    },
  },
  // 类型 上方元素 -1下方元素
  type: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["change-check", "set-layer-visible", "change-sort"]);

const onChangeCheck = (element) => {
  emit("change-check", element, thisProps.type);
};

const onSetLayerVisible = (element, visible) => {
  emit("set-layer-visible", element, visible);
};

const onChangeSort = (event) => {
  emit("change-sort", event, thisProps.type);
};
</script>

<style lang="scss" scoped>
.transfer {
  &-item {
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      max-width: 240px;
    }

    .operate {
      .iconfont {
        margin-left: 15px;
        font-size: 16px;
      }
    }

    .visible-btn {
      cursor: pointer;
    }

    .move-btn {
      cursor: move;
    }

    &.ghost {
      opacity: 0.5;
      background: #e0f0ff;
    }
  }
}
</style>
