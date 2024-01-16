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
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #7c7c7c;

  @include lt-lg {
    font-size: 10px;
    line-height: 13px;
    letter-spacing: -0.02em;
  }
}
</style>
