export const actions = {
  sendLog(_, payload) {
    return this.$axios.$post('/log/', payload);
  }
};
