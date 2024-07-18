<script>
import debounce from 'lodash.debounce';
import Vue from 'vue';

import {
  BONUS,
  CHECKOUT_INPUT_DELAY,
  SUBSCRIBE_ACTION_TYPES,
  SUBSCRIBE_INVALID_EMAIL,
  SUBSCRIBE_MESSAGES,
  SUBSCRIBE_VARIANTS
} from '~/constants';
import { isEmailValid } from '~/helpers/validators';
import { accessorMapper } from '~/store';

const { email, sms, push } = SUBSCRIBE_VARIANTS;

export default Vue.extend({
  name: 'SubscribeMixin',

  data() {
    return {
      email: '',
      error: '',
      success: '',
      disabled: false
    };
  },

  computed: {
    optionsForm() {
      return {
        [email]: !!this.options?.[email],
        [sms]: !!this.options?.[sms],
        [push]: !!this.options?.[push]
      };
    },

    isOptionsFormExistEnabled() {
      return Object.values(this.optionsForm).includes(true);
    },

    isFooterModule() {
      return this.subscribeModule === 'footer';
    },

    isEmailEnabled() {
      return this.optionsForm[email];
    }
  },

  mounted() {
    this.$nuxt.$on('set-email-error', this.setRequiredError);
  },

  beforeDestroy() {
    this.$nuxt.$off('set-email-error', this.setRequiredError);
  },

  methods: {
    ...accessorMapper('user', ['sendUserSubscribe']),

    setRequiredError() {
      if (this.isFooterModule || this.email) {
        return;
      }

      this.error = SUBSCRIBE_MESSAGES.error.empty;
    },

    onInput: debounce(function () {
      if (!this.email) {
        this.error = '';
        this.success = '';

        // return;
      }

      this.error = this.hasEmailError(this.email);
      this.success = '';

      if (this.isFooterModule) {
        return;
      }

      this.agreeEmailReceive = BONUS;
      this.options.email_subscription = email;
      this.handleSubscribe();
    }, CHECKOUT_INPUT_DELAY),

    setSuccess(type) {
      const isSuccessUnavailable = !this.agreeEmailReceive || !this.isOptionsFormExistEnabled || !this.email;

      if (isSuccessUnavailable) {
        return;
      }

      this.success = SUBSCRIBE_MESSAGES.success[type];
      this.error = '';
    },

    setError(error = '') {
      this.$nuxt.$emit('set-email-status', !!this.email);
      this.success = '';
      this.error = error || SUBSCRIBE_MESSAGES.error.empty;
    },

    async handleSubscribe(action = SUBSCRIBE_ACTION_TYPES.subscribe) {
      this.error = '';

      // if (!this.email) {
      //   this.setError();
      // }

      // Временно скрыт
      // if (this.error) {
      //   return;
      // }

      if (!this.isOptionsFormExistEnabled) {
        this.error = '';
        this.success = '';
      }

      try {
        const payload = { ...this.optionsForm };

        payload.email = this.email;

        if (this.email && !isEmailValid(this.email)) {
          this.setError(SUBSCRIBE_INVALID_EMAIL);
          this.$nuxt.$emit('set-email-status', false);

          return;
        }

        const { success } = await this.sendUserSubscribe(payload);

        if (!success) {
          throw new Error(`Not success email ${action}`);
        }

        this.setSuccess(action);
        // this.$nuxt.$emit('set-email-status', !!this.email);

        // if (action === SUBSCRIBE_ACTION_TYPES.subscribe) {
        //   this.disabled = true;
        // }
      } catch (error) {
        this.setError();
        console.error(error);
      }
    }
  }
});
</script>
