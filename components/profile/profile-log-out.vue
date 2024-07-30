<template>
  <div class="profile-log-out">
    <button class="button-log-out" @click="open">
      <svg-icon v-if="$device.isMobile" name="profile-logout" class="icon" />
      {{ button }}
    </button>
    <profile-modal :is-visible="isVisible" @close-modal="close">
      <template #title>{{ modal.title }}</template>
      <template #buttons>
        <app-button behavior="custom">{{ modal.buttons.exit }}</app-button>
        <app-button theme="transparent" behavior="custom">{{ modal.buttons.cancel }}</app-button>
      </template>
    </profile-modal>
  </div>
</template>

<script>
import ProfileModal from '~/components/profile/profile-modal.vue';
import AppButton from '~/components/shared/AppButton.vue';
import { disableScroll, enableScroll } from '~/helpers/scrollLock';

export default {
  name: 'ProfileLogOut',

  components: { ProfileModal, AppButton },

  data() {
    return {
      button: 'Log out',
      modal: {
        title: 'Are you sure you want to log out of your account?',
        buttons: {
          exit: 'Exit',
          cancel: 'Cancel'
        }
      },
      isVisible: false
    };
  },

  methods: {
    open() {
      this.isVisible = true;
      disableScroll();
    },

    close() {
      this.isVisible = false;
      enableScroll();
    }
  }
};
</script>

<style scoped lang="scss">
.button-log-out {
  color: $color-like-active;
  line-height: 20px;
  font-family: $golos-bold;

  @include gt-sm {
    font-size: 16px;
    margin-top: 80px;

    &:hover {
      color: $color-dark-green;
    }
  }

  @include lt-md {
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: $golos-regular;
    font-size: 14px;
    margin-top: 57px;
  }
}

.icon {
  width: 24px;
  height: 24px;
}
</style>
