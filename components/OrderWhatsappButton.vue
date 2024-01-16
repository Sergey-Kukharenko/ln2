<template>
  <a :href="whatsapp" target="_blank" rel="nofollow noopener" class="whatsapp-btn">
    <div class="whatsapp-btn__icon-box">
      <svg-icon name="whatsapp-outline-green" class="whatsapp-btn__icon" />
    </div>
    <div class="whatsapp-btn__text">Having issues? Write us on whatsapp</div>
  </a>
</template>

<script>
export default {
  name: 'OrderWhatsappButton',

  computed: {
    whatsapp() {
      return this.$store.getters['layout/getCall']?.whatsapp;
    }
  }
};
</script>

<style lang="scss" scoped>
.whatsapp-btn {
  @include lt-md {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 36px;
    border: 1px solid $color-dark-green;
    border-radius: 8px;

    & > div {
      margin-left: 8px;
    }

    &__icon {
      width: 20px;
      height: 20px;
    }

    &__text {
      font-family: $golos-regular;
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 17px;
      letter-spacing: -0.01em;
      color: $color-dark-green;
    }
  }
}
</style>
