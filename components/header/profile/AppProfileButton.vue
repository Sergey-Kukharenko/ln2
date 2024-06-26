<template>
  <div :class="classNames" v-on="$listeners">
    <div class="profile-button__figure">
      <template v-if="isAuth">
        {{ char }}
      </template>
      <svg-icon v-else name="profile" class="profile-button__icon" />
    </div>
    <div class="profile-button__figcaption" @click="goToPath">{{ getInfo }}</div>
  </div>
</template>

<script>
import Vue from 'vue';

import { useToggleClassName } from '~/helpers';

export default Vue.extend({
  name: 'AppProfileButton',

  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    isAuth() {
      return this.$accessor.auth.isAuthorized;
    },

    char() {
      return this.user?.name?.substring(0, 1);
    },

    getInfo() {
      return this.isAuth ? this.user?.name : 'Log in / Register';
    },

    classNames() {
      return useToggleClassName(this.isAuth, 'profile-button', 'active');
    }
  },

  methods: {
    goToPath() {
      if (this.$device.isMobileOrTablet) {
        return;
      }

      // this.$router.push({ name: 'signin' });
      this.$emit('close');
    }
  }
});
</script>

<style lang="scss" scoped>
.profile-button {
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

  @include lt-md {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__figure {
    display: flex;
    align-items: center;
    justify-content: center;

    @include gt-sm {
      width: 28px;
      height: 28px;
      margin: 0 auto;
    }

    @include lt-md {
      width: 32px;
      height: 32px;
      background: $bg-grey;
      border-radius: 50%;
    }
  }

  &__icon {
    fill: #ccc;

    @include gt-sm {
      width: 26.45px;
      height: 24px;
    }

    @include lt-md {
      width: 12px;
      height: 12px;
    }
  }

  &__figcaption {
    text-align: center;
    color: $color-white-grey;

    @include gt-sm {
      font-family: $golos-medium;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      margin-top: 7px;
    }

    @include lt-md {
      font-family: $golos-regular;
      font-size: 12px;
      line-height: 16px;
      margin-left: 8px;
    }
  }

  &--active {
    & .profile-button__figure {
      font-family: $golos-bold;
      font-size: 16px;
      line-height: 16px;
      color: #fff;
      background: #e8929d;

      @include gt-sm {
        width: 24px;
        height: 24px;
        border-radius: 8px;
      }

      @include lt-md {
        border-radius: 12px;
      }
    }

    & .profile-button__figcaption {
      color: $color-dark-grey;
    }
  }
}
</style>
