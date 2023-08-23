<script lang="ts" setup>
const props = defineProps({
  heading: {
    type: String,
    required: true,
  },
  white: {
    type: Boolean,
    default: false,
  },
  isMap: {
    type: Boolean,
    default: false,
  },
});

const width: Ref<number> = ref(0);
const isActive: Ref<boolean> = ref(false);
const mapWidth: Ref<number> = ref(320);

const widthChange = () => {
  width.value = window.innerWidth;

  if (width.value > 320) {
    mapWidth.value = 480;
  }
  if (width.value > 480) {
    mapWidth.value = 768;
  }
  if (width.value > 768) {
    mapWidth.value = 1024;
  }
  if (width.value > 1024) {
    mapWidth.value = 1160;
  }
};

onMounted(() => {
  width.value = window.innerWidth;

  if (width.value > 320) {
    mapWidth.value = 480;
  }
  if (width.value > 480) {
    mapWidth.value = 768;
  }
  if (width.value > 768) {
    mapWidth.value = 1024;
  }
  if (width.value > 1024) {
    mapWidth.value = 1160;
  }
  window.addEventListener("resize", widthChange);
});

onUnmounted(() => {
  window.removeEventListener("resize", widthChange);
});
</script>

<template>
  <div class="accordion">
    <div
      class="accordion__heading"
      :class="{ 'active-bg': isActive, padding: isMap }"
      @click="isActive = !isActive"
    >
      <h5 :class="{ active: isActive, white: props.white }">
        {{ props.heading }}
      </h5>
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
            :class="{ active: isActive, white: props.white }"
            d="M13 7L7.70711 1.70711C7.31658 1.31658 6.68342 1.31658 6.29289 1.70711L3.75 4.25L1 7"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </span>
    </div>
    <div
      class="accordion__content"
      :class="{ 'accordion-active': isActive, 'map-padding': props.isMap }"
    >
      <p v-if="!props.isMap">
        <slot></slot>
      </p>

      <iframe
        v-else
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1338.1700878522395!2d30.488912908409173!3d50.445524696418246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cff119855245%3A0xf737537a4443d994!2sEvent%20Hall%20Signal!5e0!3m2!1sen!2sua!4v1692741347158!5m2!1sen!2sua"
        :width="mapWidth"
        class="map"
        height="420"
        style="border: 0"
        allowfullscreen="true"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
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
  max-height: 420px;
  padding: 12px 16px;

  @media screen and (min-width: $vp-mobile) {
    max-height: 420px;
    padding: 16px 20px;
  }

  @media screen and (min-width: $vp-tlandscape) {
    max-height: 420px;
    padding: 16px 32px;
  }
}

.white {
  color: $white !important;
  stroke: $white !important;
}

.map-padding {
  padding: 0 !important;
}

.padding {
  padding-left: 46px;
}
</style>
