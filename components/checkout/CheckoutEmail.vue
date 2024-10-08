<template>
  <div class="email">
    <div class="email__field">
      <app-input
        v-model="email"
        placeholder="Email (Required)"
        :success="success"
        :error="error"
        size="xx-large"
        @input="onInput"
      />
      <div class="email__radio">
        <app-checkbox
          v-model="agreeEmailReceive"
          size="lg"
          :name="$options.BONUS"
          @change="onChange($event, $options.BONUS)"
        >
          <span class="checkbox-text">
            I want to receive order status updates and special news.
            <a href="#" class="checkbox-text__link" @click.stop.prevent="toggleSubscribeList">
              Choose method of contact
            </a>
          </span>
        </app-checkbox>
      </div>
      <div v-show="isSubscribeListVisible" class="email__subscribe">
        <div class="email__subscribe-text">Tick to confirm your choices:</div>
        <div class="email__subscribe-variants">
          <app-checkbox v-model="options.email_subscription" :name="$options.EMAIL" @change="onChange">
            Email
          </app-checkbox>
          <app-checkbox v-model="options.sms_subscription" :name="$options.SMS" @change="onChange"> SMS </app-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import AppCheckbox from '~/components/shared/AppCheckbox.vue';
import AppInput from '~/components/shared/AppInput.vue';
import { BONUS, SUBSCRIBE_VARIANTS } from '~/constants';

import subscribe from '~/mixins/subscribe.vue';
import { accessorMapper } from '~/store';

const { email, sms, push } = SUBSCRIBE_VARIANTS;

export default Vue.extend({
  name: 'CheckoutEmail',

  components: {
    AppCheckbox,
    AppInput
  },

  mixins: [subscribe],

  EMAIL: email,
  SMS: sms,
  PUSH: push,
  BONUS,

  data() {
    return {
      isSubscribeListVisible: false,
      agreeEmailReceive: BONUS,
      options: {
        email_subscription: email,
        sms_subscription: sms
      }
    };
  },

  async mounted() {
    try {
      const { email, ...options } = await this.fetchUserSubscribe();
      this.email = email || '';

      Object.keys(options).forEach((k) => {
        const isDisabled = !options[k];

        if (isDisabled) {
          return;
        }

        if (!this.agreeEmailReceive) {
          this.agreeEmailReceive = BONUS;
        }

        this.options[k] = k;
      });

      if (!email) {
        return;
      }

      this.$nuxt.$emit('set-email-status', Boolean(email));
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    ...accessorMapper('user', ['fetchUserSubscribe']),

    toggleSubscribeList() {
      this.isSubscribeListVisible = !this.isSubscribeListVisible;
    },

    onChange(_, field) {
      if (field === BONUS) {
        if (!this.agreeEmailReceive) {
          const keys = Object.keys(this.options);

          keys.forEach((k) => {
            this.options[k] = '';
          });

          this.error = '';
        } else {
          this.options = {
            email_subscription: this.email ? email : '',
            sms_subscription: sms
          };

          this.handleSubscribe();
        }
      }

      if (!this.isOptionsFormExistEnabled) {
        this.agreeEmailReceive = '';
      } else {
        this.agreeEmailReceive = BONUS;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.email {
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

  &__field {
    width: 100%;
  }

  &__subscribe {
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

    &-variants .app-checkbox {
      font-size: 12px;
    }
  }

  &__radio {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex: 1 0 auto;
    flex-wrap: wrap;
    padding: 12px 6px 8px 2px;

    @include gt-sm {
      width: 50%;
    }

    @include lt-md {
      width: 100%;
    }

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
        display: block;
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
    width: calc(50% - 14px);

    @include lt-lg {
      width: 100%;
    }
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
