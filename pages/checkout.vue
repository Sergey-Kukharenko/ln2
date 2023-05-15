<template>
  <main class="checkout">
    <div class="checkout__recipient">
      <checkout-recipient />
      <!-- @set-self-recipient="setSelfRecipient" -->
    </div>
    <div class="checkout__delivery-details">
      <checkout-delivery-details :is-clarified="isClarified" />
    </div>
    <div class="checkout__date-time">
      <transition>
        <checkout-date-time v-show="!isClarified" />
      </transition>
    </div>
    <div class="checkout__payment-methods">
      <checkout-payment-methods />
    </div>
    <div class="checkout__gift-card">
      <checkout-gift-card />
    </div>
    <div class="checkout__order">
      <checkout-order />
    </div>
    <div class="checkout__email">
      <checkout-email />
    </div>
    <div class="checkout__submit">
      <checkout-payment-button
        :price="checkoutPrice"
        :order-id="checkout?.id"
        :ready-to-pay="readyToPay"
        @submit="submitCheckout"
      />
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import authManager from '~/mixins/authManager';

import { GTM_EVENTS_MAP } from '~/constants/gtm';
import gtmClear from '~/mixins/gtmClear';

export default {
  name: 'CheckoutPage',

  mixins: [authManager, gtmClear],

  layout: 'checkout',

  data() {
    return {
      readyToPay: false,
      tab: false
    };
  },

  computed: {
    ...mapGetters({
      checkout: 'checkout/getCheckout',
      checkoutPrice: 'checkout/checkoutCost',
      isClarified: 'checkout/isClarified',
      cart: 'cart/getCart'
    }),

    isStatusPayment() {
      return this.checkout?.status === 'PAYMENT';
    }
  },

  async mounted() {
    await this.fetchCheckout();

    if (this.isStatusPayment && this.checkout?.id) {
      await this.$router.push({ name: 'order-id', params: { id: this.checkout.id } });
    }

    this.readyToPay = false;

    this.gtmClearItemEvent();
    this.gtmBeginCheckoutEvent();
  },

  methods: {
    ...mapActions({
      setCheckoutToPay: 'checkout/setCheckoutToPay'
    }),

    async fetchCheckout() {
      try {
        await this.$store.dispatch('checkout/fetchCheckout');
      } catch (error) {
        console.error(error);
      }
    },

    async submitCheckout() {
      const { success } = await this.setCheckoutToPay();

      this.readyToPay = success;

      await this.$store.dispatch('cart/fetchCart');
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
    }
  }
};
</script>

<style lang="scss" scoped>
.checkout {
  display: grid;
  grid-template-columns: 1fr 344px;
  grid-template-rows: auto;
  column-gap: 24px;
  max-width: 1080px;

  @include gt-md {
    margin: 38px auto 44px;
  }

  @include lt-lg {
    display: block;
    padding: 0 16px;
    margin: 16px auto 44px;
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

  &__recipient {
    grid-area: 1 / 1 / 2 / 2;
  }

  &__delivery-details {
    grid-area: 2 / 1 / 3 / 2;
  }

  &__date-time {
    grid-area: 3 / 1 / 4 / 2;
  }

  &__payment-methods {
    grid-area: 4 / 1 / 5 / 2;
  }

  &__gift-card {
    grid-area: 5 / 1 / 6 / 2;
  }

  &__order {
    grid-area: 1 / 2 / 8 / 3;
  }

  &__email {
    grid-area: 6 / 1 / 7 / 2;
  }

  &__submit {
    margin-bottom: 30px;
  }
}
</style>
