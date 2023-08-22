<script lang="ts" setup>
import Burger from "./Burger.vue";

const isDrop: Ref<boolean> = ref(false);
</script>

<template>
  <header class="header">
    <div class="container header-container">
      <div class="header__inner">
        <NuxtLink to="/"
          ><img class="logo" src="@/assets/svg/logo.svg" alt="logo"
        /></NuxtLink>
        <div class="header__inner-links-wrapper">
          <ul class="header__inner-links">
            <li class="header__inner-link">
              <NuxtLink to="/buy" class="header__inner-link"
                >Купити квиток</NuxtLink
              >
            </li>
            <li @mouseenter="isDrop = true" @mouseleave="isDrop = false">
              <NuxtLink to="/about" class="header__inner-link">
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
                <ClientOnly>
                  <ul class="dropdown" :class="{ 'dropdown-active': isDrop }">
                    <li>
                      <NuxtLink to="/about" class="header__inner-link"
                        >Найчастіші запитання</NuxtLink
                      >
                    </li>
                    <li>
                      <NuxtLink to="/about" class="header__inner-link"
                        >Місце проведення</NuxtLink
                      >
                    </li>
                    <li>
                      <NuxtLink to="/about" class="header__inner-link"
                        >Подарувати квиток</NuxtLink
                      >
                    </li>
                    <li>
                      <NuxtLink to="/about" class="header__inner-link"
                        >Підбір житла</NuxtLink
                      >
                    </li>
                    <li>
                      <NuxtLink to="/about" class="header__inner-link"
                        >Задонатити</NuxtLink
                      >
                    </li>
                    <li>
                      <NuxtLink to="/about" class="header__inner-link"
                        >Приєднатися до команди</NuxtLink
                      >
                    </li>
                    <li>
                      <NuxtLink to="/about" class="header__inner-link"
                        >Купити необхідне</NuxtLink
                      >
                    </li>
                  </ul>
                </ClientOnly>
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
              <NuxtLink to="/me" class="header__inner-link"
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
    transform: rotate(180deg) translateY(2px);
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
    padding: 12px 20px;
    background-color: $darkd;

    &:hover {
      background-color: $main;
    }

    & > a {
      &:hover {
        color: $white;
      }
    }
  }
}

.drop {
  & > svg {
    transform: rotate(0deg);
  }
}

.dropdown-active {
  pointer-events: all;
  opacity: 1;
}
</style>
