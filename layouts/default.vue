<template>
  <div :class="classNames">
    <app-notification v-if="isDefaultRoute" />
    <app-header-mobile v-if="$device.isMobileOrTablet" />
    <app-header v-else />
    <app-breadcrumbs v-if="isDefaultRoute" />
    <Nuxt />
    <app-footer v-if="!isBasket" />
    <app-footer-bottom v-else />
    <transition v-if="isDefaultRoute" name="slide-fade">
      <app-cookies v-if="isShowAppCookie" @setCookie="onSetCookie" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppBreadcrumbs from '~/components/shared/AppBreadcrumbs';
import AppNotification from '~/components/header/AppNotification';
import { OUR_COOKIE } from '~/constants';

export default {
  name: 'DefaultLayout',

  components: {
    AppCookies: () => import('@/components/shared/AppCookies'),
    AppHeader: () => import('@/components/header/AppHeader'),
    AppHeaderMobile: () => import('~/components/header/mobile/AppHeaderMobile'),
    AppFooterBottom: () => import('@/components/footer/AppFooterBottom'),
    AppFooter: () => import('@/components/footer/AppFooter'),
    AppBreadcrumbs,
    AppNotification
  },

  middleware: ['cookie'],

  data() {
    return {
      routeNames: ['basket', 'preorder-id', 'order-id']
    };
  },

  computed: {
    ...mapGetters({ isShowAppCookie: 'cookie/getCookie' }),

    getRouteName() {
      return this.$route.name;
    },

    isBasket() {
      return this.getRouteName === 'basket';
    },

    isDefaultRoute() {
      return !this.routeNames.includes(this.getRouteName);
    },

    classNames() {
      return this.isDefaultRoute ? 'default-layout' : [`${this.getRouteName}-layout`];
    }
  },

  created() {
    if (process.server) {
      return;
    }

    const payload = !this.$cookies.get(OUR_COOKIE);
    payload && this.addCookie(payload);
  },

  methods: {
    ...mapActions({ addCookie: 'cookie/addCookie' }),

    onSetCookie() {
      this.addCookie(false);
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

.basket-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  & .footer-bottom {
    @include gt-sm {
      margin-top: auto;
    }

    @include lt-md {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
}
</style>
