<template>
  <nuxt-link :class="{ 'logo--cursor-default': isMainPage }" to="/" class="logo">
    <svg-icon name="logo" class="logo__img" />
  </nuxt-link>
</template>

<script>
export default {
  name: 'AppLogo',

  computed: {
    isMainPage() {
      return this.$route.name === 'index';
    }
  }
};
</script>

<style lang="scss" scoped>
.logo {
  display: block;

  &--cursor-default {
    cursor: default;
  }

  @include lt-md {
    margin-right: auto;
  }

  &__img {
    display: block;

    @include gt-sm {
      max-width: 133.96px;
      height: 29.97px;
    }

    @include lt-md {
      max-width: 97.43px;
      height: 21.8px;
      margin-left: 17px;
    }
  }
}
</style>
