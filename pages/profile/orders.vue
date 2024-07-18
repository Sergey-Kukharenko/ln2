<template>
  <div class="orders">
    <profile-section :head="head">
      <profile-orders-list :list="list" />
    </profile-section>
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileOrdersList from '~/components/profile/profile-orders-list.vue';
import ProfileSection from '~/components/profile/profile-section.vue';
import profile from '~/data/profile';

const { head, list } = profile.pages.orders;
export default Vue.extend({
  name: 'OrdersPage',
  components: { ProfileOrdersList, ProfileSection },

  layout: 'profile',

  data() {
    return {
      head,
      list
    };
  }
});
</script>

<style scoped lang="scss">
.dashboard {
}
</style>
