<template>
  <footer>
    <app-footer-container />
    <app-footer-bottom />
  </footer>
</template>

<script>
import AppFooterBottom from '@/components/footer/AppFooterBottom.vue';
import AppFooterContainer from '@/components/footer/AppFooterContainer.vue';

export default {
  name: 'AppFooter',

  components: {
    AppFooterBottom,
    AppFooterContainer
  }
};
</script>

<style lang="scss" scoped>
footer {
  position: relative;
  z-index: 3;
  background: $bg-grey;

  @include xs {
    padding: 0 16px;
  }
}
</style>
