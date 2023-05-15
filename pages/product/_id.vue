<template>
  <div class="layout layout-dt detail-page">
    <div class="detail-page__row">
      <div class="detail-page__col">
        <app-gallery :slides="images" />

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
        <h1 class="detail-page__title">{{ title }}</h1>
        <app-form-offers :product="getProduct" @setProductOffer="onSetProductOffer" />
        <app-service :description="description" />
      </div>
    </div>

    <div class="detail-page__section">
      <app-section v-if="isRecentlyViewed" :section="recentlyViewed" name="recently-viewed" />
    </div>
    <div class="detail-page__section">
      <app-popular-categories-items v-if="isPopularCategoriesItems" :popular="popularCategoriesItems" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { useObjectNotEmpty, useSizedImage } from '~/helpers';

import AppFormOffers from '~/components/product/AppFormOffers';
import AppService from '~/components/product/AppService';
import AppSection from '~/components/shared/AppSection.vue';
import AppPopularCategoriesItems from '~/components/card-product/AppPopularCategoriesItems';
import AppGallery from '~/components/ui/AppGallery';
import AppBadge from '~/components/shared/AppBadge';
import AppBadgeRateReviews from '~/components/shared/AppBadgeRateReviews';
import { GTM_EVENTS_MAP } from '~/constants/gtm';
import gtmClear from '~/mixins/gtmClear.vue';

export default {
  name: 'IdPage',

  components: {
    AppGallery,
    AppService,
    AppFormOffers,
    AppSection,
    AppPopularCategoriesItems,
    AppBadgeRateReviews,
    AppBadge
  },

  mixins: [gtmClear],

  middleware: ['not-found'],

  async asyncData({ req, route, $axios }) {
    const path = route.fullPath;
    const data = {
      seo: {},
      title: '',
      description: ''
    };

    try {
      const { data: response } = await $axios.$get(`${path}`);
      data.seo = response.seo;
      data.title = response.title;
      data.description = response.description;
      data.seo.fullUrl = `https://myflowers.co.uk${path}`;

      data.id = response.id;
      data.real_id = response.real_id;
      data.category_name = response.category_name;
      data.images = response.images;
      data.positions = response.positions;
      data.price = response.price;
      data.like = response.like;
      data.rating = +response.rating;
      data.reviews = response.reviews;
      data.sale = response.sale;
      data.position_name = response.position_name;
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
          content: useSizedImage({ name: this.images[0].filename, width: 120, height: 120 })
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
    ...mapGetters({
      // similarBouquets: 'pages/card-product/getSimilarBouquets',
      recentlyViewed: 'pages/card-product/getRecentlyViewed',
      popularCategoriesItems: 'pages/card-product/getPopularCategoriesItems'
    }),

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

      return {
        title,
        id,
        realId,
        images,
        positions,
        price,
        like,
        categoryName
      };
    }
  },

  mounted() {
    this.fetchCardProductPage();

    this.gtmClearItemEvent();
    this.gtmViewItemEvent(this.title, this.real_id, this.price, this.category_name, this.position_name);
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
  }
};
</script>

<style lang="scss" scoped>
.detail-page {
  @include gt-sm {
    padding-top: 20px;
  }

  @include lt-md {
    padding-top: 0;
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
