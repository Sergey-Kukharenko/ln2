<template>
  <h2 class="title">
    <span class="title__text">{{ headerProps.title }}</span>
    <span v-if="headerProps.total && theme" class="title__number">{{ headerProps.total }}</span>
  </h2>
</template>

<script>
export default {
  name: 'AppSectionHeader',

  props: {
    headerProps: {
      type: Object,
      default: () => ({})
    },

    theme: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;

  &__text {
    color: $color-dark-grey;
  }

  &__number {
    color: $color-grey;
    margin-left: 8px;
  }
}
</style>
