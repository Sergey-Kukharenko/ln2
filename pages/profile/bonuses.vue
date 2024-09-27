<template>
  <div class="bonuses-page">
    <profile-title :title="getTitle" large />
    <div class="title">Get points</div>
    <profile-bonus-history :list="getList" />
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileTitle from '~/components/profile/ProfileTitle.vue';
import ProfileBonusHistory from '~/components/profile/profile-bonus/ProfileBonusHistory.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'BonusesPage',

  components: { ProfileTitle, ProfileBonusHistory },

  layout: 'profile',

  computed: {
    ...accessorMapper('profile-loyalty', ['loyalty']),

    getTitle() {
      return this.$device.isDesktopOrTablet ? this.loyalty?.title : 'Score history';
    },

    getList() {
      return this.loyalty?.list;
    }
  }
});
</script>

<style scoped lang="scss">
.bonuses-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.title {
  font-family: $golos-medium;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.02em;
}
</style>
