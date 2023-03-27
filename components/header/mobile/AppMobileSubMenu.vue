<template>
  <div>
    <app-mobile-list v-if="isList" :list="currSection" @open-menu-item="handleClick" />
    <app-mobile-section v-else :sections="currSection" @open-menu-item="handleClick" />
  </div>
</template>

<script>
import AppMobileList from '~/components/header/mobile/AppMobileList';
import AppMobileSection from '~/components/header/mobile/AppMobileSection';

export default {
  name: 'AppMobileSubMenu',

  components: {
    AppMobileSection,
    AppMobileList
  },

  inject: ['closeMenu'],

  props: {
    title: {
      type: String,
      default: ''
    }
  },

  computed: {
    isList() {
      return !this.currSection?.some((el) => el.list);
    },

    sectionName() {
      return this.title.toLowerCase().split(' ').join('-');
    },

    currSection() {
      return this.$store.getters['category/getCategories']?.[this.sectionName];
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
};
</script>

<style lang="scss">
.group-sections {
  & .section:not(:last-child) {
    border-bottom: 1px solid #dde0e6;
  }
}
</style>
