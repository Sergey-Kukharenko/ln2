<template>
  <div class="product-list">
    <h3 class="product-list__title">Bouquets</h3>
    <checkout-product
      v-for="(product, idx) in positions"
      :id="product.offer_id"
      :key="idx"
      :index="idx"
      :slug="product.offer_slug"
      :title="product.offer_title"
      :price="product.price"
      :size="product.title"
      :qty="product.quantity"
      :image="product.image"
      :is-liked="product.like"
      :real-id="product.offer_real_id"
      :category-name="product.category_name"
      :policy-id="product.policy_id"
      :is-bouquet="product.is_bouquet"
      :old-price="product.old_price"
      :discount="product.discount"
    />
  </div>
</template>

<script>
import CheckoutProduct from '~/components/checkout/CheckoutProduct.vue';

export default {
  name: 'CheckoutProductList',

  components: {
    CheckoutProduct
  },

  props: {
    positions: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.product-list {
  width: 100%;

  @include gt-sm {
    margin-bottom: -12px;
    padding-top: 24px;
  }

  @include lt-md {
    margin-bottom: -2px;
  }

  &__title {
    font-family: $Literata;
    color: $color-dark-grey;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.01em;
    margin: 0;

    @include gt-sm {
      font-size: 20px;
    }

    @include lt-md {
      font-size: 16px;
    }
  }
}
</style>
