<script lang="ts" setup>
const width: Ref<number> = ref(320);

definePageMeta({
  middleware: ["from-callback"],
});

const changeWidth = () => {
  width.value = window.innerWidth;
};

onMounted(() => {
  width.value = window.innerWidth;
  window.addEventListener("resize", changeWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", changeWidth);
});
</script>

<template>
  <div class="bg">
    <div class="container">
      <div class="hero">
        <h1 class="hero__heading">
          <span>Kyiv</span>
          osu event
        </h1>
        <div class="place">
          <h2 class="place__text">26.08.2023 / Signal Event Hall</h2>
          <span class="place__text">11:00</span>
        </div>
      </div>
    </div>
    <div class="container buttons-wrapper" :class="{ display: width >= 480 }">
      <NuxtLink to="/buy" class="button pink">купити квиток</NuxtLink>
      <NuxtLink to="/donate" class="button black">Задонатити</NuxtLink>
    </div>
    <div class="time-left-bg">
      <div class="container time-left">
        <p class="time-left__text">Кінець продажу:</p>
        <vue-countdown
          v-slot="{ days, hours, minutes, seconds }"
          class="time-left__text"
          :time="
            new Date(2023, 7, 25, 24, 0, 0).getTime() - new Date().getTime()
          "
        >
          {{ days }} дні, {{ hours }} годин, {{ minutes }} хвилин,
          {{ seconds }} секунд
        </vue-countdown>
      </div>
    </div>
    <div class="container buttons-wrapper" :class="{ display: width < 480 }">
      <NuxtLink to="/buy" class="button pink">купити квиток</NuxtLink>
      <NuxtLink to="/donate" class="button black">Задонатити</NuxtLink>
    </div>
    <div class="info">
      <div class="container">
        <div class="list">
          <div class="list__item">
            <HomeInfoIcon side="right"></HomeInfoIcon>
            <div>
              <h3 class="info__heading">Гранд-фінал</h3>
              <p class="info__text">
                Відчуйте адреналін турніру, де справжні майстри змагатимуться за
                звання переможця першого ЛАН турніру в Україні! Спостерігайте за
                захоплюючими батлами та відчуйте емоції гравців вживу.
              </p>
            </div>
          </div>
          <div class="list__item">
            <HomeInfoIcon side="left"></HomeInfoIcon>
            <div>
              <h3 class="info__heading">Ультимативна вікторина</h3>
              <p class="info__text">
                Турнір перевірить скіл гри наших фіналістів, а вікторина
                випробує саме знання про гру та її історію. В ній будуть
                поєднані завдання про загальну та нашу спільноту гри в багатьох
                різних форматах, призом в якій буде ультимативний приз.
              </p>
            </div>
          </div>
          <div class="list__item">
            <HomeInfoIcon side="right"></HomeInfoIcon>
            <div>
              <h3 class="info__heading">Селфі зона та дошка пам’яті</h3>
              <p class="info__text">
                Вас чекатиме наша селфі зона, де ви зможете створити яскраві
                спогади та дошка, на якій ви зможете лишити свій підпис або
                зробити карикатурки, цим самим залишаючи свій неповторний слід
                на нашому івенті.
              </p>
            </div>
          </div>
          <div class="list__item">
            <HomeInfoIcon side="left"></HomeInfoIcon>
            <div>
              <h3 class="info__heading">Інтерв’ю та Q&A</h3>
              <p class="info__text">
                Найкращі гравці України розповідатимуть про секрети свого успіху
                та шлях до вершин, якщо у вас будуть якісь цікаві запитання до
                них - вони не залишаться непочутими!
              </p>
            </div>
          </div>
          <div class="list__item">
            <HomeInfoIcon side="right"></HomeInfoIcon>
            <div>
              <h3 class="info__heading">Ігри на Nintendo</h3>
              <p class="info__text">
                Візьміть участь в різних іграх на Nintendo Switch, де зможуть
                грати 2-4 гості водночас, вибір ігр не дасть вам засумувати.
              </p>
            </div>
          </div>
          <div class="list__item">
            <HomeInfoIcon side="left" :disable-line="true"></HomeInfoIcon>
            <div>
              <h3 class="info__heading">OSU! чейленджі</h3>
              <p class="info__text">
                Якщо ви впевнені в своїх силах або просто хочете спробувати, для
                вас буде підготовано колесо фортуниі, де випадатимуть чейленджі
                для гри з різними модифікаціями, за виконання якого ви отримаєте
                невеличку винагороду.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  position: relative;
  z-index: 0;
  background: url("@/assets/svg/mobile-bg-shape1.svg") no-repeat center top;
  background-color: $dark;

  @media screen and (min-width: calc($vp-mobile + 10px)) {
    background: url("@/assets/svg/desktop-bg-shape1.svg") no-repeat center top;
    background-color: $dark;
  }
}

.hero {
  padding: 56px 0;

  @media screen and (min-width: $vp-mobile) {
    padding: 140px 0 76px 0;
  }

  &__heading {
    max-width: 360px;
    margin: 0 auto;
    color: $white;
    font-family: "Furore";
    font-size: 64px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: 6.4px;
    text-transform: uppercase;

    @media screen and (min-width: $vp-mobile) {
      font-size: 96px;
      letter-spacing: 9.6px;
    }

    @media screen and (min-width: $vp-tablet) {
      max-width: 760px;
      text-align: center;
      font-size: 96px;
      letter-spacing: 9.6px;
    }

    & > span {
      color: $main-bg;
    }
  }
}

.place {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media screen and (min-width: $vp-mobile) {
    margin-top: 40px;
  }

  @media screen and (min-width: $vp-tablet) {
    margin: 40px auto 0;
    max-width: 440px;
  }

  &__text {
    margin: 0;
    color: $white;
    font-family: "Mulish";
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 19.5px */

    @media screen and (min-width: $vp-mobile) {
      font-size: 16px;
    }
  }
}

.display {
  display: flex !important;
}

.buttons-wrapper {
  display: none;
  margin-top: 20px;
  flex-direction: column;
  gap: 8px;

  @media screen and (min-width: $vp-mobile) {
    flex-direction: row;
    justify-content: center;
    gap: 12px;
    margin-bottom: 20px;
    margin-top: 0;
  }

  .button {
    color: $white;
    text-align: center;
    font-family: "Furore";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.4px;
    white-space: nowrap;
  }

  .pink {
    padding: 14px 68.5px;
    background-color: $main;

    @media screen and (min-width: $vp-mobile) {
      padding: 14px 33.5px;
    }
  }

  .black {
    padding: 14px 83.5px;
    background-color: $darkdd;

    @media screen and (min-width: $vp-mobile) {
      padding: 14px 48.5px;
    }
  }
}

.time-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;

  @media screen and (min-width: $vp-desktop) {
    padding: 20px 200px;
  }

  &__text {
    display: inline;
    margin: 0;
    // alpha is 0.5 in design but i raised it to 0.8 for accessibility score
    color: rgba($color: $secondary, $alpha: 0.8);
    font-family: "Mulish";
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 19.5px */

    @media screen and (min-width: $vp-mobile) {
      font-size: 16px;
    }

    @media screen and (min-width: $vp-tablet) {
      font-size: 20px;
    }
  }

  & > span {
    font-size: 18px;

    @media screen and (min-width: $vp-mobile) {
      font-size: 20px;
    }

    @media screen and (min-width: $vp-tablet) {
      font-size: 24px;
    }
  }

  &-bg {
    background-color: $darkd;
  }
}

.info {
  padding: 56px 0;

  @media screen and (min-width: $vp-mobile) {
    padding: 100px 0;
  }

  @media screen and (min-width: $vp-tablet) {
    padding: 150px 0;
  }

  &__heading {
    color: $white;
    font-family: "Mulish";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%; /* 23.4px */

    @media screen and (min-width: $vp-tablet) {
      font-size: 24px;
    }
  }

  &__text {
    color: rgba($color: $secondary, $alpha: 0.8);
    font-family: "Mulish";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 20.8px */

    @media screen and (min-width: $vp-mobile) {
      max-width: 340px;
    }

    @media screen and (min-width: $vp-tablet) {
      max-width: 570px;
      font-size: 20px;
    }

    @media screen and (min-width: $vp-tlandscape) {
      max-width: 720px;
      // font-size: 20px;
    }
  }
}

.list {
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (min-width: $vp-mobile) {
    &__item {
      display: flex;
      align-items: center;
    }
  }

  &__item {
    @media screen and (min-width: $vp-mobile) {
      justify-content: center;
      gap: 16px;
    }

    @media screen and (min-width: $vp-tablet) {
      justify-content: center;
      gap: 32px;
    }

    @media screen and (min-width: $vp-desktop) {
      justify-content: center;
      gap: 52px;
    }
  }
}
</style>
