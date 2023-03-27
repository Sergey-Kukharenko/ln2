<template>
  <div :class="classNames">
    <section class="section">
      <app-section-header :theme="theme" :header-props="sectionHeaderProps" />
      <app-section-grid
        v-slot="slotProps"
        :slides="section.list"
        :theme="theme"
        :prefix="section.main.prefix"
        :slug="section.main.slug"
        :total="section.pagination.total"
      >
        <app-card :slide="{ ...slotProps }" />
      </app-section-grid>
    </section>
  </div>
</template>

<script>
import AppSectionHeader from '~/components/shared/AppSectionHeader.vue';
import AppSectionGrid from '~/components/shared/AppSectionGrid.vue';
import AppCard from '~/components/shared/AppCard.vue';

export default {
  name: 'AppSpecialOffers',

  components: {
    AppSectionHeader,
    AppSectionGrid,
    AppCard
  },

  props: {
    section: {
      type: Object,
      default: () => ({})
    },

    theme: {
      type: String,
      default: ''
    },

    name: {
      type: String,
      default: ''
    }
  },

  computed: {
    classNames() {
      return ['layout', this.name];
    },

    sectionHeaderProps() {
      return { ...this.section?.main, ...this.section?.pagination };
    }
  }
};
</script>

<style lang="scss">
.section {
  margin-top: 0;
}
</style>
