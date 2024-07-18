import { actionTree, getterTree, mutationTree } from 'typed-vuex';

import type { SessionResponse } from '~/@types/api/auth';

import { AUTH_REG_STEPS, AUTH_REG_TYPES, AUTH_WITHOUT_SMS_COOKIE, TOKEN_REFRESH_ENDPOINT } from '~/constants/index';

export const state = () => ({
  steps: {
    currStep: '',
    codeType: ''
  } as Record<string, string>,
  receiver: '' as string,
  token: null as SessionResponse['token'] | null,
  authStatus: false as boolean
});

type AuthState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_CURR_STEP(state, payload: string) {
    state.steps.currStep = payload;
  },

  SET_CODE_TYPE(state, payload: string) {
    state.steps.codeType = payload;
  },

  SET_RECEIVER(state, payload: AuthState['receiver']) {
    state.receiver = payload;
  },

  SET_TOKEN(state, payload: AuthState['token']) {
    state.token = payload;
  },

  SET_AUTH_STATUS(state, payload: AuthState['authStatus']) {
    state.authStatus = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchToken({ commit }) {
      try {
        const { token, exp_data: expData } = await this.app.$http.$get<SessionResponse>(TOKEN_REFRESH_ENDPOINT);

        const isDev = process.env.NODE_ENV !== 'production';

        commit('SET_TOKEN', token);

        this.$cookies.set(process.env.sessionTokenField as string, token, {
          expires: new Date(expData),
          path: '/',
          ...(!isDev && {
            domain: process.env.sessionCookieDomain || `.myflowers.co.uk`
          })
        });
      } catch (err) {
        console.error(err);
      }
    },

    async loginWithoutCode({ commit }, payload) {
      try {
        const response = await this.app.$http.$post('/v1/order/guest/assign/', payload);
        commit('SET_AUTH_STATUS', true);
        this.$cookies.set(AUTH_WITHOUT_SMS_COOKIE, true);
        return response;
      } catch (err) {
        console.error(err);
      }
    }

    // Временно скрыт (ниже заготовки для авторизации)
    // getOtp(_, payload) {
    // return this.app.$http.post('/auth', payload)
    // },

    // async login(_, payload) {
    //   try {
    //     const { success } = await this.app.$http.$post('/v1/user/login/', payload);

    //     return success;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },

    // async sendOtp(_, payload) {
    //   try {
    //     const otpRes = await this.app.$http.$post('/v1/auth/check-verification-code/', payload);

    //     return otpRes;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },

    // async logout({ commit }) {
    //   try {
    //     await this.app.$http.$get('/v1/user/logout/');
    //     commit('setState', { authStatus: false });
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
  }
);

export const getters = getterTree(state, {
  currStep: (state) => state.steps.currStep || AUTH_REG_STEPS.auth.component,
  codeType: (state) => state.steps.codeType || AUTH_REG_TYPES[0],
  receiver: (state) => state.receiver,
  phoneMask: (state) => (state.steps.codeType === AUTH_REG_TYPES[0] ? state.receiver.replace(/\d/g, '#') : ''),
  isAuthorized: (state) => state.authStatus
});
