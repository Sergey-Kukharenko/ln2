<template>
  <div class="location">
    <div class="nested-group">
      <app-location-button :location="location" @click="open" />
    </div>

    <app-drawer-nested :visible="isVisible" title="Delivery city" @close="close">
      <app-address />
    </app-drawer-nested>
  </div>
</template>

<script>
import AppAddress from '@/components/header/address/AppAddress.vue';
import AppLocationButton from '@/components/header/location/AppLocationButton.vue';
import AppDrawerNested from '~/components/header/mobile/AppDrawerNested.vue';

export default {
  name: 'AppMobileLocation',

  components: { AppDrawerNested, AppLocationButton, AppAddress },

  inject: ['updateVisibility'],

  provide() {
    return {
      updateLocation: this.updateLocation
    };
  },

  data() {
    return {
      isVisible: false,
      location: {
        city: '',
        address: ''
      }
    };
  },

  watch: {
    isVisible(value) {
      this.updateVisibility(value);
    }
  },

  methods: {
    open() {
      this.isVisible = true;
    },

    close() {
      this.isVisible = false;
    },

    updateLocation(payload) {
      this.location = payload;
      this.isVisible = false;
    }
  }
};
</script>

<style scoped></style>
