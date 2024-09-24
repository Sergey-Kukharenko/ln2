<template>
  <div>
    <app-input
      id="main-input"
      :value="number"
      :mask="$refs['number-input']?.phoneNumberExample?.replace(/\d/g, '#')"
      size="x-large"
      type="tel"
      name="tel"
      :placeholder="$refs['number-input']?.phoneNumberExample"
      :error="error"
      @input="onInput"
    >
      <template #left>
        <vue-phone-number-input
          ref="number-input"
          class="number-input"
          :fetch-country="true"
          :preferred-countries="['GB']"
          @update="updateHandler"
        />
      </template>
    </app-input>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';

import AppInput from '~/components/shared/AppInput.vue';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default {
  name: 'AppNumberInput',

  components: {
    VuePhoneNumberInput,
    AppInput
  },

  props: {
    error: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      number: ' ',
      phoneMask: '',

      maskInput: null
    };
  },

  mounted() {
    this.initNumberInputStyles();
    this.onInput('');

    this.maskInput.focus();
    this.maskInput.addEventListener('select', this.setFocus);
  },

  beforeDestroy() {
    this.maskInput.removeEventListener('select', this.setFocus);
  },

  methods: {
    setFocus() {
      const mainInput = document.querySelector('#main-input .app-input__field > input');
      mainInput.focus();
    },

    onInput(value) {
      this.number = value;

      const mainInput = document.querySelector('.number-input .input-tel__input');
      mainInput.value = value;
      mainInput.dispatchEvent(new Event('input'));
    },

    updateHandler({ isValid = false, formatInternational = '' }) {
      this.$emit('set-number', { value: formatInternational, isValid });
    },

    initNumberInputStyles() {
      this.maskInput = document.querySelector('.number-input .country-selector__input');
      const container = document.querySelector('.number-input > .select-country-container');
      const toggle = document.querySelector('.country-selector__toggle');

      const inputStyles = [
        {
          prop: 'padding',
          value: '0 0 0 30px'
        },
        {
          prop: 'width',
          value: '64px'
        },
        {
          prop: 'borderRadius',
          value: '10px'
        }
      ];

      inputStyles.forEach((s) => {
        if (s.prop === 'width') {
          container.style.width = s.value;
          container.style.maxWidth = 'auto';
          container.style.minWidth = 'unset';
        }

        this.maskInput.style[s.prop] = s.value;
      });

      toggle.style.display = 'none';
    }
  }
};
</script>

<style lang="scss">
.number-input {
  .country-selector {
    width: 64px;
    &__toggle,
    &__label {
      display: none;
    }

    &__country-flag {
      top: 16px;
      left: 8px;
    }

    &__input {
      border: none;
      font-family: $golos-regular;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.01em;
      color: $color-dark-grey;
      padding-top: 0;
    }

    &.has-list-open .country-selector__input,
    &.has-value .country-selector__input {
      border-color: none;
      box-shadow: none !important;
    }
  }

  .flex-1 {
    display: none;
  }
}

.error {
  font-family: $golos-regular;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #db1838;
  padding-left: 18px;
  margin-top: 4px;
}
</style>
