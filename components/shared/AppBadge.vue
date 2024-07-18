<template>
  <div :class="classNames">
    <svg-icon v-if="icon" :name="icon" class="icon" />
    <slot />
  </div>
</template>

<script>
import { useClassName } from '@/helpers';

export default {
  name: 'AppBadge',

  props: {
    theme: {
      type: String,
      default: 'red',
      validate(value) {
        ['white', 'red', 'yellow', 'yellow', 'orange'].includes(value);
      }
    },

    size: {
      type: String,
      default: '',
      validate(value) {
        return ['xs', 'sm', 'md', 'lg-dt', 'lg'].includes(value);
      }
    },

    icon: {
      type: String,
      default: ''
    }
  },

  computed: {
    classNames() {
      return useClassName(this.$props, 'badge');
    }
  }
};
</script>

<style lang="scss" scoped>
.badge {
  display: flex;
  align-items: center;
  font-family: $golos-regular;
  letter-spacing: -0.01em;
  color: #ffffff;
  padding: 2px 6px;
  background: #343434;
  border-radius: 6px;

  @include gt-xs {
    font-size: 11px;
    line-height: 16px;
  }

  @include xs {
    font-size: 10px;
    line-height: 12px;
    padding: 2px 4px;
  }

  &--white {
    color: #f63866;
    background: #fff;
    border-radius: 8px;
  }

  &--red {
    background: #db1838;
  }

  &--yellow {
    color: $color-dark-grey;
    background: #ffeec6;

    .icon {
      width: 14px;
      height: 12px;
    }
  }

  &--orange {
    color: #dda100;
    background: #fff8df;
  }

  &--lg {
    font-size: 12px;
    line-height: 16px;

    @include gt-xs {
      padding: 4px 9px;
    }

    @include xs {
      padding: 4px 8px;
    }
  }

  &--lg-dt {
    line-height: 16px;

    @include gt-xs {
      font-size: 12px;
      padding: 4px 9px;
    }

    @include xs {
      font-size: 10px;
      padding: 2px 7px;

      .icon {
        width: 8.9px;
        height: 8px;
        margin-right: 2px;
      }
    }
  }

  &--md {
    font-family: $golos-medium;
    line-height: 16px;

    @include gt-xs {
      font-size: 12px;
      padding: 4px 9px;

      .icon {
        width: 12px;
        height: 12px;
        margin-right: 5px;
      }
    }

    @include xs {
      font-size: 10px;
      padding: 2px 7px;
    }
  }

  &--sm {
    font-size: 11px;
    line-height: 16px;
    padding: 2px 6px;
  }

  &--xs {
    font-size: 10px;
    line-height: 12px;
    letter-spacing: -0.02em;
    padding: 2px 4px;
    border-radius: 6px;
  }
}

.icon {
  display: block;
  width: 14px;
  height: 14px;
  margin-right: 6px;
}
</style>
