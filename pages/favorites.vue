<template>
  <div class="favorites">
    <app-section v-if="isFavorites" :section="favorites" name="favorites" />
    <app-favorites-empty v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AppSection from '~/components/shared/AppSection';
import { useArrayNotEmpty } from '~/helpers';

export default {
  name: 'FavoritesPage',

  components: {
    AppSection
  },

  computed: {
    ...mapGetters({
      favorites: 'favorites/getFavorites'
    }),

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
