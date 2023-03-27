import { setState, useObjectNotEmpty } from '@/helpers';

export const state = () => ({
  authorized: false,
  fullName: 'Alfred Penniworth',
  bonuses: '1 280',
  searchHistory: [
    { url: '', title: 'Bouquet with roses' },
    { url: '', title: 'Cheap bouquets' },
    { url: '', title: 'Roses' },
    { url: '', title: 'Bouquet of 51 roses' },
    { url: '', title: 'Peonies roses' },
    { url: '', title: 'Bouquets for moms' },
    { url: '', title: 'Happy birthday' },
    { url: '', title: 'Pions' },
    { url: '', title: 'Wedding bouquets' },
    { url: '', title: 'Bouquet of roses up to £ 30' }
  ],
  user: null,

  recipient: null
});

export const mutations = {
  setState,

  setField(state, { name, value }) {
    state[name] = value;
  },

  addToHistory(state, payload) {
    state.searchHistory.push(payload);
  },

  removeFromHistory(state, payload) {
    state.searchHistory.splice(state.searchHistory.indexOf(payload), 1);
  }
};

export const actions = {
  setAuthData({ commit }, payload) {
    commit('setField', { name: 'authorized', value: true });
    commit('setField', { name: 'user', value: payload });
  },

  logout({ commit }) {
    commit('setField', { name: 'authorized', value: false });
  },

  setRecipient({ commit }, payload) {
    commit('setField', { name: 'recipient', value: payload });
  },

  async fetchUser({ commit }) {
    try {
      const userData = await this.$axios.$get('/user/');
      const { auth: isAuth = false, ...userProps } = userData;

      if (isAuth) {
        commit('setState', { user: userProps.user });
        commit('auth/setState', { authStatus: isAuth }, { root: true });
      }
    } catch (err) {
      console.error(err);
    }
  }
};

export const getters = {
  state: (state) => state,
  getUserData: (state) => state.user ?? {},
  getSearchHistory: (state) => state.searchHistory,
  getRecipient: (state) => state.recipient,

  isUserData: (state) => useObjectNotEmpty(state.user)
};
