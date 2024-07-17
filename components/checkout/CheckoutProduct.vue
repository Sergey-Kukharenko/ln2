<template>
  <div class="product" :class="{ 'product--border': index !== 0 }">
    <nuxt-link
      :to="{ name: 'product-id', params: { id: productSlug } }"
      target="_blank"
      rel="noopener"
      class="product__figure"
      :class="{ 'product__figure--not-clickable': isGiftCart }"
    >
      <app-discount-badge
        v-if="isDiscountAvailable"
        :scale="badgeScale"
        :offset-top="badgeOffsetTop"
        :offset-left="badgeOffsetLeft"
      />

      <checkout-product-image
        :url="useSizedImage({ realId: realId, sizeName: imgSize, imgName: image.filename })"
        class="product__figure-image"
      />
    </nuxt-link>
    <div class="product__info">
      <div class="product__info-price">
        <div>
          <div class="product__title">
            <checkout-product-title>{{ title }}</checkout-product-title>
          </div>
          <checkout-product-size v-show="!isGiftCart && isBouquet" :value="size" />
        </div>
      </div>
      <div class="product__leaves-desktop">
        <basket-product-leaves v-if="leaves" v-model="leavesSwitch" />
      </div>
      <div class="product__favorite-count">
        <div class="product__price-main">
          <checkout-product-price :price="price" :old-price="oldPrice" />
        </div>
        <checkout-product-count :count.sync="count" />
      </div>
    </div>
  </div>
</template>

<script>
import BasketProductLeaves from '~/components/BasketProductLeaves.vue';
import CheckoutProductCount from '~/components/checkout/CheckoutProductCount.vue';
import CheckoutProductImage from '~/components/checkout/CheckoutProductImage.vue';
import CheckoutProductPrice from '~/components/checkout/CheckoutProductPrice.vue';
import CheckoutProductSize from '~/components/checkout/CheckoutProductSize.vue';
import CheckoutProductTitle from '~/components/checkout/CheckoutProductTitle.vue';
import { GIFT_CARD_POLICY_ID } from '~/constants';
import { IMG_SIZES_MAP } from '~/constants/image-sizes';
import { useSizedImage } from '~/helpers';
import gtm from '~/mixins/gtm.vue';

export default {
  name: 'CheckoutProduct',
  components: {
    CheckoutProductPrice,
    CheckoutProductCount,
    BasketProductLeaves,
    CheckoutProductSize,
    CheckoutProductTitle,
    CheckoutProductImage,

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

    index: {
      type: Number,
      default: 0
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
      leavesSwitch: false
    };
  },

  computed: {
    badgeScale() {
      return this.$device.isMobileOrTablet ? '0.35' : '0.38';
    },

    badgeOffsetTop() {
      return this.$device.isMobileOrTablet ? '-10' : '-8';
    },

    badgeOffsetLeft() {
      return this.$device.isMobileOrTablet ? '-24' : '-20';
    },

    isDiscountAvailable() {
      return Boolean(this.discount);
    },

    count() {
      return this.qty;
    },

    imgSize() {
      return this.$device.isMobileOrTablet ? IMG_SIZES_MAP.min : IMG_SIZES_MAP.size50;
    },

    productSlug() {
      return (
        this.slug ||
        this.title
          .split(' ')
          .map((el) => el?.toLowerCase())
          .join('-')
      );
    },

    isGiftCart() {
      return this.policyId === GIFT_CARD_POLICY_ID;
    }
  },

  methods: {
    useSizedImage
  },

  IMG_SIZES_MAP
};
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  flex-direction: row;
  padding: 24px 0;

  @include lt-lg {
    padding: 16px 0;
  }

  @include lt-md {
    padding: 8px 0;
  }

  &--border {
    border-top: 1px solid #dde0e6;
  }

  &__figure {
    position: relative;
    flex-shrink: 0;
    border-radius: 12px;
    overflow: hidden;

    @include gt-sm {
      width: 80px;
      height: 80px;
    }

    @include lt-md {
      width: 56px;
      height: 56px;
    }

    &:hover {
      .product__figure-image {
        transform: scale(1.1);
      }
    }

    &--not-clickable {
      pointer-events: none;
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
  }

  &__leaves-desktop {
    @include lt-lg {
      display: none;
    }
  }

  &__leaves-mobile {
    display: none;

    @include lt-lg {
      display: block;
    }
  }

  &__items {
    display: none;

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
