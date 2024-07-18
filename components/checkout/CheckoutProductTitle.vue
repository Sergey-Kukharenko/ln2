<template>
  <div class="title">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-family: $golos-regular;
  font-size: 14px;
  line-height: 18.2px;
  color: $color-dark-grey;
  letter-spacing: -0.01em;

  @include lt-lg {
    font-size: 12px;
    line-height: 15.6px;
    color: $color-dark-grey;
    letter-spacing: -0.02em;
  }
}
</style>
