<template>
  <div class="container">
    <div class="container__header">
      <div class="container__layout">
        <div class="container__title"><app-go-back-mobile has-step @change-step="goToLogin" />Sign up</div>
      </div>
    </div>
    <div class="container__body">
      <div class="container__layout">
        <form class="form" @submit.prevent="handleValidate">
          <div class="form__fields">
            <div class="form__field">
              <app-input
                v-model="form.name.value"
                type="text"
                size="x-large"
                pattern="[a-zA-Z]*"
                class="form__input"
                placeholder="Your name"
                @input="onResetNameError"
              />
              <div v-show="form.name.errorMsg" class="form__error">
                {{ form.name.errorMsg }}
              </div>
            </div>
            <div class="form__field">
              <app-input
                v-model="form.email.value"
                size="x-large"
                class="form__input"
                placeholder="Email"
                @input="onResetEmailError"
              />
              <div v-show="form.email.errorMsg" class="form__error">
                {{ form.email.errorMsg }}
              </div>
            </div>
            <div class="form__field">
              <app-input
                :value="receiverPhone"
                :mask="phoneMask"
                size="x-large"
                class="form__input"
                placeholder="Phone"
                disabled
              >
                <template #right>
                  <svg-icon name="lock" class="form__input-icon" />
                </template>
              </app-input>
            </div>
          </div>
          <div class="form__date">
            <div class="form__date-title">Date of birth</div>
            <app-datepicker :error="form.birth.errorMsg" @change="onChangeDate" />
          </div>
          <div class="form__tabs">
            <div class="form__tabs-title">Specify your gender</div>
            <div class="form__tabs-row">
              <div
                v-for="gender in $options.GENDERS_OPTIONS"
                :key="gender.value"
                class="form__tab"
                :class="{ 'form__tab--active': isActiveGender(gender.value), 'form__tab--no-image': !gender.img }"
                @click="setGender(gender.value)"
              >
                <img v-show="gender.img" :src="gender.img" class="form__tab-icon" :alt="gender.img" /> {{ gender.name }}
              </div>
            </div>
            <div class="form__error form__error--gender">{{ form.gender.errorMsg }}</div>
          </div>
          <user-subscribe />
          <app-button stretch="full" class="form__button" :loading="loading" :disabled="isInvalidForm">
            <template v-if="loading"><app-loading-dots /></template>
            <template v-else> Sign up</template>
          </app-button>
        </form>
        <div class="terms">
          <app-personal-data-terms />
        </div>
      </div>
    </div>
    <app-error-modal :error-message="errorMessage" @close-error-modal="onCloseErrorModal" />
  </div>
</template>

<script>
import Vue from 'vue';

import AppPersonalDataTerms from '~/components/auth/AuthLoginPersonalDataTerms.vue';
import UserSubscribe from '~/components/auth/AuthUserSubscribe.vue';
import AppButton from '~/components/shared/AppButton.vue';
import AppDatepicker from '~/components/shared/AppDatepicker.vue';
import AppErrorModal from '~/components/shared/AppErrorModal.vue';
import AppGoBackMobile from '~/components/shared/AppGoBackMobile.vue';
import { EAuthComponents, GENDERS_OPTIONS, VALIDATION_MESSAGES } from '~/constants/auth.ts';
import { isEmailValid } from '~/helpers/validators';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AuthRegistration',

  components: {
    AppButton,
    AppDatepicker,
    AppPersonalDataTerms,
    AppGoBackMobile,
    AppInput: () => import('~/components/shared/AppInput.vue'),
    AppLoadingDots: () => import('~/components/shared/AppLoadingDots.vue'),
    UserSubscribe,
    AppErrorModal
  },

  data() {
    return {
      form: {
        name: {
          value: '',
          errorMsg: ''
        },
        phone: {
          value: '',
          errorMsg: '',
          isValid: false
        },
        email: {
          value: '',
          errorMsg: ''
        },
        birth: {
          value: '',
          errorMsg: ''
        },
        gender: {
          value: '',
          errorMsg: ''
        },
        checkbox: []
      },

      errorMessage: ''
    };
  },

  GENDERS_OPTIONS,

  computed: {
    ...accessorMapper('auth', ['loading']),

    isInvalidForm() {
      return Object.keys(this.form).some((key) => this.form[key].errorMsg);
    },

    receiverPhone() {
      return this.$accessor.auth.receiver?.phone?.startsWith('+')
        ? this.$accessor.auth.receiver.phone
        : `+${this.$accessor.auth.receiver.phone}`;
    },

    phoneMask() {
      return this.$accessor.auth.phoneMask;
    }
  },

  methods: {
    setGender(name) {
      this.form.gender.value = name;
      this.onResetGenderError();
    },

    isActiveGender(name) {
      return this.form.gender.value === name;
    },

    handleCheckbox(value) {
      if (!value) {
        this.form.checkbox.splice(this.form.checkbox.indexOf(value), 1);
      } else {
        this.form.checkbox.push(value);
      }
    },

    handleValidate() {
      this.form.phone.value = this.$accessor.auth.receiver.phone;

      const emailError = !this.form.email.value
        ? VALIDATION_MESSAGES.empty
        : isEmailValid(this.form.email.value)
        ? ''
        : VALIDATION_MESSAGES.email;
      this.form.name.errorMsg = !this.form.name.value ? VALIDATION_MESSAGES.empty : '';
      this.form.email.errorMsg = emailError;
      this.form.birth.errorMsg = !this.form.birth.value ? VALIDATION_MESSAGES.empty : '';
      this.form.gender.errorMsg = !this.form.gender.value ? VALIDATION_MESSAGES.gender : '';

      if (this.isInvalidForm) {
        return;
      }

      this.onSubmit();
    },

    async onSubmit() {
      try {
        const payload = {
          name: this.form.name.value,
          phone: this.form.phone.value,
          email: this.form.email.value,
          birth: this.form.birth.value,
          gender: this.form.gender.value === 'other' ? null : this.form.gender.value
        };

        const { success, message } = await this.$accessor.user.setUserPersonalData(payload);

        if (!success) {
          this.onOpenErrorModal(message);

          return;
        }

        this.$accessor.user.SET_USER({
          name: this.form.name.value,
          email: this.form.email.value,
          phone: this.form.phone.value
        });

        // Здесь осуществляется редирект на страницу ЛК после успешной регистрации
        this.$router.push({ name: 'profile-dashboard', query: { reg: true } });

        // Возможный вариант для бизнеса, пока оставлю на всякий случай =)
        // if (this.$device.isMobileOrTablet) {
        //   this.$emit('change-step', EAuthComponents.REGISTRATION_COMPLETED);
        // }

        this.resetInputErrors();
      } catch (error) {
        console.error(error);
      }
    },

    onChangeDate(date) {
      this.form.birth.value = date;
      this.onResetDateError();
    },

    onResetNameError() {
      this.form.name.errorMsg = '';
    },

    onResetEmailError() {
      this.form.email.errorMsg = '';
    },

    onResetDateError() {
      this.form.birth.errorMsg = '';
    },

    onResetGenderError() {
      this.form.gender.errorMsg = '';
    },

    resetInputErrors() {
      Object.keys(this.form).forEach((key) => {
        if (this.form[key]?.errorMsg) this.form[key].errorMsg = '';
      });
      this.form.phone.isValid = false;
    },

    goToLogin() {
      this.$emit('change-step', EAuthComponents.LOGIN);
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
  display: flex;
  flex-direction: column;

  @include gt-sm {
    width: 416px;
    box-sizing: border-box;
    gap: 32px;
  }

  @include lt-md {
    gap: 20px;
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
    .form {
      display: flex;
      flex-direction: column;
      @include gt-sm {
        gap: 32px;
      }

      @include lt-md {
        gap: 24px;
      }

      &__input {
        font-family: $golos-regular;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: -0.01em;
      }

      &__input-icon {
        width: 24px;
        height: 24px;
      }

      &__fields {
        display: flex;
        gap: 10px;

        @include gt-sm {
          flex-wrap: wrap;
        }

        @include lt-md {
          flex-direction: column;
        }
      }

      &__field {
        @include gt-sm {
          width: calc(50% - 5px);

          &:last-child {
            width: 100%;
          }
        }
      }

      &__date {
        display: flex;
        flex-direction: column;

        @include gt-sm {
          gap: 8px;
        }

        @include lt-md {
          gap: 12px;
        }

        &-title {
          font-family: $golos-medium;
          font-style: normal;
          font-weight: 600;
          color: $color-dark-grey;
          font-size: 16px;
          line-height: 20px;
        }
      }

      &__tabs {
        display: flex;
        flex-direction: column;

        @include gt-sm {
          gap: 8px;
        }

        @include lt-md {
          gap: 12px;
        }

        &-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        &-title {
          font-family: $golos-medium;
          font-style: normal;
          font-weight: 600;
          color: $color-dark-grey;
          font-size: 16px;
          line-height: 20px;
        }
      }

      &__tab {
        display: flex;
        flex: auto;
        align-items: center;
        gap: 8px;
        min-width: 40%;

        background: $bg-grey;
        border-radius: 12px;
        cursor: pointer;
        user-select: none;

        font-family: $golos-regular;
        line-height: 20px;
        font-size: 14px;
        letter-spacing: -0.01em;
        color: $color-dark-grey;

        @include gt-sm {
          box-sizing: border-box;
          padding-left: 37px;
          height: 48px;

          &--no-image {
            padding-left: 0;
            justify-content: center;
          }
        }

        @include lt-md {
          justify-content: center;
          height: 52px;
        }

        &--active {
          background: $color-green;
          color: #ffffff;
        }
      }

      &__tab-icon {
        width: 24px;
        height: 24px;
      }

      &__checkbox {
        display: flex;
        flex-direction: column;

        @include gt-sm {
          gap: 12px;
          padding-bottom: 24px;
        }

        @include lt-md {
          gap: 7.33px;
          padding-bottom: 25.67px;
        }
      }

      &__checkbox-item {
        font-family: $golos-regular;
        color: $color-white-grey;
        width: 100%;

        @include gt-sm {
          font-size: 14px;
          line-height: 20px;
        }

        @include lt-md {
          font-size: 11px;
          line-height: 16px;
          letter-spacing: -0.01em;
        }
      }

      &__checkbox-link {
        color: $color-green;

        @include lt-md {
          display: inline;
        }
      }
    }

    .terms {
      @include gt-sm {
        margin-top: 32px;
      }

      @include lt-md {
        margin-top: 16px;
      }
    }
  }
}

.modal {
  padding: 16px;
  box-sizing: border-box;

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
