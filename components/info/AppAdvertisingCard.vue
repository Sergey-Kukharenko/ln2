<template>
  <nuxt-link class="card" :style="styles" :to="$options.ALL_CATEGORIES_BUTTON.path">
    <div class="card__content">
      <div class="card__content-title">{{ title }}</div>
      <div class="card__content-text">{{ text }}</div>
    </div>
    <app-button theme="green-white" class="card__button">{{ $options.ALL_CATEGORIES_BUTTON.text }}</app-button>
  </nuxt-link>
</template>

<script>
import AppButton from '@/components/shared/AppButton.vue';
import { ALL_CATEGORIES_BUTTON } from '~/constants';

export default {
  name: 'AppAdvertisingCard',

  components: {
    AppButton
  },

  props: {
    bgColor: {
      type: String,
      default: ''
    },

    image: {
      type: String,
      default: ''
    },

    title: {
      type: String,
      default: ''
    },

    text: {
      type: String,
      default: ''
    }
  },

  ALL_CATEGORIES_BUTTON,

  computed: {
    styles() {
      return {
        background: `${this.bgColor} url(${this.image}) no-repeat 100% 0`,
        backgroundSize: this.$device.isMobileOrTablet ? '50%' : '60%'
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;

  border-radius: 24px;
  background-blend-mode: darken;

  @include gt-sm {
    flex: 1;
    height: 252px;
    padding: 32px 24px;
  }

  @include lt-md {
    height: 128px;
    padding: 24px;
  }

  &__content {
    display: flex;
    flex-direction: column;

    @include gt-sm {
      gap: 16px;
    }

    @include lt-md {
      gap: 12px;
    }
  }

  &__content-title {
    font-family: $golos-medium;
    font-style: normal;
    font-weight: 600;
    color: $color-dark-grey;

    @include gt-sm {
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0.01em;
    }

    @include lt-md {
      font-size: 16px;
      line-height: 20px;
    }
  }

  &__content-text {
    font-family: $golos-regular;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: $color-dark-grey;

    @include gt-sm {
      font-size: 18px;
      max-width: 177px;
    }

    @include lt-md {
      font-size: 14px;
      max-width: 138px;
    }
  }

  &__button {
    position: absolute;
    bottom: 32px;

    @include lt-md {
      display: none;
    }
  }
}
</style>
