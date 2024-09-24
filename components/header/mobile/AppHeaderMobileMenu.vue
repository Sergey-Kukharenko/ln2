<template>
  <div>
    <app-mobile-menu class="nested-group" @selectItem="onSelectItem" />
    <app-drawer-nested :visible="isVisible" :title="title" @close="close">
      <app-mobile-sub-menu v-bind="{ currentItem }" @close="close" />
    </app-drawer-nested>
  </div>
</template>

<script>
import AppDrawerNested from '~/components/header/mobile/AppDrawerNested.vue';
import AppMobileMenu from '~/components/header/mobile/AppMobileMenu.vue';
import AppMobileSubMenu from '~/components/header/mobile/AppMobileSubMenu.vue';

export default {
  name: 'AppHeaderMobileMenu',

  components: {
    AppMobileSubMenu,
    AppDrawerNested,
    AppMobileMenu
  },

  inject: ['updateVisibility'],

  data() {
    return {
      isVisible: false,
      selected: 0
    };
  },

  computed: {
    currentItem() {
      return this.$accessor.category.getMenuCategories[this.selected];
    },

    isSubLevel() {
      return this.currentItem.hasSubLevel;
    },

    title() {
      return this.currentItem.title;
    }
  },

  watch: {
    isVisible(value) {
      this.updateVisibility(value);
    }
  },

  methods: {
    open() {
      this.isVisible = true;
    },

    close() {
      this.isVisible = false;
    },

    onSelectItem(idx) {
      this.selected = idx;
      this.isSubLevel && this.open();
    }
  }
};
</script>
