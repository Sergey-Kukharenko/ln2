<template>
  <div class="recipient">
    <form class="recipient__another-name" autocomplete="off" novalidate>
      <app-input
        v-model="form.name.value"
        placeholder="Recipient name:"
        pattern="[a-zA-Z]*"
        max="50"
        size="xx-large"
        :error="form.name.errorMsg"
        @blur="setName"
      />

      <app-input
        v-model="form.phone.value"
        placeholder="Recipient phone (optional):"
        pattern="[0-9]*"
        name="search"
        type=""
        autocomplete="off"
        inputmode="numeric"
        max="16"
        size="xx-large"
        :error="form.phone.errorMsg"
        @focus="onFocus"
        @blur="setNumber"
        @keypress="validateNumber"
        @paste.prevent="handle"
        @keydown.space.prevent
      />
      <!--      Временно скрыт-->
      <!--      <app-number-input :error="form.phone.errorMsg" @set-number="setNumber" />-->
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

// import AppRadio from '~/components/shared/AppRadio';
import AppInput from '~/components/shared/AppInput';

import authManager from '~/mixins/authManager';
import inputPhone from '~/mixins/input-phone';

export default {
  name: 'CheckoutRecipient',

  components: {
    AppInput
    // Временно скрыт
    // AppNumberInput: () => import('~/components/shared/AppNumberInput')
    // AppRadio,
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
      const recipientPhone = this.$store.getters['checkout/getCheckout']?.recipient?.phone;

      this.form.name.value = this.$store.getters['checkout/getCheckout']?.recipient?.name || '';
      this.form.phone.value = recipientPhone ? `+${recipientPhone}` : '';
    },

    setRecipientType(status) {
      this.setStoreRecipient({ selfRecipient: status });

      if (status) {
        this.$store.dispatch('checkout/setCheckoutRecipient');
      }
    },

    setNumber() {
      this.setRecipient({ name: this.form.name.value, phone: this.form.phone.value.replace('+', '') });
    },

    setName() {
      this.setRecipient({ name: this.form.name.value, phone: this.form.phone.value.replace('+', '') });
    },

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
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
}
</style>
