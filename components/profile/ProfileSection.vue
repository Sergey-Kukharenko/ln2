<template>
  <div class="profile-section">
    <div class="head">
      <profile-title :title="head.title" :large="!preview" />
      <nuxt-link v-if="preview" :to="head.view.to" class="link">{{ head.view.label }}</nuxt-link>
    </div>
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileTitle from '~/components/profile/ProfileTitle.vue';

export default Vue.extend({
  name: 'ProfileSection',
  components: { ProfileTitle },

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
}

.link {
  font-family: $golos-bold;
  font-size: 14px;
  line-height: 20px;
  color: $color-green;
}
</style>
