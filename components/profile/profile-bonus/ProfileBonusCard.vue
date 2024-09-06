<template>
  <div class="profile-bonus-card">
    <div>
      <div class="title" @click="onMoveToPage('/profile/bonuses')">
        Your points
        <svg-icon name="arrow-left" class="arrow" />
      </div>
      <div class="description">1 points = 1 £</div>
    </div>
    <div class="container">
      <svg-icon name="profile-coins" class="coins" />
      <div class="points">{{ count }}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import profile from '~/data/profile';
import profileMoveToPage from '~/mixins/profileMoveToPage.vue';

const { count } = profile.pages.bonuses;
export default Vue.extend({
  name: 'ProfileBonusCard',

  mixins: [profileMoveToPage],

  data() {
    return {
      count
    };
  }
});
</script>

<style scoped lang="scss">
.profile-bonus-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 296px;
  min-height: 149px;
  padding: 16px;
  border-radius: 16px;
  box-sizing: border-box;
  color: #fff;
  background: linear-gradient(112.2deg, #ffca54 0%, #ffd372 44.06%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05));
  margin: 24px 0;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: $golos-medium;
  font-size: 24px;
  line-height: normal;
  color: inherit;
  cursor: pointer;
}

.arrow {
  width: 24px;
  height: 24px;
  color: white;
  transform: rotate(-180deg);
}

.description {
  font-family: $golos-regular;
  font-size: 14px;
  line-height: normal;
  letter-spacing: -0.01em;
  margin-top: 5px;
}

.container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
}

.arrow {
  width: 24px;
  height: 24px;
}

.coins {
  width: 40px;
  height: 40px;
}

.points {
  font-family: $golos-bold;
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
}
</style>
