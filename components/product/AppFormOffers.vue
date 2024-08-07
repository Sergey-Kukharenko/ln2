<template>
  <div class="form">
    <div class="section">
      <div class="section__item item">
        <div class="item__header">Choose bouquet size</div>
        <div class="item__body item__body--sm-include-border">
          <app-offers :offers="product.positions" @setOffer="onSetOffer" />
          <app-offer-detail :list="offer?.items" />
        </div>
      </div>
    </div>

    <div class="form__footer">
      <div class="form__footer-price">
        <div class="price">
          <div v-if="offer?.price" class="price__current">{{ priceWithSign }}</div>
          <div v-if="isOldPriceExist" class="price__old">{{ oldPriceWithSign }}</div>
        </div>
        <app-badges v-if="product.badges" :badges="product.badges" />
      </div>

      <div class="group-buttons">
        <div class="group-buttons__item">
          <app-button theme="green" :stretch="changeableStretch" @click="onAddToCart">Send now</app-button>
        </div>
        <!--Временно скрыт-->
        <!--<div class="group-buttons__item">-->
        <!--  <app-button theme="grey" @click="toggleLike">-->
        <!--  <app-like-icon :like="like" theme="outline" size="not-change" />-->
        <!--  </app-button>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import AppOfferDetail from '@/components/product/AppOfferDetail.vue';
import AppOffers from '@/components/product/AppOffers.vue';
import AppBadges from '@/components/shared/AppBadges.vue';
import AppButton from '@/components/shared/AppButton.vue';
// import ToastCardDeals from '@/components/toast-cards/ToastCardDeals';
// import AppLikeIcon from '~/components/shared/AppLikeIcon';
import { GTM_EVENTS_MAP } from '~/constants/gtm';
import gtm from '~/mixins/gtm.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AppFormOffers',

  components: {
    // Временно скрыт
    // AppLikeIcon,
    AppOfferDetail,
    AppOffers,
    AppBadges,
    AppButton
  },

  mixins: [gtm],

  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      offer: this.product?.positions?.[0],
      like: this.product?.like
    };
  },

  computed: {
    changeableStretch() {
      return this.$device.isMobileOrTablet ? 'full' : 'fix';
    },

    isOldPriceExist() {
      return Boolean(this.offer.old_price || this.offer.price?.old);
    },

    priceWithSign() {
      return `£ ${this.offer.price}`;
    },

    oldPriceWithSign() {
      return `£ ${this.offer.old_price || this.offer.price.old}`;
    }
  },

  mounted() {
    // Временно скрыт
    // const content = {
    //   component: ToastCardDeals,
    //   props: {
    //     icon: {
    //       name: 'lightning',
    //       size: { width: 28, height: 28 }
    //     },
    //     title: 'Great product!',
    //     text: '943 people have bought this product in the last 7 days'
    //   }
    // };
    //
    // const options = {
    //   timeout: 3000,
    //   icon: false,
    //   closeButton: false,
    //   position: 'bottom-left',
    //   class: ['toast', 'toast--width-md', 'toast--theme-dark']
    // };
    //
    // this.$toast(content, options);
  },

  methods: {
    ...accessorMapper('cart', ['addToCart']),
    ...accessorMapper('favorites', ['addToFavorites', 'removeFromFavorites']),

    onSetOffer(payload) {
      this.offer = payload;
      this.$emit('setProductOffer', payload);
    },

    toggleLike() {
      const action = this.like ? 'removeFromFavorites' : 'addToFavorites';
      this[action](this.product.id);

      this.like = !this.like;
    },

    onAddToCart() {
      const payload = {
        productId: this.product.id,
        positionSlug: this.offer.title
      };

      this.addToCart(payload);

      this.gtmClearItemEvent();
      this.dataLayerSetOriginalUrl();
      this.gtmAddToCartEvent();

      this.$router.push({ name: 'gifts' });
    },

    gtmAddToCartEvent() {
      const item = {
        item_name: this.product.title,
        item_id: this.product.realId,
        price: this.product.price,
        item_brand: 'myflowers',
        item_category: this.product.categoryName,
        item_variant: this.offer.title,
        quantity: 1
      };

      this.$gtm.push({
        event: GTM_EVENTS_MAP.addToCart,
        ecommerce: {
          items: [item]
        }
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.form {
  &__footer {
    @include gt-sm {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 28px 0;
    }

    @include lt-md {
      padding: 20px 0;
    }
  }

  &__footer-price {
    margin-top: -4px;

    @include lt-md {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}

.section {
  border-bottom: 1px solid #eaeaea;

  @include gt-sm {
    padding-bottom: 12px;
    margin: 26px 0 0;
  }

  &__item {
    @include gt-sm {
      margin: 16px 0;
    }

    @include lt-md {
      margin: 12px 0;

      &:last-child {
        margin-bottom: 8px;
      }
    }
  }
}

.item {
  &__header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-family: $golos-regular;

    @include gt-sm {
      font-size: 15px;
      line-height: 24px;
    }

    @include lt-md {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.01em;
    }
  }

  &__header-number {
    margin: 0;
  }

  &__header-text {
    margin: 0 9px 0 7px;
  }

  &__header-content {
    color: $color-white-grey;

    @include gt-sm {
      margin: 0;
    }

    &--wrapping {
      @include lt-md {
        display: flex;
        width: 100%;
        margin: 11px 0 6px 0;
      }
    }
  }

  &__body {
    @include lt-sm {
      margin: 3px -14px;
      overflow: hidden;
    }

    &--sm-include-border {
      @include lt-sm {
        margin: 3px 0;
      }
    }
  }
}

.price {
  flex-shrink: 0;
  display: flex;
  align-items: baseline;

  &__current {
    color: #000000;

    @include gt-sm {
      font-family: $golos-medium;
      font-size: 40px;
      line-height: 48px;
    }

    @include lt-md {
      font-family: $golos-bold;
      font-size: 32px;
      line-height: 40px;
    }
  }

  &__old {
    position: relative;
    font-family: $golos-regular;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.01em;
    color: $color-white-grey;

    @include gt-md {
      margin-left: 10px;
    }

    @include lt-md {
      margin: 0 0 -8px 6px;
    }

    &:before,
    &:after {
      content: '';
      display: block;
      height: 1px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: -2px;
      right: -2px;
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
}

.group-buttons {
  display: flex;

  @include lt-md {
    margin: 8px 0;
  }

  &__item {
    &:first-child {
      @include lt-md {
        flex: 1;
      }
    }

    &:not(:first-child) {
      margin-left: 8px;
    }
  }
}

.like {
  display: block;
  width: 20px;
  height: 18.5px;
  fill: transparent;
  stroke: $color-grey;
  transition: fill 0.2s ease-out 0s, stroke 0.2s ease-out 0s;

  &--active {
    fill: $color-grey;
    stroke: $color-grey;
  }
}
</style>
