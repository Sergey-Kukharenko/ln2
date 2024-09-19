<template>
  <div class="container">
    <div class="container__header">
      <div class="container__layout">
        <div class="container__title"><app-go-back-mobile />Log in or Sign up</div>
      </div>
    </div>
    <div class="container__body">
      <div class="container__layout">
        <form class="form" @submit.prevent="onValidate">
          <app-phone-input :error="input.errorMsg" @update:success="onSetNumber" />
          <app-button stretch="full" class="form__button" :loading="loading" :disabled="!input.value">
            <template v-if="loading"><app-loading-dots /></template>
            <template v-else> Get an SMS code</template>
          </app-button>
          <button type="button" class="form__button--secondary" @click="onGoToContactUs">I can't log in</button>
        </form>
        <div class="form-info">
          <download-mobile-app v-if="$device.isMobileOrTablet" class="banner banner--mobile" />
          <div class="form-info__term">
            <app-personal-data-terms />
          </div>
          <download-mobile-app v-if="$device.isDesktop" class="banner" />
        </div>
      </div>
    </div>
    <app-contact-us-modal :visible="isModalVisible" @close-modal="onCloseModal" />
    <app-error-modal :error-message="errorMessage" @close-error-modal="onCloseErrorModal" />
  </div>
</template>

<script>
import Vue from 'vue';

import AppContactUsModal from '~/components/auth/AuthContactUsModal.vue';
import AppPersonalDataTerms from '~/components/auth/AuthLoginPersonalDataTerms.vue';
import AppButton from '~/components/shared/AppButton.vue';
import AppErrorModal from '~/components/shared/AppErrorModal.vue';
import AppGoBackMobile from '~/components/shared/AppGoBackMobile.vue';
import AppPhoneInput from '~/components/shared/phone-input/AppPhoneInput.vue';
import { EAuthComponents, VALIDATION_MESSAGES } from '~/constants/auth.ts';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AuthLogin',

  components: {
    AppButton,
    AppPersonalDataTerms,
    AppGoBackMobile,
    DownloadMobileApp: () => import('~/components/auth/AuthDownloadMobileApp.vue'),
    AppContactUsModal,
    AppLoadingDots: () => import('~/components/shared/AppLoadingDots.vue'),
    AppErrorModal,
    AppPhoneInput
  },

  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      input: {
        value: '',
        errorMsg: ''
      },

      isModalVisible: false,

      errorMessage: ''
    };
  },

  computed: {
    ...accessorMapper('auth', ['loading']),

    isInvalidForm() {
      return !!this.input.errorMsg;
    }
  },

  methods: {
    onSetNumber(value) {
      if (this.input.errorMsg) {
        this.input.errorMsg = '';
      }

      this.input.value = value;
    },

    onValidate() {
      // this.input.errorMsg = this.isPhoneFormType && this.hasPhoneError(this.input.isValid);

      if (this.input.value.length < 7) {
        this.input.errorMsg = VALIDATION_MESSAGES.phone;
        return;
      }

      this.onSubmit();
    },

    async onSubmit() {
      try {
        const payload = {
          phone: this.input.value
        };

        await this.$accessor.auth.sendVerificationCode(payload);
        this.$accessor.auth.SET_RECEIVER({ phone: this.input.value, name: '' });
        this.$emit('change-step', EAuthComponents.CODE);
        this.onResetInput();
      } catch (error) {
        console.error(error);
      }
    },

    onResetInput() {
      this.input.value = '';
      this.input.errorMsg = '';
    },

    onGoToContactUs() {
      if (this.$device.isMobileOrTablet) {
        this.isModalVisible = true;

        return;
      }

      this.$emit('change-step', EAuthComponents.CONTACT_US);
    },

    onCloseModal() {
      this.isModalVisible = false;
    },

    onOpenErrorModal(error = '') {
      this.errorMessage = error;
    },

    onCloseErrorModal() {
      this.onOpenErrorModal();
    }
  }
});
</script>

<style lang="scss" scoped>
.container {
  @include gt-sm {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 392px;
    box-sizing: border-box;
  }

  @include lt-md {
    height: calc(100vh - 74px);
  }

  &__title {
    @include lt-md {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }

  &__header {
    font-family: $Literata;
    font-weight: 700;
    font-size: 28px;
    line-height: 33.6px;
    letter-spacing: -0.01em;

    @include lt-md {
      font-family: $golos-medium;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      padding: 20px 0;
    }
  }

  &__body {
    @include gt-sm {
      padding: 24px 0;
    }

    @include lt-md {
      margin: 0;
    }

    .form {
      @include gt-sm {
        margin: 0 auto;
        width: 350px;
      }

      @include lt-md {
        width: 100%;
      }

      &__button {
        margin-top: 16px;

        &--secondary {
          width: 350px;
          height: 44px;
          font-family: $golos-medium;
          color: $color-like-active;
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
          background-color: #ffffff;
          border-radius: 12px;
          margin-top: 8px;

          &:hover {
            filter: brightness(0.95);
          }

          @include lt-md {
            width: 100%;
          }
        }
      }

      &-info {
        &__term {
          @include gt-sm {
            margin-top: 24px;
          }

          @include lt-md {
            margin-top: 16px;
            position: absolute;
            bottom: 24px;
            right: 50%;
            transform: translate(50%, -50%);
            width: 288px;
            max-width: 288px;
          }
        }
      }
    }

    .banner {
      @include gt-sm {
        margin-top: 20px;

        &--mobile {
          display: none;
        }
      }

      @include lt-md {
        margin-top: 24px;
      }
    }
  }
}
</style>
