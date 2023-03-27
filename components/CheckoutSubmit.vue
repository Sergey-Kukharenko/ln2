<template>
  <basket-button size="large" :stretch="true" :class="{ disabled }" @click="$emit('submit')">
    <div class="checkout__submit-template">
      <div v-if="disabled" class="checkout__submit-loading">
        <span>Loading </span>
        <app-loading-dots />
      </div>
      <div v-else>Go to payment</div>
      <div class="checkout__submit-price">
        £ {{ price.totalSum }} <span>• {{ price.deliveryAmount }} delivery</span>
      </div>
    </div>
  </basket-button>
</template>

<script>
export default {
  components: {
    AppLoadingDots: () => import('@/components/shared/AppLoadingDots')
  },

  props: {
    price: {
      type: Object,
      default: () => ({})
    },

    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.disabled {
  pointer-events: none;
}

.checkout__submit {
  &-template {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &-loading {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}

.checkout__submit-price {
  font-family: $golos-bold;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;

  span {
    color: #ffffff77;
  }

  @include lt-lg {
    font-size: 14px;
  }
}
</style>
