<template>
  <div class="info">
    By clicking on the button, you agree<br />
    to the с <a href="#" class="info__link">Terms of personal data</a> processing
  </div>
</template>

<script>
export default {
  name: 'AppPersonalDataTerms'
};
</script>

<style lang="scss" scoped>
.info {
  font-family: $golos-regular;
  text-align: center;
  color: $color-white-grey;

  @include gt-sm {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
  }

  @include lt-md {
    font-size: 11px;
    line-height: 16px;
  }

  &__link {
    color: $color-green;
  }
}
</style>
