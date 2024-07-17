<template>
  <div>
    <div class="product">
      <component
        :is="componentTag"
        class="product__figure"
        :class="{ 'product__figure--not-clickable': isGiftCart }"
        v-bind="{
          ...(!isFree && { to: { name: 'product-id', params: { id: slug } } })
        }"
      >
        <app-discount-badge
          v-if="isDiscountAvailable"
          :scale="badgeScale"
          :offset-top="badgeOffsetTop"
          :offset-left="badgeOffsetLeft"
        />

        <basket-product-image
          :url="useSizedImage({ realId: realId, sizeName: imgSize, imgName: image.filename })"
          class="product__figure-image"
        />
      </component>
      <div class="product__info">
        <div class="product__info-price">
          <div>
            <div class="product__title">
              <!--Временно скрыт-->
              <basket-product-rating :value="rating" style="display: none" />
              <basket-product-title>{{ title }}</basket-product-title>
            </div>
            <basket-product-text v-if="isGiftCart" :value="giftCardText || ''" @edit="openEditModal" />
            <template v-else-if="isBouquet">
              <basket-product-size :value="size" />
              <basket-product-color :value="color" />
              <basket-product-package :value="pack" />
            </template>
          </div>
          <div class="product__price-main">
            <basket-product-price :price="price" :old-price="oldPrice" />
            <div class="product__items">
              <basket-product-remove v-if="isGiftCart" :count.sync="count" :is-loading="isLoading" />
              <basket-product-count v-else :disable-increment="isFree" :count.sync="count" />
            </div>
          </div>
        </div>
        <div class="product__leaves-desktop">
          <basket-product-leaves v-if="leaves" v-model="leavesSwitch" />
        </div>
        <div class="product__favorite-count">
          <template v-if="isGiftCart">
            <basket-product-edit @edit="openEditModal" />
            <basket-product-remove :count.sync="count" :is-loading="isLoading" />
          </template>
          <template v-else>
            <basket-product-favorite :id="id" :is-liked="isLiked" />
            <basket-product-count :disable-increment="isFree" :count.sync="count" :is-loading="isLoading" />
          </template>
        </div>
      </div>
    </div>
    <div class="product__leaves-mobile">
      <basket-product-leaves v-if="leaves" v-model="leavesSwitch" />
    </div>
    <gift-card-modal
      :product="{ ...$props }"
      :is-visible="isGiftCartModalVisible"
      @create="closeEditModal"
      @close-modal="closeEditModal"
    />
  </div>
</template>

<script>
import Vue from 'vue';

import BasketProductColor from '~/components/BasketProductColor.vue';
import BasketProductImage from '~/components/BasketProductImage.vue';
import BasketProductLeaves from '~/components/BasketProductLeaves.vue';
import BasketProductPackage from '~/components/BasketProductPackage.vue';
import BasketProductPrice from '~/components/BasketProductPrice.vue';
import BasketProductRating from '~/components/BasketProductRating.vue';
import BasketProductSize from '~/components/BasketProductSize.vue';
import BasketProductTitle from '~/components/BasketProductTitle.vue';
import { GIFT_CARD_POLICY_ID } from '~/constants';
import { GTM_EVENTS_MAP } from '~/constants/gtm';
import { IMG_SIZES_MAP } from '~/constants/image-sizes';
import { useSizedImage } from '~/helpers';
import gtm from '~/mixins/gtm.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'BasketProduct',
  components: {
    BasketProductFavorite: () => import('~/components/BasketProductFavorite.vue'),
    BasketProductLeaves,
    BasketProductCount: () => import('~/components/BasketProductCount.vue'),
    BasketProductPrice,
    BasketProductPackage,
    BasketProductColor,
    BasketProductSize,
    BasketProductTitle,
    BasketProductRating,
    BasketProductImage,
    BasketProductText: () => import('~/components/BasketProductText.vue'),
    BasketProductEdit: () => import('~/components/BasketProductEdit.vue'),
    BasketProductRemove: () => import('~/components/BasketProductRemove.vue'),
    GiftCardModal: () => import('~/components/giftcard/GiftCardModal.vue'),
    AppDiscountBadge: () => import('~/components/shared/AppDiscountBadge.vue')
  },

  mixins: [gtm],

  props: {
    id: {
      type: String,
      default: ''
    },

    slug: {
      type: String,
      default: ''
    },

    image: {
      type: Object,
      default: () => ({})
    },

    rating: {
      type: Number,
      default: 5
    },

    title: {
      type: String,
      default: ''
    },

    price: {
      type: String,
      default: ''
    },

    size: {
      type: String,
      default: ''
    },

    color: {
      type: String,
      default: ''
    },

    pack: {
      type: String,
      default: ''
    },

    leaves: {
      type: Boolean,
      default: false
    },

    qty: {
      type: Number,
      default: 1
    },

    isLiked: {
      type: Boolean,
      default: false
    },

    realId: {
      type: Number,
      default: 1
    },

    categoryName: {
      type: String,
      default: ''
    },

    giftCardText: {
      type: String,
      default: ''
    },

    policyId: {
      type: [String, Number],
      default: 0
    },

    isBouquet: {
      type: Boolean,
      default: false
    },

    oldPrice: {
      type: [String, null],
      default: null
    },

    discount: {
      type: [String, null],
      default: null
    }
  },

  data() {
    return {
      leavesSwitch: false,

      isGiftCartModalVisible: false
    };
  },

  computed: {
    isFree() {
      return Number(this.price) === 0;
    },

    componentTag() {
      return this.isFree ? 'div' : 'nuxt-link';
    },

    badgeScale() {
      return this.$device.isMobileOrTablet ? '0.38' : '0.85';
    },

    badgeOffsetTop() {
      return this.$device.isMobileOrTablet ? '-10' : '2';
    },

    badgeOffsetLeft() {
      return this.$device.isMobileOrTablet ? '-22' : '0';
    },

    isDiscountAvailable() {
      return Boolean(this.discount);
    },

    count: {
      get() {
        return this.qty;
      },

      set(newVal) {
        const payload = {
          productId: this.id,
          positionSlug: this.size
        };

        const action = newVal > this.count ? 'addToCart' : 'removeFromCart';
        this[action](payload);

        this.gtmClearItemEvent();
        this.dataLayerSetOriginalUrl();
        newVal > this.count ? this.gtmAddToCartEvent(newVal) : this.gtmRemoveFromCartEvent(newVal);
      }
    },

    isLoading() {
      return this.$accessor.isLoadingHttp(`/basket/${this.id}/${this.size}`);
    },

    imgSize() {
      return this.$device.isMobileOrTablet ? IMG_SIZES_MAP.size10 : IMG_SIZES_MAP.size50;
    },

    isGiftCart() {
      return this.policyId === GIFT_CARD_POLICY_ID;
    }
  },

  methods: {
    ...accessorMapper('cart', ['addToCart', 'removeFromCart']),

    gtmAddToCartEvent(actualCount) {
      this.$gtm.push({
        event: GTM_EVENTS_MAP.addToCart,
        ecommerce: {
          items: [
            {
              item_name: this.title,
              item_id: this.realId,
              price: this.price * actualCount,
              item_brand: 'myflowers',
              item_category: this.categoryName,
              item_variant: this.size,
              quantity: actualCount
            }
          ]
        }
      });
    },

    gtmRemoveFromCartEvent(actualCount) {
      this.$gtm.push({
        event: GTM_EVENTS_MAP.removeFromCart,
        ecommerce: {
          items: [
            {
              item_name: this.title,
              item_id: this.realId,
              price: this.price * actualCount,
              item_brand: 'myflowers',
              item_category: this.categoryName,
              item_variant: this.size,
              quantity: actualCount
            }
          ]
        }
      });
    },

    openEditModal() {
      this.isGiftCartModalVisible = true;
    },

    closeEditModal() {
      this.isGiftCartModalVisible = false;
    },

    useSizedImage
  },

  IMG_SIZES_MAP
});
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  flex-direction: row;
  border-top: 1px solid #dde0e6;
  padding: 24px 0;

  @include lt-lg {
    padding: 16px 0;
  }

  &__figure {
    position: relative;
    flex-shrink: 0;
    border-radius: 12px;
    overflow: hidden;

    @include gt-sm {
      width: 140px;
      height: 140px;
    }

    @include lt-md {
      width: 64px;
      height: 64px;
    }

    &:hover {
      .product__figure-image {
        transform: scale(1.1);
      }
    }

    &--not-clickable {
      pointer-events: none;

      & .image {
        background-size: 75%;
        background-position: bottom;
        background-color: #f7f7f7;
      }
    }
  }

  &__figure-image {
    transition: transform 0.24s;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    @include gt-md {
      margin-left: 24px;
    }

    @include lt-lg {
      margin-left: 8px;
    }
  }

  &__info-price {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    @include lt-lg {
      flex-direction: column;
      justify-content: flex-start;
    }
  }

  &__title {
    display: flex;
    flex-direction: column;

    @include lt-lg {
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      width: 100%;
    }
  }

  &__price-main {
    @include lt-lg {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 8px;
    }
  }

  &__favorite-count {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @include lt-lg {
      display: none;
    }
  }

  &__leaves-desktop {
    @include lt-lg {
      display: none;
    }
  }

  &__leaves-mobile {
    @include gt-md {
      display: none;
    }

    @include lt-lg {
      display: block;
    }
  }

  &__items {
    @include gt-md {
      display: none;
    }

    @include lt-lg {
      display: block;
    }
  }

  &__item-icon {
    width: 10px;
    height: 6px;
  }
}
</style>
