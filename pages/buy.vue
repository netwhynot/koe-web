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
    const toWhoUser = await axios.get(`/api/users/${toWho.value}`, {
      withCredentials: true,
      validateStatus: () => true,
    });

    if (toWhoUser.status !== 200) {
      return alert(
        "Користувача з таким іменем не існує! Перевірте чи користувач, якому ви хочете подарувати білет, зареєстрований на нашому сайті.",
      );
    }

    postData = {
      boughtTicket: {
        ticket: ticketsList[selectedGift.value - 1],
        to: toWhoUser.data.id,
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
  <div class="bg">
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
              <div class="ticket__header">
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
              <div class="ticket__header">
                <span class="ticket__type-wrapper vip">
                  <h4 class="ticket__type">VIP</h4>
                </span>
                <span class="ticket__price">1950 ₴</span>
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
</template>

<style lang="scss" scoped>
.bg {
  padding: 56px 0 100px 0;
  background: url("@/assets/svg/mobile-bg-shape2.svg") no-repeat center;
  background-color: $dark;

  @media screen and (min-width: $vp-mobile) {
    padding: 76px 0 200px 0;
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
}

.ticket {
  background-color: $white;

  &__header {
    padding-top: 12px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__type-wrapper {
    width: 100%;
    max-width: 100px;
    padding: 4.5px 14.5px;
    text-align: center;
    transition: all 0.3s ease;

    @media screen and (min-width: $vp-mobile) {
      max-width: 200px;
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
  }
}

.info {
  margin: 0;
  padding: 12px 12px 20px 12px;
  list-style: none;

  &__item {
    position: relative;
    margin-left: 16px;
    color: $darkd;
    font-family: "Mulish";
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 130%; /* 20.8px */

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

.basic-pseudo {
  &::before {
    background-color: $blue;
  }
}

.vip {
  background-color: $red;
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
  background: url("@/assets/svg/gift-bg.svg");
}

.form {
  display: flex;
  flex-direction: column;
  gap: 8px;

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
  border: 5px solid $main;
  transition: all 0.1s ease;
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
</style>
