<template>
  <cart-button size="large" :stretch="true" :class="{ disabled }" @click="$emit('submit')">
    <div class="checkout__submit-template">
      <div v-if="disabled" class="checkout__submit-loading">
        <span>Loading </span>
        <app-loading-dots />
      </div>
      <div v-else>Go to payment</div>
      <div v-if="isPrice" class="checkout__submit-price">
        £ {{ price.totalSum }} <span>• {{ price.deliveryAmount }} delivery</span>
      </div>
    </div>
  </cart-button>
</template>

<script>
import { useObjectNotEmpty } from '~/helpers';

export default {
  components: {
    AppLoadingDots: () => import('@/components/shared/AppLoadingDots.vue')
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
  },

  computed: {
    isPrice() {
      return useObjectNotEmpty(this.price);
    }
  }
};
</script>

<style lang="scss" scoped>
.disabled {
  pointer-events: none;
}

.checkout {
  &__submit-template {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  &__submit-loading {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__submit-price {
    font-family: $golos-bold;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
    margin-left: auto;

    span {
      color: #ffffff77;
    }

    @include lt-lg {
      font-size: 14px;
    }
  }
}
</style>
