<template>
  <div class="app-input" :class="classes">
    <div class="app-input__field" :style="styles">
      <slot name="left" />
      <input
        :type="type"
        :min="min"
        :maxlength="max"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :pattern="pattern"
        :inputmode="inputmode"
        :autocomplete="autocomplete"
        v-bind="$attrs"
        v-on="listeners"
        @input="onInput"
      />
      <slot name="right" />
    </div>
    <div v-if="error" class="app-input__error">
      {{ error }}
    </div>
    <div v-if="success" class="app-input__success">
      {{ success }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: '',
      validate(value) {
        return ['text', 'password', 'number', 'search'].includes(value);
      }
    },
    name: {
      type: String,
      default: ''
    },
    pattern: {
      type: String,
      default: '[^]*'
    },
    inputmode: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      required: true,
      default: ''
    },
    min: {
      type: [String, Number],
      default: ''
    },
    max: {
      type: [String, Number],
      default: ''
    },
    size: {
      type: String,
      default: 'medium',
      validate(value) {
        return ['small', 'medium', 'large', 'x-large', 'xx-large'].includes(value);
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: 'left',
      validate(value) {
        return ['left', 'center', 'right'].includes(value);
      }
    },
    width: {
      type: [String, Number],
      default: null
    },
    error: {
      type: String,
      default: ''
    },
    success: {
      type: String,
      default: ''
    },
    mask: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    autocomplete: {
      type: String,
      default: 'off',
      validate(val) {
        return ['on', 'off', 'chrome-off'].includes(val);
      }
    },
    theme: {
      type: String,
      default: 'grey',
      validate(value) {
        return ['grey', 'white'].includes(value);
      }
    }
  },
  computed: {
    classes() {
      return {
        [`app-input--theme-${this.theme}`]: true,
        [`app-input--size-${this.size}`]: true,
        [`app-input--align-${this.align}`]: true,
        'app-input--error': !!this.error,
        'app-input--success': !!this.success
      };
    },
    styles() {
      const styles = {};
      if (this.width) {
        styles.width = Number.isInteger(this.width) ? `${this.width}px` : this.width;
      }
      return styles;
    },
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput
      };
    }
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 0 auto;

  input {
    border: none;
    outline: none;
    background-color: transparent;
    color: rgb(0, 0, 0);
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0;

    @include placeholder {
      font-family: $golos-regular;
      font-size: inherit;
      line-height: inherit;
      letter-spacing: inherit;
      color: $color-white-grey;
    }

    &:disabled {
      color: rgba(124, 124, 124, 0.5);
      user-select: none;
    }
  }

  &__field {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;

    box-sizing: border-box;
    background: $bg-grey;
    color: $color-white-grey;
    border-radius: 12px;
    width: 100%;

    font-family: $golos-regular;
    font-style: normal;
    font-size: 14px;
    line-height: 20px;
  }

  &--theme-grey {
    & .app-input__field {
      background: $bg-grey;
    }
  }

  &--theme-white {
    & .app-input__field {
      background: #fff;
      color: $color-dark-grey;
    }
  }

  &--size-small {
    .app-input__field {
      height: 24px;
      padding: 0 10px;
      border-radius: 8px;
    }
  }

  &--size-medium {
    .app-input__field {
      height: 36px;
      padding: 0 12px;
    }
  }

  &--size-large {
    .app-input__field {
      height: 48px;
      padding: 0 16px;
    }
  }

  &--size-x-large {
    .app-input__field {
      height: 52px;
      padding: 0 16px;
    }
  }

  &--size-xx-large {
    .app-input__field {
      padding: 0 16px;

      @include gt-sm {
        height: 56px;
      }

      @include lt-md {
        height: 44px;
        font-size: 12px;
        line-height: 130%; /* 15.6px */
        letter-spacing: -0.24px;
      }
    }
  }

  &--align-left {
    input {
      text-align: left;
    }
  }

  &--align-center {
    input {
      text-align: center;
    }
  }

  &--align-right {
    input {
      text-align: right;
    }
  }

  &__error {
    font-family: $golos-regular;
    font-size: 12px;
    line-height: 16px;
    color: #db1838;
    padding-left: 18px;
  }

  &--error {
    .app-input__field {
      border: 1px solid #db1838;
    }
  }

  &__success {
    font-family: $golos-regular;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: -0.01em;
    color: #342700;
    padding-left: 18px;
  }

  &--success {
    & .app-input__success {
      color: $color-dark-green;
    }
  }
}
</style>
