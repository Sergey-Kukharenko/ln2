<template>
  <div class="card">
    <img
      :key="slide.real_id"
      :src="useSizedImage({ realId: slide.real_id, sizeName: $options.IMG_SIZES_MAP.max, imgName: slide.filename })"
      :alt="slide.alt_text"
      class="card__img"
    />
  </div>
</template>

<script>
import { useSizedImage } from '~/helpers';
import { IMG_SIZES_MAP } from '~/constants/image-sizes';

export default {
  name: 'AppGalleryCard',

  props: {
    slide: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    useSizedImage
  },

  IMG_SIZES_MAP
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  overflow: hidden;

  @include gt-xs {
    max-width: 528px;
    height: 528px;
    border-radius: 12px;
  }

  @include xs {
    padding-top: 100%;
  }

  &__img {
    display: block;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1);
    transition: transform 0.35s;

    @include xs {
      position: absolute;
      top: 0;
    }
  }

  &:hover {
    .card__img {
      transform: scale(1.02);
    }
  }
}
</style>
