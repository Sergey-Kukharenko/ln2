<template>
  <div class="payment">
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
          hide-postal-code
          :confirm-params="confirmParams"
          @element-focus="onElementFocus"
          @element-ready="onElementReady"
          @element-change="onElementChange"
          @error="onError"
        />
        <div class="payment__submit" :class="{ disabled: submitLoading }">
          <div v-if="errorPaymentMessage" class="payment__error">{{ errorPaymentMessage }}</div>

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

import AppLogo from '~/components/header/AppLogo.vue';
import AppButton from '~/components/shared/AppButton.vue';
import AppSpinnerLoader from '~/components/shared/AppSpinnerLoader.vue';
import { accessorMapper } from '~/store';

const ERROR_CODE_MAP = {
  cardVelocityExceeded: 'card_velocity_exceeded',
  processingError: 'processing_error',
  expiredCard: 'expired_card',
  stolenCard: 'stolen_card',
  lostCard: 'lost_card',
  insufficientFunds: 'insufficient_funds',
  genericDecline: 'generic_decline',
  incorrectCvc: 'incorrect_cvc',
  incorrectNumber: 'incorrect_number',
  invalidExpiryMonth: 'invalid_expiry_month',
  invalidExpiryYear: 'invalid_expiry_year',
  invalidExpiryYearPast: 'invalid_expiry_year_past',
  invalidNumber: 'invalid_number',
  invalidCvc: 'invalid_cvc'
};

const ERROR_MESSAGE_MAP = {
  1: 'Your card was declined for making too many attempts or exceeding its amount limit.',
  2: 'An error occurred while processing your card. Try again in a little bit.',
  3: 'Your card has expired. Please try another card',
  4: 'Your card was declined. Please try another card',
  5: 'Your card has insufficient funds.',
  6: 'Your CVC security code is incorrect. Please, check your card data and try again.',
  7: 'The card number is incorrect. Please, check your card data and try again.',
  8: 'The month of expiration dates is incorrect. Please, check your card data and try again.',
  9: 'The year of expiration dates is incorrect. Please, check your card data and try again.'
};

export default Vue.extend({
  name: 'StripePage',

  components: {
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

    onElementChange() {
      this.errorPaymentMessage = '';
    },

    onError(error) {
      const { code = '', message = 'Payment error' } = error ?? {};
      this.submitLoading = false;

      switch (code) {
        case ERROR_CODE_MAP.cardVelocityExceeded:
          this.errorPaymentMessage = ERROR_MESSAGE_MAP[1];
          break;
        case ERROR_CODE_MAP.processingError:
          this.errorPaymentMessage = ERROR_MESSAGE_MAP[2];
          break;
        case ERROR_CODE_MAP.expiredCard:
          this.errorPaymentMessage = ERROR_MESSAGE_MAP[3];
          break;
        case ERROR_CODE_MAP.stolenCard:
        case ERROR_CODE_MAP.lostCard:
        case ERROR_CODE_MAP.genericDecline:
          this.errorPaymentMessage = ERROR_MESSAGE_MAP[4];
          break;
        case ERROR_CODE_MAP.insufficientFunds:
          this.errorPaymentMessage = ERROR_MESSAGE_MAP[5];
          break;
        case ERROR_CODE_MAP.incorrectCvc:
        case ERROR_CODE_MAP.invalid_cvc:
          this.errorPaymentMessage = ERROR_MESSAGE_MAP[6];
          break;
        case ERROR_CODE_MAP.incorrectNumber:
        case ERROR_CODE_MAP.invalidNumber:
          this.errorPaymentMessage = ERROR_MESSAGE_MAP[7];
          break;
        case ERROR_CODE_MAP.invalidExpiryMonth:
          this.errorPaymentMessage = ERROR_MESSAGE_MAP[8];
          break;
        case ERROR_CODE_MAP.invalidExpiryYear:
        case ERROR_CODE_MAP.invalidExpiryYearPast:
          this.errorPaymentMessage = ERROR_MESSAGE_MAP[9];
          break;

        default:
          this.errorPaymentMessage = message;
          break;
      }

      console.error(error);
    },

    onElementReady() {
      this.elementLoading = false;
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

    onElementFocus() {
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

<style lang="scss">
#stripe-payment-element-errors {
  display: none;
}
</style>

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

  &__error {
    color: $color-red;
  }

  &__submit {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    gap: 24px;

    &.disabled {
      pointer-events: none;
    }
  }
}
</style>
