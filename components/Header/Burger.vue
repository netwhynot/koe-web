<script lang="ts" setup></script>

<template>
  <div class="burger">
    <span class="burger__line"></span>
    <span class="burger__line"></span>
    <span class="burger__line"></span>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/vars.scss";

.burger {
  position: relative;
  display: flex;
  width: 28px;
  height: 44px;
  margin-left: 20px;

  &__line {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: block;
    margin: auto;
    width: 28px;
    height: 2px;
    border-radius: 2px;
    background-color: $white;
  }

  &__line:nth-child(2) {
    top: -20px;
  }

  &__line:nth-child(3) {
    top: 20px;
  }
}
</style>
