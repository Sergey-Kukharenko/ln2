import { actionTree, mutationTree } from 'typed-vuex';

import { PersonalResponse } from '~/@types/api/personal';

export const state = () => ({
  personal: {} as PersonalResponse
});

type PersonalState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_PERSONAL(state, payload: PersonalState['personal']) {
    state.personal = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    fetchPersonal({ commit }) {
      try {
        // const personal = await this.app.$http.$get<PersonalResponse>('/v1/mobile-api/user');

        const personal = {
          auth: true,
          real_id: 186352,
          user: {
            id: 'Dy6pLbl0RZobWPl1',
            name: 'John',
            phone: '79935653841',
            email: 'john@gmail.com',
            gender: 'male',
            birth: '22.02.1980',
            unfinished_orders_count: 1,
            favorites_count: 0,
            order: {
              id: 273765,
              status: 'PAYMENT',
              img: 'https://cdn.myflowers.co.uk/media/images/offers/id92/max/1.webp'
            }
          }
        };

        commit('SET_PERSONAL', personal);
      } catch (e) {
        console.error(e);
      }
    },

    updatePersonal({ commit }, payload) {
      try {
        // const personal = await this.app.$http.$post<PersonalResponse>(`/v1/mobile-api/user/personal-data/${payload}`);
        // commit('SET_PERSONAL', personal);
        commit('SET_PERSONAL', payload);
      } catch (e) {
        console.error(e);
      }
    },

    async deletePersonal({ commit }) {
      try {
        const personal = await this.app.$http.$delete<PersonalResponse>(`/v1/mobile-api/user/personal-data/`);
        commit('SET_PERSONAL', personal);
      } catch (e) {
        console.error(e);
      }
    }
  }
);
