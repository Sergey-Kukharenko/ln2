<template>
  <app-checkbox
    v-model="isClarified"
    :name="$options.CLARIFY_STATUS_NAME"
    size="lg"
    :align="getAlign"
    @change="onChange"
  >
    I don’t know the delivery address. Сlarify the delivery address with the recipient.
  </app-checkbox>
</template>

<script>
import Vue from 'vue';

import AppCheckbox from '~/components/shared/AppCheckbox.vue';

const CLARIFY_STATUS_NAME = 'clarify-status';

export default Vue.extend({
  CLARIFY_STATUS_NAME,

  name: 'CheckoutClarify',

  components: {
    AppCheckbox
  },

  props: {
    status: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isClarified: ''
    };
  },

  computed: {
    getAlign() {
      return this.$device.isMobileOrTablet ? 'start' : 'center';
    }
  },

  mounted() {
    this.isClarified = this.status ? CLARIFY_STATUS_NAME : '';
  },

  methods: {
    onChange(status) {
      this.$accessor.checkout.clarifyDelivery({ clarify_address: !!status });
    }
  }
});
</script>
