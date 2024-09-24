<template>
  <div class="gift-box-page-wrapper">
    <div class="gift-box-page">
      <app-gift-box :title="title" :text="text" />
    </div>
    <app-benefits :benefits="$options.BENEFITS" />
  </div>
</template>

<script>
import AppBenefits from '~/components/AppBenefits.vue';
import AppGiftBox from '~/components/AppGiftBox.vue';
import benefits from '~/mocks/benefits';

export default {
  name: 'GiftBoxPage1',
  components: { AppBenefits, AppGiftBox },
  BENEFITS: benefits,
  data() {
    return {
      title: "OOPS, IT'S EMPTY HERE...",
      text: 'Try searching again'
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
