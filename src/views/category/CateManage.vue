<template>
  <div class="cate-manage">
    <bread-crumb>分类管理</bread-crumb>
    <div class="body">
      <cate-table></cate-table>
      <cate-form></cate-form>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "components/common/BreadCrumb";
import CateTable from "./childComps/CateTable";
import CateForm from "./childComps/CateForm";

export default {
  components: {
    BreadCrumb,
    CateTable,
    CateForm,
  },
};
</script>

<style>

</style>