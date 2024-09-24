<template>
  <div v-click-outside="onFocusOut" class="search">
    <div class="layout layout--md">
      <div :class="classNames">
        <nuxt-link v-if="$device.isMobileOrTablet" to="/" class="search-control go-back">
          <svg-icon name="arrow-back" class="search-control__icon go-back__icon" />
        </nuxt-link>
        <form class="search-form" @submit.prevent="onSubmit">
          <input
            v-model="query"
            autocomplete="off"
            type="text"
            name="name"
            placeholder="Search for the best bouquet"
            class="input"
            @focus="onFocusIn"
          />
          <app-button v-if="$device.isDesktop" theme="search" class="search__button">Search</app-button>
        </form>
        <button v-if="$device.isMobileOrTablet" class="search-control cancel" @click="clearQuery">
          <svg-icon name="close" class="search-control__icon cancel__icon" />
        </button>
      </div>

      <div class="search-sections">
        <!-- Реализуется, как только будет готов backend -->
        <!--<app-section v-show="isSearchHistory" title="Search history">-->
        <!--  <app-list :list="searchHistory" has-remove-btn @removeItem="onRemoveItem" />-->
        <!--</app-section>-->

        <!--<app-section v-show="isSearchResult" title="Categories">-->
        <!--  <app-list :list="filteredList" @addItem="onAddItem" />-->
        <!--</app-section>-->

        <app-spinner-loader v-show="loading" />

        <app-not-found v-if="isNotFound" />

        <app-section v-if="isSearchProducts" has-offset :title="searchedProducts.main.title">
          <app-section-grid v-slot="slotProps" :slides="searchedProducts.list" :slug="searchedProducts.slug" stretch>
            <app-card :slide="{ ...slotProps }" size="sm" />
          </app-section-grid>
        </app-section>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';
import Vue from 'vue';

import AppSection from './AppSection.vue';

import siteData from '@/data/site-data';
import AppNotFound from '~/components/header/search/AppNotFound.vue';
import AppCard from '~/components/shared/AppCard.vue';
import AppSectionGrid from '~/components/shared/AppSectionGrid.vue';
import AppSpinnerLoader from '~/components/shared/AppSpinnerLoader.vue';
import { useDebounce, useToggleClassName } from '~/helpers';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AppSearchBox',

  components: {
    AppSpinnerLoader,
    AppSection,
    AppNotFound,
    AppButton: () => import('~/components/shared/AppButton.vue'),
    AppSectionGrid,
    AppCard
  },

  directives: {
    clickOutside: vClickOutside.directive
  },

  data() {
    return {
      query: '',
      data: siteData,
      showSearchHistory: false,
      isVisible: false
    };
  },

  computed: {
    searchHistory() {
      return this.$accessor.user.getSearchHistory;
    },

    loading() {
      return this.$accessor.search.getLoading;
    },

    searchedProducts() {
      return this.$accessor.search.getProducts;
    },

    filteredList() {
      return this.data.filter((item) => {
        return item.toLowerCase().includes(this.query.toLowerCase());
      });
    },

    isSearchResult() {
      return this.filteredList.length > 0 && this.query;
    },

    isSearchProducts() {
      return this.searchedProducts.list?.length;
    },

    isNotFound() {
      return !this.loading && this.searchedProducts?.pagination?.total === 0 && this.query !== '';
    },

    isSearchHistory() {
      return this.searchHistory.length > 0 && this.showSearchHistory && !this.query;
    },

    classNames() {
      return useToggleClassName(this.isVisible, 'search-group', 'active');
    }
  },

  watch: {
    query(value) {
      value && value.length > 2 && this.debouncedFetch(value);
    }
  },

  methods: {
    ...accessorMapper('search', ['fetchByQuery']),

    onFocusIn() {
      this.isVisible = true;
      this.showSearchHistory = true;
    },

    onFocusOut() {
      this.isVisible = false;
      this.showSearchHistory = false;
    },

    clearQuery() {
      this.query = '';
    },

    onSubmit() {
      if (!this.query) return;
      // const payload = { url: '', title: this.query };
      // this.$accessor.user.ADD_TO_HISTORY(payload);
      this.clearQuery();
    },

    onRemoveItem(payload) {
      this.$accessor.user.REMOVE_FROM_HISTORY(payload);
    },

    onAddItem(payload) {
      this.$accessor.user.ADD_TO_HISTORY(payload);
      this.clearQuery();
    },

    debouncedFetch: useDebounce(function (value) {
      this.fetchByQuery(value);
    }, 300)
  }
});
</script>

<style lang="scss" scoped>
.search {
  background: #fff;

  @include gt-sm {
    min-height: 316px;
  }

  @include lt-md {
    margin-top: 12px;
  }
}

.search-control {
  flex-shrink: 0;
  display: flex;
  align-items: center;

  &__icon {
    width: 24px;
    height: 24px;
  }
}

.search-group {
  display: flex;
  width: 100%;

  @include lt-md {
    &--active {
      & .cancel {
        display: block;
      }
    }
  }
}

.search-form {
  display: flex;

  @include gt-sm {
    flex: 0 0 810px;
  }

  @include lt-md {
    flex: 1;
    margin: 0 4px;
  }
}

.input {
  font-family: $golos-regular;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.01em;
  background: $bg-grey;
  outline: none;
  border: none;
  border-radius: 10px;

  @include gt-sm {
    padding: 0 16px;
  }

  @include lt-md {
    padding: 12px 16px;
  }

  &:focus {
    &::placeholder {
      opacity: 0;
    }
  }

  @include gt-sm {
    flex: 1;
    margin-right: 24px;
  }

  @include lt-md {
    width: 100%;
  }
}

.go-back {
  &__icon {
    color: $color-dark-green;
  }
}

.cancel {
  &__icon {
    color: $color-dark-grey;
  }
}

.search-sections {
  @include gt-sm {
    padding: 18px 0;
  }

  @include lt-md {
    padding: 14px 0;
  }
}
</style>
