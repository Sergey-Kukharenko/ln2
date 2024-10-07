<template>
  <div v-if="!loading" class="checkout-layout">
    <div class="checkout-layout__group" :class="{ 'checkout-layout__group--shadow': !isDetailsVisible }">
      <checkout-header :is-details-visible="isDetailsVisible" />
      <checkout-details v-show="isDetailsVisible" />
    </div>
    <div class="checkout-container">
      <Nuxt />
    </div>
    <footer>
      <checkout-footer-bottom />
    </footer>
  </div>
</template>
<script>
import Vue from 'vue';

import CheckoutDetails from '~/components/checkout/CheckoutDetails.vue';
import CheckoutFooterBottom from '~/components/checkout/CheckoutFooterBottom.vue';
import CheckoutHeader from '~/components/checkout/CheckoutHeader.vue';
import { GTM_EVENTS_MAP } from '~/constants/gtm';
import addGtag from '~/mixins/addGtag.vue';
import gtm from '~/mixins/gtm.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'CheckoutLayout',

  components: {
    CheckoutDetails,
    CheckoutFooterBottom,
    CheckoutHeader
  },

  mixins: [gtm, addGtag],

  middleware: ['auth'],

  data() {
    return {
      loading: true
    };
  },

  computed: {
    ...accessorMapper('checkout', ['isDetailsVisible']),
    ...accessorMapper('cart', ['getCart'])
  },

  created() {
    if (process.server) {
      return;
    }

    this.initializeCheckout();
  },

  mounted() {
    this.gtmClearItemEvent();
    this.dataLayerSetOriginalUrl();
    this.gtmBeginCheckoutEvent();
    this.onAddGtagScript();
  },

  beforeDestroy() {
    this.setDefaultPaymentMethod();
  },

  methods: {
    ...accessorMapper('payment', ['setDefaultPaymentMethod']),

    async initializeCheckout() {
      try {
        await Promise.allSettled([
          this.$accessor.checkout.fetchCheckout(),
          this.$accessor.checkout.fetchIntervals(),
          this.$accessor.payment.getClientIdPayPal()
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    gtmBeginCheckoutEvent() {
      const items = this.getCart.map((item) => ({
        item_name: item.offer_title,
        item_id: item.offer_real_id,
        price: item.price,
        item_brand: 'myflowers',
        item_category: item.category_name,
        item_variant: item.title,
        quantity: item.quantity
      }));

      this.$gtm.push({
        event: GTM_EVENTS_MAP.beginCheckout,
        ecommerce: {
          items
        }
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.checkout-layout {
  width: 100%;
  min-height: 100dvh;

  @include xs {
    background: $bg-grey;
  }

  &__group {
    @include lt-md {
      position: relative;
      z-index: 1;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.04);
    }
  }
}

.checkout-container {
  background: #fff;
  max-width: 526px;
  margin: 0 auto;

  @include gt-sm {
    min-height: calc(100dvh - 158px);
  }

  @include lt-md {
    min-height: calc(100dvh - 177px);
  }

  @include xs {
    min-height: auto;
    border-radius: 0 0 20px 20px;
  }
}

footer {
  width: 100%;
  background: $bg-grey;
}
</style>
