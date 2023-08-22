<script lang="ts" setup>
const props = defineProps({
  heading: {
    type: String,
    required: true,
  },
});

const isActive: Ref<boolean> = ref(false);
</script>

<template>
  <div class="accordion">
    <div
      class="accordion__heading"
      :class="{ 'active-bg': isActive }"
      @click="isActive = !isActive"
    >
      <h5 :class="{ active: isActive }">{{ props.heading }}</h5>
      <span>
        <svg
          :class="{ rotate: isActive }"
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            :class="{ active: isActive }"
            d="M13 7L7.70711 1.70711C7.31658 1.31658 6.68342 1.31658 6.29289 1.70711L3.75 4.25L1 7"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </span>
    </div>
    <div class="accordion__content" :class="{ 'accordion-active': isActive }">
      <p>
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.accordion__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.4s ease;

  @media screen and (min-width: $vp-mobile) {
    padding: 16px 20px;
  }

  @media screen and (min-width: $vp-tlandscape) {
    padding: 16px 32px;
    background-color: #111;
  }

  & > h5 {
    margin: 0;
    color: rgba($color: $secondary, $alpha: 0.6);
    font-family: "Mulish";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 20.8px */

    @media screen and (min-width: $vp-mobile) {
      font-size: 18px;
    }
  }

  & > span {
    width: 14px;
    height: 14px;

    & > svg {
      transform: translateY(-3px) rotate(-180deg);
      transition: transform 0.3s ease;
    }

    & > svg > path {
      stroke: rgba($color: $secondary, $alpha: 0.6);
    }
  }
}

.accordion__content {
  max-height: 0px;
  padding: 0 16px;
  overflow: hidden;
  background-color: #111;
  transition:
    max-height 0.3s ease,
    padding 0.2s ease-in-out;

  @media screen and (min-width: $vp-mobile) {
    padding: 0 20px;
  }

  @media screen and (min-width: $vp-tlandscape) {
    padding: 0 32px;
  }

  & > p {
    margin: 0;
    color: $secondary;
    font-family: "Mulish";
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 130%; /* 20.8px */

    @media screen and (min-width: $vp-desktop) {
      max-width: 700px;
    }
  }
}

.active {
  color: $white !important;
  stroke: $white !important;
}

.active-bg {
  background-color: #111;
}

.rotate {
  transform: translateY(-3px) rotate(-0deg) !important;
}

.accordion-active {
  max-height: 300px;
  padding: 12px 16px;

  @media screen and (min-width: $vp-mobile) {
    max-height: 300px;
    padding: 16px 20px;
  }

  @media screen and (min-width: $vp-tlandscape) {
    max-height: 300px;
    padding: 16px 32px;
  }
}
</style>
