<template>
  <main class="layout category-page">
    <div class="category-page__row">
      <div class="category-page__col filter-panel">
        <div class="filter-panel__header">
          <h1 class="filter-panel__header-title">{{ title }}</h1>
        </div>
      </div>
      <div class="category-page__col category-products">
        <category-product-list :products="categoryProducts.list" />
      </div>
    </div>
  </main>
</template>

<script>
import CategoryProductList from '~/components/CategoryProductList.vue';
import dataCategoryProducts from '~/data/category-products';

export default {
  name: 'CategoryPage',
  components: { CategoryProductList },

  data() {
    return {
      categoryProducts: dataCategoryProducts,
      title: dataCategoryProducts.main.title
    };
  }
};
</script>

<style lang="scss" scoped>
.category-page {
  margin-top: 0;

  &__row {
    display: flex;
    flex-direction: column;

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
        color: $color-white-grey;
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
