<template>
  <div class="gift-box-page">
    <app-gift-box :title="title" :text="text" />
  </div>
</template>

<script>
import AppGiftBox from '~/components/AppGiftBox.vue';

export default {
  name: 'GiftBoxPage1',
  components: { AppGiftBox },
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
