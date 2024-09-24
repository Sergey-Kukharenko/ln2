<template>
  <div class="go-back">
    <svg-icon class="go-back__icon" name="chevron-right" @click="goBack" />
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'CheckoutGoBackButton',

  props: {
    currCheckoutStep: {
      type: Number,
      default: 1
    },

    isDetailsVisible: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    goBack() {
      if (this.currCheckoutStep > 1) {
        this.$accessor.checkout.SET_STEP(this.currCheckoutStep - 1);

        return;
      }

      this.$router.push({ name: 'cart' });
    }
  }
});
</script>

<style lang="scss" scoped>
.go-back {
  padding-left: 8px;
  width: 36px;

  &__icon {
    user-select: none;
    width: 16px;
    height: 16px;
    transform: rotate(180deg);
  }
}
</style>
