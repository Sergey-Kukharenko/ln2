<template>
  <main>
    <app-trustbox v-if="$device.isMobileOrTablet" class="trustbox" />
    <app-promotions :promotions="$options.PROMOTIONS" />
    <app-popular-categories :popular-categories="$options.POPULAR_CATEGORIES" />
    <app-section :section="$options.CONSTRUCTOR_BLOCK" name="constructor" theme="constructor" is-constructor has-from />
    <app-section-sm :section="$options.RECIPIENT" use-without-image-size name="recipient" />

    <app-section
      v-if="isSpecialOffers"
      :section="getDataByDevice(specialOffers)"
      theme="custom"
      name="special-offers"
    />
    <!--Временно скрыт-->
    <!--<app-reviews />-->

    <app-section v-if="isUnderPounds" :section="getDataByDevice(underPounds)" theme="custom" name="under-pounds" />
    <app-shop-by-price :shop-by-price="$options.SHOP_BY_PRICE" />
    <app-section v-if="isBaseRoses" :section="getDataByDevice(baseRoses)" theme="custom" name="base-roses" />
    <app-section v-if="isNewBouquets" :section="getDataByDevice(newBouquets)" theme="custom" name="new-bouquets" />
    <app-section
      v-if="isTrendyBouquets"
      :section="getDataByDevice(trendyBouquets)"
      theme="custom"
      name="trendy-bouquets"
    />

    <app-benefits :benefits="$options.BENEFITS" />
    <app-section-sm :section="$options.PICK_BOUQUET" name="pick-bouquet" theme="custom" />

    <!--Временно скрыт-->
    <!--<app-discount /> -->

    <app-faq :faq="$options.FAQ" />
    <app-info :info="$options.INFO" />
    <app-notice v-if="$device.isMobileOrTablet" />
    <app-seo :html="$options.INFO.seo.bottom_text" has-layout page-theme="home" />
  </main>
</template>

<script>
import { mapState } from 'vuex';
import { useArrayNotEmpty, useDeepCopyObject } from '~/helpers';
import gtm from '~/mixins/gtm.vue';
import AppSeo from '~/components/seo/AppSeo.vue';

import promotions from '~/mocks/promotions';
import popularCategories from '~/mocks/popular-categories';
import constructorBlock from '~/mocks/constructor-block';
import recipient from '~/mocks/recipient';
import shopByPrice from '~/mocks/shop-by-price';
import benefits from '~/mocks/benefits';
import pickBouquet from '~/mocks/pick-bouquet';
import faq from '~/mocks/faq';
import info from '~/mocks/info';
import AppPromotions from '~/components/AppPromotions.vue';
import AppPopularCategories from '~/components/AppPopularCategories.vue';
import AppShopByPrice from '~/components/AppShopByPrice.vue';
import AppBenefits from '~/components/AppBenefits.vue';
import AppFaq from '~/components/AppFaq.vue';
import AppInfo from '~/components/AppInfo.vue';

export default {
  name: 'IndexPage',

  components: {
    AppInfo,
    AppFaq,
    AppBenefits,
    AppShopByPrice,
    AppPopularCategories,
    AppPromotions,
    AppSeo,
    AppTrustbox: () => import('~/components/ui/AppTrustbox.vue'),
    AppNotice: () => import('@/components/shared/AppNotice'),
    AppSection: () => import('@/components/shared/AppSection'),
    AppSectionSm: () => import('@/components/shared/AppSectionSm')
  },

  mixins: [gtm],

  PROMOTIONS: promotions,
  POPULAR_CATEGORIES: popularCategories,
  CONSTRUCTOR_BLOCK: constructorBlock,
  RECIPIENT: recipient,
  SHOP_BY_PRICE: shopByPrice,
  BENEFITS: benefits,
  PICK_BOUQUET: pickBouquet,
  FAQ: faq,
  INFO: info,

  async fetch() {
    await this.$store.dispatch('pages/home/fetchMainPageServerSide');
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
    ...mapState('pages/home', ['specialOffers', 'underPounds', 'baseRoses', 'newBouquets', 'trendyBouquets']),

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

    isTrendyBouquets() {
      return useArrayNotEmpty(this.trendyBouquets?.list);
    },

    seoTitle() {
      return info.seo?.title;
    },

    seoDescription() {
      return info.seo?.description;
    }
  },

  methods: {
    getDataByDevice(obj) {
      const copyObj = useDeepCopyObject(obj);
      const PAGE_LIMIT = 7;
      const list = copyObj?.list || [];
      const isAvalible = this.$device.isMobileOrTablet && list.length === PAGE_LIMIT;

      if (isAvalible) {
        list.pop();
      }

      return {
        ...copyObj,
        list
      };
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  @include lt-md {
    display: flex;
    flex-direction: column;

    .trustbox {
      margin: 12px auto;
    }

    .promotion {
      order: 0;
    }

    .best-sellers {
      order: 1;
    }

    .shop-by-price {
      order: 2;
    }

    .special-offers {
      order: 3;
    }

    .base-roses {
      order: 4;
    }

    .popular-categories {
      order: 5;
    }

    .under-pounds {
      order: 6;
    }

    .new-bouquets {
      order: 7;
    }

    .trendy-bouquets {
      order: 8;
    }

    .recipient,
    .reviews,
    .autumn-collection,
    .benefits,
    .pick-bouquet,
    .discount,
    .faq,
    .info,
    .seo {
      order: 9;
    }
  }

  > section,
  > .layout {
    @include lt-md {
      width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
