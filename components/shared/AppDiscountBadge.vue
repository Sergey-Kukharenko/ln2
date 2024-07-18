<template>
  <div class="app-discount-badge" :style="offsetStyles">
    <b class="app-discount-badge__main">+free</b>
    <span class="app-discount-badge__footer">chocolates</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppDiscountBadge',

  props: {
    offset: {
      type: [Number, String],
      default: 6
    },
    offsetTop: {
      type: [Number, String],
      default: 0
    },
    offsetLeft: {
      type: [Number, String],
      default: 0
    },
    scale: {
      type: [Number, String],
      default: 1
    }
  },

  computed: {
    offsetStyles() {
      return {
        top: `${this.offsetTop || this.offset}px`,
        left: `${this.offsetLeft || this.offset}px`,
        transform: `scale(${this.scale})`
      };
    }
  }
});
</script>

<style lang="scss" scoped>
.app-discount-badge {
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  background-image: url('/images/card-product/badges/white-badge.svg?no_cache');
  background-repeat: no-repeat;
  background-size: contain;
  padding: 4px 10px 4px 4px;
  color: #000;

  &__main,
  &__footer {
    font-family: $golos-regular;
    line-height: 1;
    letter-spacing: -0.01em;
  }

  &__main {
    font-family: $golos-extra-bold;
    font-size: 19px;
  }

  &__footer {
    font-size: 14px;
  }
}
</style>
