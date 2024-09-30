<template>
  <div class="promocode">
    <app-promo-code @toggleGift="toggleGiftPanel" @hideGift="hideGiftPanel" />
    <app-promo-code-gift v-if="isVisible" :gift="gift" />
  </div>
</template>

<script>
import AppPromoCode from '~/components/AppPromoCode.vue';
import AppPromoCodeGift from '~/components/AppPromoCodeGift.vue';
import { useObjectNotEmpty } from '~/helpers';

export default {
  name: 'CheckoutPromoCode',
  components: { AppPromoCode, AppPromoCodeGift },

  data() {
    return {
      isVisible: false,
      gift: null
    };
  },

  methods: {
    toggleGiftPanel(gift) {
      if (useObjectNotEmpty(gift)) {
        this.isVisible = true;
        this.gift = gift;
      } else {
        this.hideGiftPanel();
      }
    },

    hideGiftPanel() {
      this.isVisible = false;
      this.gift = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.promocode {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}
</style>
