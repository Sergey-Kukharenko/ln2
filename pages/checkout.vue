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
        :payment-method="paymentMethod"
        :order-id="checkout?.id"
        :price="checkoutPrice"
        @addPayment="onAddPayment"
      />
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import CheckoutTitle from '~/components/checkout/CheckoutTitle';

import authManager from '~/mixins/authManager';
import { GTM_EVENTS_MAP } from '~/constants/gtm';
import gtm from '~/mixins/gtm.vue';
import * as paymentMethods from '~/data/payment-methods';

export default {
  name: 'CheckoutPage',

  components: {
    CheckoutTitle,
    CheckoutDeliveryDetails: () => import('~/components/checkout/CheckoutDeliveryDetails'),
    CheckoutFinalDetails: () => import('~/components/checkout/CheckoutFinalDetails')
  },

  mixins: [authManager, gtm],

  beforeRouteLeave(to, from, next) {
    const isStepChange = to.name === 'basket' && this.currCheckoutStep === 2;

    if (isStepChange) {
      next(false);
      this.$store.dispatch('checkout/setCheckoutStep', 1);

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

  async fetch({ store }) {
    try {
      await store.dispatch('checkout/fetchCheckout');
      await store.dispatch('checkout/fetchIntervals');
      await store.dispatch('payment/getClientIdPayPal');
    } catch (err) {
      console.error(err);
    }
  },

  computed: {
    ...mapState('checkout', ['checkoutSteps', 'currCheckoutStep']),

    ...mapGetters({
      checkout: 'checkout/getCheckout',
      checkoutPrice: 'checkout/checkoutCost',
      isClarified: 'checkout/isClarified',
      cart: 'cart/getCart',
      todayDate: 'checkout/getTodayDate',
      paymentMethod: 'payment/getPaymentMethod',
      isDetailsStep: 'checkout/isDetailsStep',
      isFinalStep: 'checkout/isFinalStep'
    }),

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
    this.$store.dispatch('checkout/setCheckoutStep', 1);
  },

  methods: {
    ...mapActions({
      setCheckoutToPay: 'checkout/setCheckoutToPay'
    }),

    initOrder() {
      this.$fetch();
    },

    async submitCheckout() {
      await this.setCheckoutToPay();

      this.$store.commit('cart/setCart', null);
    },

    gtmBeginCheckoutEvent() {
      const items = this.cart.map((item) => ({
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
};
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
