<template>
  <client-only>
    <Teleport to="body">
      <div class="modal" :class="classNames">
        <div class="modal__overlay" @click="close"></div>
        <div class="modal__content">
          <div class="modal__layout">
            <slot />
            <button type="button" class="button" @click="close">
              <svg-icon :name="icon" class="button__icon" />
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </client-only>
</template>

<script>
import Teleport from 'vue2-teleport';
// import { useClassName } from '~/helpers';

export default {
  name: 'AppModalAbstraction',

  components: {
    Teleport
  },

  props: {
    theme: {
      type: String,
      default: '',
      validate(value) {
        return ['full', 'mobile'].includes(value);
      }
    },

    center: {
      type: Boolean,
      default: false
    },

    bottom: {
      type: Boolean,
      default: false
    },

    inside: {
      type: Boolean,
      default: false
    },

    icon: {
      type: String,
      default: 'close'
    }
  },

  computed: {
    classNames() {
      return {
        [`modal--${this.theme}`]: this.theme,
        'modal--center': this.center,
        'modal--bottom': this.bottom,
        'modal--inside': this.inside
      };
    }
  },

  mounted() {
    window.addEventListener('keyup', this.handleKeyup);
  },

  beforeDestroy() {
    window.removeEventListener('keyup', this.handleKeyup);
  },

  methods: {
    close() {
      this.$emit('close');
    },

    handleKeyup() {
      if (event.keyCode !== 27) {
        return;
      }

      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 6;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
    cursor: pointer;
  }

  &__content {
    position: relative;
    background-color: #fff;
    border-radius: 16px;
    z-index: 2;

    @include gt-xs {
      width: min-content;
      margin: 2rem auto;
    }

    @include xs {
      margin: 6px;
    }
  }

  &--blured {
    @include gt-sm {
      .modal__overlay {
        -webkit-backdrop-filter: blur(6px);
        backdrop-filter: blur(6px);
      }
    }
  }

  &--mobile-full {
    @include lt-md {
      & .modal__content {
        width: 100%;
        height: 100vh;
        border-radius: 0;
        margin: 0;
      }

      & {
        z-index: 10;
      }

      .modal__layout {
        height: 100%;
      }
    }
  }

  &--centered {
    & .modal__content {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0;

      @include lt-md {
        width: 90%;

        .button {
          display: none;
        }
      }
    }
  }

  &--bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;

    & .modal__content {
      position: relative;
      bottom: 0;
      margin: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      @include lt-md {
        width: 100%;
      }
    }
  }

  &--regular {
    .button {
      display: none;
    }
  }

  &--full {
    & .modal__content {
      width: auto;
      margin: 0;
      border-radius: 0 0 24px 24px;
      box-shadow: 0 4px 8px rgb(0 0 0 / 4%);
    }

    .modal__layout {
      max-width: 920px;
      margin: 0 auto;
      position: relative;
    }

    & .button {
      padding: 12px;
      background: $bg-grey;
      top: 24px;
      right: 0;

      &:hover {
        background: darken($bg-grey, 10%);
      }

      &__icon {
        width: 24px;
        height: 24px;
        color: $color-dark-grey;
        fill: currentColor;
      }
    }
  }

  &--center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &--bottom {
    align-items: end;
  }

  &--inside {
    & .modal__content {
      border-radius: 16px;
    }

    & .button {
      right: 0;
      padding: 16px 18px;
      background: none;
      border-radius: 0;

      &__icon {
        height: 16px;
        width: 16px;
        color: #000;
      }
    }
  }

  &--mobile {
    & .modal__content {
      border-radius: 16px 16px 0 0;
      margin: 0;
    }

    & .button {
      @include lt-md {
        top: 16px;
        right: 16px;
        padding: 0;
        background: none;
      }

      &__icon {
        @include lt-md {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}

.button {
  position: absolute;
  top: 0;
  right: -72px;
  color: #8b8b8b;
  padding: 14px;
  background: rgb(0 0 0 / 50%);
  border-radius: 50%;

  &:hover {
    color: darken(#8b8b8b, 20%);
  }

  &__icon {
    height: 28px;
    width: 28px;
    color: #fff;
    fill: currentColor;
  }
}
</style>
