<template>
  <div class="youth-discount">
    <iframe
      v-show="wasClickedOnButton"
      frameborder="0"
      height="850px"
      id="ourframe"
      scrolling="no"
      src="https://www.youthdiscount.com/youth_id/gateway/f7e5ed8596fb710b7362260946985b41/embedded?default_country=GB"
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

const { student } = discountData;
const { banner, content } = student;

export default {
  name: 'YouthDiscount',
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
