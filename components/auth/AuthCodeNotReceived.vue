<template>
  <div class="not-recieved">
    <div class="not-recieved__header">
      <div class="not-recieved__layout">
        <div class="not-recieved__title"><app-go-back-mobile />If you do not receive<br />an SMS</div>
      </div>
    </div>

    <div class="not-recieved__body">
      <div class="not-recieved__layout">
        <div class="not-recieved__notice">Check the phone number you entered:</div>
        <app-input
          v-model="input.value"
          size="x-large"
          class="not-recieved__input"
          placeholder="Enter your phone"
          disabled
        >
          <template #right>
            <div class="not-recieved__input--edit" @click="goToLogin">Edit</div>
          </template>
        </app-input>
        <div class="not-recieved__notice">
          {{ descriptionText }}
        </div>
      </div>
      <app-button stretch="full" class="not-recieved__button" @click="goToWhatsApp">
        <svg-icon class="not-recieved__icon" name="whatsapp-outline-white" /> WhatsApp
      </app-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import AppButton from '~/components/shared/AppButton.vue';
import AppGoBackMobile from '~/components/shared/AppGoBackMobile.vue';
import { EAuthComponents, NOT_RECIEVED_DESCRIPTION_TEXT } from '~/constants/auth.ts';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AuthCodeNotReceived',

  components: {
    AppButton,
    AppGoBackMobile,
    AppInput: () => import('~/components/shared/AppInput.vue')
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
        errorMsg: '',
        isDisabled: true
      }
    };
  },

  computed: {
    ...accessorMapper('layout', ['getCall']),

    isInvalidForm() {
      return !!this.input.errorMsg;
    },

    descriptionText() {
      return this.$device.isMobileOrTablet
        ? NOT_RECIEVED_DESCRIPTION_TEXT.mobile
        : NOT_RECIEVED_DESCRIPTION_TEXT.desktop;
    }
  },

  mounted() {
    this.input.value = `+${this.$accessor.auth.receiver.phone}`;
  },

  methods: {
    goToWhatsApp() {
      const link = document.createElement('a');
      link.target = '_blank';
      link.href = this.getCall?.whatsapp;
      link.rel = 'noreferrer noopener nofollow';
      link.click();
    },

    setNumber(value) {
      this.input.value = value;
    },

    resetInput() {
      this.input.value = '';
      this.input.errorMsg = '';
    },

    goToLogin() {
      this.$emit('change-step', EAuthComponents.LOGIN);
    }
  }
});
</script>

<style lang="scss">
.not-recieved {
  display: flex;
  flex-direction: column;

  @include gt-sm {
    width: 350px;
    box-sizing: border-box;
    gap: 32px;
  }

  @include lt-md {
    height: calc(100vh - 74px);
    gap: 20px;
  }

  &__layout {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__title {
    @include gt-sm {
      font-family: $Literata;
      font-size: 28px;
      font-weight: 700;
      line-height: 33.6px;
      letter-spacing: -0.01em;
      text-align: center;
    }

    @include lt-md {
      display: flex;
      align-items: center;
      gap: 16px;
      font-family: $golos-bold;
      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: -0.02em;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 16px;

    @include gt-sm {
      padding: 24px 0;
    }

    @include lt-md {
      margin: 0;
    }
  }

  &__input {
    font-family: $golos-regular;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.01em;

    &--edit {
      color: $color-green;

      @include gt-sm {
        cursor: pointer;
      }
    }
  }

  &__icon {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }

  &__button {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  &__notice {
    font-family: $golos-regular;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.01em;

    @include gt-sm {
      line-height: 20px;
    }

    @include lt-md {
      line-height: 18.2px;
    }
  }
}
</style>
