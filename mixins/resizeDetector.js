let oldWidth;
let oldDocumentHeight;

const DELAY = 100;

function createThrottle(callback, delay) {
  let timeout = null;

  return function perform() {
    if (timeout) {
      return;
    }

    timeout = setTimeout(() => {
      callback();
      clearTimeout(timeout);
      timeout = null;
    }, delay);
  };
}

function isIos() {
  return /iPhone|iPad|iPod/.test(window.navigator.userAgent);
}

export default {
  beforeDestroy() {
    if (!this.throttleResizeHandler) {
      return;
    }

    this.$el.removeAttribute('style');
    window.removeEventListener('resize', this.throttleResizeHandler);
    window.visualViewport.addEventListener('resize', this.throttleResizeHandler);
  },
  methods: {
    resizeHandler(onlyWidth = false) {
      const newDocumentHeight = isIos() ? window.visualViewport.height : document.documentElement.clientHeight;

      const isResized = window.innerWidth !== oldWidth || newDocumentHeight !== oldDocumentHeight;

      if (!isResized) {
        return;
      }

      const vw = window.innerWidth;
      const dc = newDocumentHeight;

      if (!onlyWidth) {
        const height = isIos ? window.visualViewport.height : dc;
        document.documentElement.style.setProperty('--document-height', `${height}px`);
      }
      document.documentElement.style.setProperty('--view-width', `${vw}px`);

      oldWidth = window.innerWidth;
      oldDocumentHeight = newDocumentHeight;
    },

    initializeResizeHandler({ onlyWidth = false, once = false } = {}) {
      this.throttleResizeHandler = createThrottle(() => this.resizeHandler(onlyWidth), DELAY);
      this.resizeHandler();

      if (once) {
        return;
      }

      if (isIos()) {
        window.visualViewport.addEventListener('resize', this.throttleResizeHandler);
      } else {
        window.addEventListener('resize', this.throttleResizeHandler);
      }
    }
  }
};
