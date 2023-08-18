<script lang="ts" setup>
const props = defineProps({
  side: {
    type: String,
    default: "left",
    required: true,
  },
  disableLine: {
    type: Boolean,
    default: false,
    required: false,
  },
});
</script>

<template>
  <div class="relative">
    <span class="circle" :class="props.side === 'right' ? 'right' : ''">
      <span class="circle__inner"></span>
      <span class="horizontal-line"></span>
      <span
        class="vertical-line"
        :class="props.disableLine ? 'disable-line' : ''"
      ></span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.relative {
  height: 64px;
  position: relative;

  @media screen and (min-width: $vp-mobile) {
    width: 80px;
    height: 80px;
  }
}

.circle {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 64px;
  height: 64px;
  border: 2px solid #464646;
  border-radius: 50%;
  background-color: transparent;

  @media screen and (min-width: $vp-mobile) {
    width: 76px;
    height: 76px;
    background-color: $dark;
  }

  .circle__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    display: block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: $secondary;
    transform: translate(-50%, -50%);

    @media screen and (min-width: $vp-mobile) {
      width: 44px;
      height: 44px;
    }
  }

  .horizontal-line {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    display: block;
    width: 77px;
    height: 2px;
    background-color: #464646;

    @media screen and (min-width: $vp-mobile) {
      display: none;
    }
  }

  .vertical-line {
    content: "";
    position: absolute;
    top: 50%;
    left: calc(100% + 77px);
    z-index: -1;
    display: block;
    width: 2px;
    height: 20px;
    background-color: #464646;

    @media screen and (min-width: $vp-mobile) {
      height: 190px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

.right {
  right: 0;
  left: unset;

  @media screen and (min-width: $vp-mobile) {
    left: 0;
    right: unset;
  }

  .vertical-line {
    right: calc(100% + 77px);
    left: unset;

    @media screen and (min-width: $vp-mobile) {
      height: 190px;
      right: unset;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .horizontal-line {
    right: 100%;
    left: unset;
  }
}

.disable-line {
  display: none !important;
}
</style>
