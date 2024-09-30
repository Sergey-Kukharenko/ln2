<template>
  <div class="about-page-wrapper">
    <div class="about">
      <!--Временно скрыт-->
      <!-- <app-info-banner
        :background-color="$options.PROMO.backgroundColor"
        :background-image="$options.PROMO.backgroundImage"
        :title="$options.PROMO.title"
        :text="$options.PROMO.text"
        :page="$route.name"
        has-buttons
      /> -->
      <!--Временно скрыт-->
      <!-- <about-page-links /> -->
      <app-info-text-section :content="$options.TEXT_INFO" />
      <!--Временно скрыт-->
      <!--<app-info-hero :items="$options.HERO_ITEMS" />-->
      <div class="split-line layout" />
      <about-advantages />
      <div class="split-line layout" />
      <about-something />
      <!--Временно скрыт-->
      <!--<about-reviews />-->
    </div>
    <app-benefits :benefits="$options.BENEFITS" />
  </div>
</template>

<script>
// import AppInfoBanner from '~/components/info/AppInfoBanner';
import AboutAdvantages from '~/components/AboutAdvantages.vue';
import AboutSomething from '~/components/AboutSomething.vue';
import AppBenefits from '~/components/AppBenefits.vue';
import AppInfoTextSection from '~/components/info/AppInfoTextSection.vue';
// import AppInfoHero from '~/components/info/AppInfoHero';
import { HERO_ITEMS, PROMO, TEXT_INFO } from '~/data/about';
import benefits from '~/mocks/benefits';

export default {
  name: 'AboutPage',

  components: {
    AppBenefits,
    AboutSomething,
    AboutAdvantages,
    // AppInfoBanner,
    AppInfoTextSection
    // AppInfoHero
  },

  PROMO,
  TEXT_INFO,
  HERO_ITEMS,
  BENEFITS: benefits,
  head() {
    return {
      title: 'About MyFlowers - Flower Shop MyFlowers',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'About MyFlowers - all useful information about the online flower shop in London (UK) MyFlowers'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;
  order: 3;

  @include gt-sm {
    gap: 56px;
    padding-bottom: 56px;
  }

  @include lt-md {
    gap: 20px;
    padding-bottom: 20px;
  }

  .split-line {
    height: 1px;
    max-width: 1080px;
    width: 100%;
    padding: 0;
    background: #cccccc;

    @include lt-md {
      width: calc(100% - 32px);
    }
  }
}
</style>
