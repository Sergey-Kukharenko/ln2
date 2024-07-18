<template>
  <div class="product-count">Quantity: {{ count }}</div>
</template>

<script>
export default {
  name: 'CheckoutProductCount',

  props: {
    count: {
      type: Number,
      default: 1
    }
  },

  methods: {
    increment() {
      this.passedCount++;
    },

    decrement() {
      this.passedCount--;
    }
  }
};
</script>

<style lang="scss" scoped>
.product-count {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $golos-regular;
  background: $bg-grey;

  @include gt-sm {
    font-size: 14px;
    line-height: 14px;
    width: 100px;
    height: 30px;
    color: $color-dark-grey;
    border-radius: 10px;
  }

  @include lt-lg {
    width: 62px;
    height: 21px;
    font-size: 10px;
    font-weight: 400;
    line-height: 13px;
    letter-spacing: -0.02em;
    color: $color-white-grey;
    border-radius: 6px;
  }
}
</style>
