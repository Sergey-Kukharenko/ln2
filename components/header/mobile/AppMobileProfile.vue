<template>
  <div class="profile">
    <app-dropdown>
      <template #button>
        <app-profile-button :user="userData" />
      </template>
      <template #dropdown>
        <app-profile-preview v-if="isAuthorized" :user="userData" />
      </template>
    </app-dropdown>
  </div>
</template>

<script>
import Vue from 'vue';

import AppProfileButton from '~/components/header/profile/AppProfileButton.vue';
import AppDropdown from '~/components/shared/AppDropdown.vue';

export default Vue.extend({
  name: 'AppMobileProfile',
  components: {
    AppProfilePreview: () => import('~/components/header/profile/AppProfilePreview.vue'),
    AppProfileButton,
    AppDropdown
  },

  computed: {
    userData() {
      return this.$accessor.user.getUserData;
    },

    isAuthorized() {
      return this.$accessor.auth.isAuthorized;
    }
  }
});
</script>

<style scoped>
.profile {
  display: flex;
  width: 100%;
  padding: 24px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 24px;
}
</style>
