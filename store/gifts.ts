import { actionTree, getterTree, mutationTree } from 'typed-vuex';

import type { GiftCardResponse } from '~/@types/api/gift-cards';
import type { GiftsResponse } from '~/@types/api/gifts';

// const giftCards = {
//   success: true,
//   data: {
//     list: [
//       {
//         id: 'xOpZowoyPZGmjKqd',
//         real_id: 20001,
//         title: 'Without reason',
//         description: 'Without reason',
//         img: '1.webp',
//         slug: 'without-reason-20001',
//         rating: '5.00',
//         price: '2.99',
//         type_name: 'Gift-card'
//       },
//       {
//         id: 'bPW7awNNxdwl83LD',
//         real_id: 20002,
//         title: 'Without reason',
//         description: 'Without reason',
//         img: '1.webp',
//         slug: 'without-reason-20002',
//         rating: '5.00',
//         price: '2.99',
//         type_name: 'Gift-card'
//       },
//       {
//         id: 'YOxlpzRWJBGrX3gD',
//         real_id: 20003,
//         title: 'With love',
//         description: 'With love',
//         img: '1.webp',
//         slug: 'with-love-20003',
//         rating: '5.00',
//         price: '2.99',
//         type_name: 'Gift-card'
//       },
//       {
//         id: '9n0Z12ORJYGKERJg',
//         real_id: 20004,
//         title: 'With love',
//         description: 'With love',
//         img: '1.webp',
//         slug: 'with-love-20004',
//         rating: '5.00',
//         price: '2.99',
//         type_name: 'Gift-card'
//       },
//       {
//         id: '9apoVGyXqaz5qNX4',
//         real_id: 20005,
//         title: 'Happy birthday ',
//         description: 'Happy birthday ',
//         img: '1.webp',
//         slug: 'happy-birthday--20005',
//         rating: '5.00',
//         price: '2.99',
//         type_name: 'Gift-card'
//       },
//       {
//         id: 'VbqKPzWKbmzpj0JZ',
//         real_id: 20006,
//         title: 'Happy birthday ',
//         description: 'Happy birthday ',
//         img: '1.webp',
//         slug: 'happy-birthday--20006',
//         rating: '5.00',
//         price: '2.99',
//         type_name: 'Gift-card'
//       },
//       {
//         id: 'Jxe0mwArJmzonZBM',
//         real_id: 20007,
//         title: 'Happy birthday ',
//         description: 'Happy birthday ',
//         img: '1.webp',
//         slug: 'happy-birthday--20007',
//         rating: '5.00',
//         price: '2.99',
//         type_name: 'Gift-card'
//       },
//       {
//         id: 'p5WZaw8dZqwljMgO',
//         real_id: 20008,
//         title: 'Congrats',
//         description: 'Congrats',
//         img: '1.webp',
//         slug: 'congrats-20008',
//         rating: '5.00',
//         price: '2.99',
//         type_name: 'Gift-card'
//       },
//       {
//         id: 'Jqn4Z26xvNzdlv6M',
//         real_id: 20009,
//         title: 'Thank you',
//         description: 'Thank you',
//         img: '1.webp',
//         slug: 'thank-you-20009',
//         rating: '5.00',
//         price: '2.99',
//         type_name: 'Gift-card'
//       }
//     ]
//   }
// };

export const state = () => ({
  gifts: {
    seo: {} as GiftsResponse['data']['seo'],
    main: {} as GiftsResponse['data']['main'],
    list: [] as GiftsResponse['data']['list'],
    faq: [] as GiftsResponse['data']['faq'],
    is_basket_has_gift: false as GiftsResponse['data']['is_basket_has_gift']
  },
  giftCards: [] as GiftCardResponse['data']['list']
});

type GiftsState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_GIFTS(state, payload: GiftsState['gifts']) {
    state.gifts = payload;
  },

  SET_GIFT_CARDS(state, payload: GiftsState['giftCards']) {
    state.giftCards = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchGifts({ commit }) {
      try {
        const { data } = await this.app.$http.$get<GiftsResponse>('/v1/gifts/');
        commit('SET_GIFTS', data);
      } catch (err) {
        console.error(err);
      }
    },

    async fetchGiftCards({ commit }) {
      try {
        const { data } = await this.app.$http.$get<GiftsResponse>('/v1/gift-cards/');
        commit('SET_GIFT_CARDS', data?.list);
      } catch (err) {
        console.error(err);
      }
    }
  }
);

export const getters = getterTree(state, {
  getGiftCards: (state) => state.giftCards || []
});
