<template>
  <data-table
    :tableData="commentData"
    :header="commentHeader"
    :showAdd="false"
    @deleteOne="deleteOne"
  ></data-table>
</template>

<script>
import moment from "moment";

import DataTable from "components/content/DataTable";

import { getAllComment, deleteOne } from "network/comment";

const commentHeader = [
  {
    prop: "content",
    label: "评论内容",
  },
  {
    prop: "article",
    label: "所在文章",
  },
  {
    prop: "user",
    label: "评论用户",
  },
  {
    prop: "date",
    label: "评论时间",
  },
];

export default {
  components: {
    DataTable,
  },
  data() {
    return {
      commentHeader,
      commentData: [],
    };
  },
  mounted() {
    console.log("comment table");
    this.getAllComment();
  },
  watch: {
    articleData: function() {
      console.log("yi");
    },
  },
  methods: {
    getAllComment() {
      getAllComment().then((res) => {
        console.log(res);
        // 设置临时变量，这样能解决表格不渲染数据的问题，但是不知道为什么
        // TODO：了解响应式变化原理
        const tempData = [];
        const length = res.length;
        for (let i = 0; i < length; i++) {
          tempData[i] = new Object();

          // 评论id
          this.$set(tempData[i], "commentId", res[i].commentId);

          this.$set(tempData[i], "content", res[i].commentContent);
          this.$set(tempData[i], "article", res[i].article.articleTitle);
          this.$set(tempData[i], "user", res[i].commentPersonName);
          this.$set(
            tempData[i],
            "date",
            moment(res[i].commentCreationTime).format("YY/MM/DD HH:MM")
          );
        }
        console.log(tempData);
        this.commentData = tempData;
      });
    },

    // 删除一条评论,永久删除不可恢复
    deleteOne(row) {
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteOne(row.commentId).then((res) => {
            console.log(res);
            if (res === `成功删除id为${row.commentId}的评论`) {
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
            this.getAllComment();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style></style>
