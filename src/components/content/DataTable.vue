<template>
  <div class="data-wrap">
    <div class="btn-wrap">
      <el-button
        type="danger"
        @click="deleteAllClick"
        size="small"
        icon="el-icon-delete"
        :disabled="!tableData.length"
        v-show="showDelete"
      >
        删除
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="addClick"
        icon="el-icon-plus"
        v-show="showAdd"
      >
        新增
      </el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 选择框 -->
      <el-table-column
        type="selection"
        width="55"
        align="center"
        :selectable="selectable"
        v-if="showSelect"
      >
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

      <!-- 选择框 -->
      <el-table-column
        width="80"
        align="center"
        v-if="showImg"
        prop="img"
        label="分类图标"
      >
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="" height="25" width="25" />
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
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button
            @click="editClick(scope.row)"
            type="text"
            size="medium"
            v-show="showEdit"
            v-if="scope.row.status"
            icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button
            @click="recoverClick(scope.row)"
            type="text"
            size="medium"
            v-show="showEdit"
            v-else
            icon="el-icon-refresh-right"
            >恢复</el-button
          >
          <el-button
            type="text"
            size="medium"
            icon="el-icon-delete"
            @click="deleteOneClick(scope.row)"
            >删除</el-button
          >
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
    showSelect: {
      type: Boolean,
      default: true,
    },
    showStatus: {
      type: Boolean,
      default: false,
    },
    showImg: {
      type: Boolean,
      default: false,
    },
    showEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      multiSelection: [], // 多选的数据
    };
  },
  // TODO：需要增加自适应列表宽度
  methods: {
    //操作多选
    handleSelectionChange(val) {
      const len = val.length;
      const temp = new Array();

      for (let i = 0; i < len; i++) {
        temp[i] = val[i].articleId;
      }

      this.multipleSelection = temp;
    },

    // 删除
    // TODO: 调用后台接口
    deleteAllClick() {
      this.$emit("deleteAll", this.multipleSelection);
    },

    confirmDelete() {
      console.log("queren");
    },

    addClick() {
      this.$emit("addClick");
    },

    // 操作方法
    editClick(row) {
      // this.$emit("edit", row);
      this.$EventBus.$emit("editClick", row);
    },

    recoverClick(row) {
      this.$emit("recover", row);
    },

    deleteOneClick(row) {
      this.$emit("deleteOne", row);
    },

    // 标签方法
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

    // 判断复选框可否选择
    selectable(row) {
      if (row.status == 1) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style></style>
