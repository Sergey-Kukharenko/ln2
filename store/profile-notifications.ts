import { actionTree, mutationTree } from 'typed-vuex';

import type { NotificationsResponse } from '~/@types/api/notifications';

export const state = () => ({
  notifications: {} as NotificationsResponse
});

type NotificationsState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_NOTIFICATIONS(state, payload: NotificationsState['notifications']) {
    state.notifications = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchNotifications({ commit }) {
      try {
        const { data } = await this.app.$http.$get<NotificationsResponse>('/v1/subscriptions/');

        commit('SET_NOTIFICATIONS', data);
      } catch (e) {
        console.error(e);
      }
    },

    async updateNotifications({ commit }, payload) {
      try {
        const { data } = await this.app.$http.$put<NotificationsResponse>(`/v1/subscriptions/`, payload);

        commit('SET_NOTIFICATIONS', data);
      } catch (e) {
        console.error(e);
      }
    }
  }
);
