<template>
  <div class="gift-box-page">
    <app-gift-box :title="title" :discount="discount" :code="code" :date="date" />
  </div>
</template>

<script>
import AppGiftBox from '~/components/AppGiftBox.vue';

export default {
  name: 'GiftBoxPage2',
  components: { AppGiftBox },
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
