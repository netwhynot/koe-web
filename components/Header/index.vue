<script lang="ts" setup>
import Burger from "./Burger.vue";
import { useUserStore } from "@/stores/user";

const isDrop: Ref<boolean> = ref(false);
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
  <Transition>
    <Modal v-if="modalIsActive" color="#ff8fc1" @close="modalIsActive = false">
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
  <header class="header">
    <div class="container header-container">
      <div class="header__inner">
        <NuxtLink to="/"
          ><img class="logo" src="@/assets/svg/logo.svg" alt="logo"
        /></NuxtLink>
        <div class="header__inner-links-wrapper">
          <ul class="header__inner-links">
            <li class="header__inner-link">
              <NuxtLink
                to="/buy"
                class="header__inner-link"
                @click="!userStore.isLoggedIn ? openModal() : ''"
                >Купити квиток</NuxtLink
              >
            </li>
            <li @mouseenter="isDrop = true" @mouseleave="isDrop = false">
              <NuxtLink class="header__inner-link">
                Інфомація
                <span class="link-icon" :class="{ drop: isDrop }">
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6.29289 6.29289C6.68342 6.68342 7.31658 6.68342 7.70711 6.29289L10.25 3.75L13 1"
                      stroke="white"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
                <ul class="dropdown" :class="{ 'dropdown-active': isDrop }">
                  <li>
                    <NuxtLink to="/about/faq" class="header__inner-link"
                      >Найчастіші запитання</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink to="/about/place" class="header__inner-link"
                      >Місце проведення</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink to="/buy" class="header__inner-link"
                      >Подарувати квиток</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink to="/about/residence" class="header__inner-link"
                      >Підбір житла</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink to="/donate" class="header__inner-link"
                      >Задонатити</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink to="/about/join" class="header__inner-link"
                      >Приєднатися до команди</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      target="_blank"
                      to="https://docs.google.com/spreadsheets/d/1EzmJlbQK_scRQNI_sOgXHoUgeFQtmofckr9P_Y2vz18/edit#gid=0"
                      class="header__inner-link"
                      >Купити необхідне</NuxtLink
                    >
                  </li>
                </ul>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tourney" class="header__inner-link"
                >Про турнір</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/donate" class="header__inner-link"
                >Задонатити</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/staff" class="header__inner-link"
                >Організатори</NuxtLink
              >
            </li>
            <li>
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
          </ul>
        </div>
        <Burger></Burger>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 5;
  background-color: $darkd;
}

.header-container {
  padding: 0;
  @media screen and (min-width: $vp-mobile) {
    max-width: unset;
  }

  @media screen and (min-width: $vp-tablet) {
    max-width: unset;
  }

  @media screen and (min-width: $vp-tlandscape) {
    max-width: 875px;
  }

  @media screen and (min-width: $vp-tlandscape) {
    max-width: 1160px;
  }
}

.header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  padding: 12px 20px;

  @media screen and (min-width: $vp-mobile) {
    padding: 20px 24px;
    height: 60px;
  }

  @media screen and (min-width: $vp-tlandscape) {
    height: 49px;
  }

  .logo {
    width: 83px;
    height: 44px;
  }

  &-links-wrapper {
    @media screen and (max-width: $vp-tlandscape) {
      display: none;
    }
  }

  &-links {
    display: flex;
    align-items: center;
    gap: 40px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &-link {
    position: relative;
    color: $white;
    font-family: "Mulish";
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 130%; /* 20.8px */
    white-space: nowrap;
    transition: color 0.3s ease;

    &:hover {
      color: $main;
    }
  }
}

.link-icon {
  display: inline-block;
  width: 14px;
  height: 8px;
  margin-left: 10px;

  & > svg {
    transform: rotate(0deg);
    transition: transform 0.2s ease;
  }
}

.dropdown {
  position: absolute;
  display: block;
  top: calc(100%);
  left: -20px;
  padding: 0;
  padding-top: 20px;
  margin: 0;
  opacity: 0;
  pointer-events: none;
  list-style: none;
  // transition: all 0.3s ease;

  & > li {
    background-color: $darkd;

    &:hover {
      background-color: $main;
    }

    & > a {
      display: block;
      padding: 12px 20px;
      &:hover {
        color: $white;
      }
    }
  }
}

.drop {
  & > svg {
    transform: rotate(180deg);
  }
}

.dropdown-active {
  pointer-events: all;
  opacity: 1;
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
