<template>
  <main class="main-page" :class="mainPageModifiers">
    <!--Временно скрыт-->
    <!--<app-trustbox v-if="$device.isMobileOrTablet" class="trustbox" />-->
    <app-promotions :promotions="$options.PROMOTIONS" />
    <app-popular-categories :popular-categories="$options.POPULAR_CATEGORIES" />
    <app-section
      v-if="isConstructorBlockExist"
      :section="constructorBlock"
      name="constructor"
      theme="constructor"
      is-constructor
      has-from
    />
    <app-section
      v-if="isSpecialOffers"
      :section="getDataByDevice(specialOffers, 11)"
      theme="custom"
      name="special-offers"
    />
    <app-shop-by-price :shop-by-price="$options.SHOP_BY_PRICE" />
    <app-section v-if="isBaseRoses" :section="getDataByDevice(baseRoses)" theme="custom" name="base-roses" />
    <app-section v-if="isUnderPounds" :section="getDataByDevice(underPounds)" theme="custom" name="under-pounds" />
    <app-section-sm :section="$options.RECIPIENT" use-without-image-size name="recipient" />
    <app-section v-if="isNewBouquets" :section="getDataByDevice(newBouquets)" theme="custom" name="new-bouquets" />
    <app-section
      v-if="isLetterboxBouquets"
      :section="getDataByDevice(letterboxBouquets)"
      theme="custom"
      name="letterbox-bouquets"
    />
    <app-section
      v-if="isTrendyBouquets"
      :section="getDataByDevice(trendyBouquets)"
      theme="custom"
      name="trendy-bouquets"
    />
    <app-benefits :benefits="$options.BENEFITS" />
    <app-section-sm :section="$options.PICK_BOUQUET" name="pick-bouquet" theme="custom" />
    <app-faq :faq="$options.FAQ" />
    <app-info :info="$options.INFO" />
    <app-notice v-if="$device.isMobileOrTablet" />
    <app-seo :html="$options.INFO.seo.bottom_text" has-layout page-theme="home" />
  </main>
</template>

<script>
import Vue from 'vue';

import AppSectionSm from '@/components/shared/AppSectionSm.vue';
import AppBenefits from '~/components/AppBenefits.vue';
import AppFaq from '~/components/AppFaq.vue';
import AppInfo from '~/components/AppInfo.vue';
import AppPopularCategories from '~/components/AppPopularCategories.vue';
import AppPromotions from '~/components/AppPromotions.vue';
import AppShopByPrice from '~/components/AppShopByPrice.vue';
import AppSeo from '~/components/seo/AppSeo.vue';
import { useArrayNotEmpty, useDeepCopyObject } from '~/helpers';
import gtm from '~/mixins/gtm.vue';
import benefits from '~/mocks/benefits';
import faq from '~/mocks/faq';
import info from '~/mocks/info';
import pickBouquet from '~/mocks/pick-bouquet';
import popularCategories from '~/mocks/popular-categories';
import promotions from '~/mocks/promotions';
import recipient from '~/mocks/recipient';
import shopByPrice from '~/mocks/shop-by-price';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'IndexPage',

  components: {
    AppInfo,
    AppFaq,
    AppBenefits,
    AppShopByPrice,
    AppPopularCategories,
    AppPromotions,
    AppSeo,
    AppSectionSm,
    // AppTrustbox: () => import('~/components/ui/AppTrustbox.vue'),
    AppNotice: () => import('@/components/shared/AppNotice.vue'),
    AppSection: () => import('@/components/shared/AppSection.vue')
  },
  mixins: [gtm],

  PROMOTIONS: promotions,
  POPULAR_CATEGORIES: popularCategories,
  RECIPIENT: recipient,
  SHOP_BY_PRICE: shopByPrice,
  BENEFITS: benefits,
  PICK_BOUQUET: pickBouquet,
  FAQ: faq,
  INFO: info,

  async fetch() {
    try {
      await this.$accessor.home.fetchMainPageServerSide();
    } catch (error) {
      console.error(error);
    }
  },

  head() {
    return {
      title: this.seoTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.seoDescription
        }
      ]
    };
  },

  computed: {
    ...accessorMapper('home', [
      'specialOffers',
      'underPounds',
      'baseRoses',
      'newBouquets',
      'letterboxBouquets',
      'trendyBouquets',
      'constructorBlock'
    ]),

    isConstructorBlockExist() {
      return useArrayNotEmpty(this.constructorBlock);
    },

    isSpecialOffers() {
      return useArrayNotEmpty(this.specialOffers?.list);
    },

    isUnderPounds() {
      return useArrayNotEmpty(this.underPounds?.list);
    },

    isBaseRoses() {
      return useArrayNotEmpty(this.baseRoses?.list);
    },

    isNewBouquets() {
      return useArrayNotEmpty(this.newBouquets?.list);
    },

    isLetterboxBouquets() {
      return useArrayNotEmpty(this.letterboxBouquets?.list);
    },

    isTrendyBouquets() {
      return useArrayNotEmpty(this.trendyBouquets?.list);
    },

    seoTitle() {
      return info.seo?.title;
    },

    seoDescription() {
      return info.seo?.description;
    },

    mainPageModifiers() {
      const { query } = this.$route;
      const selectors = [];

      if (query.sort === 'regions') {
        selectors.push('main-page--regions-sort');
      } else {
        selectors.push('main-page--default-sort');
      }

      return selectors;
    }
  },

  methods: {
    getDataByDevice(obj, limit = 7) {
      const copyObj = useDeepCopyObject(obj);
      const list = copyObj?.list || [];
      const isAvailable = this.$device.isMobileOrTablet && list.length === limit;

      if (isAvailable) {
        list.pop();
      }

      return {
        ...copyObj,
        list
      };
    }
  }
});
</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  flex-direction: column;

  > * {
    width: 100%;
  }

  &--default-sort {
    @include lt-md {
      $selectors: (
        promotion,
        constructor,
        under-pounds,
        shop-by-price,
        letterbox-bouquets,
        special-offers,
        popular-categories,
        base-roses,
        new-bouquets,
        trendy-bouquets,
        recipient,
        benefits,
        pick-bouquet,
        faq,
        info,
        seo
      );

      @each $selector in $selectors {
        $i: index($selectors, $selector);
        .#{$selector} {
          order: $i;
        }
      }
    }
  }

  &--regions-sort {
    @include gt-sm {
      $selectors: (
        promotion,
        popular-categories,
        constructor,
        under-pounds,
        shop-by-price,
        letterbox-bouquets,
        special-offers,
        recipient,
        base-roses,
        new-bouquets,
        trendy-bouquets,
        benefits,
        pick-bouquet,
        faq,
        info,
        seo
      );

      @each $selector in $selectors {
        $i: index($selectors, $selector);
        .#{$selector} {
          order: $i;
        }
      }
    }

    @include lt-md {
      $selectors: (
        promotion,
        constructor,
        under-pounds,
        shop-by-price,
        letterbox-bouquets,
        special-offers,
        popular-categories,
        recipient,
        base-roses,
        new-bouquets,
        trendy-bouquets,
        benefits,
        pick-bouquet,
        faq,
        info,
        seo
      );

      @each $selector in $selectors {
        $i: index($selectors, $selector);
        .#{$selector} {
          order: $i;
        }
      }
    }
  }

  @include lt-md {
    .trustbox {
      margin: 12px auto;
    }
  }
}
</style>
