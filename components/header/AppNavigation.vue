<template>
  <nav class="navigation">
    <div class="layout layout--horizontal-dt">
      <div class="navigation__group">
        <app-navigation-list :list="navigation?.main" />
        <div class="navigation__section">
          <app-navigation-list :list="navigation?.other" />
          <app-call class="navigation-link" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Vue from 'vue';

import AppCall from '@/components/header/AppCall.vue';
import AppNavigationList from '@/components/header/AppNavigationList.vue';

export default Vue.extend({
  name: 'AppNavigation',

  components: {
    AppCall,
    AppNavigationList
  },

  computed: {
    navigation() {
      return this.$accessor.layout.getNavigation;
    }
  }
});
</script>

<style lang="scss" scoped>
.navigation {
  @include gt-md {
    background: $bg-grey;
  }

  @include lt-md {
    order: 2;
    border-top: 1px solid #dde0e6;
  }

  &__group {
    @include gt-sm {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__section {
    @include gt-sm {
      display: flex;
      align-items: center;
    }
  }
}

.navigation-link {
  display: block;
  padding: 10px 0 10px 24px;
}
</style>
