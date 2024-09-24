<template>
  <client-only>
    <div class="input__box">
      <div class="input__phone">
        <input
          ref="phone-input"
          v-model="phone.value"
          type="tel"
          class="input__field"
          @input="onInput"
          @blur="onBlur"
        />
        <slot name="right" />
      </div>
      <div v-show="phoneErrorMessage" class="input__error form__error">
        {{ phoneErrorMessage }}
      </div>
    </div>
  </client-only>
</template>

<script>
import { VALIDATION_MESSAGES } from '~/constants/auth.ts';

export default {
  name: 'AppPhoneMaskInput',

  props: {
    error: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      validationError: null,

      isInputScriptLoaded: false,
      phoneInputInstance: null,
      phone: {
        value: null,
        errorMessage: null
      }
    };
  },

  head() {
    return {
      script: [
        {
          src: '/js/intlTelInputWithUtils.min.js',
          defer: 'defer',
          callback: () => {
            this.isInputScriptLoaded = true;
          }
        }
      ]
    };
  },

  computed: {
    isPhoneValid() {
      return this.phone.value && !!this.phoneInputInstance?.isValidNumber();
    },

    phoneErrorMessage() {
      return this.error || this.phone.errorMessage;
    },

    fullPhoneNumber() {
      const code = document.querySelector('.iti__selected-dial-code').innerHTML;
      const number = code + this.phone.value;

      return number.replace(/\s/g, '').replace(/\+/g, '');
    }
  },

  watch: {
    isInputScriptLoaded(value) {
      if (!value) {
        return;
      }

      this.initPhoneInput();
    }
  },

  beforeDestroy() {
    this.phoneInputInstance.destroy();
  },

  methods: {
    onInput() {
      if (this.isPhoneValid) {
        this.$emit('update:success', this.fullPhoneNumber);
      }

      this.phone.errorMessage = '';
      this.$emit('update:modelValue', this.phone.value);
    },

    onBlur() {
      if (this.isPhoneValid) {
        this.$emit('update:success', this.fullPhoneNumber);

        return;
      }

      if (!this.phone.value) {
        return;
      }

      this.phone.errorMessage = VALIDATION_MESSAGES.phone;
      this.$emit('update:error', this.phone.errorMessage);
    },

    async initPhoneInput() {
      await this.$nextTick();

      const input = this.$refs['phone-input'];
      this.phoneInputInstance = window?.intlTelInput(input, {
        strictMode: true,
        initialCountry: 'gb',
        separateDialCode: true
      });
    }
  }
};
</script>

<style lang="scss">
@import url('https://cdn.jsdelivr.net/npm/intl-tel-input@24.0.1/build/css/intlTelInput.min.css');

.input {
  &__box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }

  &__phone {
    display: flex;
    align-items: center;
    height: 52px;
    padding: 0 8px;
    background: $bg-grey;
    border-radius: 12px;
    box-sizing: border-box;
  }

  &__field {
    width: 100%;
    border: 0 none;
    background: $bg-grey;
    font-family: $golos-regular;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: $color-dark-grey;
  }
}

.iti .iti__selected-country-primary {
  background: #fff;
  border-radius: 8px;
  height: 28px;
}

.iti .iti__selected-dial-code {
  font-family: $golos-regular;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: $color-dark-grey;
}

.iti__flag {
  border-radius: 4px;
}
</style>
