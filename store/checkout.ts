import { actionTree, getterTree, mutationTree } from 'typed-vuex';

import type { DailyIterval, Interval, IntervalResponse } from '~/@types/api/checkout';
import type { OrderResponse } from '~/@types/api/order';
import type { Promocode } from '~/@types/api/promocode';

import { EMPTY_CART_MAP, GIFT_CARD_POLICY_ID } from '~/constants';

const GET_INTERVALS_IRI = '/v1/intervals/get-delivery-intervals-for-date/';
const checkIntervalsForDisable = (intervals: IntervalResponse<DailyIterval>['data']['intervals']) =>
  intervals?.filter((interval) => !interval.disabled);
const getCheckoutCost = (checkout: OrderResponse['data']) => ({
  positionsCost: checkout?.positions_cost || 0,
  deliveryAmount: +checkout?.delivery_amount ? `£ ${checkout?.delivery_amount}` : 'Free',
  deliveryCost: +checkout?.delivery_amount || 0,
  totalSum: +checkout?.total_cost?.replace(',', '') || 0,
  cashback: +checkout?.cashback || 0,
  sale: +checkout?.promo_code?.discount ? checkout?.promo_code?.discount : 0
});
export const sortByDeliveryAmount = (a: Interval, b: Interval) => a?.delivery_amount - b?.delivery_amount;

export const state = () => ({
  checkout: {} as OrderResponse['data'],
  selfRecipient: false as OrderResponse['data']['self_recipient'],
  intervals: null as IntervalResponse<DailyIterval[]>['data'] | null,
  todayDate: null as Nullable<string>,
  isDetailsVisible: false as boolean,
  isPending: false as boolean
});

type CheckoutState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_DETAILS_VISIBLE(state, payload: CheckoutState['isDetailsVisible']) {
    state.isDetailsVisible = payload;
  },

  SET_INTERVALS(state, payload: CheckoutState['intervals']) {
    state.intervals = payload;
  },

  SET_TODAY_DATE(state, payload: CheckoutState['todayDate']) {
    state.todayDate = payload;
  },

  SET_RECIPIENT(state, payload: CheckoutState['checkout']['recipient']) {
    state.checkout = {
      ...state.checkout,
      recipient: payload
    };
  },

  SET_SELF_RECIPIENT(state, payload: CheckoutState['selfRecipient']) {
    state.selfRecipient = payload;
  },

  SET_CHECKOUT(state, payload: CheckoutState['checkout']) {
    state.checkout = payload;
  },

  SET_PENDING_STATUS(state, payload: CheckoutState['isPending']) {
    state.isPending = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchCheckout({ commit }) {
      try {
        const { data } = await this.app.$http.$get<OrderResponse>('/v1/order/');

        commit('SET_CHECKOUT', data);
        commit('SET_SELF_RECIPIENT', data?.self_recipient ?? false);

        const isPromoCode = data?.promo_code?.code;
        if (isPromoCode) {
          commit('bonuses-local/SET_PROMO_CODE', true, { root: true });
        }

        return data;
      } catch (err) {
        console.error(err);
      } finally {
        commit('SET_PENDING_STATUS', false);
      }
    },

    async createOrder({ commit }, payload) {
      try {
        const { data } = await this.app.$http.$post<OrderResponse>(`/v1/order/`, payload);

        commit('SET_CHECKOUT', data);
        commit('SET_SELF_RECIPIENT', data?.self_recipient ?? false);
      } catch (err) {
        console.error(err);
      } finally {
        commit('SET_PENDING_STATUS', false);
      }
    },

    async updateCheckout({ commit }) {
      try {
        const { data } = await this.app.$http.$post<OrderResponse>('/v1/order/update/');

        commit('SET_CHECKOUT', data);
        commit('SET_SELF_RECIPIENT', data?.self_recipient ?? false);

        return data;
      } catch (err) {
        console.error(err);
      } finally {
        commit('SET_PENDING_STATUS', false);
      }
    },

    setPromoCode(_, payload: { promo_code: string }) {
      try {
        return this.app.$http.$post<ApiResponse<Promocode>>('/v1/order/promocode/', payload);
      } catch (err) {
        console.error(err);
      }
    },

    deletePromoCode() {
      // Basket?
      // TO-DO: Выяснить актуальность
      return this.app.$http.$delete<ApiResponse<null>>('/v1/order/promocode/');
    },

    async clarifyDelivery({ commit, state }, payload: { clarify_address: boolean }) {
      try {
        await this.app.$http.$post('/v1/order/clarify_address', payload);
        commit('SET_CHECKOUT', { ...state.checkout, ...payload });
      } catch (err) {
        console.error(err);
      }
    },

    async fetchIntervals({ commit }) {
      try {
        const { data } = await this.app.$http.$get<IntervalResponse<DailyIterval[]>>(
          '/v1/intervals/get-delivery-intervals-for-date-range/'
        );
        const mappedIntervals = data?.map((el) => ({ ...el, intervals: checkIntervalsForDisable(el?.intervals) }));

        commit('SET_TODAY_DATE', data?.[0]?.date);
        commit('SET_INTERVALS', mappedIntervals);

        return mappedIntervals;
      } catch (err) {
        console.error(err);
      }
    },

    async fetchInterval(_, date: string) {
      try {
        const { data } = await this.app.$http.$get<IntervalResponse<DailyIterval>>(GET_INTERVALS_IRI, {
          params: {
            intervals_date: date
          }
        });

        return checkIntervalsForDisable(data?.intervals);
      } catch (err) {
        console.error(err);
      }
    },

    async setCheckoutRecipient({ commit }, payload: OrderResponse['data']['recipient']) {
      try {
        await this.app.$http.$post<ApiResponse<null>>('/v1/order/recipient/', payload);
        commit('SET_RECIPIENT', payload);
      } catch (err) {
        console.error(err);
      }
    },

    async setCheckoutToPay({ commit }, bonuses) {
      try {
        commit('cart/SET_CART', EMPTY_CART_MAP, { root: true });

        const res = await this.app.$http.$post<ApiResponse<null>>('/v1/order/to-pay/', bonuses);
        return res;
      } catch (err) {
        console.error(err);
      }
    },

    async setCheckoutAddress({ state, commit }, address: OrderResponse['data']['shipping_address']) {
      try {
        const { success } = await this.app.$http.$post<ApiResponse<null>>('/v1/order/address/', address);

        if (!success) {
          return;
        }

        commit('SET_CHECKOUT', { ...state.checkout, shipping_address: address });
      } catch (err) {
        console.error(err);
      }
    },

    setCheckoutInterval(_, interval: { date: Nullable<string>; time: Nullable<string> }) {
      try {
        return this.app.$http.$post<IntervalResponse<DailyIterval>>('/v1/order/interval/', {
          ...interval
        });
      } catch (err) {
        console.error(err);
      }
    },

    setCheckoutOther(_, payload: { gift: OrderResponse['data']['gift'] }) {
      try {
        return this.app.$http.$post<ApiResponse<null>>('/v1/order/other/', payload);
      } catch (err) {
        console.error(err);
      }
    }
  }
);

export const getters = getterTree(state, {
  getCheckout: (state) => state.checkout,
  getTodayDate: (state) => state.todayDate,
  checkoutCost: (state) => getCheckoutCost(state.checkout),
  getIntervals: (state) => state.intervals || [],
  isClarified: (state) => state.checkout?.clarify_address,
  checkoutShippingAddress: (state) => state.checkout?.shipping_address || {},
  checkoutPositions: (state) => state.checkout?.positions || [],
  checkoutPromocode: (state) => state.checkout?.promo_code?.code || '',
  getGiftCard: (state) => state.checkout?.positions?.find((position) => position?.policy_id === GIFT_CARD_POLICY_ID),
  getAvailableBonuses: (state) => state.checkout?.available_bonuses,
  isAvailableBonuses: (state) => state.checkout?.available_bonuses > 0
});
