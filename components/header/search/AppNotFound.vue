<template>
  <div class="not-found">
    <h3 class="not-found__title">Alas, there is nothing</h3>
    <div class="not-found__desc">
      <p class="not-found__text">Unfortunately, we didn't find anything.</p>
      <p class="not-found__text">Adjust your request or go to the catalog.</p>
    </div>

    <nuxt-link :to="$options.ALL_CATEGORIES_BUTTON.path" class="not-found__button">
      <app-button stretch="fix">{{ $options.ALL_CATEGORIES_BUTTON.text }}</app-button>
    </nuxt-link>
  </div>
</template>

<script>
import AppButton from '~/components/shared/AppButton.vue';
import { ALL_CATEGORIES_BUTTON } from '~/constants';

export default {
  name: 'AppNotFound',

  components: { AppButton },

  ALL_CATEGORIES_BUTTON
};
</script>

<style lang="scss" scoped>
.not-found {
  @include gt-sm {
    padding: 40px 0 38px;
  }

  @include lt-md {
    padding: 34px 0 38px;
  }

  &__title {
    font-family: $golos-bold;
    margin: 0;

    @include gt-sm {
      font-size: 24px;
      line-height: 28px;
    }

    @include lt-md {
      font-size: 20px;
      line-height: 24px;
    }
  }

  &__desc {
    font-family: $golos-regular;

    @include gt-sm {
      font-size: 16px;
      line-height: 24px;
      margin: 16px 0 24px;
    }

    @include lt-md {
      font-size: 14px;
      line-height: 20px;
      margin-top: 12px;
    }
  }

  &__text {
    padding: 0;
    margin: 0;
  }

  &__button {
    display: inline-block;
  }
}
</style>
