<template>
  <div class="final-details">
    <checkout-gift-card v-if="isGiftCardVisible" :gift-card-list="giftCards" />

    <checkout-payment-methods :available-payment-methods="availablePaymentMethods" />

    <checkout-promo-code />

    <checkout-email />

    <div class="final-details__submit">
      <payment-button
        :payment-method="paymentMethod"
        :order-id="orderId"
        :price="price"
        @addPayment="$emit('on-add-payment', $event)"
      />
    </div>
  </div>
</template>

<script>
import PaymentButton from '~/components/PaymentButton.vue';
import CheckoutEmail from '~/components/checkout/CheckoutEmail.vue';
import CheckoutPaymentMethods from '~/components/checkout/CheckoutPaymentMethods.vue';
import CheckoutPromoCode from '~/components/checkout/CheckoutPromoCode.vue';
import { GIFT_CARD_COOKIE } from '~/constants';
import { STRIPE_PAYMENT_METHOD } from '~/data/payment-methods';

export default {
  name: 'CheckoutFinalDetails',

  components: {
    CheckoutPaymentMethods,
    CheckoutGiftCard: () => import('~/components/checkout/CheckoutGiftCard.vue'),
    CheckoutPromoCode,
    CheckoutEmail,
    PaymentButton
  },

  props: {
    availablePaymentMethods: {
      type: Array,
      required: true
    },

    orderId: {
      type: String,
      default: ''
    },

    price: {
      type: Object,
      default: () => ({})
    },

    totalCost: {
      type: String,
      default: ''
    },

    paymentMethod: {
      type: String,
      default: STRIPE_PAYMENT_METHOD.name
    }
  },

  computed: {
    giftCards() {
      return this.$accessor.gifts.getGiftCards;
    },

    isGiftCardExist() {
      return !!this.$accessor.checkout.getGiftCard?.offer_id;
    },

    iSGiftCardTextExist() {
      return !!this.$accessor.checkout.getGiftCard?.gift_card_text;
    },

    isGiftCardListExist() {
      return !!this.giftCards.length;
    },

    isGiftCardVisible() {
      return (
        !this.$cookies.get(GIFT_CARD_COOKIE) &&
        this.isGiftCardListExist &&
        this.$accessor.checkout.currCheckoutStep === 2
      );
    }
  },

  created() {
    if (this.$cookies.get(GIFT_CARD_COOKIE) && (!this.isGiftCardExist || !this.iSGiftCardTextExist)) {
      this.$cookies.remove(GIFT_CARD_COOKIE);
    }
  }
};
</script>

<style lang="scss" scoped>
.final-details {
  &__submit {
    margin-top: 16px;

    @include lt-lg {
      background: #ffffff;
      border-radius: 0 0 12px 12px;
      padding: 0 12px 0 12px;
    }
  }
}
</style>
