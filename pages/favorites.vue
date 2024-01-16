<template>
  <div class="favorites">
    <app-section v-if="isFavorites" :section="favorites" name="favorites" />
    <app-favorites-empty v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { useArrayNotEmpty } from '~/helpers';

export default {
  name: 'FavoritesPage',

  components: {
    AppFavoritesEmpty: () => import('~/components/AppFavoritesEmpty.vue'),
    AppSection: () => import('~/components/shared/AppSection.vue')
  },

  layout: 'empty',

  computed: {
    ...mapState('favorites', ['favorites']),

    isFavorites() {
      return useArrayNotEmpty(this.favorites?.list);
    }
  }
};
</script>

<style scoped lang="scss">
.favorites {
  order: 3;

  @include gt-sm {
    margin-bottom: 24px;
  }
}
</style>
