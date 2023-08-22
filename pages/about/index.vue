<script lang="ts" setup>
definePageMeta({
  middleware: () => {
    if (window.innerWidth > 680) {
      return navigateTo("/about/place");
    }
  },
});
</script>
<template>
  <div class="bg">
    <div class="about__content">
      <div class="about__main">
        <div class="container">
          <RichHeading class="">основне</RichHeading>
          <ul class="about__links">
            <li class="about__link faq">
              <NuxtLink to="/about/faq">Найчастіші запитання</NuxtLink>
            </li>
            <li class="about__link place">
              <NuxtLink to="/about/place">Місце проведення</NuxtLink>
            </li>
            <li class="about__link gift">
              <NuxtLink to="/buy">Подарувати квиток</NuxtLink>
            </li>
            <li class="about__link residence">
              <NuxtLink to="/about/residence">Підбір житла</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="container">
        <div class="about__help">
          <RichHeading class="about__heading">допомога</RichHeading>
          <div class="about__help-item">
            <p>
              Найпростіший спосіб допомогти КОЕ - це пожертвувати нам гроші.
              Кожна отримана гривня йде на організацію.
            </p>
            <NuxtLink to="/donate" class="piggy">Задонатити</NuxtLink>
          </div>
          <div class="about__help-item">
            <p>
              Для допомоги, Ви також можете приєднатися до нашої команди. Пишіть
              poopdog69 в Discord.
            </p>
            <!-- TODO: where to -->
            <NuxtLink to="" class="heart">Написати</NuxtLink>
          </div>
          <div class="about__help-item">
            <p>Також, Ви можете купити необхідне для KOE</p>
            <!-- TODO: where to -->
            <NuxtLink to="" class="wallet">Детальніше</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background: url("@/assets/svg/mobile-bg-shape2.svg") top;
  background-color: $main-bgb;

  @media screen and (min-width: calc($vp-mobile + 10px)) {
    background: url("@/assets/svg/desktop-bg-shape1.svg") top;
    background-color: $main-bgb;
  }
}

.about__content {
  padding: 56px 0;

  @media screen and (min-width: $vp-mobile) {
    padding: 76px 0;
  }
}

.about__links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  margin: 28px 0 0 0;
  list-style: none;
}

.about__link {
  position: relative;
  margin-left: 24px;
  background-color: $white;

  &::before {
    content: "";
    position: absolute;
    right: calc(100% - 24px);
    top: 50%;
    width: 48px;
    height: 56px;
    transform: translateY(-50%);
  }

  &::after {
    content: "";
    position: absolute;
    left: calc(100% - 24px);
    top: 50%;
    width: 16px;
    height: 16px;
    transform: translateY(-50%);
    background: url("@/assets/svg/about-arrow-icon.svg") no-repeat center;
  }

  & > a {
    display: block;
    padding: 19px 34px;
    color: $darkd;
    font-family: "Mulish";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%; /* 17.6px */
  }
}

.faq {
  &::before {
    background: url("@/assets/svg/about-faq-icon.svg") center no-repeat;
  }
}

.place {
  &::before {
    background: url("@/assets/svg/about-place-icon.svg") center no-repeat;
  }
}

.gift {
  &::before {
    background: url("@/assets/svg/about-gift-icon.svg") center no-repeat;
  }
}

.residence {
  &::before {
    background: url("@/assets/svg/about-residence-icon.svg") center no-repeat;
  }
}

.about__help {
  margin-top: 56px;
}

.about__help-item {
  & > p {
    margin-left: 24px;
    padding: 12px 16px;
    background-color: $white;
    color: $darkd;
    font-family: "Mulish";
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 130%; /* 20.8px */
  }

  & > a {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 19px 0;
    margin: 8px 0 0 24px;
    background-color: $main-bg;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: $main;
    }

    &::before {
      content: "";
      position: absolute;
      right: calc(100% - 24px);
      top: 50%;
      width: 48px;
      height: 56px;
      transform: translateY(-50%);
    }
  }
}

.piggy {
  &::before {
    background: url("@/assets/svg/about-piggy-icon.svg") center no-repeat;
  }
}

.heart {
  &::before {
    background: url("@/assets/svg/about-heart-icon.svg") center no-repeat;
  }
}

.wallet {
  &::before {
    background: url("@/assets/svg/about-wallet-icon.svg") center no-repeat;
  }
}
</style>
