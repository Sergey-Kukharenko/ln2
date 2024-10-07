<template>
  <div class="app-price-badge">
    {{ price }}
  </div>
</template>

<script>
export default {
  name: 'AppPriceBadge',

  props: {
    price: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.app-price-badge {
  font-family: $golos-medium;
  font-size: 14px;
  letter-spacing: -0.01em;
  color: white;
  background: #26ad4f;
  padding: 0 4px;
  border-radius: 100px;
}
</style>
