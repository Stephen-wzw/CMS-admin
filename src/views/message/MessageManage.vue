<template>
  <div class="message-manage">
    <bread-crumb>留言管理</bread-crumb>
    <div class="body">
      <message-filter></message-filter>
      <message-table></message-table>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "components/common/BreadCrumb";
import MessageFilter from "./childComps/MessageFilter";
import MessageTable from "./childComps/MessageTable";

export default {
  components: {
    BreadCrumb,
    MessageFilter,
    MessageTable,
  },
};
</script>

<style>

</style>