<script lang="ts" setup>
const tab: Ref<number> = ref(1);

const tickets = [
  { id: 12312, type: "Player", gift: { giftedTo: "suka" } },
  {
    id: 123125555,
    type: "Participant",
    gift: { giftFrom: "AERasdsadasdasdassdaWJNKF" },
  },
  { id: 1231123213212, type: "Staff" },
  { id: 1231299, type: "VIP", gift: { giftedTo: "NYA KAWAI" } },
];
</script>

<template>
  <div class="bg">
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
          <button class="logout-btn"></button>
        </div>
      </div>
    </div>
    <div class="tabs__content">
      <div class="container">
        <div v-show="tab === 1" class="content content__settings">
          <form class="form" @submit.prevent>
            <div>
              <label class="form__label">Електронна пошта</label>
              <Input class="form__input" icon="email" />
            </div>
            <div>
              <label class="form__label">Discord</label>
              <Input class="form__input" icon="discord" />
            </div>
            <div>
              <label class="form__label">Telegram</label>
              <Input class="form__input" icon="telegram" />
            </div>
          </form>
        </div>
        <div v-show="tab === 2" class="content content__tickets">
          <Ticket
            v-for="ticket of tickets"
            :key="ticket.id"
            :ticket-type="ticket.type"
            :gift="ticket.gift"
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
</style>
