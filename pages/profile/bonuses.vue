<template>
  <div class="bonuses-page">
    <profile-title :title="title" />
    <profile-bonus-history :list="list" />
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileTitle from '~/components/profile/ProfileTitle.vue';
import ProfileBonusHistory from '~/components/profile/profile-bonus/ProfileBonusHistory.vue';
import profile from '~/data/profile';

const { title, list } = profile.pages.bonuses;

export default Vue.extend({
  name: 'BonusesPage',

  components: { ProfileTitle, ProfileBonusHistory },

  layout: 'profile',

  data() {
    return {
      title,
      list
    };
  }
});
</script>

<style scoped lang="scss">
.bonuses-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
