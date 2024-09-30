<template>
  <div class="h2-title" :class="classNames">
    <span class="title__text">{{ headerProps.title }}</span>
    <span v-if="headerProps.total && theme" class="title__number">{{ headerProps.total }}</span>
  </div>
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
  },

  computed: {
    classNames() {
      const theme = this.theme ? `title--${this.theme}` : '';
      return ['title', theme];
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;

  &__text {
    color: $color-dark-grey;
  }

  &__number {
    color: $color-grey;
    margin-left: 8px;
  }

  &--constructor {
    text-align: center;

    @include gt-sm {
      max-width: 735px;
      margin: 0 auto 32px auto;
    }

    @include lt-lg {
      max-width: 80%;
      margin: 0 auto 16px auto;
    }

    .title__text {
      color: #06ad5d;
    }
  }
}
</style>
