<template>
  <div class="cate-manage">
    <bread-crumb>分类管理</bread-crumb>
    <div class="body">
      <cate-table></cate-table>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "components/common/BreadCrumb";
import CateTable from "./childComps/CateTable";

export default {
  components: {
    BreadCrumb,
    CateTable
  },
};
</script>

<style>

</style>