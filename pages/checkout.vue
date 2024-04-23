<template>
  <main class="checkout">
    <div class="checkout__title">
      <checkout-title :title="currStep.title" />
    </div>
    <div class="checkout__container">
      <checkout-delivery-details
        v-show="isDetailsStep"
        :is-clarified="isClarified"
        :today-date="todayDate"
        :curr-checkout-step="currCheckoutStep"
      />
      <checkout-final-details
        v-show="isFinalStep"
        :available-payment-methods="filteredAvailablePaymentMethods"
        :payment-method="getPaymentMethod"
        :order-id="checkout?.id"
        :price="checkoutCost"
        @addPayment="onAddPayment"
      />
    </div>
  </main>
</template>

<script>
import Vue from 'vue';

import CheckoutTitle from '~/components/checkout/CheckoutTitle.vue';
import { EMPTY_CART_MAP } from '~/constants';
import { GTM_EVENTS_MAP } from '~/constants/gtm';
import * as paymentMethods from '~/data/payment-methods';
import authManager from '~/mixins/authManager.vue';
import gtm from '~/mixins/gtm.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'CheckoutPage',

  components: {
    CheckoutTitle,
    CheckoutDeliveryDetails: () => import('~/components/checkout/CheckoutDeliveryDetails.vue'),
    CheckoutFinalDetails: () => import('~/components/checkout/CheckoutFinalDetails.vue')
  },

  mixins: [authManager, gtm],

  beforeRouteLeave(to, _from, next) {
    const isStepChange = to.name === 'basket' && this.currCheckoutStep === 2;

    if (isStepChange) {
      next(false);
      this.$accessor.checkout.SET_STEP(1);

      return;
    }

    next();
  },

  layout: 'checkout',

  data() {
    return {
      tab: false,
      availablePaymentMethods: Object.values(this.$options.PAYMENT_METHODS)
    };
  },

  PAYMENT_METHODS: paymentMethods,

  async fetch({ app: { $accessor } }) {
    try {
      await $accessor.checkout.fetchCheckout();
      await $accessor.checkout.fetchIntervals();
      await $accessor.payment.getClientIdPayPal();
    } catch (err) {
      console.error(err);
    }
  },

  computed: {
    ...accessorMapper('checkout', [
      'checkoutSteps',
      'currCheckoutStep',
      'isClarified',
      'isDetailsStep',
      'isFinalStep',
      'checkoutCost',
      'checkout',
      'todayDate'
    ]),
    ...accessorMapper('cart', ['getCart']),
    ...accessorMapper('payment', ['getPaymentMethod']),

    isStatusPayment() {
      return this.checkout?.status === 'PAYMENT';
    },

    filteredAvailablePaymentMethods() {
      return this.availablePaymentMethods.filter((p) => p.available);
    },

    currStep() {
      return this.checkoutSteps?.find((s) => s.id === this.currCheckoutStep);
    }
  },

  mounted() {
    this.gtmClearItemEvent();
    this.dataLayerSetOriginalUrl();
    this.gtmBeginCheckoutEvent();
  },

  beforeDestroy() {
    this.$accessor.checkout.SET_STEP(1);
  },

  methods: {
    ...accessorMapper('checkout', ['setCheckoutToPay']),

    async submitCheckout() {
      await this.setCheckoutToPay();

      this.$accessor.cart.SET_CART(EMPTY_CART_MAP);
    },

    gtmBeginCheckoutEvent() {
      const items = this.getCart.map((item) => ({
        item_name: item.offer_title,
        item_id: item.offer_real_id,
        price: item.price,
        item_brand: 'myflowers',
        item_category: item.category_name,
        item_variant: item.title,
        quantity: item.quantity
      }));

      this.$gtm.push({
        event: GTM_EVENTS_MAP.beginCheckout,
        ecommerce: {
          items
        }
      });
    },

    onAddPayment(paymentName) {
      const paymentMethodIndex = this.availablePaymentMethods.findIndex((p) => p.title === paymentName);

      if (paymentMethodIndex === -1) {
        return;
      }
      this.availablePaymentMethods[paymentMethodIndex].available = true;
    }
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
