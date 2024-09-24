<template>
  <div class="gift-box-page-wrapper">
    <div class="gift-box-page">
      <app-gift-box :title="title" :discount="discount" :code="code" :date="date" />
    </div>
    <app-benefits :benefits="$options.BENEFITS" />
  </div>
</template>

<script>
import AppBenefits from '~/components/AppBenefits.vue';
import AppGiftBox from '~/components/AppGiftBox.vue';
import benefits from '~/mocks/benefits';

export default {
  name: 'GiftBoxPage2',
  components: { AppBenefits, AppGiftBox },
  BENEFITS: benefits,
  data() {
    return {
      title: 'WOW! YOU’RE LUCKY!',
      discount: '25%',
      code: 'CVT45FGY',
      date: '20.06.2024'
    };
  }
};
</script>

<style lang="scss" scoped>
.gift-box-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;

  @include lt-md {
    order: 2;
  }
}
</style>
