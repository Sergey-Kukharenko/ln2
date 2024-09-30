<template>
  <div v-if="!isNotFoundPage" class="error-layout">
    <div>
      <app-not-found v-if="isNetworkError" :error="error" />
      <app-something-went-wrong v-else />

      <nuxt-link class="error-layout__button" to="/">
        <app-button theme="full">To the main page</app-button>
      </nuxt-link>
    </div>
  </div>
  <div v-else>
    <app-not-found-page></app-not-found-page>
  </div>
</template>

<script>
import AppButton from '~/components/shared/AppButton.vue';

export default {
  name: 'ErrorLayout',

  components: {
    AppSomethingWentWrong: () => import('~/components/AppSomethingWentWrong.vue'),
    AppNotFound: () => import('~/components/AppNotFound.vue'),
    AppNotFoundPage: () => import('~/components/AppNotFoundPage.vue'),
    AppButton
  },

  layout: 'custom',

  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    isNetworkError() {
      return this.error.statusCode >= 400 && this.error.statusCode < 500;
    },
    isNotFoundPage() {
      return this.error.statusCode === 404;
    }
  }
};
</script>

<style lang="scss" scoped>
.error-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  order: 2;

  @include gt-sm {
    height: 516px;
  }

  @include lt-md {
    height: 462px;
  }

  &__button {
    display: block;
    width: 200px;
    margin: 24px auto 0;
  }
}
</style>
