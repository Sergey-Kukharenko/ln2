<template>
  <div class="profile-sidebar">
    <profile-sidebar-user :name="name" />
    <profile-sidebar-nav :list="nav" />
    <button class="button">
      <svg-icon v-if="$device.isMobile" name="profile-logout" class="icon" />
      Log out
    </button>
  </div>
</template>

<script>
import Vue from 'vue';

import profile from '@/data/profile';
import ProfileSidebarNav from '~/components/profile/profile-sidebar-nav.vue';
import ProfileSidebarUser from '~/components/profile/profile-sidebar-user.vue';

const { name, nav } = profile.sidebar;

export default Vue.extend({
  name: 'ProfileSidebar',
  components: { ProfileSidebarNav, ProfileSidebarUser },

  data() {
    return {
      name,
      nav
    };
  }
});
</script>

<style scoped lang="scss">
.profile-sidebar {
  box-sizing: border-box;

  @include gt-sm {
    width: 344px;
    min-height: 430px;
    padding: 24px;
    border-radius: 32px;
    box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.1);
  }

  @include lt-md {
    width: 100%;
  }
}

.button {
  font-family: $golos-bold;
  font-size: 16px;
  line-height: 20px;
  color: $color-like-active;
  margin-top: 72px;

  @include gt-sm {
    &:hover {
      color: $color-dark-green;
    }
  }

  @include lt-md {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}

.icon {
  width: 24px;
  height: 24px;
}
</style>
