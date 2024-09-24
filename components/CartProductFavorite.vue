<template>
  <div class="favorite">
    <app-button theme="grey" size="sm" @click="toggleLike">
      <app-like-icon :like="like" theme="outline" size="small" />
    </app-button>
    <div class="favorite__text">{{ likedText }}</div>
  </div>
</template>

<script>
import Vue from 'vue';

import AppButton from '~/components/shared/AppButton.vue';
import AppLikeIcon from '~/components/shared/AppLikeIcon.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'CartProductFavorite',

  components: { AppLikeIcon, AppButton },

  props: {
    isLiked: {
      type: Boolean,
      default: false
    },

    id: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      like: this.isLiked
    };
  },

  computed: {
    likedText() {
      return this.like ? 'Added to favorite' : 'Add to favorite';
    }
  },

  methods: {
    ...accessorMapper('favorites', ['addToFavorites', 'removeFromFavorites']),

    toggleLike() {
      const action = this.like ? 'removeFromFavorites' : 'addToFavorites';
      this[action](this.id);

      this.like = !this.like;
    }
  }
});
</script>

<style lang="scss" scoped>
.favorite {
  display: flex;
  align-items: center;

  &__text {
    font-family: $golos-regular;
    font-size: 14px;
    line-height: 20px;
    margin-left: 10px;
  }
}
</style>
