import { actionTree, mutationTree } from 'typed-vuex';

import { ProfileOrdersResponse } from '~/@types/api/profile-orders';

export const state = () => ({
  orders: {} as ProfileOrdersResponse
});

type ProfileOrdersState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_ORDERS(state, payload: ProfileOrdersState['orders']) {
    state.orders = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchOrders({ commit }) {
      try {
        const { data } = await this.app.$http.$get<ProfileOrdersResponse>('/v1/user/history');

        commit('SET_ORDERS', data);
      } catch (e) {
        console.error(e);
      }
    },

    async deleteOrder({ commit }, id) {
      try {
        const { data } = await this.app.$http.$delete<ProfileOrdersResponse>(`/v1/order/delete/${id}`);

        commit('SET_ORDERS', data);
      } catch (e) {
        console.error(e);
      }
    }
  }
);
