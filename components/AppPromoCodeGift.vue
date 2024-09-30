<template>
  <div class="promocode__gift gift">
    <div class="gift__image">
      <img
        :src="useSizedImage({ realId: gift.real_id, imgName: gift.featured_image.filename })"
        :alt="gift.featured_image.alt"
      />
      <span class="gift__image-icon-wrapper"><svg-icon class="gift__image-icon" name="plus" /></span>
    </div>
    <p class="gift__text">The free gift "{{ gift.title }}" has been added to the list of products</p>
  </div>
</template>

<script>
import Vue from 'vue';

import { useSizedImage } from '~/helpers';

export default Vue.extend({
  name: 'AppPromoCodeGift',

  props: {
    gift: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    useSizedImage
  }
});
</script>

<style lang="scss" scoped>
.gift {
  display: flex;
  align-items: center;
  gap: 8px;

  &__image {
    position: relative;
    width: 40px;
    aspect-ratio: 1;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 16px;
      overflow: hidden;
    }
  }

  &__image-icon-wrapper {
    position: absolute;
    top: -5px;
    right: -5px;
    display: flex;
    place-content: center;
    width: 16px;
    aspect-ratio: 1;
    background-color: #ffeff0;
    border: 2px solid #fff;
    border-radius: 50%;
  }

  &__image-icon {
    width: 7px;
    aspect-ratio: 1;
    color: $color-link-pink;
  }

  &__text {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: $color-dark-grey;
    max-width: 259px;
  }
}
</style>
