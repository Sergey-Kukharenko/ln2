<template>
  <app-modal center :visible="isVisible" class="modal" @close="$emit('close-modal')">
    <div class="profile-container">
      <div class="title">
        <slot name="title" />
      </div>
      <div class="description">
        <slot name="description" />
      </div>
      <div class="buttons">
        <slot name="buttons" />
      </div>
    </div>
  </app-modal>
</template>

<script>
import Vue from 'vue';

import AppModal from '~/components/shared/AppModal.vue';

export default Vue.extend({
  name: 'ProfileModal',

  components: { AppModal },

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
  text-align: center;
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

.description {
  font-family: $golos-regular;
  font-size: 16px;
  line-height: 24px;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
