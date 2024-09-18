import { actionTree, getterTree, mutationTree } from 'typed-vuex';

import { BANNER_COOKIE, OUR_COOKIE } from '~/constants';

export const state = () => ({
  cookie: null as boolean | null,
  bannerCookie: null as boolean | null
});

export const mutations = mutationTree(state, {
  SET_COOKIE(state, payload: boolean) {
    state.cookie = payload;
  },

  SET_BANNER_COOKIE(state, payload: boolean) {
    state.bannerCookie = payload;
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
    },

    addBannerCookie({ commit }, payload: boolean) {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      this.app.$cookies.set(BANNER_COOKIE, true, { expires: date });
      commit('SET_BANNER_COOKIE', payload);
    }
  }
);

export const getters = getterTree(state, {
  getCookie: (state) => state.cookie,
  getBannerCookie: (state) => state.bannerCookie
});
