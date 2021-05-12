<template>
  <div class="data-wrap">
    <div class="btn-wrap">
      <el-button
        type="danger"
        @click="Delete"
        size="small"
        icon="el-icon-delete"
        :disabled="!tableData.length"
        v-show="showDelete"
      >
        <slot>删除</slot>
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="btnClick"
        icon="el-icon-plus"
        v-show="showAdd"
      >
        <slot>新增</slot>
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <!-- 选择框 -->
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <!-- 状态标签 -->
      <el-table-column
        prop="status"
        label="状态"
        width="80"
        :filters="[
          { text: '已发布', value: '1' },
          { text: '已删除', value: '0' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        align="center"
        v-if="showStatus"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status == '1' ? 'success' : 'danger'"
            disable-transitions
          >
            <span v-if="scope.row.status == 1">已发布</span>
            <span v-else>已删除</span>
          </el-tag>
        </template>
      </el-table-column>
      <!-- 循环展示文章数据 -->
      <el-table-column
        v-for="(item, index) in header.slice(0)"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        align="center"
      ></el-table-column>
      <!-- 操作栏 -->
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    header: {
      type: Array,
      default() {
        return [];
      },
    },
    showDelete: {
      type: Boolean,
      default() {
        return true;
      },
    },
    showAdd: {
      type: Boolean,
      default() {
        return true;
      },
    },
    showStatus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  // TODO：需要增加自适应列表宽度
  methods: {
    // 删除
    // TODO: 调用后台接口
    Delete() {
      console.log("delete");
    },
    btnClick() {
      this.$router.push("article-edit").catch((err) => err);
    },
    // 操作方法
    handleClick(row) {
      console.log(row);
    },

    // 标签方法=>筛选对于标签
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row) {
      return row.status;
    },
    filterTag(value, row) {
      return row.status === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },
};
</script>

<style></style>
