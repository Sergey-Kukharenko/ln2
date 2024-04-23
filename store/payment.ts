import { actionTree, getterTree, mutationTree } from 'typed-vuex';

import {
  PaymentMethod,
  PaypalCaptureResponse,
  PaypalClientResponse,
  PaypalCreateResponse,
  StripeIntentResponse
} from '~/@types/api/payment';

export const state = () => ({
  paymentIntent: '' as StripeIntentResponse['data']['client_secret'],
  paymentMethod: 'stripe' as PaymentMethod,
  paypalClientId: '' as PaypalClientResponse['data']['client-id']
});

type PaymentState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  SET_STRIPE_PAYMENT_INTENT(state, payload: PaymentState['paymentIntent']) {
    state.paymentIntent = payload;
  },
  SET_PAYPAL_CLIENT_ID(state, payload: PaymentState['paypalClientId']) {
    state.paypalClientId = payload;
  },
  SET_PAYMENT_METHOD(state, payload: PaymentState['paymentMethod']) {
    state.paymentMethod = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    async fetchStripeClientSecret({ commit }) {
      try {
        const { data } = await this.app.$http.$post<StripeIntentResponse>(`/v1/payment/stripe/intent/`);
        commit('SET_STRIPE_PAYMENT_INTENT', data);

        return data;
      } catch (err) {
        console.error(err);
      }
    },

    async getClientIdPayPal({ commit }) {
      try {
        const { data } = await this.app.$http.$get<PaypalClientResponse>('/v1/payment/paypal/client-id/');
        const { 'client-id': paypalClientId } = data;

        commit('SET_PAYPAL_CLIENT_ID', paypalClientId);

        return paypalClientId;
      } catch (err) {
        console.error(err);
      }
    },

    createPaymentPayPal(_, orderId) {
      return this.app.$http.$post<PaypalCreateResponse>(`/v1/payment/paypal/${orderId}/create/`);
    },

    approvePaymentPayPal(_, orderId) {
      return this.app.$http.$post<PaypalCaptureResponse>(`/v1/payment/paypal/${orderId}/capture/`);
    }
  }
);

export const getters = getterTree(state, {
  getPaymentMethod: (state) => state.paymentMethod
});
