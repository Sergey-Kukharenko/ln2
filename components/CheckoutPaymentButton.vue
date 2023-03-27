<template>
  <div v-if="isMounted" class="payment__button">
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="$options.STRIPE.publicKey"
      :line-items="stripeMappedProductItems"
      :success-url="stripeRedirectLinks.successURL"
      :cancel-url="stripeRedirectLinks.cancelURL"
      @loading="(v) => (loading = v)"
    />
    <checkout-submit :price="price" :disabled="loading" @submit="submitCheckout" />
  </div>
</template>

<script>
import { STRIPE } from '~/constants/payment';
import { useObjectUniqueByKey } from '~/helpers';

export default {
  name: 'CheckoutPaymentButton',

  components: {
    StripeCheckout: () => import('@vue-stripe/vue-stripe').then(({ StripeCheckout }) => StripeCheckout)
  },

  props: {
    positions: {
      type: Array,
      default: () => []
    },

    orderId: {
      type: String,
      default: ''
    },

    price: {
      type: Object,
      default: () => ({})
    },

    fastDeliveryKey: {
      type: String,
      default: ''
    },

    readyToPay: {
      type: Boolean,
      default: false
    }
  },

  STRIPE,

  data() {
    return {
      isMounted: false,
      loading: false
    };
  },

  computed: {
    stripeMappedProductItems() {
      const externalPositionKeys = this.positions.map((p) => ({
        external_key: p.external_keys.stripe
      }));
      const uniquePositions = useObjectUniqueByKey(externalPositionKeys, 'external_key');
      const mappedItems = Object.keys(uniquePositions).map((key) => ({
        price: key,
        quantity: uniquePositions[key]
      }));

      if (this.fastDeliveryKey) {
        mappedItems.push({
          price: this.fastDeliveryKey,
          quantity: 1
        });
      }

      return mappedItems;
    },

    pathToStripe() {
      return `${process.env.baseUrl}/payment/${this.orderId}/stripe`;
    },

    stripeRedirectLinks() {
      return {
        successURL: `${this.pathToStripe}/success/`,
        cancelURL: `${this.pathToStripe}/cancel/`
      };
    }
  },

  watch: {
    readyToPay(val) {
      if (!val) {
        return;
      }

      this.goToStripeCheckout();
    }
  },

  mounted() {
    this.isMounted = true;
  },

  methods: {
    submitCheckout() {
      if (this.loading) {
        return;
      }

      this.$emit('submit');
      this.loading = true;
    },

    async goToStripeCheckout() {
      try {
        const res = await this.$refs.checkoutRef.redirectToCheckout();
        console.log('Success res', res);
      } catch (err) {
        const errLog = this.prepareLog(err);
        // без await, ибо запрос не приоритетный (сначала синхронные таски, после микротаска)
        this.$store.dispatch('logs/sendLog', errLog);

        if (!this.orderId) {
          return;
        }

        this.$router.push({ name: 'order-id', params: { id: this.orderId } });
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
