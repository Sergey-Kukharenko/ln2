<template>
  <div>
    <app-header-mobile v-if="$device.isMobileOrTablet" />
    <app-header-checkout v-else />
    <Nuxt />
    <footer>
      <checkout-footer-bottom class="layout" />
    </footer>
  </div>
</template>
<script>
import AppHeaderMobile from '~/components/header/mobile/AppHeaderMobile';
import AppHeaderCheckout from '~/components/header-checkout/AppHeaderCheckout';
import CheckoutFooterBottom from '~/components/CheckoutFooterBottom';

export default {
  name: 'CheckoutLayout',

  components: {
    CheckoutFooterBottom,
    AppHeaderMobile,
    AppHeaderCheckout
  },

  middleware: ['auth']
};
</script>

<style lang="scss" scoped>
footer {
  background: $bg-grey;
}
</style>
