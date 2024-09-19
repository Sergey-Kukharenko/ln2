<template>
  <div class="subscribe">
    <div class="subscribe__container">
      <div class="subscribe__radio">
        <app-checkbox
          v-model="agreeEmailReceive"
          size="lg"
          :name="$options.BONUS"
          @change="onChange($event, $options.BONUS)"
        >
          <span class="checkbox-text">
            Text me with <span class="checkbox-text__bold">discount up to 50%</span>
            <br />
            Alternatively, you can tell us
            <a href="#" class="checkbox-text__link" @click.stop.prevent="toggleSubscribeList">
              how you would like to hear from us
            </a>
          </span>
        </app-checkbox>
      </div>
      <div v-show="isSubscribeListVisible" class="subscribe__options">
        <div class="subscribe__options-text">Tick to confirm your choices:</div>
        <div class="subscribe__options-variants">
          <app-checkbox v-model="optionsForm.email_subscription" :name="$options.EMAIL" @change="onChange">
            Email
          </app-checkbox>
          <app-checkbox v-model="optionsForm.sms_subscription" :name="$options.SMS" @change="onChange"
            >SMS</app-checkbox
          >
          <app-checkbox v-model="optionsForm.push_subscription" :name="$options.PUSH" @change="onChange">
            App push
          </app-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import AppCheckbox from '~/components/shared/AppCheckbox.vue';
import { BONUS, SUBSCRIBE_VARIANTS } from '~/constants';

const { email, sms, push } = SUBSCRIBE_VARIANTS;

export default Vue.extend({
  name: 'AuthUserSubscribe',

  components: {
    AppCheckbox
  },

  EMAIL: email,
  SMS: sms,
  PUSH: push,
  BONUS,

  data() {
    return {
      isSubscribeListVisible: false,
      agreeEmailReceive: '',
      optionsForm: {
        email_subscription: '',
        sms_subscription: '',
        push_subscription: ''
      }
    };
  },

  computed: {
    isOptionsFormExistEnabled() {
      return Object.values(this.optionsForm).map(Boolean).includes(true);
    }
  },

  methods: {
    toggleSubscribeList() {
      this.isSubscribeListVisible = !this.isSubscribeListVisible;
    },

    onChange(_, field) {
      if (field === BONUS) {
        if (!this.agreeEmailReceive) {
          const keys = Object.keys(this.optionsForm);

          keys.forEach((key) => {
            this.optionsForm[key] = false;
          });
        } else {
          this.optionsForm = {
            [email]: email,
            [sms]: sms,
            [push]: push
          };
        }
      }

      if (!this.isOptionsFormExistEnabled) {
        this.agreeEmailReceive = '';
      } else {
        this.agreeEmailReceive = BONUS;
      }

      this.handleSubscribe();
    },

    async handleSubscribe() {
      try {
        const payload = {
          [email]: this.optionsForm[email] ? 1 : 0,
          [sms]: this.optionsForm[sms] ? 1 : 0,
          [push]: this.optionsForm[push] ? 1 : 0
        };

        const { success } = await this.$accessor.user.setUserSubscriptions(payload);

        if (!success) {
          throw new Error(`Not success}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.subscribe {
  display: flex;
  flex-direction: row;
  width: 100%;
  font-family: $golos-regular;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: #1f2226;

  margin-top: 12px;

  @include gt-md {
    justify-content: space-between;
  }

  @include lt-lg {
    flex-direction: column;
  }

  &__options {
    @include lt-md {
      margin-bottom: 8px;
    }

    padding-left: 32px;

    &-text {
      margin-bottom: 8px;
      font-family: $golos-regular;
      font-size: 12px;
      line-height: 20px;
      letter-spacing: -0.01em;

      @include lt-md {
        font-size: 12px;
        letter-spacing: -0.02em;
        line-height: 15.6px;
      }
    }

    &-variants .app-checkeybox {
      font-size: 12px;
    }
  }

  &__field {
    width: 100%;
  }

  &__radio {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex: 1 0 auto;
    flex-wrap: wrap;
    padding: 0px 6px 8px 2px;
    width: 100%;

    .app-radio {
      @include lt-lg {
        gap: 12px;
      }
    }

    .checkbox-text {
      font-family: $golos-regular;
      font-size: 12px;
      line-height: 130%; /* 15.6px */
      color: $color-dark-grey;

      &__bold {
        font-family: $golos-bold;
        color: $color-green;
      }

      &__link {
        color: $color-green;
      }

      @include lt-md {
        font-size: 12px;
      }
    }

    .app-checkbox {
      font-family: $golos-regular;
      font-size: 14px;
      line-height: 16px;

      @include lt-md {
        font-size: 12px;
      }
    }
  }

  &__field-column {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__field-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;

    @include lt-lg {
      font-family: $golos-regular;
      font-size: 11px;
      line-height: 16px;
    }
  }

  &__icon-newsfeed,
  &__icon-place {
    @include gt-md {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }

    @include lt-lg {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }
}
</style>
