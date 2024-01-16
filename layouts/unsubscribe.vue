<template>
  <div class="unsubscribe-layout">
    <app-header-mobile v-if="$device.isMobileOrTablet" />
    <app-header v-else />
    <Nuxt />
    <app-footer-subscribe v-if="$device.isDesktop" />
  </div>
</template>

<script>
export default {
  name: 'UnsubscribeLayout',

  components: {
    AppHeader: () => import('@/components/header/AppHeader'),
    AppHeaderMobile: () => import('~/components/header/mobile/AppHeaderMobile'),
    AppFooterSubscribe: () => import('~/components/footer/AppFooterUnsubscribe.vue')
  }
};
</script>

<style lang="scss" scoped>
.unsubscribe-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
