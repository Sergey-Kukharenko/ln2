import { actionTree, getterTree, mutationTree } from 'typed-vuex';

export const state = () => ({
  deductedBonuses: false,
  promoCodeBonuses: false
});

export const mutations = mutationTree(state, {
  SET_DEDUCT_BONUSES(state, payload: boolean) {
    state.deductedBonuses = payload;
  },

  SET_PROMO_CODE(state, payload: boolean) {
    state.promoCodeBonuses = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    deductBonuses({ commit }, payload) {
      try {
        commit('SET_DEDUCT_BONUSES', payload);
      } catch (e) {
        console.error(e);
      }
    },

    addPromoCode({ commit }, payload) {
      try {
        commit('SET_PROMO_CODE', payload);
      } catch (e) {
        console.error(e);
      }
    }
  }
);

export const getters = getterTree(state, {
  isDeductedBonuses: (state) => state.deductedBonuses,
  isPromoCodeBonuses: (state) => state.promoCodeBonuses
});
