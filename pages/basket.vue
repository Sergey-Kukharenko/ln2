<template>
  <div class="basket">
    <basket-title />
    <template v-if="!cartPending">
      <basket-container v-if="isCartExist" />
      <basket-empty v-else />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BasketPage',
  layout: 'basket',
  head: {
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
      }
    ]
  },

  computed: {
    ...mapGetters({
      isCartExist: 'cart/isCartExist',
      cartPending: 'cart/cartPending'
    })
  }
};
</script>
