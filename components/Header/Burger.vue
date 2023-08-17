<script lang="ts" setup>
const isActive = ref(false);
</script>

<template>
  <div class="burger">
    <div
      class="burger__inner"
      :class="isActive ? 'ontop' : ''"
      @click="isActive = !isActive"
    >
      <span class="burger__line"></span>
      <span class="burger__line"></span>
      <span class="burger__line"></span>
    </div>
    <div class="burger__menu" :class="isActive ? 'show-menu' : ''">
      <ul class="menu">
        <li class="menu__link">
          <NuxtLink to="/" :class="isActive ? 'active__route' : ''"
            >головна</NuxtLink
          >
        </li>
        <li class="menu__link">
          <NuxtLink to="/buy" @click="isActive = !isActive"
            >купити квиток</NuxtLink
          >
        </li>
        <li class="menu__link">
          <NuxtLink to="/about" @click="isActive = !isActive"
            >інформація</NuxtLink
          >
        </li>
        <li class="menu__link">
          <NuxtLink to="/torney" @click="isActive = !isActive"
            >про турнір</NuxtLink
          >
        </li>
        <li class="menu__link">
          <NuxtLink to="/donate" @click="isActive = !isActive"
            >задонатити</NuxtLink
          >
        </li>
        <li class="menu__link">
          <NuxtLink to="/organizers" @click="isActive = !isActive"
            >організатори</NuxtLink
          >
        </li>
        <li class="menu__link">
          <NuxtLink to="/me" @click="isActive = !isActive">увійти</NuxtLink>
        </li>
      </ul>
      <AdditionalLinks></AdditionalLinks>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Burger icon
.burger {
  position: relative;
  width: 30px;
  height: 30px;
  margin-left: 20px;

  &__inner {
    position: absolute;
    // width: 28px; // leave it here
    // height: 44px; // leave it here
    padding: 15px;
    cursor: pointer;
    z-index: $ontop;
  }

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
    transition: transform 0.4s ease;
  }

  &__line:nth-child(2) {
    top: -20px;
  }

  &__line:nth-child(3) {
    top: 20px;
  }

  &__menu {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 100%;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    background-color: $darkdd;
    transition: all 0.4s ease;
  }
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 0;
  margin: 84px 0 48px 0;
  list-style: none;
  color: $white;
  text-transform: uppercase;
  font-family: "Furore";
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 2px;

  @media screen and (min-width: $vp-mobile) {
    margin: 144px 0 320px 0;
    gap: 56px;
  }

  &__link {
    white-space: nowrap;
    text-align: center;
  }
}

.active__route {
  position: relative;
  color: $main-bg;

  @media screen and (min-width: 480px) {
    &::before {
      content: "";
      position: absolute;
      left: -22px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: $main;
      transform: translate(-50%, 8px);
    }
  }
}

.ontop {
  position: fixed;
  overflow: hidden;

  .burger__line:nth-child(1) {
    transform: rotate(45deg);
  }

  .burger__line:nth-child(2) {
    transform: rotate(-45deg) translateY(7.5px) translateX(-6.5px);
  }

  .burger__line:nth-child(3) {
    opacity: 0;
  }
}

.show-menu {
  left: 0;
}
</style>
