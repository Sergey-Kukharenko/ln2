<template>
  <client-only>
    <div class="payment__wrapper">
      <div class="payment__button">
        <!-- <template v-if="isPaypalPaymentMethod">
          <paypal-checkout
            env="sandbox"
            :amount="$options.PAYPAL.amount"
            :currency="$options.PAYPAL.currency"
            :button-style="$options.PAYPAL.styles"
            :client="$options.PAYPAL.credentials"
            :experienc="$options.PAYPAL.experienceOptions"
            @payment-completed="paypalPaymentCompleted"
          >
          </paypal-checkout>
        </template> -->
        <template v-if="isStripePaymentMethod">
          <app-button theme="green" stretch="full" :class="{ disabled: loading }" @click="payByStripe">
            <span v-if="!loading">Go to payment</span>
            <app-loading-dots v-else />
          </app-button>
        </template>
      </div>
    </div>
  </client-only>
</template>

<script>
import AppButton from '~/components/shared/AppButton';
import paymentMethodsData from '~/data/payment-methods';

const [STRIPE_METHOD] = paymentMethodsData;

export default {
  name: 'OrderPaymentButton',

  components: {
    AppButton,
    AppLoadingDots: () => import('@/components/shared/AppLoadingDots')
    // PaypalCheckout: () => import('vue-paypal-checkout')
  },

  props: {
    paymentMethod: {
      type: Object,
      default: () => STRIPE_METHOD
    },

    orderId: {
      type: String,
      default: ''
    },

    fastDeliveryKey: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      loading: false
    };
  },

  computed: {
    isStripePaymentMethod() {
      return this.paymentMethod.name === STRIPE_METHOD.name;
    }
  },

  beforeDestroy() {
    this.loading = false;
  },

  methods: {
    payByStripe() {
      this.loading = true;
      this.$router.push({ name: 'payment-stripe' });
    },

    paypalPaymentCompleted(response) {
      // console.log('Paypal payment has been completed', response);
    }
  }
};
</script>

<style lang="scss" scoped>
.payment__button {
  position: relative;
  z-index: 1;
  width: 100%;

  .disabled {
    pointer-events: none;
  }
}
</style>
