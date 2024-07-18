import { actionTree, getterTree, mutationTree } from 'typed-vuex';

import { OUR_COOKIE } from '~/constants';

export const state = () => ({
  cookie: null as boolean | null
});

export const mutations = mutationTree(state, {
  SET_COOKIE(state, payload: boolean) {
    state.cookie = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    addCookie({ commit }, payload: boolean) {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      this.app.$cookies.set(OUR_COOKIE, true, { expires: date });
      commit('SET_COOKIE', payload);
    }
  }
);

export const getters = getterTree(state, {
  getCookie: (state) => state.cookie
});
