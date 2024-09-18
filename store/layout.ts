import { actionTree, getterTree, mutationTree } from 'typed-vuex';

import { FooterResponse, NavigationResponse } from '~/@types/api/layout';
import { useObjectNotEmpty } from '~/helpers';

export const state = () => ({
  navigation: {} as NavigationResponse,
  footer: {} as FooterResponse
});

type LayoutState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_NAVIGATION(state, payload: LayoutState['navigation']) {
    state.navigation = payload;
  },

  SET_FOOTER(state, payload: LayoutState['footer']) {
    state.footer = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchLayout() {
      await Promise.all([
        this.app.$accessor.layout.fetchNavigation(),
        this.app.$accessor.category.fetchCategories(),
        this.app.$accessor.layout.fetchFooter()
      ]);
    },

    async fetchNavigation({ commit }) {
      try {
        const navigation = await this.app.$httpSSRCache({
          scope: 'layout',
          field: 'navigation',
          url: '/v1/navigation/'
        });
        commit('SET_NAVIGATION', navigation);
      } catch (e) {
        console.error(e);
      }
    },

    async fetchFooter({ commit }) {
      try {
        const footer = await this.app.$httpSSRCache({
          scope: 'layout',
          field: 'footer',
          url: '/v1/footer/'
        });
        commit('SET_FOOTER', footer);
      } catch (e) {
        console.error(e);
      }
    }
  }
);

export const getters = getterTree(state, {
  getNavigation: (state) => (useObjectNotEmpty(state.navigation) ? state.navigation : { main: [], other: [] }),
  getFooter: (state) => state.footer,
  getCall: (state) => state.navigation?.call
});
