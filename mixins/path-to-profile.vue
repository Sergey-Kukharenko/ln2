<script>
export default {
  name: 'PathToProfileMixin',

  computed: {
    pathName() {
      // return this.$device.isDesktopOrTablet ? 'profile-dashboard' : 'profile-orders';
      return 'profile-dashboard';
    }
  }
};
</script>
