import { setState, useFixedSumByKey } from '~/helpers';

export const state = () => ({
  cart: {
    positions: [],
    promo_code: { code: '', discount: '' },
    position_cost: '',
    total_cost: ''
  },
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
      commit('setCart', data);
    } catch (e) {
      console.error(e);
    }
  },

  async addToCart({ state, commit }, { productId, positionSlug }) {
    const isCartEmpty = !state.cart.positions.length;

    try {
      if (isCartEmpty) {
        commit('setState', { pending: true });
      }
      const { data } = await this.$axios.$post(`/basket/${productId}/${positionSlug}`);
      commit('setCart', data);
    } catch (e) {
      console.error(e);
    } finally {
      commit('setState', { pending: false });
    }
  },

  async removeFromCart({ commit }, { productId, positionSlug }) {
    try {
      const { data } = await this.$axios.$delete(`/basket/${productId}/${positionSlug}`);
      commit('setCart', data);
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
  getCount: (state) => Number(useFixedSumByKey(state.cart?.positions, 'quantity')),
  getCart: (state) => state.cart?.positions,
  isCartExist: (state) => !!state.cart?.positions?.length,
  cartPending: (state) => state.pending,
  getCost: (state) => state.cart.position_cost,
  getTotal: (state) => state.cart.total_cost,
  getDiscount: (state) => Number(state.cart.promo_code.discount),
  isDiscountExist: (state) => Number(state.cart.promo_code.discount) > 0
};
