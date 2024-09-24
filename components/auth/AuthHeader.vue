<template>
  <div class="header-auth">
    <div class="layout layout--horizontal-dt">
      <div class="header">
        <div class="header__logo">
          <app-logo />
        </div>
        <div class="header__go-back">
          <auth-go-back-button @change-step="onChangeStep" />
        </div>
        <nuxt-link class="header__link" :to="{ name: 'index' }">Go to the main page</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import AuthGoBackButton from '~/components/auth/AuthGoBackButton.vue';
import AppLogo from '~/components/header/AppLogo.vue';
import { EAuthComponents } from '~/constants/auth.ts';

export default Vue.extend({
  name: 'AuthHeader',

  components: {
    AppLogo,
    AuthGoBackButton
  },

  props: {
    isDetailsVisible: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onChangeStep() {
      if (this.$accessor.auth.step === EAuthComponents.LOGIN) {
        this.$router.push({ name: 'index' });

        return;
      }

      this.$accessor.auth.SET_STEP(EAuthComponents.LOGIN);
    }
  }
});
</script>

<style scoped lang="scss">
.header-auth {
  background: #fff;

  @include gt-sm {
    border-bottom: 1px solid #eaeaea;
  }

  @include lt-lg {
    box-shadow: 0px 4px 8px 0px #0000000a;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;

  &__logo {
    @include gt-sm {
      display: block;
    }

    @include lt-lg {
      display: none;
    }
  }

  &__go-back {
    @include gt-sm {
      display: none;
    }

    @include lt-lg {
      display: block;
    }
  }

  &__link {
    color: $color-dark-green;
    letter-spacing: -0.02em;
    user-select: none;

    @include gt-sm {
      font-family: $golos-medium;
      font-weight: 500;
      font-size: 16px;
      line-height: 17.6px;
      cursor: pointer;
      width: 148px;
    }

    @include lt-lg {
      font-family: $golos-regular;
      font-weight: 400;
      font-size: 12px;
      line-height: 15.6px;
      text-align: right;
      width: 111px;
      padding-right: 12px;
      white-space: nowrap;
      margin-right: 12px;
    }
  }
}
</style>
