<template>
  <div class="profile">
    <app-dropdown v-if="isAuthorized" :options="getOptions">
      <template #button>
        <app-profile-button :user="getUserData" />
      </template>
      <template #dropdown>
        <app-profile-preview :user="getUserData" />
      </template>
    </app-dropdown>

    <template v-else>
      <app-profile-button :user="getUserData" @click="open" />

      <app-modal :visible="isVisible" theme="blured modal--centered" @close="close">
        <component :is="currStep" @close="close" />
      </app-modal>
    </template>
  </div>
</template>

<script>
import Vue from 'vue';

import AppAuth from '~/components/header/auth/AppAuth.vue';
import AppCode from '~/components/header/auth/code/AppCode.vue';
import AppNotReceived from '~/components/header/auth/code/AppNotReceived.vue';
import AppCompleted from '~/components/header/auth/registration/AppCompleted.vue';
import AppReg from '~/components/header/auth/registration/AppReg.vue';
import AppProfileButton from '~/components/header/profile/AppProfileButton.vue';
import AppProfilePreview from '~/components/header/profile/AppProfilePreview.vue';
import AppDropdown from '~/components/shared/AppDropdown.vue';
import AppModal from '~/components/shared/AppModal.vue';
import { disableScroll, enableScroll } from '~/helpers/scrollLock';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AppProfile',

  components: {
    AppAuth,
    AppCode,
    AppReg,
    AppCompleted,
    AppNotReceived,
    AppModal,
    AppProfilePreview,
    AppProfileButton,
    AppDropdown
  },

  data() {
    return {
      isVisible: false,
      options: {
        top: '-20px',
        right: 0
      }
    };
  },

  computed: {
    ...accessorMapper('auth', ['isAuthorized', 'currStep']),
    ...accessorMapper('user', ['getUserData']),

    getOptions() {
      return this.$device.isDesktop ? this.options : null;
    }
  },

  methods: {
    open() {
      this.isVisible = true;
      disableScroll();
    },

    close() {
      this.isVisible = false;

      this.$accessor.auth.SET_CURR_STEP('');
      enableScroll();
    }
  }
});
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;

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
    fill: $color-light-grey;

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

  &:hover {
    opacity: 0.75;
  }
}
</style>
