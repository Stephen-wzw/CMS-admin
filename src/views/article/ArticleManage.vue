<template>
  <div class="article-manage wrap">
    <bread-crumb>文章管理</bread-crumb>
    <div class="body">
      <filter-form></filter-form>
      <article-table></article-table>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "components/common/BreadCrumb";
import FilterForm from "./childComps/FilterForm";
import ArticleTable from "./childComps/ArticleTable";

export default {
  components: {
    BreadCrumb,
    FilterForm,
    ArticleTable,
  },
};
</script>

<style scoped></style>
