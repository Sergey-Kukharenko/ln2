<template>
  <div class="app-radio" @click="$emit('change', name)">
    <svg-icon v-if="hasIcon" class="app-radio__icon" :name="statusIcon" />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppRadio',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: {
      type: [String, Number, Boolean],
      require: true,
      default: ''
    },

    name: {
      type: [String, Number, Boolean],
      require: true,
      default: ''
    },

    hasIcon: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    statusIcon() {
      return this.value === this.name ? 'radio-on' : 'radio-off';
    }
  }
};
</script>

<style lang="scss" scoped>
.app-radio {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: default;
  user-select: none;
  font-family: $golos-regular;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: $color-dark-grey;

  &__icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
}
</style>
