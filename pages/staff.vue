<script lang="ts" setup></script>

<template>
  <div class="bg">
    <div class="staff__content">
      <div class="container">
        <RichHeading>організатори</RichHeading>
      </div>
      <div class="container">
        <div class="staff__members">
          <div class="member">
            <h5>Holast</h5>
            <p>Розробка веб-сайту, створення дизайну веб-сайту</p>
          </div>
          <div class="member right">
            <h5>alowave23</h5>
            <p>
              Дизайн оверлею, онлайн-таблиця лідерів, проведення трансляцій,
              дизайн стікерів, організація турніру
            </p>
          </div>
          <div class="member">
            <h5>netwhynot</h5>
            <p>Верстка</p>
          </div>
          <div class="member right">
            <h5>Holast</h5>
            <p>Розробка веб-сайту, створення дизайну веб-сайту</p>
          </div>
          <div class="member">
            <h5>Holast</h5>
            <p>Розробка веб-сайту, створення дизайну веб-сайту</p>
          </div>
          <div class="member right">
            <h5>alowave23</h5>
            <p>
              Дизайн оверлею, онлайн-таблиця лідерів, проведення трансляцій,
              дизайн стікерів, організація турніру
            </p>
          </div>
          <div class="member">
            <h5>netwhynot</h5>
            <p>Верстка</p>
          </div>
          <div class="member right">
            <h5>Holast</h5>
            <p>Розробка веб-сайту, створення дизайну веб-сайту</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background: url("@/assets/svg/mobile-bg-shape3.svg") no-repeat top;
  background-color: $darkd;

  @media screen and (min-width: calc($vp-mobile + 10px)) {
    background: url("@/assets/svg/desktop-bg-shape2.svg") no-repeat top;
    background-color: $darkd;
  }
}

.staff__content {
  padding: 56px 0;

  @media screen and (min-width: $vp-mobile) {
    padding: 76px 0;
  }

  @media screen and (min-width: $vp-tlandscape) {
    padding: 100px 0 200px 0;
  }
}

.staff__members {
  display: flex;
  flex-direction: column;
  margin-top: 28px;
  gap: 16px;

  @media screen and (min-width: $vp-mobile) {
    margin-top: 34px;
    gap: 22px;
  }

  @media screen and (min-width: $vp-tlandscape) {
    display: grid;
    justify-content: center;
    grid-template-columns: 422px 422px;
    margin-top: 42px;
    gap: 18px;
  }
}

.member {
  position: relative;
  padding: 12px 20px;
  background-color: #111;

  @media screen and (min-width: $vp-mobile) {
    min-height: 72px;
    margin-left: 48px;
    padding: 12px 20px 12px 60px;

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: calc(100% - 48px);
      width: 96px;
      height: 96px;
      background: url("@/assets/img/avatar.jpg") no-repeat center;
      background-size: cover;

      @include rounded-hex($rotated: true);
    }
  }

  & > h5 {
    margin: 0;
    color: $white;
    font-family: "Mulish";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%; /* 23.4px */
  }

  & > p {
    margin: 10px 0 0 0;
    color: rgba($color: $secondary, $alpha: 0.8);
    font-family: "Mulish";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 20.8px */
  }
}

.right {
  @media screen and (min-width: $vp-mobile) {
    min-height: 72px;
    margin-left: unset;
    margin-right: 48px;
    padding: 12px 60px 12px 20px;

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: calc(100% - 48px);
      width: 96px;
      height: 96px;
      background: url("@/assets/img/avatar.jpg") no-repeat center;
      background-size: cover;

      @include rounded-hex($rotated: true);
    }
  }

  @media screen and (min-width: $vp-tlandscape) {
    min-height: 72px;
    margin-left: 48px;
    margin-right: unset;
    padding: 12px 20px 12px 60px;

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: calc(100% - 48px);
      left: unset;
      width: 96px;
      height: 96px;
      background: url("@/assets/img/avatar.jpg") no-repeat center;
      background-size: cover;

      @include rounded-hex($rotated: true);
    }
  }
}
</style>
