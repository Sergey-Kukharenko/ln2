<template>
  <div class="profile-section">
    <div class="head">
      <div class="title" :class="{ large: !preview }">{{ head.title }}</div>
      <nuxt-link v-if="preview" :to="head.view.to" class="link">{{ head.view.label }}</nuxt-link>
    </div>
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'ProfileSection',

  props: {
    head: {
      type: Object,
      default: () => ({})
    },

    preview: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    getLetter() {
      return this.name.charAt(0);
    }
  }
});
</script>

<style scoped lang="scss">
.profile-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.head {
  @include gt-sm {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  @include lt-md {
    margin-left: 36px;
  }
}

.title {
  font-family: $Literata;
  font-weight: 700;

  &:not(.large) {
    font-size: 24px;
    line-height: 28.8px;
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

.link {
  font-family: $golos-bold;
  font-size: 14px;
  line-height: 20px;
  color: $color-green;
}
</style>
