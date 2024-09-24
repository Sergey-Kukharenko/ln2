<template>
  <div class="favorites">
    <app-section v-if="isFavorites" :section="favorites" name="favorites" />
    <app-favorites-empty v-else />
    <app-benefits :benefits="$options.BENEFITS" />
  </div>
</template>

<script>
import Vue from 'vue';

import AppBenefits from '~/components/AppBenefits.vue';
import { useArrayNotEmpty } from '~/helpers';
import benefits from '~/mocks/benefits';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'FavoritesPage',

  components: {
    AppBenefits,
    AppFavoritesEmpty: () => import('~/components/AppFavoritesEmpty.vue'),
    AppSection: () => import('~/components/shared/AppSection.vue')
  },

  BENEFITS: benefits,
  layout: 'empty',

  computed: {
    ...accessorMapper('favorites', ['favorites']),

    isFavorites() {
      return useArrayNotEmpty(this.favorites?.list);
    }
  }
});
</script>

<style scoped lang="scss">
.favorites {
  order: 3;

  @include gt-sm {
    margin-bottom: 24px;
  }
}
</style>
