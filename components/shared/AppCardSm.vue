<template>
  <nuxt-link :to="{ name: `${slide.prefix}-slug`, params: { slug: slide.slug } }" :class="classNames">
    <div class="card__figure">
      <img :src="pathToImage" :alt="slide.title" class="card__img" />
    </div>

    <div class="card__title">{{ slide.title }}</div>
  </nuxt-link>
</template>

<script>
import { useClassNameProp } from '~/helpers';

export default {
  name: 'AppCardSm',

  props: {
    slide: {
      type: Object,
      default: () => ({})
    },

    theme: {
      type: String,
      default: ''
    },

    useWithoutImageSize: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      imgSize: 320
    };
  },

  computed: {
    classNames() {
      return useClassNameProp(this.theme, 'card');
    },

    pathToImage() {
      return this.useWithoutImageSize
        ? `${process.env.imgCDN}${this.slide.img}`
        : `${process.env.fileCategoriesUrl}/${this.slide.img}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  &__figure {
    overflow: hidden;

    @include gt-sm {
      height: 144px;
      border-radius: 16px;
    }

    @include lt-md {
      height: 92px;
      border-radius: 12px;
    }
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__title {
    font-family: $golos-medium;

    color: $color-dark-grey;
    text-align: center;

    @include gt-sm {
      font-size: 16px;
      line-height: 20px;
      margin-top: 16px;
    }

    @include lt-md {
      font-size: 12px;
      line-height: 16px;
      margin-top: 8px;
    }
  }

  &--custom {
    @include gt-sm {
      height: 160px;
    }

    @include lt-md {
      height: 92px;
      border-radius: 12px;
    }
  }
}
</style>
