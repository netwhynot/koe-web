<script lang="ts" setup>
import Burger from "./Burger.vue";
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <NuxtLink to="/"
        ><img class="logo" src="@/assets/svg/logo.svg" alt="logo"
      /></NuxtLink>
      <Burger></Burger>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  min-height: 68px;
  position: sticky;
  top: 0;
  z-index: 5;
}

.header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: $darkd;

  @media screen and (min-width: $vp-mobile) {
    padding: 20px 24px;
  }

  .logo {
    width: 83px;
    height: 44px;
  }
}
</style>
