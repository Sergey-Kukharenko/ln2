<template>
  <div class="order">
    <div class="order-list">
      <div
        v-for="(image, i) in mappedPositionImages"
        :key="i"
        class="order-list__item"
        :style="`background-image: ${image}`"
      />
    </div>
    <div class="order-content">
      <div class="order-content__title">Your order</div>
      <div v-if="price.totalSum" class="order-content__details">
        Total £ {{ price.totalSum }} • {{ price.deliveryAmount }} delivery
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { useSizedImage } from '~/helpers';

export default {
  name: 'AppHeaderCheckoutOrder',

  computed: {
    ...mapGetters({ price: 'checkout/checkoutCost', positions: 'checkout/checkoutSplittedPositions' }),

    mappedPositionImages() {
      const positionCount = this.positions.length >= 2 ? 2 : 1;

      const placeholders = [
        'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)',
        'linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)'
      ];

      const mappedPositions = this.positions.map(
        (position) => `url(${useSizedImage({ name: position.image.filename })})`
      );

      return [].concat(mappedPositions, placeholders).slice(0, positionCount);
    }
  }
};
</script>

<style scoped lang="scss">
.order {
  display: flex;
}

.order-list {
  flex-shrink: 0;
  display: flex;

  @include lt-md {
    margin-left: 14px;
  }

  &__item {
    position: relative;
    z-index: 2;
    background: #ccc;
    background-size: contain;
    border-radius: 50%;

    @include gt-sm {
      width: 44px;
      height: 44px;
    }

    @include lt-md {
      width: 36px;
      height: 36px;
    }

    &:not(:first-child) {
      z-index: 1;

      @include gt-sm {
        margin-left: -22px;
      }

      @include lt-md {
        margin-left: -18px;
      }
    }
  }
}

.order-content {
  color: #1f2226;

  @include gt-sm {
    margin-left: 16px;
  }

  @include lt-md {
    margin-left: 8px;
  }

  &__title {
    @include gt-sm {
      font-family: $golos-bold;
      font-size: 16px;
      line-height: 20px;
    }

    @include lt-md {
      font-family: $golos-regular;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.01em;
    }
  }

  &__details {
    font-family: $golos-regular;
    letter-spacing: -0.01em;

    @include gt-sm {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.01em;
    }

    @include lt-md {
      font-size: 12px;
      line-height: 16px;
      color: #7c7c7c;
    }
  }
}
</style>
