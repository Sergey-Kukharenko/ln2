import { actionTree, getterTree, mutationTree } from 'typed-vuex';

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
    async fetchPersonal({ commit }) {
      try {
        const personal = await this.app.$http.$get<PersonalResponse>('/v1/user');
        commit('SET_PERSONAL', personal);
      } catch (e) {
        console.error(e);
      }
    },

    async updatePersonal({ commit }, payload) {
      try {
        const personal = await this.app.$http.$post<PersonalResponse>('/v1/user/personal-data/', payload);
        commit('SET_PERSONAL', personal);
      } catch (e) {
        console.error(e);
      }
    },

    async deletePersonal({ commit }) {
      try {
        const personal = await this.app.$http.$delete<PersonalResponse>(`/v1/user/personal-data/`);
        commit('SET_PERSONAL', personal);
      } catch (e) {
        console.error(e);
      }
    }
  }
);

export const getters = getterTree(state, {
  personalUser: (state) => state.personal?.user,
  personalOrder: (state) => state.personal?.user?.order
});
