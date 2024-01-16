<template>
  <div class="layout layout-dt detail-page">
    <div class="detail-page__row">
      <div class="detail-page__col">
        <app-gallery :slides="sliderImages" :type-name="type_name" />

        <div class="additional-group" style="display: none">
          <div v-if="sale" class="additional-group__item">
            <app-badge theme="red" size="md"> Sale - 30% </app-badge>
          </div>
          <div v-if="rating" class="additional-group__item">
            <app-badge-rate-reviews :rating="rating" :stars="1" :reviews="reviews" :options="{ theme: 'full' }" />
          </div>
        </div>
      </div>
      <div class="detail-page__col">
        <h1 class="detail-page__title">{{ getProductTitle }}</h1>
        <app-form-offers v-if="!isListsPage" :product="getProduct" @setProductOffer="onSetProductOffer" />
        <keep-alive v-else>
          <app-form-lists :product="cardProductSettings" />
        </keep-alive>
        <app-service :description="getProductDescription" />
      </div>
    </div>

    <div class="detail-page__section">
      <app-section v-if="isRecentlyViewed" :section="recentlyViewed" name="recently-viewed" />
    </div>
    <div class="detail-page__section">
      <app-popular-categories-items v-if="isPopularCategoriesItems" :popular="popularCategoriesItems" />
    </div>
    <app-seo v-if="seoHtml" :html="seoHtml" :faq="faq" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { useObjectNotEmpty, useSizedImage } from '~/helpers';

import AppFormOffers from '~/components/product/AppFormOffers';
import AppFormLists from '~/components/card-product/AppFormLists';
import AppService from '~/components/product/AppService';
import AppSection from '~/components/shared/AppSection.vue';
import AppPopularCategoriesItems from '~/components/card-product/AppPopularCategoriesItems';
import AppGallery from '~/components/ui/AppGallery';
import AppBadge from '~/components/shared/AppBadge';
import AppBadgeRateReviews from '~/components/shared/AppBadgeRateReviews';
import { CONSTRUCTOR_HEIGHT_COOKIE, CONSTRUCTOR_PACKAGE_COOKIE } from '~/constants';
import { GTM_EVENTS_MAP } from '~/constants/gtm';
import gtm from '~/mixins/gtm.vue';
import AppSeo from '~/components/seo/AppSeo.vue';
import { IMG_SIZES_MAP } from '~/constants/image-sizes';

export default {
  name: 'IdPage',

  components: {
    AppSeo,
    AppGallery,
    AppService,
    AppFormOffers,
    AppSection,
    AppPopularCategoriesItems,
    AppBadgeRateReviews,
    AppBadge,
    AppFormLists
  },

  mixins: [gtm],

  middleware: ['not-found'],

  async asyncData({ req, route, $http, store }) {
    const path = route.fullPath;
    let data = {
      seo: {},
      title: '',
      description: ''
    };

    try {
      const { data: response } = await $http.$get(`v1${path}`);

      if (response?.settings) {
        store.commit('pages/card-product/setProductSettings', response);
      }

      data.seo.fullUrl = `https://myflowers.co.uk${path}`;
      data.sale = response.sale;
      data = {
        ...data,
        ...response,
        ...(!response?.settings && {
          images: response?.images.map((item) => ({ ...item, real_id: response.real_id }))
        }),
        rating: parseFloat(data?.rating ?? 0),
        seoHtml: response.seo.bottom_text
      };

      return data;
    } catch (error) {
      console.error(error);
    }

    return data;
  },

  head() {
    return {
      title: this.seo.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.seo.description
        },

        {
          property: 'og:title',
          content: this.seo.title
        },
        {
          property: 'og:description',
          content: this.seo.description
        },
        {
          property: 'og:url',
          content: this.seo.fullUrl
        },
        {
          property: 'og:image',
          content: useSizedImage({
            realId: this.real_id,
            sizeName: IMG_SIZES_MAP.size10,
            imgName: this.images?.[0].filename
          })
        },
        {
          property: 'product:brand',
          content: 'myflowers'
        },
        {
          property: 'product:availability',
          content: 'in stock'
        },
        {
          property: 'product:condition',
          content: 'new'
        },
        {
          property: 'product:price:amount',
          content: this.price
        },
        {
          property: 'product:price:currency',
          content: 'GBP'
        },
        {
          property: 'product:retailer_item_id',
          content: this.real_id
        },
        {
          property: 'product:item_group_id',
          content: this.category_name
        }
      ]
    };
  },

  computed: {
    ...mapState('pages/card-product', [
      'cardProductSettings',
      'cardConstructorActiveColor',
      'cardConstructorActiveCount',
      'cardConstructorActiveType'
    ]),

    ...mapGetters({
      // similarBouquets: 'pages/card-product/getSimilarBouquets',
      recentlyViewed: 'pages/card-product/getRecentlyViewed',
      popularCategoriesItems: 'pages/card-product/getPopularCategoriesItems'
    }),

    isListsPage() {
      return !!this.cardProductSettings?.colors?.length;
    },

    getProductDescription() {
      return this.isListsPage ? this.cardProductSettings?.description : this.description;
    },

    getProductTitle() {
      return this.isListsPage ? this.cardProductSettings?.title : this.title;
    },

    constructorSliderImages() {
      const currentPosition =
        this.cardProductSettings?.prices?.[this.cardConstructorActiveCount]?.[this.cardConstructorActiveColor]
          ?.heights?.[this.cardConstructorActiveType];
      return currentPosition?.images?.map((image) => ({ ...image, real_id: this.constructorRealId }));
    },

    sliderImages() {
      return this.isListsPage ? this.constructorSliderImages : this.images;
    },

    constructorRealId() {
      return this.cardProductSettings?.prices?.[this.cardConstructorActiveCount]?.[this.cardConstructorActiveColor]
        ?.real_id;
    },

    // isSimilarBouquets() {
    //   return useObjectNotEmpty(this.similarBouquets);
    // },

    isRecentlyViewed() {
      return useObjectNotEmpty(this.recentlyViewed);
    },

    isPopularCategoriesItems() {
      return useObjectNotEmpty(this.popularCategoriesItems);
    },

    getProduct() {
      const title = this.title;
      const id = this.id;
      const realId = this.real_id;
      const images = this.images;
      const positions = this.positions;
      const price = this.price;
      const like = this.like;
      const categoryName = this.category_name;

      const seoHtml = this.seoHtml;
      const faq = this.faq;

      return {
        title,
        id,
        realId,
        images,
        positions,
        price,
        like,
        categoryName,
        seoHtml,
        faq
      };
    }
  },

  mounted() {
    this.fetchCardProductPage();

    this.gtmClearItemEvent();
    this.dataLayerSetOriginalUrl();
    this.gtmViewItemEvent(this.title, this.real_id, this.price, this.category_name, this.position_name);
  },

  beforeDestroy() {
    this.$store.commit('pages/card-product/setField', { name: 'cardProductSettings', value: {} });
    this.$cookies.remove(CONSTRUCTOR_HEIGHT_COOKIE);
    this.$cookies.remove(CONSTRUCTOR_PACKAGE_COOKIE);
  },

  methods: {
    ...mapActions({ fetchCardProductPage: 'pages/card-product/fetchCardProductPage' }),

    gtmViewItemEvent(title, realId, price, categoryName, positionName) {
      const item = {
        item_name: title,
        item_id: realId,
        price,
        item_brand: 'myflowers',
        item_category: categoryName,
        item_variant: positionName
      };

      this.$gtm.push({
        event: GTM_EVENTS_MAP.viewItem,
        ecommerce: {
          items: [item]
        }
      });
    },

    onSetProductOffer({ title, price }) {
      this.gtmClearItemEvent();
      this.gtmViewItemEvent(this.title, this.real_id, price, this.category_name, title);
    },

    useSizedImage
  },

  IMG_SIZES_MAP
};
</script>

<style lang="scss" scoped>
.detail-page {
  @include gt-sm {
    padding-top: 20px;
  }

  @include lt-md {
    padding-top: 0;
    overflow: hidden;
  }

  &__row {
    @include gt-sm {
      display: flex;
    }
  }

  &__col {
    position: relative;
    box-sizing: border-box;

    @include gt-sm {
      width: 50%;

      &:first-child {
        padding-right: 12px;
      }

      &:last-child {
        padding-left: 12px;
      }
    }
  }

  &__title {
    @include gt-sm {
      margin-top: 8px;
    }

    @include lt-sm {
      margin-top: 22px;
    }
  }

  &__section {
    @include gt-sm {
      margin: 76px 0;
    }

    @include lt-md {
      margin: 40px 0;
    }
  }
}

.about {
  &__title {
    @include gt-sm {
      margin: 0 0 16px 0;
    }
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__reviews {
    @include gt-sm {
      flex: 0 0 620px;
    }

    @include lt-md {
      order: 1;
    }
  }

  &__rating {
    @include gt-sm {
      flex: 0 0 344px;
    }

    @include lt-md {
      width: 100%;
    }
  }

  &__text {
    font-family: $golos-bold;
    font-size: 16px;
    line-height: 20px;
    color: #000;
    margin-right: 10px;
  }
}

.additional-group {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  z-index: 3;
  top: 0;
  padding: 16px;

  &__item {
    &:not(:last-child) {
      margin-right: 6px;
    }
  }
}
</style>
