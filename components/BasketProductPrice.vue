<template>
  <div class="product-price">
    <div class="product-price__price">{{ priceWithSign }}</div>
    <div v-if="isOldPriceExist" class="product-price__old-price">{{ oldPriceWithSign }}</div>
  </div>
</template>

<script>
export default {
  name: 'BasketProductPrice',
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
      return `£ ${this.price}`;
    },

    isOldPriceExist() {
      return Boolean(this.oldPrice);
    },

    oldPriceWithSign() {
      return `£ ${this.oldPrice}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.product-price {
  display: flex;
  gap: 8px;
  line-height: 1;
  align-items: flex-end;

  @include gt-sm {
    min-width: 111px;
  }

  @include lt-lg {
    gap: 6px;
  }

  &__old-price {
    position: relative;
    font-family: $golos-regular;
    font-size: 16px;
    line-height: 16px;
    color: $color-white-grey;
    margin: 0 0 6px 0;

    @include lt-lg {
      font-size: 12px;
      line-height: 16px;
      margin: 0;
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
    font-size: 32px;
    line-height: 40px;

    @include lt-lg {
      font-size: 18px;
      line-height: 20px;
    }
  }
}
</style>
