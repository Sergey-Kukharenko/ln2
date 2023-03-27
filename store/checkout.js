import { setState } from '@/helpers';

export const state = () => ({
  checkout: null,
  isPaid: false,
  paymentMethod: 'stripe',
  selfRecipient: true,
  checkoutIntervals: null
});

export const mutations = {
  setState
};

export const actions = {
  async fetchCheckout({ commit }) {
    try {
      const { data } = await this.$axios.$get('/order/');
      commit('setState', { checkout: data });
      commit('setState', { selfRecipient: data?.self_recipient ?? false });
    } catch (err) {
      console.error(err);
    }
  },

  async clarifyDelivery({ commit, state }, payload) {
    try {
      await this.$axios.$post('/order/clarify_address', payload);
      commit('setState', { checkout: { ...state.checkout, ...payload } });
    } catch (err) {
      console.error(err);
    }
  },

  async fetchPaidCheckout({ commit }) {
    try {
      const { data } = await this.$axios.$get('/order/payment/paid/');
      commit('setState', { isPaid: data?.success ?? false });
    } catch (err) {
      console.error(err);
    }
  },

  async fetchCheckoutIntervals({ commit }, params) {
    try {
      const { data } = await this.$axios.$get('/intervals/get-free-intervals-for-date/', { params });
      commit('setState', { checkoutIntervals: data });
    } catch (err) {
      console.error(err);
    }
  },

  setCheckoutRecipient({ state }, payload) {
    try {
      return this.$axios.$post('/order/recipient/', { ...payload, is_self_recipient: state?.selfRecipient });
    } catch (err) {
      console.error(err);
    }
  },

  setCheckoutToPay() {
    try {
      return this.$axios.$post('/order/to-pay/');
    } catch (err) {
      console.error(err);
    }
  },

  setCheckoutAddress(_, address) {
    try {
      this.$axios.$post('/order/address/', address);
    } catch (err) {
      console.error(err);
    }
  },

  async setCheckoutInterval({ commit }, interval) {
    try {
      const { data } = await this.$axios.$post('/order/interval/', interval);

      if (interval?.time) {
        return;
      }

      commit('setState', { checkoutIntervals: data });
    } catch (err) {
      console.error(err);
    }
  },

  setCheckoutOther(_, payload) {
    try {
      return this.$axios.$post('/order/other/', payload);
    } catch (err) {
      console.error(err);
    }
  }
};

export const getters = {
  getCheckout: (state) => state.checkout,
  getCheckoutIntervals: (state) => state.checkoutIntervals?.filter((interval) => !interval.disabled) || [],
  isPaidOrder: (state) => state.isPaid,
  getPaymentMethod: (state) => state.paymentMethod,
  checkoutPositions: (state) => state.checkout?.positions || [],
  checkoutCost: (state) => ({
    positionsCost: state.checkout?.positions_cost ?? 0,
    deliveryAmount: +state.checkout?.delivery_amount ? `£ ${state.checkout?.delivery_amount}` : 'Free',
    totalSum: state.checkout?.total_sum ?? 0,
    cashback: +state.checkout?.cashback ?? 0,
    sale: +state.checkout?.sale ?? 0
  }),
  isClarified: (state) => state.checkout?.clarify_address
};
