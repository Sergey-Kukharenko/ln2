<template>
  <div class="payment">
    <payment-error-modal :is-visible="!!errorPaymentMessage" @close-modal="closePaymentErrorModal" />
    <div v-if="formLoading" class="payment__loading">
      <app-spinner-loader />
      Processing...
    </div>
    <div class="payment__logo">
      <app-logo />
      <svg-icon name="close" class="payment__logo-close-icon" @click="goBack" />
    </div>
    <div class="payment__wrapper">
      <h1 class="payment__price">{{ totalSum }} £</h1>
      <client-only>
        <form id="payment-form">
          <div class="payments-container">
            <div id="payments"></div>
          </div>
          <span id="error-message"></span>
          <span id="successful-payment-message"></span>
        </form>
      </client-only>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import PaymentErrorModal from '~/components/PaymentErrorModal.vue';
import AppLogo from '~/components/header/AppLogo.vue';
import AppSpinnerLoader from '~/components/shared/AppSpinnerLoader.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'PaymentPage',

  components: {
    AppSpinnerLoader,
    AppLogo,
    PaymentErrorModal
  },

  layout: 'payment',

  data() {
    return {
      isCheckoutComLoaded: false,
      submitLoading: false,
      formLoading: true,
      errorPaymentMessage: ''
    };
  },

  head() {
    return {
      script: [
        {
          src: 'https://checkout-web-components.checkout.com/index.js',
          defer: 'defer'
        }
      ]
    };
  },

  computed: {
    ...accessorMapper('payment', ['paymentSession']),

    orderId() {
      return this.paymentSession?.order_hash_id;
    },

    totalSum() {
      return this.paymentSession?.total_cost;
    }
  },

  async created() {
    if (process.client) {
      await this.$accessor.payment.fetchCheckoutPaymentData();
      await this.initPaymentForm();
    }
  },

  beforeDestroy() {
    this.submitLoading = false;
    this.formLoading = true;
    this.errorPaymentMessage = '';
  },

  methods: {
    async initPaymentForm() {
      try {
        const checkoutWebComponents = await window.CheckoutWebComponents({
          publicKey: process.env.checkoutComPublicKey,
          environment: process.env.checkoutComEnviroment,
          locale: 'en-GB',
          paymentSession: this.paymentSession,
          onReady: () => {
            this.formLoading = false;
          },
          onPaymentCompleted: (component, paymentResponse) => {
            const element = document.getElementById('successful-payment-message');

            element.innerHTML = `
              ${component.name} completed <br>
              Your payment id is: <span class="payment-id">${paymentResponse.id}</span>
            `;

            this.$router.push({ name: 'order-id', params: { id: this.orderId }, query: { order_paid: true } });
          },
          onChange: (component) => {
            console.log('onChange', 'isValid: ', component.isValid(), ' for ', component.type);
          },
          onError: (component, error) => {
            const element = document.getElementById('error-message');

            element.innerHTML = `
          ${component.name} error <br>
          Error occurred: <pre class="error-object">${error}</pre>
        `;
            this.catchPaymentError(error);
          }
        });

        const payments = checkoutWebComponents.create('payments');

        payments.mount(document.getElementById('payments'));
      } catch (err) {
        console.error(err);

        if (err.message === 'window.CheckoutWebComponents is not a function') {
          location.reload();
        }
      }
    },

    catchPaymentError(error) {
      this.submitLoading = false;
      this.errorPaymentMessage = error;
      console.error(error);
    },

    closePaymentErrorModal() {
      this.$router.push({ name: 'preorder-id', params: { id: this.orderId } });
    },

    goBack() {
      this.$router.push({ name: 'preorder-id', params: { id: this.orderId } });
    }
  }
});
</script>

<style lang="scss" scoped>
.payment {
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 0;

  &__loading {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;
    font-family: $golos-regular;
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 10;
    background: #fff;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
  }

  &__wrapper {
    @include lt-md {
      margin: 0 17px;
    }
  }

  &__logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 24px;
  }

  &__logo-close-icon {
    cursor: pointer;
    height: 24px;
    display: block;
    padding-bottom: 16px;
    width: 24px;
    opacity: 0.5;
    transition: 0.25s opacity ease-in;

    &:hover {
      opacity: 1;
    }

    @include lt-md {
      opacity: 1;
      margin-right: 17px;
    }
  }

  &__price {
    font-family: $golos-medium;
  }

  &__icon {
    width: 16px;
    height: 16px;
    transform: rotate(180deg);
  }
}
</style>
