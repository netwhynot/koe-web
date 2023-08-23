<script lang="ts" setup>
import Desktop from "@/components/Footer/Desktop.vue";
import { useUserStore } from "@/stores/user";
const width: Ref<number> = ref(0);
const modalIsActive = ref(false);
const userStore = useUserStore();

const openModal = () => {
  if (!userStore.isLoggedIn) {
    modalIsActive.value = !modalIsActive.value;
  }
};

const changeAxis = () => {
  width.value = window.innerWidth;
};

onMounted(() => {
  width.value = window.innerWidth;
  window.addEventListener("resize", changeAxis);
});

onUnmounted(() => {
  window.removeEventListener("resize", changeAxis);
});
</script>

<template>
  <footer class="footer">
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
    <div class="footer-container container">
      <div class="footer__inner">
        <Desktop></Desktop>
        <div>
          <AdditionalLinks :axis="width < 480 ? 'vertical' : 'horizontal'" />
          <span v-if="width > 1024" class="copyright"
            >&copy; 2023 Kyiv Osu Event</span
          >
        </div>
        <ul class="menu">
          <li class="menu__link">
            <NuxtLink to="/">Головна</NuxtLink>
          </li>
          <li class="menu__link">
            <NuxtLink to="/tourney">Про Турнір</NuxtLink>
          </li>
          <li class="menu__link">
            <NuxtLink
              to="/buy"
              @click="!userStore.isLoggedIn ? openModal() : ''"
              >Купити квиток</NuxtLink
            >
          </li>
          <li class="menu__link">
            <NuxtLink to="/staff">Організатори</NuxtLink>
          </li>
          <li class="menu__link">
            <NuxtLink to="/donate">Задонатити</NuxtLink>
          </li>
          <li class="menu__link">
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
          <li class="menu__link">
            <NuxtLink to="/about">Інформація</NuxtLink>
          </li>
        </ul>
      </div>
      <span class="copyright" :class="{ remove: width > 1024 }"
        >&copy; 2023 Kyiv Osu Event</span
      >
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  padding: 32px 0 16px;
  background-color: $darkd;

  @media screen and (min-width: $vp-mobile) {
    padding: 60px 0 20px;
  }

  @media screen and (min-width: $vp-laptop) {
    padding: 40px 24px;
  }

  .footer-container {
    @media screen and (min-width: $vp-mobile) {
      max-width: unset;
    }

    @media screen and (min-width: $vp-tablet) {
      max-width: unset;
    }

    @media screen and (min-width: $vp-tlandscape) {
      padding: 0 24px;
      max-width: 1160px;
    }
  }

  &__inner {
    display: flex;
    justify-content: space-between;
    gap: 43px;
    margin-bottom: 32px;

    @media screen and (min-width: $vp-laptop) {
      margin-bottom: unset;
    }
  }
}

.menu {
  display: grid;
  grid-template-columns: 82px 82px;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media screen and (min-width: $vp-mobile) {
    grid-template-columns: 96px 96px;
    gap: 30px;
  }

  @media screen and (min-width: $vp-tlandscape) {
    display: none;
  }

  &__link > a {
    color: $secondary;
    font-family: "Mulish";
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    white-space: nowrap;

    @media screen and (min-width: $vp-mobile) {
      font-size: 14px;
    }
  }
}

.copyright {
  color: $secondary;
  font-family: "Mulish";
  // size is 10 in design but i raised it to 12 for accessibility score
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  @media screen and (min-width: $vp-laptop) {
    font-size: 16px;
  }
}

.remove {
  @media screen and (min-width: $vp-tablet) {
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
