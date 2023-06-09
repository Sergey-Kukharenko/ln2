<template>
  <div class="products">
    <app-grid v-slot="slotProps" :slides="productsList">
      <app-card :slide="{ ...slotProps }" />
    </app-grid>
    <div class="products__pagination">
      <div class="products__pagination-nav">
        <app-pagination :options="pagination" :loading="loading" has-show-more-btn @load-data="fetchProducts" />
      </div>
    </div>
  </div>
</template>

<script>
import AppPagination from '@/components/shared/AppPagination.vue';
import AppGrid from '@/components/shared/AppGrid.vue';
import AppCard from '@/components/shared/AppCard.vue';

import { PAGINATION, CATEGORY_PRODUCT_TYPES } from '~/constants';
import { GTM_EVENTS_MAP } from '~/constants/gtm';
import gtmClear from '~/mixins/gtmClear.vue';

const [CATEGORY] = CATEGORY_PRODUCT_TYPES;

export default {
  name: 'CategoryProductList',

  components: {
    AppGrid,
    AppCard,
    AppPagination
  },

  mixins: [gtmClear],

  props: {
    type: {
      type: String,
      default: CATEGORY,
      validate(val) {
        return CATEGORY_PRODUCT_TYPES.includes(val);
      }
    },

    categoryTitle: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      loading: false
    };
  },

  computed: {
    productsList() {
      return this.$store.getters['category/getCategory']?.list ?? [];
    },

    pagination() {
      return this.$store.getters['category/getCategory']?.pagination;
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
    async fetchProducts({ page, isShowMore = false }) {
      if (Number.isNaN(parseInt(page))) {
        return;
      }

      this.loading = true;

      const payload = {
        slug: this.$route.params.slug,
        params: {
          page,
          limit: PAGINATION.limit
        }
      };

      await this.$store.dispatch(`category/fetch${this.type}`, {
        ...payload,
        isConcated: isShowMore
      });

      this.loading = false;
    },

    gtmItemListEvent() {
      const items = this.productsList.map((item) => ({
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
      this.gtmItemListEvent();
    }
  }
};
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

      &-nav {
        margin-top: 12px;
      }
    }
  }
}
</style>
