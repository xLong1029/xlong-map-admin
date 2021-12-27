<template>
  <div class="info-table-container">
    <template v-if="data.length">
      <table
        cellpadding="0"
        cellspacing="0"
        class="info-table"
        :width="width"
        :height="height"
      >
        <tr
          v-for="(item, index) in data"
          :key="'tr' + index"
          class="info-table__tr"
        >
          <th class="info-table__th" :width="thWidth">
            {{ isNull(item[props.title]) }}
          </th>
          <td class="info-table__td" :width="tdWidth">
            {{ isNull(item[props.content]) }}
          </td>
        </tr>
      </table>
    </template>
    <el-empty v-else />
  </div>
</template>

<script setup>
import filter from "common/filter.js";

const props = defineProps({
  // 表格数据
  data: {
    type: Array,
    default: () => [
      {
        title: "标题",
        content: "内容"
      }
    ]
  },
  // 属性配置
  props: {
    type: Object,
    default: () => ({
      title: "title",
      content: "content"
    })
  },
  // 表格高度
  height: {
    type: String,
    default: "100%"
  },
  // 表格宽度
  width: {
    type: String,
    default: "100%"
  },
  // 标题宽度
  thWidth: {
    type: String,
    default: "200"
  },
  // 内容宽度
  tdWidth: {
    type: String,
    default: ""
  }
});

const { isNull } = filter();
</script>

<style lang="scss" scoped>
$border: 1px solid #ebeef5;
.info-table {
  border: $border;
  &-container {
    height: 100%;
    min-height: 400px;
  }

  &__tr {
    &:nth-child(2n) {
      background: #fafafa;
    }

    &:last-child {
      .info-table__th,
      .info-table__td {
        border-bottom: none;
      }
    }
  }

  &__th,
  &__td {
    padding: 12px 10px;
    min-width: 100px;
    border-bottom: $border;
  }

  &__th {
    border-right: $border;
    text-align: right;
  }
}
</style>
