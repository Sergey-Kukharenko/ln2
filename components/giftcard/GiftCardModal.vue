<template>
  <div class="giftcard-modal">
    <app-modal :theme="modalTheme" :visible="isVisible" @close="$emit('close-modal')">
      <gift-card-modal-form :is-editable="isEditable" :text="giftCartText" @close-modal="$emit('close-modal')" />
    </app-modal>
  </div>
</template>

<script>
import AppModal from '~/components/shared/AppModal.vue';

export default {
  name: 'GiftCardModal',

  components: {
    AppModal,
    GiftCardModalForm: () => import('~/components/giftcard/GiftCardModalForm.vue')
  },

  props: {
    isVisible: {
      type: Boolean,
      default: false
    },

    product: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    modalTheme() {
      return this.$device.isMobileOrTablet ? 'mobile-full' : 'centered';
    },

    isEditable() {
      return !!this.product?.id;
    },

    giftCartText() {
      return this.product.giftCardText || '';
    }
  }
};
</script>
