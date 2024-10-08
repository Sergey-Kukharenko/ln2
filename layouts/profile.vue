<template>
  <div class="profile-layout" :class="{ static: $device.isMobile && isProfileOrder }">
    <app-header-mobile v-if="$device.isMobileOrTablet" />
    <app-header v-else />

    <div class="layout layout-dt profile-container" :class="{ move, 'not-smooth': notSmooth }">
      <template>
        <profile-sidebar v-if="$device.isDesktopOrTablet" />
        <div class="profile-page">
          <!--          <div v-if="!isProfileOrder && $device.isMobile" class="button" @click="move = false">-->
          <!--            <svg-icon name="profile-back" class="icon" />-->
          <!--          </div>-->
          <Nuxt />
        </div>
      </template>
    </div>

    <app-footer-bottom v-if="$device.isDesktopOrTablet" class="footer" />
  </div>
</template>
<script>
import Vue from 'vue';

import AppFooterBottom from '~/components/footer/AppFooterBottom.vue';
import AppHeader from '~/components/header/AppHeader.vue';
import AppHeaderMobile from '~/components/header/mobile/AppHeaderMobile.vue';
import ProfileSidebar from '~/components/profile/profile-sidebar/ProfileSidebar.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'ProfileLayout',

  components: {
    AppFooterBottom,
    AppHeader,
    AppHeaderMobile,
    ProfileSidebar
  },

  provide() {
    return {
      moveToPage: this.moveToPage
    };
  },

  data() {
    return {
      move: false,
      notSmooth: false,
      timerId: null
    };
  },

  async fetch() {
    try {
      await this.fetchPersonal();
      await this.fetchFavorites();
      await this.fetchOrders();
      await this.fetchNotifications();
      await this.fetchLoyalty();
      await this.fetchOrder();
    } catch (err) {
      console.error(err);
    }
  },

  computed: {
    isProfileOrder() {
      return this.$route.name === 'profile-order-id';
    }
  },

  watch: {
    $route(_, prevValue) {
      if (prevValue.name !== 'profile-order-id') {
        return;
      }

      this.notSmooth = true;

      this.timerId = setTimeout(() => {
        this.notSmooth = false;
      }, 100);
    }
  },

  beforeDestroy() {
    clearInterval(this.timerId);
  },

  methods: {
    ...accessorMapper('profile-personal', ['fetchPersonal']),
    ...accessorMapper('favorites', ['fetchFavorites']),
    ...accessorMapper('profile-orders', ['fetchOrders']),
    ...accessorMapper('profile-notifications', ['fetchNotifications']),
    ...accessorMapper('profile-loyalty', ['fetchLoyalty']),
    ...accessorMapper('profile-order', ['fetchOrder']),

    moveToPage(payload) {
      this.move = payload;
    }
  }
});
</script>

<style lang="scss" scoped>
.profile-layout {
  min-height: 100vh;

  @include gt-sm {
    display: flex;
    flex-direction: column;
  }

  &:not(.static) {
    @include lt-md {
      background: $bg-grey;
      overflow: hidden;
    }

    .profile-page {
      @include lt-md {
        width: 100%;
        height: calc(100dvh - 50px);
        overflow-y: auto;
        //position: absolute;
        //top: 0;
        //left: 100%;
        padding: 16px;
        box-sizing: border-box;
      }
    }
  }

  &.static {
    .profile-container {
      @include lt-md {
        transform: none;
        transition: none;
      }

      &.move {
        @include lt-md {
          transform: none;
          transition: none;
        }
      }
    }
  }
}

.profile-container {
  display: flex;

  @include gt-sm {
    max-width: 1130px;
    align-items: flex-start;
    gap: 32px;
    width: 100%;
    margin: 24px auto 0;
  }

  @include lt-md {
    position: relative;
    transition: transform 0.3s ease 0s;
  }

  &.move {
    @include lt-md {
      //transform: translateX(-100%);
    }
  }

  &.not-smooth {
    @include lt-md {
      transition: none;
    }
  }
}

.profile-page {
  background: #fff;

  @include gt-sm {
    flex: 1;
  }
}

//.button {
//  position: absolute;
//}
//
//.icon {
//  width: 24px;
//  height: 24px;
//  color: $color-dark-green;
//}

.footer {
  margin-top: auto;
}
</style>
