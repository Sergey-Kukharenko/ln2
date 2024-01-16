<template>
  <div class="order-panel-body">
    <div v-for="(value, key, idx) in pairs" :key="idx" class="row">
      <span class="key">{{ key }}:</span>
      <span :id="`${name}-${key}`" class="value">{{ value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderPanelBody',

  props: {
    name: {
      type: String,
      default: ''
    },

    pairs: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style scoped lang="scss">
.order-panel-body {
  margin-top: 8px;
}

.row {
  font-family: $golos-regular;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: $color-dark-grey;
}

.key {
  text-transform: capitalize;
  color: $color-white-grey;
}
</style>
