<template>
  <div class="details-button" @click="onClick">{{ detailsButtonText }}</div>
</template>

<script>
import Vue from 'vue';

const OPEN_TEXT = 'Order details';
const CLOSE_TEXT = 'Close';

export default Vue.extend({
  name: 'CheckoutDetailsButton',

  props: {
    isDetailsVisible: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    detailsButtonText() {
      return this.isDetailsVisible ? CLOSE_TEXT : OPEN_TEXT;
    }
  },

  methods: {
    onClick() {
      this.$accessor.checkout.SET_DETAILS_VISIBLE(!this.isDetailsVisible);
    }
  }
});
</script>

<style lang="scss" scoped>
.details-button {
  color: $color-dark-green;
  letter-spacing: -0.02em;
  user-select: none;

  @include gt-sm {
    font-family: $golos-medium;
    font-size: 18px;
    line-height: 17.6px;
    cursor: pointer;
    width: 134px;
  }

  @include lt-lg {
    font-family: $golos-medium;
    font-size: 14px;
    line-height: 16px;
    text-align: right;
    width: 48px;
    padding-right: 12px;
  }
}
</style>
