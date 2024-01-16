<template>
  <div v-click-outside="close" class="tooltip" :class="{ show: isVisible }">
    <svg-icon :name="icon" class="tooltip__icon" @click="open" />
    <div class="tooltip__container">
      <div class="tooltip__content">
        <div v-for="(item, idx) in content" :key="idx" class="tooltip__item">
          <span class="tooltip__item-title">{{ item.title }}</span>
          <span class="tooltip__item-description">{{ item.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';

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
    }
  },

  data() {
    return {
      isVisible: false
    };
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
    border-radius: 8px;
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
