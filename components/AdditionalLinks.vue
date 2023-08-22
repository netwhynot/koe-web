<script lang="ts" setup>
const props = defineProps({
  axis: {
    type: String,
    default: "horizontal",
    required: false,
  },
});

const style: Ref<{ flexDirection: string; gap: string }> = ref({
  flexDirection: "row",
  gap: "20px",
});

onMounted(() => {
  if (props.axis === "vertical") {
    style.value.flexDirection = "column";
    style.value.gap = "12px";
  }
});

onUpdated(() => {
  if (props.axis === "vertical") {
    style.value.flexDirection = "column";
    style.value.gap = "12px";
  } else {
    style.value.flexDirection = "row";
    style.value.gap = "20px";
  }
});
</script>

<template>
  <div class="additional__links">
    <NuxtLink target="_blank" href="https://discord.gg/ufw94ccK3B"
      ><img src="@/assets/svg/discord.svg" alt="discord"
    /></NuxtLink>
    <NuxtLink target="_blank" href="https://twitch.tv/kyivosuevent"
      ><img src="@/assets/svg/twitch.svg" alt="twitch"
    /></NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.additional__links {
  display: flex;
  flex-direction: v-bind("style.flexDirection");
  gap: v-bind("style.gap");

  @media screen and (min-width: $vp-tablet) {
    margin-bottom: 20px;
  }

  @media screen and (min-width: $vp-tlandscape) {
    justify-content: flex-end;
  }

  & > a {
    height: 44px;

    & > img {
      width: 44px;
      height: 44px;
    }
  }
}
</style>
