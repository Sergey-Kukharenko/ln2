<template>
  <app-modal center :visible="isVisible" class="modal" @close="$emit('close-modal')">
    <div class="profile-container">
      <div class="title">Are you sure you want to log out of your account?</div>
      <div class="buttons">
        <app-button behavior="custom">Exit</app-button>
        <app-button theme="transparent" behavior="custom">Cancel</app-button>
      </div>
    </div>
  </app-modal>
</template>

<script>
import Vue from 'vue';

import AppButton from '~/components/shared/AppButton.vue';
import AppModal from '~/components/shared/AppModal.vue';

export default Vue.extend({
  name: 'ProfileModal',

  components: { AppButton, AppModal },

  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style scoped lang="scss">
.profile-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @include gt-sm {
    width: 392px;
    gap: 24px;
    padding: 24px;
  }

  @include lt-md {
    gap: 20px;
    padding: 24px 16px;
  }
}

.title {
  font-family: $golos-bold;
  text-align: center;

  @include gt-sm {
    max-width: 292px;
    margin: 0 auto;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.01em;
  }

  @include lt-md {
    font-size: 16px;
    line-height: 20px;
  }
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
