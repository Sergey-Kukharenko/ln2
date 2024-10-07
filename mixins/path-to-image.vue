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
      return `${process.env.imgCDN}${imageObj[this.getDevice]}`;
    }
  }
};
</script>
