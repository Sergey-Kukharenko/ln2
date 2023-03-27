<template>
  <div class="code">
    <div class="code__row">
      <div v-for="number in $options.CODE_INPUT_DEFAULT_COUNT" :key="number" class="code__item">
        <input
          :id="`codeInput_${number}`"
          type="tel"
          class="code__item-input"
          :class="{ error }"
          maxlength="1"
          :autocomplete="getAutoCompleteRule(number)"
          inputmode="numeric"
          pattern="[0-9]*"
          :disabled="disabled"
          @click="resetInputHandler"
          @paste.prevent.stop="onPasteCode"
          @keypress="isNumberKey"
          @keyup.prevent="onKeyup($event, number)"
          @input.prevent="onInput($event, number)"
        />
      </div>
    </div>
    <div v-if="error" class="code__error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { CODE_INPUT_DEFAULT_COUNT } from '~/constants/index';
import { isNumberKey } from '~/helpers/validators';

export default {
  CODE_INPUT_DEFAULT_COUNT,

  name: 'AppCodeInput',

  props: {
    error: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    disabled(val) {
      if (val) {
        return;
      }

      this.$nextTick(() => {
        this.focusInputByRef(1);
      });
    }
  },

  mounted() {
    this.mappedInputs = Array(CODE_INPUT_DEFAULT_COUNT)
      .fill()
      .reduce((acc, v, i) => {
        const key = i + 1;
        acc[key] = document.getElementById(`codeInput_${key}`);
        return acc;
      }, {});
  },

  methods: {
    isNumberKey,

    getAutoCompleteRule(number) {
      return number === 1 ? 'one-time-code' : 'no';
    },

    getRefValue(number) {
      return this.mappedInputs[number].value;
    },

    setRefValue(number, payload) {
      this.mappedInputs[number].value = payload;
    },

    focusInputByRef(number) {
      this.mappedInputs[number].focus();
    },

    toNextInput(number) {
      if (number < CODE_INPUT_DEFAULT_COUNT) {
        this.focusInputByRef(number + 1);
      }
    },

    resetInputHandler() {
      if (!this.error) {
        return;
      }

      Object.keys(this.mappedInputs).forEach((_, idx) => {
        this.setRefValue(idx + 1, '');
      });

      this.focusInputByRef(1);
      this.$emit('reset-code-input');
    },

    onPasteCode(event) {
      try {
        const { clipboardData } = event;
        const value = clipboardData?.getData('text') || '';

        if (isNaN(value)) {
          throw new TypeError(`paste value is't number`);
        }

        const splittedCode = value.slice(0, CODE_INPUT_DEFAULT_COUNT).split('');
        splittedCode.forEach((v, i) => this.setRefValue(i + 1, v));

        this.emitValues();
      } catch (error) {
        console.error('Paste code error ->', error);
      }
    },

    onDelete(number) {
      this.setRefValue(number, '');
      this.resetInputHandler();
      const isNotFirstInput = number > 1;

      if (isNotFirstInput) {
        this.focusInputByRef(number - 1);
      }
    },

    onKeyup(e, number) {
      const isBackspace = e.key === 'Backspace';
      const isDelete = e.key === 'Delete';

      if (isBackspace || isDelete) {
        this.onDelete(number);
        this.resetInputHandler();
        return;
      }

      const isValueAlreadySet = !!this.getRefValue(number);
      const isValidValue = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key);
      const isNotLastInput = number < CODE_INPUT_DEFAULT_COUNT;

      if (isValueAlreadySet && isValidValue && isNotLastInput) {
        this.setRefValue(number + 1, e.key);
        this.toNextInput(number);
      }
    },

    onInput(e, number) {
      const value = parseInt(e.target.value);

      if (isNaN(value)) {
        return;
      }

      const stringifiedValue = value.toString();
      const slicedValue = stringifiedValue.slice(stringifiedValue.length - 1, stringifiedValue.length);

      this.setRefValue(number, slicedValue);
      this.toNextInput(number);
      this.emitValues();
    },

    emitValues() {
      const code = Object.keys(this.mappedInputs)
        .filter((key) => Boolean(this.getRefValue(key)))
        .map((key) => this.getRefValue(key))
        .join('');

      if (code.length === CODE_INPUT_DEFAULT_COUNT) {
        this.$emit('set-code', code);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.code {
  &__row {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
  &__item {
    &-input {
      background: #f7f7f7;
      border-radius: 10px;
      border: 1px solid transparent;
      outline: none;
      box-sizing: border-box;

      font-family: $golos-regular;
      font-style: normal;
      font-weight: 400;
      text-align: center;
      color: #010810;

      @include gt-sm {
        width: 72px;
        height: 72px;

        font-size: 32px;
        line-height: 40px;
      }

      @include lt-md {
        margin: 0;
        width: 48px;
        height: 48px;

        font-size: 20px;
        line-height: 24px;
      }

      &.error {
        border: 1px solid #db1838;
        padding-left: 0;
      }
    }
  }

  &__error {
    font-family: $golos-regular;
    font-style: normal;
    font-weight: 400;
    color: #db1838;

    @include gt-sm {
      margin-top: 16px;
      font-size: 14px;
      line-height: 20px;
    }

    @include lt-md {
      margin-top: 8px;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
    }
  }
}
</style>
