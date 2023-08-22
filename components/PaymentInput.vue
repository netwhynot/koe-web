<script lang="ts" setup>
declare const InstallTrigger: any;
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  inputType: {
    type: String,
    required: true,
  },
  inputPlaceholder: {
    type: String,
    default: "",
  },
  iconPath: {
    type: String,
    default: "",
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  firefox: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const icon: Ref<HTMLSpanElement | null> = ref(null);
const isFirefox = typeof InstallTrigger !== "undefined";

onMounted(() => {
  if (isFirefox && icon.value !== null && props.firefox) {
    icon.value.style.display = "none";
  }
});
</script>

<template>
  <div class="input-wrapper">
    <input
      ref="input"
      :name="props.inputPlaceholder"
      class="input"
      :type="props.inputType"
      :placeholder="props.inputPlaceholder"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <span ref="icon" class="icon"></span>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
  display: flex;
  max-width: 352px;
  width: 100%;

  @media screen and (min-width: $vp-mobile) {
    max-width: unset;
  }

  & > label {
    color: $secondary;
    font-family: "Mulish";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 20.8px */
  }
}

.input {
  display: block;
  width: 100%;
  padding: 12px 20px;
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

  &::placeholder {
    color: $secondary;
    font-family: "Mulish";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 20.8px */
  }

  @media screen and (min-width: $vp-mobile) {
    padding: 14px 20px;
  }
}

.icon {
  position: absolute;
  top: 50%;
  right: 20px;
  width: 24px;
  height: 24px;
  background-image: v-bind(iconPath);
  transform: translateY(-50%);
}

.input[type="date"]::-webkit-inner-spin-button,
.input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}
</style>
