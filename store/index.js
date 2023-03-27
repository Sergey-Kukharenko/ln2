import Vue from 'vue';
import { AUTH_WITHOUT_SMS_COOKIE } from '~/constants';

export const state = () => ({
  httpEndpointsCallStackMap: {}
});

export const actions = {
  async nuxtServerInit({ dispatch, state, commit }, { $cookies }) {
    const { token: newToken, exp_data: expData } = await dispatch('auth/fetchToken');
    $cookies.set('token', newToken, {
      expires: new Date(expData)
    });

    const { token } = state.auth;

    if (token || newToken) {
      try {
        await Promise.allSettled([
          dispatch('user/fetchUser'),
          dispatch('cart/fetchCart'),
          dispatch('favorites/fetchFavorites'),
          dispatch('layout/fetchLayout')
        ]);
      } catch (e) {
        console.error(e);
      }
    }

    const authWithoutSmsResponse = $cookies.get(AUTH_WITHOUT_SMS_COOKIE);

    if (authWithoutSmsResponse) {
      commit('auth/setState', { authStatus: true });
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
