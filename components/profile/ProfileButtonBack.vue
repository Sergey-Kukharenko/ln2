<template>
  <nuxt-link v-if="!isProfileOrder && $device.isMobile" to="/profile/dashboard" class="profile-button-back">
    <svg-icon name="profile-back" class="icon" />
  </nuxt-link>
</template>

<script>
export default {
  name: 'ProfileButtonBack',

  computed: {
    isProfileOrder() {
      return this.$route.name === 'profile-order-id';
    }
  }
};
</script>

<style scoped lang="scss">
.profile-button-back {
  position: absolute;
}

.icon {
  width: 24px;
  height: 24px;
  color: $color-dark-green;
}
</style>
