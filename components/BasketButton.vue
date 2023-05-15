<template>
  <button class="basket-button" :class="classes" @click="onClick">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BasketButton',
  props: {
    theme: {
      type: String,
      default: 'green',
      validate(value) {
        return ['green', 'grey', 'white', 'turquoise'].includes(value);
      }
    },

    advancedStylesTheme: {
      type: String,
      default: '',
      validate(value) {
        return ['gift'].includes(value);
      }
    },

    size: {
      type: String,
      default: 'medium',
      validate(value) {
        return ['x-small', 'small', 'medium', 'large'].includes(value);
      }
    },

    align: {
      type: String,
      default: 'left',
      validate(value) {
        return ['left', 'center', 'right'].includes(value);
      }
    },

    stretch: {
      type: Boolean,
      default: false
    },

    sizeNotChange: {
      type: Boolean
    },

    iconOnly: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click'],

  computed: {
    classes() {
      return {
        [`basket-button--size-${this.size}`]: true,
        [`basket-button--align-${this.align}`]: true,
        [`basket-button--theme-${this.theme}`]: true,
        [`basket-button--advanced-theme-${this.advancedStylesTheme}`]: this.advancedStylesTheme,
        'basket-button--width-stretch': this.stretch,
        'basket-button--icon-only': this.iconOnly,
        'basket-button--disabled': this.disabled,

        'basket-button--size-not-change': this.sizeNotChange
      };
    }
  },

  methods: {
    onClick() {
      if (!this.disabled) this.$emit('click');
    }
  }
};
</script>

<style lang="scss" scoped>
.basket-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  box-sizing: border-box;
  border: none;
  outline: none;

  font-family: $golos-regular;
  font-style: normal;

  &--width-stretch {
    width: 100%;
    justify-content: center;
  }

  &--theme-grey {
    background: $bg-grey;
    color: $color-dark-grey;
    border-radius: 10px;
  }

  &--theme-green {
    background: $color-green;
    color: #ffffff;
    border-radius: 10px;
  }

  &--theme-white {
    background: #ffffff;
    color: #26ad4f;
    border-radius: 10px;
    font-family: $golos-regular;
    font-weight: 600;
  }

  &--theme-turquoise {
    color: #000;
    background: #ebfaf0;
  }

  &--advanced-theme-gift {
    flex-shrink: 0;
    height: 36px;
    border-radius: 12.8571px;
  }

  &--size-x-small {
    font-family: $golos-bold;
    height: 32px;
    padding: 0 16px;
    border-radius: 12px;
    font-size: 12px;
    line-height: 16px;
  }

  &--size-small {
    min-width: 102px;
    padding: 0 8px;

    font-size: 14px;
    line-height: 20px;
    justify-content: center;

    @include gt-md {
      height: 36px;
      border-radius: 12px;
    }

    @include lt-lg {
      height: 28px;
      font-size: 12px;
      line-height: 20px;
      border-radius: 8px;
    }

    &.basket-button--icon-only {
      min-width: initial;
      width: 36px;
      padding: 0;
      justify-content: center;

      &:not(&.basket-button--advanced-theme-gift) {
        @include lt-lg {
          width: 28px;
        }
      }
    }

    &.basket-button--size-not-change {
      @include lt-lg {
        height: 36px;
      }
    }

    &.basket-button--advanced-theme-gift {
      @include lt-lg {
        height: 36px;
      }

      @include lt-lg {
        border-radius: 12.8571px;
      }
    }
  }

  &--size-medium {
    height: 44px;
    padding: 0 24px;
    font-size: 16px;
    line-height: 24px;

    &.basket-button--icon-only {
      width: 48px;
      padding: 0;
      justify-content: center;
    }
  }

  &--size-large {
    height: 52px;
    padding: 0 32px;
    font-size: 16px;
    line-height: 24px;

    &.basket-button--icon-only {
      width: 56px;
      padding: 0;
      justify-content: center;
    }

    @include lt-lg {
      height: 44px;
      font-size: 14px;
      line-height: 22px;
      padding: 0 12px;
    }
  }

  &--align-left {
    text-align: left;
    justify-content: flex-start;
  }

  &--align-center {
    text-align: center;
    justify-content: center;
  }

  &--align-right {
    text-align: right;
    justify-content: flex-end;
  }

  &--disabled {
    color: #ffffff;
    background-color: #ccc;
    cursor: none;
  }
}
</style>
