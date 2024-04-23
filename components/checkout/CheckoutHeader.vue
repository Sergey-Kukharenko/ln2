<template>
  <div class="header-checkout">
    <div class="layout layout--horizontal-dt">
      <div class="header">
        <div class="header__logo">
          <app-logo />
        </div>
        <div class="header__go-back">
          <checkout-go-back-button :curr-checkout-step="currCheckoutStep" />
        </div>
        <checkout-total
          :checkout-steps="checkoutSteps"
          :curr-checkout-step="currCheckoutStep"
          :checkout-cost="checkoutCost"
        />
        <checkout-details-button :is-details-visible="isDetailsVisible" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import CheckoutDetailsButton from '~/components/checkout/CheckoutDetailsButton.vue';
import CheckoutGoBackButton from '~/components/checkout/CheckoutGoBackButton.vue';
import CheckoutTotal from '~/components/checkout/CheckoutTotal.vue';
import AppLogo from '~/components/header/AppLogo.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'CheckoutHeader',

  components: {
    AppLogo,
    CheckoutGoBackButton,
    CheckoutTotal,
    CheckoutDetailsButton
  },

  props: {
    isDetailsVisible: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...accessorMapper('checkout', ['currCheckoutStep', 'checkoutSteps', 'checkoutCost'])
  }
});
</script>

<style scoped lang="scss">
.header-checkout {
  background: #fff;

  @include gt-sm {
    border-bottom: 1px solid #eaeaea;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;

  &__logo {
    @include gt-sm {
      display: block;
    }

    @include lt-lg {
      display: none;
    }
  }

  &__go-back {
    @include gt-sm {
      display: none;
    }

    @include lt-lg {
      display: block;
    }
  }
}
</style>
