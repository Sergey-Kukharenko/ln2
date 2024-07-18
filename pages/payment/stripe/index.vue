<template>
  <div class="payment">
    <payment-error-modal :is-visible="!!errorPaymentMessage" @close-modal="closePaymentErrorModal" />
    <div v-if="elementLoading" class="payment__loading">
      <app-spinner-loader />
      Processing...
    </div>
    <div class="payment__logo">
      <app-logo />
      <svg-icon name="close" class="payment__logo-close-icon" @click="goBack" />
    </div>
    <div class="payment__wrapper">
      <h2 class="payment__title">Card payment</h2>
      <h1 class="payment__price">{{ totalSum }} £</h1>
      <div v-if="isMounted" class="payment__form">
        <stripe-element-payment
          ref="paymentRef"
          locale="en"
          :pk="publicKey"
          :elements-options="elementsOptions"
          :hide-postal-code="true"
          :confirm-params="confirmParams"
          @element-focus="focusHandler"
          @element-ready="initializeElement"
          @error="catchPaymentError"
        />
        <div class="payment__submit" :class="{ disabled: submitLoading }">
          <app-button size="full" theme="green" @click="paymentHandler">
            <span v-if="!submitLoading">Pay</span>
            <app-loading-dots v-else />
          </app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import PaymentErrorModal from '~/components/PaymentErrorModal.vue';
import AppLogo from '~/components/header/AppLogo.vue';
import AppButton from '~/components/shared/AppButton.vue';
import AppSpinnerLoader from '~/components/shared/AppSpinnerLoader.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'StripePage',

  components: {
    PaymentErrorModal,
    StripeElementPayment: () =>
      import('@vue-stripe/vue-stripe').then(({ StripeElementPayment }) => StripeElementPayment),
    AppLoadingDots: () => import('@/components/shared/AppLoadingDots.vue'),
    AppSpinnerLoader,
    AppButton,
    AppLogo
  },

  layout: 'payment',

  // middleware: [
  //   async function ({ redirect, store }) {
  //     try {
  //       const { id } = await store.dispatch('checkout/fetchCheckout');

  //       // if (!id) {
  //       //   redirect({ name: 'index' });
  //       //   return;
  //       // }

  //       await store.dispatch('payment/fetchStripeClientSecret', id);
  //       // const secret = paymentIntent.client_secret;

  //       // if (isPaid) {
  //       //   redirect({
  //       //     name: 'order-id',
  //       //     params: { id },
  //       //     query: { payment_intent: secret }
  //       //   });
  //       // }
  //     } catch (err) {
  //       // redirect({ name: 'index' });
  //     }
  //   }
  // ],

  data() {
    return {
      elementsOptions: {
        appearance: {
          theme: 'stripe',
          labels: 'floating',

          rules: {
            '.Tab': {
              padding: '10px 12px 8px 12px',
              marginBottom: '24px'
            }
          }
        }
      },
      publicKey: '',

      isMounted: false,
      submitLoading: false,
      elementLoading: true,

      errorPaymentMessage: ''
    };
  },

  computed: {
    ...accessorMapper('payment', ['paymentIntent']),

    confirmParams() {
      return {
        return_url: `${location.origin}/preorder/${this.orderId}`
      };
    },

    orderId() {
      return this.paymentIntent?.order_id;
    },

    totalSum() {
      return this.paymentIntent?.total_cost;
    }
  },

  async mounted() {
    await this.generatePaymentIntent();
    this.isMounted = true;
  },

  beforeDestroy() {
    this.submitLoading = false;
    this.elementLoading = true;
    this.isMounted = false;
    this.errorPaymentMessage = '';

    clearTimeout(this.stripeTimeoutPayT);
  },

  methods: {
    ...accessorMapper('payment', ['fetchStripeClientSecret']),

    closePaymentErrorModal() {
      this.$router.push({ name: 'order-id', params: { id: this.orderId } });
    },

    catchPaymentError(err) {
      this.submitLoading = false;
      console.error(err);

      this.errorPaymentMessage = err?.message || '';
    },

    initializeElement() {
      this.elementLoading = false;
    },

    redirectToOrder(id) {
      this.$router.push({
        name: 'preorder-id',
        params: { id },
        query: { payment_intent: this.elementsOptions.clientSecret }
      });
    },

    async generatePaymentIntent() {
      try {
        const { client_secret: clientSecret, public_key: publicKey } = await this.fetchStripeClientSecret();

        this.elementsOptions.clientSecret = clientSecret;
        this.publicKey = publicKey;
      } catch (err) {
        console.error('Generate payment intent error - stripe:generatePaymentIntent [157]', err);
      }
    },

    focusHandler() {
      this.submitLoading = false;
    },

    async paymentHandler() {
      try {
        this.submitLoading = true;
        await this.$refs.paymentRef.submit();
        // Редирект при ошибке временно скрыт
        // this.stripeTimeoutPayT = setTimeout(() => {
        //   this.$router.push({
        //     name: 'order-id',
        //     params: { id: this.orderId }
        //   });
        // }, STRIPE.redirectDelay);
      } catch (err) {
        console.error(err);
      }
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

  &__title {
    font-family: $golos-regular;
    font-style: normal;
    font-size: 24px;
    color: $color-dark-grey;
    margin-bottom: 8px;

    @include lt-md {
      font-size: 18px;
    }
  }

  &__submit {
    margin-top: 24px;

    &.disabled {
      pointer-events: none;
    }
  }
}
</style>
