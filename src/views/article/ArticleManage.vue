<template>
  <div class="article-manage wrap">
    <bread-crumb>文章管理</bread-crumb>
    <div class="body">
      <filter-form></filter-form>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "components/common/BreadCrumb";
import FilterForm from "./childComps/FilterForm"

export default {
  components: {
    BreadCrumb,
    FilterForm,
  },
};
</script>

<style scoped>

</style>
