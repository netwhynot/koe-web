<template>
  <div class="heading-align">
    <h3 class="heading">
      <slot></slot>
    </h3>
  </div>
</template>

<style lang="scss" scoped>
.heading-align {
  @media screen and (min-width: $vp-tlandscape) {
    display: flex;
    justify-content: center;
  }
}

.heading {
  position: relative;
  display: inline-block;
  max-width: 200px;
  margin: 0;
  margin-left: 20px;
  color: $white;
  font-family: "Furore";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 26px */
  letter-spacing: 2px;

  @media screen and (min-width: $vp-mobile) {
    max-width: unset;
  }

  @media screen and (min-width: $vp-tlandscape) {
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: calc(100% + 12px);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: $main;
      transform: translateY(-50%);

      @media screen and (min-width: $vp-mobile) {
        top: 50%;
      }
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    right: calc(100% + 12px);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $main;
    transform: translateY(-50%);

    @media screen and (min-width: $vp-mobile) {
      top: 50%;
    }
  }
}
</style>
