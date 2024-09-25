import { actionTree, mutationTree } from 'typed-vuex';

import { ProfileOrdersResponse } from '~/@types/api/profile-orders';

export const state = () => ({
  orders: {} as ProfileOrdersResponse
});

type ProfileOrdersState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_ORDERS(state, payload: ProfileOrdersState['orders']) {
    state.orders = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    fetchOrders({ commit }) {
      try {
        // const { data } = await this.app.$http.$get<ProfileOrdersResponse>('/v1/user/history');
        // const orders = data.current;

        const data = {
          current: [
            {
              order_id: 1,
              img: 'https://d4-api.myfdev.work/media/images/offers/id10006/size50/long-1.webp',
              amount_prod: null,
              status: 'PACKED',
              date: null
            },
            {
              order_id: 2,
              img: 'https://d4-api.myfdev.work/media/images/offers/id10006/size50/long-1.webp',
              amount_prod: 2,
              status: 'DELIVERED',
              date: '10 june!'
            },
            {
              order_id: 3,
              img: 'https://d4-api.myfdev.work/media/images/offers/id10006/size50/long-1.webp',
              amount_prod: 2,
              status: 'DELIVERED',
              statusText: 'delivered',
              date: '5 may!'
            }
          ]
        };

        commit('SET_ORDERS', data);
      } catch (e) {
        console.error(e);
      }
    },

    // async deleteOrder({ commit }, payload) {
    //   try {
    //     const orders = await this.app.$http.$delete<ProfileOrdersResponse>(`/v1/order/${payload}`);
    //     commit('SET_ORDERS', orders);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // }

    // удалить
    deleteOrder({ state, commit }, orderId) {
      try {
        // const orders = await this.app.$http.$delete<ProfileOrdersResponse>(`/v1/order/${payload}`);
        // commit('SET_ORDERS', orders);

        const arr = state.orders.current;
        const filtered = arr.filter((item) => item.order_id !== orderId);

        const newOrders = {
          current: filtered
        };

        commit('SET_ORDERS', newOrders);
      } catch (e) {
        console.error(e);
      }
    }
  }
);
