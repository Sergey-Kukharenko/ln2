<template>
  <div class="cart-container">
    <section class="cart-container__layout cart-container__wrapper">
      <div class="cart-container__main">
        <cart-product-list />
        <!-- <gift-card-item v-if="isGiftCardItemVisible" @open-modal="openGiftCardModal" />
        <gift-card-modal
          :is-visible="isGiftCardModalVisible"
          @create="closeGiftCardModal"
          @close-modal="closeGiftCardModal"
        /> -->
      </div>
      <cart-order />
    </section>
    <section class="cart-container__promotions">
      <app-promotions :promotions="$options.PROMOTIONS" has-title />
    </section>
  </div>
</template>

<script>
import AppPromotions from '~/components/AppPromotions.vue';
import CartOrder from '~/components/CartOrder.vue';
import CartProductList from '~/components/CartProductList.vue';
import promotions from '~/mocks/promotions';
// import ToastCardDeals from '~/components/toast-cards/ToastCardDeals';

export default {
  name: 'CartContainer',
  components: {
    AppPromotions,
    CartOrder,
    CartProductList
    // GiftCardItem: () => import('~/components/giftcard/GiftCardItem.vue'),
    // GiftCardModal: () => import('~/components/giftcard/GiftCardModal.vue')
  },

  PROMOTIONS: promotions,

  data() {
    return {
      isGiftCardModalVisible: false
    };
  },

  computed: {
    isGiftCardItemVisible() {
      return !this.$accessor.cart.getGiftCard?.offer_id;
    }
  },

  methods: {
    openGiftCardModal() {
      this.isGiftCardModalVisible = true;
    },

    closeGiftCardModal() {
      this.isGiftCardModalVisible = false;
    }
  }

  // Временно скрыт
  // mounted() {
  // const content = {
  //   component: ToastCardDeals,
  //   props: {
  //     img: {
  //       src: 'https://via.placeholder.com/252x300',
  //       size: { width: 32, height: 32 }
  //     },
  //     text: 'Postcard added to the order'
  //   }
  // };
  //
  // const options = {
  //   timeout: 3000,
  //   icon: false,
  //   closeButton: false,
  //   position: 'bottom-left',
  //   class: ['toast', 'toast--width-large', 'toast--theme-yellow', 'toast--height-small']
  // };
  //
  // this.$toast(content, options);
  // }
};
</script>

<style lang="scss" scoped>
.cart-container {
  width: 100%;

  &__layout {
    max-width: 1080px;
    margin: 0 auto;
  }

  &__wrapper {
    display: flex;

    @include gt-md {
      flex-direction: row;
    }

    @include lt-lg {
      flex-direction: column;
    }
  }

  &__main {
    flex: 1 1 auto;
    min-width: 0;
    max-width: 100%;

    @include gt-md {
      margin-right: 24px;
    }

    @include lt-lg {
      margin-bottom: 12px;
    }
  }

  &__promotions {
    margin: 40px 0;
  }
}
</style>
