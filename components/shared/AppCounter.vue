<template>
  <div class="counter" :class="classes">
    <div class="counter__number">{{ count }}</div>
  </div>
</template>

<script>
export default {
  name: 'AppCounter',

  props: {
    count: {
      type: Number,
      required: true
    },

    size: {
      type: String,
      default: 'small',
      validate(value) {
        return ['small', 'medium'].includes(value);
      }
    },

    theme: {
      type: String,
      default: '',
      validate(value) {
        return ['flat'].includes(value);
      }
    },

    resetPosition: {
      type: Boolean,
      required: false
    }
  },

  computed: {
    classes() {
      return {
        [`counter--size-${this.size}`]: true,
        [`counter--theme-${this.theme}`]: true,
        [`counter--reset-position`]: this.resetPosition
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 20px;
  height: 20px;
  font-family: $golos-medium;
  line-height: 12px;
  border: 2px solid #fff;
  border-radius: 50%;
  box-sizing: border-box;
  right: -11px;
  top: -4px;

  &--reset-position {
    right: inherit;
    top: inherit;
    left: inherit;
    bottom: inherit;
  }

  &__number {
    color: #ffffff;
  }

  &--size-small {
    font-size: 9px;
  }

  &--size-medium {
    font-size: 10px;
  }

  &--theme-flat {
    border: none;
  }
}
</style>
