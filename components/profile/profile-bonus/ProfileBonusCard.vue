<template>
  <div class="profile-bonus-card" :class="type">
    <div>
      <div class="header">
        <div class="col">
          <div class="title" @click="onMoveToPage('/profile/bonuses')">Cashback 5%</div>
          <profile-bonus-button> Based</profile-bonus-button>
        </div>
        <div class="col">
          <div class="title">£ {{ price }}</div>
          <div class="text">Your balance</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="text">{{ level }}</div>
      <profile-bonus-slider :type="type" />
      <div class="text description">{{ description }}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileBonusButton from '~/components/profile/profile-bonus/ProfileBonusButton.vue';
import ProfileBonusSlider from '~/components/profile/profile-bonus/ProfileBonusSlider.vue';
import profile from '~/data/profile';
import profileMoveToPage from '~/mixins/profileMoveToPage.vue';

const { count } = profile.pages.bonuses;
export default Vue.extend({
  name: 'ProfileBonusCard',
  components: { ProfileBonusSlider, ProfileBonusButton },

  mixins: [profileMoveToPage],

  data() {
    return {
      count,

      cashback: '5%',
      price: '15',
      type: 'based',
      level: '£ 10 / 29.9 pounds left to the next level',
      description: 'Make a collective purchase of £ 29.9 and upgrade your package to “Gold”.'
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
  min-height: 182px;
  padding: 16px;
  border-radius: 16px;
  box-sizing: border-box;
  color: #fff;
  background: #ccc;
  margin: 24px 0;

  &.based {
    background: #5f88f1;
  }

  &.gold {
    background: #ffc85c;
  }

  &.platinum {
    background: #f86465;
  }

  &.vip {
    background: #15ad70;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: inherit;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 2px;

  &:first-child {
    align-items: flex-start;
  }

  &:last-child {
    align-items: flex-end;
    gap: 4px;
  }
}

.title {
  font-family: $golos-medium;
  font-size: 20px;
  line-height: normal;
  letter-spacing: -0.02em;
  color: inherit;
}

.text {
  font-family: $golos-regular;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.01em;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.description {
  margin-top: 2px;
}
</style>
