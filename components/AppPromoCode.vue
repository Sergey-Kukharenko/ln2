<template>
  <app-input
    v-model="promoCode"
    size="xx-large"
    placeholder="Promotion code"
    :success="success"
    :error="error"
    class="promo-code"
  >
    <template #right>
      <basket-button size="small" theme="green" :disabled="isDisabled" align="center" not-change @click="submitHandler">
        Apply
      </basket-button>
    </template>
  </app-input>
</template>

<script>
import Vue from 'vue';

import BasketButton from '~/components/BasketButton.vue';
import AppInput from '~/components/shared/AppInput.vue';
import { TOO_MANY_PROMOCODE_ATTEMPTS_MSG } from '~/constants';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AppPromoCode',

  components: { BasketButton, AppInput },

  data() {
    return {
      limit: 3,
      promoCode: this.getPromoCode(),
      error: '',
      success: ''
    };
  },

  computed: {
    isDisabled() {
      return this.promoCode?.length < this.limit;
    }
  },

  watch: {
    promoCode(_value, _prevValue) {
      this.clear();
    }
  },

  methods: {
    ...accessorMapper('checkout', ['setPromoCode', 'fetchCheckout']),

    getPromoCode() {
      return this.$accessor.checkout.checkoutPromocode;
    },

    setSuccess() {
      this.success = 'Promocode succesfully applied';
      this.error = '';
    },

    setError(message) {
      this.success = '';
      this.error = message;
    },

    clear() {
      this.success = '';
      this.error = '';
    },

    async setAndUpdate() {
      this.setSuccess();
      await this.fetchCheckout();
    },

    async submitHandler() {
      try {
        if (!this.promoCode) {
          return;
        }

        const payload = { promo_code: this.promoCode };
        const { success, message } = await this.setPromoCode(payload);

        success ? await this.setAndUpdate() : this.setError(message);
      } catch (error) {
        this.setError(TOO_MANY_PROMOCODE_ATTEMPTS_MSG);
      }
    }
  }
});
</script>

<style lang="scss">
.promo-code {
  &.app-input--size-xx-large .app-input__field {
    background: #f7f7f7;

    @include gt-sm {
      height: 56px;
    }

    @include lt-md {
      height: 52px;
    }
  }

  & .basket-button {
    letter-spacing: -0.14px;
    margin-right: -8px;
    border-radius: 12px;
  }

  & .basket-button.basket-button--disabled {
    background: #cccccc;
  }

  &.app-input--error {
    .app-input__field {
      border: none;
    }
  }
}
</style>
