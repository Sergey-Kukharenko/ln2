<template>
  <div class="checkout-continue">
    <app-button :size="getSize" stretch="full" theme="green" @click="onClick"> Continue </app-button>
  </div>
</template>

<script>
import Vue from 'vue';

import AppButton from '~/components/shared/AppButton.vue';

export default Vue.extend({
  name: 'CheckoutContinueButton',

  components: {
    AppButton
  },

  props: {
    isClarified: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    getSize() {
      return this.$device.isDesktop ? 'pre-x-lg' : '';
    },

    isDeliveryIntervalsExist() {
      return this.$accessor.checkout.getCheckout?.interval?.date && this.$accessor.checkout.getCheckout?.interval?.time;
    }
  },

  methods: {
    onClick() {
      if (!this.isDeliveryIntervalsExist && !this.isClarified) {
        this.$nuxt.$emit('set-interval-validation-error');

        return;
      }

      this.$router.push({ name: 'checkout-final-details' });
    }
  }
});
</script>
