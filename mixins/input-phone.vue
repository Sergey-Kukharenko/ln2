<script>
export default {
  name: 'InputPhone',

  data() {
    return {
      countryCode: '+44'
    };
  },

  methods: {
    validateNumber(e) {
      const keyCode = e.keyCode ? e.keyCode : e.which;
      const matchCountryCode = this.form.phone.value === this.countryCode;
      if ((keyCode < 48 || (keyCode === 48 && matchCountryCode) || keyCode > 57) && keyCode !== 46 && keyCode !== 43) {
        e.preventDefault();
      }
    },

    onFocus(e) {
      if (e.target.value.trim() === '') {
        this.form.phone.value = this.countryCode;
      }
    },

    onBlur(e) {
      if (e.target.value.trim() === this.countryCode) {
        this.form.phone.value = '';
      }
    }
  }
};
</script>

<style scoped></style>
