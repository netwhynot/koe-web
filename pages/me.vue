<script lang="ts" setup>
import { ITickets } from "@/interfaces/inventory.interface";
import { IUser } from "@/server/dbModels/user";
import {
  IInventoryTicket,
  IInventoryGift,
  IInventory,
} from "@/server/dbModels/inventory";
import { ITicket } from "server/dbModels/ticket";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

definePageMeta({
  middleware: ["auth"],
});

>>>>>>> 9941f0c... wer
>>>>>>> e02ee6c22758e83d73cec07781a33a90e9930fc3
const tab: Ref<number> = ref(1);
const modalIsActive: Ref<boolean> = ref(false);
const tickets: Ref<ITickets[]> = ref([]);

// onMounted(async () => {
//   const json: IUser = await ky
//     .get("http://localhost:3000/api/users/64e0d9b94933dd0fa10e3fe6")
//     .json();

//   tickets.value = json.inventory.tickets;
// });
//   { type: "Participant", price: 3213213, description: "" },
//   { type: "Staff", price: 312321, description: "" },
//   { type: "VIP", price: 33222, description: "" },
</script>

<template>
  <div class="bg">
    <Transition>
      <Modal v-if="modalIsActive" :bg="true" @close="modalIsActive = false">
        <span class="modal__icon"></span>
        <p class="modal__text">Ви впевнені, що бажаєте вийти з акаунта?</p>
        <div class="modal__btns-wrapper">
          <NuxtLink
            to="/me"
            class="modal__btn back"
            @click="modalIsActive = false"
            >назад</NuxtLink
          >
          <NuxtLink
            to="/"
            class="modal__btn exit"
            @click="modalIsActive = false"
            >вийти</NuxtLink
          >
        </div>
      </Modal>
    </Transition>
    <div class="container account">
      <div class="account__pic"></div>
      <h2 class="account__name">alowave23</h2>
    </div>
    <div class="tabs-bg">
      <div class="container">
        <div class="tabs-wrapper">
          <ul class="tabs">
            <li
              class="tabs__item"
              :class="tab === 1 ? 'active-tab' : ''"
              @click="tab = 1"
            >
              Інформація
            </li>
            <li
              class="tabs__item"
              :class="tab === 2 ? 'active-tab' : ''"
              @click="tab = 2"
            >
              квитки
            </li>
          </ul>
          <button class="logout-btn" @click="modalIsActive = true"></button>
        </div>
      </div>
    </div>
    <div class="tabs__content">
      <div class="container">
        <div v-if="tab === 1" class="content content__settings">
          <form class="form" @submit.prevent>
            <div>
              <label class="form__label">Електронна пошта</label>
              <SettingsInput
                class="form__input"
                icon="email"
                input-type="email"
              />
            </div>
            <div>
              <label class="form__label">Discord</label>
              <SettingsInput
                class="form__input"
                icon="discord"
                input-type="text"
              />
            </div>
            <div>
              <label class="form__label">Telegram</label>
              <SettingsInput
                class="form__input"
                icon="telegram"
                input-type="text"
              />
            </div>
          </form>
        </div>
        <div v-if="tab === 2" class="content content__tickets">
<<<<<<< HEAD
          <!-- <Ticket v-for="ticket of tickets" :key="ticket.ticket" /> -->
          <div v-if="tickets.length <= 0" class="no-tickets">
            <p>Схоже, у Вас ще немає жодного квитка</p>
            <NuxtLink to="/buy">купити квиток</NuxtLink>
          </div>
=======
          <Ticket
<<<<<<< HEAD
            v-for="ticket of tickets"
            :key="ticket.id"
            :ticket-type="ticket.type"
            :gift="ticket.gift"
=======
            v-for="ticket of ownTickets"
            :key="new Date(ticket.createdAt).getTime()"
            :ticket="<ITicket>ticket.ticket"
            :ticket-type="(<ITicket>ticket.ticket).type"
            :qr-code="ticket.qrCode!"
          />
          <Ticket
            v-for="ticket of giftedTickets"
            :key="new Date(ticket.giftedAt).getTime()"
            :ticket="<ITicket>ticket.ticket"
            :is-gift="true"
            :ticket-type="(<ITicket>ticket.ticket).type"
            :qr-code="ticket.qrCode!"
            :gifted-by="<string><unknown>ticket.from!"
>>>>>>> 458e642... niga
          />
>>>>>>> b284a53ce3485ccd404051302fb0c830375e7dfe
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background-color: #1f1f1f;
}

.account {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;

  &__pic {
    display: inline-block;
    width: 72px;
    height: 72px;
    background: url("../assets/svg/discord.svg") no-repeat center;
    background-size: contain;

    @include rounded-hex($rotated: true);

    @media screen and (min-width: $vp-mobile) {
      width: 96px;
      height: 96px;
    }
  }

  &__name {
    color: $white;
    font-family: "Mulish";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    @media screen and (min-width: $vp-mobile) {
      font-size: 28px;
    }
  }
}

.tabs {
  display: flex;
  gap: 32px;
  margin: 0;
  padding: 0;
  list-style: none;

  &-bg {
    background-color: $dark;
  }

  &-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0;
  }

  &__item {
    position: relative;
    color: $secondary;
    font-family: "Furore";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.2px;
    cursor: pointer;

    @media screen and (min-width: $vp-mobile) {
      font-size: 14px;
      letter-spacing: 1.4px;
    }
  }
}

.logout-btn {
  width: 24px;
  height: 24px;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
  outline: none;
  background: url("@/assets/svg/logout-icon.svg") no-repeat center;
  cursor: pointer;
  transform: translateY(1px);
}

.active-tab {
  color: $main-bg;

  &::after {
    content: "";
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    height: 2px;
    background-color: $main;
  }
}

.tabs__content {
  display: flex;
  justify-content: center;
  padding: 56px 0 160px 0;
  background: url("@/assets/svg/mobile-bg-shape2.svg") no-repeat center;

  @media screen and (min-width: $vp-mobile) {
    display: block;
    padding: 76px 0 200px 0;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__label {
    color: $white;
    font-family: "Mulish";
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 20.8px */
  }

  &__input {
    margin-top: 8px;
    @media screen and (min-width: $vp-mobile) {
      margin-top: 12px;
    }
  }
}

.content__tickets {
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media screen and (min-width: $vp-mobile) {
    gap: 40px;
  }
}

.no-tickets {
  margin: 24px 0 156px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media screen and (min-width: $vp-mobile) {
    gap: 20px;
    margin: 124px 0 170px 0;
  }

  @media screen and (min-width: $vp-desktop) {
    margin: 124px 0 150px 0;
  }

  & > p {
    max-width: 200px;
    color: $white;
    text-align: center;
    font-family: "Mulish";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%; /* 20.8px */

    @media screen and (min-width: $vp-mobile) {
      max-width: 220px;
      font-size: 18px;
    }

    @media screen and (min-width: $vp-desktop) {
      max-width: unset;
      font-size: 20px;
    }
  }

  & > a {
    max-width: 210px;
    padding: 14px 33.5px;
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

.modal__text {
  margin: 5px auto;
  margin-bottom: 16px;
  color: $darkdd;
  text-align: center;
  font-family: "Mulish";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 23.4px */

  @media screen and (min-width: $vp-mobile) {
    font-size: 18px;
    margin: 10px auto;
    margin-bottom: 16px;
    max-width: 250px;
  }

  @media screen and (min-width: $vp-desktop) {
    font-size: 20px;
  }
}

.modal__btns-wrapper {
  display: flex;
  gap: 8px;

  @media screen and (min-width: $vp-mobile) {
    gap: 12px;
  }
}

.modal__btn {
  display: inline-block;
  padding: 14px 30px;
  color: $white;
  text-align: center;
  font-family: "Furore";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1.4px;
}

.back {
  background-color: $darkdd;
  @media screen and (min-width: $vp-mobile) {
    padding: 14px 57px;
  }
}

.exit {
  position: relative;

  background-color: $red;
  @media screen and (min-width: $vp-mobile) {
    padding: 14px 67px 14px 47px;

    &::after {
      content: "";
      position: absolute;
      top: 10px;
      right: 36px;
      display: block;
      width: 24px;
      height: 24px;
      background: url("@/assets/svg/logout-icon-white.svg");
    }
  }
}

.modal__icon {
  position: absolute;
  left: 50%;
  top: -50%;
  width: 72px;
  height: 72px;
  background-color: transparent;
  cursor: pointer;
  transform: translate(-50%, 80%);
  background: url("@/assets/svg/warning-icon.svg") no-repeat center;
  background-size: contain;

  @media screen and (min-width: $vp-mobile) {
    width: 96px;
    height: 96px;
    transform: translate(-50%, 45%);
  }

  @media screen and (min-width: $vp-desktop) {
    transform: translate(-50%, 60%);
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.1 ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
