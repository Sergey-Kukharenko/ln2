<template>
  <div v-if="$device.isMobileOrTablet">
    <app-header-mobile />
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'MobileLayout',

  components: {
    AppHeaderMobile: () => import('~/components/header/mobile/AppHeaderMobile.vue')
  },

  middleware: ['verify-mobile-device']
};
</script>
