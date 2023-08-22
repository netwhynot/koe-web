<script lang="ts" setup>
const step: Ref<number> = ref(1);
const selectedGift: Ref<number> = ref(0);
const selectedTicket: Ref<number> = ref(0);
// const isValid: Ref<boolean> = ref(false);

enum Tickets {
  Basic = 1,
  VIP = 2,
  Gift = 3,
}

onUpdated(() => {});
</script>

<template>
  <div>
    <div v-if="step !== 3" class="bg">
      <div :class="{ 'heading-wrapper': step === 2 }">
        <div class="container">
          <h3 v-if="step === 1" class="heading">Оберіть тип квитка</h3>
          <div v-if="step === 2" class="payment-wrapper">
            <p>Всього до оплати:</p>
            <span>1200 ₴</span>
          </div>
        </div>
      </div>
      <Stepper v-if="step === 1">
        <div class="tickets">
          <div class="container">
            <div class="tickets__inner">
              <div
                class="ticket"
                :class="
                  selectedTicket === Tickets.Basic
                    ? 'selected'
                    : selectedTicket !== 0
                    ? 'overlay'
                    : ''
                "
                @click="selectedTicket = Tickets.Basic"
              >
                <div class="ticket__header basic-bg">
                  <span class="ticket__type-wrapper basic">
                    <h4 class="ticket__type">Basic</h4>
                  </span>
                  <span class="ticket__price">750 ₴</span>
                </div>
                <ul class="info">
                  <li class="info__item basic-pseudo">
                    загальний доступ до заходу
                  </li>
                  <li class="info__item basic-pseudo">
                    звичайна черга на місце за комп’ютером
                  </li>
                  <li class="info__item basic-pseudo">
                    можливість виграти унікальну атрибутику Kyiv OSU! Event
                  </li>
                </ul>
              </div>
              <div
                class="ticket"
                :class="
                  selectedTicket === Tickets.VIP
                    ? 'selected'
                    : selectedTicket !== 0
                    ? 'overlay'
                    : ''
                "
                @click="selectedTicket = Tickets.VIP"
              >
                <div class="ticket__header vip-bg">
                  <span class="ticket__type-wrapper vip">
                    <h4 class="ticket__type vip-lines">VIP</h4>
                  </span>
                  <span class="ticket__price">950 ₴</span>
                </div>
                <ul class="info">
                  <li class="info__item vip-pseudo">
                    приорітетна черга на місце за комп’ютером після турніру
                  </li>
                  <li class="info__item vip-pseudo">
                    прийняти участь в ігрових челленджах одним із перших
                  </li>
                  <li class="info__item vip-pseudo">
                    можливість під час інтерв’ю з топ-гравцями вийти на сцену і
                    задати свої запитання
                  </li>
                  <li class="info__item vip-pseudo">
                    унікальна атрибутика заходу Kyiv OSU! Event
                  </li>
                </ul>
              </div>
              <h3 v-if="step === 1" class="heading remove">
                Подарувати квиток
              </h3>
              <div
                class="gift"
                :class="
                  selectedTicket === Tickets.Gift
                    ? 'selected'
                    : selectedTicket !== 0
                    ? 'overlay'
                    : ''
                "
                @click="selectedTicket = Tickets.Gift"
              >
                <form class="form" @submit.prevent>
                  <label>
                    <input
                      v-model="selectedGift"
                      class="radio"
                      type="radio"
                      :value="Tickets.Basic"
                      name="radio"
                      :disabled="selectedTicket !== 3"
                    />
                    <span class="radio-circle"></span>
                    basic
                  </label>
                  <label>
                    <input
                      v-model="selectedGift"
                      class="radio"
                      type="radio"
                      :value="Tickets.VIP"
                      name="radio"
                      :disabled="selectedTicket !== 3"
                    />
                    <span class="radio-circle"></span>
                    VIP
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Stepper>
      <Stepper v-if="step === 2">
        <div class="container">
          <form class="payment__form" @submit.prevent>
            <PaymentInput :input-placeholder="'Ваше ім’я*'" input-type="text" />
            <PaymentInput
              :input-placeholder="'Ваше прізвище*'"
              input-type="text"
            />
            <PaymentInput
              :input-placeholder="'Електронна пошта*'"
              input-type="email"
            />
            <PaymentInput
              :input-placeholder="'Дата народження*'"
              input-type="date"
              icon-path="url('_nuxt/assets/svg/calendar-icon.svg')"
              :firefox="true"
            />
            <PaymentInput
              v-if="selectedTicket === 3"
              :input-placeholder="'Кому*'"
              input-type="text"
              icon-path="url('_nuxt/assets/svg/gift-icon-input.svg')"
            />
          </form>
        </div>
      </Stepper>
      <div class="container">
        <div class="controls">
          <button v-if="step === 2" class="controls__btn back" @click="step--">
            Назад
          </button>
          <button
            class="controls__btn forward"
            :disabled="selectedTicket === 0"
            @click="step++"
          >
            <NuxtLink :to="step === 2 ? '/' : ''">
              {{ step === 1 ? "Оформити" : "Продовжити" }}
            </NuxtLink>
          </button>
        </div>
      </div>
      <p v-if="step === 2" class="container reminder">
        Ця інформація вважається приватною та не відображатиметься ніде
      </p>
    </div>
    <div v-if="step === 3" class="bg-submit">
      <div class="container">
        <div class="content">
          <img
            class="content__img"
            src="@/assets/svg/success-icon.svg"
            alt="success"
          />
          <p class="content__text">
            {{
              `Ви успішно створили замовлення. Для оплати перекажіть amount грн.
          на банку за посиланням нижче і очікуйте білет у вашому профілі.`
            }}
          </p>
          <NuxtLink class="content__link">Банка</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  padding: 56px 0 100px 0;
  background: url("@/assets/svg/mobile-bg-shape2.svg") no-repeat center;
  background-color: $dark;

  @media screen and (min-width: $vp-mobile) {
    padding: 76px 0 200px 0;
    background: url("@/assets/svg/desktop-bg-shape1.svg") no-repeat top;
    background-color: $dark;
  }
}

.heading-wrapper {
  background-color: $darkd;
}

.heading {
  position: relative;
  max-width: 200px;
  margin: 0;
  margin-left: 20px;
  color: $white;
  font-family: "Furore";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 26px */
  letter-spacing: 2px;

  @media screen and (min-width: $vp-mobile) {
    max-width: unset;
  }

  &::before {
    content: "";
    position: absolute;
    top: 26%;
    right: calc(100% + 12px);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $main;
    transform: translateY(-50%);

    @media screen and (min-width: $vp-mobile) {
      top: 50%;
    }
  }
}

.payment-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: $vp-mobile) {
    justify-content: center;
    gap: 24px;
  }

  & > p {
    display: inline-block;
    color: $white;
    font-family: "Mulish";
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 23.4px */
  }

  & > span {
    color: $white;
    text-align: right;
    font-family: "Mulish";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 26px */
  }
}

.tickets {
  margin-top: 28px;
}

.tickets__inner {
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media screen and (min-width: $vp-tlandscape) {
    flex-direction: row;
    justify-content: center;
  }
}

.ticket {
  background-color: $white;

  @media screen and (min-width: $vp-tlandscape) {
    max-width: 275px;
  }

  @media screen and (min-width: $vp-desktop) {
    max-width: 373px;
  }

  &__header {
    padding-top: 12px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (min-width: $vp-tlandscape) {
      flex-direction: column;
      padding: 45px 0;
      gap: 10px;
    }
  }

  &__type-wrapper {
    width: 100%;
    max-width: 100px;
    padding: 4.5px 14.5px;
    text-align: center;
    // transition: all 0.3s ease;

    @media screen and (min-width: $vp-mobile) {
      max-width: 200px;
    }

    @media screen and (min-width: $vp-tlandscape) {
      padding: 0;
      max-width: unset;
      background-color: transparent !important;
    }
  }

  &__type {
    margin: 0;
    color: $white;
    font-family: "Furore";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 2px;

    @media screen and (min-width: $vp-desktop) {
      font-size: 28px;
      letter-spacing: 2.8px;
    }
  }

  &__price {
    margin-right: 12px;
    text-align: right;
    color: #5cb731;
    font-family: "Mulish";
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 33.8px */

    @media screen and (min-width: $vp-tlandscape) {
      color: $white;
      margin-right: 0;
      font-size: 26px;
    }
  }
}

.info {
  margin: 0;
  padding: 12px 12px 20px 12px;
  list-style: none;

  @media screen and (min-width: $vp-tlandscape) {
    padding: 32px 40px;
  }

  &__item {
    position: relative;
    margin-left: 16px;
    color: $darkd;
    font-family: "Mulish";
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 130%; /* 20.8px */

    @media screen and (min-width: $vp-tlandscape) {
      font-size: 18px;
    }

    &::before {
      content: "";
      position: absolute;
      top: 8px;
      right: calc(100% + 8px);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      // transform: translateY(-50%);
    }
  }

  &__item:not(:last-child) {
    margin-bottom: 8px;
  }
}

.basic {
  background-color: $blue;
}

.basic-bg {
  @media screen and (min-width: $vp-tlandscape) {
    background-color: $blue;
  }
}

.basic-pseudo {
  &::before {
    background-color: $blue;
  }
}

.vip {
  background-color: $red;
}

.vip-bg {
  @media screen and (min-width: $vp-tlandscape) {
    background-color: $red;
  }
}

.vip-lines {
  position: relative;
  display: inline;

  @media screen and (min-width: $vp-tlandscape) {
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      right: calc(100% + 12px);
      width: 16px;
      height: 4px;
      border-radius: 4px;
      background-color: $white;
      transform: translateY(-50%);
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: calc(100% + 12px);
      width: 16px;
      height: 4px;
      border-radius: 4px;
      background-color: $white;
      transform: translateY(-50%);
    }
  }
}

.vip-pseudo {
  &::before {
    background-color: $red;
  }
}

.gift {
  position: relative;
  display: flex;
  min-height: 150px;
  justify-content: center;
  align-items: center;
  background: url("@/assets/svg/gift-bg.svg") no-repeat;
  background-color: $main-bg;

  @media screen and (min-width: $vp-tlandscape) {
    width: 275px;
    background: url("@/assets/svg/gift-icon-desktop.svg") no-repeat 50% 30%;
    background-color: $main-bg;
  }

  @media screen and (min-width: $vp-desktop) {
    width: 373px;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media screen and (min-width: $vp-tlandscape) {
    margin-top: 300px;
  }

  @media screen and (min-width: $vp-desktop) {
    margin-top: 250px;
  }

  & > label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: $white;
    font-family: "Mulish";
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%; /* 23.4px */
  }
}

.radio[type="radio"] {
  display: none;
}

.radio-circle {
  position: relative;
  display: block;
  padding: 0;
  margin: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid $white;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: $white;
    transform: translate(-50%, -50%) scale(0);
    transition: 0.3s ease-in-out 0s;
  }
}

.radio[type="radio"]:checked ~ .radio-circle::after {
  transform: translate(-50%, -50%) scale(1);
}

.overlay {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: rgba($color: $darkdd, $alpha: 0.6);
    transition: all 0.3s ease;
  }
}

.selected {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border: 5px solid $main;
    transition: all 0.1s ease;
  }
}

.controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 12px;

  @media screen and (min-width: $vp-mobile) {
    flex-direction: row;
  }

  &__btn {
    max-width: 352px;
    width: 100%;
    border: 0;
    outline: 0;
    color: $white;
    font-family: "Furore";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.4px;
    cursor: pointer;

    &:disabled {
      background-color: $secondary !important;
    }
  }

  & > .back {
    padding: 14px 57px;
    background-color: $darkdd;
  }

  & > .forward {
    padding: 14px v-bind("step === 1 ? '57.5px' : '26.5px'");
    background-color: $main;
  }
}

.reminder {
  margin-top: 40px;
  color: rgba($color: $secondary, $alpha: 0.6);
  text-align: center;
  font-family: "Mulish";
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 130%; /* 18.2px */
}

.payment__form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  margin-top: 56px;

  @media screen and (min-width: $vp-mobile) {
    margin-top: 76px;
    gap: 12px;
  }
}

.note {
  color: $white;
  font-family: "Mulish";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 26px */
}

.bg-submit {
  background: url("@/assets/svg/mobile-bg-shape2.svg") no-repeat top;
  background-color: $main-bg;

  @media screen and (min-width: calc($vp-mobile + 10px)) {
    background: url("@/assets/svg/desktop-bg-shape1.svg") no-repeat top;
    background-color: $main-bg;
  }
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 127px 0 172px;

  @media screen and (min-width: $vp-mobile) {
    padding: 300px 0 400px;
  }

  @media screen and (min-width: $vp-tlandscape) {
    padding: 260px 0 335px;
  }

  &__img {
    display: block;
  }

  &__text {
    color: $white;
    text-align: center;
    font-family: "Mulish";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%; /* 26px */

    @media screen and (min-width: $vp-mobile) {
      max-width: 360px;
      font-size: 18px;
    }

    @media screen and (min-width: $vp-tablet) {
      max-width: 440px;
      font-size: 20px;
    }
  }

  &__link {
    padding: 14px 52px;
    text-align: center;
    font-family: "Furore";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.4px;
    color: $white;
    background-color: $main;
  }
}

.remove {
  @media screen and (min-width: $vp-tlandscape) {
    display: none;
  }
}
</style>
