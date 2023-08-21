<script lang="ts" setup>
import { IUser } from "@/server/dbModels/user";
import { IInventoryTicket, IInventoryGift } from "@/server/dbModels/inventory";

const tab: Ref<number> = ref(1);
const modalIsActive: Ref<boolean> = ref(false);

const ownTickets: Ref<IInventoryTicket[]> = ref([]);
const giftedTickets: Ref<IInventoryGift[]> = ref([]);

onMounted(async () => {
  const data = await $fetch<IUser>("/api/users/64e0d9b94933dd0fa10e3fe6");

  ownTickets.value = data.inventory.tickets;
  giftedTickets.value = data.inventory.gifts;
});
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
      <div class="container tabs__container">
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
      <div v-if="tab === 1" class="container">
        <div class="content content__settings">
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
      </div>
      <div v-if="tab === 2" class="container tickets-container">
        <div class="content content__tickets">
          <div
            v-if="ownTickets.length <= 0 && giftedTickets.length <= 0"
            class="no-tickets"
          >
            <p>Схоже, у Вас ще немає жодного квитка</p>
            <NuxtLink to="/buy">купити квиток</NuxtLink>
          </div>
          <Ticket
            v-for="ticket of ownTickets"
            :key="new Date(ticket.createdAt).getTime()"
            :ticket="ticket.ticket"
            :ticket-type="ticket.ticket.type"
          />
          <Ticket
            v-for="ticket of giftedTickets"
            :key="new Date(ticket.giftedAt).getTime()"
            :ticket="ticket.ticket"
            :is-gift="true"
            :ticket-type="ticket.ticket.type"
          />
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

  @media screen and (min-width: $vp-desktop) {
    max-width: 1180px;
  }

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

  &__container {
    @media screen and (min-width: $vp-desktop) {
      max-width: 1180px;
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
  background: url("@/assets/svg/mobile-bg-shape2.svg") no-repeat;

  @media screen and (min-width: $vp-mobile) {
    display: block;
    padding: 76px 0 200px 0;
  }

  @media screen and (min-width: calc($vp-mobile + 10px)) {
    display: block;
    padding: 76px 0 200px 0;
    background: url("@/assets/svg/desktop-bg-shape1.svg") no-repeat top;
  }
}

.form {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 20px;

  @media screen and (min-width: $vp-mobile) {
    max-width: 432px;
  }

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

.tickets-container {
  @media screen and (min-width: $vp-desktop) {
    max-width: 1180px;
  }
}

.content__tickets {
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media screen and (min-width: $vp-mobile) {
    gap: 40px;
  }

  @media screen and (min-width: $vp-tablet) {
    gap: 16.5px;
    align-items: center;
  }

  @media screen and (min-width: $vp-tlandscape) {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.no-tickets {
  margin: 24px auto 156px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media screen and (min-width: $vp-mobile) {
    gap: 20px;
    margin: 124px auto 170px;
  }

  @media screen and (min-width: $vp-desktop) {
    margin: 124px auto 150px;
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
