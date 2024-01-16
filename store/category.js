import { setState } from '@/helpers';

export const state = () => ({
  category: null,
  categories: null
});

export const mutations = {
  setState,

  setProductList(state, { list, pagination }) {
    state.category = {
      ...state.category,
      list: [...state.category.list, ...list],
      pagination
    };
  }
};

export const actions = {
  async fetchCategory({ commit }, { type, slug, params, isConcated = false }) {
    try {
      const category = await this.$http.$get(`/v1/${type}/${slug}/`, { params });
      if (!isConcated) {
        commit('setState', { category });

        return;
      }

      commit('setProductList', category);
    } catch (err) {
      console.error(err);
    }
  },

  async fetchCategories({ commit }, params) {
    try {
      const categories = await this.$httpSSRCache({
        scope: 'layout',
        field: 'categories',
        url: '/v1/categories/',
        payload: { params }
      });
      commit('setState', { categories });
    } catch (err) {
      console.error(err);
    }
  }
};

export const getters = {
  getCategory: (state) => state.category,
  getCategories: (state) => state.categories
};
