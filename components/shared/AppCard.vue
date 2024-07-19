<template>
  <div v-observe-visibility="onVisibility" :class="classes">
    <app-discount-badge
      v-if="isDiscountAvailable"
      :scale="badgeScale"
      :offset-left="badgeOffsetLeft"
      :offset-top="badgeOffsetTop"
    />

    <div class="card__hint">
      <div class="hint">
        <svg-icon name="truck-hint" class="hint__icon" />
        <div class="hint__text">Free shipping</div>
      </div>
    </div>

    <div class="card__over">
      <div class="card__container" @click="gtmMultipleEvents">
        <div class="header">
          <!--Временно скрыт-->
          <!-- <app-badge theme="red" size="xs" class="header__badge"> - 30% </app-badge> -->
          <app-like-icon :like="like" class="header__like" @click="toggleLike" />
        </div>
        <app-card-link :slug="getProductSlug" :is-product-page="isProductPage">
          <app-image
            :key="getProductImage"
            :path="getProductImage"
            :alt="slide.title"
            :lazy="lazyImage"
            class="absolute-center figure__img"
          />
        </app-card-link>

        <app-card-tags v-if="slide.type_name">
          <app-card-tag>{{ slide.type_name }}</app-card-tag>
        </app-card-tags>
      </div>
      <div class="card__body">
        <!--Временно скрыт-->
        <!--<div class="rating">-->
        <!--  <div :class="ratingClassName">{{ showStatus }}</div>-->
        <!--  <svg-icon name="star" class="rating__icon" />-->
        <!--  <div class="rating__reviews">{{ slide.reviews }}</div>-->
        <!--</div>-->

        <div class="title">
          {{ slide.title }}
        </div>

        <!-- Временно скрыт -->
        <app-card-colors-list v-if="isConstructor" :list="getColorsList" @set-color-item="onSetColorItem" />

        <div class="content">
          <div class="price">
            <div class="price__current">
              <span v-if="hasFrom && !isOldPriceExist" class="price__from"> From </span> {{ priceWithSign }}
            </div>
            <div v-if="slide.sale || isOldPriceExist" class="group">
              <div class="price__old">{{ oldPrice }}</div>
              <div class="group__badge">
                <!--Временно скрыт-->
                <!-- <app-badge theme="red">
                  {{ slide.sale.percent }}
                </app-badge> -->
              </div>
            </div>
          </div>
          <app-button theme="green" size="sm" stretch="fix" @click="onAddToCart">
            <span>Send</span>
          </app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

// import AppBadge from './AppBadge.vue';
// import AppLikeIcon from '~/components/shared/AppLikeIcon';
import AppButton from './AppButton.vue';
import AppCardLink from './AppCardLink.vue';

import AppCardTag from '~/components/shared/AppCardTag.vue';
import AppCardTags from '~/components/shared/AppCardTags.vue';
import AppImage from '~/components/shared/AppImage.vue';
import AppLikeIcon from '~/components/shared/AppLikeIcon.vue';
import { PRODUCT_CARD_IMAGE_SIZE } from '~/constants';
import { GTM_EVENTS_MAP } from '~/constants/gtm';
import { IMG_SIZES_MAP } from '~/constants/image-sizes';
import { useSizedImage, useToggleClassName } from '~/helpers';
import gtm from '~/mixins/gtm.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AppCard',

  components: {
    AppLikeIcon,
    AppCardTag,
    AppCardTags,
    AppCardColorsList: () => import('~/components/shared/AppCardColorsList.vue'),
    AppDiscountBadge: () => import('~/components/shared/AppDiscountBadge.vue'),
    AppImage,
    // AppLikeIcon,
    // AppBadge,
    AppButton,
    AppCardLink
  },

  mixins: [gtm],

  props: {
    slide: {
      type: Object,
      default: () => ({})
    },

    size: {
      type: String,
      default: '',
      validate(value) {
        return ['sm'].includes(value);
      }
    },
    lazyImage: {
      type: Boolean,
      default: true
    },

    hasFrom: {
      type: Boolean,
      default: false
    },

    isConstructor: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      like: this.slide.like,
      selectedProduct: null
    };
  },

  computed: {
    isNew() {
      return this.slide.is_new;
    },

    showStatus() {
      return this.isNew ? 'New' : this.slide.rating;
    },

    ratingClassName() {
      return useToggleClassName(this.isNew, 'rating__text', 'color-green');
    },

    classes() {
      return {
        card: true,
        [`card--${this.size}`]: this.size
      };
    },

    imgSize() {
      return this.$device.isMobileOrTablet ? PRODUCT_CARD_IMAGE_SIZE.mobile : PRODUCT_CARD_IMAGE_SIZE.desktop;
    },

    onVisibility() {
      return {
        callback: this.visibilityChanged,
        once: true,
        intersection: {
          threshold: 0.5
        }
      };
    },

    isProductPage() {
      return this.$route.name === 'product-id';
    },

    getColorsList() {
      return this.slide?.colors?.length ? this.slide.colors : [];
    },

    getProductImage() {
      const options = {
        realId: this.isConstructor ? this.selectedProduct?.offer_id : this.slide.real_id,
        sizeName: IMG_SIZES_MAP.size60,
        imgName: this.isConstructor ? this.selectedProduct?.offer_image : this.slide.img
      };

      return useSizedImage(options);
    },

    getProductSlug() {
      return this.isConstructor ? this.selectedProduct?.offer_slug : this.slide.slug;
    },

    badgeScale() {
      return this.$device.isMobileOrTablet ? '0.7' : '1';
    },

    badgeOffsetLeft() {
      return this.$device.isMobileOrTablet ? '-7' : '6';
    },

    badgeOffsetTop() {
      return this.$device.isMobileOrTablet ? '-1' : '6';
    },

    isDiscountAvailable() {
      return Boolean(this.slide.discount);
    },

    isOldPriceExist() {
      return Boolean(this.slide.old_price);
    },

    priceWithSign() {
      return `£ ${this.slide.price}`;
    },

    oldPriceWithSign() {
      return `£ ${this.slide.old_price}`;
    },

    oldPrice() {
      return this.isOldPriceExist ? this.oldPriceWithSign : this.priceWithSign;
    }
  },

  methods: {
    ...accessorMapper('cart', ['addToCart']),
    ...accessorMapper('favorites', ['addToFavorites', 'removeFromFavorites']),

    useSizedImage,

    onSetColorItem({ item }) {
      this.selectedProduct = item;
    },

    visibilityChanged(isVisible) {
      isVisible && this.gtmSetItemListEvent();
    },

    toggleLike() {
      const action = this.like ? 'removeFromFavorites' : 'addToFavorites';
      this[action](this.slide.id);

      this.like = !this.like;
    },

    onAddToCart() {
      // Временно отключил добавление в корзину
      // const payload = {
      //   productId: this.slide.id,
      //   positionSlug: this.slide.position_name
      // };

      // this.addToCart(payload);
      this.gtmClearItemEvent();
      this.dataLayerSetOriginalUrl();

      if (this.isProductPage) {
        location.href = `/product/${this.getProductSlug}`;
      } else {
        this.$router.push({ name: 'product-id', params: { id: this.getProductSlug } });
      }
    },

    gtmSelectItemEvent() {
      const item = {
        item_name: this.slide.title,
        item_id: this.slide.real_id,
        item_brand: 'myflowers',
        item_category: this.slide.category_name,
        item_variant: this.slide.position_name,
        quantity: 1,
        price: this.slide.price
      };

      this.$gtm.push({
        event: GTM_EVENTS_MAP.selectItem,
        ecommerce: {
          items: [item]
        }
      });
    },

    gtmMultipleEvents() {
      this.gtmClearItemEvent();
      this.gtmSelectItemEvent();
    },

    gtmSetItemListEvent() {
      const item = {
        item_name: this.slide.title,
        item_id: this.slide.real_id,
        item_brand: 'myflowers',
        price: this.slide.price,
        item_category: this.slide.category_name,
        item_variant: this.slide.position_name,
        quantity: 1
      };

      this.$gtm.push({
        event: GTM_EVENTS_MAP.viewItemList,
        ecommerce: {
          items: [item]
        }
      });
    }
  },

  IMG_SIZES_MAP
});
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  z-index: 1;

  &__hint {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    min-height: 156px;
    padding: 4px 12px;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
    transform: translateY(0%);
    transition: box-shadow 0.24s ease-out 0s, transform 0.24s ease-out 0s;
  }

  &__over {
    overflow: hidden;

    @include gt-sm {
      box-shadow: 0 4px 32px rgba(0, 0, 0, 0.1);
      border-radius: 14px;
    }

    @include lt-md {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
  }

  &__body {
    background: #fff;
    position: relative;
    z-index: 2;
  }

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    border-radius: 12px;
    box-sizing: border-box;

    @include gt-sm {
      height: 254px;
      padding: 8px;
    }

    @include lt-md {
      height: 160px;
      padding: 8px;
    }

    &:hover {
      .figure__img {
        transform: translate(-50%, -50%) scale(1.1);
      }
    }
  }

  &:hover {
    z-index: 2;

    @include gt-sm {
      & .card__hint {
        box-shadow: 0 0 32px rgba(0, 0, 0, 0.1);
        transform: translateY(-40px);
      }

      & .hint__icon,
      & .hint__text {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  &--sm {
    & .card__over {
      box-shadow: 0 4px 32px rgb(0 0 0 / 10%);
      border-radius: 10px;
    }

    & .card__container {
      height: 144px;
      padding: 8px;
    }

    & .header__like {
      display: none;
    }

    & .rating {
      min-height: 20px;
      padding: 2px 6px 2px 8px;
      box-sizing: border-box;

      &__text {
        font-size: 10px;
        line-height: 12px;
        letter-spacing: -0.02em;
      }

      &__icon {
        width: 9px;
        height: 9px;
        margin: -1px 2px 0;
      }

      &__reviews {
        font-size: 8px;
        line-height: 12px;

        @include lt-md {
          display: block;
        }
      }

      &:after {
        top: -6px;
      }
    }

    & .title {
      font-family: $golos-regular;
      letter-spacing: -0.01em;
      padding: 6px 8px;

      @include gt-sm {
        font-size: 14px;
        line-height: 20px;
      }

      @include lt-md {
        font-size: 11px;
        line-height: 14px;
      }
    }

    & .content {
      padding: 0 8px 8px;
    }

    & .price {
      min-height: 28px;

      &__current {
        font-size: 14px;
        line-height: 16px;
        letter-spacing: -0.01em;
      }

      &__old {
        font-size: 11px;
        line-height: 12px;
        letter-spacing: 0.01em;
      }
    }
  }
}

.hint {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;

  &__icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }

  &__text {
    font-family: $golos-bold;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.01em;
    color: $color-dark-grey;
    margin-left: 5px;
  }

  &__icon,
  &__text {
    opacity: 0;
    transform: translateY(100%);
    transition: opacity 0.24s ease-out 0.03s, transform 0.24s ease-out 0.03s;
  }
}

.figure {
  z-index: 1;

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    transform: translate(-50%, -50%) scale(1);
    transition: opacity 0.24s, transform 0.24s;
  }
}

.title {
  position: relative;
  z-index: 2;
  color: $color-dark-grey;

  @include gt-sm {
    font-family: $golos-bold;
    font-size: 16px;
    line-height: 20px;
    padding: 10px 12px 8px;
  }

  @include lt-md {
    font-family: $golos-regular;
    font-size: 11px;
    line-height: 14px;
    padding: 6px 8px 0;
  }
}

.content {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  @include gt-sm {
    padding: 0 12px 12px;
  }

  @include lt-md {
    padding: 7px 8px 10px;
  }
}

.rating {
  display: inline-flex;
  align-items: center;
  position: absolute;
  transform: translateY(-50%);
  color: $color-white-grey;
  background: #fff;
  border-radius: 0 8px 0 0;

  @include gt-sm {
    min-height: 22px;
    box-sizing: border-box;
    padding: 3px 10px 3px 12px;
  }

  @include lt-md {
    padding: 4px 6px 4px 8px;
  }

  &__text {
    font-family: $golos-regular;
    letter-spacing: -0.01em;

    @include gt-sm {
      font-size: 11px;
    }

    @include lt-md {
      font-size: 10px;
      line-height: 12px;
    }

    &--color-green {
      color: $color-dark-green;
    }
  }

  &__icon {
    display: block;

    @include gt-sm {
      width: 13.32px;
      height: 12.66px;
      margin: 0 4px;
    }

    @include lt-md {
      width: 10px;
      height: 10px;
      margin-left: 2px;
    }
  }

  &__reviews {
    font-family: $golos-regular;

    @include gt-sm {
      font-size: 10px;
      line-height: 13px;
    }

    @include lt-md {
      display: none;
    }
  }

  &:after {
    content: '';
    display: block;
    width: 20px;
    height: 19px;
    position: absolute;
    right: -17px;
    clip: rect(11px, 10px, auto, auto);
    border: 3px solid #fff;
    box-sizing: border-box;
    border-radius: 50%;

    @include gt-sm {
      top: -5px;
    }

    @include lt-md {
      top: -6px;
    }
  }
}

.price {
  display: flex;
  flex-direction: column;
  justify-content: center;

  @include gt-sm {
    min-height: 44px;
  }

  @include lt-md {
    display: flex;
    flex-direction: column;
  }

  &__group {
    @include lt-md {
      order: 2;
    }
  }

  &__old {
    position: relative;
    font-family: $golos-regular;
    color: $color-white-grey;
    letter-spacing: 0.01em;

    @include gt-sm {
      font-size: 16px;
      line-height: 16px;
    }

    @include lt-md {
      font-size: 11px;
      line-height: 12px;
    }

    &:before,
    &:after {
      content: '';
      display: block;
      height: 1px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      transform: rotate(-10deg);
    }

    &:before {
      top: -1px;
      background: #fff;
    }

    &:after {
      background: #db1838;
    }
  }

  &__from {
    color: $color-white-grey;

    @include gt-sm {
      font-family: $golos-medium;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0;
      margin-right: 4px;
    }

    @include lt-md {
      font-family: $golos-regular;
      font-size: 11px;
      line-height: 14px;
      letter-spacing: -0.11px;
      margin-right: 2px;
    }
  }

  &__current {
    font-family: $golos-bold;

    @include gt-sm {
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0.03px;
    }

    @include lt-md {
      font-size: 14px;
      line-height: 16px;
      letter-spacing: -0.01em;
      margin-top: -1px;
    }
  }
}

.group {
  display: flex;

  @include gt-sm {
    align-items: center;
  }

  &__badge {
    @include gt-sm {
      margin-left: 8px;
    }

    @include lt-md {
      display: none;
    }
  }
}

.header {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;

  &__badge {
    @include gt-sm {
      //display: none;
    }

    @include lt-md {
      display: block;
    }
  }

  &__like {
    margin-left: auto;
  }
}
</style>
