<template>
  <div class="blog-tag">
    <img :src="item.icon" class="blog-tag__icon" alt="item.text" />
    <div class="blog-tag__text">{{ item.text }}</div>
  </div>
</template>

<script>
export default {
  name: 'BlogTag',

  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style scoped lang="scss">
.blog-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  background: $bg-grey;
  border-radius: 11px;
  box-sizing: border-box;
  margin: 0 4px;
  cursor: pointer;

  @include gt-sm {
    height: 52px;
    padding: 8px 11px;
  }

  @include lt-md {
    padding: 8px 12px;

    &:first-child {
      margin-left: 12px;
    }

    &:last-child {
      margin-right: 12px;
    }
  }

  &__icon {
    flex-shrink: 0;
    width: 14px;
  }

  &__text {
    flex: 1;
    font-family: $golos-regular;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    white-space: nowrap;
    color: $color-dark-grey;
    margin-left: 4px;
  }
}
</style>
