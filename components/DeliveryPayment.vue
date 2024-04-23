<template>
  <div class="payment layout">
    <figure class="payment__picture">
      <img src="/images/info/payment.webp" class="payment__image" alt="payment" />
    </figure>
    <div class="payment__content content">
      <div v-for="(item, index) in $options.PAYMENT" :key="index" class="content__item">
        <div class="content__item-title">{{ item.title }}</div>
        <div class="content__item-text">{{ item.text }}</div>
      </div>
      <div class="payment__variants">
        <div v-for="(variant, index) in $options.DATA_PAYMENT" :key="index" class="payment__variant">
          <img :src="variant.path" alt="" class="payment__variant-icon" />
        </div>
      </div>
      <nuxt-link :to="$options.ALL_CATEGORIES_BUTTON.path" class="payment__button">
        <app-button theme="green" size="pre-x-lg" stretch="full">{{ $options.ALL_CATEGORIES_BUTTON.text }}</app-button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/shared/AppButton.vue';
import { DATA_PAYMENT, PAYMENT } from '@/data/delivery';
import { ALL_CATEGORIES_BUTTON } from '~/constants';

export default {
  name: 'DeliveryPayment',

  components: {
    AppButton
  },

  PAYMENT,
  DATA_PAYMENT,
  ALL_CATEGORIES_BUTTON,

  computed: {
    getImg() {
      return this.$device.isMobileOrTablet ? 'mobile' : 'desktop';
    }
  }
};
</script>

<style lang="scss" scoped>
.payment {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @include lt-md {
    flex-direction: column;
    margin-bottom: 6px;
  }

  &__picture {
    @include lt-md {
      margin-top: 6px;
    }
  }

  &__image {
    display: block;
    width: 100%;
    border-radius: 24px;
  }

  .content {
    @include gt-sm {
      max-width: 526px;
    }

    &__item {
      &:not(:first-child) {
        @include gt-sm {
          margin-top: 24px;
        }
      }
    }

    &__item-title {
      font-family: $golos-medium;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: $color-dark-grey;
      margin-bottom: 8px;

      @include lt-md {
        margin: 24px 0 8px 0;
      }
    }

    &__item-text {
      font-family: $golos-regular;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.01em;
      color: $color-dark-grey;

      @include gt-sm {
        max-width: 321px;
      }
    }
  }

  &__variants {
    display: flex;
    align-items: center;

    @include gt-sm {
      margin-top: 16px;
      gap: 8px;
    }

    @include lt-md {
      margin-top: 12px;
      gap: 9px;
    }
  }

  &__variant {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f7f7f7;
    border-radius: 4px;
    overflow: hidden;

    @include gt-sm {
      width: 48px;
      height: 32px;
    }

    @include lt-md {
      width: 50px;
      height: 32px;
    }
  }

  &__variant-icon {
    display: block;
    width: 100%;
  }

  &__button {
    display: block;

    @include gt-sm {
      width: 410px;
      padding-top: 26px;
    }

    @include lt-md {
      padding-top: 24px;
    }
  }
}
</style>
