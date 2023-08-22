<template>
  <div class="bg">
    <div class="place__content">
      <div class="mob-map">
        <Accordion
          class="map-accordion"
          :white="true"
          heading="вул. Жилянська, 97Б"
          :is-map="true"
        >
        </Accordion>
      </div>
      <div class="container">
        <div class="place__text">
          <RichHeading>Як потрапити всередину?</RichHeading>
          <p>
            Будинок знаходиться відразу за торгівельним центром «Україна».
            Неподалік від входу видно вивіску «Signal Event Hall ». Праворуч від
            стоматології знаходяться ковані ворота, Через палісадник, доріжкою
            до парадного входу під жовтим навісом. Коридором (галерея) на 3-й
            поверх.
          </p>
        </div>
      </div>
      <div class="container">
        <div class="desktop-map">
          <Accordion
            class="map-accordion"
            :white="true"
            heading="вул. Жилянська, 97Б"
            :is-map="true"
          >
          </Accordion>
        </div>
      </div>
      <div class="mob-pictures">
        <img class="mob-pic" src="@/assets/img/place1.jpeg" alt="event hall" />
        <img class="mob-pic" src="@/assets/img/place2.jpeg" alt="event hall" />
        <img class="mob-pic" src="@/assets/img/place3.jpeg" alt="event hall" />
        <img class="mob-pic" src="@/assets/img/place4.jpeg" alt="event hall" />
      </div>
      <div class="container">
        <div class="desktop-pictures first">
          <img
            class="desk-pic"
            src="@/assets/img/place1.jpeg"
            alt="event hall"
          />
          <img
            class="desk-pic"
            src="@/assets/img/place2.jpeg"
            alt="event hall"
          />
        </div>
        <div class="desktop-pictures second">
          <img
            class="desktop-pic"
            src="@/assets/img/place3.jpeg"
            alt="event hall"
          />
          <img
            class="desktop-pic"
            src="@/assets/img/place4.jpeg"
            alt="event hall"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background: url("@/assets/svg/mobile-bg-shape3.svg") no-repeat top;
  background-color: $dark;

  @media screen and (min-width: calc($vp-mobile + 10px)) {
    background: url("@/assets/svg/desktop-bg-shape2.svg") no-repeat top;
    background-color: $dark;
  }
}

.place__content {
  padding: 56px 0 0 0;

  @media screen and (min-width: $vp-mobile) {
    padding: 76px 0 0 0;
  }

  @media screen and (min-width: $vp-tablet) {
    padding: 76px 0;
  }

  @media screen and (min-width: $vp-tlandscape) {
    padding: 100px 0 200px 0;
  }
}

.mob-map {
  @media screen and (min-width: $vp-tablet) {
    display: none;
  }
}

.map-accordion {
  position: relative;
  background-color: #111;
  // padding-left: 36px;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 11px;
    right: calc(100% - 40px);
    width: 24px;
    height: 24px;
    background: url("@/assets/svg/location-icon.svg") no-repeat center;
    background-size: cover;

    @media screen and (min-width: $vp-mobile) {
      width: 32px;
      height: 32px;
    }
  }
}

.place__text {
  margin: 56px 0;

  @media screen and (min-width: $vp-mobile) {
    margin: 76px 0;
  }

  @media screen and (min-width: $vp-tablet) {
    margin: 0 0 76px 0;
  }

  & > p {
    color: rgba($color: $secondary, $alpha: 0.8);
    font-family: "Mulish";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 20.8px */

    @media screen and (min-width: $vp-mobile) {
      font-size: 16px;
    }

    @media screen and (min-width: $vp-tlandscape) {
      font-size: 18px;
    }
  }
}

.desktop-map {
  @media screen and (max-width: calc($vp-tablet - 1px)) {
    display: none;
  }
}

.mob-pictures {
  display: flex;
  flex-direction: column;
  gap: 0;

  @media screen and (min-width: $vp-tablet) {
    display: none;
  }
}

.desktop-pictures {
  @media screen and (min-width: $vp-mobile) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media screen and (max-width: calc($vp-tablet - 1px)) {
    display: none;
  }

  @media screen and (min-width: $vp-tlandscape) {
    display: grid;
    grid-template-rows: 426px;
    overflow: hidden;
    gap: 20px;
  }
}

.first {
  margin-top: 20px;
  grid-template-columns: 437.5px 437.5px;
  grid-template-rows: 326px;

  @media screen and (min-width: $vp-desktop) {
    grid-template-columns: 660px 480px;
    grid-template-rows: 426px;
  }
}

.second {
  margin-top: 20px;
  grid-template-columns: 437.5px 437.5px;
  grid-template-rows: 326px;

  @media screen and (min-width: $vp-desktop) {
    grid-template-columns: 480px 660px;
    grid-template-rows: 426px;
  }
}

.desk-pic:nth-child(1) {
  @media screen and (min-width: $vp-tlandscape) {
    width: 437px;
    height: 326px;
  }

  @media screen and (min-width: $vp-desktop) {
    width: 660px;
    height: 426px;
  }
}

.desk-pic:nth-child(2) {
  @media screen and (min-width: $vp-tlandscape) {
    width: 437px;
    height: 326px;
  }

  @media screen and (min-width: $vp-desktop) {
    width: 480px;
    height: 426px;
  }
}

.desktop-pic:nth-child(1) {
  @media screen and (min-width: $vp-tlandscape) {
    width: 437px;
    height: 326px;
  }

  @media screen and (min-width: $vp-desktop) {
    width: 480px;
    height: 426px;
  }
}

.desktop-pic:nth-child(2) {
  @media screen and (min-width: $vp-tlandscape) {
    width: 437px;
    height: 326px;
  }

  @media screen and (min-width: $vp-desktop) {
    width: 660px;
    height: 426px;
  }
}
</style>
