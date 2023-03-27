<script>
export default {
  name: 'PathToImage',

  computed: {
    getDevice() {
      return this.$device.isMobileOrTablet ? 'mobile' : 'desktop';
    }
  },

  methods: {
    pathToImg(imageObj) {
      return `${process.env.basePureUrl}${imageObj[this.getDevice]}`;
    }
  }
};
</script>
