<template>
  <div :class="classList">
    <component :is="step" @change-step="changeStep" />
  </div>
</template>

<script>
import Vue from 'vue';

import { EAuthComponents } from '~/constants/auth.ts';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'IndexPage',

  components: {
    AuthLogin: () => import('~/components/auth/AuthLogin.vue'),
    AuthCode: () => import('~/components/auth/AuthCode.vue'),
    AuthRegistration: () => import('~/components/auth/AuthRegistration.vue'),
    AuthCodeNotReceived: () => import('~/components/auth/AuthCodeNotReceived.vue'),
    AuthRegistrationCompleted: () => import('~/components/auth/AuthRegistrationCompleted.vue'),
    AuthContactUs: () => import('~/components/auth/AuthContactUs.vue')
  },

  layout: 'auth',

  middleware: [
    function ({ redirect, route, app: { $accessor } }) {
      if (!$accessor.auth.receiver?.phone && route.query?.from === 'basket') {
        return redirect(301, { name: 'basket' });
      }
    }
  ],

  computed: {
    ...accessorMapper('auth', ['step']),

    classList() {
      const list = ['auth'];
      const isRegUncompleted = this.step !== EAuthComponents.REGISTRATION_COMPLETED;

      if (isRegUncompleted) {
        list.push('layout');
      }

      return list;
    }
  },

  beforeDestroy() {
    this.$accessor.auth.SET_STEP(EAuthComponents.LOGIN);
    this.$accessor.auth.SET_RECEIVER({ phone: '', name: '' });
  },

  methods: {
    changeStep(step) {
      this.$accessor.auth.SET_STEP(step);
    }
  }
});
</script>

<style lang="scss">
.auth {
  @include gt-sm {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @include lt-md {
    width: 100%;
  }
}

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

  &--gender {
    padding-left: 0;
  }
}
</style>
