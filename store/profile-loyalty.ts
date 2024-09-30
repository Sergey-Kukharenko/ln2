import { actionTree, mutationTree } from 'typed-vuex';

import type { LoyaltyResponse } from '~/@types/api/profile-loyalty';

export const state = () => ({
  loyalty: {} as LoyaltyResponse
});

type LoyaltyState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_LOYALTY(state, payload: LoyaltyState['loyalty']) {
    state.loyalty = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchLoyalty({ commit }) {
      try {
        const loyalty = await this.app.$http.$get<LoyaltyResponse>('/v1/loyalty/user');

        commit('SET_LOYALTY', loyalty);
      } catch (e) {
        console.error(e);
      }
    }
  }
);
