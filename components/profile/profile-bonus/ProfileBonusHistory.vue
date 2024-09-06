<template>
  <div class="profile-bonus-history">
    <profile-bonus-history-item v-for="item in list" :key="item.title" :item="item" />
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileBonusHistoryItem from '~/components/profile/profile-bonus/ProfileBonusHistoryItem.vue';

export default Vue.extend({
  name: 'ProfileBonusHistory',

  components: { ProfileBonusHistoryItem },

  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
});
</script>

<style scoped lang="scss">
.profile-bonus-history {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
