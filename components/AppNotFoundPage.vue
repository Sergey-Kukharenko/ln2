<template>
  <main class="layout">
    <div class="not-found">
      <div class="not-found__text">
        <img class="not-found__img" src="/images/zoom.png" alt="" />
        <div class="not-found__title">Oops...</div>
        <div class="not-found__description">This page doesn’t exist, but there are plenty of great bouquets</div>
      </div>
      <category-product-list
        category-title="sdfsdfsf"
        :product-list="getCategory.list"
        :pagination="pagination"
        type="filter"
        slug="special-offers"
      />
    </div>
  </main>
</template>

<script>
import CategoryProductList from '~/components/CategoryProductList.vue';
import { PAGINATION } from '~/constants';
import { accessorMapper } from '~/store';

export default {
  name: 'AppNotFoundPage',
  components: {
    CategoryProductList
  },
  async fetch() {
    const slug = 'special-offers';
    const type = 'filter';
    const { page = 1, orderBy = '', orderDirection = '' } = this.$route.query;
    const queryParams = {
      order_by: orderBy,
      order_direction: orderDirection
    };
    await this.$accessor.category.fetchCategory({
      type,
      slug,
      params: {
        limit: PAGINATION.limit,
        page,
        ...queryParams
      }
    });
  },
  computed: {
    ...accessorMapper('category', ['getCategory']),
    pagination() {
      return this.getCategory.pagination;
    },
    categoryList() {
      return this.getCategory.list;
    }
  }
};
</script>

<style lang="scss" scoped>
.not-found {
  &__text {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: 65px;
    padding-top: 10px;
  }
  &__title {
    font-size: 24px;
    line-height: 28.8px;
    font-weight: 700;
  }
  &__description {
    max-width: 260px;
    margin-top: 12px;
    letter-spacing: 0.3px;
    line-height: 20.8px;
  }
  &__img {
    width: 160px;
  }
}
</style>
