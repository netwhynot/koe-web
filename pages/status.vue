<script lang="ts" setup></script>

<template>
  <div class="bg">
    <div class="container">
      <div class="content">
        <img
          class="content__img"
          src="@/assets/svg/success-icon.svg"
          alt="success"
        />
        <p class="content__text">
          Квиток було успішно придбано. Ви можете перевірити це в своєму профілі
        </p>
        <NuxtLink class="content__link">перевірити</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background: url("@/assets/svg/mobile-bg-shape2.svg") no-repeat center;
  background-color: $main-bg;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 127px 0 172px;

  &__img {
    display: block;
  }

  &__text {
  }

  &__link {
  }
}
</style>
