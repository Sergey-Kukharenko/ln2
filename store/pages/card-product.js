import { CONSTRUCTOR_TOOLTIP } from '~/constants';

export const state = () => ({
  similarBouquets: {},
  recentlyViewed: {},
  popularCategoriesItems: {},
  cardConstructorActiveColor: null,
  cardConstructorActiveCount: null,
  cardConstructorActiveType: null,
  cardProductSettings: {}
});

export const mutations = {
  setField(state, { name, value }) {
    state[name] = value;
  },

  setProductSettings(state, payload) {
    state.cardProductSettings = {
      ...payload,
      ...payload?.settings,
      flowerColor: payload?.flower_color,
      flowerCount: payload?.flower_count,
      tooltip: CONSTRUCTOR_TOOLTIP
    };
  }
};

export const actions = {
  async fetchCardProduct({ commit }, path) {
    try {
      const { data } = await this.$http.$get(`/v1${path}/`);
      commit('setProductSettings', data);
    } catch (err) {
      console.error(err);
    }
  },

  async fetchCardProductPage({ dispatch }) {
    await Promise.all([
      // dispatch('fetchSimilarBouquets'),
      dispatch('fetchRecentlyWatched'),
      dispatch('fetchPopularCategoriesItems')
    ]);
  },

  async fetchSimilarBouquets({ commit }) {
    try {
      const similarBouquets = await this.$http.$get('/v1/similar-bouquets/');
      commit('setField', { name: 'similarBouquets', value: similarBouquets });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchRecentlyWatched({ commit }) {
    try {
      const recentlyViewed = await this.$http.$get('/v1/filter/recently-viewed/');
      commit('setField', { name: 'recentlyViewed', value: recentlyViewed });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchPopularCategoriesItems({ commit }) {
    try {
      const popularCategoriesItems = await this.$http.$get('/v1/popular-categories-items/');
      commit('setField', { name: 'popularCategoriesItems', value: popularCategoriesItems });
    } catch (e) {
      console.error(e);
    }
  }
};

export const getters = {
  // getSimilarBouquets: (state) => state.similarBouquets,
  getRecentlyViewed: (state) => state.recentlyViewed,
  getPopularCategoriesItems: (state) => state.popularCategoriesItems
};
