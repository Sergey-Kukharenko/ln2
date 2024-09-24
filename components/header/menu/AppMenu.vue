<template>
  <div class="menu">
    <div v-for="item in list" :key="item.title" class="menu__item" :class="{ 'has-sub-level': item.hasSubLevel }">
      <div class="content" :class="{ 'color-pink': item.color }" @click="openBySlug(item)">
        <div class="content__figure">
          <svg-icon v-if="item.icon" :name="item.icon" v-bind="item.style" class="content__icon" />
        </div>
        <div class="content__text">
          {{ item.title }}
        </div>
      </div>
      <app-menu-dropdown v-if="isSectionHasItems(item)">
        <app-menu-sections v-if="isSectionItemsHasList(item)" v-slot="slotProps" :section="getSection(item)">
          <app-menu-section :theme="setColumnSize(item.title)" :section="{ ...slotProps }" />
        </app-menu-sections>
        <app-menu-section v-else :theme="setColumnSize(item.title)" :section="getSection(item)" />
      </app-menu-dropdown>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import AppMenuDropdown from '~/components/header/menu/AppMenuDropdown.vue';
import AppMenuSection from '~/components/header/menu/AppMenuSection.vue';
import AppMenuSections from '~/components/header/menu/AppMenuSections.vue';
import { useObjectNotEmpty } from '~/helpers';

export default Vue.extend({
  name: 'AppMenuNavigation',

  components: { AppMenuSection, AppMenuSections, AppMenuDropdown },

  computed: {
    list() {
      return this.$accessor.category.getMenuCategories ?? [];
    }
  },

  methods: {
    setColumnSize(value) {
      switch (value) {
        case 'Flowers':
          return 'md';
        case 'Roses':
          return 'lg';
        default:
          return '';
      }
    },

    openBySlug(item) {
      if (item.to) {
        this.$router.push(item.to);
      }

      if (!item.prefix && !item.slug) {
        return;
      }

      this.$router.push({ name: `${item.prefix}-slug`, params: { slug: item.slug } });
    },

    getSection(item) {
      return item.list ?? [];
    },

    isSectionHasItems(item) {
      return this.getSection(item).length || Object.values(this.getSection(item)).length;
    },

    isSectionItemsHasList(item) {
      return useObjectNotEmpty(this.getSection(item));
    }
  }
});
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 -12px;

  &__item {
    cursor: default;
    background: #ffffff;
    padding: 0;
    border-radius: 12px 12px 0 0;

    &.has-sub-level {
      &:hover {
        box-shadow: 0 4px 16px #0000001f;
        z-index: 3;

        & .dropdown {
          display: block;
        }
      }
    }

    &:first-child {
      &:not(:hover) {
        color: $color-dark-green;
      }

      &:hover {
        color: lighten($color-dark-green, 5%);
      }
    }
  }
}

.content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  color: $color-dark-grey;
  background: #ffffff;
  padding: 8px 10px 13px;
  border-radius: 12px 12px 0 0;
  z-index: 2;
  cursor: pointer;

  &.color-pink {
    color: $color-link-pink;
  }

  &__icon {
    display: block;
    color: inherit;
    fill: currentColor;
  }

  &__figure {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }

  &__text {
    font-family: $golos-medium;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
