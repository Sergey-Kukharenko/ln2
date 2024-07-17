import { actionTree, mutationTree } from 'typed-vuex';

import { CategoryResponse } from '~/@types/api/category';
import { MAIN_PAGE_LIMIT } from '~/constants';

export const state = () => ({
  constructorBlock: {} as CategoryResponse,
  specialOffers: {} as CategoryResponse,
  underPounds: {} as CategoryResponse,
  baseRoses: {} as CategoryResponse,
  newBouquets: {} as CategoryResponse,
  letterboxBouquets: {} as CategoryResponse,
  trendyBouquets: {} as CategoryResponse
});

export const mutations = mutationTree(state, {
  SET_CONSTRUCTOR_BLOCK(state, payload: CategoryResponse) {
    state.constructorBlock = payload;
  },

  SET_SPECIAL_OFFERS(state, payload: CategoryResponse) {
    state.specialOffers = payload;
  },

  SET_UNDER_POUNDS(state, payload: CategoryResponse) {
    state.underPounds = payload;
  },

  SET_BASE_ROSES(state, payload: CategoryResponse) {
    state.baseRoses = payload;
  },

  SET_NEW_BOUQUETS(state, payload: CategoryResponse) {
    state.newBouquets = payload;
  },

  SET_LETTERBOX_BOUQUETS(state, payload: CategoryResponse) {
    state.letterboxBouquets = payload;
  },

  SET_TRENDY_BOUQUETS(state, payload: CategoryResponse) {
    state.trendyBouquets = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchMainPageServerSide() {
      await Promise.allSettled([
        this.app.$accessor.home.fetchConstructorBouquets(),
        this.app.$accessor.home.fetchSpecialOffers(),
        this.app.$accessor.home.fetchUnderPounds(),
        this.app.$accessor.home.fetchBasedRoses(),
        this.app.$accessor.home.fetchNewBouquets(),
        this.app.$accessor.home.fetchLetterboxBouquets(),
        this.app.$accessor.home.fetchTrendyBouquets()
      ]);

      // Временно скрыл
      // await Promise.allSettled([
      //   dispatch('fetchSpecialOffers'),
      //   dispatch('fetchUnderPounds'),
      //   dispatch('fetchBasedRoses'),
      //   dispatch('fetchNewBouquets'),
      //   dispatch('fetchTrendyBouquets')
      // ]);
    },

    // fetchMainPageClientSide() {
    // Возможно запросы с клиента еще будут
    // },

    async fetchConstructorBouquets({ commit }) {
      try {
        const constructorBlock = await this.app.$httpSSRCache({
          scope: 'home',
          field: 'constructorBlock',
          url: '/v1/main-page/constructor-block/'
        });

        commit('SET_CONSTRUCTOR_BLOCK', constructorBlock);
      } catch (e) {
        console.error(e);
      }
    },

    async fetchSpecialOffers({ commit }) {
      try {
        const params = {
          limit: MAIN_PAGE_LIMIT + 4
        };

        const specialOffers = await this.app.$httpSSRCache({
          scope: 'home',
          field: 'specialOffers',
          url: '/v1/filter/special-offers/',
          payload: { params }
        });

        commit('SET_SPECIAL_OFFERS', specialOffers);
      } catch (e) {
        console.error(e);
      }
    },

    async fetchUnderPounds({ commit }) {
      try {
        const params = {
          limit: MAIN_PAGE_LIMIT
        };
        const underPounds = await this.app.$httpSSRCache({
          scope: 'home',
          field: 'underPounds',
          url: '/v1/filter/under-ps30/',
          payload: { params }
        });

        commit('SET_UNDER_POUNDS', underPounds);
      } catch (e) {
        console.error(e);
      }
    },

    async fetchBasedRoses({ commit }) {
      try {
        const params = {
          limit: MAIN_PAGE_LIMIT
        };
        const baseRoses = await this.app.$httpSSRCache({
          scope: 'home',
          field: 'baseRoses',
          url: '/v1/category/roses/',
          payload: { params }
        });

        commit('SET_BASE_ROSES', baseRoses);
      } catch (e) {
        console.error(e);
      }
    },

    async fetchNewBouquets({ commit }) {
      try {
        const params = {
          limit: MAIN_PAGE_LIMIT
        };
        const newBouquets = await this.app.$httpSSRCache({
          scope: 'home',
          field: 'newBouquets',
          url: '/v1/category/new-bouquets/',
          payload: { params }
        });

        commit('SET_NEW_BOUQUETS', newBouquets);
      } catch (e) {
        console.error(e);
      }
    },

    async fetchLetterboxBouquets({ commit }) {
      try {
        const params = {
          limit: MAIN_PAGE_LIMIT
        };
        const letterboxBouquets = await this.app.$httpSSRCache({
          scope: 'home',
          field: 'letterboxBouquets',
          url: '/v1/category/letterbox-flowers/',
          payload: { params }
        });

        commit('SET_LETTERBOX_BOUQUETS', letterboxBouquets);
      } catch (e) {
        console.error(e);
      }
    },

    async fetchTrendyBouquets({ commit }) {
      try {
        const params = {
          limit: MAIN_PAGE_LIMIT
        };
        const trendyBouquets = await this.app.$httpSSRCache({
          scope: 'home',
          field: 'trendyBouquets',
          url: '/v1/filter/trendy-bouquets/',
          payload: { params }
        });
        commit('SET_TRENDY_BOUQUETS', trendyBouquets);
      } catch (e) {
        console.error(e);
      }
    }
  }
);
