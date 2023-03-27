<template>
  <div class="wrapper">
    <div class="product">
      <nuxt-link :to="{ name: 'product-id', params: { id: slug } }" class="product__figure">
        <basket-product-image
          :url="useSizedImage({ name: image.filename, width: imgSize, height: imgSize })"
          class="product__figure-image"
        />
      </nuxt-link>
      <div class="product__info">
        <div class="product__info-price">
          <div>
            <div class="product__title">
              <!--Временно скрыт-->
              <basket-product-rating :value="rating" style="display: none" />
              <basket-product-title>{{ title }}</basket-product-title>
            </div>
            <basket-product-size :value="size" />
            <basket-product-color :value="color" />
            <basket-product-package :value="pack" />
          </div>
          <div class="product__price-main">
            <basket-product-price :price="price" :old-price="oldPrice" />
            <div class="product__items">
              <basket-product-count :count.sync="count" />
            </div>
          </div>
        </div>
        <div class="product__leaves-desktop">
          <basket-product-leaves v-if="leaves" v-model="leavesSwitch" />
        </div>
        <div class="product__favorite-count">
          <basket-product-favorite :id="id" :is-liked="isLiked" />
          <basket-product-count :count.sync="count" :is-loading="isLoading" />
        </div>
      </div>
    </div>
    <div class="product__leaves-mobile">
      <basket-product-leaves v-if="leaves" v-model="leavesSwitch" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { useSizedImage } from '~/helpers';
import gtmClear from '~/mixins/gtmClear.vue';
import { GTM_EVENTS_MAP } from '~/constants/gtm';

export default {
  name: 'BasketProduct',

  mixins: [gtmClear],

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

    oldPrice: {
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
    }
  },

  data() {
    return {
      leavesSwitch: false,
      imgSize: 508
    };
  },

  computed: {
    ...mapGetters(['isLoadingHttp']),

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
        newVal > this.count ? this.gtmAddToCartEvent(newVal) : this.gtmRemoveFromCartEvent(newVal);
      }
    },

    isLoading() {
      return this.isLoadingHttp(`/basket/${this.id}/${this.size}`);
    }
  },

  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart',
      removeFromCart: 'cart/removeFromCart'
    }),

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

    useSizedImage
  }
};
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
