<template>
  <div class="seo-faq-list">
    <app-seo-faq-list-item v-for="(item, idx) in list" :key="idx" :item="item" />
  </div>
</template>

<script>
import AppSeoFaqListItem from '~/components/seo/AppSeoFaqListItem.vue';

export default {
  name: 'AppSeoFaqList',
  components: { AppSeoFaqListItem },

  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
.seo-faq-list {
  @include gt-sm {
    width: 620px;
    margin: -16px 0;
  }
}
</style>
