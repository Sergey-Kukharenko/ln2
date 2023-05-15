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
      <h1 class="payment__price">{{ checkoutPrice.totalSum }} £</h1>
      <div v-if="isMounted" class="payment__form">
        <stripe-element-payment
          ref="paymentRef"
          locale="en"
          :pk="$options.STRIPE.publicKey"
          :elements-options="elementsOptions"
          :hide-postal-code="true"
          :confirm-params="confirmParams"
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
import { mapGetters } from 'vuex';

import AppLogo from '~/components/header/AppLogo';
import AppButton from '~/components/shared/AppButton';
import AppSpinnerLoader from '~/components/shared/AppSpinnerLoader';

import { STRIPE } from '~/constants/payment';

export default {
  name: 'StripePage',

  components: {
    StripeElementPayment: () =>
      import('@vue-stripe/vue-stripe').then(({ StripeElementPayment }) => StripeElementPayment),
    AppLoadingDots: () => import('@/components/shared/AppLoadingDots'),
    AppSpinnerLoader,
    AppButton,
    AppLogo
  },

  layout: 'stripe-payment',

  STRIPE,

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
      isMounted: false,
      submitLoading: false,
      elementLoading: true,

      redirectTImer: null
    };
  },

  async fetch({ store }) {
    try {
      await store.dispatch('checkout/fetchCheckout');
    } catch (error) {
      console.error(error);
    }
  },

  computed: {
    ...mapGetters({
      checkout: 'checkout/getCheckout',
      checkoutPrice: 'checkout/checkoutCost'
    }),

    orderId() {
      return this.checkout?.id;
    },

    isPaid() {
      return this.checkout?.is_paid;
    },

    confirmParams() {
      return {
        return_url: `${location.origin}/order/${this.orderId}`
      };
    }
  },

  async mounted() {
    await this.generatePaymentIntent();
    this.checkOrder();
    this.isMounted = true;
  },

  beforeDestroy() {
    this.submitLoading = false;
    this.elementLoading = true;
    this.isMounted = false;

    clearTimeout(this.stripeTimeoutPayT);
  },

  methods: {
    catchPaymentError(err) {
      this.submitLoading = false;
      console.error(err);
    },

    initializeElement() {
      this.elementLoading = false;
    },

    redirectToOrder() {
      this.$router.push({
        name: 'order-id',
        params: { id: this.orderId },
        query: { payment_intent: this.elementsOptions.clientSecret }
      });
    },

    checkOrder() {
      if (!this.orderId) {
        this.$router.push({ name: 'index' });
      }

      if (this.isPaid) {
        this.redirectToOrder();
      }
    },

    async generatePaymentIntent() {
      try {
        const paymentIntent = await this.$store.dispatch('payment/fetchStripeClientSecret', this.orderId);
        this.elementsOptions.clientSecret = paymentIntent.client_secret;
      } catch (err) {
        console.error(err);
      }
    },

    async paymentHandler() {
      try {
        this.submitLoading = true;
        await this.$refs.paymentRef.submit();
        this.stripeTimeoutPayT = setTimeout(() => {
          this.$router.push({
            name: 'order-id',
            params: { id: this.orderId }
          });
        }, STRIPE.redirectDelay);
      } catch (err) {
        console.error(err);
        const errLog = this.prepareLog(err);
        await this.$store.dispatch('logs/sendLog', errLog);
      }
    },

    prepareLog(errMsg) {
      return {
        domain: location.host,
        user_agent: navigator.userAgent,
        level: 'ERROR',
        message: 'Stripe error message',
        path: location.pathname,
        context: {
          data: errMsg
        }
      };
    },

    goBack() {
      this.$router.push({ name: 'order-id', params: { id: this.orderId } });
    }
  }
};
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

    &-close-icon {
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
  }

  &__price {
    font-family: $golos-medium;
    // font-size: ;
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
