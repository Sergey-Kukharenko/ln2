function isExistFieldInState({ state, field }) {
  try {
    if (typeof state[field] !== 'object' || state[field] === null) {
      throw new TypeError('State field is type error');
    }

    if (Array.isArray(state[field])) {
      return !!state[field].length;
    }

    return !!Object.keys(state[field]).length;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export const state = () => ({
  promotions: [],
  popularCategories: [],
  bestBouquets: {},
  recipient: {},
  specialOffers: {},
  reviews: [],
  underPounds: {},
  shopByPrice: {},
  baseRoses: {},
  trendyBouquets: {},
  benefits: [],
  pickBouquet: {},
  faq: [],
  info: {}
});

export const mutations = {
  setField(state, { name, value }) {
    state[name] = value;
  }
};

export const actions = {
  async fetchMainPageServerSide({ dispatch }) {
    const PAGE_LIMIT = this.$device.isMobileOrTablet ? 6 : 7;

    await Promise.all([
      dispatch('fetchPromotions'),
      dispatch('fetchPopularCategories'),
      dispatch('fetchRecipient'),
      dispatch('fetchSpecialOffers', PAGE_LIMIT),
      dispatch('fetchUnderPounds', PAGE_LIMIT),
      dispatch('fetchShopByPrice'),
      dispatch('fetchBasedRoses', PAGE_LIMIT),
      dispatch('fetchTrendyBouquets', PAGE_LIMIT)
    ]);
  },

  async fetchMainPageClientSide({ dispatch }) {
    await Promise.all([
      dispatch('fetchBestBouquets'),
      dispatch('fetchReviews'),
      dispatch('fetchBenefits'),
      dispatch('fetchPickBouquet'),
      dispatch('fetchFaq'),
      dispatch('fetchInfo')
    ]);
  },

  async fetchPromotions({ commit, state }) {
    if (isExistFieldInState({ state, field: 'promotions' })) {
      return;
    }

    try {
      const promotions = await this.$axios.$get('/promotions/');
      commit('setField', { name: 'promotions', value: promotions });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchPopularCategories({ commit, state }) {
    if (isExistFieldInState({ state, field: 'popularCategories' })) {
      return;
    }

    try {
      const popularCategories = await this.$axios.$get('/popular-categories/');
      commit('setField', { name: 'popularCategories', value: popularCategories });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchBestBouquets({ commit, state }) {
    if (isExistFieldInState({ state, field: 'bestBouquets' })) {
      return;
    }

    try {
      const params = {
        limit: 4
      };
      const bestBouquets = await this.$axios.$get('filter/best-sellers', { params });
      commit('setField', { name: 'bestBouquets', value: bestBouquets });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchRecipient({ commit, state }) {
    if (isExistFieldInState({ state, field: 'recipient' })) {
      return;
    }

    try {
      const recipient = await this.$axios.$get('/recipient/');
      commit('setField', { name: 'recipient', value: recipient });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchSpecialOffers({ commit, state }, limit) {
    if (isExistFieldInState({ state, field: 'specialOffers' })) {
      return;
    }

    try {
      const params = {
        limit
      };

      const specialOffers = await this.$axios.$get('/filter/special-offers/', { params });

      commit('setField', { name: 'specialOffers', value: specialOffers });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchReviews({ commit, state }) {
    if (isExistFieldInState({ state, field: 'reviews' })) {
      return;
    }

    try {
      const reviews = await this.$axios.$get('/reviews/');
      commit('setField', { name: 'reviews', value: reviews });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchUnderPounds({ commit, state }, limit) {
    if (isExistFieldInState({ state, field: 'underPounds' })) {
      return;
    }

    try {
      const params = {
        limit
      };
      const underPounds = await this.$axios.$get('/filter/under-ps25/', { params });
      commit('setField', { name: 'underPounds', value: underPounds });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchShopByPrice({ commit, state }) {
    if (isExistFieldInState({ state, field: 'shopByPrice' })) {
      return;
    }

    try {
      const shopByPrice = await this.$axios.$get('/shop-by-price/');
      commit('setField', { name: 'shopByPrice', value: shopByPrice });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchBasedRoses({ commit, state }, limit) {
    if (isExistFieldInState({ state, field: 'baseRoses' })) {
      return;
    }

    try {
      const params = {
        limit
      };
      const baseRoses = await this.$axios.$get('/category/roses/', { params });
      commit('setField', { name: 'baseRoses', value: baseRoses });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchTrendyBouquets({ commit, state }, limit) {
    if (isExistFieldInState({ state, field: 'trendyBouquets' })) {
      return;
    }

    try {
      const params = {
        limit
      };
      const trendyBouquets = await this.$axios.$get('/filter/trendy-bouquets/', { params });
      commit('setField', { name: 'trendyBouquets', value: trendyBouquets });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchBenefits({ commit, state }) {
    if (isExistFieldInState({ state, field: 'benefits' })) {
      return;
    }

    try {
      const benefits = await this.$axios.$get('/benefits/');
      commit('setField', { name: 'benefits', value: benefits });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchPickBouquet({ commit, state }) {
    if (isExistFieldInState({ state, field: 'pickBouquet' })) {
      return;
    }

    try {
      const pickBouquet = await this.$axios.$get('/pick-bouquet/');
      commit('setField', { name: 'pickBouquet', value: pickBouquet });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchFaq({ commit, state }) {
    if (isExistFieldInState({ state, field: 'faq' })) {
      return;
    }

    try {
      const faq = await this.$axios.$get('/faq/');
      commit('setField', { name: 'faq', value: faq });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchInfo({ commit, state }) {
    if (isExistFieldInState({ state, field: 'info' })) {
      return;
    }

    try {
      const info = await this.$axios.$get('/info/');
      commit('setField', { name: 'info', value: info });
    } catch (e) {
      console.error(e);
    }
  }
};

export const getters = {
  getPromotions: (state) => state.promotions,
  getPopularCategories: (state) => state.popularCategories,
  getBestBouquets: (state) => state.bestBouquets,
  getRecipient: (state) => state.recipient,
  getSpecialOffers: (state) => state.specialOffers,
  getReviews: (state) => state.reviews,
  getUnderPounds: (state) => state.underPounds,
  getShopByPrice: (state) => state.shopByPrice,
  getBaseRoses: (state) => state.baseRoses,
  getTrendyBouquets: (state) => state.trendyBouquets,
  getBenefits: (state) => state.benefits,
  getPickBouquet: (state) => state.pickBouquet,
  getFaq: (state) => state.faq,
  getInfo: (state) => state.info
};
