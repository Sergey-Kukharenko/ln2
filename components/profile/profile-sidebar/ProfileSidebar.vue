<template>
  <div class="profile-sidebar">
    <profile-sidebar-user :name="getPersonalName" />
    <profile-bonus-card v-if="isLoyalty" />
    <profile-orders-item v-if="$device.isMobile && isOrder" class="order" :item="personalOrder" background="white" />
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
import { useArrayNotEmpty } from '~/helpers';
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
    ...accessorMapper('profile-personal', ['personalOrder']),
    ...accessorMapper('profile-personal', ['personalUser']),
    ...accessorMapper('favorites', ['favorites']),
    ...accessorMapper('profile-orders', ['orders']),
    ...accessorMapper('profile-loyalty', ['loyalty']),

    isLoyalty() {
      return useArrayNotEmpty(this.loyalty?.list);
    },

    getPersonalName() {
      return this.personalUser?.name;
    },

    filteredNav() {
      return this.$device.isMobile ? this.nav.filter((item) => item.type !== 'dashboard') : this.nav;
    },

    navigationModel() {
      return {
        favorites: this.favorites?.list?.length ?? 0,
        orders: this.orders?.current?.length ?? 0
      };
    },

    isOrder() {
      return this.personalOrder?.order_id;
    },

    isOrders() {
      return this.orders?.current?.length;
    },

    transformedNav() {
      return this.filteredNav.map((item) => ({
        ...item,
        count: this.navigationModel[item.type]
      }));
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
