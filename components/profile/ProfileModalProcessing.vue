<template>
  <div class="profile-modal-processing" :class="{ show: isShow }">
    <div class="container">
      <app-spinner-loader v-if="isLoading" :size="$device.isDesktopOrTablet ? 60 : 38" />
      <svg-icon v-else name="profile-check" />

      <div class="title">{{ getStatusTitle }}</div>
    </div>
  </div>
</template>

<script>
import AppSpinnerLoader from '~/components/shared/AppSpinnerLoader.vue';

export default {
  name: 'ProfileModalProcessing',

  components: { AppSpinnerLoader },

  props: {
    status: {
      type: String,
      default: 'loading'
    },

    isShow: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isLoading() {
      return this.status === 'loading';
    },

    getStatusTitle() {
      return this.isLoading ? 'We cancel your order' : 'Your order has been cancelled';
    }
  }
};
</script>

<style scoped lang="scss">
.profile-modal-processing {
  display: none;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: white;

  &.show {
    display: flex;
  }
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.icon {
  @include gt-sm {
    width: 80px;
    height: 80px;
  }

  @include lt-md {
    width: 40px;
    height: 40px;
  }
}

.title {
  font-family: $golos-bold;

  @include gt-sm {
    font-size: 32px;
    line-height: 40px;
  }

  @include lt-md {
    font-size: 16px;
    line-height: 20px;
  }
}
</style>
