<template>
  <div class="container">
    <div class="container__header">
      <div class="container__layout">
        <div class="container__title"><app-go-back-mobile has-step @change-step="goToLogin" />Enter the SMS code</div>
      </div>
    </div>
    <div class="container__body">
      <div class="container__layout">
        <div class="receiver-info">{{ recieverText }}</div>
        <div class="receiver-info__code">
          <app-code-input
            :error="errorMsg"
            :disabled="isRetried"
            @set-code="setCode"
            @reset-code-input="resetCodeInput"
          />
        </div>
        <div class="form-info">
          <div
            v-if="!errorMsg"
            class="form-info__retry"
            :class="{ 'form-info__retry--active': !timerDuration }"
            @click="reinitTimer"
          >
            {{ retryText }}
          </div>
          <button type="button" class="form-info__not-coming" @click="goToNotRecieved">
            {{ $options.CODE_NOT_RECEIVED_TEXT }}
          </button>
        </div>
        <div class="bottom-text-mobile">
          <button v-if="!errorMsg" type="button" class="bottom-text-mobile__not-coming" @click="goToNotRecieved">
            {{ $options.CODE_NOT_RECEIVED_TEXT }}
          </button>
          <button v-else type="button" class="bottom-text-mobile__retry" @click="reinitTimer">{{ retryText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { intervalToDuration } from 'date-fns';
import Vue from 'vue';

import AppCodeInput from '~/components/shared/AppCodeInput.vue';
import AppGoBackMobile from '~/components/shared/AppGoBackMobile.vue';
import {
  AUTH_CODE_TIMER_STEP,
  CODE_NOT_RECEIVED_TEXT,
  EAuthComponents,
  VALIDATION_MESSAGES
} from '~/constants/auth.ts';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AuthCode',

  components: {
    AppCodeInput,
    AppGoBackMobile
  },

  data() {
    return {
      code: '',
      errorMsg: '',
      isRetried: false,
      timerId: null
    };
  },

  CODE_NOT_RECEIVED_TEXT,

  computed: {
    ...accessorMapper('auth', ['codeSeconds']),

    timerDuration: {
      get() {
        return this.codeSeconds;
      },
      set(seconds) {
        this.$accessor.auth.SET_CODE_SECONDS(seconds);
      }
    },

    timer() {
      const { minutes, seconds } = intervalToDuration({ start: 0, end: this.timerDuration });
      return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    },

    retryText() {
      return this.timerDuration ? 'Resend the code after ' + this.timer : 'Resend the code again';
    },

    recieverText() {
      const receiver = this.$accessor.auth.receiver?.phone?.startsWith('+')
        ? this.$accessor.auth.receiver?.phone
        : `+${this.$accessor.auth.receiver?.phone}`;
      return `Sent to ${receiver}`;
    },

    isFromBasket() {
      return this.$route.query.from === 'basket';
    }
  },

  mounted() {
    this.initTimer();
  },

  beforeDestroy() {
    clearTimeout(this.timerId);
  },

  methods: {
    onSubmit() {
      this.code = '';
    },

    goToNotRecieved() {
      this.$emit('change-step', EAuthComponents.CODE_NOT_RECEIVED);
    },

    initTimer() {
      const tick = () => {
        this.timerDuration -= AUTH_CODE_TIMER_STEP;

        if (!this.timerDuration) {
          clearTimeout(this.timerId);
          this.isRetried = false;

          return;
        }

        this.timerId = setTimeout(tick, AUTH_CODE_TIMER_STEP);
      };

      this.timerId = setTimeout(tick, AUTH_CODE_TIMER_STEP);
    },

    async reinitTimer() {
      try {
        const payload = {
          phone: this.$accessor.auth.receiver.phone
        };

        await this.$accessor.auth.sendVerificationCode(payload);
        this.timerDuration = this.codeSeconds;

        this.initTimer();
        this.resetCodeInput();
      } catch (error) {
        console.error(error);
      }
    },

    async setCode(code) {
      try {
        const payload = {
          phone: this.$accessor.auth.receiver.phone,
          code
        };

        const { success, isNewUser } = await this.$accessor.auth.checkVerificationCode(payload);

        if (!success) {
          this.errorMsg = VALIDATION_MESSAGES.code;

          return;
        }

        this.code = code;

        if (this.isFromBasket) {
          const { phone, name } = this.$accessor.auth.receiver;

          await this.$accessor.checkout.createOrder({ phone, name });
          await this.$router.push({ name: 'checkout' });

          return;
        }

        if (isNewUser === false) {
          this.$router.push({ name: 'index', query: { from: 'auth' } });
        } else {
          this.$emit('change-step', EAuthComponents.REGISTRATION);
        }
      } catch (error) {
        console.error(error);
      }
    },

    resetCodeInput() {
      this.code = '';
      this.errorMsg = '';
    },

    goToLogin() {
      this.$emit('change-step', EAuthComponents.LOGIN);
    }
  }
});
</script>

<style lang="scss" scoped>
.container {
  @include gt-sm {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 400px;
    box-sizing: border-box;
  }

  @include lt-md {
    height: calc(100vh - 74px);
  }

  &__layout {
    .bottom-text-mobile {
      @include gt-sm {
        display: none;
      }

      @include lt-md {
        position: absolute;
        bottom: 12px;
        user-select: none;
        font-family: $golos-regular;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: -0.02em;

        &__not-coming {
          color: #db1838;
        }

        &__retry {
          color: $color-green;
        }
      }
    }
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
      font-family: $golos-regular;
      font-size: 20px;
      font-weight: 600;
      line-height: 24px;
      letter-spacing: -0.02em;
    }
  }

  &__body {
    @include lt-md {
      margin: 0;
    }

    .receiver-info {
      font-family: $golos-regular;
      font-weight: 400;
      color: $color-white-grey;
      margin-bottom: 16px;

      @include gt-sm {
        display: flex;
        gap: 8px;
        letter-spacing: -0.02em;
        font-size: 14px;
        line-height: 20.8px;
      }

      @include lt-md {
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        margin-top: 16px;
        letter-spacing: -0.01em;
      }

      &__code {
        @include lt-md {
          display: flex;
          justify-content: center;
        }
      }

      &__icon {
        @include lt-md {
          display: none;
        }

        @include gt-sm {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }
    }

    .form-info {
      @include gt-sm {
        margin-top: 16px;
      }

      @include lt-md {
        margin-top: 8px;
      }

      &__retry {
        text-align: center;
        pointer-events: none;
        user-select: none;
        font-family: $golos-regular;
        color: $color-white-grey;

        @include gt-sm {
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.01em;
        }

        @include lt-md {
          margin: 0 auto;
          font-size: 12px;
          line-height: 26px;
          text-align: center;
        }

        &--active {
          color: $color-dark-green;
          pointer-events: all;

          @include gt-sm {
            cursor: pointer;
          }
        }
      }

      &__change-type {
        @include gt-sm {
          display: block;
          margin: 24px auto 0 auto;
          font-family: $golos-bold;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 20px;
          color: $color-dark-green;
        }

        @include lt-md {
          display: none;
        }
      }

      &__not-coming {
        @include gt-sm {
          display: block;
          font-family: $golos-medium;
          color: #db1838;
          font-weight: 500;
          margin-top: 40px;
          font-size: 14px;
          line-height: 18.2px;
          letter-spacing: -0.01em;
          width: 100%;
        }

        @include lt-md {
          display: none;
        }
      }
    }
  }
}
</style>
