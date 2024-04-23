<template>
  <div class="payment__button">
    <checkout-submit :price="price" :disabled="loading" @submit="submitCheckout" />
  </div>
</template>

<script>
import Vue from 'vue';

import { accessorMapper } from '~/store';

export default Vue.extend({
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
    }
  },

  data() {
    return {
      loading: false
    };
  },

  methods: {
    ...accessorMapper('checkout', ['setCheckoutToPay']),

    async submitCheckout() {
      if (this.loading) {
        return;
      }

      this.loading = true;
      await this.setCheckoutToPay();
      await this.$router.push({ name: 'payment-stripe' });
    }
  }
});
</script>

<style lang="scss" scoped>
.payment__button {
  @include lt-lg {
    background: #ffffff;
    border-radius: 0 0 12px 12px;
    padding: 0px 12px 16px 12px;
  }
}
</style>
