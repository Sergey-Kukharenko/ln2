import { actionTree, getterTree, mutationTree } from 'typed-vuex';

import {
  CheckoutComPaymentSessionResponse,
  PaymentMethod,
  PaypalCaptureResponse,
  PaypalClientResponse,
  PaypalCreateResponse,
  StripeIntentResponse
} from '~/@types/api/payment';
import { STRIPE_PAYMENT_METHOD } from '~/data/payment-methods';

export const state = () => ({
  paymentIntent: '' as StripeIntentResponse['data']['client_secret'],
  paymentMethod: STRIPE_PAYMENT_METHOD.name as PaymentMethod,
  paypalClientId: '' as PaypalClientResponse['data']['client-id'],
  paymentSession: '' as CheckoutComPaymentSessionResponse['data']['payment_session_token']
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
  },
  SET_CHECKOUT_PAYMENT_SESSION(state, payload: PaymentState['paymentSession']) {
    state.paymentSession = payload;
  }
});

export const actions = actionTree(
  { state },
  {
    setDefaultPaymentMethod({ commit }) {
      commit('SET_PAYMENT_METHOD', STRIPE_PAYMENT_METHOD.name);
    },

    async fetchCheckoutPaymentData({ commit }) {
      try {
        const { data } = await this.app.$http.$post<CheckoutComPaymentSessionResponse>(
          '/v1/payment/checkout-com/session/'
        );
        commit('SET_CHECKOUT_PAYMENT_SESSION', data);
      } catch (err) {
        console.error(err);
      }
    },

    async fetchStripeClientSecret({ commit }) {
      try {
        const { data } = await this.app.$http.$post<StripeIntentResponse>('/v1/payment/stripe/intent/');
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
