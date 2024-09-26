<template>
  <div class="dashboard-page">
    <profile-content v-if="isDataExists">
      <profile-section v-if="isOrder" :head="ordersHead" preview>
        <profile-orders-list :list="[personalOrder]" preview />
      </profile-section>
      <profile-section v-if="isFavorites" :head="favoritesHead" preview>
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

import ProfileAlert from '~/components/profile/ProfileAlert.vue';
import ProfileContent from '~/components/profile/ProfileContent.vue';
import ProfileEmpty from '~/components/profile/ProfileEmpty.vue';
import ProfileSection from '~/components/profile/ProfileSection.vue';
import ProfileOrdersList from '~/components/profile/profile-orders/ProfileOrdersList.vue';
import profile from '~/data/profile';
import { useArrayNotEmpty } from '~/helpers';
import { accessorMapper } from '~/store';
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
      ordersHead: orders.head,
      favoritesHead: favorites.head
    };
  },

  computed: {
    ...accessorMapper('profile-personal', ['personalOrder']),
    ...accessorMapper('profile-favorites', ['favorites']),
    ...accessorMapper('profile-orders', ['orders']),

    isOrder() {
      return this.personalOrder?.order_id;
    },

    isFavorites() {
      return useArrayNotEmpty(this.favorites?.list);
    },

    isOrders() {
      return useArrayNotEmpty(this.orders?.current);
    },

    isDataExists() {
      return this.isOrder || this.isFavorites || this.isOrders;
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
