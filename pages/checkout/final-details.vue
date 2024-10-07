<template>
  <main class="checkout">
    <div class="checkout__title">
      <checkout-title :title="$options.CHECKOUT_STEPS.final.title" />
    </div>
    <div class="checkout__container">
      <checkout-final-details
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
import { CHECKOUT_STEPS, EMPTY_CART_MAP } from '~/constants';
import { GTM_EVENTS_MAP } from '~/constants/gtm';
import * as paymentMethods from '~/data/payment-methods';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'CheckoutPage',

  components: {
    CheckoutTitle,
    CheckoutFinalDetails: () => import('~/components/checkout/CheckoutFinalDetails.vue')
  },

  CHECKOUT_STEPS,

  layout: 'checkout',

  data() {
    return {
      tab: false,
      availablePaymentMethods: Object.values(this.$options.PAYMENT_METHODS),
      finalEventSent: false
    };
  },

  PAYMENT_METHODS: paymentMethods,

  computed: {
    ...accessorMapper('checkout', ['checkoutCost', 'checkout']),
    ...accessorMapper('payment', ['getPaymentMethod']),

    filteredAvailablePaymentMethods() {
      return this.availablePaymentMethods.filter((p) => p.available);
    }
  },

  watch: {
    isFinalStep(value) {
      if (this.finalEventSent || !value) {
        return;
      }

      this.gtmCheckoutFinalDetailsEvent();
      this.finalEventSent = true;
    }
  },

  created() {
    this.$accessor.gifts.fetchGiftCards();
  },

  mounted() {
    // this.rewriteHistory();
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

    gtmCheckoutFinalDetailsEvent() {
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
        event: GTM_EVENTS_MAP.checkout2,
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
    },

    rewriteHistory() {
      ['/', '/basket', '/checkout/delivery-details', '/checkout/final-details'].forEach((uri) => {
        history.pushState(null, null, uri);
      });
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
