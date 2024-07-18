<template>
  <div class="product-price">
    <div class="product-price__price">{{ priceWithSign }}</div>
    <div v-if="isOldPriceExist" class="product-price__old-price">{{ oldPriceWithSign }}</div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutProductPrice',
  props: {
    price: {
      type: String,
      default: ''
    },

    oldPrice: {
      type: [String, null],
      default: null
    }
  },
  computed: {
    priceWithSign() {
      return `£${this.price}`;
    },

    isOldPriceExist() {
      return Boolean(this.oldPrice);
    },

    oldPriceWithSign() {
      return `£${this.oldPrice}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.product-price {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  line-height: 1;

  @include lt-lg {
    gap: 6px;
  }

  &__old-price {
    position: relative;
    font-family: $golos-regular;
    font-size: 16px;
    line-height: 16px;
    color: $color-white-grey;

    @include lt-lg {
      font-size: 12px;
      line-height: 16px;
    }

    &:before,
    &:after {
      content: '';
      display: block;
      height: 1px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: -2px;
      right: -2px;
      margin: auto;
      transform: rotate(-10deg);
    }

    &:before {
      top: -1px;
      background: #fff;
    }

    &:after {
      background: #db1838;
    }
  }

  &__price {
    color: #000000;
    font-family: $golos-medium;
    font-weight: 500;
    font-size: 24px;
    line-height: 1;

    @include lt-lg {
      font-size: 16px;
      line-height: 18px;
    }
  }
}
</style>
