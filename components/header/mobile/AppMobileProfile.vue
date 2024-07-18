<template>
  <div class="profile">
    <app-dropdown>
      <template #button>
        <app-profile-button :user="userData" />
      </template>
      <template #dropdown>
        <app-profile-preview :user="userData" />
      </template>
    </app-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AppProfileButton from '~/components/header/profile/AppProfileButton.vue';
import AppProfilePreview from '~/components/header/profile/AppProfilePreview.vue';
import AppDropdown from '~/components/shared/AppDropdown.vue';

export default {
  name: 'AppMobileProfile',

  components: { AppProfilePreview, AppProfileButton, AppDropdown },

  computed: {
    ...mapGetters({
      userData: 'user/getUserData',
      currStep: 'auth/currStep'
    })
  }
};
</script>

<style scoped></style>
