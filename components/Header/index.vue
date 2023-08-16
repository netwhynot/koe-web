<script lang="ts" setup>
import Burger from "./Burger.vue";
</script>

<template>
  <header class="header">
    <!-- <div class="container"> -->
    <div class="header__inner">
      <img src="@/assets/svg/logo.svg" alt="logo" />
      <Burger></Burger>
    </div>
    <!-- </div> -->
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/vars.scss";

.header {
  min-height: 68px;
}

.header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: $darkd;
  // transition: all 0.2s ease;

  @media screen and (min-width: $vp-mobile) {
    padding: 20px 24px;
  }
}
</style>
