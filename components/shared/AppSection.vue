<template>
  <div :class="classNames">
    <section class="section">
      <app-section-header v-if="notShowHeader" :theme="theme" :header-props="sectionHeaderProps" />
      <app-section-grid
        v-slot="slotProps"
        :slides="getSlides"
        :theme="theme"
        :stretch="stretch"
        :size="size"
        :prefix="section?.main?.prefix ?? ''"
        :slug="section?.main?.slug ?? ''"
        :total="section?.pagination?.total"
      >
        <app-card :slide="{ ...slotProps }" :has-from="hasFrom" :is-constructor="isConstructor" />
      </app-section-grid>
    </section>
  </div>
</template>

<script>
import AppCard from '~/components/shared/AppCard.vue';
import AppSectionGrid from '~/components/shared/AppSectionGrid.vue';
import AppSectionHeader from '~/components/shared/AppSectionHeader.vue';
import { CONSTRUCTOR_BLOCK_TITLE } from '~/constants';

export default {
  name: 'AppSpecialOffers',

  components: {
    AppSectionHeader,
    AppSectionGrid,
    AppCard
  },

  props: {
    isConstructor: {
      type: Boolean,
      default: false
    },

    section: {
      type: [Object, Array],
      default: () => ({})
    },

    theme: {
      type: String,
      default: '',
      validate(value) {
        return ['custom', 'constructor'].includes(value);
      }
    },

    stretch: {
      type: Boolean,
      default: false
    },

    size: {
      type: String,
      default: 'large',
      validate(value) {
        return ['medium, large'].includes(value);
      }
    },

    showListOnly: {
      type: Boolean,
      default: false
    },

    name: {
      type: String,
      default: ''
    },

    hasFrom: {
      type: Boolean,
      default: false
    },

    preview: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classNames() {
      return ['layout', this.name];
    },

    sectionHeaderProps() {
      const sectionMain = this.isConstructor ? { title: CONSTRUCTOR_BLOCK_TITLE } : this.section?.main;
      return { ...sectionMain, ...this.section?.pagination };
    },

    getPreviewSlides() {
      return this.section?.list.filter((_, idx) => idx < 3);
    },

    getSlides() {
      return this.isConstructor ? this.section : this.preview ? this.getPreviewSlides : this.section?.list;
    },

    notShowHeader() {
      return !this.showListOnly;
    }
  }
};
</script>

<style lang="scss">
.constructor {
  background: #ecffed;

  @include gt-sm {
    border-radius: 32px;
  }

  @include lt-lg {
    border-radius: 24px;
  }
}
</style>
