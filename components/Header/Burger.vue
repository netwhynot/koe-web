<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
const isActive = ref(false);
const modalIsActive = ref(false);
const userStore = useUserStore();

const openModal = () => {
  isActive.value = !isActive.value;
  if (!userStore.isLoggedIn) {
    modalIsActive.value = !modalIsActive.value;
  }
};
</script>

<template>
  <div class="burger">
    <Transition>
      <Modal
        v-if="modalIsActive"
        color="#ff8fc1"
        @close="modalIsActive = false"
      >
        <span class="modal__icon-osu"></span>
        <span class="modal__icon" @click="modalIsActive = false"></span>
        <p class="modal__text">
          Для того щоб продовжити, Вам необхідно виконати вхід за допомогою OSU!
        </p>
        <NuxtLink to="/" class="modal__btn" @click="modalIsActive = false"
          >вхід</NuxtLink
        >
      </Modal>
    </Transition>
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
          <NuxtLink to="/staff" @click="isActive = !isActive"
            >організатори</NuxtLink
          >
        </li>
        <li class="menu__link">
          <NuxtLink :to="userStore.isLoggedIn ? '/me' : ''" @click="openModal"
            >увійти</NuxtLink
          >
        </li>
      </ul>
      <AdditionalLinks></AdditionalLinks>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.burger {
  position: relative;
  width: 30px;
  height: 30px;
  margin-left: 20px;

  @media screen and (min-width: $vp-tlandscape) {
    display: none;
  }

  &__inner {
    position: absolute;
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
    z-index: 1;
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

.v-enter-active,
.v-leave-active {
  transition: all 0.1 ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.modal__text {
  margin: 16px 0;
  color: $white;
  text-align: center;
  font-family: "Mulish";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 23.4px */

  @media screen and (min-width: $vp-mobile) {
    font-size: 18px;
    margin: 20px 0;
  }

  @media screen and (min-width: $vp-desktop) {
    font-size: 20px;
    margin: 20px 0;
  }
}

.modal__btn {
  display: inline-block;
  padding: 14px 86px;
  color: $white;
  text-align: center;
  font-family: "Furore";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1.4px;
  background-color: $main;
}

.modal__icon {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  background-color: transparent;
  cursor: pointer;

  &::after,
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 2px;
    background-color: $main;
  }

  &::after {
    transform: translate(-50%, 50%) rotate(47.22deg);
  }

  &::before {
    transform: translate(-50%, 50%) rotate(-47.44deg);
  }
}

.modal__icon-osu {
  position: absolute;
  left: 50%;
  top: -50%;
  width: 72px;
  height: 72px;
  background-color: transparent;
  cursor: pointer;
  transform: translate(-50%, 100%);
  background: url("@/assets/svg/osu-icon.svg") no-repeat center;
  background-size: contain;

  @media screen and (min-width: $vp-mobile) {
    width: 96px;
    height: 96px;
    transform: translate(-50%, 50%);
  }

  @media screen and (min-width: $vp-desktop) {
    transform: translate(-50%, 80%);
  }
}
</style>
