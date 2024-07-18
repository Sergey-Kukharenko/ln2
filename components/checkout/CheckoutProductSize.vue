<template>
  <div v-if="value.length" class="size">Bouquet size: {{ value }}</div>
</template>

<script>
export default {
  name: 'CheckoutProductSize',

  props: {
    value: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.size {
  font-family: $golos-regular;
  font-size: 12px;
  line-height: 16px;
  color: $color-white-grey;

  @include lt-lg {
    font-size: 10px;
    line-height: 13px;
    letter-spacing: -0.02em;
  }
}
</style>
