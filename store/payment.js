export const actions = {
  async fetchStripeClientSecret(_, orderId) {
    try {
      const { data } = await this.$axios.$get(`/payment/stripe/${orderId}/`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
};
