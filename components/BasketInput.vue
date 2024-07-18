<template>
  <div>
    <div class="basket-input" :class="classes" :style="styles">
      <input :type="type" :min="min" :placeholder="placeholder" :value="value" readonly @input="onInput" />
    </div>
    <div v-for="error in errors" :key="error" class="basket-input__error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { useStringSwappedValues } from '~/helpers';
import { VALIDATE_MESSAGES } from '~/messages';

export default {
  name: 'BasketInput',
  props: {
    type: {
      type: String,
      default: 'text',
      validate(value) {
        return ['text', 'password', 'number'].includes(value);
      }
    },

    min: {
      type: [String, Number],
      default: ''
    },

    value: {
      type: [String, Number],
      required: true,
      default: ''
    },

    name: {
      type: String,
      default: ''
    },

    size: {
      type: String,
      default: 'medium',
      validate(value) {
        return ['small', 'medium', 'large'].includes(value);
      }
    },

    theme: {
      type: String,
      default: 'grey',
      validate(value) {
        ['green', 'grey', 'turquoise'].includes(value);
      }
    },

    advancedStylesTheme: {
      type: String,
      default: '',
      validate(value) {
        ['gift'].includes(value);
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
      type: [String, Number, null],
      default: null
    },

    validations: {
      type: Object,
      default: () => ({})
    }
  },

  emits: ['input'],

  computed: {
    classes() {
      return {
        [`basket-input--size-${this.size}`]: true,
        [`basket-input--theme-${this.theme}`]: true,
        [`basket-input--advanced-theme-${this.advancedStylesTheme}`]: this.advancedStylesTheme,
        [`basket-input--align-${this.align}`]: true,
        'basket-input--error': !!this.errors.length
      };
    },

    styles() {
      const styles = {};
      if (this.width) {
        styles.width = Number.isInteger(this.width) ? `${this.width}px` : this.width;
      }
      return styles;
    },

    invalid() {
      return this.validations?.$dirty && this.validations?.$invalid;
    },

    errors() {
      if (!this.invalid) {
        return [];
      }

      return Object.keys(this.validations.$params).reduce((errors, validator) => {
        if (!this.validations[validator]) {
          const foundMsg = VALIDATE_MESSAGES[validator];
          const foundObj = this.validations.$params[validator];
          const compiled = useStringSwappedValues(foundMsg, foundObj);

          errors.push(compiled);
        }

        return errors;
      }, []);
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
.basket-input {
  display: flex;
  flex-direction: row;
  align-items: center;

  box-sizing: border-box;
  background: $bg-grey;
  color: $color-dark-grey;
  border-radius: 10px;
  width: 100%;

  font-family: $golos-regular;
  font-style: normal;
  font-size: 14px;
  line-height: 20px;

  & > input {
    border: none;
    outline: none;
    background-color: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    width: 100%;
    // Временно
    cursor: none;

    &::placeholder {
      font-family: $golos-regular;
      font-style: normal;
      font-size: 14px;
      line-height: 20px;
      color: $color-white-grey;
    }
  }

  &--size-small {
    padding: 8px;

    @include gt-sm {
      width: 88px;
      height: 40px;
    }

    @include lt-md {
      width: 68px;
      height: 28px;
      padding: 0 10px;
      border-radius: 8px;
    }
  }

  &--size-medium {
    height: 36px;
    padding: 0 12px;
  }

  &--theme-grey {
    background: $bg-grey;
    color: $color-dark-grey;
  }

  &--theme-green {
    background: $color-green;
    color: #fff;
  }

  &--theme-turquoise {
    color: #000;
    background: #ebfaf0;
  }

  &--advanced-theme-gift {
    height: 36px;
    border-radius: 12.8571px;

    @include gt-sm {
      width: 72px;
      font-size: 20px;
      line-height: 26px;
    }

    @include lt-md {
      width: auto;
      font-size: 16px;
      line-height: 26px;
    }
  }

  &--size-large {
    height: 48px;
    padding: 0 16px;
  }

  &--align-left {
    & > input {
      text-align: left;
    }
  }

  &--align-center {
    & > input {
      text-align: center;
    }
  }

  &--align-right {
    & > input {
      text-align: right;
    }
  }

  &__error {
    font-family: $golos-regular;
    font-size: 12px;
    line-height: 16px;
    color: #db1838;
    margin-top: 8px;
    padding-left: 18px;
  }

  &--error {
    border: 1px solid #db1838;
  }
}
</style>
