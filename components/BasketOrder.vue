<template>
  <div class="order">
    <div class="order__row order__row--mt-16">
      <div class="order__text-grey">{{ itemsCount }}</div>
      <div class="order__text-price">£ {{ cost }}</div>
    </div>
    <div v-if="isSale" class="order__row order__row--mt-6">
      <div class="order__text-grey">Discount</div>
      <div class="order__text-sale">- £ {{ sale }}</div>
    </div>
    <div class="order__delim" />
    <div class="order__row order__row--mt-16">
      <div class="order__text">Summary</div>
      <div class="order__text-summary">£ {{ total }}</div>
    </div>
    <div class="order__row order__row--mt-8">
      <div class="order__text order__text--row">
        Promo code
        <div class="order__tooltip">
          <app-tooltip
            :icon="$options.BASKET_TOOLTIP.icon"
            :content="$options.BASKET_TOOLTIP.content"
            theme="light"
            size="sm"
            position="right"
            text-align="center"
            tip
          />
        </div>
      </div>
      <div class="order__text-summary"></div>
    </div>
    <!--Временно скрыт-->
    <div class="order__cashback-desktop" style="display: none">
      <svg-icon class="order__icon-coins" name="coins" />
      <div>£0.4 Cashback from this order</div>
    </div>
    <!--Временно скрыт-->
    <div class="order__row order__cashback-mobile" style="display: none">
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
    <!--Временно скрыт-->
    <!--      <div class="order__title">-->
    <!--        <svg-icon v-if="step === $options.CODE" class="back__icon" name="arrow-green" @click="goToForm" />-->
    <!--        {{ authTitle }}-->
    <!--      </div>-->
    <div class="order__title">Your details</div>
    <form class="form" autocomplete="off" novalidate @submit.prevent="onSubmit">
      <app-input
        v-model="form.name.value"
        size="x-large"
        placeholder="Your First Name"
        pattern="[a-zA-Z]*"
        max="50"
        type="text"
        class="form__input"
      />

      <app-phone-input :error="form.phone.errorMsg" @set-phone="onSetPhone" />

      <div v-if="form.errorMsg" class="form__error">{{ form.errorMsg }}</div>
      <basket-button :stretch="true" align="center" class="form__button" :not-clickable="isSubmitClicked" size="medium">
        Continue
      </basket-button>
      <div class="order__terms">
        By clicking on the button, you agree to the<br />
        <a href="/privacy-policy" target="_blank">Terms of personal data processing</a>
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
    <!--Временно скрыт-->
    <!--<nuxt-link v-else to="/checkout" class="order__button">-->
    <!--  <basket-button :stretch="true" align="center">Continue</basket-button>-->
    <!--</nuxt-link>-->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import AppTooltip from '~/components/shared/AppTooltip.vue';

import authManager from '~/mixins/authManager';
import { AUTH_CODE_TIMER, AUTH_REG_STEPS, CODE_INPUT_DEFAULT_COUNT, BASKET_TOOLTIP } from '~/constants';
import { VALIDATE_MESSAGES } from '~/messages';
import inputPhone from '~/mixins/input-phone.vue';
import AppPhoneInput from '~/components/AppPhoneInput.vue';
import BasketButton from '~/components/BasketButton.vue';

const { auth, code } = AUTH_REG_STEPS;

export default {
  name: 'BasketOrder',

  components: {
    BasketButton,
    AppPhoneInput,
    AppInput: () => import('~/components/shared/AppInput'),
    AppTooltip
    // Временно скрыт
    // AppCodeInput: () => import('~/components/shared/AppCodeInput')
    // AppNumberInput: () => import('~/components/shared/AppNumberInput')
  },

  mixins: [authManager, inputPhone],

  BASKET_TOOLTIP,

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

      isSubmitClicked: false,

      timerDuration: AUTH_CODE_TIMER.duration,

      step: auth.name
    };
  },

  AUTH: auth.name,
  CODE: code.name,

  computed: {
    ...mapGetters({
      cost: 'cart/getCost',
      total: 'cart/getTotal',
      sale: 'cart/getDiscount',
      isSale: 'cart/isDiscountExist',
      count: 'cart/getCount',
      recipient: 'user/getRecipient',
      isAuthorized: 'auth/isAuthorized'
    }),

    itemsCount() {
      return this.count > 1 ? `${this.count} items` : `${this.count} item`;
    },

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

  beforeDestroy() {
    this.isSubmitClicked = false;
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
        this.isSubmitClicked = false;
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

    onSetPhone(value) {
      this.form.phone.errorMsg = '';
      this.form.errorMsg = '';
      this.form.phone.value = value;
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
      this.isSubmitClicked = true;

      const payload = {
        name: this.form.name.value,
        phone: this.form.phone.value.replace('+', '').replaceAll(' ', '')
      };

      const result = await this.$store.dispatch('auth/loginWithoutCode', { ...payload });

      if (!result?.success) {
        this.form.errorMsg = VALIDATE_MESSAGES.wrong;
        this.isSubmitClicked = false;

        // Вернул временно, так как пользователь не получит заказ и не сможет ничего оплатить
        return;
      }

      await this.$store.dispatch('order/createOrder');
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
    color: $color-dark-grey;
    font-size: 20px;
    line-height: 24px;

    @include gt-md {
      font-family: $golos-bold;
      margin: 24px 0 8px 0;
      cursor: pointer;
    }

    @include lt-lg {
      font-family: $Literata;
      font-weight: 700;
      margin: 32px 0 2px;
    }
  }

  &__row {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;

    &--mt-6 {
      margin-top: 6px;
    }

    &--mt-8 {
      margin-top: 8px;
    }

    &--mt-16 {
      margin-top: 16px;
    }
  }

  &__delim {
    width: 100%;
    border-top: 1px solid #dde0e6;
    margin-top: 16px;
  }

  &__tooltip {
    position: relative;
  }

  &__text {
    font-family: $golos-regular;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.01em;

    &--row {
      display: flex;
      gap: 2px;
    }
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
    margin-top: 5px;

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
