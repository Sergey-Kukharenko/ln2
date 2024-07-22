<template>
  <div class="favorites-page">
    <profile-content>
      <profile-section :head="favorites.head">
        <app-section v-if="isFavorites" show-list-only stretch size="medium" :section="favorites" name="favorites" />
      </profile-section>
    </profile-content>
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileContent from '~/components/profile/profile-content.vue';
import ProfileSection from '~/components/profile/profile-section.vue';
import profile from '~/data/profile';
import { useArrayNotEmpty } from '~/helpers';
// import { accessorMapper } from '~/store';

const { favorites } = profile.pages;
export default Vue.extend({
  name: 'FavoritesPage',
  components: {
    ProfileContent,
    ProfileSection,
    AppSection: () => import('~/components/shared/AppSection.vue')
  },

  layout: 'profile',

  data() {
    return {
      favorites: {
        head: favorites.head,
        list: favorites.list
      }
    };
  },

  computed: {
    // ...accessorMapper('favorites', ['favorites']),

    isFavorites() {
      return useArrayNotEmpty(this.favorites?.list);
    }
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
