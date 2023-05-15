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
    <div v-if="note" class="app-input__note">
      {{ note }}
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
      default: ''
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
        return ['small', 'medium', 'large', 'x-large'].includes(value);
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
      type: Boolean
    },
    note: {
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
    }
  },
  computed: {
    classes() {
      return {
        [`app-input--size-${this.size}`]: true,
        [`app-input--align-${this.align}`]: true,
        'app-input--error': !!this.error,
        'app-input--success': this.success
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

    @include placeholder {
      font-family: $golos-regular;
      font-style: normal;
      font-size: 14px;
      line-height: 20px;
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

  &--size-x-medium {
    .app-input__field {
      height: 44px;
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
    font-style: normal;
    font-weight: 400;
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

  &__note {
    font-family: $golos-regular;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: -0.01em;
    color: #342700;
    padding-left: 18px;
  }

  &--success {
    & .app-input__note {
      color: $color-dark-green;
    }
  }
}
</style>
