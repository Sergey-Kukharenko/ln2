<template>
  <div class="payment">
    <div class="payment__select">
      <checkout-payment-select ref="paymentSelect" :list="availablePaymentMethods">
        <template #title> Payment method </template>
        <template #label>
          <div class="payment__select-label">
            <svg-icon class="payment__icon-select" :name="availablePaymentMethods[selectIndex].iconSelect" />
            <div>{{ availablePaymentMethods[selectIndex].label }}</div>
          </div>
        </template>
        <template #default="{ item, index, close }">
          <div
            v-show="isItemVisible(index)"
            class="payment__select-item"
            :class="getRoundedActive(index)"
            @click="onClickSelect(index, close)"
          >
            <div class="payment__select-item-left">
              <svg-icon class="payment__select-item-icon" :class="getIconBackgroundColor(index)" :name="item.icon" />
              <div class="label">
                <div class="label__text">
                  {{ item.label }}
                </div>
              </div>
            </div>
            <!-- <div class="payment__select-item-right">
              <svg-icon class="payment__icon" :name="item.icon" />
              <div class="payment__icon-variants">
                <checkout-payment-variants :payment-variants="item.variantIcons" />
              </div>
            </div> -->
          </div>
        </template>
      </checkout-payment-select>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import CheckoutPaymentSelect from '~/components/checkout/CheckoutPaymentSelect.vue';
import { PAYMENT_METHOD_COOKIE } from '~/constants';

export default Vue.extend({
  name: 'CheckoutPaymentMethods',

  components: {
    CheckoutPaymentSelect
  },

  props: {
    availablePaymentMethods: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data() {
    return {
      selectIndex: 0
    };
  },

  methods: {
    onClickSelect(index, close) {
      this.selectIndex = index;
      this.$accessor.payment.SET_PAYMENT_METHOD(this.availablePaymentMethods[index].name);
      this.$cookies.set(PAYMENT_METHOD_COOKIE, this.availablePaymentMethods[index].name);

      if (!close) {
        return;
      }

      close();
    },

    getIconBackgroundColor(index) {
      return index !== 0 ? 'grey-bg' : null;
    },

    isItemVisible(index) {
      return index !== this.selectIndex;
    },

    getRoundedActive(index) {
      const isRounded = this.availablePaymentMethods.length - 1 === index;

      return {
        'payment__select-item--rounded': isRounded
      };
    }
  }
});
</script>

<style lang="scss" scoped>
.payment {
  margin-top: 12px;

  &__tabs {
    @include lt-lg {
      display: none;
    }

    .tab-label {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-left: 16px;

      &__text {
        font-family: $golos-regular;
        font-size: 16px;
        line-height: 24px;
        color: $color-dark-grey;
      }

      &__icons {
        display: flex;
        justify-content: flex-end;
        gap: 4px;
      }

      &__icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 28px;
        background-color: #fff;
        border-radius: 12px;
      }
    }
  }

  &__tab-item {
    display: flex;
    flex-direction: row;
    align-items: center;

    flex: 1 1 auto;
    width: 100%;
    font-family: $golos-regular;
    font-size: 16px;
    line-height: 24px;
    color: $color-dark-grey;
  }

  &__select {
    & .app-select__field {
      padding: 0 8px 0 24px;
    }
  }

  &__select-label {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: $golos-regular;
    font-size: 12px;
    line-height: 130%;
    letter-spacing: -0.24px;
    color: $color-dark-grey;
  }

  &__select-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px 14px 16px;
    cursor: pointer;

    &:active {
      background: #eaeaea;
    }

    &--rounded {
      border-radius: 0 0 12px 12px;
    }

    &-radio {
      @include gt-sm {
        display: none;
      }
    }

    &-icon {
      width: 16px;
      height: 16px;
      &.grey-bg {
        width: 16px;
        height: 16px;
        border-radius: 12px;
        background: #f7f7f7;
      }
    }
  }

  &__select-item-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;

    .label {
      display: flex;
      flex-direction: column;
      gap: 2px;

      &__icons {
        display: flex;
        gap: 4px;

        @include gt-sm {
          display: none;
        }
      }

      &__text {
        font-family: $golos-regular;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: -0.02em;
      }

      &__icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 24px;
        background-color: rgba(234, 234, 234, 0.5);
        border-radius: 6px;
      }
    }
  }

  &__select-item-right {
    padding-right: 4px;

    @include gt-sm {
      width: 80px;
    }
  }

  &__icon-item {
    width: 32px;
    height: 32px;
  }

  &__icon,
  &__icon-variants {
    width: 20px;
    height: 20px;
  }

  &__icon {
    @include gt-sm {
      display: none;
    }
  }

  &__icon-variants {
    @include lt-md {
      display: none;
    }
  }

  &__icon-select {
    width: 18px;
    height: 18px;
    margin-right: 2px;
  }
}
</style>
