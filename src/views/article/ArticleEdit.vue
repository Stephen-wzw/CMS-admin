<template>
  <div class="article-edit">
    <bread-crumb>{{ breadCrumb }}</bread-crumb>
    <div class="body">
      <article-form></article-form>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "components/common/BreadCrumb";
import ArticleForm from './childComps/ArticleForm';

export default {
  components: {
    BreadCrumb,
    ArticleForm,
  },
  data() {
    return {};
  },
  computed: {
    breadCrumb() {
      return this.$route.params.articleId == "add" ? "新增文章" : "编辑文章";
    },
  },
};
</script>

<style></style>
