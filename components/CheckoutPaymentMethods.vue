<template>
  <checkout-pane title="Payment methods">
    <div class="payment">
      <div class="payment__tabs">
        <basket-tab size="extra-large" :list="$options.PAYMENT_METHODS" @click="onClickSelect">
          <template #default="{ item }">
            <div class="payment__tab-item">
              <svg-icon class="payment__icon-item" :name="item.icon" />
              <div class="tab-label">
                <div class="tab-label__text">{{ item.label }}</div>
                <div class="tab-label__icons">
                  <div v-for="icon in item.variantIcons" :key="icon.name" class="tab-label__icon-wrapper">
                    <svg-icon
                      :name="icon.name"
                      :width="icon.desktop.width"
                      :height="icon.desktop.height"
                      class="tab-label__icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </basket-tab>
      </div>
      <div class="payment__select">
        <app-select ref="paymentSelect" size="x-large" placeholder="Payment methods" :list="$options.PAYMENT_METHODS">
          <template #label>
            <div class="payment__select-label">
              <svg-icon class="payment__icon-select" :name="$options.PAYMENT_METHODS[selectIndex].iconSelect" />
              <div>{{ $options.PAYMENT_METHODS[selectIndex].label }}</div>
            </div>
          </template>
          <template #default="{ item, index, close }">
            <div class="payment__select-item" @click="onClickSelect(index, close)">
              <div class="payment__select-item-left">
                <app-radio :value="selectIndex" :name="index" />
                <div class="label">
                  <div class="label__text">
                    {{ item.label }}
                  </div>
                  <div class="label__icons">
                    <div v-for="icon in item.variantIcons" :key="icon.name" class="label__icon-wrapper">
                      <svg-icon
                        :name="icon.name"
                        :width="icon.mobile.width"
                        :height="icon.mobile.height"
                        class="tab-label__icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="payment__select-item-right">
                <svg-icon class="payment__icon-select" :name="item.icon" />
              </div>
            </div>
          </template>
        </app-select>
      </div>
    </div>
  </checkout-pane>
</template>

<script>
import AppSelect from '~/components/shared/AppSelect';
import AppRadio from '~/components/shared/AppRadio';

import paymentMethods from '~/data/checkout-payment-methods';

export default {
  name: 'CheckoutPaymentMethods',

  components: {
    AppRadio,
    AppSelect
  },

  data() {
    return {
      selectIndex: 0
    };
  },

  PAYMENT_METHODS: paymentMethods,

  methods: {
    onClickSelect(index, close) {
      this.selectIndex = index;
      this.$store.commit('checkout/setState', { paymentMethod: paymentMethods[index].name });

      if (!close) {
        return;
      }

      close();
    }
  }
};
</script>

<style lang="scss" scoped>
.payment {
  @include gt-md {
    margin-top: 24px;
  }

  @include lt-lg {
    margin-top: 12px;
  }

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
        font-style: normal;
        font-weight: 400;
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
    display: none;

    @include lt-lg {
      display: block;
    }
  }

  &__select-label {
    display: flex;
    flex-direction: row;
    align-items: center;

    color: $color-dark-grey;
  }

  &__select-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }

  &__select-item-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;

    .label {
      display: flex;
      flex-direction: column;
      gap: 2px;

      &__icons {
        display: flex;
        gap: 4px;
      }

      &__text {
        font-size: 14px;
        font-weight: 400;
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
  }

  &__icon-item {
    width: 32px;
    height: 32px;
  }

  &__icon-select {
    width: 32px;
    height: 32px;

    margin-right: 8px;
  }
}
</style>
