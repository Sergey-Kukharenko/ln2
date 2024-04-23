<template>
  <div class="app-checkbox" :class="classes" @click="$emit('change', checkboxState.value)">
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
    },

    size: {
      type: String,
      default: '',
      validate(value) {
        return ['', 'md', 'lg'].includes(value);
      }
    },

    align: {
      type: String,
      default: '',
      validate(value) {
        return ['', 'start', 'center'].includes(value);
      }
    }
  },

  computed: {
    classes() {
      return {
        [`app-checkbox--size-${this.size}`]: this.size,
        [`app-checkbox--align-${this.align}`]: this.align
      };
    },
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

  &--align-start {
    align-items: flex-start;
  }

  &--align-center {
    align-items: center;
  }

  &--size-md {
    & .app-checkbox__icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }

  &--size-lg {
    line-height: 130%;

    @include gt-sm {
      letter-spacing: -0.14px;
    }

    @include lt-md {
      font-size: 12px;
      letter-spacing: -0.24px;
    }

    & .app-checkbox__icon {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }
}
</style>
