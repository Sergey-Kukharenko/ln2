<template>
  <div>
    <swiper ref="swiperTop" class="swiper swiper--gallery" :options="swiperOption" @slideChange="setSlideIndex()">
      <swiper-slide v-for="slide in slides" :key="slide.ord">
        <app-gallery-card :slide="slide" />
        <app-card-tags v-if="typeName" size="large">
          <app-card-tag>{{ typeName }}</app-card-tag>
        </app-card-tags>
      </swiper-slide>

      <template v-if="swiperOption.navigation">
        <div slot="button-next" class="swiper-button-next swiper-button-white" />
        <div slot="button-prev" class="swiper-button-prev swiper-button-white" />
      </template>

      <div v-if="swiperOption.pagination" slot="pagination" class="swiper-pagination" />
    </swiper>
    <div class="swiper-container swiper-thumbs swiper-container-initialized swiper-container-horizontal">
      <div class="swiper-wrapper">
        <div
          v-for="(slide, idx) in slides"
          :key="slide.ord"
          class="swiper-slide"
          :class="{ 'swiper-slide-active': idx === currentSlideIndex }"
        >
          <div class="thumbs-item" @click="slideTo(idx)">
            <img
              :src="
                useSizedImage({
                  realId: slide.real_id,
                  sizeName: $options.IMG_SIZES_MAP.size10,
                  imgName: slide.filename
                })
              "
              :alt="slide.alt_text"
              class="thumbs-item__img"
            />
            <div class="thumbs-item__border absolute-grow"></div>
          </div>
        </div>
      </div>
      <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

import AppGalleryCard from '@/components/shared/AppGalleryCard.vue';
import AppCardTag from '~/components/shared/AppCardTag.vue';
import AppCardTags from '~/components/shared/AppCardTags.vue';
import { IMG_SIZES_MAP } from '~/constants/image-sizes';
import { useSizedImage } from '~/helpers';

const THUMBS_LOOP_LIMIT = 4;
const THUMBS_CONTAINER_WIDTH = 276;
const THUMB_ITEM_WIDTH = 66;

export default {
  components: {
    AppCardTags,
    AppCardTag,
    Swiper,
    SwiperSlide,
    AppGalleryCard
  },

  props: {
    slides: {
      type: Array,
      default: () => []
    },

    typeName: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      swiperOption: {
        loop: true,
        loopedSlides: THUMBS_LOOP_LIMIT,
        keyboard: { enabled: true },
        slidesPerView: 1,

        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },

        breakpoints: {
          768: {
            spaceBetween: 0
          },

          769: {
            spaceBetween: 40
          }
        }
      },

      swiperOptionThumbs: {
        loop: true,
        centeredSlides: false,
        slidesPerView: this.slides.length,
        touchRatio: 0.2,
        slideToClickedSlide: true
      },
      currentSlideIndex: 0
    };
  },

  computed: {
    perViews() {
      return this.slides.length < THUMBS_LOOP_LIMIT && { slidesPerView: this.slides.length };
    },

    thumbContainerWidth() {
      const width = THUMBS_CONTAINER_WIDTH - (THUMBS_LOOP_LIMIT - this.slides.length) * THUMB_ITEM_WIDTH + 'px';

      return {
        width
      };
    }
  },
  watch: {
    slides(_value, _prevValue) {
      this.slideTo(0);
    }
  },
  methods: {
    useSizedImage,
    slideTo(index) {
      this.$refs.swiperTop.$swiper.slideTo(index, 300);
    },
    setSlideIndex() {
      this.currentSlideIndex = this.$refs.swiperTop.$swiper.realIndex;
    }
  },

  IMG_SIZES_MAP
};
</script>

<style lang="scss">
.swiper-container.swiper--gallery {
  @include xs {
    padding: 0;
    margin: 0 -14px;
  }
}

.thumbs-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 66px;
  height: 66px;
  position: relative;

  cursor: pointer;

  &__img {
    display: block;
    width: 60px;
    height: 60px;
    object-fit: cover;
    position: relative;
    z-index: 1;
    border-radius: 12px;
    overflow: hidden;
  }

  &__border {
    opacity: 0;
    border: 3px solid $color-green;
    border-radius: 12px;
  }
}

.swiper-container {
  user-select: none;

  &.swiper-thumbs {
    @include gt-xs {
      margin: 12px auto 0 -2px;
    }

    @include xs {
      display: none;
    }

    .swiper-slide {
      width: 66px;
    }
  }
}

.swiper.swiper--gallery {
  .swiper-pagination-bullets {
    @include gt-xs {
      display: none;
    }

    .swiper-pagination-bullet {
      background: rgba(255, 255, 255, 0.5);
    }

    .swiper-pagination-bullet.swiper-pagination-bullet-active {
      background: rgba(255, 255, 255, 1);
    }
  }
}

.swiper-slide-active {
  & .thumbs-item__border {
    opacity: 1;
  }

  & .thumbs-item__img {
    border-radius: 8px;
  }
}
</style>
