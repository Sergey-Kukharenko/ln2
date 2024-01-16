<template>
  <section class="checkout-pane" :class="classes">
    <div class="checkout-pane__title">
      <div v-show="!!number" class="checkout-pane__number">
        {{ number }}
      </div>
      <slot name="title">{{ title }}</slot>
    </div>
    <slot />
  </section>
</template>

<script>
export default {
  name: 'CheckoutPane',
  props: {
    title: {
      type: String,
      default: ''
    },

    delim: {
      type: Boolean,
      default: false
    },

    number: {
      type: Number,
      default: () => 0
    }
  },
  computed: {
    classes() {
      return {
        'checkout-pane--delim': this.delim
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.checkout-pane {
  box-sizing: border-box;
  width: 100%;
  font-family: $golos-regular;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: #010810;
  background: #ffffff;

  @include gt-md {
    padding: 16px;
  }

  @include lt-lg {
    padding: 16px 12px;
  }

  &--delim {
    margin-bottom: 8px;
    border: 1px solid #eaeaea;
    border-radius: 12px;

    @include lt-lg {
      border: 0;
      border-radius: 20px;
      margin-bottom: 4px;
    }
  }

  &__number {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid $color-dark-green;

    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-dark-green;

    font-family: $golos-regular;
    font-weight: 400;
    font-size: 12px;
    line-height: 15.6px;
  }

  &__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    font-family: $Literata;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #000000;

    @include lt-lg {
      font-size: 20px;
      line-height: 24px;
    }
  }
}
</style>
