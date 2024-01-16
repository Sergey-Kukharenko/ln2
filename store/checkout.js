import { setState } from '@/helpers';
import { CHECKOUT_STEPS, CHECKOUT_STEP_COOKIE, EMPTY_CART_MAP } from '~/constants';

const GET_INTERVALS_IRI = '/v1/intervals/get-delivery-intervals-for-date/';
const checkIntervalsForDisable = (intervals) => intervals?.filter((interval) => !interval.disabled);
const getCheckoutCost = (checkout) => ({
  positionsCost: checkout?.positions_cost || 0,
  deliveryAmount: +checkout?.delivery_amount ? `£ ${checkout?.delivery_amount}` : 'Free',
  deliveryCost: +checkout?.delivery_amount || 0,
  totalSum: +checkout?.total_cost || 0,
  cashback: +checkout?.cashback || 0,
  sale: +checkout?.promo_code?.discount ? checkout?.promo_code?.discount : 0
});
export const sortByDeliveryAmount = (a, b) => a?.delivery_amount - b?.delivery_amount;

export const state = () => ({
  checkout: null,
  isPaid: false,
  selfRecipient: false,
  intervals: null,
  todayDate: null,
  isDetailsVisible: false,
  currCheckoutStep: 1,
  checkoutSteps: CHECKOUT_STEPS,
  intervalsDateOffset: null
});

export const mutations = {
  setState
};

export const actions = {
  setCheckoutStep({ commit }, payload) {
    this.$cookies.set(CHECKOUT_STEP_COOKIE, payload);
    commit('setState', { currCheckoutStep: payload });
  },

  setPromoCode(_, payload) {
    try {
      return this.$http.$post('/v1/order/promocode/', payload);
    } catch (err) {
      console.error(err);
    }
  },

  async fetchCheckout({ commit, dispatch }) {
    try {
      const { data } = await this.$http.$get('/v1/order/');

      commit('setState', { checkout: data });
      commit('setState', { selfRecipient: data?.self_recipient ?? false });

      // Временно скрыт
      // dispatch('setCheckoutStep', this.$cookies.get(CHECKOUT_STEP_COOKIE) || 1);
      return data;
    } catch (err) {
      console.error(err);
    }
  },

  deletePromoCode() {
    return this.$http.$delete('/v1/basket/promocode');
  },

  async clarifyDelivery({ commit, state }, payload) {
    try {
      await this.$http.$post('/v1/order/clarify_address', payload);
      commit('setState', { checkout: { ...state.checkout, ...payload } });
    } catch (err) {
      console.error(err);
    }
  },

  async fetchIntervals({ commit }) {
    try {
      const { data } = await this.$http.$get('/v1/intervals/get-delivery-intervals-for-date-range/');
      const mappedIntervals = data?.map((el) => ({ ...el, intervals: checkIntervalsForDisable(el?.intervals) }));

      commit('setState', { todayDate: data?.[0]?.date });
      commit('setState', { intervals: mappedIntervals });
      // commit('setState', { intervalsDateOffset: params.intervals_date_to });

      return mappedIntervals;
    } catch (err) {
      console.error(err);
    }
  },

  async fetchInterval(_, date) {
    try {
      const { data } = await this.$http.$get(GET_INTERVALS_IRI, { params: { intervals_date: date } });

      return checkIntervalsForDisable(data?.intervals);
    } catch (err) {
      console.error(err);
    }
  },

  setCheckoutRecipient({ state }, payload) {
    try {
      return this.$http.$post('/v1/order/recipient/', payload);
    } catch (err) {
      console.error(err);
    }
  },

  async setCheckoutToPay({ commit }) {
    try {
      commit('cart/setCart', EMPTY_CART_MAP, { root: true });

      const res = await this.$http.$post('/v1/order/to-pay/');
      return res;
    } catch (err) {
      console.error(err);
    }
  },

  async setCheckoutAddress({ state, commit }, address) {
    try {
      const { success } = await this.$http.$post('/v1/order/address/', address);

      if (!success) {
        return;
      }

      commit('setState', { checkout: { ...state.checkout, shipping_address: address } });
    } catch (err) {
      console.error(err);
    }
  },

  setCheckoutInterval(_, interval) {
    try {
      return this.$http.$post('/v1/order/interval/', interval);
    } catch (err) {
      console.error(err);
    }
  },

  setCheckoutOther(_, payload) {
    try {
      return this.$http.$post('/v1/order/other/', payload);
    } catch (err) {
      console.error(err);
    }
  }
};

export const getters = {
  getCheckout: (state) => state.checkout,
  getTodayDate: (state) => state.todayDate,
  checkoutCost: (state) => getCheckoutCost(state.checkout),
  getIntervals: (state) => state.intervals || [],
  isClarified: (state) => state.checkout?.clarify_address,
  checkoutShippingAddress: (state) => state.checkout?.shipping_address || {},
  checkoutPositions: (state) => state.checkout?.positions || [],
  checkoutPromocode: (state) => state.checkout?.promo_code?.code || '',
  isDetailsStep: (state) => state.currCheckoutStep === 1,
  isFinalStep: (state) => state.currCheckoutStep === 2,
  getIntervalsDateOffset: (state) => state.intervalsDateOffset || ''
};
