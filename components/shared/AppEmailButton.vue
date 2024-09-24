<template>
  <a :href="`mailto:${email}`" class="email" :class="{ is_gray: isGray }" :style="{ maxWidth }">
    <svg-icon name="mail" class="email__icon" />
    <span class="email__text">{{ email }}</span>
  </a>
</template>

<script>
export default {
  name: 'AppEmailButton',

  props: {
    isGray: {
      type: Boolean,
      default: false
    },

    maxWidth: {
      type: String,
      default: 'auto'
    },

    email: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.email {
  display: flex;
  align-items: center;
  gap: 11px;
  background: #ffffff;
  border-radius: 10px;
  height: 48px;
  padding: 0 18px;

  &.is_gray {
    background: #f7f7f7;
  }

  &__icon {
    width: 18px;
    height: 18px;
  }

  &__text {
    font-family: $golos-regular;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: $color-dark-grey;
  }
}
</style>
