export const actions = {
  sendLog(_, payload) {
    return this.$http.$post('/v1/log/', payload);
  },

  // Home page - start
  async fetchConstructorBouquets({ commit }) {
    try {
      const constructorBouquets = await this.$http.$get('/v1/main-page/constructor-block/');
      commit('setField', { name: 'constructorBouquets', value: constructorBouquets });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchPromotions({ commit }) {
    try {
      const promotions = await this.$http.$get('/v1/promotions/');
      commit('setField', { name: 'promotions', value: promotions });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchBestBouquets({ commit }) {
    try {
      const params = {
        limit: 4
      };
      const bestBouquets = await this.$http.$get('/v1/filter/best-sellers', { params });
      commit('setField', { name: 'bestBouquets', value: bestBouquets });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchRecipient({ commit }) {
    try {
      const recipient = await this.$http.$get('/v1/recipient/');
      commit('setField', { name: 'recipient', value: recipient });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchReviews({ commit }) {
    try {
      const reviews = await this.$http.$get('/v1/reviews/');
      commit('setField', { name: 'reviews', value: reviews });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchShopByPrice({ commit }) {
    try {
      const shopByPrice = await this.$http.$get('/v1/shop-by-price/');
      commit('setField', { name: 'shopByPrice', value: shopByPrice });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchBenefits({ commit }) {
    try {
      const benefits = await this.$http.$get('/v1/benefits/');
      commit('setField', { name: 'benefits', value: benefits });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchPickBouquet({ commit }) {
    try {
      const pickBouquet = await this.$http.$get('/v1/pick-bouquet/');
      commit('setField', { name: 'pickBouquet', value: pickBouquet });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchFaq({ commit }) {
    try {
      const faq = await this.$http.$get('/v1/faq/');
      commit('setField', { name: 'faq', value: faq });
    } catch (e) {
      console.error(e);
    }
  },

  async fetchInfo({ commit }) {
    try {
      const info = await this.$http.$get('/v1/info/');
      commit('setField', { name: 'info', value: info });
    } catch (e) {
      console.error(e);
    }
  },
  // Home page - end

  // Checkout - start
  async fetchPaidCheckout({ commit }) {
    try {
      const { data } = await this.$http.$get('/v1/order/payment/paid/');
      commit('setState', { isPaid: data?.success ?? false });
    } catch (err) {
      console.error(err);
    }
  }
  // Checkout - end
};
