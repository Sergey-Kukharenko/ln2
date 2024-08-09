<template>
  <a :href="link.href" :target="link.target" :rel="link.rel" class="link-button" :class="classes">
    <svg-icon name="whatsapp-outline-green" />
    <slot />
  </a>
</template>

<script>
export default {
  name: 'AppLinkButton',

  props: {
    link: {
      type: Object,
      default: () => ({})
    },

    color: {
      type: String,
      default: 'green',
      validate(value) {
        return ['green'].includes(value);
      }
    }
  },

  computed: {
    classes() {
      return {
        [`color-${this.color}`]: this.color
      };
    }
  }
};
</script>

<style scoped lang="scss">
.link-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 6px;
  font-family: $golos-medium;

  @include gt-sm {
    font-size: 14px;
    line-height: 24px;
    border-radius: 12px;
  }

  @include lt-md {
    font-size: 13px;
    line-height: 17px;
    letter-spacing: -0.01em;
    border-radius: 8px;
  }

  &.color-green {
    color: $color-green;
    border: 1px solid $color-green;
  }

  .icon {
    width: 20px;
    height: 20px;
  }
}
</style>
