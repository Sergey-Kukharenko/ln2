import { actionTree, mutationTree } from 'typed-vuex';

import type { GiftsResponse } from '~/@types/api/gifts';

export const state = () => ({
  gifts: {
    seo: {} as GiftsResponse['data']['seo'],
    main: {} as GiftsResponse['data']['main'],
    list: [] as GiftsResponse['data']['list'],
    faq: [] as GiftsResponse['data']['faq'],
    is_basket_has_gift: false as GiftsResponse['data']['is_basket_has_gift']
  }
});

type GiftsState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_GIFTS(state, payload: GiftsState['gifts']) {
    state.gifts = payload;
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
    }
  }
);
