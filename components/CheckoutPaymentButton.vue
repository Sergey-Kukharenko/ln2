<template>
  <div class="payment__button">
    <checkout-submit :price="price" :disabled="loading" @submit="submitCheckout" />
  </div>
</template>

<script>
export default {
  name: 'CheckoutPaymentButton',

  props: {
    orderId: {
      type: String,
      default: ''
    },

    price: {
      type: Object,
      default: () => ({})
    },

    fastDeliveryKey: {
      type: String,
      default: ''
    },

    readyToPay: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      clientSecret: '',
      loading: false
    };
  },

  watch: {
    readyToPay(val) {
      if (!val) {
        return;
      }

      this.goToStripePayment();
    }
  },

  methods: {
    submitCheckout() {
      if (this.loading) {
        return;
      }

      this.$emit('submit');
      this.loading = true;
    },

    goToStripePayment() {
      this.$router.push({ name: 'payment-stripe' });
    }
  }
};
</script>
