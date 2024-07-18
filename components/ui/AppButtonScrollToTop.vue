<template>
  <button class="button-scroll-to-top" @click="scrollToTop">
    <svg-icon class="button-scroll-to-top__icon" name="arrow-up" />
  </button>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'AppButtonScrollToTop',

  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
});
</script>

<style scoped lang="scss">
.button-scroll-to-top {
  position: fixed;
  right: 32px;
  bottom: 100px;
  width: 56px;
  height: 56px;
  background: #f7f7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
  box-shadow: 0 1px 8px 0 #0000001a;

  &__icon {
    width: 30px;
    height: 30px;
  }
}
</style>
