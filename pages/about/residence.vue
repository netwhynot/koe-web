<template>
  <div class="bg">
    <div class="residence-content">
      <div class="container">
        <RichHeading>Готелі</RichHeading>
      </div>
      <div class="container">
        <div class="cards">
          <div class="card">
            <img class="card__img" src="@/assets/img/hotel1.jpeg" alt="hotel" />
            <h5 class="card__heading">«Україна»</h5>
            <p class="card__text">
              Легендарний готель з багатим історичним фоном. Пропонує
              комфортабельні номери, ресторани з українською кухнею та
              близькість до вокзалів.
            </p>
          </div>
          <div class="card">
            <img class="card__img" src="@/assets/img/hotel2.jpeg" alt="hotel" />
            <h5 class="card__heading">«Прем'єр Палас»</h5>
            <p class="card__text">
              Розкішний готель зі сучасними номерами, ресторанами,
              конференц-залами та спа-центром. Розташований поруч з головними
              вокзалами.
            </p>
          </div>
          <div class="card">
            <img class="card__img" src="@/assets/img/hotel3.jpeg" alt="hotel" />
            <h5 class="card__heading">«ІнтерКонтиненталь»</h5>
            <p class="card__text">
              Величний готель з вражаючою архітектурою та видом на Дніпро.
            </p>
          </div>
        </div>
      </div>
      <div class="container residence-heading">
        <RichHeading>хостели</RichHeading>
      </div>
      <div class="container">
        <div class="cards">
          <div class="card">
            <img class="card__img" src="@/assets/img/hotel4.jpeg" alt="hotel" />
            <h5 class="card__heading">«Dream House»</h5>
            <p class="card__text">
              Затишний хостел з різноманітними спальними місцями та загальними
              зонами для відпочинку. Розташований поруч із центральними
              вокзалами, що робить його зручним вибором для мандрівників.
            </p>
          </div>
          <div class="card">
            <img class="card__img" src="@/assets/img/hotel5.jpeg" alt="hotel" />
            <h5 class="card__heading">«Gar'is Hostel»</h5>
            <p class="card__text">
              Сучасний хостел зі зручним розташуванням неподалік від вокзалу.
              Пропонує комфортабельні спальні, спільні приміщення та дружній
              атмосферу для молодіжних подорожей.
            </p>
          </div>
        </div>
      </div>
    </div>
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

.residence-content {
  padding: 56px 0;

  @media screen and (min-width: $vp-mobile) {
    padding: 76px 0;
  }

  @media screen and (min-width: $vp-tlandscape) {
    padding: 100px 0;
  }
}

.residence-heading {
  margin: 56px auto 28px;

  @media screen and (min-width: $vp-mobile) {
    margin: 76px auto 32px;
  }

  @media screen and (min-width: $vp-tlandscape) {
    margin: 150px auto 40px;
  }
}

.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-top: 32px;

  @media screen and (min-width: $vp-mobile) {
    gap: 28px;
    align-items: unset;
  }

  @media screen and (min-width: $vp-tablet) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }

  @media screen and (min-width: $vp-tlandscape) {
    gap: 20px;
  }

  @media screen and (min-width: $vp-desktop) {
    gap: 20px;
  }
}

.card {
  max-width: 280px;

  @media screen and (min-width: $vp-mobile) {
    max-width: 432px;
  }

  @media screen and (min-width: $vp-tablet) {
    max-width: 346px;
  }

  @media screen and (min-width: $vp-tlandscape) {
    max-width: 427px;
  }

  @media screen and (min-width: $vp-desktop) {
    width: 373px;
  }

  &__img {
    display: block;
    width: 280px;
    height: 188px;

    @media screen and (min-width: $vp-mobile) {
      width: 432px;
      height: 288px;
    }

    @media screen and (min-width: $vp-tablet) {
      width: 346px;
      height: 224px;
    }

    @media screen and (min-width: $vp-tlandscape) {
      width: 427px;
      height: 288px;
    }

    @media screen and (min-width: $vp-desktop) {
      width: 373px;
      height: 220px;
    }
  }

  &__heading {
    margin: 12px 0 0 0;
    color: $white;
    font-family: "Mulish";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%; /* 23.4px */

    @media screen and (min-width: $vp-mobile) {
      margin: 20px 0 0 0;
    }
  }

  &__text {
    margin: 2px 0 0 0;
    color: rgba($color: $secondary, $alpha: 0.8);
    font-family: Mulish;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 20.8px */

    @media screen and (min-width: $vp-mobile) {
      margin: 8px 0 0 0;
    }
  }
}
</style>
