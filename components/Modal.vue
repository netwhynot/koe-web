<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    default: "#fff",
  },
  bg: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close"]);
const isActive = ref(false);

onMounted(() => {
  setTimeout(() => (isActive.value = true), 100);
});

onUnmounted(() => {
  isActive.value = false;
});
</script>

<template>
  <div class="modal" :class="{ 'bg-active': isActive }" @click="emit('close')">
    <div
      class="modal__content"
      :class="{ active: isActive, 'bg-pattern': bg }"
      @click.stop
    >
      <span class="icon"></span>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  opacity: 0;
  pointer-events: none;
  background-color: rgba($color: #000, $alpha: 0.6);
  transition: opacity 0.3s ease;
}

.modal__content {
  position: relative;
  max-width: 240px;
  text-align: center;
  padding: 52px 20px 20px 20px;
  transform: scale(0);
  transition: transform 0.3s ease;
  background-color: v-bind("props.color");

  @media screen and (min-width: $vp-mobile) {
    max-width: 392px;
  }

  @media screen and (min-width: $vp-desktop) {
    padding: 72px 40px 20px 40px;
  }
}

.bg-active {
  opacity: 1;
  pointer-events: all;
}

.active {
  transform: scale(1);
}

.bg-pattern {
  background-image: url("@/assets/svg/bg-pattern.svg");
  background-repeat: no-repeat;
  background-position: center;
}
</style>
