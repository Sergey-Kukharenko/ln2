<template>
  <div class="custom-layout">
    <app-notification />
    <app-header-mobile v-if="$device.isMobileOrTablet" />
    <app-header v-else />
    <Nuxt />
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/footer/AppFooter.vue';
import AppNotification from '~/components/header/AppNotification.vue';

export default {
  name: 'CustomLayout',

  components: {
    AppHeader: () => import('@/components/header/AppHeader.vue'),
    AppHeaderMobile: () => import('~/components/header/mobile/AppHeaderMobile.vue'),
    AppFooter,
    AppNotification
  }
};
</script>

<style lang="scss" scoped>
.custom-layout {
  @include lt-md {
    display: flex;
    flex-direction: column;

    & .header-group {
      order: 0;
    }

    & .notification {
      order: 1;
    }

    & main,
    & > .layout {
      order: 2;
    }

    & footer {
      order: 3;
    }
  }
}
</style>
