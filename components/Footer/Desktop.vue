<script lang="ts" setup></script>

<template>
  <ul class="menu-desktop">
    <li class="menu-desktop__link">
      <NuxtLink to="/">Головна</NuxtLink>
    </li>
    <li class="menu-desktop__link">
      <NuxtLink to="/donate">Задонатити</NuxtLink>
    </li>
    <li class="menu-desktop__link">
      <NuxtLink to="/tourney">Про Турнір </NuxtLink>
    </li>
    <li class="menu-desktop__link">
      <NuxtLink to="/me">Увійти</NuxtLink>
    </li>
    <li class="menu-desktop__link">
      <NuxtLink to="/buy">Купити квиток</NuxtLink>
    </li>
    <li class="menu-desktop__link">
      <NuxtLink to="/staff">Організатори</NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.menu-desktop {
  display: grid;
  grid-template-columns: repeat(4, 110px) !important;
  gap: 60px;
  row-gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media screen and (max-width: $vp-tlandscape) {
    display: none;
  }

  &__link > a {
    color: $secondary;
    font-family: "Mulish";
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    white-space: nowrap;
  }
}
</style>
