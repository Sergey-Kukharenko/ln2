<template>
  <div class="phone-input-box">
    <div class="phone-input" :class="{ 'phone-input--error': error }">
      <vue-tel-input v-model="phone" v-bind="phoneProps" v-tel @input="onInput" />
    </div>
    <div v-if="error" class="container-error">
      {{ error }}
    </div>
  </div>
</template>

<script>
const VueTelInput = () =>
  Promise.all([import('vue-tel-input'), import('vue-tel-input/dist/vue-tel-input.css')]).then(
    ([{ VueTelInput }]) => VueTelInput
  );
export default {
  name: 'AppPhoneInput',

  components: {
    VueTelInput
  },

  directives: {
    tel: {
      bind(el) {
        const input = el.querySelector('input');
        // input.setAttribute('pattern', '[0-9]*');
        input.setAttribute('inputmode', 'numeric');
      }
    }
  },

  props: {
    error: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      phone: '',

      phoneProps: {
        defaultCountry: 'gb',
        preferredCountries: ['GB'],

        autoFormat: true,
        mode: 'international',
        validCharactersOnly: true,
        inputOptions: {
          // showDialCode: true,
          maxlength: 15,
          required: true,
          placeholder: 'phone'
        },
        disabledFormatting: false
      }
    };
  },

  methods: {
    onInput(value) {
      this.$emit('set-phone', value);
    }
  }
};
</script>

<style lang="scss">
.phone-input {
  display: flex;
  background: $bg-grey;
  height: 52px;
  padding: 0 16px;
  margin-top: 8px;
  border-radius: 12px;

  .vue-tel-input {
    width: 100%;
    padding: 0;
    border: none;
    outline: none;
    box-shadow: none !important;

    & .vti__dropdown {
      background: inherit;
    }

    & input {
      background: inherit;
      font-family: $golos-regular;
      font-size: 14px;
      line-height: 20px;
    }

    & .vti__dropdown-list.below {
      top: 60px;
      background: $bg-grey;
      border-radius: 12px;
      border: 1px solid #dde0e6;

      @include gt-md {
        width: 294px !important;
        left: -16px;
      }

      @include lt-lg {
        width: calc(100vw - 34px) !important;
        left: -16px;
      }

      &::-webkit-scrollbar {
        display: none;
      }
    }

    & .vti__dropdown-item {
      &.last-preferred {
        border-bottom: 1px solid #dde0e6;
      }

      &.highlighted {
        background-color: #ebebeb;
      }
    }
  }

  &--error {
    border: 1px solid #db1838;
  }
}

.container-error {
  font-family: $golos-regular;
  font-size: 12px;
  line-height: 16px;
  color: #db1838;
  padding-left: 18px;
  margin-top: 8px;
}
</style>
