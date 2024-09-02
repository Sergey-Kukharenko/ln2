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
    fetchOrder({ commit }) {
      try {
        // const order = await this.app.$http.$get<ProfileOrderResponse>('/v1/mobile-api/user');

        const order = {
          order_id: 1,
          img: 'https://d4-api.myfdev.work/media/images/offers/id10006/size50/long-1.webp',
          amount_prod: null,
          status: 'PACKED',
          date: null
        };

        commit('SET_ORDER', order);
      } catch (e) {
        console.error(e);
      }
    }
  }
);
