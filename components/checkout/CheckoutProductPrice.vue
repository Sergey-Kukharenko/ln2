<template>
  <div class="product-price">
    <div v-if="oldPrice" class="product-price__old">
      <div class="product-price__old-price">£ {{ oldPrice }}</div>
      <div class="product-price__old-percent">-{{ percent.toFixed(0) }}%</div>
    </div>
    <div class="product-price__price">£ {{ price }}</div>
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
      type: String,
      default: ''
    }
  },
  computed: {
    percent() {
      if (!this.oldPrice) return 0;
      return 100 - (this.price / this.oldPrice) * 100;
    }
  }
};
</script>

<style lang="scss" scoped>
.product-price {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;

  @include lt-lg {
    flex-direction: row-reverse;
    gap: 6px;
  }

  &__old {
    display: flex;
    flex-direction: row;
    gap: 8px;
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

    &:before {
      content: '';
      position: absolute;
      z-index: 100;
      left: -2px;
      top: 8px;
      width: 120%;
      height: 1px;
      background-color: #ffffff;
      border-bottom: 1px solid #db1838;
      transform: rotate(-26.07deg);

      @include lt-lg {
        left: -1px;
        width: 110%;
      }
    }
  }

  &__old-percent {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #db1838;
    color: #ffffff;
    border-radius: 8px;
    height: 20px;
    padding: 0 6px;
    font-family: $golos-regular;
    font-size: 11px;
    line-height: 16px;

    @include lt-lg {
      display: none;
    }
  }

  &__price {
    color: #000000;
    font-family: $golos-medium;
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;

    @include lt-lg {
      font-size: 16px;
      line-height: 17.6px;
      letter-spacing: -0.02rem;
    }
  }
}
</style>
