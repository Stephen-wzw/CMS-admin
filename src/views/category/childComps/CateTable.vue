<template>
  <data-table
    :tableData="categoryData"
    :header="categoryHeader"
    :showEdit="true"
    :showDelete="false"
    :showSelect="false"
    :showImg="true"
    @deleteOne="deleteOne"
    @addClick="addCate"
  >
  </data-table>
</template>

<script>
import DataTable from "components/content/DataTable";

import { getCategory, deleteOne } from "network/category";

const categoryHeader = [
  {
    prop: "categoryName",
    label: "分类名称",
  },
];

export default {
  components: {
    DataTable,
  },
  data() {
    return {
      categoryHeader,
      categoryData: [],
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      getCategory().then((res) => {
        console.log(res);

        // 设置临时变量，这样能解决表格不渲染数据的问题，但是不知道为什么
        // TODO：了解响应式变化原理
        const tempData = [];
        const length = res.length;

        for (let i = 1; i < length; i++) {
          tempData[i] = new Object();

          const categoryPhoto = res[i].categoryPhoto.replace(
            /http:\/\/localhost:8080\//,
            "http://10.138.240.106:8080/"
          );

          // 为了显示编辑
          this.$set(tempData[i], "status", 1);

          this.$set(tempData[i], "categoryId", res[i].categoryId);
          // 表格所需数据
          this.$set(tempData[i], "categoryName", res[i].categoryName);
          this.$set(tempData[i], "img", categoryPhoto);
        }

        this.categoryData = tempData;
      });
    },

    // 删除分类
    deleteOne(row) {
      this.$confirm(
        "删除后不可恢复，该分类下的所有文章将自动归入未分类！",
        "确定要删除吗",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteOne(row.categoryId).then((res) => {
            console.log(res);

            if (res.msg === `成功删除id为${row.categoryId}的分类`) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            }

            this.getCategory();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 新增分类
    addCate() {
      this.$EventBus.$emit("addCate");
    },
  },
};
</script>

<style></style>
