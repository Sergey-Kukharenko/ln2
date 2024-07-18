<template>
  <div class="checkout-steps">
    <div
      v-for="item in steps"
      :key="item.id"
      class="checkout-steps__item"
      :class="{ 'checkout-steps__item--active': getActiveTab(item.id) }"
      @click="changeStep(item.id)"
    ></div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'CheckoutSteps',

  props: {
    steps: {
      type: Array,
      default: () => []
    },

    step: {
      type: Number,
      default: 1
    }
  },

  methods: {
    getActiveTab(id) {
      return id <= this.step;
    },

    changeStep(id) {
      this.$accessor.checkout.SET_STEP(id);
    }
  }
});
</script>

<style lang="scss" scoped>
.checkout-steps {
  display: flex;
  justify-content: center;
  margin-top: 8px;

  @include gt-sm {
    gap: 6px;
    width: 152px;
  }

  @include lt-md {
    gap: 4px;
    width: 108px;
  }

  &__item {
    border-radius: 100px;
    background: rgba(234, 234, 234, 1);

    @include gt-sm {
      width: 60px;
      height: 5px;
    }

    @include lt-md {
      width: 48px;
      height: 4px;
    }

    &--active {
      background: rgba(0, 153, 89, 1);
    }
  }
}
</style>
