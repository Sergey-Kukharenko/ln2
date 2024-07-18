<template>
  <div class="modal-select" @click="$emit('close-modal')">
    <div class="modal-select__container">
      <div class="modal-select__window" @click.stop>
        <div class="modal-select__resize" />
        <div class="modal-select__title">
          {{ title }}
        </div>
        <div class="modal-select__body">
          <slot />
        </div>
      </div>
      <div class="modal-select__close">
        <svg-icon name="close" class="modal-select__close-icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutModalSelect',

  props: {
    title: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-select {
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100dvh;
  top: 0;
  left: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;

  @include gt-sm {
    align-items: center;
  }

  @include lt-lg {
    align-items: flex-end;
  }

  &__close {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    background: rgba(0, 0, 0, 0.5);

    @include gt-sm {
      cursor: pointer;
    }

    @include lt-lg {
      display: none;
    }

    &-icon {
      width: 28px;
      height: 28px;
      color: #fff;
    }

    @include lt-lg {
      display: none;
    }
  }

  &__container {
    display: flex;
    gap: 16px;

    @include lt-lg {
      width: 100%;
    }
  }

  &__window {
    background: #fff;

    @include gt-sm {
      padding: 24px;
      border-radius: 16px;
      width: 392px;
    }

    @include lt-lg {
      max-height: 90dvh;
      border-radius: 16px 16px 0px 0px;
      width: 100%;
      padding: 12px 12px 48px 12px;
    }
  }

  &__title {
    font-family: $golos-medium;
    font-weight: 600;
    margin-bottom: 12px;

    @include gt-sm {
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0.01em;
    }

    @include lt-lg {
      font-size: 16px;
      line-height: 20px;
    }
  }

  &__resize {
    @include lt-lg {
      width: 32px;
      height: 4px;
      border-radius: 5px;
      margin: 0 auto;
      background: #3c3c434d;
      margin-bottom: 8px;
    }

    @include gt-sm {
      display: none;
    }
  }
}
</style>
