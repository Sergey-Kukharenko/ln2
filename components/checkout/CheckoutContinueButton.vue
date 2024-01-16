<template>
  <div class="checkout-continue">
    <app-button :size="getSize" stretch="full" theme="green" @click="onClick"> Continue </app-button>
  </div>
</template>

<script>
import AppButton from '~/components/shared/AppButton';

export default {
  name: 'CheckoutContinueButton',

  components: {
    AppButton
  },

  props: {
    currCheckoutStep: {
      type: Number,
      default: 1
    }
  },

  computed: {
    getSize() {
      return this.$device.isDesktop ? 'pre-x-lg' : '';
    }
  },

  methods: {
    onClick() {
      if (this.currCheckoutStep >= 2) {
        return;
      }

      this.$store.dispatch('checkout/setCheckoutStep', this.currCheckoutStep + 1);
    }
  }
};
</script>
