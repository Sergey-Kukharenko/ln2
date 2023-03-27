<template>
  <div class="title">
    <div class="title__label">{{ orderTitle }}</div>
    <div class="title__link">{{ linkText }}</div>
  </div>
</template>

<script>
import { ORDER_STATUS_TEXT } from '~/constants';

export default {
  name: 'OrderTitle',

  props: {
    isPaid: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    orderTitle() {
      return this.isPaid ? ORDER_STATUS_TEXT.paid.title : ORDER_STATUS_TEXT.notPaid.title;
    },

    linkText() {
      return this.isPaid ? ORDER_STATUS_TEXT.paid.text : ORDER_STATUS_TEXT.notPaid.text;
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 8px;

  @include lt-lg {
    gap: 12px;
    padding-bottom: 22px;
  }

  @include lt-md {
    padding-bottom: 0;
  }

  &__label {
    font-family: $Literata;
    font-weight: 700;
    font-size: 28px;
    line-height: 32px;
    color: $color-dark-grey;
  }

  &__link {
    font-family: $golos-regular;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: $color-dark-green;

    @include lt-md {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.01em;
    }
  }
}
</style>
