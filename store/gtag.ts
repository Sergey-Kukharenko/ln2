import { actionTree, getterTree, mutationTree } from 'typed-vuex';

export const state = () => ({
  gtagAddedScript: false as boolean
});

export const mutations = mutationTree(state, {
  SET_ADDED_SCRIPT(state, payload: boolean) {
    state.gtagAddedScript = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    addGtagScript({ commit }, payload: boolean) {
      commit('SET_ADDED_SCRIPT', payload);
    }
  }
);

export const getters = getterTree(state, {
  getGtagAddedScript: (state) => state.gtagAddedScript
});
