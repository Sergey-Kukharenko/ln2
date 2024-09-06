<script>
export default {
  name: 'ProfileMoveToPage',

  inject: ['moveToPage'],

  methods: {
    onMoveToPage(to) {
      this.$router.push(to);
      this.$device.isMobile && this.moveToPage(true);
    }
  }
};
</script>
