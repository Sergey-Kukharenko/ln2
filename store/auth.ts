import { actionTree, getterTree, mutationTree } from 'typed-vuex';

import type { CheckVerificationCodeResponse, SendVerificationCodeResponse, SessionResponse } from '~/@types/api/auth';

import { AUTH_CODE_TIMER_STEP, EAuthComponents } from '~/constants/auth';
import {
  AUTH_REG_STEPS,
  AUTH_REG_TYPES,
  AUTH_SMS_COOKIE,
  AUTH_WITHOUT_SMS_COOKIE,
  TOKEN_REFRESH_ENDPOINT
} from '~/constants/index';

export const state = () => ({
  steps: {
    currStep: '',
    codeType: ''
  } as Record<string, string>,
  receiver: {
    phone: '',
    name: ''
  } as Record<string, string>,
  step: EAuthComponents.LOGIN as EAuthComponents,
  loading: false as boolean,
  sessionToken: null as SessionResponse['token'] | null,
  authToken: null as CheckVerificationCodeResponse['data']['token'] | null,
  authStatus: false as boolean,
  codeSeconds: 0 as number
});

type AuthState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_STEP(state, payload: EAuthComponents) {
    state.step = payload;
  },

  SET_RECEIVER(state, payload: AuthState['receiver'] = { phone: '', name: '' }) {
    state.receiver = payload;
  },

  SET_SESSION_TOKEN(state, payload: AuthState['sessionToken']) {
    state.sessionToken = payload;
  },

  SET_AUTH_TOKEN(state, payload: AuthState['authToken']) {
    state.authToken = payload;
  },

  SET_AUTH_STATUS(state, payload: AuthState['authStatus']) {
    state.authStatus = payload;
  },

  SET_LOADING(state, payload: AuthState['loading']) {
    state.loading = payload;
  },

  SET_CODE_SECONDS(state, payload: AuthState['codeSeconds']) {
    state.codeSeconds = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchSessionToken({ commit }) {
      try {
        const { token, exp_data: expData } = await this.app.$http.$get<SessionResponse>(TOKEN_REFRESH_ENDPOINT);

        const isDev = process.env.NODE_ENV !== 'production';

        commit('SET_SESSION_TOKEN', token);

        this.$cookies.set(process.env.sessionTokenField as string, token, {
          expires: new Date(expData),
          path: '/',
          ...(!isDev && {
            domain: process.env.sessionCookieDomain || '.myflowers.co.uk'
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
    },

    async sendVerificationCode({ commit }, payload) {
      try {
        commit('SET_LOADING', true);
        const {
          success,
          next_code_seconds_left: nextCodeSecondsLeft = 0,
          error = null
        } = await this.app.$http.$post<SendVerificationCodeResponse>('/v1/auth/send-verification-code/', payload);

        if (success) {
          commit('SET_CODE_SECONDS', nextCodeSecondsLeft * AUTH_CODE_TIMER_STEP);
        }

        return { success, message: error?.message || '' };
      } catch (err) {
        console.error(err);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async checkVerificationCode({ commit }, payload) {
      try {
        const isDev = process.env.NODE_ENV !== 'production';
        const { data, success } = await this.app.$http.$post<CheckVerificationCodeResponse>(
          '/v1/auth/check-verification-code/',
          payload
        );

        const { token, is_new_user: isNewUser } = data;

        // Сохраняем токен в куки, если он есть. Инициализируем статус авторизации
        commit('SET_AUTH_TOKEN', token);
        commit('SET_AUTH_STATUS', !!token);
        this.$cookies.set(AUTH_SMS_COOKIE, !!token);

        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);

        this.$cookies.set(process.env.authTokenField as string, token, {
          expires: expirationDate,
          path: '/',
          ...(!isDev && {
            domain: process.env.authCookieDomain || '.myflowers.co.uk'
          })
        });

        return { success, isNewUser };
      } catch (err) {
        console.error(err);
        return false;
      }
    },

    logout({ commit }) {
      try {
        this.app.$http.$get('/v1/user/logout/');
        this.app.$cookies.remove(AUTH_SMS_COOKIE);
        commit('SET_AUTH_TOKEN', false);
        commit('SET_AUTH_STATUS', false);
      } catch (err) {
        console.error(err);
      }
    }
  }
);

export const getters = getterTree(state, {
  currStep: (state) => state.steps.currStep || AUTH_REG_STEPS.auth.component,
  codeType: (state) => state.steps.codeType || AUTH_REG_TYPES[0],
  receiver: (state) => state.receiver,
  phoneMask: (state) => state.receiver.phone.replace(/\d/g, '#'),
  isAuthorized: (state) => state.authStatus
});
