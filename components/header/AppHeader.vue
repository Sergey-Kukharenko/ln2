<template>
  <div class="header-group">
    <app-navigation />
    <app-multiply-navigation />
    <app-nav-bar v-if="$route.name !== 'cart'" />
  </div>
</template>

<script>
import AppNavigation from '@/components/header/AppNavigation.vue';
import AppMultiplyNavigation from '~/components/header/AppMultiplyNavigation.vue';
import AppNavBar from '~/components/header/AppNavBar.vue';

export default {
  name: 'AppHeader',
  components: {
    AppNavBar,
    AppMultiplyNavigation,
    AppNavigation
  }
};
</script>

<style lang="scss" scoped>
.header-group {
  position: relative;
  z-index: 5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
}
</style>
