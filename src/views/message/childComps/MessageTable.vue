<template>
  <data-table
    :tableData="messageData"
    :header="messageHeader"
    :showAdd="false"
    @deleteOne="deleteOne"
  ></data-table>
</template>

<script>
import moment from "moment";

import DataTable from "components/content/DataTable";

import { getAllMessage, deleteOne } from "network/message";

const messageHeader = [
  {
    prop: "content",
    label: "留言内容",
  },
  {
    prop: "user",
    label: "留言用户",
  },
  {
    prop: "date",
    label: "留言时间",
  },
];

export default {
  components: {
    DataTable,
  },
  data() {
    return {
      messageHeader,
      messageData: [],
    };
  },
  mounted() {
    console.log("message table");
    this.getAllmessage();
  },
  watch: {
    articleData: function() {
      console.log("yi");
    },
  },
  methods: {
    getAllmessage() {
      getAllMessage().then((res) => {
        console.log(res);
        // 设置临时变量，这样能解决表格不渲染数据的问题，但是不知道为什么
        // TODO：了解响应式变化原理
        const tempData = [];
        const length = res.length;
        for (let i = 0; i < length; i++) {
          tempData[i] = new Object();

          // 留言id
          this.$set(tempData[i], "messageId", res[i].messageId);

          this.$set(tempData[i], "content", res[i].messageContent);
          this.$set(tempData[i], "user", res[i].messagePersonName);
          this.$set(
            tempData[i],
            "date",
            moment(res[i].messageCreationTime).format("YY/MM/DD HH:MM")
          );
        }
        console.log(tempData);
        this.messageData = tempData;
      });
    },

    // 删除一条留言,永久删除不可恢复
    deleteOne(row) {
      this.$confirm("此操作将永久删除该留言, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteOne(row.messageId).then((res) => {
            console.log(res);
            if (res === `成功删除id为${row.messageId}的评论`) {
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
            this.getAllmessage();
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
