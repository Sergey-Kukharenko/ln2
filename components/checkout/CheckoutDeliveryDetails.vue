<template>
  <div class="checkout-details">
    <checkout-recipient />

    <div class="checkout-details__clarify">
      <checkout-clarify :status="isClarified" />
    </div>

    <checkout-delivery :is-clarified="isClarified" />

    <checkout-intervals v-if="todayDate" :is-clarified="isClarified" />

    <div class="checkout-details__button">
      <checkout-continue-button :is-clarified="isClarified" />
    </div>
  </div>
</template>

<script>
import CheckoutClarify from '~/components/checkout/CheckoutClarify.vue';
import CheckoutContinueButton from '~/components/checkout/CheckoutContinueButton.vue';
import CheckoutDelivery from '~/components/checkout/CheckoutDelivery.vue';
import CheckoutRecipient from '~/components/checkout/CheckoutRecipient.vue';

export default {
  name: 'CheckoutDeliveryDetails',

  components: {
    CheckoutClarify,
    CheckoutRecipient,
    CheckoutDelivery,
    CheckoutContinueButton,
    CheckoutIntervals: () => import('~/components/checkout/CheckoutIntervals.vue')
  },

  props: {
    isClarified: {
      type: Boolean,
      default: false
    },

    todayDate: {
      type: String,
      default: ''
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
