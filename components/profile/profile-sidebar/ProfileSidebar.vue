<template>
  <div class="profile-sidebar">
    <profile-sidebar-user :name="getPersonalName" />
    <profile-bonus-card />
    <profile-orders-item v-if="$device.isMobile" class="order" :item="foundCollectedOrder" background="white" />
    <profile-sidebar-nav :list="transformedNav" />
    <profile-log-out />
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileLogOut from '~/components/profile/ProfileLogOut.vue';
import ProfileBonusCard from '~/components/profile/profile-bonus/ProfileBonusCard.vue';
import ProfileOrdersItem from '~/components/profile/profile-orders/ProfileOrdersItem.vue';
import ProfileSidebarNav from '~/components/profile/profile-sidebar/ProfileSidebarNav.vue';
import ProfileSidebarUser from '~/components/profile/profile-sidebar/ProfileSidebarUser.vue';
import profile from '~/data/profile';
import { accessorMapper } from '~/store';

const { name, nav } = profile.sidebar;

export default Vue.extend({
  name: 'ProfileSidebar',
  components: { ProfileBonusCard, ProfileLogOut, ProfileOrdersItem, ProfileSidebarNav, ProfileSidebarUser },

  data() {
    return {
      name,
      nav
    };
  },

  computed: {
    ...accessorMapper('profile-personal', ['personalUser']),
    ...accessorMapper('profile-favorites', ['favorites']),
    ...accessorMapper('profile-orders', ['orders']),

    getPersonalName() {
      return this.personalUser?.name;
    },

    filteredNav() {
      return this.$device.isMobile ? this.nav.filter((item) => item.type !== 'dashboard') : this.nav;
    },

    navigationModel() {
      return {
        favorites: this.favorites?.list.length,
        orders: this.orders?.current.length
      };
    },

    transformedNav() {
      return this.filteredNav.map((item) => ({
        ...item,
        count: this.navigationModel[item.type]
      }));
    },

    foundCollectedOrder() {
      return this.orders?.current.find((item) => !item.date);
    }
  }
});
</script>

<style scoped lang="scss">
.profile-sidebar {
  box-sizing: border-box;

  @include gt-sm {
    flex-shrink: 0;
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

.order {
  gap: 10px;
  margin: 10px 0 8px;
}
</style>
