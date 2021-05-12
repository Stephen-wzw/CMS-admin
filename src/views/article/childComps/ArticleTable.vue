<template>
  <data-table :tableData="articleData" :header="articleHeader" :showStatus="true"></data-table>
</template>

<script>
import moment from "moment";

import DataTable from "components/content/DataTable"

import { getAllArticle } from "network/article";

const articleHeader = [
  // {
  //   prop: "status",
  //   label: "状态",
  // },
  {
    prop: "title",
    label: "标题",
  },
  {
    prop: "category",
    label: "分类",
  },
  {
    prop: "Date",
    label: "创建时间",
  },
  {
    prop: "viewCount",
    label: "浏览数",
  },
  {
    prop: "commentCount",
    label: "评论数",
  },
  {
    prop: "likeCount",
    label: "点赞数",
  },
];

export default {
  components: {
    DataTable,
  },
  data() {
    return {
      articleHeader,
      articleData: [],
    };
  },
  mounted() {
    console.log("article table");
    this.getAllArticle();
  },
  watch: {
    articleData: function() {
      console.log("yi");
    },
  },
  methods: {
    getAllArticle() {
      getAllArticle().then((res) => {
        console.log(res);
        // 设置临时变量，这样能解决表格不渲染数据的问题，但是不知道为什么
        // TODO：了解响应式变化原理
        const tempData = [];
        const length = res.length;
        for (let i = 0; i < length; i++) {
          tempData[i] = new Object();

          this.$set(tempData[i], "status", res[i].articleStatus);
          this.$set(tempData[i], "title", res[i].articleTitle);
          this.$set(tempData[i], "category", res[i].categoryId);
          this.$set(
            tempData[i],
            "Date",
            moment(res[i].articleCreationTime).format("YY/MM/DD HH:MM")
          );
          this.$set(tempData[i], "viewCount", res[i].articleViewCount);
          this.$set(tempData[i], "commentCount", res[i].commentCount);
          this.$set(tempData[i], "likeCount", res[i].articleLikeCount);
        }
        console.log(tempData);
        this.articleData = tempData;
      });
    },

    // 删除
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
