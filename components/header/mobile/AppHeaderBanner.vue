<template>
  <div class="header-mobile__banner" @click="onGoToBouquetConstructor">
    <div class="header-mobile__banner-left">
      <h2 class="header-mobile__banner-title">Create your own bouquet of roses</h2>
      <p class="header-mobile__banner-desc">Choose the colour, quantity, and type of roses</p>
    </div>
    <div class="header-mobile__banner-right">
      <img class="header-mobile__banner-flowers" src="/images/flowers.png" alt="flowers" />
      <div class="header-mobile__banner-text">
        From
        <span>£32.90</span>
      </div>
    </div>
  </div>
</template>

<script>
const ROSES_RED_WHITE_BOUQUET_SLUG = 'bouquet-of-20-white-and-red-roses';

export default {
  name: 'AppHeaderMobile',

  inject: ['closeMenu'],

  methods: {
    onGoToBouquetConstructor() {
      this.$router.push({ name: 'product-id', params: { id: ROSES_RED_WHITE_BOUQUET_SLUG } });
      this.closeMenu();
    }
  }
};
</script>

<style lang="scss" scoped>
.header-mobile__banner {
  margin: 12px 0;
  padding: 12px;
  background: linear-gradient(107.99deg, #06ad5d 24.81%, #0ad172 77.56%);
  border-radius: 10px;
  display: flex;

  &-left {
    max-width: calc(100% - 60px);
    width: 100%;
  }
  &-right {
    width: 60px;
    //height: 100%;
    position: relative;
  }
  &-title {
    font-family: $golos-medium, sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    letter-spacing: -0.01em;
    color: #fff;
    margin-bottom: 7px;
  }
  &-desc {
    font-family: $golos-regular, sans-serif;
    font-size: 11px;
    line-height: 13px;
    display: flex;
    align-items: center;
    color: #fff;
    margin: 0;
  }
  &-flowers {
    position: absolute;
    top: -12px;
    right: -12px;
  }
  &-text {
    font-family: $golos-bold;
    font-weight: 600;
    font-size: 8px;
    line-height: 10px;
    letter-spacing: 0.01em;
    color: #fff;
    padding: 4px 8px;
    position: absolute;
    bottom: -10px;
    right: -11px;
    z-index: 1;
    text-align: center;
    background-image: url('/img/headerMobileBanner.svg');
    background-size: cover;
    width: 58px;
    height: 30px;
    border-radius: 6px;
    span {
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.01em;
    }
  }
}
</style>
