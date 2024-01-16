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
import { mapActions } from 'vuex';
import AppInput from '~/components/shared/AppInput.vue';
import BasketButton from '~/components/BasketButton.vue';

export default {
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
    promoCode(value, prevValue) {
      this.clear();
    }
  },

  methods: {
    ...mapActions({
      setPromoCode: 'checkout/setPromoCode',
      fetchCheckout: 'checkout/fetchCheckout'
    }),

    getPromoCode() {
      return this.$store.getters['checkout/checkoutPromocode'];
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
      if (!this.promoCode) {
        return;
      }

      const payload = { promo_code: this.promoCode };
      const { success, message } = await this.setPromoCode(payload);

      success ? await this.setAndUpdate() : this.setError(message);
    }
  }
};
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
