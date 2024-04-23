<template>
  <category-wrapper :page-type="$options.FILTER" :category-data="getCategory" />
</template>

<script>
import Vue from 'vue';

import CategoryWrapper from '~/components/CategoryWrapper.vue';
import { CATEGORY_PRODUCT_TYPES, PAGINATION } from '~/constants';
import { accessorMapper } from '~/store';

const [, FILTER] = CATEGORY_PRODUCT_TYPES;

export default Vue.extend({
  name: 'FilterPage',

  components: {
    CategoryWrapper
  },

  middleware: ['redirect'],

  async fetch() {
    const { slug } = this.$route.params;
    const type = FILTER.toLocaleLowerCase();

    await this.$accessor.category.fetchCategory({
      type,
      slug,
      params: {
        limit: PAGINATION.limit
      }
    });
  },

  head() {
    return {
      title: this.categorySeo?.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.categorySeo?.description ?? ''
        }
      ]
    };
  },

  FILTER,

  computed: {
    ...accessorMapper('category', ['getCategory']),

    categorySeo() {
      return this.getCategory?.seo;
    }
  }
});
</script>
