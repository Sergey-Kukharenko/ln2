import { actionTree, mutationTree } from 'typed-vuex';

import { ProfileOrderResponse } from '~/@types/api/profile-order';

export const state = () => ({
  order: {} as ProfileOrderResponse
});

type ProfileOrderState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_ORDER(state, payload: ProfileOrderState['order']) {
    state.order = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    fetchOrder({ commit }) {
      try {
        // const {user} = await this.app.$http.$get<ProfileOrderResponse>('/v1/mobile-api/user');
        // const {order} = user;

        const order = {
          recipient: {
            name: 'Maria Sazontova',
            phone: '+7 (999) 123-45-67'
          },
          shippingAddress: {
            full_address: 'London, 15 Westferry Road, E14 8FQ',
            id: null,
            address1: 'London',
            address2: '15 Westferry Road',
            city: 'London',
            full_name: null,
            formatted: null,
            postal_code: 'E14 8FQ',
            latitude: 51.5026399,
            longitude: -0.02559,
            comment: null
          },
          interval: {
            date: '2024-08-08',
            time: '12:00 pm - 3:00 pm'
          },
          deliveryAmount: '11.00',
          status: 'PACKED',
          products: [
            {
              product_id: 254,
              name: 'Sparkle Bouquet',
              quantity: 1,
              price: '47.90',
              image: {
                ord: 1,
                alt_text: 'Sparkle Bouquet - featured image',
                filename: '1.webp',
                bouquetHeight: null
              }
            },
            {
              product_id: 210,
              name: 'Dairy Box Milk 162g',
              quantity: 1,
              price: '9.90',
              image: {
                ord: 1,
                alt_text: 'Dairy Box Milk 162g - featured image',
                filename: '1.webp',
                bouquetHeight: null
              }
            },
            {
              product_id: 144,
              name: 'Lindt Chocolate',
              quantity: 1,
              price: '14.90',
              image: {
                ord: 1,
                alt_text: 'Lindt Chocolate - featured image',
                filename: '1.webp',
                bouquetHeight: null
              }
            },
            {
              product_id: 354,
              name: '40 Pink Tulips',
              quantity: 1,
              price: '55.90',
              image: {
                ord: 1,
                alt_text: '40 Pink Tulips - featured image',
                filename: '1.webp',
                bouquetHeight: null
              }
            }
          ],
          id: '2352-083',
          payment_methods: {
            payment_type_id: 'card'
          },
          totalCost: '86',
          sale: {
            label: 'Sale',
            value: '- £ 8'
          }
        };

        commit('SET_ORDER', order);
      } catch (e) {
        console.error(e);
      }
    }
  }
);
