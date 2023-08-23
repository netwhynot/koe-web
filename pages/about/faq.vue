<script lang="ts" setup></script>

<template>
  <div class="bg">
    <div class="faq-content">
      <div class="container">
        <RichHeading class="faq__heading">Найчастіші запитання</RichHeading>
      </div>
      <div class="container faq__accordion-wrapper">
        <Accordion heading="Що очікувати від івенту?">
          На івенті ви можете побачити як в лайві топ-тир гравці Української
          осу-арени б'ються за перше місце на турнірі KOET (Kyiv Osu Event
          Tournament) з унікальним форматом і унікальним додатковим
          грандфіналом, інтерактиви, інтерв'ю з топ-тир гравцями, челленджи.
          Сподівамося що вам це сподобається :)
        </Accordion>
        <Accordion heading="Хочу допомогти зі зборами!">
          Якщо ви хочете допомогти нам покращити івент, і підтримати
          організаторів копієчкою, ви можете задонатити нам на банку по кнопці
          "Задонатити" на верхній частині сайту!
        </Accordion>
        <Accordion heading="Кількість місць?">
          Попередньо буде 20 місць, якщо щось буде змінюватись, я вас так само
          попереджу про це.
        </Accordion>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background: url("@/assets/svg/mobile-bg-shape1.svg") no-repeat top;
  background-color: $dark;

  @media screen and (min-width: calc($vp-mobile + 10px)) {
    background: url("@/assets/svg/desktop-bg-shape1.svg") no-repeat top;
    background-color: $dark;
  }

  height: 75vh;
}

.faq-content {
  padding: 56px 0;

  @media screen and (min-width: $vp-mobile) {
    padding: 76px 0;
  }

  @media screen and (min-width: $vp-tlandscape) {
    padding: 100px 0;
  }
}

.faq__accordion-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
}
</style>
