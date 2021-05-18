<template>
  <div class="comment-manage">
    <bread-crumb>评论管理</bread-crumb>
    <div class="body">
      <!-- <comment-filter></comment-filter> -->
      <comment-table></comment-table>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "components/common/BreadCrumb";
// import CommentFilter from "./childComps/CommentFilter";
import CommentTable from "./childComps/CommentTable";

export default {
  components: {
    BreadCrumb,
    // CommentFilter,
    CommentTable,
  },
};
</script>

<style>

</style>