import Vue from 'vue';
import { AUTH_WITHOUT_SMS_COOKIE } from '~/constants';

export const state = () => ({
  httpEndpointsCallStackMap: {}
});

export const actions = {
  async nuxtServerInit({ dispatch, state, commit }, { $cookies }) {
    try {
      await dispatch('auth/fetchToken');

      await Promise.allSettled([
        dispatch('cart/fetchCart'),
        dispatch('favorites/fetchFavorites'),
        dispatch('layout/fetchLayout')
      ]);

      const authWithoutSmsResponse = $cookies.get(AUTH_WITHOUT_SMS_COOKIE);

      if (authWithoutSmsResponse) {
        commit('auth/setState', { authStatus: true });
      }
    } catch (e) {
      console.error(e);
    }
  }
};

export const mutations = {
  httpEndpointsCallStackHandler(state, endpoint) {
    if (process.server) {
      return;
    }

    if (state.httpEndpointsCallStackMap[endpoint]) {
      Vue.delete(state.httpEndpointsCallStackMap, endpoint);
    } else {
      // eslint-disable-next-line import/no-named-as-default-member
      Vue.set(state.httpEndpointsCallStackMap, endpoint, { [endpoint]: endpoint });
    }
  }
};

export const getters = {
  isLoadingHttp: (state) => (endpoint) => !!state.httpEndpointsCallStackMap[endpoint]
};
