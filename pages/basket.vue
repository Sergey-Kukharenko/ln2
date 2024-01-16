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
import { mapState, mapGetters } from 'vuex';
import BasketTitle from '~/components/BasketTitle.vue';

export default {
  name: 'BasketPage',
  components: {
    BasketEmpty: () => import('~/components/BasketEmpty.vue'),
    BasketContainer: () => import('~/components/BasketContainer.vue'),
    BasketTitle
  },

  head: {
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
      }
    ]
  },

  computed: {
    ...mapState('cart', ['cartPending']),

    ...mapGetters({
      isCartExist: 'cart/isCartExist'
    })
  }
};
</script>
