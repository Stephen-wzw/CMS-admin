<template>
  <div class="about-manage">
    <bread-crumb>关于管理</bread-crumb>
    <div class="body">
      <about-form></about-form>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "components/common/BreadCrumb";
import AboutForm from "./childComps/AboutForm";

export default {
  components: {
    BreadCrumb,
    AboutForm,
  },
};
</script>

<style></style>
