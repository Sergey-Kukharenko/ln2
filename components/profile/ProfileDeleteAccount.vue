<template>
  <div class="profile-delete-account">
    <app-button theme="text-only" @click="open">{{ button }}</app-button>
    <profile-modal :is-visible="isVisible" @close-modal="close">
      <template #title> {{ modal.title }}</template>
      <template #description> {{ modal.description }}</template>
      <template #buttons>
        <app-button behavior="custom" @click="onLogout">{{ modal.buttons.delete }}</app-button>
        <app-button theme="text-only" class="red-color" color="" behavior="custom" @click="close"
          >{{ modal.buttons.cancel }}
        </app-button>
      </template>
    </profile-modal>
  </div>
</template>

<script>
import ProfileModal from '~/components/profile/ProfileModal.vue';
import AppButton from '~/components/shared/AppButton.vue';
import { disableScroll, enableScroll } from '~/helpers/scrollLock';

export default {
  name: 'ProfileDeleteAccount',

  components: { ProfileModal, AppButton },

  data() {
    return {
      button: 'Delete account',
      modal: {
        title: 'Are you sure you want to delete this account?',
        description: 'This is an irreversible action',
        buttons: {
          delete: 'Delete account',
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
    },

    async onLogout() {
      this.close();
      await this.$accessor.auth.logout();
      this.$router.push({ name: 'index' });
    }
  }
};
</script>

<style scoped lang="scss">
.button {
  width: 100%;
}

.red-color {
  color: $color-like-active;
}
</style>
