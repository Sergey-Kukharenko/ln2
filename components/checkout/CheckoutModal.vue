<template>
  <Teleport v-if="isOpened" to="body">
    <div class="checkout-modal" @click="close">
      <div class="checkout-modal__window" :style="windowStyles" @click="onWindowClick">
        <div v-if="$slots.title" class="checkout-modal__title">
          <div class="checkout-modal__arrow-back" @click="close">
            <svg-icon class="checkout-modal__icon-back" name="arrow-back" />
          </div>
          <div>
            <slot name="title" />
          </div>
        </div>
        <div class="checkout-modal__content">
          <slot />
        </div>
        <div v-if="closable" class="checkout-modal__close" @click="close">
          <svg-icon class="checkout-modal__icon-close" name="close-white" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import Teleport from 'vue2-teleport';

import { NO_SCROLL_CLASS_NAME } from '~/constants';

export default {
  name: 'CheckoutModal',
  components: { Teleport },
  props: {
    closable: {
      type: Boolean,
      default: true
    },
    width: {
      type: [String, Number],
      default: 'fit-content'
    }
  },
  data() {
    return {
      isOpened: false
    };
  },
  computed: {
    windowStyles() {
      return {
        width: window.innerWidth < 1280 ? '100%' : typeof this.width === 'string' ? this.width : `${this.width}px`
      };
    }
  },
  methods: {
    open() {
      this.isOpened = true;
      if (document) document.body.classList.add(NO_SCROLL_CLASS_NAME);
      this.$emit('open');
    },
    close() {
      this.isOpened = false;
      if (document) document.body.classList.remove(NO_SCROLL_CLASS_NAME);
      this.$emit('close');
    },
    onWindowClick(event) {
      event.stopPropagation();
    }
  }
};
</script>

<style lang="scss" scoped>
.checkout-modal {
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &__window {
    display: flex;
    flex-direction: column;
    position: relative;
    height: auto;
    flex-shrink: 0;
    background: #ffffff;
    border-radius: 10px;
    padding: 24px;

    max-height: 80vh;

    @include lt-lg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 16px;
      border-radius: 0;
      max-height: 100%;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-grow: 1;
    overflow: auto;
  }

  &__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    height: 76px;
    border-bottom: 1.5px solid #dde0e6;
    margin-top: -16px;

    font-family: $Literata;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #000000;

    @include lt-lg {
      font-family: $golos-medium;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #000000;
    }
  }

  &__arrow-back {
    display: none;
    height: 24px;

    @include lt-lg {
      display: block;
    }
  }

  &__close {
    position: absolute;
    top: 0;
    right: -72px;
    width: 56px;
    height: 56px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 28px;
    cursor: pointer;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @include lt-lg {
      display: none;
    }
  }

  &__icon-back {
    width: 24px;
    height: 24px;
  }

  &__icon-close {
    width: 28px;
    height: 28px;
  }
}
</style>
