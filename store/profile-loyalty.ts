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
    fetchLoyalty({ commit }) {
      try {
        // const data = await this.app.$http.$get<LoyaltyResponse>('/v1/loyalty/user');

        const data = {
          cashback: '5%',
          price: '15',
          type: 'SILVER',
          level: '£ 10 / 29.9 pounds left to the next level',
          description: 'Make a collective purchase of £ 29.9 and upgrade your package to “Gold”.',
          title: 'Bonus account history',

          list: [
            {
              title: 'Receiving a sweet gift',
              description: null,
              decrement: null,
              increment: null,
              expirationDate: null,
              date: '12.12.24'
            },
            {
              title: 'Free shipping',
              description: null,
              decrement: null,
              increment: null,
              expirationDate: null,
              date: '11.12.24'
            },
            {
              title: 'Deduction',
              description: 'Order #123234 from 12.12.24',
              decrement: '- £ 5',
              increment: null,
              expirationDate: null,
              date: '12.12.24'
            },
            {
              title: 'Accrual',
              description: 'Order #123234 from 12.12.24',
              decrement: null,
              increment: '+ £ 3',
              expirationDate: '12.12.25',
              date: '12.12.24'
            }
          ]
        };

        commit('SET_LOYALTY', data);
      } catch (e) {
        console.error(e);
      }
    }
  }
);
