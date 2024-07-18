<template>
  <div class="payment-select" :class="{ 'payment-select--active': isOpened }">
    <div v-show="isOpened" class="payment-select__layout" @click="close"></div>
    <div class="payment-select__box" @click="onClickField">
      <div class="payment-select__title">
        <slot name="title" />
        <div class="payment-select__chevron">
          <svg-icon class="payment-select__icon" name="chevron-right" />
        </div>
      </div>
      <div class="payment-select__label">
        <slot name="label" />
      </div>

      <div v-show="isOpened" class="payment-select__list" @click.stop>
        <div v-for="(item, index) in list" :key="index" class="payment-select__list--item">
          <slot :item="item" :index="index" :open="open" :close="close" :set-label="setLabel" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutPaymentSelect',

  props: {
    list: { type: Array, default: () => [] }
  },

  data() {
    return {
      isOpened: false,
      label: ''
    };
  },

  methods: {
    open() {
      this.onClickField();
    },

    close() {
      this.isOpened = false;
    },

    setLabel(value) {
      this.label = value;
    },

    onClickField() {
      this.isOpened = !this.isOpened;
    }
  }
};
</script>

<style lang="scss" scoped>
.payment-select {
  &__layout {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
  }

  &__box {
    position: relative;
    z-index: 2;
    background: #f7f7f7;
    border-radius: 12px;

    @include gt-sm {
      cursor: pointer;
    }

    &.icon-active {
      @include lt-lg {
        transform: rotate(-90deg);
      }
    }
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 16px 0 16px;
    font-family: $golos-bold;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: $color-white-grey;
    margin-bottom: 2px;
    box-sizing: border-box;
  }

  &__label {
    padding: 0 16px 10px 16px;
    box-sizing: border-box;
    width: 100%;
  }

  &__icon {
    position: relative;
    bottom: -11px;

    width: 16px;
    height: 16px;

    transition: 0.25s all ease;
  }

  &--active {
    .payment-select {
      &__list {
        padding-bottom: 2px;
      }

      &__icon {
        transform: rotate(-90deg);
      }
    }
  }
}
</style>
