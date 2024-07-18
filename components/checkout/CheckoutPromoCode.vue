<template>
  <div class="promocode">
    <app-promo-code />
  </div>
</template>

<script>
import AppPromoCode from '~/components/AppPromoCode.vue';

export default {
  name: 'CheckoutPromoCode',
  components: { AppPromoCode }
};
</script>

<style lang="scss" scoped>
.promocode {
  margin-top: 12px;
}
</style>
