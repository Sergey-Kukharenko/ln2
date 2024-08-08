<template>
  <a
    href="https://api.whatsapp.com/send?phone=447300887398"
    target="_blank"
    rel="nofollow noopener"
    class="link-button"
  >
    <svg-icon name="whatsapp-outline-green" />
    Having issues? Write us on whatsapp
  </a>
</template>

<script>
export default {
  name: 'AppLinkButton',

  props: {
    href: {
      type: String,
      default: ''
    },

    target: {
      type: String,
      default: ''
    },

    rel: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
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
  color: $color-green;
  border: 1px solid $color-green;
  border-radius: 12px;
  font-family: $golos-medium;
  font-size: 14px;
  line-height: 24px;

  .icon {
    width: 20px;
    height: 20px;
  }
}
</style>
