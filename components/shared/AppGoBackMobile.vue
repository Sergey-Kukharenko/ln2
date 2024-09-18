<template>
  <div class="back" @click="goBack">
    <svg-icon class="back__icon" name="arrow-green" />
  </div>
</template>

<script>
export default {
  name: 'AppGoBackMobile',

  props: {
    hasStep: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    goBack() {
      if (this.hasStep) {
        this.$emit('change-step');
        return;
      }

      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.back {
  @include gt-sm {
    display: none;
  }

  @include lt-md {
    &__icon {
      width: 16px;
      height: 15.54px;
      user-select: none;
    }
  }
}
</style>
