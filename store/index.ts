import { actionTree, createMapper, getAccessorType, getterTree, mutationTree } from 'typed-vuex';
import Vue from 'vue';

import { AUTH_SMS_COOKIE } from '~/constants';
import * as auth from '~/store/auth';
import * as bonuses from '~/store/bonuses-local';
import * as cart from '~/store/cart';
import * as category from '~/store/category';
import * as checkout from '~/store/checkout';
import * as cookie from '~/store/cookie';
import * as favorites from '~/store/favorites';
import * as gifts from '~/store/gifts';
import * as gtag from '~/store/gtag';
import * as home from '~/store/home';
import * as layout from '~/store/layout';
import * as order from '~/store/order';
import * as payment from '~/store/payment';
import * as product from '~/store/product';
import * as loyalty from '~/store/profile-loyalty';
import * as notifications from '~/store/profile-notifications';
import * as profileOrder from '~/store/profile-order';
import * as orders from '~/store/profile-orders';
import * as personal from '~/store/profile-personal';
import * as search from '~/store/search';
import * as user from '~/store/user';

export const state = () => ({
  httpEndpointsCallStackMap: {} as Record<string, string>
});

export const actions = actionTree(
  { state },
  {
    async nuxtServerInit({ commit }, { app: { $accessor }, $cookies }) {
      try {
        await $accessor.auth.fetchSessionToken();
        await Promise.allSettled([$accessor.cart.fetchCart(), $accessor.layout.fetchLayout()]);

        const isAuthorized = $cookies.get(AUTH_SMS_COOKIE);

        if (isAuthorized) {
          commit('auth/SET_AUTH_STATUS', true);
          $accessor.user.fetchUser();
          $accessor.favorites.fetchFavorites();
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
);

export const mutations = mutationTree(state, {
  httpEndpointsCallStackHandler(state, endpoint: string) {
    if (process.server) {
      return;
    }

    if (state.httpEndpointsCallStackMap[endpoint]) {
      Vue.delete(state.httpEndpointsCallStackMap, endpoint);
    } else {
      // eslint-disable-next-line import/no-named-as-default-member
      Vue.set(state.httpEndpointsCallStackMap, endpoint, { [endpoint]: endpoint });
    }
  }
});

export const getters = getterTree(state, {
  isLoadingHttp: (state) => (endpoint: string) => !!state.httpEndpointsCallStackMap[endpoint]
});

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    auth,
    gifts,
    gtag,
    cookie,
    favorites,
    order,
    payment,
    category,
    layout,
    home,
    product,
    checkout,
    user,
    search,
    cart,
    notifications,
    orders,
    personal,
    profileOrder,
    loyalty,
    bonuses
  }
});

export const accessorMapper = createMapper(accessorType);
