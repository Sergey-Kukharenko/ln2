import { setState, useFixedSumByKey } from '@/helpers';

export const state = () => ({
  order: null
});

export const mutations = {
  setState
};

export const actions = {
  async fetchOrder({ commit }, id) {
    try {
      const { data } = await this.$axios.$get(`/order/${id}/`);
      commit('setState', { order: data });
    } catch (err) {
      console.error(err);
    }
  },

  async createOrder(_) {
    try {
      await this.$axios.$post(`/order/`);
    } catch (err) {
      console.error(err);
    }
  }
};

export const getters = {
  getCount: (state) => Number(useFixedSumByKey(state.order?.positions, 'quantity')),
  getOrder: (state) => state.order,
  orderPositions: (state) => state.order?.positions || [],
  orderSplittedPositions: (state) =>
    state.order?.positions.flatMap((e) => Array(e.quantity).fill({ ...e, quantity: 1 })) || []
};
