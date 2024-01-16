import { STRIPE_MOBILE_STATUS_DELAY } from '~/constants';

export default {
  data() {
    return {
      timerId: null
    };
  },

  mounted() {
    this.timerId = setTimeout(() => {
      if (!window?.ReactNativeWebView) {
        this.$router.push({ name: 'index' });

        return;
      }

      window.ReactNativeWebView.postMessage(JSON.stringify({ success: this.status }));
    }, STRIPE_MOBILE_STATUS_DELAY);
  },

  beforeDestroy() {
    clearInterval(this.timerId);
  }
};
