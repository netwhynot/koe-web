<script lang="ts" setup>
import axios from "axios";
import { ITicket } from "@/server/dbModels/ticket";

const props = defineProps({
  ticketType: {
    type: String, // Participant, Player, Staff, VIP
    required: true,
  },
  gift: {
    type: Object,
    default: () => ({}),
  isGifted: {
    type: Boolean,
    default: false,
  },
  isGift: {
    type: Boolean,
    default: false,
  },
  giftedBy: {
    type: String,
    default: undefined,
  },
});

const isVIP: Ref<boolean> = ref(props.ticketType === "VIP");
const isGift: Ref<boolean> = ref(
  // eslint-disable-next-line prettier/prettier
  props.gift && Object.keys(props.gift).length !== 0
);
  qrCode: {
    type: String,
    required: true,
  },
});

let giftedByUser: string | undefined;

const isVIP: Ref<boolean> = ref(props.ticket.type === "VIP");

<<<<<<< HEAD
const ticketTypes: { [key: string]: { html: string; color: string } } = {
  Participant: { html: "Учасник", color: "#5662f6" },
  Player: { html: "Гравець", color: "#6441a4" },
  Staff: { html: "Організатор", color: "#e00087" },
  VIP: { html: "VIP", color: "#d31717" },
};
=======
const ticketStyles: Ref<{ [key: string]: { html: string; color: string } }> =
  ref({
    Spectator: { html: "Учасник", color: "#5662f6" },
    Player: { html: "Гравець", color: "#6441a4" },
    VIP: { html: "VIP", color: "#d31717" },
  });
>>>>>>> 9941f0c... wer

if (props.isGift) {
  const giftedByResponse = await axios.get(`/api/users/${props.giftedBy}`);

  giftedByUser = giftedByResponse.data.username;
}
</script>

<template>
  <div class="ticket">
    <div class="ticket__inner">
      <img class="ticket__qr" src="@/assets/img/qr.jpg" alt="qr code" />
      <div class="ticket__headings" :class="{ margin: isVIP }">
        <h3 v-if="isVIP" class="ticket__heading vip">VIP</h3>
        <h4 class="ticket__heading">Kyiv osu event</h4>
      </div>
      <div v-if="!isVIP" class="ticket__type">
        <span class="ticket__text">Тип квитка</span>
        <span class="ticket__text type__name">{{
<<<<<<< HEAD
          ticketTypes[props.ticketType].html
=======
          ticketStyles[ticket.type].html
>>>>>>> 9941f0c... wer
        }}</span>
      </div>
      <div v-if="isGift" class="ticket__gift">
        <span class="ticket__text">{{
          props.gift && props.gift.giftFrom ? "Подаровано від" : "Подаровано"
        }}</span>
        <span class="ticket__text">Подаровано від:</span>
        <span class="ticket__text gift__name">{{
<<<<<<< HEAD
          props.gift && props.gift.giftFrom
            ? props.gift.giftFrom
            : props.gift && props.gift.giftedTo
            ? props.gift.giftedTo
            : ""
          props.isGift ? giftedByUser : ""
=======
          isGift ? giftedByUser : ""
>>>>>>> 9941f0c... wer
        }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ticket {
  position: relative;
  width: 280px;
  height: 429px;
  background: url("@/assets/svg/ticket-shape.svg") no-repeat center;
  background-size: cover;

  @media screen and (min-width: $vp-mobile) {
    width: 432px;
    height: 628px;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 56px 56px;
    border-color: transparent transparent
<<<<<<< HEAD
      v-bind("ticketTypes[props.ticketType].color") transparent;
=======
      v-bind("ticketStyles[ticket.type].color") transparent;
>>>>>>> 9941f0c... wer

    @media screen and (min-width: $vp-mobile) {
      border-width: 0 0 80px 80px;
    }
  }

  &__inner {
    padding: 40px 20px;
    text-align: center;

    @media screen and (min-width: $vp-mobile) {
      padding: 76px 24px;
    }
  }

  &__qr {
    display: block;
    width: 200px;
    height: 200px;
    margin: 0 auto;

    @media screen and (min-width: $vp-mobile) {
      width: 280px;
      height: 280px;
    }
  }

  &__headings {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 36px;
    margin-bottom: 24px;
    gap: 4px;

    @media screen and (min-width: $vp-mobile) {
      margin-top: 66px;
    }
  }

  &__heading {
    position: relative;
    display: inline;
    margin: 0;
    color: $darkdd;
    font-family: "Furore";
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.8px;

    @media screen and (min-width: $vp-mobile) {
      font-size: 28px;
      letter-spacing: 2.8px;
    }

    &::after,
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      width: 8px;
      height: 8px;
      border-radius: 50%;
<<<<<<< HEAD
      background-color: v-bind("ticketTypes[props.ticketType].color");
=======
      background-color: v-bind("ticketStyles[ticket.type].color");
>>>>>>> 9941f0c... wer
      transform: translateY(-50%);
    }

    &::after {
      left: calc(100% + 12px);
    }

    &::before {
      right: calc(100% + 12px);
    }
  }

  &__text {
    color: $darkdd;
    font-family: "Mulish";
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;

    @media screen and (min-width: $vp-mobile) {
      font-size: 18px;
    }
  }

  &__type {
    display: flex;
    gap: 16px;
    margin-bottom: 12px;
  }

  &__gift {
    display: flex;
    gap: 16px;
  }
}

.type__name {
<<<<<<< HEAD
  color: v-bind("ticketTypes[props.ticketType].color");
=======
  color: v-bind("ticketStyles[ticket.type].color");
>>>>>>> 9941f0c... wer
  font-family: "Mulish";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  @media screen and (min-width: $vp-mobile) {
    font-size: 18px;
  }
}

.gift__name {
  max-width: 90px;
  color: $darkdd;
  font-family: "Mulish";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media screen and (min-width: $vp-mobile) {
    font-size: 18px;
    max-width: 224px;
  }
}

.remove {
  display: none;
}

.margin {
  margin-top: 12px;

  @media screen and (min-width: $vp-mobile) {
    margin-bottom: 28px;
  }
}

.vip {
  color: $red;

  &::after,
  &::before {
    content: "";
    height: 2px;
    border-radius: 4px;
    background-color: $red;

    @media screen and (min-width: $vp-mobile) {
      width: 16px;
      height: 3px;
    }
  }

  &::after {
    left: calc(100% + 8px);

    @media screen and (min-width: $vp-mobile) {
      left: calc(100% + 16px);
    }
  }

  &::before {
    right: calc(100% + 8px);

    @media screen and (min-width: $vp-mobile) {
      right: calc(100% + 16px);
    }
  }
}
</style>
