<template>
  <div class="checkout-layout">
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
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'CheckoutLayout',

  components: {
    CheckoutDetails,
    CheckoutFooterBottom,
    CheckoutHeader
  },

  middleware: ['auth'],

  computed: {
    ...accessorMapper('checkout', ['isDetailsVisible'])
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
