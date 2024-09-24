<template>
  <div class="banner">
    <div class="banner__container">
      <svg-icon class="banner__icon" name="dismiss" @click="$emit('hide-banner')" />
      <img :src="banner.icon" class="banner__image" :alt="`${banner.title} icon`" />
      <div class="banner__content">
        <div class="banner__title">{{ banner.title }}</div>
        <div class="banner__text">{{ banner.description }}</div>
      </div>
    </div>
    <button class="banner__button" @click="downloadApp">Get</button>
  </div>
</template>

<script>
export default {
  name: 'AppDownloadMobileApp',

  props: {
    banner: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    downloadApp() {
      location.href = this.banner.link;
    }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  width: 100vw;
  padding: 10px 5px;
  top: 0px;
  position: fixed;
  z-index: 3;
  border-bottom: 1px solid #eaeaea;
  background: #ffffff;

  &__container {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__icon {
    width: 18px;
    height: 18px;
  }

  &__image {
    display: block;
    width: 36px;
    height: 36px;
    border-radius: 8px;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-family: $golos-regular;
    font-size: 15px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: -0.01em;
  }

  &__text {
    font-family: $golos-regular;
    font-size: 10px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: -0.02em;
    color: #6d7885;
  }

  &__button {
    outline: none;
    border: 0;
    background: #007aff;
    width: 70px;
    height: 30px;
    border-radius: 64px;
    color: #fff;
    font-family: $golos-regular;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
  }
}
</style>
