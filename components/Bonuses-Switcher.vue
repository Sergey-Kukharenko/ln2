<template>
  <div class="bonuses-switcher">
    <app-item-switch
      v-model="value"
      background="grey"
      direction="reverse"
      justify-content="space-between"
      :disabled="isPromoCodeBonuses"
      @change="onChange"
    >
      <div class="content" :class="{ disabled: isPromoCodeBonuses }">
        Deduct
        <app-price-badge :price="getPrice" />
        bonuses
        <app-more-details />
      </div>
    </app-item-switch>
    <div class="after"></div>
  </div>
</template>

<script>
import Vue from 'vue';

import AppMoreDetails from '~/components/shared/AppMoreDetails.vue';
import AppPriceBadge from '~/components/shared/AppPriceBadge.vue';
import AppItemSwitch from '~/components/shared/switch/AppItemSwitch.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'BonusesSwitcher',
  components: { AppMoreDetails, AppPriceBadge, AppItemSwitch },

  layout: 'empty',

  data() {
    return {
      value: false
    };
  },

  computed: {
    ...accessorMapper('bonuses-local', ['isPromoCodeBonuses']),

    getAvailableBonuses() {
      return this.$accessor.checkout.getAvailableBonuses;
    },

    getPrice() {
      return '£ ' + this.getAvailableBonuses;
    }
  },

  methods: {
    ...accessorMapper('bonuses-local', ['deductBonuses']),

    onChange(value) {
      this.deductBonuses(value);
    }
  }
});
</script>

<style scoped lang="scss">
.bonuses-switcher {
  position: relative;
  margin-top: 12px;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  &.disabled {
    color: #ccc;
  }
}

.price {
}
</style>
