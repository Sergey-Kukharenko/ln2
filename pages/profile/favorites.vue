<template>
  <div class="favorites-page">
    <profile-content>
      <profile-section :head="head">
        <app-section v-if="isFavorites" show-list-only stretch size="medium" :section="favorites" name="favorites" />
        <profile-favorites-empty v-else />
      </profile-section>
    </profile-content>
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileContent from '~/components/profile/profile-content.vue';
import ProfileFavoritesEmpty from '~/components/profile/profile-favorites-empty.vue';
import ProfileSection from '~/components/profile/profile-section.vue';
import profile from '~/data/profile';
import { useArrayNotEmpty } from '~/helpers';
import { accessorMapper } from '~/store';

const { head } = profile.pages.favorites;
export default Vue.extend({
  name: 'FavoritesPage',
  components: {
    ProfileFavoritesEmpty,
    ProfileContent,
    ProfileSection,
    AppSection: () => import('~/components/shared/AppSection.vue')
  },

  layout: 'profile',

  data() {
    return {
      head
    };
  },

  fetch() {
    this.fetchFavorites();
  },

  computed: {
    ...accessorMapper('profile-favorites', ['favorites']),

    isFavorites() {
      return useArrayNotEmpty(this.favorites?.list);
    }
  },

  methods: {
    ...accessorMapper('profile-favorites', ['fetchFavorites'])
  }
});
</script>

<style scoped lang="scss">
.favorites-page {
  display: flex;
}

.favorites {
  padding: 0;
  margin-top: 8px;
}
</style>
