<template>
  <div class="checkout-details">
    <checkout-recipient />

    <div class="checkout-details__clarify">
      <checkout-clarify :status="isClarified" />
    </div>

    <checkout-delivery :is-clarified="isClarified" />

    <checkout-intervals v-if="todayDate" :is-clarified="isClarified" />

    <div class="checkout-details__button">
      <checkout-continue-button :curr-checkout-step="currCheckoutStep" />
    </div>
  </div>
</template>

<script>
import CheckoutRecipient from '~/components/checkout/CheckoutRecipient';
import CheckoutDelivery from '~/components/checkout/CheckoutDelivery';
import CheckoutContinueButton from '~/components/checkout/CheckoutContinueButton';
import CheckoutClarify from '~/components/checkout/CheckoutClarify.vue';

export default {
  name: 'CheckoutDeliveryDetails',

  components: {
    CheckoutClarify,
    CheckoutRecipient,
    CheckoutDelivery,
    CheckoutContinueButton,
    CheckoutIntervals: () => import('~/components/checkout/CheckoutIntervals')
  },

  props: {
    isClarified: {
      type: Boolean,
      default: false
    },

    todayDate: {
      type: String,
      default: ''
    },

    currCheckoutStep: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style lang="scss" scoped>
.checkout-details {
  &__clarify {
    @include gt-sm {
      padding-top: 16px;
    }

    @include lt-md {
      padding-top: 18px;
    }
  }

  &__button {
    @include gt-sm {
      padding-top: 16px;
    }

    @include lt-md {
      padding-top: 26px;
    }
  }
}
</style>
