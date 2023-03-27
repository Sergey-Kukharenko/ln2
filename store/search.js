export const state = () => ({
  products: {},
  loading: null
});

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },

  setProducts(state, payload) {
    state.products = payload;
  }
};

export const actions = {
  async fetchByQuery({ state, commit }, query) {
    try {
      commit('setLoading', true);
      const products = await this.$axios.$get('/offers-search', {
        params: {
          q: query,
          page: 1,
          limit: 12
        }
      });
      commit('setProducts', products);
      commit('setLoading', false);
    } catch (e) {
      console.error(e);
    }
  }
};

export const getters = {
  getLoading: (state) => state.loading,
  getProducts: (state) => state.products
};
