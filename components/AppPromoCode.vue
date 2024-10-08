<template>
  <app-input
    v-model="promoCode"
    size="xx-large"
    placeholder="Promotion code"
    :success="success"
    :error="outSideError || error"
    class="promo-code"
    :disabled="isDeductedBonuses"
  >
    <template #right>
      <cart-button size="small" theme="green" :disabled="isDisabled" align="center" not-change @click="submitHandler">
        Apply
      </cart-button>
    </template>
  </app-input>
</template>

<script>
import Vue from 'vue';

import CartButton from '~/components/CartButton.vue';
import AppInput from '~/components/shared/AppInput.vue';
import { BONUSES, TOO_MANY_PROMOCODE_ATTEMPTS_MSG } from '~/constants';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AppPromoCode',

  components: { CartButton, AppInput },

  data() {
    return {
      limit: 3,
      promoCode: this.getPromoCode(),
      error: '',
      success: ''
    };
  },

  BONUSES,

  computed: {
    ...accessorMapper('bonuses-local', ['isDeductedBonuses']),

    isDisabled() {
      return this.promoCode?.length < this.limit;
    },

    outSideError() {
      return this.isDeductedBonuses ? BONUSES.ERRORS.ONLY_BONUSES : '';
    }
  },

  watch: {
    promoCode(_value, _prevValue) {
      this.clear();
    }
  },

  methods: {
    ...accessorMapper('checkout', ['setPromoCode', 'fetchCheckout']),
    ...accessorMapper('bonuses-local', ['addPromoCode']),

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

    async setAndUpdate(gift) {
      this.setSuccess();
      this.$emit('toggleGift', gift);
      await this.fetchCheckout();
    },

    async submitHandler() {
      try {
        if (!this.promoCode) {
          return;
        }

        const payload = { promo_code: this.promoCode };
        const {
          success,
          message,
          data: { gift }
        } = await this.setPromoCode(payload);

        if (success) {
          this.addPromoCode(true);
          await this.setAndUpdate(gift);
        } else {
          this.setError(message);
        }
      } catch (error) {
        this.setError(TOO_MANY_PROMOCODE_ATTEMPTS_MSG);
        this.$emit('hideGift');
      }
      console.log(TOO_MANY_PROMOCODE_ATTEMPTS_MSG);
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

  & .cart-button {
    letter-spacing: -0.14px;
    margin-right: -8px;
    border-radius: 12px;
  }

  & .cart-button.cart-button--disabled {
    background: #cccccc;
  }

  &.app-input--error {
    .app-input__field {
      border: none;
    }
  }
}
</style>
