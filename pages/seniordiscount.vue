<template>
  <div class="senior-discount">
    <iframe
      v-show="wasClickedOnButton"
      id="ourframe"
      frameborder="0"
      height="850px"
      scrolling="no"
      src="https://senior.discount/senior_id/gateway/45f1c85bb35cf6496804e871bc37d03b/embedded?default_country=GB"
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

const { senior } = discountData;
const { banner, content } = senior;

export default {
  name: 'SeniorDiscount',
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
          src: 'https://assets.gocertify.me/assets/embed.js" data-location="/at/myflowers/key-worker'
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
