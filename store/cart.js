import { EMPTY_CART_MAP } from '~/constants';
import { setState, useFixedSumByKey } from '~/helpers';

export const state = () => ({
  cart: EMPTY_CART_MAP,
  pending: false
});

export const mutations = {
  setCart(state, payload) {
    if (!payload) {
      state.cart = EMPTY_CART_MAP;
    }

    state.cart = payload;
  },

  setState
};

export const actions = {
  async fetchCart({ commit }) {
    try {
      const { data } = await this.$http.$get('/v1/basket/');
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
      const { data } = await this.$http.$post(`/v1/basket/${productId}/${positionSlug}`);
      commit('setCart', data);
    } catch (e) {
      console.error(e);
    } finally {
      commit('setState', { pending: false });
    }
  },

  async addToCartConstructor({ state, commit }, payload) {
    const isCartEmpty = !state.cart.positions.length;

    try {
      if (isCartEmpty) {
        commit('setState', { pending: true });
      }

      const { data } = await this.$http.$post('/v1/basket/constructor', payload);
      commit('setCart', data);
    } catch (e) {
      console.error(e);
    } finally {
      commit('setState', { pending: false });
    }
  },

  async removeFromCart({ commit }, { productId, positionSlug }) {
    try {
      const { data } = await this.$http.$delete(`/v1/basket/${productId}/${positionSlug}`);
      commit('setCart', data);
    } catch (e) {
      console.error(e);
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
  getDiscount: (state) => Number(state.cart.promo_code?.discount),
  isDiscountExist: (state) => Number(state.cart.promo_code?.discount) > 0
};
