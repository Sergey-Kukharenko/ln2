<template>
  <category-wrapper :page-type="$options.CATEGORY" :category-data="getCategory" />
</template>

<script>
import Vue from 'vue';

import CategoryWrapper from '~/components/CategoryWrapper.vue';
import { CATEGORY_PRODUCT_TYPES, PAGINATION } from '~/constants';
import { accessorMapper } from '~/store';

const [CATEGORY] = CATEGORY_PRODUCT_TYPES;

export default Vue.extend({
  name: 'CategoryPage',

  components: {
    CategoryWrapper
  },

  async fetch() {
    const { slug } = this.$route.params;
    const type = CATEGORY.toLocaleLowerCase();

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

  CATEGORY,

  computed: {
    ...accessorMapper('category', ['getCategory']),

    categorySeo() {
      return this.getCategory?.seo;
    }
  }
});
</script>
