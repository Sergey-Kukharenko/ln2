import { actionTree, mutationTree } from 'typed-vuex';

import type { OrderId, OrderResponse } from '~/@types/api/order';

export const state = () => ({
  orderDetails: {} as OrderResponse['data']
});

type OrderState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_ORDER(state, payload: OrderState['orderDetails']) {
    state.orderDetails = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchOrder({ commit }, id: OrderId) {
      try {
        const { data } = await this.app.$http.$get<OrderResponse>(`/v1/order/${id}/`);
        commit('SET_ORDER', data);
        return data;
      } catch (err) {
        console.error(err);
      }
    }
  }
);
