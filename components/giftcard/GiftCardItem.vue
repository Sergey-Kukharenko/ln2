<template>
  <div class="giftcard__wrapper">
    <div class="giftcard giftcard__row">
      <div class="giftcard__col giftcard__image">
        <img src="/images/postcard-frame.png" alt="" />
      </div>
      <div class="giftcard__col giftcard__content">
        <div class="giftcard__text">Add your favourite gift card</div>
        <div class="giftcard__bottom">
          <span class="giftcard__price">£2.99</span>
          <div class="giftcard__button--mobile">
            <button @click="$emit('open-modal')">Add</button>
          </div>
        </div>
      </div>
      <div class="giftcard__col giftcard__button">
        <button @click="$emit('open-modal')">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GiftCardItem'
};
</script>

<style lang="scss" scoped>
.giftcard {
  background: #ebfaf0;
  box-sizing: border-box;
  border-radius: 20px;

  @include gt-sm {
    padding: 10px 23px 10px 10px;
    height: 140px;
  }

  @include lt-lg {
    padding: 16px;
  }

  button {
    color: #fff;
    background: #ffc33d;
    border-radius: 10px;
  }

  &__wrapper {
    border-top: 1px solid #dde0e6;

    @include gt-sm {
      padding: 24px 0px;
    }

    @include lt-md {
      padding: 20px 0;
    }
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include lt-md {
      gap: 8px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;

    @include gt-sm {
      gap: 15px;
      width: 257px;
    }

    @include lt-md {
      gap: 12px;
      width: 80%;
    }
  }

  &__text {
    letter-spacing: -0.02em;

    @include gt-sm {
      font-family: $golos-medium;
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
    }
    @include lt-md {
      font-family: $golos-regular;
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
    }
  }

  &__image {
    @include gt-sm {
      width: 120px;
    }

    @include lt-md {
      width: 80px;
    }

    & img {
      @include gt-sm {
        width: 120px;
        height: 120px;
      }

      @include lt-lg {
        width: 80px;
        height: 80px;
      }
    }
  }

  &__price {
    font-family: $golos-bold;

    @include gt-sm {
      font-size: 20px;
      font-weight: 600;
      line-height: 24px;
      letter-spacing: -0.02em;
    }

    @include lt-md {
      font-size: 18px;
      font-weight: 500;
      line-height: 20px;
    }
  }

  &__bottom {
    @include lt-md {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__button {
    @include gt-sm {
      display: flex;
      justify-content: flex-end;
      width: 257px;
    }

    @include lt-md {
      display: none;
    }

    & button {
      @include gt-sm {
        width: 124px;
        height: 36px;
        font-family: $golos-regular;
        font-size: 16px;
        font-weight: 500;
        line-height: 17.6px;
        letter-spacing: -0.02em;

        &:hover:not(:disabled) {
          background: #ffc33d;
          box-shadow: 2px 4px 7px #d9d9d9;
          cursor: pointer;
        }

        &:active:not(:disabled) {
          box-shadow: 0 0 0 $bg-grey;
        }
      }
    }

    &--mobile {
      @include gt-sm {
        display: none;
      }

      @include lt-md {
        display: block;
      }

      & button {
        @include lt-md {
          width: 75px;
          height: 32px;
          font-family: $golos-regular;
          font-size: 14px;
          font-weight: 400;
          line-height: 18.2px;
          letter-spacing: -0.01em;
        }
      }
    }
  }
}
</style>
