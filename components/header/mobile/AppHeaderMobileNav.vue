<template>
  <div class="list nested-group" @click="closeMenu">
    <nuxt-link
      v-for="(item, idx) in navigationList"
      :key="idx"
      :to="{ name: `articles-${item.slug}` }"
      class="list__item"
    >
      {{ item.title }}
      <!-- <span v-if="item.count" class="count">
        {{ item.count }}
      </span> -->
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AppHeaderMobileNav',

  inject: ['closeMenu'],

  computed: {
    ...mapGetters({ navigation: 'layout/getNavigation' }),

    navigationList() {
      return [...this.navigation?.main, ...this.navigation?.other];
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  margin-top: 20px;

  &__item {
    display: flex;
    font-family: $golos-regular;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: $color-dark-grey;
    padding: 6px 0;
  }
}

.count {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-white-grey;

  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 4px;
    background: currentColor;
    border-radius: 50%;
    margin: 0 4px;
  }
}
</style>
