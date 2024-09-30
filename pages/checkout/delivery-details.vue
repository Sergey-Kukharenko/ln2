<template>
  <main class="checkout">
    <div class="checkout__title">
      <checkout-title :title="$options.CHECKOUT_STEPS.delivery.title" />
    </div>
    <div class="checkout__container">
      <checkout-delivery-details :is-clarified="isClarified" :today-date="todayDate" />
    </div>
  </main>
</template>

<script>
import Vue from 'vue';

import CheckoutTitle from '~/components/checkout/CheckoutTitle.vue';
import { CHECKOUT_STEPS } from '~/constants';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'CheckoutPage',

  components: {
    CheckoutTitle,
    CheckoutDeliveryDetails: () => import('~/components/checkout/CheckoutDeliveryDetails.vue')
  },

  layout: 'checkout',

  CHECKOUT_STEPS,

  computed: {
    ...accessorMapper('checkout', ['isClarified', 'todayDate'])
  }
});
</script>

<style lang="scss" scoped>
.checkout {
  display: flex;
  flex-direction: column;
  max-width: 526px;

  @include gt-md {
    margin: 0px auto 44px;
  }

  @include lt-lg {
    padding: 0 8px 32px 8px;
  }

  .v-enter-active {
    overflow: hidden;
    animation: show-in 0.5s;
  }
  .v-leave-active {
    overflow: hidden;
    animation: show-in 0.5s reverse;
  }

  @keyframes show-in {
    0% {
      opacity: 0;
      height: 0%;
    }
    100% {
      opacity: 1;
      height: 70%;
    }
  }

  &__title {
    margin: 32px 0 0 0;
  }

  &__container {
    margin-top: 24px;
  }
}
</style>
