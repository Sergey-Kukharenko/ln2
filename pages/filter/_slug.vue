<template>
  <category-wrapper :page-type="$options.FILTER" :category-data="getCategory" />
</template>

<script>
import { mapGetters } from 'vuex';
import CategoryWrapper from '~/components/CategoryWrapper';
import { CATEGORY_PRODUCT_TYPES, PAGINATION } from '~/constants';

const [, FILTER] = CATEGORY_PRODUCT_TYPES;

export default {
  name: 'FilterPage',

  components: {
    CategoryWrapper
  },

  middleware: ['redirect'],

  async fetch() {
    const { slug } = this.$route.params;
    const type = FILTER.toLocaleLowerCase();

    await this.$store.dispatch('category/fetchCategory', {
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
    ...mapGetters({
      getCategory: 'category/getCategory'
    }),

    categorySeo() {
      return this.getCategory?.seo;
    }
  }
};
</script>
