<template>
  <div class="cart">
    <cart-title />
    <template v-if="!cartPending">
      <cart-container v-if="isCartExist" />
      <cart-empty v-else />
      <app-benefits :benefits="$options.BENEFITS" />
    </template>
  </div>
</template>

<script>
import Vue from 'vue';

import AppBenefits from '~/components/AppBenefits.vue';
import CartTitle from '~/components/CartTitle.vue';
import benefits from '~/mocks/benefits';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'CartPage',
  components: {
    AppBenefits,
    CartEmpty: () => import('~/components/CartEmpty.vue'),
    CartContainer: () => import('~/components/CartContainer.vue'),
    CartTitle
  },

  BENEFITS: benefits,

  head: {
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
      }
    ]
  },

  computed: {
    ...accessorMapper('cart', ['cartPending', 'isCartExist'])
  }

  // created() {
  //   this.$accessor.gifts.fetchGiftCards();
  // }
});
</script>
