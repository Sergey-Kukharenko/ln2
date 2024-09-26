import { actionTree, getterTree, mutationTree } from 'typed-vuex';

import type { FavoritesResponse } from '~/@types/api/favorites';

// import profile from '~/data/profile';

export const state = () => ({
  favorites: {} as FavoritesResponse
});

type FavoritesState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_FAVORITES(state, payload: FavoritesState['favorites']) {
    state.favorites = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchFavorites({ commit }) {
      try {
        const favorites = await this.app.$http.$get<FavoritesResponse>('/v1/favorites/');
        commit('SET_FAVORITES', favorites);
      } catch (e) {
        console.error(e);
      }
    },

    async addToFavorites({ commit }, productId: string | number) {
      try {
        const favorites = await this.app.$http.$post<FavoritesResponse>(`/v1/favorite/${productId}`);
        commit('SET_FAVORITES', favorites);
      } catch (e) {
        console.error(e);
      }
    },

    async removeFromFavorites({ commit }, productId: string | number) {
      try {
        const favorites = await this.app.$http.$delete<FavoritesResponse>(`/v1/favorite/${productId}`);
        commit('SET_FAVORITES', favorites);
      } catch (e) {
        console.error(e);
      }
    }
  }
);

export const getters = getterTree(state, {
  getCount: (state) => state.favorites?.list?.length
});
