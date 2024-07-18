<template>
  <div class="promotion">
    <div v-if="hasTitle" class="layout layout--horizontal promotion-title">Why people choose us</div>
    <div class="layout promotion-list">
      <div v-for="(promotion, idx) in promotions" :key="idx" class="promotion-list__item">
        <div class="promotion-list__text">
          <div v-for="(item, index) in promotion.text" :key="index">{{ item }}</div>
        </div>
        <figure class="promotion-list__figure">
          <img :src="getImagePath(promotion.img[getImg])" class="promotion-list__image" :alt="promotion.text" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasTitle: {
      type: Boolean,
      default: false
    },

    promotions: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    getImg() {
      return this.$device.isMobileOrTablet ? 'mobile' : 'desktop';
    }
  },

  methods: {
    getImagePath(path) {
      return `${process.env.imgCDN}${path}`;
    }
  }
};
</script>

<style scoped lang="scss">
.promotion-title {
  @include gt-sm() {
    font-family: $golos-bold;
    font-size: 20px;
    line-height: 24px;
    color: $color-dark-grey;

    & + .promotion-list {
      margin-top: 0;
    }
  }

  @include lt-md() {
    display: none;

    & + .promotion-list {
      margin-top: 22px;
    }
  }
}

.promotion-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-gap: $gap-ds;

  @include gt-sm {
    margin-top: 24px;
    margin-bottom: 6px;
  }

  @include lt-md {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    grid-gap: 8px;
  }

  &__item {
    position: relative;
    background: #fff2d5;

    box-sizing: border-box;
    overflow: hidden;

    @include gt-sm {
      display: flex;
      align-items: center;
      height: 80px;
      padding: 20px;
      border-radius: $border-radius-ds;
    }

    @include lt-md {
      min-height: 48px;
      padding: 12px 16px;
      border-radius: 8px;
    }

    &:nth-child(1) {
      .promotion-list__image {
        @include gt-sm {
          width: 114px;
          height: 104px;
          top: -37px;
          right: 0;
        }

        @include lt-md {
          width: 68px;
          height: 62px;
          top: -24px;
          right: -4px;
        }
      }

      .promotion-list__text {
        @include gt-xs {
          max-width: 162px;
        }

        &:nth-child(1) {
          & > div {
            &:nth-child(1) {
              font-family: $golos-bold;
              color: $color-dark-green;
            }
          }
        }
      }
    }

    &:not(:nth-child(1)) {
      .promotion-list__text {
        & > div {
          &:nth-child(2) {
            font-family: $golos-bold;
            color: $color-dark-green;
          }
        }
      }
    }

    &:nth-child(2) {
      .promotion-list__image {
        @include gt-sm {
          width: 162px;
          height: 126px;
          top: -63px;
          right: -30px;
        }

        @include lt-md {
          width: 138px;
          height: 110px;
          top: -46px;
          right: -32px;
        }
      }

      .promotion-list__text {
        @include gt-xs {
          max-width: 124px;
        }
      }
    }

    &:nth-child(3) {
      .promotion-list__image {
        @include gt-sm {
          width: 160px;
          height: 149px;
          top: -60px;
          right: -24px;
        }

        @include lt-md {
          width: 131px;
          height: 109px;
          top: -47px;
          right: -46px;
        }
      }

      .promotion-list__text {
        @include gt-sm {
          max-width: 182px;
        }

        @include lt-md {
          max-width: 180px;
        }
      }
    }
  }

  &__text {
    color: #2f2b20;

    @include gt-sm {
      max-width: 60%;
      font-family: $golos-medium;
      letter-spacing: -0.01em;
    }

    @include lt-md {
      max-width: 140px;
      font-family: $golos-medium;
      font-size: 13px;
      line-height: 16px;
    }
  }

  &__figure {
    width: 50%;
    height: 0;
    position: absolute;
    top: 0;
    right: 16px;
    bottom: 0;
    margin: auto;
  }

  &__image {
    position: absolute;
    mix-blend-mode: darken;
  }
}
</style>
