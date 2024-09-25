import { actionTree, getterTree, mutationTree } from 'typed-vuex';

import type { Recipient, SearchHistory, Subscribe, UserResponse } from '~/@types/api/user';

import { setState, useObjectNotEmpty } from '@/helpers';
import SEARCH_HISTORY_MOCK from '~/mocks/search';

export const state = () => ({
  searchHistory: SEARCH_HISTORY_MOCK as SearchHistory[],
  user: { name: '', phone: '', email: '' } as UserResponse['user'] | null,
  recipient: null as Recipient | null
});

type UserState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  setState,

  SET_USER(state, payload: UserState['user']) {
    state.user = payload;
  },

  ADD_TO_HISTORY(state, payload: SearchHistory) {
    state.searchHistory.push(payload);
  },

  REMOVE_FROM_HISTORY(state, payload: SearchHistory) {
    state.searchHistory.splice(state.searchHistory.indexOf(payload), 1);
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchUser({ commit }) {
      try {
        const userData = await this.app.$http.$get<UserResponse>('/v1/user/');
        const { auth: isAuth = false, ...userProps } = userData;
        console.log('===========');
        console.log(userData);
        console.log('===========');
        if (isAuth) {
          commit('SET_USER', userProps.user);
          commit('auth/SET_AUTH_STATUS', isAuth, { root: true });
        }
      } catch (err) {
        console.error(err);
      }
    },

    async fetchUserSubscribe() {
      try {
        const { data } = await this.app.$http.$get<ApiResponse<Subscribe>>('/v1/user/subscribe/');

        return data;
      } catch (err) {
        console.error(err);
      }
    },

    sendUserSubscribe(_, payload: Subscribe) {
      try {
        return this.app.$http.$post<ApiResponse<null>>(`/v1/user/subscribe/`, payload);
      } catch (err) {
        console.error(err);
      }
    },

    unsubscribeFromSMS(_, payload: { userId: string }) {
      return this.app.$http.$post<ApiResponse<null>>(`/v1/subscriptions/sms/unsubscribe/`, payload);
    },

    async setUserPersonalData(_, payload) {
      try {
        const { success, message } = await this.app.$http.$post<ApiResponse<null>>('/v1/user/personal-data/', payload);
        return { success, message: message || '' };
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async setUserSubscriptions(_, payload) {
      try {
        const { success } = await this.app.$http.$put<ApiResponse<null>>('/v1/subscriptions/', payload);
        return { success };
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
);

export const getters = getterTree(state, {
  state: (state) => state,
  getUserData: (state) => state.user ?? {},
  getSearchHistory: (state) => state.searchHistory,
  getRecipient: (state) => state.recipient,
  isUserData: (state) => useObjectNotEmpty(state.user)
});
