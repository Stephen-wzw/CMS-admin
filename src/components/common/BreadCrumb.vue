<template>
  <div class="bread-crumb">
    <slot>面板屑</slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.bread-crumb {
  background-color: #fff;

  font-size: 18px;
  font-weight: 300;
  color: #333;

  height: 55px;
  line-height: 55px;
  padding: 0 25px;

  user-select: none;
}
</style>