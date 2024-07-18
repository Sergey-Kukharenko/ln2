<template>
  <div class="dashboard">
    <profile-section :head="orders.head" preview>
      <profile-orders-list :list="orders.list" preview />
    </profile-section>
    <profile-section :head="favorites.head" preview>
      <app-section v-if="favorites.list.length > 0" stretch size="medium" :section="favorites" name="favorites" />
    </profile-section>
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileOrdersList from '~/components/profile/profile-orders-list.vue';
import ProfileSection from '~/components/profile/profile-section.vue';
import profile from '~/data/profile';

const { orders, favorites } = profile.pages;
export default Vue.extend({
  name: 'DashboardPage',
  components: { ProfileOrdersList, ProfileSection, AppSection: () => import('~/components/shared/AppSection.vue') },

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
  }
});
</script>

<style scoped lang="scss">
.dashboard {
}

.favorites {
  padding: 0;
}
</style>
