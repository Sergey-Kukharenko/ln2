import { setState } from '@/helpers';

export const state = () => ({
  gifts: {
    seo: {},
    main: {},
    list: [],
    is_basket_has_gift: false
  }
});

export const mutations = {
  setState
};

export const actions = {
  async fetchGifts({ commit }) {
    try {
      const { data } = await this.$axios.$get('/gifts/');
      console.log(data);
      commit('setState', { gifts: data });
    } catch (err) {
      console.error(err);
    }
  }
};

export const getters = {
  getSeoGifts: (state) => state.gifts?.seo,
  getTitleGifts: (state) => state.gifts?.main?.title,
  getListGifts: (state) => state.gifts?.list,
  isBasketHasGifts: (state) => state.gifts?.is_basket_has_gift
};
