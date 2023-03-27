<template>
  <div class="app-checkbox" @click="$emit('change', checkboxState.value)">
    <svg-icon class="app-checkbox__icon" :name="checkboxState.icon" />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppCheckbox',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: {
      type: [String, Number, Array, Boolean],
      require: true,
      default: ''
    },
    name: {
      type: [String, Number],
      require: true,
      default: ''
    }
  },

  computed: {
    // TODO: логику управления состоянием нужно доработать, добавить Boolean value.

    checkboxState() {
      return (Array.isArray(this.value) && this.value.includes(this.name)) || this.name === this.value
        ? { value: null, icon: 'checkbox-on' }
        : { value: this.name, icon: 'checkbox-off' };
    }
  }
};
</script>

<style lang="scss" scoped>
.app-checkbox {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  cursor: default;
  user-select: none;
  flex-shrink: 0;
  max-width: 100%;

  font-family: $golos-regular;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: $color-dark-grey;

  &__icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
}
</style>
