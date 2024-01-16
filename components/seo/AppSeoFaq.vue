<template>
  <div class="seo-faq">
    <h2 class="seo-faq__title">FAQ</h2>

    <app-seo-faq-list :list="faq" />
  </div>
</template>

<script>
import AppSeoFaqList from '~/components/seo/AppSeoFaqList.vue';

export default {
  name: 'AppSeoFaq',
  components: { AppSeoFaqList },

  props: {
    faq: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
.seo-faq {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &__title {
    font-family: $Literata;
    font-weight: 700;
    color: $color-dark-grey;

    @include gt-sm {
      font-size: 28px;
      line-height: 32px;
      margin: 0;
    }

    @include lt-md {
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 16px;
    }
  }
}
</style>
