<template>
  <div class="order">
    <div class="order__title">Order details</div>
    <div class="order__row" style="margin-top: 16px">
      <div class="order__text-grey">{{ count }} bouquets</div>
      <div class="order__text-price">£ {{ price }}</div>
    </div>
    <div class="order__row" style="margin-top: 6px; display: none">
      <div class="order__text-grey">Sale</div>
      <div class="order__text-sale">- £ 8</div>
    </div>
    <div class="order__delim" style="margin-top: 16px"></div>
    <div class="order__row" style="margin-top: 18px">
      <div class="order__text-medium">Summary</div>
      <div class="order__text-summary">£ {{ price }}</div>
    </div>
    <!--Временно скрыт-->
    <div class="order__cashback-desktop" style="display: none">
      <svg-icon class="order__icon-coins" name="coins" />
      <div>£0.4 Cashback from this order</div>
    </div>
    <!--Временно скрыт-->
    <div class="order__row order__cashback-mobile" style="display: none; margin-top: 5px">
      <div class="order__text-grey">Cashback</div>
      <div class="order__text-cashback">
        <svg-icon class="order__icon-coins-2" name="coins" />
        <div>£0.4</div>
      </div>
    </div>
    <!--Временно скрыт-->
    <div class="order__promocode" style="display: none">
      <svg-icon class="order__icon-percent-green" name="percent-green" />
      <div>Promocode and Bonuses will be available at the next stage of order</div>
    </div>
    <template>
      <!--Временно скрыт-->
      <!--      <div class="order__title">-->
      <!--        <svg-icon v-if="step === $options.CODE" class="back__icon" name="arrow-green" @click="goToForm" />-->
      <!--        {{ authTitle }}-->
      <!--      </div>-->
      <form class="form" autocomplete="off" novalidate @submit.prevent="onSubmit">
        <app-input
          v-model="form.name.value"
          size="x-large"
          placeholder="Your name"
          pattern="[a-zA-Z]*"
          max="50"
          type="text"
          class="form__input"
        />

        <app-input
          v-model="form.phone.value"
          :error="form.phone.errorMsg"
          size="x-large"
          placeholder="Your phone"
          pattern="[0-9]*"
          name="search"
          type=""
          autocomplete="off"
          inputmode="numeric"
          max="16"
          class="form__input"
          @focus="onFocus"
          @blur="onBlur"
          @keypress="validateNumber"
        />
        <!--Временно скрыт-->
        <!--<app-number-input :error="form.phone.errorMsg" class="form__input" @set-number="setNumber" />-->
        <div v-if="form.errorMsg" class="form__error">{{ form.errorMsg }}</div>
        <basket-button :stretch="true" align="center" class="form__button" size="medium">Continue</basket-button>
        <div class="order__terms">
          By clicking on the button, you agree to the<br />
          <a href="/files/privacy-policy.pdf" target="_blank">Terms of personal data processing</a>
        </div>
      </form>
      <!--Временно скрыт-->
      <!--<div v-if="step === $options.CODE" class="code">-->
      <!--  <app-code-input :error="codeForm.errorMsg" @set-code="setCode" @reset-code-input="resetCodeInput" />-->
      <!--  <div class="code__retry" :class="{ active: !timerDuration }" @click="reinitTimer">-->
      <!--    {{ retryText }}-->
      <!--  </div>-->
      <!--  <a class="code__link" @click="onLoginWithoutCode">I haven't received the code</a>-->
      <!--</div>-->
    </template>
    <!--Временно скрыт-->
    <!--<nuxt-link v-else to="/checkout" class="order__button">-->
    <!--  <basket-button :stretch="true" align="center">Continue</basket-button>-->
    <!--</nuxt-link>-->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import authManager from '~/mixins/authManager';
import { AUTH_CODE_TIMER, AUTH_REG_STEPS, CODE_INPUT_DEFAULT_COUNT } from '~/constants/index';
import { VALIDATE_MESSAGES } from '~/messages/index';
import inputPhone from '~/mixins/input-phone.vue';

const { auth, code } = AUTH_REG_STEPS;

export default {
  name: 'BasketOrder',

  components: {
    AppInput: () => import('~/components/shared/AppInput')
    // Временно скрыт
    // AppCodeInput: () => import('~/components/shared/AppCodeInput')
    // AppNumberInput: () => import('~/components/shared/AppNumberInput')
  },

  mixins: [authManager, inputPhone],

  data() {
    return {
      form: {
        name: {
          value: '',
          errorMsg: ''
        },
        phone: {
          errorMsg: '',
          value: ''
        },

        errorMsg: ''
      },

      codeForm: {
        code: '',
        errorMsg: ''
      },

      timerDuration: AUTH_CODE_TIMER.duration,

      step: auth.name
    };
  },

  AUTH: auth.name,
  CODE: code.name,

  computed: {
    ...mapGetters({
      price: 'cart/getPrice',
      count: 'cart/getUniqueCount',
      recipient: 'user/getRecipient',
      isAuthorized: 'auth/isAuthorized'
    }),

    isFormInvalid() {
      return this.form.name.errorMsg && this.form.phone.errorMsg;
    },

    timer() {
      const minutes = Math.floor(this.timerDuration / (AUTH_CODE_TIMER.step * 60));
      const isDurationMoreMinute = !!minutes;
      const seconds = isDurationMoreMinute
        ? Math.floor(this.timerDuration / AUTH_CODE_TIMER.step / minutes) - 60
        : Math.floor(this.timerDuration / AUTH_CODE_TIMER.step);
      const isTwoDigitsInSeconds = seconds >= 10;

      return minutes + ':' + (isTwoDigitsInSeconds ? seconds : '0' + seconds);
    },

    isRetryUnavalible() {
      return this.timerDuration || this.codeForm.errorMsg;
    },

    retryText() {
      return this.isRetryUnavalible ? 'Resend after ' + this.timer : 'Send the code again?';
    },

    authTitle() {
      return !this.isAuthorized ? (this.step === auth.name ? 'Your details' : 'Enter the SMS code') : '';
    }
  },

  methods: {
    ...mapMutations({
      setState: 'auth/setState'
    }),

    goToForm() {
      this.resetCodeInput();
      this.timerDuration = AUTH_CODE_TIMER.duration;
      this.step = auth.name;
    },

    async onSubmit() {
      this.form.errorMsg = '';

      this.form.name.errorMsg = this.isEmptyField(this.form.name.value);
      this.form.phone.errorMsg = this.hasPhoneError(this.form.phone.value);

      if (this.isFormInvalid) {
        return;
      }

      await this.onLoginWithoutCode();
      // Временно скрыт
      // const payload = {
      //   name: this.form.name.value,
      //   phone: this.form.phone.value
      // };
      //
      // const isSuccess = await this.$store.dispatch('auth/login', { ...payload });
      //
      // if (!isSuccess) {
      //   this.form.errorMsg = VALIDATE_MESSAGES.wrong;
      //   this.step = auth.name;
      //
      //   return;
      // }
      //
      // this.step = code.name;
      //
      // this.initTimer();
    },

    async setCode(code) {
      if (code.length !== CODE_INPUT_DEFAULT_COUNT) {
        return;
      }

      const { success, data } = await this.$store.dispatch('auth/sendOtp', {
        code
      });

      this.codeForm.errorMsg = data?.title ?? '';

      if (!success) {
        return;
      }

      await this.$store.dispatch('user/fetchUser');

      await this.$router.push({ name: 'checkout' });
    },

    initTimer() {
      const tick = () => {
        this.timerDuration -= AUTH_CODE_TIMER.step;

        if (!this.timerDuration) {
          clearTimeout(timerId);

          return;
        }

        timerId = setTimeout(tick, AUTH_CODE_TIMER.step);
      };

      let timerId = setTimeout(tick, AUTH_CODE_TIMER.step);
    },

    resetCodeInput() {
      this.code = '';
      this.codeForm.errorMsg = '';
    },

    reinitTimer() {
      this.timerDuration = AUTH_CODE_TIMER.duration;

      this.onSubmit();
    },

    async onLoginWithoutCode() {
      const payload = {
        name: this.form.name.value,
        phone: this.form.phone.value.replace('+', '')
      };

      const { success } = await this.$store.dispatch('auth/loginWithoutCode', { ...payload });

      if (!success) {
        this.form.errorMsg = VALIDATE_MESSAGES.wrong;
      }

      await this.$router.push({ name: 'checkout' });
    }
  }
};
</script>

<style lang="scss" scoped>
.order {
  box-sizing: border-box;
  width: 344px;
  height: fit-content;
  padding: 24px;
  flex-shrink: 0;
  border: 1px solid #dde0e6;
  border-radius: 12px;

  .back__icon {
    width: 16px;
    height: 15.54px;
    user-select: none;
    margin-right: 8px;
  }

  .code {
    display: flex;
    flex-direction: column;
    gap: 8px;

    @include lt-sm {
      align-items: center;
    }

    &__retry {
      pointer-events: none;
      user-select: none;
      font-family: $golos-regular;
      font-style: normal;
      font-weight: 400;
      color: #7c7c7c;

      @include gt-sm {
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.01em;
      }

      @include lt-md {
        font-size: 12px;
        line-height: 26px;
      }

      @include lt-sm {
        text-align: center;
        margin: 0 auto;
      }

      &.active {
        color: $color-dark-green;
        pointer-events: all;

        @include gt-sm {
          cursor: pointer;
        }
      }
    }

    &__link {
      font-family: $golos-regular;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.01em;
      color: $color-green;
    }
  }

  @include lt-lg {
    border: none;
    width: 100%;
    padding: 0;
  }

  &__title {
    display: flex;
    align-items: center;
    font-family: $golos-bold;
    color: #000000;

    @include gt-md {
      font-size: 20px;
      line-height: 24px;
      margin: 12px 0 24px 0;
      cursor: pointer;
    }

    @include lt-lg {
      font-size: 16px;
      line-height: 20px;
      margin: 12px 0;
    }
  }

  &__row {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
  }

  &__delim {
    width: 100%;
    border-top: 1px solid #dde0e6;
  }

  &__text-grey {
    font-family: $golos-regular;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #7c7c7c;
  }

  &__text-medium {
    font-family: $golos-medium;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #1f2226;
  }

  &__text-price {
    font-family: $golos-medium;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #010810;
  }

  &__text-sale {
    font-family: $golos-medium;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #009959;
  }

  &__text-summary {
    font-family: $golos-bold;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
  }

  &__cashback-desktop {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;

    background: #fff6e1;
    border-radius: 16px;
    padding: 18px 16px;
    margin-top: 24px;

    font-family: $golos-medium;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #1f2226;

    @include lt-lg {
      display: none;
    }
  }

  &__cashback-mobile {
    display: none;

    @include lt-lg {
      display: flex;
    }
  }

  &__text-cashback {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    font-family: $golos-regular;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    font-feature-settings: 'ss08' on;
    color: #f8b900;
  }

  &__promocode {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;

    margin-top: 12px;

    font-family: $golos-regular;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #7c7c7c;

    @include lt-lg {
      font-size: 12px;
      line-height: 16px;
    }
  }

  &__terms {
    font-family: $golos-regular;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #7c7c7c;
    margin-top: 16px;

    & > a {
      color: #009959;
      text-decoration: none;
    }
  }

  &__icon-coins {
    width: 18px;
    height: 16px;
  }

  &__icon-coins-2 {
    width: 14px;
    height: 13px;
  }

  &__icon-percent-green {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }

  &__button {
    display: block;
    margin-top: 24px;
  }
}

.form {
  display: flex;
  flex-direction: column;

  &__input {
    @include gt-md {
      margin-top: 8px;
    }

    @include lt-lg {
      margin-top: 12px;
    }
  }

  &__button {
    margin-top: 24px;
  }
}
</style>
