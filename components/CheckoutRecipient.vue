<template>
  <checkout-pane title="Recipient" :delim="true">
    <div class="recipient__select">
      <div class="recipient__radio-row">
        <app-radio :value="selfRecipient" :name="true" @change="setRecipientType"> I’ll get order by myself </app-radio>
      </div>
      <div class="recipient__radio-row">
        <app-radio :value="selfRecipient" :name="false" @change="setRecipientType"> Another recipient </app-radio>
      </div>
    </div>
    <form v-if="!selfRecipient" class="recipient__another-name" autocomplete="off" novalidate>
      <app-input
        :value="form.name.value"
        placeholder="Recipient name"
        pattern="[a-zA-Z]*"
        max="50"
        size="x-large"
        :error="form.name.errorMsg"
        @input="setName"
      />

      <app-input
        v-model="form.phone.value"
        placeholder="Recipient phone"
        pattern="[0-9]*"
        name="search"
        type=""
        autocomplete="off"
        inputmode="numeric"
        max="16"
        size="x-large"
        :error="form.phone.errorMsg"
        @input="setNumber"
        @focus="onFocus"
        @blur="onBlur"
        @keypress="validateNumber"
      />
      <!--      Временно скрыт-->
      <!--      <app-number-input :error="form.phone.errorMsg" @set-number="setNumber" />-->
    </form>
  </checkout-pane>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import debounce from 'lodash.debounce';

import AppRadio from '~/components/shared/AppRadio';
import AppInput from '~/components/shared/AppInput';
import authManager from '~/mixins/authManager';

import {
  CHECKOUT_INPUT_DELAY
  // CHECKOUT_FORM_KEYS
} from '~/constants';
import inputPhone from '~/mixins/input-phone.vue';

export default {
  name: 'CheckoutRecipient',

  components: {
    AppRadio,
    AppInput
    // Временно скрыт
    // AppNumberInput: () => import('~/components/shared/AppNumberInput')
  },

  mixins: [authManager, inputPhone],

  data() {
    return {
      form: {
        name: {
          value: '',
          errorMsg: ''
        },
        phone: {
          errorMsg: '',
          value: ''
        },

        errorMsg: ''
      }
    };
  },

  computed: {
    ...mapState('checkout', ['selfRecipient'])
  },

  mounted() {
    this.initRecipientData();
  },

  methods: {
    ...mapMutations({
      setStoreRecipient: 'checkout/setState'
    }),

    initRecipientData() {
      const recipientName = this.$store.getters['checkout/getCheckout']?.recipient?.name;

      if (!recipientName) {
        return;
      }

      this.form.name = this.$store.getters['checkout/getCheckout']?.recipient?.name;
    },

    setRecipientType(status) {
      this.setStoreRecipient({ selfRecipient: status });

      if (status) {
        this.$store.dispatch('checkout/setCheckoutRecipient');
      }
    },

    setNumber: debounce(function (value) {
      this.form.phone.value = value;
      this.setRecipient({ name: this.form.name.value, phone: this.form.phone.value.replace('+', '') });
    }, CHECKOUT_INPUT_DELAY),

    setName: debounce(function (value) {
      this.form.name.value = value;
      this.setRecipient({ name: this.form.name.value, phone: this.form.phone.value.replace('+', '') });
    }, CHECKOUT_INPUT_DELAY),

    setRecipient(payload) {
      this.$store.dispatch('checkout/setCheckoutRecipient', { ...payload });
    }
  }
};
</script>

<style lang="scss" scoped>
.recipient {
  &__select {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
  }

  &__radio-row {
    display: flex;
    flex-direction: row;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 7px;
    }
  }

  &__another-name {
    display: flex;

    @include gt-md {
      flex-direction: row;
      align-items: center;
      margin: 16px -12px 0;

      & > div {
        flex: 1;
        margin: 0 12px;
      }
    }

    @include lt-lg {
      flex-direction: column;
      align-items: stretch;

      & > div {
        margin-top: 12px;
      }
    }
  }
}
</style>
