<template>
  <div class="product-list">
    <cart-product
      v-for="product in getCart"
      :id="product.offer_id"
      :key="product.offer_id"
      :slug="product.offer_slug"
      :title="product.offer_title"
      :price="product.price"
      :size="product.title"
      :qty="product.quantity"
      :image="product.image"
      :is-liked="product.like"
      :real-id="product.offer_real_id"
      :category-name="product.category_name"
      :gift-card-text="product.gift_card_text"
      :policy-id="product.policy_id"
      :is-bouquet="product.is_bouquet"
      :old-price="product.old_price"
      :discount="product.discount"
    />
  </div>
</template>

<script>
import Vue from 'vue';

import CartProduct from '~/components/CartProduct.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'CartProductList',

  components: { CartProduct },

  computed: {
    ...accessorMapper('cart', ['getCart'])
  }
});
</script>

<style lang="scss" scoped>
.product-list {
  width: 100%;

  @include lt-lg {
    width: calc(100% - 32px);
    padding: 0 16px;
  }
}
</style>
