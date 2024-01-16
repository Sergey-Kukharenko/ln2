import { MAIN_PAGE_LIMIT } from '~/constants';

export const state = () => ({
  specialOffers: {},
  underPounds: {},
  baseRoses: {},
  newBouquets: {},
  trendyBouquets: {}
});

export const mutations = {
  setField(state, { name, value }) {
    state[name] = value;
  }
};

export const actions = {
  async fetchMainPageServerSide({ dispatch }) {
    await Promise.allSettled([
      dispatch('fetchSpecialOffers'),
      dispatch('fetchUnderPounds'),
      dispatch('fetchBasedRoses'),
      dispatch('fetchNewBouquets'),
      dispatch('fetchTrendyBouquets')
    ]);
  },

  // fetchMainPageClientSide() {
  // Возможно запросы с клиента еще будут
  // },

  async fetchPopularCategories({ commit }) {
    try {
      const popularCategories = await this.$http.$get('/v1/popular-categories/');
      commit('setField', { name: 'popularCategories', value: popularCategories });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchSpecialOffers({ commit }, limit) {
    try {
      const params = {
        limit: MAIN_PAGE_LIMIT
      };

      const specialOffers = await this.$httpSSRCache({
        scope: 'home',
        field: 'specialOffers',
        url: '/v1/filter/special-offers/',
        payload: { params }
      });

      commit('setField', { name: 'specialOffers', value: specialOffers });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchUnderPounds({ commit }, limit) {
    try {
      const params = {
        limit: MAIN_PAGE_LIMIT
      };
      const underPounds = await this.$httpSSRCache({
        scope: 'home',
        field: 'underPounds',
        url: '/v1/filter/under-ps30/',
        payload: { params }
      });

      commit('setField', { name: 'underPounds', value: underPounds });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchBasedRoses({ commit }, limit) {
    try {
      const params = {
        limit: MAIN_PAGE_LIMIT
      };
      const baseRoses = await this.$httpSSRCache({
        scope: 'home',
        field: 'baseRoses',
        url: '/v1/category/roses/',
        payload: { params }
      });

      commit('setField', { name: 'baseRoses', value: baseRoses });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchNewBouquets({ commit }, limit) {
    try {
      const params = {
        limit: MAIN_PAGE_LIMIT
      };
      const newBouquets = await this.$httpSSRCache({
        scope: 'home',
        field: 'newBouquets',
        url: '/v1/category/new-bouquets/',
        payload: { params }
      });

      commit('setField', { name: 'newBouquets', value: newBouquets });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchTrendyBouquets({ commit }, limit) {
    try {
      const params = {
        limit: MAIN_PAGE_LIMIT
      };
      const trendyBouquets = await this.$httpSSRCache({
        scope: 'home',
        field: 'trendyBouquets',
        url: '/v1/filter/trendy-bouquets/',
        payload: { params }
      });
      commit('setField', { name: 'trendyBouquets', value: trendyBouquets });
    } catch (e) {
      console.error(e);
    }
  }
};
