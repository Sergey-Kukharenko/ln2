<template>
  <main>
    <app-location-informer v-if="$device.isMobileOrTablet" />
    <app-promotions />
    <app-popular-categories />

    <app-section v-if="isBestBouquets" :section="bestBouquets" name="best-sellers" />
    <app-section-sm v-if="isRecipient" :section="recipient" use-without-image-size name="recipient" />
    <app-section v-if="isSpecialOffers" :section="specialOffers" theme="custom" name="special-offers" />

    <!--Временно скрыт-->
    <!--<app-reviews />-->

    <app-section v-if="isUnderPounds" :section="underPounds" theme="custom" name="under-pounds" />
    <app-shop-by-price />
    <app-section v-if="isBaseRoses" :section="baseRoses" theme="custom" name="base-roses" />
    <app-section v-if="isTrendyBouquets" :section="trendyBouquets" theme="custom" name="trendy-bouquets" />
    <app-benefits />
    <app-section-sm v-if="isPickBouquet" :section="pickBouquet" name="pick-bouquet" theme="custom" />

    <!--Временно скрыт-->
    <!--<app-discount /> -->

    <app-faq />
    <app-info />
    <app-notice v-if="$device.isMobileOrTablet" />
  </main>
</template>

<script>
import { hydrateWhenIdle } from 'vue-lazy-hydration';

import { mapGetters } from 'vuex';
import { useArrayNotEmpty } from '~/helpers';
import gtmClear from '~/mixins/gtmClear.vue';

export default {
  name: 'IndexPage',

  components: {
    AppNotice: hydrateWhenIdle(() => import('@/components/shared/AppNotice')),
    AppSection: hydrateWhenIdle(() => import('@/components/shared/AppSection')),
    AppSectionSm: hydrateWhenIdle(() => import('@/components/shared/AppSectionSm'))
  },

  mixins: [gtmClear],

  async fetch() {
    await this.$store.dispatch('pages/home/fetchMainPageServerSide');
  },

  computed: {
    ...mapGetters({
      bestBouquets: 'pages/home/getBestBouquets',
      recipient: 'pages/home/getRecipient',
      specialOffers: 'pages/home/getSpecialOffers',
      underPounds: 'pages/home/getUnderPounds',
      baseRoses: 'pages/home/getBaseRoses',
      trendyBouquets: 'pages/home/getTrendyBouquets',
      pickBouquet: 'pages/home/getPickBouquet'
    }),

    isBestBouquets() {
      console.log(this.bestBouquets);
      return useArrayNotEmpty(this.bestBouquets?.list);
    },

    isRecipient() {
      return useArrayNotEmpty(this.recipient?.list);
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

    isTrendyBouquets() {
      return useArrayNotEmpty(this.trendyBouquets?.list);
    },

    isPickBouquet() {
      return useArrayNotEmpty(this.pickBouquet?.list);
    }
  },

  async mounted() {
    await this.$store.dispatch('pages/home/fetchMainPageClientSide');
  }
};
</script>

<style lang="scss" scoped>
main {
  @include lt-md {
    display: flex;
    flex-direction: column;

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

    .trendy-bouquets {
      order: 7;
    }

    .recipient,
    .reviews,
    .autumn-collection,
    .benefits,
    .pick-bouquet,
    .discount,
    .faq,
    .info {
      order: 8;
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
