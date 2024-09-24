<template>
  <div class="cart-edit" @click="$emit('edit')">Edit</div>
</template>

<script>
export default {
  name: 'CartProductEdit'
};
</script>

<style lang="scss" scoped>
.cart-edit {
  color: $color-dark-green;
  font-family: $golos-medium;
  font-size: 16px;
  font-weight: 500;
  line-height: 17.6px;
  letter-spacing: -0.02em;

  &:hover {
    cursor: pointer;
  }

  @include lt-md {
    display: none;
  }
}
</style>
