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
      <app-profile-button :user="getUserData" />
    </template>
  </div>
</template>

<script>
import Vue from 'vue';

import AppProfileButton from '~/components/header/profile/AppProfileButton.vue';
import AppProfilePreview from '~/components/header/profile/AppProfilePreview.vue';
import AppDropdown from '~/components/shared/AppDropdown.vue';
import { disableScroll } from '~/helpers/scrollLock';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AppProfile',

  components: {
    AppProfileButton,
    AppProfilePreview,
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
    ...accessorMapper('auth', ['isAuthorized']),
    ...accessorMapper('user', ['getUserData']),

    getOptions() {
      return this.$device.isDesktop ? this.options : null;
    }
  },

  methods: {
    open() {
      this.isVisible = true;
      disableScroll();
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
