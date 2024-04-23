<template>
  <div class="senior-discount">
    <discount-banner :banner="banner" />
    <discount-content :content="content" />
  </div>
</template>

<script>
import DiscountBanner from '~/components/discount/discount-banner.vue';
import DiscountContent from '~/components/discount/discount-content.vue';
import discountData from '~/data/discount';

const { student } = discountData;
const { banner, content } = student;

export default {
  name: 'SeniorDiscount',
  components: { DiscountContent, DiscountBanner },
  layout: 'empty',

  data() {
    return {
      banner,
      content
    };
  }
};
</script>
