<template>
  <a class="call" :href="call.whatsapp">
    <svg-icon v-if="$device.isMobileOrTablet" name="whatsapp-outline" class="call__icon" />

    <figure v-else class="figure">
      <svg-icon name="whatsapp" class="figure__icon" />
      <figcaption class="figure__text">
        {{ call.title }}
      </figcaption>
    </figure>
  </a>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'AppCall',

  computed: {
    call() {
      return {
        title: this.$accessor.layout.getCall?.title,
        whatsapp: this.$accessor.layout.getCall?.whatsapp
      };
    }
  }
});
</script>

<style lang="scss" scoped>
.call {
  @include lt-md {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
  }

  &__icon {
    @include lt-md {
      width: 20px;
      height: 20px;
      fill: $color-dark-grey;
    }
  }
}

.figure {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @include lt-md {
    margin: 0;
  }

  &__icon {
    display: block;
    width: 16px;
    height: 16px;
    color: inherit;
    fill: currentColor;

    @include gt-sm {
      margin-right: 7px;
    }
  }

  &__text {
    font-family: $golos-regular;
    font-size: 14px;
    line-height: 24px;
    color: $color-dark-grey;

    &:hover {
      color: lighten($color-dark-grey, 20%);
    }
  }
}
</style>
