<template>
  <div class="cart-remove" :class="{ 'cart-remove--loading': isLoading }" @click="$emit('update:count', 0)">
    <svg-icon name="trash-bin" class="cart-remove__icon" />
  </div>
</template>

<script>
export default {
  name: 'CartProductRemove',

  props: {
    isLoading: {
      type: Boolean,
      default: false
    },

    count: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-remove {
  height: 36px;
  width: 36px;
  border-radius: 10px;
  background: $bg-grey;
  display: flex;
  align-items: center;
  justify-content: center;

  @include gt-sm {
    &:hover {
      cursor: pointer;
    }
  }

  &--loading {
    opacity: 0.8;
    pointer-events: none;
  }

  &__icon {
    width: 20px;
    height: 20px;
  }
}
</style>
