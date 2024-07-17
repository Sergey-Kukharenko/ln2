<template>
  <div class="service">
    <div class="service__list list">
      <div v-for="(item, idx) in service.list" :key="idx" class="list__item card">
        <div class="card__container">
          <img :src="item.img[getImg]" class="card__img" :alt="item.alt" />
        </div>
        <div class="card__title">
          {{ item.title }}
        </div>
      </div>
    </div>

    <div class="service__container container">
      <div class="container__text">
        {{ description }}
        {{ $options.DESCRIPTION_TEXT }}
      </div>
      <div class="container__text">
        <div class="container__title">Substitution</div>
        {{ substitutionText }}
      </div>

      <a class="container__link" @click="toggle()">{{ toggleText }}</a>
    </div>
  </div>
</template>

<script>
import { DESCRIPTION_TEXT, SUBSTITUTION_TEXT, SUBSTITUTION_TEXT_COUNT } from '~/constants';

export default {
  name: 'AppService',

  props: {
    description: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      service: {
        list: [
          {
            img: {
              desktop: '/images/service/desktop/1.webp',
              mobile: '/images/service/mobile/1.webp'
            },
            alt: '1',
            title: 'Free UK Delivery with hand-to-hand service'
          },
          {
            img: {
              desktop: '/images/service/desktop/2.webp',
              mobile: '/images/service/mobile/2.webp'
            },
            alt: '2',
            title: 'We’ll send you a photo of the bouquet before dispatch'
          },
          {
            img: {
              desktop: '/images/service/desktop/3.webp',
              mobile: '/images/service/mobile/3.webp'
            },
            alt: '3',
            title: 'Delivery in 3 hours from the moment you order'
          }
        ]
      },
      isShowMore: false,
      toggleText: 'Show more'
    };
  },

  computed: {
    getImg() {
      return this.$device.isMobileOrTablet ? 'mobile' : 'desktop';
    },

    substitutionText() {
      const offset = this.$device.isMobileOrTablet ? SUBSTITUTION_TEXT_COUNT.mobile : SUBSTITUTION_TEXT_COUNT.desktop;
      return this.isShowMore ? SUBSTITUTION_TEXT : SUBSTITUTION_TEXT.substring(0, offset);
    }
  },

  methods: {
    toggle() {
      this.isShowMore = !this.isShowMore;
      this.toggleText = this.isShowMore ? 'Hide' : 'Show more';
    }
  },

  DESCRIPTION_TEXT
};
</script>

<style lang="scss" scoped>
.service {
  &__container {
    margin: 26px 0;
  }
}

.container {
  &__text,
  &__link {
    font-family: $golos-regular;
    font-size: 16px;
    line-height: 24px;
  }

  &__title {
    font-family: $golos-medium;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.02em;
    color: $color-dark-grey;

    @include gt-sm {
      margin-top: 28px;
    }

    @include lt-md {
      margin-top: 32px;
    }
  }

  &__text {
    white-space: pre-line;

    &:not(:first-child) {
      margin-top: 10px;
    }
  }

  &__link {
    display: block;
    color: $color-green;
  }
}

.list {
  @include gt-sm {
    display: flex;
    margin: -4px;
  }

  &__item {
    background: #ffeec6;
    border-radius: 16px;

    @include gt-sm {
      flex: 1 1 33%;
      min-height: 164px;
      margin: 4px;
    }

    @include lt-md {
      margin: 4px 0;
    }

    &:nth-child(1) {
      .card__img {
        @include gt-sm {
          bottom: 0px;
          left: -112px;
        }

        @include lt-md {
          bottom: -28px;
          left: 10px;
        }
      }
    }

    &:nth-child(2) {
      .card__img {
        @include gt-sm {
          bottom: -2px;
          left: 12px;
        }

        @include lt-md {
          bottom: -14px;
          left: 21px;
        }
      }
    }

    &:nth-child(3) {
      .card__img {
        @include gt-sm {
          bottom: -82px;
          left: -108px;
        }

        @include lt-md {
          bottom: -26px;
          left: -8px;
        }
      }
    }
  }
}

.card {
  display: flex;
  overflow: hidden;

  @include gt-sm {
    flex-direction: column;
  }

  @include lt-md {
    position: relative;
  }

  &__container {
    position: relative;

    @include gt-sm {
      flex: 1;
    }

    @include lt-md {
      order: 1;
      width: 130px;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
    }
  }

  &__img {
    display: block;
    position: absolute;
  }

  &__title {
    font-family: $golos-bold;
    font-size: 13px;
    line-height: 16px;
    color: $color-dark-grey;

    @include gt-sm {
      flex-shrink: 0;
      max-width: 134px;
      padding: 10px 16px 16px 16px;
    }

    @include lt-md {
      width: 170px;
      padding: 12px;
    }
  }
}
</style>
