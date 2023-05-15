<template>
  <app-input
    v-model="promoCode"
    size="x-large"
    placeholder="Promotion code"
    :success="success"
    :error="error"
    :note="note"
    class="promo-code"
  >
    <template #right>
      <basket-button
        size="small"
        theme="green"
        :disabled="isDisabled"
        align="center"
        size-not-change
        @click="submitHandler"
      >
        Apply
      </basket-button>
    </template>
  </app-input>
</template>

<script>
import { mapActions } from 'vuex';
import AppInput from '~/components/shared/AppInput.vue';

export default {
  name: 'AppPromoCode',
  components: { AppInput },

  data() {
    return {
      limit: 3,
      promoCode: '',
      success: false,
      error: '',
      note: ''
    };
  },

  computed: {
    isDisabled() {
      return this.promoCode.length < this.limit;
    }
  },

  watch: {
    promoCode(value, prevValue) {
      this.clear();
    }
  },

  methods: {
    ...mapActions({
      setPromoCode: 'cart/setPromoCode',
      fetchCart: 'cart/fetchCart'
    }),

    setSuccess() {
      this.note = 'Promocode succesfully applied';
      this.error = '';
    },

    setError() {
      this.note = '';
      this.error = 'Promocode has expired';
    },

    clear() {
      this.success = false;
      this.note = '';
      this.error = '';
    },

    async setAndUpdate() {
      this.setSuccess();
      await this.fetchCart();
    },

    async submitHandler() {
      if (!this.promoCode) {
        return;
      }

      const payload = { promo_code: this.promoCode };
      const { success } = await this.setPromoCode(payload);

      this.success = success;

      success ? await this.setAndUpdate() : this.setError();
    }
  }
};
</script>

<style lang="scss">
.promo-code {
  & .app-input__field {
    background: #f7f7f7;

    & input {
      color: #7c7c7c;
    }
  }

  & .basket-button {
    letter-spacing: -0.01em;
    margin-right: -8px;
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
