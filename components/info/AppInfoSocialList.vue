<template>
  <div class="social-list">
    <a v-for="(item, idx) in list" :key="idx" :href="item.url" target="_blank" class="social-list__item">
      <svg-icon :name="item.icon" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'AppInfoSocialList',

  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
.social-list {
  display: flex;

  @include gt-sm {
    margin: -9px -15px 17px;
  }

  @include lt-md {
    margin: 0 -15px 12px;
  }

  &__item {
    margin: 0 15px;

    & .icon {
      display: block;
      width: 32px;
      height: 32px;
    }
  }
}
</style>
