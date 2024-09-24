<template>
  <div class="layout cart-empty">
    <div class="cart-empty__container">
      <img src="/images/rouses-bouquet.jpg" class="cart-empty__image" alt="rouses-bouquet" />

      <div class="cart-empty__caption">
        <h3 class="cart-empty__caption-title">The cart is still empty</h3>
        <div class="cart-empty__caption-text">Products added to the cart will be displayed here</div>
      </div>

      <nuxt-link :to="$options.ALL_CATEGORIES_BUTTON.path">
        <app-button size="md" class="cart-empty__button">Go shopping</app-button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/shared/AppButton.vue';
import { ALL_CATEGORIES_BUTTON } from '~/constants';

export default {
  name: 'CartEmpty',

  components: { AppButton },

  ALL_CATEGORIES_BUTTON
};
</script>

<style scoped lang="scss">
.cart-empty {
  &__container {
    max-width: 488px;
    color: $color-dark-grey;
    text-align: center;
    margin: 0 auto;

    @include gt-sm {
      padding: 76px 0 60px;
    }

    @include lt-md {
      padding: 60px 0 78px;
    }
  }

  &__image {
    display: block;
    color: $color-like-active;

    @include gt-sm {
      width: 136px;
      height: 136px;
      margin: 0 auto -10px;
    }

    @include lt-md {
      width: 100px;
      height: 100px;
      margin: 0 auto -4px;
    }
  }

  &__caption {
    @include gt-sm {
      padding: 24px 0;
    }

    @include lt-md {
      padding: 16px 0;
    }
  }

  &__caption-title {
    font-family: $golos-bold;
    margin: 0;

    @include gt-sm {
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0.01em;
    }

    @include lt-md {
      font-size: 16px;
      line-height: 20px;
      margin: 0 auto;
    }
  }

  &__caption-text {
    font-family: $golos-regular;

    @include gt-sm {
      max-width: 300px;
      font-size: 16px;
      line-height: 24px;
      margin: 10px auto 0;
    }

    @include lt-md {
      max-width: 264px;
      font-size: 14px;
      line-height: 20px;
      margin: 11px auto 0;
    }
  }

  &__button {
    margin: 0 auto;
  }
}
</style>
