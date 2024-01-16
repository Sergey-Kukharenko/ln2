import { setState } from '@/helpers';
import { EMPTY_GIFT_MAP } from '~/constants';

export const state = () => ({
  gifts: EMPTY_GIFT_MAP
});

export const mutations = {
  setState
};

export const actions = {
  async fetchGifts({ commit }) {
    try {
      const { data } = await this.$http.$get('/v1/gifts/');
      commit('setState', { gifts: data });
    } catch (err) {
      console.error(err);
    }
  }
};
