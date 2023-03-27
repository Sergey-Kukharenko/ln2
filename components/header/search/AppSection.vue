<template>
  <div :class="classNames">
    <div class="section__title">{{ title }}</div>
    <div class="section__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSection',

  props: {
    title: {
      type: String,
      default: ''
    },

    hasOffset: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classNames() {
      return {
        section: true,
        'section--has-offset': this.hasOffset
      };
    }
  }
};
</script>

<style scoped lang="scss">
.section {
  @include gt-sm {
    display: flex;
    max-width: 810px;
    margin: 10px 0;
  }

  @include lt-md {
    margin: 18px 0;
  }

  &__title {
    font-family: $golos-regular;
    font-size: 14px;
    color: $color-white-grey;
    letter-spacing: -0.01em;

    @include gt-sm {
      flex-shrink: 0;
      width: 182px;
      line-height: 24px;
      padding-right: 10px;
    }
  }

  &__content {
    @include gt-sm {
      flex: 1;
    }
  }

  &--has-offset {
    @include gt-sm {
      & .section__content {
        padding: 38px 0 0 0;
      }
    }

    @include lt-md {
      & .section__content {
        padding: 14px 0 0 0;
      }
    }
  }
}
</style>
