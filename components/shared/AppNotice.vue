<template>
  <figure class="notice">
    <svg-icon name="truck-white" class="notice__icon" />
    <figcaption class="notice__figcaption">Free delivery</figcaption>
  </figure>
</template>

<script>
export default {
  name: 'AppNotice'
};
</script>

<style scoped lang="scss">
.notice {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  width: 135px;
  height: 36px;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 2;
  bottom: 16px;
  margin: auto;
  background: rgba(1, 8, 16, 0.3);
  backdrop-filter: blur(4px);
  box-sizing: border-box;
  border-radius: 36px;

  &__icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }

  &__figcaption {
    flex: 1;
    font-family: $golos-medium;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.01em;
    color: #fff;
    margin-left: 12px;
  }
}
</style>
