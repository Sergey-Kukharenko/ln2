<template>
  <div class="form">
    <div class="section">
      <div class="section__item item">
        <div class="item__header">
          <div class="item__header-number">1.</div>
          <div class="item__header-text">Choose roses colour:</div>
          <div class="item__header-content">{{ itemColor?.title }}</div>
        </div>
        <div class="item__body">
          <app-list :list="product.colors" :active-color="product.flowerColor" @setItem="onSetColor" />
        </div>
      </div>

      <!--Временно скрыт-->
      <!--      <div class="section__item item">-->
      <!--        <div class="item__header">-->
      <!--          <div class="item__header-number">2.</div>-->
      <!--          <div class="item__header-text">Number of {{ product.type_of_flowers }}:</div>-->
      <!--          <div class="item__header-content item__header-content&#45;&#45;wrapping">-->
      <!--            <app-counter :count.sync="count" />-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

      <div class="section__item item">
        <div class="item__header">
          <div class="item__header-number">2.</div>
          <div class="item__header-text item__header-text--tooltip">Type of roses</div>
          <!-- <div class="item__header-content" style="display: none">{{ itemFlowersHeight.number }} ft</div> -->
          <app-tooltip :icon="tooltip.icon" :content="tooltip.content" />
        </div>
        <div class="item__body">
          <app-list-types
            :list="product.heights"
            :has-size-query-param="hasSizeQueryParam"
            @setItem="onSetFlowersHeight"
          />
        </div>
      </div>

      <div class="section__item section__item--desktop-row item">
        <div class="item__header">
          <div class="item__header-number">3.</div>
          <div class="item__header-text">Number of roses:</div>
          <!-- <div class="item__header-content item__header-content--mobile-only">{{ itemNumberOfRoses }}</div> -->
        </div>
        <div class="item__body">
          <app-list-numbers
            :key="product.flowerCount"
            :list="product.prices"
            :active-number="product.flowerCount"
            @setNumber="onSetNumberOfRoses"
          />
        </div>
      </div>

      <!-- <div class="section__item item">
        <div class="item__header">
          <div class="item__header-number">4.</div>
          <div class="item__header-text">Choose package:</div>
          <div class="item__header-content">{{ itemPackage.title }}</div>
        </div>
        <div class="item__body">
          <app-list :list="product.packages" theme="advanced" @setItem="onSetPackage" />
        </div>
      </div> -->
    </div>

    <div class="form__footer">
      <div class="form__footer-price notranslate">
        <div class="price">
          <div class="price__current">{{ currentProductPriceWithSign }}</div>
          <div v-if="currentProductOldPriceWithSign" class="price__old">{{ currentProductOldPriceWithSign }}</div>
        </div>
        <!-- Временно скрыт -->
        <!-- <app-badges :badges="product.badges" /> -->
      </div>

      <div class="group-buttons">
        <div class="group-buttons__item">
          <app-button theme="green" :stretch="buttonSize" @click="addToCart"> Send now </app-button>
        </div>
        <!-- Временно скрыт -->
        <!-- <div class="group-buttons__item">
          <app-button theme="grey" @click="toggleLike">
            <svg-icon name="heart-outline" :class="classNames" />
          </app-button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import AppList from '@/components/card-product/AppList.vue';
import AppButton from '@/components/shared/AppButton.vue';
import { useToggleClassName } from '@/helpers';
import AppListNumbers from '~/components/card-product/AppListNumbers.vue';
import AppListTypes from '~/components/card-product/AppListTypes.vue';
import AppTooltip from '~/components/card-product/AppTooltip.vue';
import { CONSTRUCTOR_HEIGHT_COOKIE, CONSTRUCTOR_PACKAGE_COOKIE, PRODUCT_SIZE } from '~/constants';
import { GTM_EVENTS_MAP } from '~/constants/gtm';
import gtm from '~/mixins/gtm.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AppFormLists',

  components: {
    AppTooltip,
    AppListTypes,
    AppListNumbers,
    AppList,
    // AppCounter,
    // AppBadges,
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
      itemColor: null,
      itemFlowersHeight: this.getFlowersHeight(),
      itemNumberOfRoses: null,
      itemPackage: this.getFlowersPackage(),
      count: this.product?.count,
      like: this.product?.like,

      tooltip: this.product?.tooltip
    };
  },

  computed: {
    classNames() {
      return useToggleClassName(this.like, 'like', 'active');
    },

    currentProductPriceWithSign() {
      const packagePrice = this.itemPackage.price;
      const heightsPrice = this.currentProductVariant?.heights?.[this.itemFlowersHeight.id]?.price;
      const num = parseFloat(packagePrice + heightsPrice).toFixed(2);
      return `£${num}`;
    },

    currentProductOldPriceWithSign() {
      const oldPrice = this.currentProductVariant?.heights?.[this.itemFlowersHeight.id]?.old_price;

      if (!oldPrice) {
        return '';
      }

      return `£${oldPrice}`;
    },

    currentProductVariant() {
      return this.product.prices?.[this.itemNumberOfRoses]?.[this.itemColor.id];
    },

    buttonSize() {
      return this.$device.isMobile ? 'full' : 'fix';
    },

    hasSizeQueryParam() {
      return PRODUCT_SIZE.constructor.includes(this.$route.query.size);
    }
  },

  watch: {
    currentProductOldPriceWithSign: {
      handler(v) {
        this.$emit('update-discount', v.replace('£', ''));
      },
      immediate: true
    }
  },

  mounted() {
    this.initProductColor();
    this.initProductCount();
  },

  methods: {
    ...accessorMapper('product', ['SET_ACTIVE_COLOR', 'SET_ACTIVE_COUNT', 'SET_ACTIVE_TYPE', 'fetchCardProduct']),
    ...accessorMapper('cart', ['addToCartConstructor']),
    ...accessorMapper('favorites', ['addToFavorites', 'removeFromFavorites']),

    getFlowersPackage() {
      const packageCookieId = this.$cookies.get(CONSTRUCTOR_PACKAGE_COOKIE);
      const isFLowersPackageExist = !!packageCookieId;
      const [firstPackage] = this.product?.packages;

      if (!isFLowersPackageExist) {
        this.$cookies.set(CONSTRUCTOR_PACKAGE_COOKIE, firstPackage?.id);

        return firstPackage;
      }

      const idx = this.product?.packages.findIndex((el) => el.id === packageCookieId);

      return idx !== -1 ? this.product?.packages?.[idx] : firstPackage;
    },

    getFlowersHeight() {
      const queryParam = this.$route.query.size;
      const heightCookieId = this.hasSizeQueryParam ? queryParam : this.$cookies.get(CONSTRUCTOR_HEIGHT_COOKIE);
      const isFLowersHeightExist = !!heightCookieId;
      const [firstHeight] = this.product?.heights;

      if (!isFLowersHeightExist) {
        this.$cookies.set(CONSTRUCTOR_HEIGHT_COOKIE, firstHeight?.id);
        this.SET_ACTIVE_TYPE(firstHeight?.id);

        return firstHeight;
      }

      if (this.hasSizeQueryParam) {
        this.$cookies.set(CONSTRUCTOR_HEIGHT_COOKIE, queryParam);
      }

      const idx = this.product?.heights.findIndex((el) => el.id === heightCookieId);
      const result = idx !== -1 ? this.product?.heights?.[idx] : firstHeight;

      this.SET_ACTIVE_TYPE(result?.id);
      return result;
    },

    initProductColor() {
      try {
        const { colors = [] } = this.product;
        const isNotExistFlowerColor = !this.product?.flowerColor;

        if (isNotExistFlowerColor) {
          const [firstColor] = colors;
          this.itemColor = firstColor;
          this.SET_ACTIVE_COLOR(firstColor.id);

          return;
        }

        const idx = colors.findIndex((c) => c.id === this.product.flowerColor);
        const activeIdx = idx === -1 ? 0 : idx;
        const color = colors[activeIdx];

        this.itemColor = color;
        this.SET_ACTIVE_COLOR(color.id);
      } catch (error) {
        console.error(error);
      }
    },

    initProductCount() {
      try {
        const pricesKeys = Object.keys(this.product?.prices);
        const [priceKey] = pricesKeys;
        const isNotExistFlowerCount = !this.product?.flowerCount;

        if (isNotExistFlowerCount) {
          this.itemNumberOfRoses = priceKey;
          this.SET_ACTIVE_COLOR(priceKey);

          return;
        }

        const idx = pricesKeys.map(Number).indexOf(this.product.flowerCount);
        const activeIdx = idx === -1 ? 0 : idx;
        const itemKey = pricesKeys[activeIdx];

        this.itemNumberOfRoses = itemKey;
        this.SET_ACTIVE_COUNT(itemKey);
      } catch (error) {
        console.error(error);
      }
    },

    async goToProductByConstructor() {
      const path = this.currentProductVariant.uri;

      history.pushState(null, null, '/');
      history.pushState(null, null, path);
      await this.fetchCardProduct(path);
    },

    async onSetColor(payload) {
      this.itemColor = payload;
      this.SET_ACTIVE_COLOR(payload?.id);
      await this.$nextTick();
      this.goToProductByConstructor();
    },

    onSetFlowersHeight(payload) {
      this.itemFlowersHeight = payload;
      this.SET_ACTIVE_TYPE(payload?.id);
      this.$cookies.set(CONSTRUCTOR_HEIGHT_COOKIE, payload?.id);
    },

    async onSetNumberOfRoses(payload) {
      this.itemNumberOfRoses = payload;
      this.SET_ACTIVE_COUNT(payload);
      await this.$nextTick();
      this.goToProductByConstructor();
    },

    onSetPackage(payload) {
      this.itemPackage = payload;
      this.$cookies.set(CONSTRUCTOR_PACKAGE_COOKIE, payload?.id);
    },

    toggleLike() {
      this.like = !this.like;
    },

    addToCart() {
      const payload = {
        offer_id: this.currentProductVariant?.offer_id,
        constructor: {
          package: this.itemPackage.id,
          height: this.itemFlowersHeight.id
        }
      };

      this.addToCartConstructor(payload);

      this.gtmClearItemEvent();
      this.dataLayerSetOriginalUrl();
      this.gtmAddToCartEvent();

      this.$router.push({ name: 'gifts' });
    },

    gtmAddToCartEvent() {
      const item = {
        item_name: this.product.title,
        item_id: this.product.real_id,
        price: this.currentProductPriceWithSign,
        item_brand: 'myflowers',
        item_category: this.product.category_name,
        item_variant: this.itemFlowersHeight.title,
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
  &__title {
    @include gt-sm {
      margin-top: 8px;
    }

    @include lt-sm {
      margin-top: 22px;
    }
  }

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
    padding-bottom: 4px;
    margin: 26px 0 0;
  }

  &__item {
    @include gt-sm {
      margin: 18px 0;
    }

    @include lt-md {
      margin: 12px 0;

      &:last-child {
        margin-bottom: 8px;
      }
    }

    &--desktop-row {
      @include gt-sm {
        display: flex;
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

    &--tooltip {
      margin: 0 4px 0 7px;
    }
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

    &--mobile-only {
      @include gt-sm {
        display: none;
      }

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

  @include gt-sm {
    align-items: baseline;
  }

  @include lt-sm {
    align-items: center;
  }

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

    @include gt-sm {
      margin-left: 10px;
    }

    @include lt-sm {
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
}

.group-buttons {
  @include lt-md {
    width: 100%;
    margin: 8px 0;
  }

  &__item {
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
