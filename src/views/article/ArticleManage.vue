<template>
  <div class="article-manage wrap">
    <bread-crumb>文章管理</bread-crumb>
    <div class="body">
      <filter-form></filter-form>
      <data-table></data-table>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "components/common/BreadCrumb";
import FilterForm from "./childComps/FilterForm"
import DataTable from "./childComps/DataTable"

export default {
  components: {
    BreadCrumb,
    FilterForm,
    DataTable,
  },
};
</script>

<style scoped>

</style>
