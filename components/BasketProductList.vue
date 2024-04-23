<template>
  <div class="product-list">
    <basket-product
      v-for="(product, idx) in getCart"
      :id="product.offer_id"
      :key="idx"
      :slug="product.offer_slug"
      :title="product.offer_title"
      :price="product.price"
      :size="product.title"
      :qty="product.quantity"
      :image="product.image"
      :is-liked="product.like"
      :real-id="product.offer_real_id"
      :category-name="product.category_name"
    />
  </div>
</template>

<script>
import Vue from 'vue';

import BasketProduct from '~/components/BasketProduct.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'BasketProductList',

  components: { BasketProduct },

  computed: {
    ...accessorMapper('cart', ['getCart'])
  }
});
</script>

<style lang="scss" scoped>
.product-list {
  width: 100%;
}
</style>
