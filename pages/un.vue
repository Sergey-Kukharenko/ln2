<template>
  <div class="unsubscribe">
    <div class="container">
      <img src="/images/mailbox.jpg" alt="mailbox" class="container__img" />
      <h3 class="container__title">Subscription preferences</h3>
      <div class="container__description">
        We're sorry to see you go! If you no longer wish to receive SMS updates on new products, special offers and
        exclusive promotions from us, please click 'Unsubscribe.' By doing so, you'll be removed from our SMS marketing
        list.
      </div>
      <app-button class="container__btn" @click="onUnsubscribe">Unsubscribe</app-button>
    </div>

    <modal-notification
      :is-visible="isVisible"
      icon="check-unsubscribe"
      :message="message"
      text-size="large"
      @close-modal="closeModal"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AppButton from '~/components/shared/AppButton.vue';
import ModalNotification from '~/components/ModalNotification.vue';

export default {
  name: 'UnsubscribePage',

  components: { ModalNotification, AppButton },

  layout: 'unsubscribe',

  data() {
    return {
      isVisible: false,
      message: 'You have successfully unsubscribed from the mailing list'
    };
  },

  methods: {
    ...mapActions({
      unsubscribeFromSMS: 'user/unsubscribeFromSMS'
    }),

    openModal() {
      this.isVisible = true;
    },

    closeModal() {
      this.isVisible = false;
    },

    async onUnsubscribe() {
      const userId = this.$route.query?.code;
      if (!userId) return;

      try {
        const { success } = await this.unsubscribeFromSMS({ userId });
        success && this.openModal();
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  max-width: 458px;

  margin: 0 auto;
  text-align: center;

  @include gt-sm {
    padding: 68px 20px;
  }

  @include lt-md {
    padding: 44px 20px;
  }

  &__img {
    display: block;
    margin: 0 auto;

    @include gt-sm {
      width: 149.533px;
      height: 146.867px;
      margin-bottom: 42.6px;
    }

    @include lt-md {
      width: 112.15px;
      height: 110.15px;
      margin-bottom: 28px;
    }
  }

  &__title {
    font-family: $Literata;
    font-style: normal;
    color: $color-dark-grey;
    margin: 0;

    @include gt-sm {
      font-size: 32px;
      font-weight: 600;
      line-height: 40px;
      letter-spacing: -0.32px;
    }

    @include lt-md {
      font-size: 20px;
      font-weight: 700;
      line-height: 120%;
      letter-spacing: -0.2px;
    }
  }

  &__description {
    font-family: $golos-regular;
    color: $color-dark-grey;
    font-size: 14px;
    letter-spacing: -0.14px;
    margin-top: 16px;

    @include gt-sm {
      line-height: 20px;
    }

    @include lt-md {
      line-height: 130%;
    }
  }

  &__btn {
    min-width: 288px;
    margin: 24px auto 0;
  }
}
</style>
