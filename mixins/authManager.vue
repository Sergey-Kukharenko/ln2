<script>
import Vue from 'vue';

import { AUTH_REG_ERROR_MESSAGES, AUTH_REG_STEPS, AUTH_REG_TYPES, AUTH_TYPES } from '~/constants/index';
import { isEmailValid } from '~/helpers/validators';

export default Vue.extend({
  name: 'AuthManager',

  computed: {
    currCodeType() {
      return this.$accessor.auth.codeType;
    },

    receiver() {
      return this.$accessor.auth.receiver;
    },

    isPhoneFormType() {
      return this.currCodeType === AUTH_TYPES.phone.name;
    },

    isEmailFormType() {
      return this.currCodeType === AUTH_TYPES.email.name;
    },

    anotherType() {
      return AUTH_REG_TYPES.filter((t) => t !== this.currCodeType)[0];
    },

    phoneMask() {
      return this.$accessor.auth.phoneMask;
    }
  },

  methods: {
    isEmptyField(field) {
      return !field?.length ? AUTH_REG_ERROR_MESSAGES.requiredField : '';
    },

    hasPhoneError(status) {
      return !status ? AUTH_REG_ERROR_MESSAGES.phone.invalid : '';
    },

    hasEmailError(email) {
      return !isEmailValid(email) ? AUTH_REG_ERROR_MESSAGES.email.invalid : '';
    },

    changeStep({ status, type }) {
      if (type) this.setCodeType(type);

      if (this.$device.isMobileOrTablet) this.$router.push({ name: AUTH_REG_STEPS[status].page });

      this.$accessor.auth.SET_CURR_STEP(AUTH_REG_STEPS[status].component);
    },

    resetStep() {
      this.$accessor.auth.SET_CURR_STEP(AUTH_REG_STEPS.auth.component);
      this.$accessor.auth.SET_CODE_TYPE(AUTH_REG_TYPES[0]);
    },

    setReceiver(payload) {
      this.$accessor.auth.SET_RECEIVER(payload);
    },

    setCodeType(payload) {
      this.$accessor.auth.SET_CODE_TYPE(payload);
    }
  }
});
</script>

<style lang="scss">
.form__error {
  font-family: $golos-regular;
  font-size: 12px;
  line-height: 16px;
  color: #db1838;
  padding-left: 18px;
  margin-top: 4px;

  .error-list {
    margin: 0;
    padding-left: 18px;
  }
}
</style>
