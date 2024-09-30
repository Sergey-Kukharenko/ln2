<template>
  <div class="products">
    <app-grid v-slot="slotProps" :slides="productList">
      <app-card :key="slotProps.img" :slide="{ ...slotProps }" :lazy-image="false" />
    </app-grid>
    <div class="products__pagination">
      <div class="products__pagination-nav">
        <app-pagination
          v-if="paginatorVisibility"
          :options="pagination"
          :total-pages="totalPages"
          :loading="loading"
          :visibility="paginatorVisibility"
          has-show-more-btn
          @paginate="fetchProducts"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import AppCard from '@/components/shared/AppCard.vue';
import AppGrid from '@/components/shared/AppGrid.vue';
import AppPagination from '@/components/shared/AppPagination.vue';
import { CATEGORY_PRODUCT_TYPES, PAGINATION } from '~/constants';
import { GTM_EVENTS_MAP } from '~/constants/gtm';
import { usePaginationTotalPages } from '~/helpers';
import gtm from '~/mixins/gtm.vue';

const [CATEGORY] = CATEGORY_PRODUCT_TYPES;

export default Vue.extend({
  name: 'CategoryProductList',

  components: {
    AppGrid,
    AppCard,
    AppPagination
  },

  mixins: [gtm],

  props: {
    type: {
      type: String,
      default: CATEGORY,
      validate(val) {
        return CATEGORY_PRODUCT_TYPES.includes(val);
      }
    },

    slug: {
      type: String,
      default: null
    },

    categoryTitle: {
      type: String,
      default: ''
    },

    productList: {
      type: Array,
      default: () => []
    },

    pagination: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      loading: false
    };
  },

  computed: {
    totalPages() {
      return usePaginationTotalPages({ total: this.pagination?.total, limit: this.pagination?.limit });
    },

    paginatorVisibility() {
      return this.totalPages > 1;
    }
  },

  watch: {
    productsList() {
      this.gtmMultipleEvents();
    }
  },

  mounted() {
    this.gtmMultipleEvents();
  },

  methods: {
    async fetchProducts({ page, isShowMore = false, paginationButton = false }) {
      if (Number.isNaN(parseInt(page))) {
        return;
      }

      this.loading = true;

      const { orderBy = '', orderDirection = '' } = this.$route.query;

      const queryParams = {
        order_by: orderBy,
        order_direction: orderDirection
      };

      const payload = {
        type: this.type.toLocaleLowerCase(),
        isConcated: isShowMore,
        slug: this.slug || this.$route.params.slug,
        params: {
          page,
          limit: PAGINATION.limit,
          ...queryParams
        }
      };

      await this.$accessor.category.fetchCategory(payload);

      this.loading = false;
      this.$router.push({
        query: { page, orderBy, orderDirection }
      });
      if (paginationButton) {
        this.scrollToTop();
      }
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    gtmItemListEvent() {
      const items = this.productList.map((item) => ({
        item_name: item.title,
        item_id: item.real_id,
        item_brand: 'myflowers',
        price: item.price,
        item_category: item.category_name,
        item_variant: item.position_name,
        quantity: 1
      }));

      this.$gtm.push({
        event: GTM_EVENTS_MAP.viewItemList,
        ecommerce: {
          items
        }
      });
    },

    gtmMultipleEvents() {
      this.gtmClearItemEvent();
      this.dataLayerSetOriginalUrl();
      this.gtmItemListEvent();
    }
  }
});
</script>

<style lang="scss" scoped>
.products {
  margin-bottom: 56px;

  .grid {
    @include lt-md {
      grid-template-columns: repeat(2, minmax(47%, 1fr));
    }

    @include gt-sm {
      grid-template-columns: repeat(auto-fill, minmax(216px, 1fr));
    }
  }

  &__pagination {
    @include gt-sm {
      margin-top: 40px;
    }
  }

  &__pagination-nav {
    margin-top: 12px;
  }
}
</style>
