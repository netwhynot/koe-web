<script lang="ts" setup>
import { useUserStore } from "@/stores/user";

const modalIsActive = ref(false);
const userStore = useUserStore();

const openModal = () => {
  if (!userStore.isLoggedIn) {
    modalIsActive.value = !modalIsActive.value;
  }
};
</script>

<template>
  <div class="desktop-wrapper">
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
        <a
          href="/api/auth/authorize"
          class="modal__btn"
          @click="modalIsActive = false"
          >вхід</a
        >
      </Modal>
    </Transition>
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
        <NuxtLink
          v-if="!userStore.isLoggedIn"
          active-class="active__route"
          @click="openModal"
          >Увійти</NuxtLink
        >
        <NuxtLink v-else to="/me" active-class="active__route"
          >Мій профіль</NuxtLink
        >
      </li>
      <li class="menu-desktop__link">
        <NuxtLink to="/buy" @click="!userStore.isLoggedIn ? openModal() : ''"
          >Купити квиток</NuxtLink
        >
      </li>
      <li class="menu-desktop__link">
        <NuxtLink to="/staff">Організатори</NuxtLink>
      </li>
    </ul>
  </div>
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

.desktop-wrapper {
  @media screen and (max-width: $vp-tlandscape) {
    display: none;
  }
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

.v-enter-active,
.v-leave-active {
  transition: all 0.1 ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
