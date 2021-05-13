<template>
  <div class="article-manage wrap">
    <bread-crumb>文章管理</bread-crumb>
    <div class="body">
      <article-filter></article-filter>
      <article-table></article-table>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "components/common/BreadCrumb";
import ArticleFilter from "./childComps/ArticleFilter";
import ArticleTable from "./childComps/ArticleTable";

export default {
  components: {
    BreadCrumb,
    ArticleFilter,
    ArticleTable,
  },
};
</script>

<style scoped></style>
