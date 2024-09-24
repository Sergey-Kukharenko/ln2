<template>
  <div class="become-affiliate">
    <app-info-banner
      :background-color="$options.BECOME_AFFILIATE.backgroundColor"
      :background-image="$options.BECOME_AFFILIATE.backgroundImage"
      :title="$options.BECOME_AFFILIATE.title"
      :page="$route.name"
    />
    <become-affiliate-benefits />
    <become-affiliate-approval />
    <app-benefits :benefits="$options.BENEFITS" />
  </div>
</template>

<script>
import AppBenefits from '~/components/AppBenefits.vue';
import BecomeAffiliateApproval from '~/components/BecomeAffiliateApproval.vue';
import BecomeAffiliateBenefits from '~/components/BecomeAffiliateBenefits.vue';
import AppInfoBanner from '~/components/info/AppInfoBanner.vue';
import { BECOME_AFFILIATE } from '~/data/delivery';
import benefits from '~/mocks/benefits';

export default {
  name: 'BecomeAffiliatePage',

  components: {
    AppInfoBanner,
    AppBenefits,
    BecomeAffiliateBenefits,
    BecomeAffiliateApproval
  },

  BECOME_AFFILIATE,
  BENEFITS: benefits
};
</script>

<style lang="scss" scoped>
.become-affiliate {
  display: flex;
  flex-direction: column;

  @include gt-sm {
    gap: 56px;
  }

  @include lt-md {
    gap: 38px;
  }
}
</style>
