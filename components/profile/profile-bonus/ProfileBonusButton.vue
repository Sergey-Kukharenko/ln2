<template>
  <div class="profile-bonus-button">
    <slot />
    <svg-icon name="arrow-left" />
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'ProfileBonusButton'
});
</script>

<style scoped lang="scss">
.profile-bonus-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  background: rgba(255, 255, 255, 0.25);
  padding: 2px 4px 2px 7px;
  border-radius: 42px;

  font-family: $golos-regular;
  font-size: 12px;
  letter-spacing: 0.01em;
}

.icon {
  width: 10px;
  height: 10px;
  color: white;
  transform: rotate(-180deg);
}
</style>
