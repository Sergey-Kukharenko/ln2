<template>
  <main class="layout category-page">
    <div class="category-page__row">
      <div class="category-page__col filter-panel">
        <div class="filter-panel__header">
          <h1 class="filter-panel__header-title">{{ title }}</h1>
        </div>
        <div class="filter-panel__menu">
          <category-filters @change-active-filter="changeActiveFilter" />
        </div>
      </div>

      <div class="category-page__col category-products">
        <div class="category-products__header" :style="styles">
          <div class="category-products__header-title">{{ productCount }} bouquets found</div>
          <category-sorting :sort-list="sortList" :curr-sorting="sorting.currSorting" @sort="sortBy" />
        </div>
        <div class="category-products__header-bottom">
          <div class="active-filters">
            <category-active-filters
              v-if="filters.activeFilters.length"
              :list="filters.activeFilters"
              @remove="removeActiveFilter"
              @clear="clearActiveFilters"
            />
          </div>
          <category-navigation-sm
            :sort-list="sorting.sortVariants"
            :curr-sorting="sorting.currSorting"
            :active-filters="filters.activeFilters"
            :product-count="productCount"
            @sort="sortBy"
            @remove-active-filter="removeActiveFilter"
            @clear-active-filters="clearActiveFilters"
            @change-active-filter="changeActiveFilter"
          />
        </div>
        <category-product-list :products="categoryProducts.list" />
      </div>
    </div>
  </main>
</template>

<script>
import dataCategoryFilters from '~/data/category-filters';
import dataCategoryProducts from '~/data/category-products';
import dataCategorySorting from '~/data/category-sorting';

export default {
  name: 'CategoryPage',

  data() {
    return {
      filters: {
        categoryFilters: dataCategoryFilters,
        activeFilters: []
      },

      sorting: {
        sortVariants: dataCategorySorting,
        currSorting: dataCategorySorting[0]
      },

      title: dataCategoryProducts.main.title,
      categoryProducts: dataCategoryProducts,
      productCount: dataCategoryProducts.main.count
    };
  },

  computed: {
    styles() {
      return this.filters.activeFilters.length ? { marginBottom: '24px' } : { marginBottom: '32px' };
    },

    sortList() {
      return this.sorting.sortVariants.filter((s) => s !== this.sorting.currSorting);
    }
  },

  methods: {
    sortBy(variant) {
      this.sorting.currSorting = variant;
    },

    changeActiveFilter(payload) {
      const isCheckbox = payload.type === 'checkbox';

      this.filters.activeFilters = this.filters.activeFilters.filter((f) => f.filterKey !== payload.filterKey);

      if (!isCheckbox) {
        this.filters.activeFilters.push(payload);

        return;
      }

      const checkboxFilters = payload.value.map((f) => ({
        ...payload,
        value: f
      }));

      this.filters.activeFilters.push(...checkboxFilters);
    },

    removeActiveFilter({ value }) {
      this.filters.activeFilters = this.filters.activeFilters.filter((f) => f.value !== value);
    },

    clearActiveFilters() {
      this.filters.activeFilters = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.category-page {
  margin-top: 0;

  &__row {
    display: flex;

    @include lt-md {
      flex-direction: column;
    }

    .filter-panel {
      width: 344px;
      margin-right: 31px;

      &__header {
        display: flex;
        align-items: flex-end;
        box-sizing: border-box;

        @include gt-sm {
          height: 73px;
        }

        @include lt-md {
          height: 40px;
        }
      }

      &__header-title {
        font-family: $Literata;
        font-style: normal;
        letter-spacing: -0.01em;
        margin: 0;

        @include gt-sm {
          font-weight: 600;
          font-size: 32px;
          line-height: 40px;
          color: #000000;
          margin-bottom: 24px;
        }

        @include lt-md {
          font-weight: 700;
          font-size: 20px;
          line-height: 24px;
          color: $color-dark-grey;
          margin-bottom: 12px;
        }
      }

      &__menu {
        @include lt-md {
          display: none;
        }
      }
    }

    .category-products {
      flex: auto;

      &__header {
        height: 73px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eaeaea;

        @include lt-md {
          display: none;
        }
      }

      &__header-title {
        font-family: $golos-regular;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.01em;
        color: #7c7c7c;
      }

      &__header-bottom .active-filters {
        @include lt-md {
          display: none;
        }
      }
    }
  }
}
</style>
