import { setState } from '@/helpers';

export const state = () => ({
  orderDetails: null
});

export const mutations = {
  setState
};

export const actions = {
  async fetchOrder({ commit }, id) {
    try {
      const { data } = await this.$http.$get(`/v1/order/${id}/`);
      commit('setState', { orderDetails: data });
      return data;
    } catch (err) {
      console.error(err);
    }
  },

  createOrder(_) {
    try {
      return this.$http.$post(`/v1/order/`);
    } catch (err) {
      console.error(err);
    }
  }
};
