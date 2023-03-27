<script>
export default {
  name: 'GtmClear',

  methods: {
    gtmClearItemEvent() {
      this.$gtm.push({ ecommerce: null });
    }
  }
};
</script>
