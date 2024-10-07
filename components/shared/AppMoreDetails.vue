<template>
  <div class="app-more-details">
    <svg-icon :name="bonuses.icon" @click="openModal" />

    <app-modal
      :visible="isVisible"
      :center="$device.isDesktopOrTablet"
      :theme="mobileTHeme"
      :bottom="$device.isMobile"
      :icon="toggleableIcon"
      @close="closeModal"
    >
      <div class="container">
        <div class="title">
          {{ bonuses.modal.title }}
        </div>
        <div class="description">
          {{ bonuses.modal.description }}
        </div>
        <div class="info">
          <svg-icon :name="bonuses.modal.icon" />
          {{ bonuses.modal.info }}
        </div>
        <app-button theme="grey-whitely" stretch="full" class="button" @click="closeModal">Close</app-button>
      </div>
    </app-modal>
  </div>
</template>

<script>
import AppButton from '~/components/shared/AppButton.vue';
import AppModal from '~/components/shared/AppModal.vue';
import bonuses from '~/data/bonuses.js';
import { disableScroll, enableScroll } from '~/helpers/scrollLock';

export default {
  name: 'AppMoreDetails',
  components: { AppButton, AppModal },

  props: {
    details: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      bonuses,
      isVisible: false
    };
  },

  computed: {
    mobileTHeme() {
      return this.$device.isMobile ? 'mobile' : '';
    },

    toggleableIcon() {
      return this.$device.isDesktopOrTablet ? 'close' : 'close-mobile';
    }
  },

  methods: {
    openModal() {
      this.isVisible = true;
      disableScroll();
    },

    closeModal() {
      this.isVisible = false;
      enableScroll();
    }
  }
};
</script>

<style lang="scss" scoped>
.app-more-details {
}

.icon {
  width: 20px;
  height: 20px;
}

.container {
  box-sizing: border-box;

  @include gt-sm {
    width: 407px;
    padding: 24px;
  }

  @include lt-md {
    padding: 24px 16px;
  }
}

.title {
  font-family: $golos-bold;

  @include gt-sm {
    font-size: 18px;
    letter-spacing: -0.02em;
  }

  @include lt-md {
    font-size: 16px;
  }
}

.description,
.info {
  font-family: $golos-regular;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.01em;
  margin-top: 8px;
}

.info {
  display: flex;
  gap: 4px;
}

.button {
  margin-top: 24px;
}
</style>
