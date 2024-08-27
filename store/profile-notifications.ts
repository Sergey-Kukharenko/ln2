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
    fetchNotifications({ commit }) {
      try {
        // const notifications = await this.app.$http.$get<NotificationsResponse>('/v1/mobile-api/subscriptions/');

        const notifications = {
          success: true,
          data: {
            email: null,
            email_subscription: false,
            sms_subscription: true,
            push_subscription: true
          }
        };

        const { data } = notifications;

        commit('SET_NOTIFICATIONS', data);
      } catch (e) {
        console.error(e);
      }
    },

    async updateNotifications({ commit }, payload) {
      try {
        const notifications = await this.app.$http.$put<NotificationsResponse>(
          `/v1/mobile-api/subscriptions/${payload}`
        );
        commit('SET_NOTIFICATIONS', notifications);
      } catch (e) {
        console.error(e);
      }
    }
  }
);
