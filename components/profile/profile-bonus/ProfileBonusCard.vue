<template>
  <div class="profile-bonus-card" :class="getLowerCaseType">
    <svg-icon :name="getIconStyles.path" :style="getIconStyles.size" />
    <div class="header">
      <div class="col">
        <div class="title">Cashback {{ getCashback }}</div>
        <profile-bonus-button @click="onMoveToPage('/profile/bonuses')">{{ getButtonType }}</profile-bonus-button>
      </div>
      <div class="col">
        <div class="title">£ {{ getPrice }}</div>
        <div class="text">Your balance</div>
      </div>
    </div>
    <div class="container">
      <div class="text">{{ getLevel }}</div>
      <profile-bonus-slider :type="getLowerCaseType" />
      <div class="text description">{{ getDescription }}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileBonusButton from '~/components/profile/profile-bonus/ProfileBonusButton.vue';
import ProfileBonusSlider from '~/components/profile/profile-bonus/ProfileBonusSlider.vue';
import profileMoveToPage from '~/mixins/profile-move-to-page.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'ProfileBonusCard',
  components: { ProfileBonusSlider, ProfileBonusButton },

  mixins: [profileMoveToPage],

  computed: {
    ...accessorMapper('profile-loyalty', ['loyalty']),

    getCashback() {
      return this.loyalty?.cashback;
    },

    getPrice() {
      return this.loyalty?.price;
    },

    getLevel() {
      return this.loyalty?.level;
    },

    getDescription() {
      return this.loyalty?.description;
    },

    getType() {
      return this.loyalty?.type;
    },

    getLowerCaseType() {
      return this.getType.toLowerCase();
    },

    getButtonType() {
      return this.getLowerCaseType === 'silver' ? 'based' : this.getLowerCaseType;
    },

    getIconStyles() {
      const MAP_ICONS = {
        silver: {
          path: 'profile-silver',
          size: {
            width: 207,
            height: 181
          }
        },
        gold: {
          path: 'profile-gold',
          size: {
            width: 182,
            height: 181
          }
        },
        platinum: {
          path: 'profile-platinum',
          size: {
            width: 203,
            height: 181
          }
        },
        vip: {
          path: 'profile-vip',
          size: {
            width: 198,
            height: 161
          }
        }
      };

      return MAP_ICONS[this.getLowerCaseType];
    }
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
  position: relative;
  padding: 16px;
  border-radius: 16px;
  box-sizing: border-box;
  color: #fff;
  background: #ccc;
  margin: 24px 0;
  overflow: hidden;

  &.silver {
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

.icon {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: inherit;
  position: relative;
  z-index: 2;
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
  position: relative;
  z-index: 2;
}

.description {
  margin-top: 2px;
}
</style>
