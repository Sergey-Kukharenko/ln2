<template>
  <div class="occasions">
    <div class="occasions__title">{{ title }}</div>
    <div class="occasions__slider" :class="{ 'occasions__slider--checkout': isCheckout }">
      <client-only>
        <swiper
          ref="swiper"
          :options="swiperOptions"
          :auto-update="true"
          :auto-destroy="true"
          :delete-instance-on-destroy="true"
          :cleanup-styles-on-destroy="true"
          class="swiper swiper--galery"
        >
          <swiper-slide v-for="(card, index) in giftCardList" :key="index" :ref="`slide-${index}`">
            <div class="occasions__slide" :class="getClassNames(index)" @click="onSelectCard(card, index)">
              <img
                :src="useSizedImage({ realId: card.real_id, sizeName: imgSize, imgName: card.img })"
                class="occasions__image"
                :alt="card.description"
              />
              <div class="occasions__text">{{ card.title }}</div>
            </div>
          </swiper-slide>

          <div slot="button-next" class="swiper-button-next arrow">
            <svg-icon class="swiper-button-next__icon" name="arrow-right" />
          </div>
          <div slot="button-prev" class="swiper-button-prev arrow">
            <svg-icon class="swiper-button-prev__icon" name="arrow-right" />
          </div>
        </swiper>
      </client-only>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

import { IMG_SIZES_MAP } from '~/constants/image-sizes';
import { useSizedImage } from '~/helpers';
import { accessorMapper } from '~/store';
import 'swiper/css/swiper.css';

const GIFT_CARD_TIMEOUT = 300;

export default Vue.extend({
  name: 'GiftCardOccasions',

  components: {
    Swiper,
    SwiperSlide
  },

  props: {
    title: {
      type: String,
      default: 'Occasions:'
    },

    hasArrows: {
      type: Boolean,
      default: false
    },

    selectedCardId: {
      type: [String, Number],
      default: ''
    },

    giftCardList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      swiperOptions: {
        loop: false,
        centeredSlides: false,
        slidesPerView: 'auto',
        touchRatio: 0.5,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },

      selectedCardIndex: 0,

      isMounted: false
    };
  },

  computed: {
    ...accessorMapper('gifts', ['giftCards']),

    isCheckout() {
      return this.$route.name === 'checkout-final-details';
    },

    isNavigationVisible() {
      return this.hasArrows && this.$device.isDesktop;
    },

    swiper() {
      return this.$refs.swiper?.$swiper;
    },

    imgSize() {
      return IMG_SIZES_MAP.size50;
    }
  },

  mounted() {
    const timeoutId = setTimeout(() => {
      this.initSelectedCardIndex();

      clearTimeout(timeoutId);
    }, GIFT_CARD_TIMEOUT);
  },

  methods: {
    initSelectedCardIndex() {
      const idx = this.giftCardList.findIndex((card) => card?.id === this.selectedCardId) || 0;
      const resultIndex = idx === -1 ? 0 : idx;
      const payload = {
        productId: this.giftCardList?.[resultIndex]?.id,
        positionSlug: this.giftCardList?.[resultIndex]?.title,
        init: true
      };
      this.$emit('select', payload);
      this.swiper.slideTo(resultIndex, GIFT_CARD_TIMEOUT, false);
      this.selectedCardIndex = resultIndex;
    },

    getClassNames(index) {
      return {
        'occasions__slide--active': index === this.selectedCardIndex,
        'occasions__slide--small': this.isCheckout
      };
    },

    onSelectCard({ id, title }, index) {
      this.selectedCardIndex = index;
      this.swiper.slideTo(index, GIFT_CARD_TIMEOUT, false);
      const payload = {
        productId: id,
        positionSlug: title
      };
      this.$emit('select', payload);
    },

    useSizedImage
  }
});
</script>

<style lang="scss" scoped>
.occasions {
  &__slider {
    .swiper-slide {
      @include gt-sm {
        width: 108px !important;
        margin-right: 12px;
      }

      @include lt-md {
        width: 135px !important;
        margin-right: 10px;
      }
    }

    &--checkout {
      .swiper-slide {
        @include gt-sm {
          width: 104px !important;
          margin-right: 12px;
        }

        @include lt-md {
          width: 80px !important;
          margin-right: 8px;
        }
      }
    }
  }

  &__slide {
    display: flex;
    flex-direction: column;

    @include gt-sm {
      gap: 12px;

      &:hover {
        cursor: pointer;
      }
    }

    @include lt-md {
      gap: 8px !important;
    }

    &--small {
      @include gt-sm {
        gap: 0px !important;
      }

      @include lt-md {
        gap: 0px;
      }

      .occasions__text {
        font-family: $golos-regular;
        font-weight: 400;

        @include gt-sm {
          margin-top: 12px;
          font-size: 12px;
        }

        @include lt-md {
          margin-top: 4px;
          font-size: 10px;
        }
      }
    }

    &--active {
      pointer-events: none;

      .occasions__image {
        border: 2.5px solid #26ad4f;
      }
    }
  }

  &__title {
    font-family: $Literata;
    letter-spacing: -0.01em;
    margin-bottom: 12px;

    @include gt-sm {
      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
    }

    @include lt-md {
      font-size: 16px;
      font-weight: 700;
      line-height: 19.2px;
    }
  }

  &__image {
    width: 100%;
    border-radius: 12px;
    border: 2.5px solid transparent;
  }

  &__text {
    font-family: $golos-regular;
    font-weight: 400;

    @include gt-sm {
      font-size: 14px;
      line-height: 18.2px;
      letter-spacing: -0.01em;
    }

    @include lt-md {
      font-size: 12px;
      line-height: 15.6px;
      letter-spacing: -0.02em;
    }
  }
}

.swiper-button-prev::after {
  content: '';
}
.swiper-button-next::after {
  content: '';
}

.swiper-button-next {
  &__icon {
    width: 20px;
    height: 20px;
    color: $color-dark-grey;
  }
}

.swiper-button-prev {
  &__icon {
    width: 20px;
    height: 20px;
    color: $color-dark-grey;
    transform: rotate(180deg);
  }
}

.arrow {
  background: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -50px;
}

.swiper-button-disabled {
  display: none;
}
</style>
