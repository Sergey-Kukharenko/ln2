<template>
  <app-modal :visible="visible" theme="full-width modal--centered" @close="$emit('close-modal')">
    <div class="modal">
      <div class="modal__title">
        Contact us <svg-icon name="close-rounded" class="modal__icon" @click="$emit('close-modal')" />
      </div>
      <app-button class="modal__button" stretch="full" @click="goToWhatsApp">
        <svg-icon class="modal__icon" name="whatsapp-outline-white" /> WhatsApp
      </app-button>
      <button class="modal__button--secondary" @click="onPhoneCall">To call</button>
    </div>
  </app-modal>
</template>

<script>
import Vue from 'vue';

import AppButton from '~/components/shared/AppButton.vue';
import AppModal from '~/components/shared/AppModal.vue';
import { useOwnLink } from '~/helpers';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AuthContactUsModal',

  components: {
    AppButton,
    AppModal
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...accessorMapper('layout', ['getCall'])
  },

  methods: {
    onPhoneCall() {
      location.href = 'tel:+442045770088';
    },

    goToWhatsApp() {
      useOwnLink({ href: this.getCall?.whatsapp, rel: 'noreferrer noopener nofollow', target: '_blank' });
    }
  }
});
</script>

<style lang="scss" scoped>
.modal {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: $golos-medium;
    font-size: 18px;
    font-weight: 600;
    line-height: 21.6px;
    letter-spacing: -0.02em;
    margin-bottom: 20px;
  }

  &__icon {
    cursor: pointer;
    width: 24px;
    height: 24px;
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
}
</style>
