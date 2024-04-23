<template>
  <div class="payment-error">
    <app-modal theme="centered" :visible="isVisible" @close="$emit('close-modal')">
      <div class="payment-error__modal">
        <div class="payment-error--mobile">
          <svg-icon class="close-icon" name="close" @click="$emit('close-modal')" />
        </div>
        <div class="payment-error__modal-text" v-text="message" />
        <app-button theme="green" stretch="full" @click="$emit('close-modal')">Ok</app-button>
      </div>
    </app-modal>
  </div>
</template>

<script>
import AppButton from '@/components/shared/AppButton.vue';
import AppModal from '~/components/shared/AppModal.vue';
import { PAYMENT_ERROR_MESSAGE } from '~/constants/payment';

export default {
  name: 'PaymentErrorModal',

  components: {
    AppModal,
    AppButton
  },

  props: {
    isVisible: {
      type: Boolean,
      default: false
    },

    message: {
      type: String,
      default: PAYMENT_ERROR_MESSAGE
    }
  }
};
</script>

<style lang="scss" scoped>
.payment-error {
  &--mobile {
    @include gt-sm {
      display: none;
    }

    display: flex;
    justify-content: flex-end;
    width: 100%;

    .close-icon {
      user-select: none;
      width: 16px;
      height: 16px;
    }
  }

  &__modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    width: 100%;

    @include gt-sm {
      min-width: 326px;
      padding: 24px;
      gap: 16px;
    }

    @include lt-md {
      width: 90vw;
      padding: 24px 16px 16px 16px;
    }
  }

  &__modal-text {
    font-family: $golos-medium;
    font-weight: 500;
    text-align: center;
    color: $color-dark-grey;
    white-space: pre;

    @include gt-sm {
      font-size: 16px;
      line-height: 17.6px;
      letter-spacing: -0.02px;
    }

    @include lt-md {
      font-size: 14px;
      line-height: 18.2pxpx;
      letter-spacing: -0.01px;
      margin-bottom: 16px;
    }
  }
}
</style>
