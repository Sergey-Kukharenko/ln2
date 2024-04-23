<template>
  <div class="contact">
    <!--Временно скрыт-->
    <!-- <app-info-banner
      :background-color="$options.PROMO.backgroundColor"
      :background-image="$options.PROMO.backgroundImage"
      :title="$options.PROMO.title"
      :text="$options.PROMO.text"
      :page="$route.name"
      has-buttons
      />
    -->
    <!--Временно скрыт-->
    <!-- <app-info-text-section :content="$options.TEXT_INFO" />ß -->
    <!--Временно скрыт-->
    <!-- <div class="split-line layout" /> -->
    <app-info-something theme="extended" :content="$options.SOMETHING_IMPORTANT" />
    <div class="split-line layout" />
    <delivery-ad />
  </div>
</template>

<script>
// import AppInfoBanner from '~/components/info/AppInfoBanner';
// import AppInfoTextSection from '~/components/info/AppInfoTextSection';

import DeliveryAd from '~/components/DeliveryAd.vue';
import AppInfoSomething from '~/components/info/AppInfoSomething.vue';
import { PROMO, SOMETHING_IMPORTANT, TEXT_INFO } from '~/data/contact-us';

export default {
  name: 'ContactPage',

  components: {
    DeliveryAd,
    AppInfoSomething
    // AppInfoBanner,
    // AppInfoTextSection
  },

  PROMO,
  TEXT_INFO,
  SOMETHING_IMPORTANT
};
</script>

<style lang="scss" scoped>
.contact {
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
      width: calc(100% - 40px);
    }
  }
}
</style>
