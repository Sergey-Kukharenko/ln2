<template>
  <checkout-pane title="Enter your Email">
    <div class="email">
      <div class="email__field-column">
        <app-input :value="emailForm.value" placeholder="Email for receiving bonuses" size="x-large" @input="onInput" />
        <div v-show="emailForm.errorMsg" class="error">
          {{ emailForm.errorMsg }}
        </div>
        <div class="email__radio">
          <app-checkbox v-model="agreeEmailReceive" name="bonus-receive">
            I would like to receive exclusive deals, information on the latest products and relevant offers
          </app-checkbox>
        </div>
      </div>
      <div class="email__field-column">
        <div class="email__field-row">
          <svg-icon class="email__icon-newsfeed" name="newsfeed-green" />
          <div>We’ll send receipt to your Email</div>
        </div>
        <div class="email__field-row">
          <svg-icon class="email__icon-place" name="place-green" />
          <div>You’ll be able to track the order status</div>
        </div>
      </div>
    </div>
  </checkout-pane>
</template>

<script>
import debounce from 'lodash.debounce';

import AppInput from '~/components/shared/AppInput';
import AppCheckbox from '~/components/shared/AppCheckbox';

import authManager from '~/mixins/authManager';
import { CHECKOUT_INPUT_DELAY } from '~/constants/index';

export default {
  name: 'CheckoutEmail',

  components: {
    AppCheckbox,
    AppInput
  },

  mixins: [authManager],

  props: {
    error: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      emailForm: {
        value: '',
        errorMsg: ''
      },

      agreeEmailReceive: ''
    };
  },

  computed: {
    isFormInvalid() {
      return this.emailForm.errorMsg;
    }
  },

  methods: {
    onInput: debounce(function (value) {
      if (!value) {
        this.emailForm.errorMsg = '';

        return;
      }

      this.emailForm = { value, errorMsg: this.hasEmailError(value) };

      if (this.isFormInvalid) {
        return;
      }

      this.$store.dispatch('checkout/setCheckoutOther', { email: this.emailForm.value });
    }, CHECKOUT_INPUT_DELAY)
  }
};
</script>

<style lang="scss" scoped>
.email {
  display: flex;
  flex-direction: row;
  width: 100%;

  font-family: $golos-regular;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: #1f2226;

  @include gt-md {
    justify-content: space-between;
    margin-top: 28px;
  }

  @include lt-lg {
    flex-direction: column;
    margin-top: 12px;
  }

  &__radio {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex: 1 0 auto;
    flex-wrap: wrap;
    padding: 12px 6px 12px 2px;

    .app-radio {
      font-family: $golos-regular;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #1f2226;

      @include lt-lg {
        gap: 12px;
      }
    }

    .app-checkbox {
      font-family: $golos-regular;
      font-size: 11px;
      line-height: 16px;
    }
  }

  &__field-column {
    display: flex;
    flex-direction: column;
    width: calc(50% - 14px);

    @include lt-lg {
      width: 100%;
    }
  }

  &__field-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;

    @include lt-lg {
      font-family: $golos-regular;
      font-size: 11px;
      line-height: 16px;
    }
  }

  &__icon-newsfeed,
  &__icon-place {
    @include gt-md {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }

    @include lt-lg {
      width: 24px;
      height: 24px;
      margin-right: 10px;
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
}
</style>
