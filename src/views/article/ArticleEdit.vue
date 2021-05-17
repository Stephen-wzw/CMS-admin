<template>
  <div class="article-manage">
    <bread-crumb>新增文章</bread-crumb>
    <div class="ss"></div>
  </div>
</template>

<script>
import BreadCrumb from "components/common/BreadCrumb";

export default {
  components: {
    BreadCrumb,
  },
  mounted() {
    this.$EventBus.$on("editClick", (row) => {
      this.$router.push("edit").catch((err) => err);
      console.log(row);
    });
  },
  destroyed() {
    this.$EventBus.$off();
  },
};
</script>

<style></style>
