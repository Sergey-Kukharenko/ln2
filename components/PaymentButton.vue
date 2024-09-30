<template>
  <div class="payment__button">
    <payment-error-modal
      :is-visible="errorModal.isVisible"
      :message="errorModal.message"
      @close-modal="closePaymentErrorModal"
    />
    <app-button
      v-show="isStripeRedirectPayment || isCheckoutComRedirectPayment"
      size="full"
      theme="green"
      :loading="loading"
      @click="submitOrder"
    >
      <template v-if="loading"> <app-loading-dots /></template>
      <template v-else>Go to payment</template>
    </app-button>

    <div v-show="isStripePaymentButtons" id="payment-request-button" />
    <div v-show="isPayPalPayment" id="paypal-button-container" />
  </div>
</template>

<script>
import Vue from 'vue';

import PaymentErrorModal from '~/components/PaymentErrorModal.vue';
import AppButton from '~/components/shared/AppButton.vue';
import { APPLE_PAY, GOOGLE_PAY, LINK_PAY } from '~/constants';
import { CHECKOUT_COM_PAYMENT_METHOD, ORDER_ALREADY_PAID, PAYMENT_ERROR_MESSAGE } from '~/constants/payment';
import { PAYPAL_PAYMENT_METHOD, STRIPE_PAYMENT_METHOD } from '~/data/payment-methods';
import { useObjectNotEmpty } from '~/helpers';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'PaymentButton',

  components: {
    PaymentErrorModal,
    AppButton,
    AppLoadingDots: () => import('~/components/shared/AppLoadingDots.vue')
  },

  props: {
    orderId: {
      type: String,
      required: true
    },

    price: {
      type: Object,
      default: () => ({})
    },

    totalCost: {
      type: String,
      default: ''
    },

    paymentMethod: {
      type: String,
      default: () => STRIPE_PAYMENT_METHOD.name
    }
  },

  data() {
    return {
      loading: false,
      clientSecret: '',
      stripe: null,
      stripePaymentRequest: null,
      isPayPalLoaded: false,
      isEmailExist: false,

      errorModal: {
        isVisible: false,
        redirect: {},
        message: ''
      },

      queueAction: ''
    };
  },

  head() {
    return {
      script: [
        {
          src: `https://www.paypal.com/sdk/js?client-id=${this.paypalClientId}&currency=GBP`,
          defer: 'defer',
          callback: () => {
            this.isPayPalLoaded = true;
          }
        }
        // Временно скрыт
        // {
        //   src: 'https://js.stripe.com/v3/',
        //   defer: 'defer',
        //   body: true
        // }
      ]
    };
  },

  computed: {
    ...accessorMapper('payment', ['paypalClientId']),

    isStripeRedirectPayment() {
      return this.paymentMethod === STRIPE_PAYMENT_METHOD.name;
    },

    isCheckoutComRedirectPayment() {
      return this.paymentMethod === CHECKOUT_COM_PAYMENT_METHOD.name;
    },

    isPayPalPayment() {
      return this.paymentMethod === PAYPAL_PAYMENT_METHOD.name && this.isPayPalLoaded;
    },

    isStripePaymentButtons() {
      return [APPLE_PAY, GOOGLE_PAY, LINK_PAY].includes(this.paymentMethod);
    },

    isCheckout() {
      return this.$route.name === 'checkout-final-details';
    },

    isOrderId() {
      return this.$route.name === 'order-id';
    },

    stripeAmount() {
      return useObjectNotEmpty(this.price) ? this.price.totalSum : this.totalCost;
    },

    isEmailNotExist() {
      return this.isCheckout && !this.isEmailExist;
    },

    paymentPathName() {
      return this.isCheckoutComRedirectPayment ? 'payment' : 'payment-stripe';
    },

    isOrderLoading() {
      return this.$accessor.checkout.isPending;
    }
  },

  watch: {
    isPayPalPayment(val) {
      if (!val) {
        return;
      }

      document.getElementById('paypal-button-container').innerHTML = '';

      this.initPayPalButton();
    },

    isOrderLoading(val) {
      if (val === false && this.queueAction) {
        this[this.queueAction]();
      }
    }
  },

  // Временно скрыта иницаилизация Stripe Buttons
  // async
  mounted() {
    // this.$nuxt.$on('set-email-status', this.setEmailStatus);
    //   await this.initStripePaymentButtons();
  },

  beforeDestroy() {
    this.loading = false;
    this.clientSecret = '';
    this.stripe = null;
    this.paymentRequest = null;
    this.queueAction = '';

    this.removePaymentError();
    // this.$nuxt.$off('set-email-status', this.setEmailStatus);
  },

  methods: {
    ...accessorMapper('checkout', ['setCheckoutToPay']),
    ...accessorMapper('payment', [
      'getClientIdPayPal',
      'createPaymentPayPal',
      'approvePaymentPayPal',
      'fetchStripeClientSecret',
      'setDefaultPaymentMethod'
    ]),

    closePaymentErrorModal() {
      this.errorModal.isVisible = false;
      this.errorModal.message = '';

      if (this.errorModal.redirect?.name) {
        this.$router.push(this.errorModal.redirect);
      }
    },

    setEmailStatus(status) {
      this.isEmailExist = status;
    },

    async submitOrder() {
      try {
        if (this.isOrderLoading) {
          this.queueAction = 'submitOrder';
          this.loading = true;

          return;
        }

        if (this.loading && !this.queueAction) {
          return;
        }

        this.loading = true;

        const { success, data } = await this.setCheckoutToPay();

        if (!success) {
          const { title } = data;
          this.setPaymentError({ title, isRedirect: true });
          this.loading = false;

          return;
        }

        if (this.isOrderId) {
          this.$emit('clear-time-id');
        }

        this.$router.push({ name: this.paymentPathName });
      } catch (err) {
        this.loading = false;
        console.error(err);
      }
    },

    setPaymentError({ title, isRedirect = false }) {
      this.errorModal.isVisible = true;
      this.errorModal.message = title === ORDER_ALREADY_PAID.message ? ORDER_ALREADY_PAID.text : PAYMENT_ERROR_MESSAGE;
      this.errorModal.redirect = isRedirect ? { name: 'order-id', params: { id: this.orderId } } : {};
    },

    removePaymentError() {
      this.errorModal.message = '';
      this.errorModal.isVisible = false;
      this.errorModal.redirect = {};
    },

    getPaymentName(obj) {
      return Object.keys(obj).find((key) => obj[key]);
    },

    reinitPayPalButton() {
      document.getElementById('paypal-button-container').innerHTML = '';
      this.initPayPalButton();
    },

    initPayPalButton() {
      const paypalButtonHeight = this.$device.isMobileOrTablet ? 44 : 52;

      window.paypal
        .Buttons({
          style: {
            shape: 'rect',
            layout: 'horizontal',
            label: 'pay',
            height: paypalButtonHeight
          },

          // Order is created on the server and the order id is returned
          createOrder: async () => {
            try {
              const { success: status, data: statusData } = await this.setCheckoutToPay();

              if (!status) {
                const { title } = statusData;
                this.setPaymentError({ title, isRedirect: true });

                return;
              }

              const { success, data } = await this.createPaymentPayPal(this.orderId);

              if (!success) {
                throw new Error('Creating payment has been failed');
              }

              const { orderId } = data;

              console.log('=========1========');

              return orderId;
            } catch (err) {
              console.error(err);
              this.redirectToOrderPagePayPal();
            }
          },
          // Finalize the transaction on the server after payer approval
          onApprove: async () => {
            try {
              const { success } = await this.approvePaymentPayPal(this.orderId);

              if (!success) {
                throw new Error('Approving payment has been failed');
              }

              console.log('=========2========');
              this.redirectToOrderPagePayPal(true);
            } catch (err) {
              this.setPaymentError();
              this.redirectToOrderPagePayPal();
              console.error(err);
            }
          }
        })
        .render('#paypal-button-container');
    },

    redirectToOrderPagePayPal(isSuccess = false) {
      this.$router.push({
        name: 'order-id',
        params: { id: this.orderId },
        ...(isSuccess && { query: { paypal_redirect: true } })
      });
    },

    async generatePaymentIntent() {
      try {
        if (this.clientSecret) {
          return this.clientSecret;
        }

        const { client_secret: clientSecret } = await this.fetchStripeClientSecret();
        this.clientSecret = clientSecret || '';

        return clientSecret;
      } catch (err) {
        console.error(err);
      }
    },

    setStripePaymentRequest() {
      this.paymentRequest = this.stripe.paymentRequest({
        country: 'GB',
        currency: 'gbp',
        total: {
          label: 'Total',
          amount: this.stripeAmount * 100
        },
        requestPayerName: true,
        requestPayerEmail: true
      });
    },

    async renderPayment(prButton) {
      // Check the availability of the Payment Request API first.
      const result = await this.paymentRequest.canMakePayment(); //  {applePay: false, googlePay: false, link: true}

      if (result) {
        prButton.mount('#payment-request-button');
        const paymentName = this.getPaymentName(result);
        this.$emit('addPayment', paymentName);
      } else {
        document.getElementById('payment-request-button').style.display = 'none';
      }
    },

    async initStripePaymentButtons() {
      try {
        await this.generatePaymentIntent();

        this.stripe = await window.Stripe(process.env.stripePublicKey);

        this.setStripePaymentRequest();

        const elements = this.stripe.elements();
        const prButton = elements.create('paymentRequestButton', {
          paymentRequest: this.paymentRequest
        });

        await this.renderPayment(prButton);

        this.paymentRequest.on('paymentmethod', async (ev) => {
          // Confirm the PaymentIntent without handling potential next actions (yet).

          const { success: status, data: statusData } = await this.setCheckoutToPay();

          if (!status) {
            const { title } = statusData;
            this.setPaymentError({ title, isRedirect: true });

            return;
          }

          const { paymentIntent, error: confirmError } = await this.stripe.confirmCardPayment(
            this.clientSecret,
            { payment_method: ev.paymentMethod.id },
            { handleActions: false }
          );

          if (confirmError) {
            // Report to the browser that the payment failed, prompting it to
            // re-show the payment interface, or show an error message and close
            // the payment interface.
            ev.complete('fail');
          } else {
            // Report to the browser that the confirmation was successful, prompting
            // it to close the browser payment method collection interface.
            ev.complete('success');
            // Check if the PaymentIntent requires any actions and if so let Stripe.js
            // handle the flow. If using an API version older than "2019-02-11"
            // instead check for: `paymentIntent.status === "requires_source_action"`.
            if (paymentIntent.status === 'requires_action') {
              // Let Stripe.js handle the rest of the payment flow.
              const { error } = await this.stripe.confirmCardPayment(this.clientSecret);
              if (error) {
                throw new Error(error);
                // The payment failed -- ask your customer for a new payment method.
              } else {
                // The payment has succeeded.
              }
            } else {
              // The payment has succeeded.
              console.log('The payment has succeeded. Redirect to order page');

              this.$router.push({
                name: 'order-id',
                params: { id: this.orderId },
                query: { payment_intent: this.clientSecret }
              });
            }
          }
        });
      } catch (err) {
        console.error(err);
        this.setPaymentError();

        // Временно скрыт
        // this.$router.push({
        //   name: 'order-id',
        //   params: { id: this.orderId }
        // });
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.payment__button {
  z-index: 1;
}

.loading-text {
  margin-right: 12px;
}

#paypal-button-container {
  max-width: 100%;
}
</style>
