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
        @paste.prevent="onPaste"
        @keydown.space.prevent
      />
      <!--      Временно скрыт-->
      <!--      <app-number-input :error="form.phone.errorMsg" @set-number="setNumber" />-->
    </form>
  </div>
</template>

<script>
import Vue from 'vue';

// import AppRadio from '~/components/shared/AppRadio';
import AppInput from '~/components/shared/AppInput.vue';

import inputPhone from '~/mixins/input-phone.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'CheckoutRecipient',

  components: {
    AppInput
    // Временно скрыт
    // AppNumberInput: () => import('~/components/shared/AppNumberInput')
    // AppRadio,
  },

  mixins: [inputPhone],

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
    ...accessorMapper('checkout', ['selfRecipient', 'getCheckout'])
  },

  mounted() {
    this.initRecipientData();
  },

  methods: {
    ...accessorMapper('checkout', ['SET_SELF_RECIPIENT', 'setCheckoutRecipient']),

    initRecipientData() {
      const recipientPhone = this.getCheckout?.recipient?.phone;

      this.form.name.value = this.getCheckout?.recipient?.name || '';
      this.form.phone.value = recipientPhone ? `+${recipientPhone}` : '';
    },

    setRecipientType(status) {
      this.SET_SELF_RECIPIENT(status);

      if (status) {
        this.setCheckoutRecipient();
      }
    },

    setNumber() {
      this.setRecipient({ name: this.form.name.value, phone: this.form.phone.value?.replace('+', '') });
    },

    setName() {
      this.setRecipient({ name: this.form.name.value, phone: this.form.phone.value?.replace('+', '') });
    },

    setRecipient(payload) {
      this.setCheckoutRecipient({ ...payload });
    }
  }
});
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
