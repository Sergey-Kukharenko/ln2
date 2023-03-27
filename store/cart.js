import { setState, useArrayUniqueByKey, useCollectionUniqueByKey, useFixedSumByKey } from '~/helpers';

export const state = () => ({
  cart: [],
  pending: false
});

export const mutations = {
  setCart(state, payload) {
    state.cart = payload;
  },

  setState
};

export const actions = {
  async fetchCart({ commit }) {
    try {
      const { data } = await this.$axios.$get('/basket/');
      commit('setCart', data.positions);
    } catch (e) {
      console.error(e);
    }
  },

  async addToCart({ state, commit }, { productId, positionSlug }) {
    const isCartEmpty = !state.cart.length;

    try {
      if (isCartEmpty) {
        commit('setState', { pending: true });
      }
      const { data } = await this.$axios.$post(`/basket/${productId}/${positionSlug}`);
      commit('setCart', data.positions);
    } catch (e) {
      console.error(e);
    } finally {
      commit('setState', { pending: false });
    }
  },

  async removeFromCart({ commit }, { productId, positionSlug }) {
    try {
      const { data } = await this.$axios.$delete(`/basket/${productId}/${positionSlug}`);
      commit('setCart', data.positions);
    } catch (e) {
      console.error(e);
    }
  },

  setPromoCode(_, payload) {
    try {
      return this.$axios.$post('/basket/promocode', payload);
    } catch (err) {
      console.error(err);
    }
  }
};

export const getters = {
  getCount: (state) => state.cart?.length,
  isCartExist: (state) => !!state.cart?.length,
  cartPending: (state) => state.pending,
  getPrice: (state) => useFixedSumByKey(state.cart, 'price', 2),
  getUniqueCollection: (state) => useCollectionUniqueByKey(state.cart, ['offer_id', 'title']),
  getUniqueArray: (state) => useArrayUniqueByKey(state.cart, ['offer_id', 'title']),
  getUniqueCount: (state, getter) => getter.getUniqueArray?.length
};
