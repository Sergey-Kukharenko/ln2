<template>
  <div class="profile-buttons-group">
    <app-link-button :link="link">{{ link.label }}</app-link-button>
    <!--    Временно скрыт-->
    <!--    <app-button v-if="isOrderProcessing" theme="text-only" stretch="full" behavior="custom" @click="open"-->
    <!--      >{{ button.label }}-->
    <!--    </app-button>-->

    <!--    <profile-modal :is-visible="isVisible" @close-modal="close">-->
    <!--      <template #title>{{ modal.title }}</template>-->
    <!--      <template #buttons>-->
    <!--        <app-button behavior="custom" @click="onCancel">{{ modal.buttons.exit }}</app-button>-->
    <!--        <app-button theme="transparent" behavior="custom" @click="close">{{ modal.buttons.cancel }}</app-button>-->
    <!--      </template>-->
    <!--    </profile-modal>-->
    <!--    <profile-modal-processing :is-show="isCancellationProcess" :status="status" />-->
  </div>
</template>

<script>
import AppLinkButton from '~/components/AppLinkButton.vue';
// import ProfileModal from '~/components/profile/ProfileModal.vue';
// import ProfileModalProcessing from '~/components/profile/ProfileModalProcessing.vue';
// import AppButton from '~/components/shared/AppButton.vue';
import { disableScroll, enableScroll } from '~/helpers/scrollLock';
import { accessorMapper } from '~/store';

export default {
  name: 'ProfileButtonsGroup',

  components: {
    // ProfileModalProcessing,
    // ProfileModal,
    // AppButton,
    AppLinkButton
  },

  props: {
    id: {
      type: String,
      default: ''
    }
  },

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
      },

      modal: {
        title: 'Are you sure you want to cancel the order?',
        buttons: {
          exit: 'Yes, cancel',
          cancel: 'Back'
        }
      },
      status: 'loading',
      isVisible: false,
      isCancellationProcess: false
    };
  },

  computed: {
    isOrderProcessing() {
      return this.status !== 'cancel';
    }
  },

  methods: {
    ...accessorMapper('profile-order', ['cancelOrder']),

    open() {
      this.isVisible = true;
      disableScroll();
    },

    close() {
      this.isVisible = false;
      enableScroll();
    },

    async onCancel() {
      this.close();
      this.isCancellationProcess = true;
      this.status = '';

      try {
        const { success } = await this.cancelOrder(this.id);
        if (!success) {
          console.log('The data was not recorded on the backend');
        }
        await this.$router.push({ name: 'profile-dashboard' });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.profile-buttons-group {
  display: flex;
  flex-direction: column;
  gap: 12px;

  @include gt-sm {
    margin-top: 24px;
  }

  @include lt-md {
    margin-top: 16px;
  }
}
</style>
