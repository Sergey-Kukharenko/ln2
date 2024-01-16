<template>
  <div class="payment-item">
    <div class="payment-item__logo">
      <svg-icon :name="item.icon" class="payment-item__logo-icon" />
    </div>
    {{ item.label }}
    <payment-icons :icons="item.variantIcons" />
  </div>
</template>

<script>
import PaymentIcons from '~/components/PaymentIcons.vue';

export default {
  name: 'PaymentItem',
  components: { PaymentIcons },

  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style scoped lang="scss">
.payment-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 20px 0;
  width: 100%;
  user-select: none;
  cursor: pointer;
  font-family: $golos-regular;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: $color-dark-grey;

  @include lt-md {
    flex: 1;
    flex-direction: row-reverse;
    justify-content: space-between;
    cursor: none;
  }

  &__logo {
    @include lt-md {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      background: #f7f7f7;
      border-radius: 12px;
    }
  }

  &__logo-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
