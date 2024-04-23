<template>
  <div class="final-details">
    <checkout-gift-card />

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
import CheckoutGiftCard from '~/components/checkout/CheckoutGiftCard.vue';
import CheckoutPaymentMethods from '~/components/checkout/CheckoutPaymentMethods.vue';
import CheckoutPromoCode from '~/components/checkout/CheckoutPromoCode.vue';
import { STRIPE_PAYMENT_METHOD } from '~/data/payment-methods';

export default {
  name: 'CheckoutFinalDetails',

  components: {
    CheckoutPaymentMethods,
    CheckoutGiftCard,
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
