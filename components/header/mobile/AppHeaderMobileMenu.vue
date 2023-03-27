<template>
  <div>
    <app-mobile-menu :list="$options.MENU" class="nested-group" @selectItem="onSelectItem" />
    <app-drawer-nested :visible="isVisible" :title="title" @close="close">
      <app-mobile-sub-menu v-bind="{ title }" @close="close" />
    </app-drawer-nested>
  </div>
</template>

<script>
import AppMobileMenu from '~/components/header/mobile/AppMobileMenu';
import AppDrawerNested from '~/components/header/mobile/AppDrawerNested';
import AppMobileSubMenu from '~/components/header/mobile/AppMobileSubMenu';

import { mobileNavbar } from '~/data/nav-bar';

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

  MENU: mobileNavbar,

  computed: {
    currentItem() {
      return mobileNavbar[this.selected];
    },

    isSubLevel() {
      return this.currentItem.hasSubLevel;
    },

    title() {
      return this.currentItem.title;
    },

    list() {
      return this.currentItem.list;
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
