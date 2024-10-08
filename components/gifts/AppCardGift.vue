<template>
  <div class="card-gift">
    <div class="card-gift__figure">
      <app-image
        :path="useSizedImage({ realId: gift.real_id, sizeName: imgSize, imgName: gift.img })"
        :alt="gift.title"
        lazy
        class="card-gift__figure-image"
      />
    </div>
    <div class="card-gift__title">
      {{ gift.title }}
    </div>
    <div class="card-gift__content">
      <div class="card-gift__price">£ {{ gift.price }}</div>
      <cart-product-count
        v-if="isQty"
        :is-loading="isLoading"
        :count.sync="count"
        theme="turquoise"
        advanced-styles-theme="gift"
        :disable-increment="gift.is_free_gift"
        green-input
      />
      <app-button v-else theme="turquoise" size="xs" :stretch="changeableStretch" @click="onAddGift">Add</app-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import CartProductCount from '~/components/CartProductCount.vue';
import AppButton from '~/components/shared/AppButton.vue';
import AppImage from '~/components/shared/AppImage.vue';
import { IMG_SIZES_MAP } from '~/constants/image-sizes';
import { useSizedImage } from '~/helpers';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AppCardGift',

  components: { AppImage, AppButton, CartProductCount },

  props: {
    gift: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    changeableStretch() {
      return this.$device.isMobileOrTablet ? 'full' : 'fix';
    },

    isQty() {
      return this.count > 0;
    },

    count: {
      get() {
        return this.gift.count_in_basket;
      },

      async set(quantity) {
        const payload = {
          productId: this.gift.id,
          positionSlug: this.gift.position_name,
          quantity
        };

        const action = quantity > 0 ? 'addToCart' : 'removeFromCart';
        await this[action](payload);
        await this.fetchGifts();
      }
    },

    isLoading() {
      return this.$accessor.isLoadingHttp(`/v1/basket/${this.gift.id}/${this.gift.position_name}`);
    },

    imgSize() {
      return this.$device.isMobileOrTablet ? IMG_SIZES_MAP.size30 : IMG_SIZES_MAP.size60;
    }
  },

  methods: {
    useSizedImage,

    ...accessorMapper('cart', ['addToCart', 'removeFromCart']),
    ...accessorMapper('gifts', ['fetchGifts']),

    async onAddGift() {
      const payload = {
        productId: this.gift.id,
        positionSlug: this.gift.position_name
      };

      await this.addToCart(payload);
      await this.fetchGifts();
    }
  },

  IMG_SIZES_MAP
});
</script>

<style scoped lang="scss">
.card-gift {
  &__figure {
    display: block;
    width: 100%;
    padding-top: 100%;
    position: relative;
    background: $bg-grey;
    border-radius: 20px;
    overflow: hidden;
  }

  &__figure-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    mix-blend-mode: darken;
  }

  &__title {
    font-family: $golos-regular;
    letter-spacing: -0.02em;
    color: $color-dark-grey;

    @include gt-sm {
      font-size: 16px;
      line-height: 18px;
      margin: 12px 0 10px;
    }

    @include lt-sm {
      min-height: 32px;
      font-size: 12px;
      line-height: 16px;
      margin: 8px 0 4px;
    }
  }

  &__content {
    @include gt-sm {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__price {
    color: $color-dark-grey;

    @include gt-sm {
      font-family: $golos-bold;
      font-size: 18px;
      line-height: 22px;
      letter-spacing: -0.02em;
    }

    @include lt-sm {
      font-family: $golos-medium;
      font-size: 14px;
      line-height: 18px;
      letter-spacing: -0.01em;
      margin-bottom: 8px;
    }
  }
}
</style>
