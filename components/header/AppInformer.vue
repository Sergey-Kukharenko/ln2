<template>
  <figure class="informer">
    <svg-icon name="opening-hours" class="informer__icon" />
    <figcaption class="informer__text">
      {{ footer.mode }}
    </figcaption>
  </figure>
</template>

<script>
import Vue from 'vue';

import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AppInformer',

  computed: {
    ...accessorMapper('layout', ['footer'])
  }
});
</script>

<style lang="scss" scoped>
.informer {
  @include gt-sm {
    display: flex;
    align-items: center;
  }

  @include lt-md {
    display: none;
  }

  &__icon {
    @include gt-sm {
      flex-shrink: 0;
      width: 16.07px;
      height: 17.14px;
      fill: $color-dark-grey;
    }
  }

  &__text {
    @include gt-sm {
      flex: 1;
      max-width: 165px;
      font-family: $golos-medium;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.01em;
      color: $color-dark-grey;
      margin-left: 14px;
    }
  }
}
</style>
