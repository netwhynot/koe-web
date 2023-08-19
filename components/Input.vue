<script lang="ts" setup>
import { nextTick } from "vue";

const props = defineProps({
  icon: {
    type: String, // email | discord | telegram
    required: true,
  },
});

const input: Ref<HTMLInputElement | null> = ref(null);
const isDisabled: Ref<boolean> = ref(true);

const editInput = async () => {
  isDisabled.value = !isDisabled.value;
  await nextTick(() => input.value?.focus());
};

const submitInput = () => {};
</script>

<template>
  <div class="input-wrapper" :class="props.icon">
    <input
      ref="input"
      class="input"
      :disabled="isDisabled"
      type="text"
      @focusout="isDisabled = !isDisabled"
    />
    <button class="icon edit-icon" @click="editInput"></button>
    <button
      class="icon apply-icon"
      :class="{ showBtn: isDisabled === false }"
      @submit.prevent="submitInput"
    ></button>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;

  @media screen and (min-width: $vp-mobile) {
    padding: 0 50px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 50px;
      height: 50px;
      background-color: $secondary;
    }
  }
}

.icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 45px;
  height: 45px;
  border: 0;
  outline: 0;
  cursor: pointer;

  @media screen and (min-width: $vp-mobile) {
    width: 50px;
    height: 50px;
  }
}

.edit-icon {
  background: url("@/assets/svg/edit-icon.svg") no-repeat center;
  z-index: 2;

  @media screen and (min-width: $vp-mobile) {
    background-color: rgba($color: $secondary, $alpha: 0.1);
  }
}

.apply-icon {
  z-index: 1;
  opacity: 0;
  background: url("@/assets/svg/apply-icon.svg") no-repeat center;
  background-color: #5cb731;
  transition: opacity 0.2s ease;
}

.showBtn {
  z-index: 3;
  opacity: 1;
}

.input {
  display: block;
  min-width: 240px;
  padding: 12.1px 16px;
  margin: 0;
  border: 0;
  border-radius: 0;
  outline: 0;
  color: $dark;
  background-color: $white;
  font-family: "Mulish";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 20.8px */
  transition: all 0.2s ease;

  @media screen and (min-width: $vp-mobile) {
    padding: 14.7px 20px;
    min-width: 280px;
  }

  &:disabled {
    background-color: rgba($color: $secondary, $alpha: 0.5);
    color: $white;
  }
}

.email {
  &::before {
    background: url("@/assets/svg/email-icon.svg") no-repeat center;
    background-color: $secondary;
  }
}

.discord {
  &::before {
    background: url("@/assets/svg/discord-icon.svg") no-repeat center;
    background-color: $secondary;
  }
}

.telegram {
  &::before {
    background: url("@/assets/svg/telegram-icon.svg") no-repeat center;
    background-color: $secondary;
  }
}
</style>
