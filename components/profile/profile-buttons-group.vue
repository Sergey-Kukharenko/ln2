<template>
  <div class="profile-buttons-group">
    <app-link-button :href="link.href" :target="link.target" :rel="link.rel" :icon="link.icon" :label="link.label" />
    <app-button theme="text-only" stretch="full" behavior="custom">{{ button.label }}</app-button>
  </div>
</template>

<script>
import AppLinkButton from '~/components/AppLinkButton.vue';
import AppButton from '~/components/shared/AppButton.vue';

export default {
  name: 'ProfileButtonsGroup',
  components: { AppButton, AppLinkButton },

  data() {
    return {
      link: {
        href: 'https://api.whatsapp.com/send?phone=447300887398',
        target: '_blank',
        rel: 'nofollow noopener',
        icon: 'whatsapp-outline-green',
        label: 'Having issues? Write us on whatsapp'
      },

      button: {
        label: 'Cancel the order'
      }
    };
  }
};
</script>

<style scoped lang="scss">
.profile-buttons-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}
</style>
