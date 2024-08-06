<template>
  <div class="profile-sidebar">
    <profile-sidebar-user :name="name" />
    <profile-orders-item v-if="$device.isMobile" class="order" :item="foundCollectedOrder" background="white" />
    <profile-sidebar-nav :list="transformedNav" />
    <profile-log-out />
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileLogOut from '~/components/profile/profile-log-out.vue';
import ProfileOrdersItem from '~/components/profile/profile-orders/profile-orders-item.vue';
import ProfileSidebarNav from '~/components/profile/profile-sidebar/profile-sidebar-nav.vue';
import ProfileSidebarUser from '~/components/profile/profile-sidebar/profile-sidebar-user.vue';
import profile from '~/data/profile';
// import { accessorMapper } from '~/store';

const { name, nav } = profile.sidebar;
const { favorites, orders } = profile.pages;

const MAP_NAV = {
  favorites: favorites?.list.length,
  orders: 2
};

export default Vue.extend({
  name: 'ProfileSidebar',
  components: { ProfileLogOut, ProfileOrdersItem, ProfileSidebarNav, ProfileSidebarUser },

  data() {
    return {
      name,
      nav
    };
  },

  computed: {
    // ...accessorMapper('favorites', ['favorites']),

    filteredNav() {
      return this.$device.isMobile ? this.nav.filter((item) => item.type !== 'dashboard') : this.nav;
    },

    transformedNav() {
      return this.filteredNav.map((item) => ({
        ...item,
        count: MAP_NAV[item.type]
      }));
    },

    foundCollectedOrder() {
      return orders.list.find((item) => !item.date);
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
