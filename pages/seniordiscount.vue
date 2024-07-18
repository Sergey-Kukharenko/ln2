<template>
  <div class="senior-discount">
    <iframe
      v-show="wasClickedOnButton"
      frameborder="0"
      height="850px"
      id="ourframe"
      scrolling="no"
      src="https://senior.discount/senior_id/gateway/45f1c85bb35cf6496804e871bc37d03b/embedded?default_country=GB"
      style="overflow: hidden; display: block; border: none"
      width="100%"
    ></iframe>
    <div v-show="!wasClickedOnButton">
      <discount-banner :banner="banner" />
      <discount-content :content="content" @set-click="setClick" />
    </div>
  </div>
</template>

<script>
import DiscountBanner from '~/components/discount/discount-banner.vue';
import DiscountContent from '~/components/discount/discount-content.vue';
import discountData from '~/data/discount';

const { senior } = discountData;
const { banner, content } = senior;

export default {
  name: 'SeniorDiscount',
  components: { DiscountContent, DiscountBanner },

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
