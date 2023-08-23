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
            <h5>alowave</h5>
            <p>
              Автор ідеї заходу, розробка веб-сайту, проведення трансляцій,
              організація турніру, все що ви бачите.
            </p>
          </div>
          <div class="member right">
            <h5>Kryterion</h5>
            <p>Організатор заходу, організація турніру, маппулінг турніру.</p>
          </div>
          <div class="member right">
            <h5>netwhynot</h5>
            <p>Розробка веб-сайту, верстка.</p>
          </div>
          <div class="member">
            <h5>twqnxx</h5>
            <p>
              Створення дизайну веб-сайту, створення дизайну оверлею трансляцій.
            </p>
          </div>
          <div class="member">
            <h5>NN4</h5>
            <p>Ведучий, допомога в організації заходу, маппулінг турніру.</p>
          </div>
          <div class="member">
            <h5>artem11s</h5>
            <p>
              Допомога у створенні дизайну веб-сайту та оверлею трансляцій,
              графічний дизайн.
            </p>
          </div>
          <div class="member">
            <h5>Bullet4fun</h5>
            <p>
              Google Spreadsheets mastermind, допомога в організації та
              проведенні турніру.
            </p>
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

      @include rounded-hex($rotated: true);
    }
  }

  &:nth-child(1) {
    &::before {
      background: url("https://a.ppy.sh/34106500?1691676191.jpeg") no-repeat
        center;
      background-size: cover;
    }
  }

  &:nth-child(2) {
    &::before {
      background: url("https://a.ppy.sh/9920144?1691676191.jpeg") no-repeat
        center;
      background-size: cover;
    }
  }

  &:nth-child(4) {
    &::before {
      background: url("https://a.ppy.sh/28856490?1691676191.jpeg") no-repeat
        center;
      background-size: cover;
    }
  }

  &:nth-child(3) {
    &::before {
      background: url("https://a.ppy.sh/11794209?1691676191.jpeg") no-repeat
        center;
      background-size: cover;
    }
  }

  &:nth-child(5) {
    &::before {
      background: url("https://a.ppy.sh/9819240?1691676191.jpeg") no-repeat
        center;
      background-size: cover;
    }
  }

  &:nth-child(6) {
    &::before {
      background: url("https://a.ppy.sh/17672006?1691676191.jpeg") no-repeat
        center;
      background-size: cover;
    }
  }

  &:nth-child(7) {
    &::before {
      background: url("https://a.ppy.sh/10113201?1691676191.jpeg") no-repeat
        center;
      background-size: cover;
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
