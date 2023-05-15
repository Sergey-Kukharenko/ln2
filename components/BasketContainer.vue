<template>
  <div class="basket-container">
    <section class="basket-container__layout basket-container__wrapper">
      <div class="basket-container__main">
        <basket-product-list />
        <app-promo-code />
      </div>
      <basket-order />
    </section>
    <section class="basket-container__promotions">
      <app-promotions has-title />
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// import ToastCardDeals from '~/components/toast-cards/ToastCardDeals';

export default {
  name: 'BasketContainer',

  mounted() {
    this.fetchPromotions();

    // Временно скрыт
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
  },

  methods: {
    ...mapActions({ fetchPromotions: 'pages/home/fetchPromotions' })
  }
};
</script>

<style lang="scss" scoped>
.basket-container {
  width: 100%;

  &__layout {
    max-width: 1080px;
    margin: 0 auto;

    @include lt-lg {
      padding: 0 16px;
    }
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
