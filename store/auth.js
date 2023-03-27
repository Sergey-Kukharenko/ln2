import { setState } from '@/helpers';
import { AUTH_REG_STEPS, AUTH_REG_TYPES, AUTH_WITHOUT_SMS_COOKIE } from '~/constants/index';

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
      const res = await this.$axios.$get('/session/');
      const { token } = res;
      commit('setToken', token);

      return res;
    } catch (err) {
      console.error(err);
    }
  },

  // getOtp(_, payload) {
  // return this.$axios.post('/auth', payload)
  // },

  async login(_, payload) {
    try {
      const { success } = await this.$axios.$post('/user/login/', payload);

      return success;
    } catch (err) {
      console.error(err);
    }
  },

  async loginWithoutCode({ commit }, payload) {
    try {
      const response = await this.$axios.$post('/order/guest/assign/', payload);
      commit('setState', { authStatus: true });
      this.$cookies.set(AUTH_WITHOUT_SMS_COOKIE, true);
      return response;
    } catch (err) {
      console.error(err);
    }
  },

  async sendOtp(_, payload) {
    try {
      const otpRes = await this.$axios.$post('/auth/check-verification-code/', payload);

      return otpRes;
    } catch (err) {
      console.error(err);
    }
  },

  async logout({ commit }) {
    try {
      await this.$axios.$get('/user/logout/');
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
