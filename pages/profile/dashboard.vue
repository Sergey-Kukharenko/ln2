<template>
  <div class="dashboard-page">
    <profile-content v-if="isDataExists">
      <profile-section v-if="isOrder" :head="ordersHead" preview>
        <profile-orders-list :list="[order]" preview />
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
import { useArrayNotEmpty, useObjectNotEmpty } from '~/helpers';
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

  fetch() {
    this.fetchOrder();
    this.fetchFavorites();
  },

  computed: {
    ...accessorMapper('profile-order', ['order']),
    ...accessorMapper('profile-favorites', ['favorites']),

    isOrder() {
      return useObjectNotEmpty(this.order);
    },

    isFavorites() {
      return useArrayNotEmpty(this.favorites?.list);
    },

    isDataExists() {
      return this.isOrder && this.isFavorites;
    }
  },

  methods: {
    ...accessorMapper('profile-order', ['fetchOrder']),
    ...accessorMapper('profile-favorites', ['fetchFavorites'])
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
