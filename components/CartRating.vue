<template>
  <div class="cart-rating">
    <div class="cart-rating__stars">
      <svg-icon v-for="(_, index) in 5" :key="index" name="star" class="cart-rating__icon-star" />
    </div>
    <div class="cart-rating__star">
      <img src="~/assets/sprite/svg/star.svg" width="16" height="16" alt="star" />
      <div class="cart-rating__star-rating">{{ rating }}</div>
    </div>
    <div class="cart-rating__reviews">{{ reviews.toLocaleString('ru') }} reviews</div>
  </div>
</template>

<script>
export default {
  name: 'CartRating',

  props: {
    reviews: {
      type: Number,
      default: 0
    },

    rating: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped lang="scss">
.cart-rating {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;

  @include lt-lg {
    gap: 8px;
  }

  &__reviews {
    font-family: $golos-regular;
    font-size: 14px;
    line-height: 22px;
    color: $color-white-grey;
    letter-spacing: -0.01em;

    @include lt-lg {
      font-size: 12px;
      line-height: 21px;
    }
  }

  &__stars {
    display: flex;
    flex-direction: row;

    @include lt-lg {
      display: none;
    }
  }

  &__star {
    display: flex;
    flex-direction: row;
    gap: 2px;

    & > img {
      margin-top: 1px;
    }

    @include gt-md {
      display: none;
    }
  }

  &__star-rating {
    font-family: $golos-bold;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }

  &__icon-star {
    width: 20px;
    height: 20px;
  }
}
</style>
