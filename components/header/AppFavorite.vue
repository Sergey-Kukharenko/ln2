<template>
  <nuxt-link :to="goToFavorites" :class="classNames">
    <div class="favorite__figure">
      <svg-icon name="heart" class="favorite__icon" />
      <app-counter v-if="isCount" :count="count" class="favorite__counter" />
    </div>
    <div class="favorite__figcaption">Favorite</div>
  </nuxt-link>
</template>

<script>
import { mapGetters } from 'vuex';

import AppCounter from '@/components/shared/AppCounter.vue';
import { useToggleClassName } from '@/helpers';

export default {
  name: 'AppFavorite',

  components: { AppCounter },

  computed: {
    ...mapGetters({
      count: 'favorites/getCount'
    }),

    isCount() {
      return this.count > 0;
    },

    goToFavorites() {
      return this.isCount ? '/favorites' : '';
    },

    classNames() {
      return useToggleClassName(this.isCount, 'favorite', 'active');
    }
  }
};
</script>

<style lang="scss" scoped>
.favorite {
  color: #ccc;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

  @include lt-md {
    display: none;
  }

  &__figure {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 28px;
    height: 28px;
    margin: 0 auto;
  }

  &__icon {
    width: 20px;
    height: 18.5px;
    fill: currentColor;
  }

  &__figcaption {
    font-family: $golos-medium;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: $color-light-grey;
    margin-top: 7px;
  }

  &__counter {
    top: -4px;
    right: -11px;
    background: currentColor;
  }

  &--active {
    color: $color-favorite;

    .favorite__figcaption {
      color: inherit;
    }
  }
}
</style>
