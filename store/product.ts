import { actionTree, getterTree, mutationTree } from 'typed-vuex';

import { CategoryResponse } from '~/@types/api/category';
import { PopularCategoriesResponse } from '~/@types/api/product';
import {
  CountKey,
  MappedProductContructor,
  PackageSize,
  ProductColor,
  ProductContructorResponse
} from '~/@types/api/product-constructor';
import { CONSTRUCTOR_TOOLTIP } from '~/constants';

export const state = () => ({
  recentlyViewed: {} as CategoryResponse,
  popularCategoriesItems: {} as PopularCategoriesResponse,
  cardConstructorActiveColor: null as ProductColor | null,
  cardConstructorActiveCount: null as CountKey | null,
  cardConstructorActiveType: null as PackageSize | null,
  cardProductSettings: {} as Partial<MappedProductContructor>
});

type ProductState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_POPULAR_CATEGORIES(state, payload: ProductState['popularCategoriesItems']) {
    state.popularCategoriesItems = payload;
  },

  SET_ACTIVE_TYPE(state, payload: ProductState['cardConstructorActiveType']) {
    state.cardConstructorActiveType = payload;
  },

  SET_ACTIVE_COUNT(state, payload: ProductState['cardConstructorActiveCount']) {
    state.cardConstructorActiveCount = payload;
  },

  SET_ACTIVE_COLOR(state, payload: ProductState['cardConstructorActiveColor']) {
    state.cardConstructorActiveColor = payload;
  },

  SET_RECENTLY_VIEWED(state, payload: ProductState['recentlyViewed']) {
    state.recentlyViewed = payload;
  },

  CLEAR_PRODUCT_SETTINGS(state) {
    state.cardProductSettings = {};
  },

  ADD_PRODUCT_SETTINGS(state, payload: ProductContructorResponse['data']) {
    state.cardProductSettings = {
      ...payload,
      ...payload?.settings,
      flowerColor: payload?.flower_color,
      flowerCount: payload?.flower_count,
      tooltip: CONSTRUCTOR_TOOLTIP
    };
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchCardProduct({ commit }, path: string) {
      try {
        const { data } = await this.app.$http.$get<ProductContructorResponse>(`/v1${path}/`);
        commit('ADD_PRODUCT_SETTINGS', data);
      } catch (err) {
        console.error(err);
      }
    },

    async fetchCardProductPage() {
      await Promise.allSettled([
        this.app.$accessor.product.fetchRecentlyWatched(),
        this.app.$accessor.product.fetchPopularCategoriesItems()
      ]);
    },

    async fetchRecentlyWatched({ commit }) {
      try {
        const recentlyViewed = await this.app.$http.$get<CategoryResponse>('/v1/filter/recently-viewed/');
        commit('SET_RECENTLY_VIEWED', recentlyViewed);
      } catch (e) {
        console.error(e);
      }
    },

    async fetchPopularCategoriesItems({ commit }) {
      try {
        const popularCategoriesItems = await this.app.$http.$get<PopularCategoriesResponse>(
          '/v1/popular-categories-items/'
        );
        commit('SET_POPULAR_CATEGORIES', popularCategoriesItems);
      } catch (e) {
        console.error(e);
      }
    }
  }
);

export const getters = getterTree(state, {
  getRecentlyViewed: (state) => state.recentlyViewed,
  getPopularCategoriesItems: (state) => state.popularCategoriesItems
});
