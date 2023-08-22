<script lang="ts" setup>
import axios from "axios";
import { useUserStore } from "@/stores/user";

enum Tickets {
  Basic = 1,
  VIP = 2,
  Gift = 3,
}

const step: Ref<number> = ref(1);

const selectedGift: Ref<number> = ref(0);
const selectedTicket: Ref<number> = ref(0);
const totalAmount: Ref<number> = ref(0);
const name = ref("");
const surname = ref("");
const email = ref("");
const birthDate = ref("");
const toWho = ref("");


definePageMeta({
  middleware: ["auth"],
});

const userStore = useUserStore();
const ticketsList = ["64e0dcb89886a103eac39528", "64e0dcfb9886a103eac39529"];

watch(selectedGift, () => {
  if (selectedGift.value === 1) {
    totalAmount.value = 750;
  } else if (selectedGift.value === 2) {
    totalAmount.value = 950;
  } else {
    totalAmount.value = 0;
  }
});

const handleOrder = async () => {
  let postData = {};

  if (selectedTicket.value === Tickets.Gift) {
    postData = {
      boughtTicket: {
        ticket: ticketsList[selectedGift.value - 1],
        to: "64e0dcb89886a103eac39528",
        from: userStore.user.id,
        isGifted: true,
      },
    };
  } else {
    postData = {
      boughtTicket: {
        ticket: ticketsList[selectedTicket.value - 1],
        to: userStore.user.id,
        isGifted: false,
      },
    };
  }

  await axios.post("/api/orders", postData, {
    withCredentials: true,
    validateStatus: () => true,
  });

  step.value = 3;
};
</script>

<template>
  <div>
    <div v-if="step !== 3" class="bg">
      <div :class="{ 'heading-wrapper': step === 2 }">
        <div class="container">
          <RichHeading v-if="step === 1">Оберіть тип квитка</RichHeading>
          <div v-if="step === 2" class="payment-wrapper">
            <p>Всього до оплати:</p>
            <span>{{ totalAmount }} ₴</span>
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
                @click="
                  selectedTicket = Tickets.Basic;
                  totalAmount = 750;
                "
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
                @click="
                  selectedTicket = Tickets.VIP;
                  totalAmount = 950;
                "
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
              <RichHeading v-if="step === 1" class="remove"
                >Подарувати квиток</RichHeading
              >
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
                <span class="gift-note">Подарувати квиток</span>
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
            <PaymentInput
              :model-value="name"
              :input-placeholder="'Ваше ім’я*'"
              input-type="text"
              @update:model-value="(newValue) => (name = newValue)"
            />
            <PaymentInput
              :model-value="surname"
              :input-placeholder="'Ваше прізвище*'"
              input-type="text"
              @update:model-value="(newValue) => (surname = newValue)"
            />
            <PaymentInput
              :model-value="email"
              :input-placeholder="'Електронна пошта*'"
              input-type="email"
              @update:model-value="(newValue) => (email = newValue)"
            />
            <PaymentInput
              :model-value="birthDate"
              :input-placeholder="'Дата народження*'"
              input-type="date"
              icon-path="url('_nuxt/assets/svg/calendar-icon.svg')"
              :firefox="true"
              @update:model-value="(newValue) => (birthDate = newValue)"
            />
            <PaymentInput
              v-if="selectedTicket === 3"
              :model-value="toWho"
              :input-placeholder="'Кому*'"
              input-type="text"
              icon-path="url('_nuxt/assets/svg/gift-icon-input.svg')"
              @update:model-value="(newValue) => (toWho = newValue)"
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
            @click="step < 2 ? step++ : handleOrder()"
          >
            <a>
              {{ step === 1 ? "Оформити" : "Продовжити" }}
            </a>
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
              `Ви успішно створили замовлення. Для оплати перекажіть ${totalAmount} грн.
          на банку за посиланням нижче і очікуйте білет у вашому профілі.`
            }}
          </p>
          <NuxtLink
            href="https://send.monobank.ua/jar/556LBrEDDs"
            class="content__link"
            target="_blank"
            >Банка</NuxtLink
          >
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
    padding: 76px 0 300px 0;
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
  cursor: pointer;

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
  position: relative;
  z-index: 1;
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
    cursor: pointer;
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
  cursor: pointer;

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

  @media screen and (min-width: $vp-tablet) {
    margin: 20px auto 0;
    max-width: 432px;
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

  @media screen and (min-width: $vp-tablet) {
    max-width: 432px;
    margin: 76px auto 0;
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

.gift-note {
  position: absolute;
  top: 45px;
  color: $white;
  text-align: center;
  font-family: "Furore";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 2.8px;

  @media screen and (max-width: $vp-tlandscape) {
    display: none;
  }
}
</style>
