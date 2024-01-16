import { setState } from '@/helpers';
import { AUTH_REG_STEPS, AUTH_REG_TYPES, AUTH_WITHOUT_SMS_COOKIE, TOKEN_REFRESH_ENDPOINT } from '~/constants/index';

export const state = () => ({
  steps: {
    currStep: '',
    codeType: ''
  },
  receiver: '',
  token: null,
  authStatus: false
});

export const mutations = {
  setState,

  setCurrStep(state, payload) {
    state.steps.currStep = payload;
  },

  setCodeType(state, payload) {
    state.steps.codeType = payload;
  },

  setReceiver(state, payload) {
    state.receiver = payload;
  },

  setToken(state, payload) {
    state.token = payload;
  }
};

export const actions = {
  async fetchToken({ commit }) {
    try {
      const { token, exp_data: expData } = await this.$http.$get(TOKEN_REFRESH_ENDPOINT);

      const isDev = process.env.NODE_ENV !== 'production';

      commit('setToken', token);

      this.$cookies.set(process.env.sessionTokenField, token, {
        expires: new Date(expData),
        path: '/',
        ...(!isDev && {
          domain: `.myflowers.co.uk`
        })
      });
    } catch (err) {
      console.error(err);
    }
  },

  // getOtp(_, payload) {
  // return this.$http.post('/auth', payload)
  // },

  async login(_, payload) {
    try {
      const { success } = await this.$http.$post('/v1/user/login/', payload);

      return success;
    } catch (err) {
      console.error(err);
    }
  },

  async loginWithoutCode({ commit }, payload) {
    try {
      const response = await this.$http.$post('/v1/order/guest/assign/', payload);
      commit('setState', { authStatus: true });
      this.$cookies.set(AUTH_WITHOUT_SMS_COOKIE, true);
      return response;
    } catch (err) {
      console.error(err);
    }
  },

  async sendOtp(_, payload) {
    try {
      const otpRes = await this.$http.$post('/v1/auth/check-verification-code/', payload);

      return otpRes;
    } catch (err) {
      console.error(err);
    }
  },

  async logout({ commit }) {
    try {
      await this.$http.$get('/v1/user/logout/');
      commit('setState', { authStatus: false });
    } catch (err) {
      console.error(err);
    }
  }
};

export const getters = {
  currStep: (state) => state.steps.currStep || AUTH_REG_STEPS.auth.component,
  codeType: (state) => state.steps.codeType || AUTH_REG_TYPES[0],
  receiver: (state) => state.receiver,
  phoneMask: (state) => (state.steps.codeType === AUTH_REG_TYPES[0] ? state.receiver.replace(/\d/g, '#') : ''),
  isAuthorized: (state) => state.authStatus
};
