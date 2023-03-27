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
  async fetchCategory({ commit }, { slug, params, isConcated = false }) {
    try {
      const category = await this.$axios.$get(`/category/${slug}/`, { params });

      if (!isConcated) {
        commit('setState', { category });

        return;
      }

      commit('setProductList', category);
    } catch (err) {
      console.error(err);
    }
  },

  async fetchFilter({ commit }, { slug, params, isConcated = false }) {
    try {
      const filter = await this.$axios.$get(`/filter/${slug}/`, { params });
      if (!isConcated) {
        commit('setState', { category: filter });

        return;
      }

      commit('setProductList', filter);
    } catch (err) {
      console.error(err);
    }
  },

  async fetchCategories({ commit }, params) {
    try {
      const res = await this.$axios.$get(`/categories/`, { params });
      commit('setState', { categories: res });
    } catch (err) {
      console.error(err);
    }
  }
};

export const getters = {
  getCategorySeo: (state) => state.category.seo,
  getCategory: (state) => state.category,
  getCategories: (state) => state.categories
};
