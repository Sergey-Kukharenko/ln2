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
import AppHeader from '@/components/header/AppHeader';
import AppHeaderMobile from '~/components/header/mobile/AppHeaderMobile';
import AppFooter from '@/components/footer/AppFooter';
import AppNotification from '~/components/header/AppNotification';
export default {
  name: 'CustomLayout',

  components: {
    AppHeaderMobile,
    AppHeader,
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
