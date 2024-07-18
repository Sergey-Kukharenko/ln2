import { actionTree, getterTree, mutationTree } from 'typed-vuex';

export const state = () => ({
  products: {} as $ReplaceItType,
  loading: false as boolean
});

type SearchState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_LOADING(state, payload: SearchState['loading']) {
    state.loading = payload;
  },

  SET_PRODUCT(state, payload: SearchState['products']) {
    state.products = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchByQuery({ commit }, query: string) {
      try {
        commit('SET_LOADING', true);
        const products = await this.app.$http.$get<$ReplaceItType>('/v1/offers-search/', {
          params: {
            q: query,
            page: 1,
            limit: 12
          }
        });
        commit('SET_PRODUCT', products);
        commit('SET_LOADING', false);
      } catch (e) {
        console.error(e);
      }
    }
  }
);

export const getters = getterTree(state, {
  getLoading: (state) => state.loading,
  getProducts: (state) => state.products
});
