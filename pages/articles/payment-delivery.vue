<template>
  <div class="delivery">
    <!--Временно скрыт-->
    <!-- <app-info-banner
      :background-color="$options.PROMO.backgroundColor"
      :background-image="$options.PROMO.backgroundImage"
      :title="$options.PROMO.title"
      :text="$options.PROMO.text"
      :page="$route.name"
    /> -->
    <app-info-text-section :content="$options.TEXT_INFO" />
    <app-info-hero :items="$options.HERO_ITEMS" />
    <delivery-payment />
    <div class="split-line layout" />
    <app-info-something :content="$options.SOMETHING_IMPORTANT" has-step />
    <!--Временно скрыт-->
    <!--<div class="split-line layout" />-->
    <!--<delivery-ad />-->
  </div>
</template>

<script>
// import AppInfoBanner from '~/components/info/AppInfoBanner';
import DeliveryPayment from '~/components/DeliveryPayment.vue';
import AppInfoHero from '~/components/info/AppInfoHero.vue';
import AppInfoSomething from '~/components/info/AppInfoSomething.vue';
import AppInfoTextSection from '~/components/info/AppInfoTextSection.vue';
import { HERO_ITEMS, PROMO, SOMETHING_IMPORTANT, TEXT_INFO } from '~/data/delivery';

export default {
  name: 'DeliveryPage',

  components: {
    DeliveryPayment,
    AppInfoSomething,
    // AppInfoBanner,
    AppInfoTextSection,
    AppInfoHero
  },

  PROMO,
  TEXT_INFO,
  HERO_ITEMS,
  SOMETHING_IMPORTANT
};
</script>

<style lang="scss" scoped>
.delivery {
  display: flex;
  flex-direction: column;
  order: 3;

  @include gt-sm {
    gap: 56px;
    padding-bottom: 56px;
    margin-top: -7px;
  }

  @include lt-md {
    gap: 20px;
  }

  .split-line {
    height: 1px;
    max-width: 1080px;
    width: 100%;
    padding: 0;
    background: #cccccc;

    @include lt-md {
      width: calc(100% - 40px);
    }
  }
}
</style>
