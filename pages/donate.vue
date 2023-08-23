<template>
  <div class="bg">
    <!-- <div class="container"> -->
    <div class="donate__content">
      <RichHeading :two-side="true">Донат</RichHeading>
      <p>
        Найпростіший спосіб допомогти КОЕ - це пожертвувати нам гроші. Кожна
        отримана гривня йде на покращення заходу.
      </p>
      <!-- TODO: link banka -->
      <NuxtLink target="_blank" to="https://send.monobank.ua/jar/556LBrEDDs"
        >Задонатити</NuxtLink
      >
    </div>
    <!-- </div> -->
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background: url("@/assets/svg/mobile-bg-shape2.svg") top;
  background-color: $dark;

  @media screen and (min-width: calc($vp-mobile + 10px)) {
    background: url("@/assets/svg/desktop-bg-shape1.svg") top;
    background-color: $dark;
  }
}

.donate__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  padding: 56px 24px;
  gap: 20px;

  @media screen and (min-width: $vp-mobile) {
    padding: 76px 24px;
  }

  @media screen and (min-width: $vp-tlandscape) {
    padding: 100px 24px;
  }

  & > p {
    max-width: $vp-tlandscape;
    text-align: center;
    font-family: "Mulish";
    font-size: 26px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 23.4px */
    color: rgba($color: $secondary, $alpha: 1);
  }

  & > a {
    padding: 14px 40px;
    text-align: center;
    font-family: "Furore";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.4px;
    background-color: $main;
    color: $white;
  }
}
</style>
