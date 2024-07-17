<template>
  <div class="dashboard">
    <profile-section :head="head" preview>
      <profile-orders-list :list="list" preview />
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
  name: 'DashboardPage',
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
