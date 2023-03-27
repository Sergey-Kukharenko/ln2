<template>
  <div class="product-list">
    <basket-product
      v-for="product in cart"
      :id="product.offer_id"
      :key="concatKeys(product.offer_id, product.title)"
      :slug="product.offer_slug"
      :title="product.offer_title"
      :price="product.price"
      :size="product.title"
      :qty="collection[concatKeys(product.offer_id, product.title)]"
      :image="product.image"
      :is-liked="product.like"
      :real-id="product.offer_real_id"
      :category-name="product.category_name"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BasketProductList',

  computed: {
    ...mapGetters({
      cart: 'cart/getUniqueArray',
      collection: 'cart/getUniqueCollection'
    })
  },

  methods: {
    concatKeys(offerId, title) {
      return `${offerId}|${title}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.product-list {
  width: 100%;
}
</style>
