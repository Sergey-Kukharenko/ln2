<template>
  <div class="promotion-card" :style="{ backgroundImage: `url(${promotionImage})` }"></div>
</template>

<script>
export default {
  name: 'AppPromotionCard',

  props: {
    promotion: {
      type: Object,
      required: true
    }
  },

  computed: {
    promotionImage() {
      return this.$device.isMobileOrTablet ? this.promotion?.mobile : this.promotion?.image?.desktop;
    }
  }
};
</script>

<style></style>
