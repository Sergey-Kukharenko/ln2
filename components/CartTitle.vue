<template>
  <div class="cart-title">
    <div class="cart-title__layout">
      <div class="title">
        <div class="title__label">Cart</div>
        <!--Временно скрыт-->
        <!--<cart-rating :reviews="reviews" :rating="rating" />-->
        <!--<app-fake-trustpilot v-if="$device.isMobileOrTablet" hide-text />-->
      </div>
    </div>
  </div>
</template>

<script>
// import CartRating from '~/components/CartRating.vue';

export default {
  name: 'CartTitle',

  // components: { CartRating, AppFakeTrustpilot: () => import('~/components/fake-trustpilot/AppFakeTrustpilot.vue') },

  data() {
    return {
      reviews: 13074,
      rating: 4.9
    };
  }
};
</script>

<style lang="scss" scoped>
.cart-title {
  &__layout {
    max-width: 1080px;
    margin: 0 auto;

    @include lt-lg {
      padding: 0 16px;
    }
  }
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 56px;

  &__label {
    font-family: $Literata;
    font-weight: 700;

    @include gt-md {
      font-size: 24px;
      line-height: 32px;
    }

    @include lt-lg {
      font-size: 20px;
      line-height: 24px;
    }
  }
}

.trustbox {
  @include gt-sm {
    display: none;
  }

  @include lt-md {
    margin: 0 auto 13px;
  }
}
</style>
