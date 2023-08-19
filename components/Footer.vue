<script lang="ts" setup>
const width: Ref<number> = ref(0);

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
    <div class="footer__inner">
      <AdditionalLinks
        :axis="width < 480 ? 'vertical' : 'horizontal'"
      ></AdditionalLinks>
      <ul class="menu">
        <li class="menu__link">
          <NuxtLink to="/">Головна</NuxtLink>
        </li>
        <li class="menu__link">
          <NuxtLink to="/tourney">Про Турнір</NuxtLink>
        </li>
        <li class="menu__link">
          <NuxtLink to="/buy">Купити квиток</NuxtLink>
        </li>
        <li class="menu__link">
          <NuxtLink to="/staff">Організатори</NuxtLink>
        </li>
        <li class="menu__link">
          <NuxtLink to="/donate">Задонатити</NuxtLink>
        </li>
        <li class="menu__link">
          <NuxtLink to="/me">Мій профіль</NuxtLink>
        </li>
        <li class="menu__link">
          <NuxtLink to="/about">Інформація</NuxtLink>
        </li>
      </ul>
    </div>
    <span class="copyright">&copy; 2023 Kyiv Osu Event</span>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  padding: 32px 20px 16px 20px;
  background-color: $darkd;

  @media screen and (min-width: $vp-mobile) {
    padding: 60px 24px 20px 24px;
  }

  &__inner {
    display: flex;
    justify-content: space-between;
    gap: 43px;
    margin-bottom: 32px;
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
}
</style>
