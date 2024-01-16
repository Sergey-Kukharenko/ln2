<template>
  <form class="recipient-form" autocomplete="off" novalidate @submit.prevent="saveRecipient">
    <app-input v-model="form.name" placeholder="Recipient name" pattern="[a-zA-Z]*" max="50" size="x-large" />
    <app-input
      v-model="form.phone"
      placeholder="Recipient phone (optional)"
      pattern="[0-9]*"
      name="search"
      type=""
      autocomplete="off"
      inputmode="numeric"
      max="16"
      size="x-large"
      @focus="onFocus"
    />
    <app-button size="md" theme="ghost" class="recipient-form__button">Save</app-button>
  </form>
</template>

<script>
import AppInput from '~/components/shared/AppInput';
import AppButton from '~/components/shared/AppButton';

export default {
  name: 'OrderRecipient',
  components: { AppInput, AppButton },

  props: {
    recipientName: {
      type: String,
      default: ''
    },

    recipientPhone: {
      type: [String, Number],
      default: ''
    }
  },

  data() {
    return {
      form: {
        name: this.recipientName,
        phone: this.recipientPhone
      }
    };
  },

  methods: {
    async saveRecipient() {
      await this.$store.dispatch('checkout/setCheckoutRecipient', {
        name: this.form.name,
        phone: this.form.phone.replace('+', '')
      });

      this.$emit('submit-form');
    },

    onFocus() {
      if (this.form.phone) {
        return;
      }

      this.form.phone = '+44';
    }
  }
};
</script>

<style lang="scss" scoped>
.recipient-form {
  display: flex;
  width: 100%;

  @include gt-sm {
    margin-top: 16px;
    gap: 16px;
  }

  @include lt-md {
    margin-top: 12px;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
