import { OUR_COOKIE } from '~/constants';

export const state = () => ({
  cookie: null
});

export const mutations = {
  setCookie(state, payload) {
    state.cookie = payload;
  }
};

export const actions = {
  addCookie({ commit }, payload) {
    this.$cookies.set(OUR_COOKIE, true);
    commit('setCookie', payload);
  }
};

export const getters = {
  getCookie: (state) => state.cookie
};
