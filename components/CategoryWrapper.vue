<template>
  <main class="layout category-page">
    <div class="category-page__row">
      <div class="category-page__col filter-panel">
        <div class="filter-panel__header">
          <h1 class="filter-panel__header-title">{{ categoryTitle }}</h1>
        </div>
      </div>
      <div class="category-page__col category-products">
        <category-product-list
          :category-title="categoryTitle"
          :product-list="productList"
          :pagination="pagination"
          :type="pageType"
        />
      </div>
    </div>
    <app-notice v-if="$device.isMobileOrTablet" />
    <app-seo :html="categorySeoHtml" :faq="categoryFaq" />
  </main>
</template>

<script>
import { hydrateWhenIdle } from 'vue-lazy-hydration';
import AppSeo from '~/components/seo/AppSeo.vue';
import CategoryProductList from '~/components/CategoryProductList.vue';

export default {
  name: 'CategoryWrapper',

  components: {
    CategoryProductList,
    AppSeo,
    AppNotice: hydrateWhenIdle(() => import('@/components/shared/AppNotice'))
  },

  props: {
    pageType: {
      type: String,
      required: true
    },

    categoryData: {
      type: [Object, Array],
      default: () => ({})
    }
  },

  computed: {
    categoryTitle() {
      return this.categoryData?.main?.title ?? this.$route.params.slug.split('-').join(' ');
    },

    categorySeo() {
      return this.categoryData?.seo;
    },

    categoryFaq() {
      return this.categoryData?.faq;
    },

    productList() {
      return this.categoryData?.list ?? [];
    },

    pagination() {
      return this.categoryData?.pagination ?? {};
    },

    categorySeoHtml() {
      return this.categorySeo?.bottom_text;
    }
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

        &::first-letter {
          text-transform: uppercase;
        }

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
        font-style: normal;
        font-weight: 400;
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
