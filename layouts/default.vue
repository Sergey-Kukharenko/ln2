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
      <app-cookies v-if="getCookie" @setCookie="onSetCookie" />
    </transition>
    <transition name="scrolling">
      <app-button-scroll-to-top v-show="isVisibleButtonScrollToTop" />
    </transition>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import Vue from 'vue';

import AppNotification from '~/components/header/AppNotification.vue';
import AppBreadcrumbs from '~/components/shared/AppBreadcrumbs.vue';
import AppButtonScrollToTop from '~/components/ui/AppButtonScrollToTop.vue';
import { MIN_SCROLL_TO_UP_BUTTON, OUR_COOKIE } from '~/constants';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'DefaultLayout',

  components: {
    AppCookies: () => import('@/components/shared/AppCookies.vue'),
    AppHeader: () => import('@/components/header/AppHeader.vue'),
    AppHeaderMobile: () => import('~/components/header/mobile/AppHeaderMobile.vue'),
    AppFooterBottom: () => import('@/components/footer/AppFooterBottom.vue'),
    AppFooter: () => import('@/components/footer/AppFooter.vue'),
    AppBreadcrumbs,
    AppNotification,
    AppButtonScrollToTop
  },

  middleware: ['cookie'],

  data() {
    return {
      routeNames: ['basket', 'preorder-id', 'order-id', 'become-affiliate', 'youthdiscount', 'seniordiscount'],
      handleDebouncedScroll: null,
      isVisibleButtonScrollToTop: false
    };
  },

  computed: {
    ...accessorMapper('cookie', ['getCookie']),

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

  mounted() {
    this.setDisplayButtonScrollToTop();
    this.handleDebouncedScroll = debounce(this.setDisplayButtonScrollToTop, 100);
    window.addEventListener('scroll', this.handleDebouncedScroll);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleDebouncedScroll);
  },

  methods: {
    ...accessorMapper('cookie', ['addCookie']),

    onSetCookie() {
      this.addCookie(false);
    },

    setDisplayButtonScrollToTop() {
      this.isVisibleButtonScrollToTop = window.scrollY > MIN_SCROLL_TO_UP_BUTTON;
    }
  }
});
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

.scrolling-enter-active {
  animation: scroll-in 0.3s;
}

@keyframes scroll-in {
  0% {
    transform: translateY(-20px);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
