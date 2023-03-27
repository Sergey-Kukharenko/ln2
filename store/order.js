import { setState, useArrayUniqueByKey, useCollectionUniqueByKey } from '@/helpers';

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
  }
};

export const getters = {
  getOrder: (state) => state.order,
  getUniqueCollection: (state) => useCollectionUniqueByKey(state.order.positions, ['offer_id', 'title']),
  getUniqueArray: (state) => useArrayUniqueByKey(state.order.positions, ['offer_id', 'title']),
  getUniqueCount: (state, getter) => getter.getUniqueArray?.length
};
