<template>
  <div v-if="value.length" class="package">Package: {{ value }}</div>
</template>

<script>
export default {
  name: 'CartProductPackage',
  props: {
    value: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.package {
  font-family: $golos-regular;
  font-size: 14px;
  line-height: 20px;
  color: #7c7c7c;

  @include lt-lg {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.02em;
  }
}
</style>
