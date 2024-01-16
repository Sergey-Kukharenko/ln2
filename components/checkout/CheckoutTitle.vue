<template>
  <div class="checkout-title">
    <h2>
      {{ title }}
    </h2>
  </div>
</template>

<script>
export default {
  name: 'CheckoutTitle',

  props: {
    title: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.checkout-title {
  @include gt-sm {
    text-align: center;
  }

  & > h2 {
    margin: 0;

    @include gt-sm {
      font-size: 28px;
      line-height: 32px;
    }

    @include lt-lg {
      font-size: 20px;
      line-height: 24px;
      letter-spacing: -0.2px;
    }
  }
}
</style>
