<template>
  <div class="orders">
    <profile-section :head="head">
      <profile-orders-list v-if="isOrders" :list="list" />
      <profile-orders-empty v-else />
    </profile-section>
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileOrdersEmpty from '~/components/profile/profile-orders/profile-orders-empty.vue';
import ProfileOrdersList from '~/components/profile/profile-orders/profile-orders-list.vue';
import ProfileSection from '~/components/profile/profile-section.vue';
import profile from '~/data/profile';
import { useArrayNotEmpty } from '~/helpers';

const { head, list } = profile.pages.orders;
export default Vue.extend({
  name: 'OrdersPage',
  components: { ProfileOrdersEmpty, ProfileOrdersList, ProfileSection },

  layout: 'profile',

  data() {
    return {
      head,
      list
    };
  },

  computed: {
    isOrders() {
      return useArrayNotEmpty(list);
    }
  }
});
</script>
