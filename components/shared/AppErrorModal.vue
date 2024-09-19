<template>
  <app-modal :visible="isErrorModalVisible" :theme="modalThemes" @close="onCloseErrorModal">
    <div class="modal">
      <div class="modal__text">{{ errorMessage }}</div>
      <app-button class="modal__button" stretch="full" @click="onCloseErrorModal">Close </app-button>
    </div>
  </app-modal>
</template>

<script>
import AppButton from '~/components/shared/AppButton.vue';
import AppModal from '~/components/shared/AppModal.vue';

export default {
  name: 'AppErrorModal',

  components: {
    AppButton,
    AppModal
  },

  props: {
    errorMessage: {
      type: String,
      default: ''
    },

    redirectTo: {
      type: String,
      default: ''
    }
  },

  computed: {
    isErrorModalVisible() {
      return !!this.errorMessage;
    },

    modalThemes() {
      const result = ['modal--centered'];

      if (this.$device.isMobileOrTablet) {
        result.push('full-width');
      }

      return result.join(' ');
    }
  },

  methods: {
    onCloseErrorModal() {
      this.$emit('close-error-modal');

      if (this.redirectTo) {
        const page = this.redirectTo.includes('/') ? this.redirectTo : { name: this.redirectTo };
        this.$router.push(page);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  padding: 16px;
  box-sizing: border-box;

  @include lt-md {
    margin-top: 30%;
  }

  &__text {
    font-family: $golos-regular;
    font-size: 12px;
    font-weight: 400;
    line-height: 15.6px;
    letter-spacing: -0.02em;
    text-align: center;

    @include gt-sm {
      width: 392px;
    }

    @include lt-md {
      width: 100%;
    }
  }

  &__button {
    margin-top: 16px;
  }
}
</style>
