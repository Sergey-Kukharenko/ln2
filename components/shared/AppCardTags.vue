<template>
  <div class="card-tags" :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppCardTags',

  props: {
    list: {
      type: Array,
      default: () => []
    },

    size: {
      type: String,
      default: 'medium',
      validate(value) {
        return ['medium', 'large'].includes(value);
      }
    }
  },

  computed: {
    classes() {
      return {
        [`card-tags--size-${this.size}`]: true
      };
    }
  }
};
</script>

<style scoped lang="scss">
.card-tags {
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 2;

  &--size-medium {
    .card-tag {
      @include gt-sm {
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 0.12px;
        padding: 4px 10px 0 12px;
      }

      @include lt-md {
        font-size: 10px;
        line-height: 16px;
        letter-spacing: -0.2px;
        padding: 2px 6px 2px 8px;
      }
    }
  }

  &--size-large {
    .card-tag {
      @include gt-sm {
        font-size: 16px;
        line-height: 21px;
        letter-spacing: 0.16px;
        padding: 4px 10px 0 10px;
      }

      @include lt-md {
        font-size: 12px;
        line-height: 14px;
        letter-spacing: -0.24px;
        padding: 2px 8px;
      }
    }
  }
}
</style>
