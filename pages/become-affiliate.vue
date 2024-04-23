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
  </div>
</template>

<script>
import BecomeAffiliateApproval from '~/components/BecomeAffiliateApproval.vue';
import BecomeAffiliateBenefits from '~/components/BecomeAffiliateBenefits.vue';
import AppInfoBanner from '~/components/info/AppInfoBanner.vue';
import { BECOME_AFFILIATE } from '~/data/delivery';

export default {
  name: 'BecomeAffiliatePage',

  components: {
    AppInfoBanner,
    BecomeAffiliateBenefits,
    BecomeAffiliateApproval
  },

  BECOME_AFFILIATE
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
