import { actionTree, getterTree, mutationTree } from 'typed-vuex';

import { CategoriesResponse } from '~/@types/api/categories';
import { CategoryResponse } from '~/@types/api/category';
import { useCategoriesMapper } from '~/helpers/useCategoriesMapper';

export const state = () => ({
  category: {} as CategoryResponse,
  categories: {} as CategoriesResponse
});

export const mutations = mutationTree(state, {
  SET_PRODUCT_LIST(state, payload: CategoryResponse) {
    state.category = payload;
  },

  ADD_PRODUCT_LIST(state, payload: CategoryResponse) {
    const { list, pagination } = payload;

    state.category = {
      ...state.category,
      list: [...state.category.list, ...list],
      pagination
    };
  },

  SET_CATEGORY_LIST(state, payload: CategoriesResponse) {
    state.categories = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchCategory({ commit }, { type, slug, params, isConcated = false }) {
      try {
        const category = await this.app.$http.$get<CategoryResponse>(`/v1/${type}/${slug}/`, { params });
        if (!isConcated) {
          commit('SET_PRODUCT_LIST', category);

          return;
        }

        commit('ADD_PRODUCT_LIST', category);
      } catch (err) {
        console.error(err);
      }
    },

    async fetchCategories({ commit }) {
      try {
        const categories = await this.app.$httpSSRCache({
          scope: 'layout',
          field: 'categories',
          url: '/v1/categories/'
        });
        commit('SET_CATEGORY_LIST', useCategoriesMapper(categories));
      } catch (err) {
        console.error(err);
      }
    }
  }
);

export const getters = getterTree(state, {
  getCategory: (state) => state.category,
  getCategories: (state) => state.categories,
  getMenuCategories: (state) => state.categories.filter((category) => category.in_menu)
});
