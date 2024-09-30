<template>
  <div class="container">
    <category-wrapper
      v-if="isCategoryWrapperVisible"
      :key="getCategory.main.title || $route.path"
      :page-type="$options.CATEGORY"
      :category-data="getCategory"
    />
  </div>
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

  data() {
    return {
      showContent: false
    };
  },

  async fetch() {
    const { slug } = this.$route.params;
    const type = CATEGORY.toLocaleLowerCase();
    const { page = 1, orderBy = '', orderDirection = '' } = this.$route.query;
    const queryParams = {
      order_by: orderBy,
      order_direction: orderDirection
    };
    await this.$accessor.category
      .fetchCategory({
        type,
        slug,
        params: {
          limit: PAGINATION.limit,
          page,
          ...queryParams
        }
      })
      .then(() => {
        this.showContent = true;
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
        },
        {
          hid: 'rel',
          name: 'rel',
          content: 'canonical'
        }
      ]
    };
  },

  CATEGORY,

  computed: {
    ...accessorMapper('category', ['getCategory']),

    categorySeo() {
      return this.getCategory?.seo;
    },

    isCategoryWrapperVisible() {
      return this.showContent && this.getCategory;
    }
  }
});
</script>

<style scoped>
.container {
  min-height: 50vh;
}
</style>
