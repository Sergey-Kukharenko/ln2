<template>
  <div class="youth-discount">
    <iframe
      v-show="wasClickedOnButton"
      id="ourframe"
      frameborder="0"
      height="850px"
      scrolling="no"
      src="https://www.youthdiscount.com/youth_id/gateway/f7e5ed8596fb710b7362260946985b41/embedded?default_country=GB"
      style="overflow: hidden; display: block; border: none"
      width="100%"
    ></iframe>

    <div v-show="!wasClickedOnButton">
      <discount-banner :banner="banner" />
      <discount-content :content="content" @set-click="setClick" />
    </div>
    <app-benefits :benefits="$options.BENEFITS" />
  </div>
</template>

<script>
import AppBenefits from '~/components/AppBenefits.vue';
import DiscountBanner from '~/components/discount/discount-banner.vue';
import DiscountContent from '~/components/discount/discount-content.vue';
import discountData from '~/data/discount';
import benefits from '~/mocks/benefits';

const { student } = discountData;
const { banner, content } = student;

export default {
  name: 'YouthDiscount',
  components: { AppBenefits, DiscountContent, DiscountBanner },
  BENEFITS: benefits,
  data() {
    return {
      banner,
      content,
      wasClickedOnButton: false
    };
  },

  head() {
    return {
      script: [
        {
          src: 'https://assets.gocertify.me/assets/embed.js" data-location="/at/myflowers/student'
        }
      ]
    };
  },

  methods: {
    setClick() {
      this.wasClickedOnButton = true;
    }
  }
};
</script>
