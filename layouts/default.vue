<template>
  <div class="default-layout">
    <app-notification />
    <app-header-mobile v-if="$device.isMobileOrTablet" />
    <app-header v-else />
    <app-breadcrumbs />
    <Nuxt />
    <app-footer />
    <transition name="slide-fade">
      <app-cookies v-if="isShowAppCookies" @setCookies="onSetCookies" />
    </transition>
  </div>
</template>

<script>
import AppHeader from '@/components/header/AppHeader';
import AppHeaderMobile from '~/components/header/mobile/AppHeaderMobile';
import AppBreadcrumbs from '~/components/shared/AppBreadcrumbs';
import AppFooter from '@/components/footer/AppFooter';
import AppNotification from '~/components/header/AppNotification';
import { OUR_COOKIE } from '~/constants';

export default {
  name: 'DefaultLayout',

  components: {
    AppCookies: () => import('@/components/shared/AppCookies'),
    AppHeaderMobile,
    AppHeader,
    AppBreadcrumbs,
    AppFooter,
    AppNotification
  },

  data() {
    return {
      isShowAppCookies: false
    };
  },

  created() {
    if (process.server) {
      return;
    }

    this.isShowAppCookies = !this.$cookies.get(OUR_COOKIE);
  },

  methods: {
    onSetCookies() {
      this.$cookies.set(OUR_COOKIE, true);
      this.isShowAppCookies = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.default-layout {
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
