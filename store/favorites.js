export const state = () => ({
  favorites: {}
});

export const mutations = {
  setFavorites(state, payload) {
    state.favorites = payload;
  }
};

export const actions = {
  async fetchFavorites({ commit }) {
    try {
      const favorites = await this.$http.$get('/v1/favorites/');
      commit('setFavorites', favorites);
    } catch (e) {
      console.error(e);
    }
  },

  async addToFavorites({ commit }, productId) {
    try {
      const favorites = await this.$http.$post(`/v1/favorite/${productId}`);
      commit('setFavorites', favorites);
    } catch (e) {
      console.error(e);
    }
  },

  async removeFromFavorites({ commit }, productId) {
    try {
      const favorites = await this.$http.$delete(`/v1/favorite/${productId}`);
      commit('setFavorites', favorites);
    } catch (e) {
      console.error(e);
    }
  }
};

export const getters = {
  getCount: (state) => state.favorites?.list?.length
};
