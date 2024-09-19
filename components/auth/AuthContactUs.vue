<template>
  <div class="contact-us">
    <div class="contact-us__content">
      <h3 class="contact-us__title">Contact us</h3>

      <app-button class="contact-us__button" stretch="full" @click="goToWhatsApp">
        <svg-icon class="contact-us__icon" name="whatsapp-outline-white" /> WhatsApp
      </app-button>
      <button class="contact-us__button--secondary" @click="openModal">To call</button>
    </div>
    <app-modal :visible="isModalVisible" theme="centered" @close="closeModal">
      <div class="contact-us__modal">
        You can call the number:
        <div class="contact-us__phone">+44 20 4577 0088</div>
        <app-button class="contact-us__button" stretch="full" @click="closeModal">Close</app-button>
      </div>
    </app-modal>
  </div>
</template>

<script>
import Vue from 'vue';

import AppButton from '~/components/shared/AppButton.vue';
import AppModal from '~/components/shared/AppModal.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AuthContactUs',

  components: {
    AppButton,
    AppModal
  },

  data() {
    return {
      isModalVisible: false
    };
  },

  computed: {
    ...accessorMapper('layout', ['getCall'])
  },

  methods: {
    openModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },

    goToWhatsApp() {
      const link = document.createElement('a');
      link.target = '_blank';
      link.href = this.getCall?.whatsapp;
      link.rel = 'noreferrer noopener nofollow';
      link.click();
    }
  }
});
</script>

<style lang="scss" scoped>
.contact-us {
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    width: 344px;
  }

  &__title {
    font-family: $Literata;
    font-size: 28px;
    font-weight: 700;
    line-height: 33.6px;
    letter-spacing: -0.01em;
    color: $color-dark-grey;
    margin: 0 0 32px 0;
    padding: 0;
    text-align: center;
  }

  &__button {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;

    &--secondary {
      width: 100%;
      height: 44px;
      font-family: $golos-regular;
      font-size: 16px;
      font-weight: 500;
      line-height: 17.6px;
      letter-spacing: -0.02em;
      background-color: #f7f7f7;
      border-radius: 12px;

      &:hover {
        filter: brightness(0.95);
      }
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
  }

  &__modal {
    width: 392px;
    height: 169px;
    box-sizing: border-box;
    padding: 24px 71px;
    color: $color-dark-grey;
    font-family: $golos-regular;
    font-size: 16px;
    font-weight: 400;
    line-height: 20.8px;
    letter-spacing: -0.02em;
    text-align: center;
  }

  &__phone {
    font-family: $golos-medium;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.02em;
    text-align: center;
    margin-bottom: 24px;
  }
}
</style>
