<template>
  <div v-click-outside="close" class="tooltip" :class="classNames">
    <svg-icon :name="icon" class="tooltip__icon" @click="open" />
    <div class="tooltip__container">
      <div class="tooltip__tip" />
      <div v-for="(item, idx) in content" :key="idx" class="tooltip__item">
        <div class="tooltip__content">
          <span class="tooltip__item-title">{{ item.title }}</span>
          <span class="tooltip__item-description">{{ item.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';

import { useClassNameProp } from '@/helpers';

export default {
  name: 'AppTooltip',

  directives: {
    clickOutside: vClickOutside.directive
  },

  props: {
    icon: {
      type: String,
      default: 'circle-question-mark'
    },

    content: {
      type: Array,
      default: () => []
    },

    theme: {
      type: String,
      default: ''
    },

    size: {
      type: String,
      default: 'md',
      validate(value) {
        return ['xs', 'sm', 'md', 'pre-lg', 'lg'].includes(value);
      }
    },

    position: {
      type: String,
      default: 'bottom',
      validate(value) {
        return ['top', 'bottom', 'left', 'right'].includes(value);
      }
    },

    textAlign: {
      type: String,
      default: 'left',
      validate(value) {
        return ['left', 'center', 'right'].includes(value);
      }
    },

    tip: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isVisible: false
    };
  },

  computed: {
    classNames() {
      return [
        { show: this.isVisible },
        useClassNameProp(this.theme, 'tooltip'),
        useClassNameProp(this.size, 'tooltip'),
        useClassNameProp(this.position, 'tooltip'),
        useClassNameProp(`text-${this.textAlign}`, 'tooltip'),
        this.tip ? useClassNameProp('tip', 'tooltip') : ''
      ];
    }
  },

  methods: {
    open() {
      if (this.$device.isMobileOrTablet) {
        this.isVisible = !this.isVisible;
      }
    },

    close() {
      this.isVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  z-index: 2;

  &__icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    user-select: none;
  }

  &__tip {
    display: none;
  }

  &--tip {
    & .tooltip__tip {
      display: block;
      position: absolute;
      width: 6px;
      height: 6px;
      transform: rotate(45deg);
      background: #fff;
      border-bottom: 1px solid rgba(21, 15, 15, 0.08);
      border-left: 1px solid rgba(78, 78, 78, 0.08);
      z-index: 3;

      @include gt-sm {
        top: 40%;
        left: 27px;
      }

      @include lt-lg {
        top: -14px;
        left: 11px;
      }
    }
  }

  &--light {
    & .tooltip__content {
      background: #fff;
      color: $color-dark-grey;
      border: 1px solid rgba(21, 15, 15, 0.08);
    }
  }

  &--right {
    & .tooltip__content {
      @include gt-sm {
        top: -140%;
        left: 30px;
      }

      @include lt-lg {
        top: -50px;
        left: 14px;
      }
    }
  }

  &--text-center {
    text-align: center;
  }

  &--sm {
    & .tooltip__content {
      font-size: 14px;
      line-height: 20px;

      @include gt-sm {
        width: 122px;
      }

      @include lt-lg {
        width: 122px;
      }
    }
  }

  &:hover {
    & .tooltip__container {
      @include gt-sm {
        display: block;
      }
    }
  }

  &__container {
    display: none;
  }

  &__content {
    position: absolute;
    padding: 8px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    backdrop-filter: blur(4px);

    font-size: 10px;
    line-height: 12px;
    letter-spacing: -0.1px;
    color: #fff;

    @include gt-sm {
      width: 278px;
    }
  }

  &__item {
    padding-right: 20px;
  }

  &__item:not(:last-child) {
    margin-bottom: 12px;
  }

  &__item-title {
    font-family: $golos-bold;
  }

  &__item-description {
    font-family: $golos-regular;
    white-space: pre;
  }

  &.show {
    position: static;

    & .tooltip__container {
      display: block;

      @include lt-md {
        position: absolute;
        left: 12px;
        right: 12px;
      }
    }

    & .tooltip__content {
      @include lt-md {
        //left: 12px;
        //right: 12px;
      }
    }
  }
}
</style>
