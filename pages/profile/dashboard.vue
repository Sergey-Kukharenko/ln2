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
    this.fetchPersonal();
    this.fetchFavorites();

    const some = {
      id: 'aVbqKPzWy2pj0JZg',
      real_id: 6,
      title: 'Beautiful Bouquet',
      img: '1.webp',
      slug: 'beautiful-bouquet',
      rating: '5.00',
      reviews: 0,
      like: true,
      price: '84.90',
      position_name: 'small',
      is_new: true,
      category_name: 'Spray roses',
      type_name: 'Hand-tied',
      old_price: null,
      discount: null
    };
    console.log(some);
  },

  computed: {
    ...accessorMapper('profile-personal', ['personalOrder']),
    ...accessorMapper('profile-favorites', ['favorites']),

    isOrder() {
      return useObjectNotEmpty(this.personalOrder);
    },

    isFavorites() {
      return useArrayNotEmpty(this.favorites?.list);
    },

    isDataExists() {
      return this.isOrder && this.isFavorites;
    }
  },

  methods: {
    ...accessorMapper('profile-personal', ['fetchPersonal']),
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
