<template>
  <div class="default-layout">
    <app-header />
    <main class="container">
      <Nuxt />
    </main>
    <app-footer v-if="!$device.isMobileOrTablet" />
  </div>
</template>

<script>
import Vue from 'vue';

import AppHeader from '~/components/auth/AuthHeader.vue';

export default Vue.extend({
  name: 'AuthLayout',

  components: {
    AppHeader,
    AppFooter: () => import('@/components/footer/AppFooter.vue')
  },

  data() {
    return {};
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

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
  }
}
</style>
