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
        // const res = await this.app.$http.$get<ProfileOrderResponse>('/v1/order');
        // console.log('=========');
        // console.log(res);
        // console.log('=========');
        // const {order} = user;

        const data = {
          object: 'Order',
          id: '2352-083',
          real_id: '2352-083',
          real_user_id: 175567,

          self_recipient: false,

          total_cost: '86',
          delivery_amount: '11.00',
          positions_cost: '128.60',
          cashback: '0.00',
          currency: 'GBP',
          shipping_address: {
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
          comment: null,
          fast_delivery: 0,
          interval: {
            date: '2024-08-08',
            time: '12:00 pm - 3:00 pm'
          },
          clarify_address: false,
          promo_code: {
            code: '',
            discount: '1.30'
          },
          is_paid: false,
          payment_id: null,
          gift: null,
          delivery_type: 'COURIER',
          has_google_ads_fired: false,

          status: 'PACKED',
          recipient: {
            name: 'Maria Sazontova',
            phone: '+7 (999) 123-45-67'
          },
          delivery: {
            delivery_address: 'London, 15 Westferry Road, E14 8FQ',
            delivery_date: '2024-08-08',
            delivery_time: '12:00 pm - 3:00 pm'
          },
          payment_methods: 'card',
          positions: [
            {
              offer_id: 'O9apoVGyLz5qNX4K',
              offer_real_id: 254,
              offer_title: 'Sparkle Bouquet',
              title: 'Small',
              slug: 'small',
              price: '66.90',
              image: {
                ord: 1,
                alt_text: 'Sparkle Bouquet - featured image',
                filename: '1.webp',
                bouquetHeight: null
              },
              external_keys: {
                stripe: null
              },
              is_paid: false,
              payment_id: null,
              base_category_name: 'Spray roses',
              is_bouquet: true,
              quantity: 1,
              height: null,
              package: null,
              policy_id: 1,
              gift_card_text: 'ssa',
              old_price: null,
              discount: null
            },
            {
              offer_id: 'O9apoVGyLz5qNX41K',
              offer_real_id: 210,
              offer_title: 'Dairy Box Milk 162g',
              title: 'Small',
              slug: 'small',
              price: '9.90',
              image: {
                ord: 1,
                alt_text: 'Dairy Box Milk 162g - featured image',
                filename: '1.webp',
                bouquetHeight: null
              },
              external_keys: {
                stripe: null
              },
              is_paid: false,
              payment_id: null,
              base_category_name: 'Spray roses',
              is_bouquet: true,
              quantity: 1,
              height: null,
              package: null,
              policy_id: 1,
              gift_card_text: 'ssa',
              old_price: null,
              discount: null
            },
            {
              offer_id: 'O9apoVGdyLz5qNX41K',
              offer_real_id: 144,
              offer_title: 'Lindt Chocolate',
              title: 'Small',
              slug: 'small',
              price: '14.90',
              image: {
                ord: 1,
                alt_text: 'Lindt Chocolate - featured image',
                filename: '1.webp',
                bouquetHeight: null
              },
              external_keys: {
                stripe: null
              },
              is_paid: false,
              payment_id: null,
              base_category_name: 'Spray roses',
              is_bouquet: true,
              quantity: 1,
              height: null,
              package: null,
              policy_id: 1,
              gift_card_text: 'ssa',
              old_price: null,
              discount: null
            },
            {
              offer_id: 'O9aposVGdyLz5qNX41K',
              offer_real_id: 354,
              offer_title: '40 Pink Tulips',
              title: 'Small',
              slug: 'small',
              price: '55.90',
              image: {
                ord: 1,
                alt_text: '40 Pink Tulips - featured image',
                filename: '1.webp',
                bouquetHeight: null
              },
              external_keys: {
                stripe: null
              },
              is_paid: false,
              payment_id: null,
              base_category_name: 'Spray roses',
              is_bouquet: true,
              quantity: 1,
              height: null,
              package: null,
              policy_id: 1,
              gift_card_text: 'ssa',
              old_price: null,
              discount: null
            }
          ]
        };

        commit('SET_ORDER', data);
      } catch (e) {
        console.error(e);
      }
    }
  }
);
