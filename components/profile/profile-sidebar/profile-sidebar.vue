<template>
  <div class="profile-sidebar">
    <profile-sidebar-user :name="name" />
    <profile-orders-item v-if="$device.isMobile" class="order" :item="foundCollectedOrder" background="white" />
    <profile-sidebar-nav :list="filteredNav" />
    <button class="button" @click="open">
      <svg-icon v-if="$device.isMobile" name="profile-logout" class="icon" />
      Log out
    </button>
    <profile-modal :is-visible="isVisible" @close-modal="close" />
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileModal from '~/components/profile/profile-modal.vue';
import ProfileOrdersItem from '~/components/profile/profile-orders/profile-orders-item.vue';
import ProfileSidebarNav from '~/components/profile/profile-sidebar/profile-sidebar-nav.vue';
import ProfileSidebarUser from '~/components/profile/profile-sidebar/profile-sidebar-user.vue';
import profile from '~/data/profile';
import { disableScroll, enableScroll } from '~/helpers/scrollLock';
// import { accessorMapper } from '~/store';

const { name, nav } = profile.sidebar;
const { favorites, orders } = profile.pages;

export default Vue.extend({
  name: 'ProfileSidebar',
  components: { ProfileModal, ProfileOrdersItem, ProfileSidebarNav, ProfileSidebarUser },

  data() {
    return {
      name,
      nav,
      isVisible: false
    };
  },

  computed: {
    // ...accessorMapper('favorites', ['favorites']),

    filteredNav() {
      const MAP_NAV = {
        favorites: favorites?.list.length,
        orders: 2
      };

      const newNav = this.$device.isMobile ? this.nav.filter((item) => item.type !== 'dashboard') : this.nav;

      return newNav.map((item) => ({
        ...item,
        count: MAP_NAV[item.type]
      }));
    },

    foundCollectedOrder() {
      return orders.list.find((item) => !item.date);
    }
  },

  methods: {
    open() {
      this.isVisible = true;
      disableScroll();
    },

    close() {
      this.isVisible = false;
      enableScroll();
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

.button {
  color: $color-like-active;
  line-height: 20px;
  font-family: $golos-bold;

  @include gt-sm {
    font-size: 16px;
    margin-top: 80px;

    &:hover {
      color: $color-dark-green;
    }
  }

  @include lt-md {
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: $golos-regular;
    font-size: 14px;
    margin-top: 57px;
  }
}

.icon {
  width: 24px;
  height: 24px;
}
</style>
