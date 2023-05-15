<template>
  <div class="blog-layout">
    <app-header-mobile v-if="$device.isMobileOrTablet" />
    <app-header v-else />
    <app-breadcrumbs v-if="$device.isDesktop" />
    <Nuxt />
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '~/components/header/AppHeader.vue';
import AppHeaderMobile from '~/components/header/mobile/AppHeaderMobile.vue';
import AppFooter from '~/components/footer/AppFooter.vue';
import AppBreadcrumbs from '~/components/shared/AppBreadcrumbs.vue';

export default {
  name: 'BlogLayout',
  components: { AppBreadcrumbs, AppFooter, AppHeaderMobile, AppHeader }
};
</script>

<style scoped></style>
