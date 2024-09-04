<template>
  <div class="orders">
    <profile-section :head="head">
      <profile-orders-list v-if="isOrders" :list="orders.current" />
      <profile-orders-empty v-else />
    </profile-section>
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileSection from '~/components/profile/ProfileSection.vue';
import ProfileOrdersEmpty from '~/components/profile/profile-orders/ProfileOrdersEmpty.vue';
import ProfileOrdersList from '~/components/profile/profile-orders/ProfileOrdersList.vue';
import profile from '~/data/profile';
import { useArrayNotEmpty } from '~/helpers';
import { accessorMapper } from '~/store';

const { head } = profile.pages.orders;
export default Vue.extend({
  name: 'OrdersPage',
  components: { ProfileOrdersEmpty, ProfileOrdersList, ProfileSection },

  layout: 'profile',

  data() {
    return {
      head
    };
  },

  fetch() {
    this.fetchOrders();
  },

  computed: {
    ...accessorMapper('profile-orders', ['orders']),

    isOrders() {
      return useArrayNotEmpty(this.orders?.current);
    }
  },

  methods: {
    ...accessorMapper('profile-orders', ['fetchOrders', 'deleteOrder'])
  }
});
</script>
