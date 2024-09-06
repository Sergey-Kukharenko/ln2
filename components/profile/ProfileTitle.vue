<template>
  <div class="profile-title" :class="{ large }">{{ title }}</div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'ProfileTitle',

  props: {
    title: {
      type: String,
      default: ''
    },

    large: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style scoped lang="scss">
.profile-title {
  font-family: $Literata;
  font-weight: 700;

  &:not(.large) {
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.01em;
  }

  &.large {
    @include gt-sm {
      font-size: 32px;
      line-height: 32px;
    }

    @include lt-md {
      font-size: 20px;
      line-height: 24px;
      letter-spacing: -0.01em;
    }
  }
}
</style>
