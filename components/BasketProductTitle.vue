<template>
  <div class="title">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-family: $golos-regular;
  font-size: 16px;
  line-height: 20px;
  color: $color-dark-grey;
  margin-bottom: 4px;

  @include lt-lg {
    font-size: 14px;
    line-height: 18px;
    color: #010810;
    letter-spacing: -0.02em;
  }
}
</style>
