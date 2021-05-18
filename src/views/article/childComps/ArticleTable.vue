<template>
  <data-table
    :tableData="articleData"
    :header="articleHeader"
    :showStatus="true"
    :showEdit="true"
    @deleteOne="deleteOne"
    @recover="recoverArticle"
    @deleteAll="deleteAll"
    @addClick="toArticleEdit"
  ></data-table>
</template>

<script>
import moment from "moment";

import DataTable from "components/content/DataTable";

import { getAllArticle, deleteOne, deleteAll, recover, searchArticle } from "network/article";

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
    this.getAllArticle();
    this.$EventBus.$on("editClick", (row) => {
      this.$router.push(`article-edit/${row.articleId}`).catch((err) => err);
    });
    this.$EventBus.$on("addArticleSuccess", () => {
      console.log("success");
      this.getAllArticle();
    });
    this.$EventBus.$on("searchArticle", form => {
      searchArticle(form).then(res => {
        console.log(res);
      })
    })
  },
  destroyed() {
    this.$EventBus.$off();
  },
  methods: {
    getAllArticle() {
      getAllArticle().then((res) => {
        // 设置临时变量，这样能解决表格不渲染数据的问题，但是不知道为什么
        // TODO：了解响应式变化原理
        const tempData = [];
        const length = res.length;
        for (let i = 0; i < length; i++) {
          tempData[i] = new Object();

          this.$set(tempData[i], "articleId", res[i].articleId);

          // 表格所需数据
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
        this.articleData = tempData;
      });
    },

    // 删除一篇文章
    deleteOne(row) {
      if (row.status == 1) {
        this.$confirm("你可以随时恢复，是否继续?", "文章将变成已删除状态", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            deleteOne(row.articleId).then((res) => {
              console.log(res);
              console.log(row.articleId);
              if (res.msg === `成功删除id为${row.articleId}的文章`) {
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
              this.getAllArticle();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$confirm("删除后不可恢复！是否继续?", "文章将被永久删除！", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            deleteOne(row.articleId).then((res) => {
              console.log(res);
              console.log(row.articleId);
              if (res.msg === `成功删除id为${row.articleId}的文章`) {
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
              this.getAllArticle();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },

    deleteAll(multipleSelection) {
      this.$confirm(
        `确定删除${multipleSelection.length}篇文章？你可以随时恢复，是否继续?`,
        "文章将变成已删除状态",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteAll(multipleSelection).then((res) => {
            const ids = multipleSelection.toString();
            const len = multipleSelection.length;

            if (res.msg === `成功删除id为${ids}的文章，共计${len}篇文章`) {
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

            this.getAllArticle();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 恢复文章
    recoverArticle(row) {
      this.$confirm("文章将恢复，变成已发布状态", "确定要恢复文章吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          recover(row.articleId).then((res) => {
            const id = row.articleId;

            if (res.msg === `成功恢复id为${id}的文章`) {
              this.$message({
                type: "success",
                message: "恢复成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: "恢复失败!",
              });
            }

            this.getAllArticle();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消恢复",
          });
        });
    },

    // 点击新增跳转至文章编辑页
    toArticleEdit() {
      this.$router.push(`article-edit/add`).catch((err) => err);
    },
  },
};
</script>

<style></style>
