<template>
  <div class="basket-text">
    <div v-if="getText" class="basket-text__content" :style="wordBeakStyle">
      Text: <span class="basket-text__content">{{ getText }}</span>
    </div>
    <div class="basket-text__edit" @click="$emit('edit')">Edit</div>
  </div>
</template>

<script>
export default {
  name: 'BasketProductText',

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  computed: {
    getText() {
      const stringLength = this.$device.isMobileOrTablet ? 71 : 118;
      return this.value.length ? this.value.substring(0, stringLength) + '...' : '';
    },

    wordBeakStyle() {
      return { 'word-break': this.getText.includes(' ') ? 'break-word' : 'break-all' };
    }
  }
};
</script>

<style lang="scss" scoped>
.basket-text {
  font-family: $golos-regular;
  font-weight: 400;
  color: $color-dark-grey;

  @include gt-sm {
    font-size: 14px;
    line-height: 18.2px;
    letter-spacing: -0.01em;
    max-width: 95%;
  }

  @include lt-md {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.02em;
  }

  &__content {
    color: $color-white-grey;
  }

  &__edit {
    @include gt-sm {
      display: none;
    }

    color: $color-dark-green;
  }
}
</style>
