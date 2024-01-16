import { setState } from '@/helpers';

export const state = () => ({
  paymentIntent: null,
  paymentMethod: 'stripe',
  paypalClientId: ''
});

export const mutations = {
  setState
};

export const actions = {
  async fetchStripeClientSecret({ commit }) {
    try {
      const { data } = await this.$http.$post(`/v1/payment/stripe/intent/`);
      commit('setState', { paymentIntent: data });

      return data;
    } catch (err) {
      console.error(err);
    }
  },

  async getClientIdPayPal({ commit }) {
    try {
      const { data } = await this.$http.$get('/v1/payment/paypal/client-id/');
      const { 'client-id': paypalClientId } = data;

      commit('setState', { paypalClientId });

      return paypalClientId;
    } catch (err) {
      console.error(err);
    }
  },

  createPaymentPayPal(_, orderId) {
    return this.$http.$post(`/v1/payment/paypal/${orderId}/create/`);
  },

  approvePaymentPayPal(_, orderId) {
    return this.$http.$post(`/v1/payment/paypal/${orderId}/capture/`);
  }
};

export const getters = {
  getPaymentMethod: (state) => state.paymentMethod
};
