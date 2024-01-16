<template>
  <div class="image" :style="styles"></div>
</template>

<script>
export default {
  name: 'CheckoutProductImage',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  computed: {
    styles() {
      return {
        backgroundImage: `url(${this.url})`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.image {
  flex-shrink: 0;
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  border-radius: 12px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #ccc;

  @include lt-lg {
    width: 56px;
    height: 56px;
  }
}
</style>
