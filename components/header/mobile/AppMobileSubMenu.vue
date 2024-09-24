<template>
  <div>
    <app-mobile-list v-if="isList" :list="currentItem.list[0]" @open-menu-item="handleClick" />
    <app-mobile-section v-else :sections="currentItem.list" @open-menu-item="handleClick" />
  </div>
</template>

<script>
import Vue from 'vue';

import AppMobileList from '~/components/header/mobile/AppMobileList.vue';
import AppMobileSection from '~/components/header/mobile/AppMobileSection.vue';

export default Vue.extend({
  name: 'AppMobileSubMenu',

  components: {
    AppMobileSection,
    AppMobileList
  },

  inject: ['closeMenu'],

  props: {
    currentItem: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    isList() {
      return Array.isArray(this.currentItem?.list);
    }
  },

  methods: {
    handleClick(item) {
      if (!item.prefix && !item.slug) {
        return;
      }

      this.closeMenu();
      this.$emit('close');

      // Дожидаемся закрытия меню, после переводим юзера на страницу

      this.$nextTick().then(() => {
        this.$router.push({ name: `${item.prefix}-slug`, params: { slug: item.slug } });
      });
    }
  }
});
</script>

<style lang="scss">
.group-sections {
  & .section:not(:last-child) {
    border-bottom: 1px solid #dde0e6;
  }
}
</style>
