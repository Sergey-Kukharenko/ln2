<template>
  <div v-if="value.length" class="size">Bouquet size: {{ value }}</div>
</template>

<script>
export default {
  name: 'CartProductSize',
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
  font-size: 14px;
  line-height: 20px;
  color: $color-white-grey;

  @include lt-lg {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.02em;
  }
}
</style>
