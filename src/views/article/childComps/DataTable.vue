<template>
  <div class="data-wrap">
    <div class="btn-wrap">
      <el-button
        type="danger"
        @click="onSubmit"
        size="small"
        icon="el-icon-delete"
        :disabled="!tableData.length"
        >删除</el-button
      >
      <el-button
        type="primary"
        size="small"
        @click="resetForm('form')"
        icon="el-icon-plus"
        >新增文章</el-button
      >
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="selection" width="55" align="center"> </el-table-column>
      <el-table-column prop="state" label="状态" align="center"> </el-table-column>
      <el-table-column prop="category" label="分类" align="center"> </el-table-column>
      <el-table-column prop="title" label="标题" align="center"> </el-table-column>
      <el-table-column prop="date" label="发表时间" width="180" align="center"> </el-table-column>
      <el-table-column prop="views" label="浏览数" align="center"> </el-table-column>
      <el-table-column prop="comments" label="评论数" align="center"> </el-table-column>
      <el-table-column prop="likes" label="点赞数" align="center"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
};
</script>

<style></style>
