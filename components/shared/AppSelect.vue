<template>
  <div ref="select" class="app-select" :class="classes">
    <div class="app-select__field" @click="onClickField">
      <div v-if="!label" class="app-select__label">
        <slot name="label">
          {{ placeholder }}
        </slot>
      </div>
      <div v-else class="app-select__label" :class="{ dark: darkLabel }">
        <slot name="label">
          {{ label }}
        </slot>
      </div>
      <div class="app-select__choose">Choose</div>
      <div class="app-select__chevron">
        <svg-icon class="app-select__icon" name="chevron-right" />
      </div>
    </div>

    <div v-show="isOpened" ref="dropdown" v-click-outside="close" class="app-select__dropdown">
      <div class="app-select__dropdown-bg" @click="close" />
      <div class="app-select__dropdown-scroll">
        <div class="app-select__dropdown-title">
          <div>{{ placeholder }}</div>
          <div class="app-select__dropdown-close" @click="close">
            <img src="~/assets/sprite/svg/close.svg" width="16" height="16" alt="close" />
          </div>
        </div>
        <div v-for="(item, index) in list" :key="index" class="app-select__dropdown-item">
          <slot :item="item" :index="index" :open="open" :close="close" :set-label="setLabel" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';

import { useScrollLockToggle } from '~/helpers';

export default {
  name: 'AppSelect',
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium',
      validate(value) {
        return ['small', 'medium', 'large', 'x-large'].includes(value);
      }
    },
    pinned: {
      type: Boolean,
      default: false
    },
    hideField: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    },
    darkLabel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpened: false,
      label: ''
    };
  },
  computed: {
    classes() {
      return {
        [`app-select--size-${this.size}`]: true,
        'app-select--pinned': this.pinned,
        'app-select--hide-field': this.hideField,
        'app-select--expand': this.isOpened
      };
    }
  },
  watch: {
    isOpened(value) {
      useScrollLockToggle(value && window.innerWidth <= 1280);
    }
  },

  beforeDestroy() {
    useScrollLockToggle(false);

    if (this.isOpened) {
      this.close();
    }
  },
  methods: {
    open() {
      this.onClickField();
    },
    close(event) {
      if (
        !event ||
        !['app-select__field', 'app-select__label', 'app-select__choose'].includes(event.target.classList?.[0])
      ) {
        this.isOpened = false;
      }
    },
    setLabel(value) {
      this.label = value;
    },

    onClickField() {
      this.isOpened = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-select {
  position: relative;

  &__field {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background: $bg-grey;
    color: $color-white-grey;
    border-radius: 12px;
    width: 100%;
    cursor: default;
    user-select: none;

    font-family: $golos-regular;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
  }

  &__label.dark {
    color: $color-dark-grey;
  }

  &__choose {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    min-width: 102px;
    height: 36px;
    padding: 0 8px;
    color: $color-dark-green;
    background-color: #ffffff;
    border-radius: 12px;
    font-family: $golos-medium;
    font-weight: 500;
    cursor: default;
    user-select: none;

    @include lt-lg {
      display: none;
    }
  }

  &__chevron {
    display: none;

    @include lt-lg {
      display: block;
      margin-right: 10px;
      user-select: none;
      cursor: default;
      width: 16px;
      height: 16px;
    }
  }

  &__dropdown {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    height: fit-content;
    max-height: 228px;

    background-color: #ffffff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    padding: 8px 6px 8px 16px;
    margin-top: 8px;

    @include lt-lg {
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      height: 100%;
      max-height: 100%;
      width: 100%;
      background: none;
      box-shadow: none;
      border-radius: 0;
    }
  }

  &__dropdown-title {
    display: none;

    @include lt-lg {
      position: sticky;
      top: 0;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      font-family: $golos-medium;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #000000;
      background-color: #ffffff;
      padding: 20px 0 6px 0;
      //backdrop-filter: blur(4px);
    }
  }

  &__dropdown-close {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 30px;
    height: 30px;
  }

  &__dropdown-bg {
    @include lt-lg {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  &__dropdown-scroll {
    width: 100%;
    height: auto;
    overflow: auto;
    max-height: 212px;
    padding-right: 24px;

    @include lt-lg {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 2;
      height: fit-content;
      max-height: 90%;
      padding: 0 12px 32px 16px;
      background-color: #ffffff;
      border-radius: 16px 16px 0 0;
    }

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #9296a0;
      border-radius: 2px;
      border: none;

      @include lt-lg {
        background-color: #eaeaea;
      }
    }
  }

  &__dropdown-item {
    &:not(:last-child) {
      border-bottom: 1px solid #dde0e6;
    }
  }

  &--size-small {
    .app-select__field {
      height: 24px;
      padding: 0 10px;
      border-radius: 8px;
    }
  }

  &--size-medium {
    .app-select__field {
      height: 36px;
      padding: 0 4px 0 12px;
    }
  }

  &--size-large {
    .app-select__field {
      height: 48px;
      padding: 0 6px 0 16px;
    }
  }

  &--size-x-large {
    .app-select__field {
      height: 52px;
      padding: 0 8px 0 16px;
    }

    &.app-select--pinned {
      .app-select__field {
        padding: 0 8px 0 24px;
      }
    }

    &.app-select--hide-field {
      .app-select__field {
        display: none;
      }
    }
  }

  &__icon {
    width: 16px;
    height: 16px;
  }

  &--pinned {
    & .app-select__dropdown {
      width: 100%;
      max-height: initial;
      padding: 0 16px 0 16px;
      box-shadow: none;
      border-radius: 0 0 10px 10px;
      border: 1px solid #eaeaea;
      border-top: 0;
      margin-top: 0;
    }

    & .app-select__dropdown-scroll {
      @include gt-md {
        max-height: initial;
        padding-right: 0;
      }
    }

    &.app-select--expand {
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid #eaeaea;
        border-radius: 12px 12px 0 0;
        border-bottom: 0;
      }
    }
  }
}
</style>
