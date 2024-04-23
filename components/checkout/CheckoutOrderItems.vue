<template>
  <div class="checkout-order">
    <h3 class="checkout-order__title">Order items</h3>
    <div class="checkout-order__costs">
      <div class="checkout-order__cost">
        <div class="checkout-order__cost-title">{{ itemsText }}</div>
        <div class="checkout-order__cost-value">{{ cost.itemsCost }}</div>
      </div>
      <div class="checkout-order__cost">
        <div class="checkout-order__cost-title">Delivery</div>
        <div class="checkout-order__cost-value">{{ cost.deliveryAmount }}</div>
      </div>
    </div>
    <div class="checkout-order__total">
      <div class="checkout-order__total-item">Total</div>
      <div class="checkout-order__total-item">{{ cost.totalSum }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutOrderItems',

  props: {
    cost: {
      type: Object,
      default: () => ({})
    },

    positionsCount: {
      type: Number,
      default: 0
    }
  },

  computed: {
    itemsText() {
      return `${this.positionsCount} ` + (this.positionsCount > 1 ? 'items' : 'item');
    }
  }
};
</script>

<style lang="scss" scoped>
.checkout-order {
  &__title {
    font-family: $Literata;
    color: $color-dark-grey;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.01em;
    margin: 12px 0;

    @include gt-sm {
      font-size: 20px;
    }

    @include lt-md {
      font-size: 16px;
    }
  }

  &__cost {
    display: flex;
    justify-content: space-between;

    @include gt-sm {
      margin-bottom: 8px;
    }

    @include lt-md {
      margin-bottom: 4px;
    }
  }

  &__cost-title {
    font-family: $golos-regular;
    line-height: 20px;
    color: $color-white-grey;

    @include gt-sm {
      font-size: 14px;
      letter-spacing: -0.01em;
    }

    @include lt-md {
      font-size: 12px;
      letter-spacing: -0.02em;
    }
  }

  &__cost-value {
    font-family: $golos-medium;
    line-height: 20px;
    color: $color-dark-grey;

    @include gt-sm {
      font-size: 14px;
      letter-spacing: -0.01em;
    }

    @include lt-md {
      font-size: 12px;
      letter-spacing: -0.02em;
    }
  }

  &__total {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #dde0e6;
    padding-top: 16px;
    margin-top: 16px;
  }

  &__total-item {
    font-family: $golos-medium;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.02em;
    color: $color-dark-grey;
  }
}
</style>
