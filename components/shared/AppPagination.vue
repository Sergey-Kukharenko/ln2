<template>
  <div class="pagination">
    <div class="pagination__container">
      <app-button v-if="showMoreBtnVisibility" theme="grey-whitely" stretch="full" @click="fetchMore">
        Show more
      </app-button>
      <div class="pagination__items">
        <div
          v-for="(item, index) in paginator"
          :key="index"
          class="pagination__items-item"
          :class="{ active: options.page === item }"
          @click="$emit('paginate', { page: item, paginationButton: true })"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div ref="observer" class="observer">
      <app-spinner-loader v-if="spinnerVisibility" />
    </div>
  </div>
</template>

<script>
import { PAGINATION } from '~/constants';
import { useGeneratedNumsArray } from '~/helpers';

export default {
  name: 'AppPagination',

  components: {
    AppButton: () => import('@/components/shared/AppButton.vue'),
    AppSpinnerLoader: () => import('@/components/shared/AppSpinnerLoader.vue')
  },

  props: {
    options: {
      type: Object,
      default: () => ({})
    },

    totalPages: {
      type: [String, Number],
      default: 0
    },

    visibility: {
      type: Boolean,
      default: false
    },

    hasShowMoreBtn: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    spinnerVisibility() {
      return this.$device.isMobileOrTablet && this.loading;
    },

    showMoreBtnVisibility() {
      return this.hasShowMoreBtn && this.options.page < this.totalPages;
    },

    paginator() {
      const pages = this.totalPages;
      const currPage = this.options.page;
      const btnCount = PAGINATION.btnCount;
      const dots = '...';

      let res = [];

      if (pages <= btnCount) {
        res = useGeneratedNumsArray(pages);
      } else {
        if (currPage < PAGINATION.blindValue) {
          res = [...useGeneratedNumsArray(PAGINATION.blindValue), dots, pages];
        }

        if (currPage >= pages - 1) {
          res = [1, dots, pages - 2, pages - 1, pages];
        }

        if (currPage === pages - 2) {
          res = [1, dots, currPage - 1, pages - 2, pages - 1, pages];
        }

        if (currPage === PAGINATION.blindValue) {
          res = [1, currPage - 1, currPage, currPage + 1, dots, pages];
        }

        if (currPage === PAGINATION.blindValue + 1) {
          res = [1, currPage - 2, currPage - 1, currPage, currPage + 1, dots, pages];
        }

        if (currPage > PAGINATION.blindValue + 1 && currPage < pages - 2) {
          res = [1, dots, currPage - 1, currPage, currPage + 1, dots, pages];
        }
      }

      return res;
    }
  },

  mounted() {
    this.initInfinitePagination();
  },

  methods: {
    fetchMore() {
      if (!this.showMoreBtnVisibility) {
        return;
      }

      this.$emit('paginate', {
        page: this.options.page + 1,
        isShowMore: true
      });
    },

    initInfinitePagination() {
      if (!this.visibility || !this.$device.isMobileOrTablet) {
        return;
      }

      this.$nextTick().then(() => {
        const options = {
          rootMargin: '40px',
          threshold: 1.0
        };

        const callback = (entries, _observer) => {
          console.log('entries', entries);
          if (entries[0].isIntersecting) {
            this.fetchMore();
          }
        };

        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  &__container {
    @include lt-md {
      display: none;
    }

    @include gt-sm {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 12px;
    }
  }

  &__items {
    display: flex;
    gap: 8px;

    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border: 1px solid #eaeaea;
      border-radius: 10px;
      font-family: $golos-regular;
      font-size: 14px;
      line-height: 20px;
      color: $color-dark-grey;
      cursor: pointer;

      &.active {
        border: 1px solid $color-dark-green;
      }
    }
  }

  .observer {
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }
}
</style>
