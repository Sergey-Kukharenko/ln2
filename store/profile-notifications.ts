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
        const res = await this.app.$http.$get<NotificationsResponse>('/v1/subscriptions/');
        const { data } = await this.app.$http.$get<NotificationsResponse>('/v1/subscriptions/');

        // const notifications = {
        //   success: true,
        //   data: {
        //     email: null,
        //     email_subscription: false,
        //     sms_subscription: true,
        //     push_subscription: true
        //   }
        // };
        //
        // const { data } = notifications;

        console.log('=============');
        console.log(res);
        console.log('=============');

        commit('SET_NOTIFICATIONS', data);
      } catch (e) {
        console.error(e);
      }
    },

    async updateNotifications({ commit }, payload) {
      try {
        const data = await this.app.$http.$put<NotificationsResponse>(`/v1/subscriptions/`, payload);

        console.log(data);
        console.log('=============');
        console.log(data);
        console.log('=============');

        commit('SET_NOTIFICATIONS', payload);
      } catch (e) {
        console.error(e);
      }
    }
  }
);
