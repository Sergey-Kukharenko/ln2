import { actionTree, mutationTree } from 'typed-vuex';

import { ProfileOrderResponse } from '~/@types/api/profile-order';

export const state = () => ({
  order: {} as ProfileOrderResponse
});

type ProfileOrderState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_ORDER(state, payload: ProfileOrderState['order']) {
    state.order = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchOrder({ commit }) {
      try {
        const { data } = await this.app.$http.$get<ProfileOrderResponse>('/v1/order');
        commit('SET_ORDER', data);
      } catch (e) {
        console.error(e);
      }
    },

    cancelOrder(_, id) {
      try {
        return this.app.$http.$patch<ProfileOrderResponse>(`/v1/order/cancel/${id}`);
      } catch (e) {
        console.error(e);
      }
    }
  }
);
