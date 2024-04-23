<template>
  <div class="checkout-total">
    <div class="checkout-total__value">
      Order total: <span class="checkout-total__value--curr">£ {{ showPrice(checkoutCost?.totalSum || 0) }}</span>
      <span v-if="oldPrice" class="checkout-total__value--old">{{ showPrice(oldPrice) }}</span>
    </div>
    <div class="checkout-total__steps">
      <checkout-steps :step="currCheckoutStep" :steps="checkoutSteps" />
    </div>
  </div>
</template>

<script>
import CheckoutSteps from '~/components/checkout/CheckoutSteps.vue';

export default {
  name: 'CheckoutTotal',

  components: {
    CheckoutSteps
  },

  props: {
    currCheckoutStep: { type: Number, default: 1 },
    checkoutSteps: { type: Array, default: () => [] },
    checkoutCost: { type: Object, default: () => ({}) }
  },

  computed: {
    oldPrice() {
      return this.checkoutCost.sale ? this.checkoutCost?.totalSum + +this.checkoutCost?.sale : 0;
    }
  },

  methods: {
    showPrice(num = 0) {
      return Number(num).toFixed(2) || 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.checkout-total {
  text-align: center;

  &__value {
    font-family: $golos-medium;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.02em;

    @include lt-lg {
      font-size: 14px;
      line-height: 18px;
      letter-spacing: -0.01em;
    }

    &--old {
      position: relative;
      font-family: $golos-medium;
      font-size: 16px;
      font-weight: 500;
      line-height: 18px;
      letter-spacing: -0.02em;

      &::after {
        position: absolute;
        display: block;
        top: 50%;
        right: -1px;
        content: '';
        width: 100%;
        height: 1px;
        border-radius: 25px;
        background: rgba(219, 24, 56, 1);
        transform: rotate(-20deg);

        @include lt-lg {
          width: 100%;
          height: 0.8px;
        }
      }

      @include lt-lg {
        font-size: 12px;
        line-height: 16px;
        letter-spacing: -0.01em;
      }
    }
  }

  &__steps {
    display: flex;
    justify-content: center;
  }
}
</style>
