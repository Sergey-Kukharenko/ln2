import { actionTree, getterTree, mutationTree } from 'typed-vuex';

import { CartResponse } from '~/@types/api/cart';
import { EMPTY_CART_MAP, GIFT_CARD_POLICY_ID } from '~/constants';
import { useFixedSumByKey } from '~/helpers';

export const state = () => ({
  cart: EMPTY_CART_MAP as CartResponse['data'],
  pending: false as boolean
});

type CartState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_CART(state, payload: CartState['cart']) {
    if (!payload) {
      state.cart = EMPTY_CART_MAP;
    }

    state.cart = payload;
  },

  SET_PENDING_STATUS(state, payload: CartState['pending']) {
    state.pending = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchCart({ commit }) {
      try {
        const { data } = await this.app.$http.$get<CartResponse>('/v1/basket/');
        commit('SET_CART', data);
      } catch (e) {
        console.error(e);
      }
    },

    async addToCart({ state, commit }, { productId, positionSlug, quantity = 1, giftText = null }) {
      const isCartEmpty = !state.cart.positions?.length;

      try {
        if (isCartEmpty) {
          commit('SET_PENDING_STATUS', true);
        }

        const payload: Record<string, unknown> = { quantity };

        if (giftText) {
          payload.gift_card_text = giftText;
        }

        const { data } = await this.app.$http.$post<CartResponse>(`/v1/basket/${productId}/${positionSlug}`, payload);
        commit('SET_CART', data);
      } catch (e) {
        console.error(e);
      } finally {
        commit('SET_PENDING_STATUS', false);
      }
    },

    async addToCartConstructor({ state, commit }, payload) {
      const isCartEmpty = !state.cart.positions?.length;

      try {
        if (isCartEmpty) {
          commit('SET_PENDING_STATUS', true);
        }

        const { data } = await this.app.$http.$post<CartResponse>('/v1/basket/constructor', payload);
        commit('SET_CART', data);
      } catch (e) {
        console.error(e);
      } finally {
        commit('SET_PENDING_STATUS', false);
      }
    },

    async removeFromCart({ commit }, { productId, positionSlug }) {
      try {
        const { data } = await this.app.$http.$delete<CartResponse>(`/v1/basket/${productId}/${positionSlug}`);
        commit('SET_CART', data);
      } catch (e) {
        console.error(e);
      }
    }
  }
);

export const getters = getterTree(state, {
  getCount: (state) => Number(useFixedSumByKey(state.cart?.positions, 'quantity')),
  getCart: (state) => state.cart?.positions,
  isCartExist: (state) => !!state.cart?.positions?.length,
  cartPending: (state) => state.pending,
  getCost: (state) => state.cart.position_cost,
  getTotal: (state) => state.cart.total_cost,
  getDiscount: (state) => Number(state.cart?.promo_code?.discount ?? 0),
  isDiscountExist: (state) => Number(state.cart.promo_code?.discount) > 0,
  getGiftCard: (state) => state.cart?.positions?.find((position) => position?.policy_id === GIFT_CARD_POLICY_ID)
});
