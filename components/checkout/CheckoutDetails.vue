<template>
  <div class="checkout-details">
    <checkout-product-list :positions="checkoutPositions" />
    <checkout-order-items :cost="positionsCost" :positions-count="positionsCount" />
    <div class="checkout-detail__shadow" />
  </div>
</template>

<script>
import Vue from 'vue';

import CheckoutOrderItems from '~/components/checkout/CheckoutOrderItems.vue';
import CheckoutProductList from '~/components/checkout/CheckoutProductList.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'CheckoutDetails',

  components: { CheckoutProductList, CheckoutOrderItems },

  computed: {
    ...accessorMapper('checkout', ['checkoutPositions', 'checkoutCost']),

    positionsCount() {
      return this.checkoutPositions?.length;
    },

    positionsCost() {
      const { positionsCost: itemsCost, deliveryAmount, totalSum } = this.checkoutCost;
      const totalCost = Number(totalSum).toFixed(2);

      return {
        itemsCost: `£ ${itemsCost}`,
        deliveryAmount,
        totalSum: `£ ${totalCost}`
      };
    }
  }
});
</script>

<style lang="scss" scoped>
.checkout-details {
  background: #fff;

  @include gt-sm {
    max-width: 526px;
    margin: 0 auto;
  }

  @include lt-lg {
    padding: 0 8px 16px;
  }
}
</style>
