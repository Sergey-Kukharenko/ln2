<template>
  <div>
    <button class="button search" @click="open">
      <svg-icon name="search" class="button__icon" />
      <span class="button__text">Search in Flowers</span>
    </button>

    <app-modal v-if="$device.isDesktop" :visible="isVisible" theme="full" @close="close">
      <app-search-box />
    </app-modal>
  </div>
</template>

<script>
import AppSearchBox from '~/components/header/search/AppSearchBox.vue';
import { disableScroll, enableScroll } from '~/helpers/scrollLock';

export default {
  name: 'AppSearch',

  components: {
    AppSearchBox,
    AppModal: () => import('~/components/shared/AppModal.vue')
  },

  data() {
    return {
      isVisible: false
    };
  },

  watch: {
    $route() {
      this.isVisible && this.close();
    }
  },

  methods: {
    open() {
      this.isVisible = true;
      disableScroll();
    },

    close() {
      this.isVisible = false;
      enableScroll();
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  color: $color-dark-grey;
  padding: 10px 0;

  &:hover {
    color: lighten($color-dark-grey, 20%);
  }

  &__icon {
    width: 20px;
    height: 20px;
    color: inherit;
    fill: currentColor;
  }

  &__text {
    font-family: $golos-medium;
    font-size: 14px;
    margin-left: 3px;

    @include lt-md {
      display: none;
    }
  }
}
</style>
