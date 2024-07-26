<template>
  <div class="dashboard-page">
    <profile-content v-if="!isDataExists">
      <profile-section v-if="isOrders" :head="orders.head" preview>
        <profile-orders-list :list="orders.list" preview />
      </profile-section>
      <profile-section v-if="isFavorites" :head="favorites.head" preview>
        <app-section show-list-only stretch size="medium" :section="favorites" name="favorites" preview />
      </profile-section>
    </profile-content>
    <template v-else>
      <profile-alert />
      <profile-empty />
    </template>
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileAlert from '~/components/profile/profile-alert.vue';
import ProfileContent from '~/components/profile/profile-content.vue';
import ProfileEmpty from '~/components/profile/profile-empty.vue';
import ProfileOrdersList from '~/components/profile/profile-orders/profile-orders-list.vue';
import ProfileSection from '~/components/profile/profile-section.vue';
import profile from '~/data/profile';
import { useArrayNotEmpty } from '~/helpers';
// import { accessorMapper } from '~/store';

const { orders, favorites } = profile.pages;
export default Vue.extend({
  name: 'DashboardPage',
  components: {
    ProfileAlert,
    ProfileEmpty,
    ProfileContent,
    ProfileOrdersList,
    ProfileSection,
    AppSection: () => import('~/components/shared/AppSection.vue')
  },

  layout: 'profile',

  data() {
    return {
      orders: {
        head: orders.head,
        list: orders.list
      },
      favorites: {
        head: favorites.head,
        list: favorites.list
      }
    };
  },

  computed: {
    // ...accessorMapper('favorites', ['favorites']),

    isOrders() {
      return useArrayNotEmpty(this.orders?.list);
    },

    isFavorites() {
      return useArrayNotEmpty(this.favorites?.list);
    },

    isDataExists() {
      return this.isOrders && this.isFavorites;
    }
  }
});
</script>

<style scoped lang="scss">
.dashboard-page {
  display: flex;
  flex-direction: column;

  @include gt-sm {
    gap: 24px;
  }

  @include lt-md {
    gap: 18px;
  }
}

.favorites {
  padding: 0;
  margin-top: 8px;
}
</style>
