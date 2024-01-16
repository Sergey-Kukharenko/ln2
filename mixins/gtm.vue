<script>
export default {
  name: 'GtmMixin',

  methods: {
    gtmClearItemEvent() {
      this.$gtm.push({ ecommerce: null });
    },

    dataLayerSetOriginalUrl() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        originalLocation:
          document.location.protocol +
          '//' +
          document.location.hostname +
          document.location.pathname +
          document.location.search
      });
    }
  }
};
</script>
