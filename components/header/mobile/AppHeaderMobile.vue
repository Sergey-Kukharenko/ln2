<template>
  <header>
    <app-drawer v-if="!isCheckout">
      <div :class="classNames">
        <div class="content__layout content__layout--md">
          <div class="content__row nested-group">
            <app-mobile-profile @close="close" />
            <!--Временно скрыт-->
            <!--<nuxt-link to="/search" class="search">-->
            <!--  <svg-icon name="search" class="search__icon" />-->
            <!--</nuxt-link>-->
          </div>
        </div>
        <!--Временно скрыт-->
        <!--<div class="content__layout content__layout--md">-->
        <!--<app-mobile-location />-->
        <!--</div>-->
        <div class="content__layout">
          <app-header-mobile-menu />
        </div>
        <div class="content__group">
          <div class="content__separator" />
          <div class="content__layout">
            <app-header-mobile-nav />
          </div>
        </div>
      </div>
    </app-drawer>

    <app-logo />
    <!--Временно скрыт-->
    <!--<nuxt-link to="/search" class="search">-->
    <!--  <svg-icon name="search" class="search__icon" />-->
    <!--</nuxt-link>-->
    <app-call />
    <app-cart />
  </header>
</template>

<script>
import Vue from 'vue';

import AppCall from '~/components/header/AppCall.vue';
import AppCart from '~/components/header/AppCart.vue';
import AppLogo from '~/components/header/AppLogo.vue';
// import AppMobileLocation from '~/components/header/mobile/AppMobileLocation';
import AppHeaderMobileMenu from '~/components/header/mobile/AppHeaderMobileMenu.vue';
import AppHeaderMobileNav from '~/components/header/mobile/AppHeaderMobileNav.vue';
import AppMobileProfile from '~/components/header/mobile/AppMobileProfile.vue';
import AppDrawer from '~/components/shared/AppDrawer.vue';
import { useToggleClassName } from '~/helpers';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AppHeaderMobile',

  components: {
    AppHeaderMobileNav,
    AppHeaderMobileMenu,
    // AppMobileLocation,
    AppMobileProfile,
    AppCart,
    AppCall,
    AppLogo,
    AppDrawer
  },

  provide() {
    return {
      updateVisibility: this.updateVisibility
    };
  },

  data() {
    return {
      isVisible: false
    };
  },

  computed: {
    ...accessorMapper('auth', ['isAuthorized']),

    classNames() {
      return useToggleClassName(this.isVisible, 'content', 'active');
    },

    isCheckout() {
      return this.$route.name === 'checkout';
    }
  },

  methods: {
    open() {
      this.isVisible = true;
    },

    close() {
      this.isVisible = false;
    },

    updateVisibility(payload) {
      this.isVisible = payload;
    }
  }
});
</script>

<style lang="scss" scoped>
header {
  @include lt-md {
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 9;
    height: 50px;
    padding: 0 16px;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
  }
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 12px 0;
  box-sizing: border-box;
  overflow: hidden;

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__layout {
    padding: 0 24px;
    box-sizing: border-box;

    &--md {
      padding: 0 16px;
    }
  }

  &__separator {
    width: 100%;
    height: 1px;
    background: #dde0e6;
    opacity: 1;
    transition: opacity 0.15s ease 0.15s;
  }

  &__group {
    margin-top: 16px;
  }

  &--active {
    .link {
      opacity: 0;
      transform: translateX(-40%);
    }

    & .content__separator {
      opacity: 0;
      transition: opacity 0.15s ease 0s;
    }
  }
}

.search {
  padding: 6px;

  &:last-child {
    margin-right: -6px;
  }

  &__icon {
    width: 20px;
    height: 20px;
    fill: $color-dark-grey;
  }
}
</style>

<style lang="scss">
.nested-group {
  opacity: 1;
  transition: opacity 0.3s ease 0s, transform 0.3s ease 0s;
}

.content {
  &--active {
    .nested-group {
      opacity: 0;
      transform: translateX(-100%);
    }
  }
}
</style>
