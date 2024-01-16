<template>
  <div class="trustpilot-stars">
    <div v-for="item in stars" :key="item" class="trustpilot-stars__item">
      <svg-icon name="trustpilot-star" class="trustpilot-stars__icon" />
      <div class="trustpilot-stars__item-bg" :style="itemWidth(item)"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTrustpilotStars',

  props: {
    rate: {
      type: Number,
      default: 5
    }
  },

  data() {
    return {
      stars: 5
    };
  },

  methods: {
    itemWidth(item) {
      let width = '0';

      if (item > this.rate) {
        if (item - this.rate > 1) {
          width = '0';
        } else {
          width = (this.rate - (item - 1)) * 100;
        }
      } else {
        width = '100';
      }

      return {
        width: `${width}%`
      };
    }
  }
};
</script>

<style scoped lang="scss">
.trustpilot-stars {
  display: flex;

  @include gt-sm {
    gap: 4.253px;
    margin: 0 12px;
  }

  @include lt-md {
    gap: 3.6px;
    margin: 0 6px 0 8px;
  }

  &__item {
    position: relative;
    background: #d9d9d9;

    @include gt-sm {
      width: 21.263px;
      height: 21.263px;
    }

    @include lt-md {
      width: 18px;
      height: 18px;
    }
  }

  &__item-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background: #00b67a;
  }

  &__icon {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
  }
}
</style>
