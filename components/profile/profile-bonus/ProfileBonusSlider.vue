<template>
  <div class="profile-bonus-slider">
    <div class="line" :style="styles" />
    <profile-bonus-slider-icon :type="type" :x="getPercentX" />
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileBonusSliderIcon from '~/components/profile/profile-bonus/ProfileBonusSliderIcon.vue';

export default Vue.extend({
  name: 'ProfileBonusSlider',

  components: { ProfileBonusSliderIcon },

  props: {
    type: {
      type: String,
      default: 'based',
      validate(value) {
        return ['based', 'gold', 'platinum', 'vip'].includes(value);
      }
    }
  },

  computed: {
    getPercentX() {
      const MAP_X_VALUES = {
        based: 50,
        gold: 60,
        platinum: 70,
        vip: 100
      };

      return MAP_X_VALUES[this.type];
    },

    styles() {
      return {
        width: `calc(${this.getPercentX}%`
      };
    }
  }
});
</script>

<style scoped lang="scss">
.profile-bonus-slider {
  width: 100%;
  min-height: 10px;
  position: relative;
  background: #fff;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
}

.line {
  width: 0;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  border-radius: 16px;
}
</style>
