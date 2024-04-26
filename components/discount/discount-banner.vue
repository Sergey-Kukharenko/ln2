<template>
  <div class="discount-banner">
    <div class="layout discount">
      <div class="title">
        <div v-for="(part, idx) in banner.title" :key="idx">{{ part }}</div>
      </div>
    </div>
    <img :src="banner.img[deviceType]" :alt="banner.img[deviceType]" class="img" />
  </div>
</template>

<script>
export default {
  name: 'DiscountBanner',

  props: {
    banner: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    deviceType() {
      return this.$device.isMobileOrTablet ? 'mobile' : 'desktop';
    }
  }
};
</script>

<style scoped lang="scss">
.discount-banner {
  position: relative;
  background: $bg-green;

  @include gt-sm {
    height: 328px;
  }

  @include lt-sm {
    height: 160px;
  }
}

.discount {
  display: flex;
  align-items: center;
  height: 100%;
  box-sizing: border-box;

  @include lt-sm {
    padding: 0 16px;
  }
}

.title {
  font-family: $Literata;
  font-style: normal;
  font-weight: 700;
  color: $color-dark-grey;
  margin: 0;

  @include gt-sm {
    font-size: 48px;
    line-height: 60px;
  }

  @include lt-sm {
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
  }
}

.img {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
