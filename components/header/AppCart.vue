<template>
  <nuxt-link :to="goToCart" :class="classNames">
    <figure class="cart__figure">
      <svg-icon :name="getImg" class="cart__icon" />
      <app-counter v-if="isCartExist" :count="count" class="cart__counter" />
    </figure>
    <div class="cart__figcaption">{{ isTotal }}</div>
  </nuxt-link>
</template>

<script>
import Vue from 'vue';

import AppCounter from '@/components/shared/AppCounter.vue';
import { useClassName, useSetClassName } from '@/helpers';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AppCart',
  components: { AppCounter },
  props: {
    theme: {
      type: String,
      default: ''
    }
  },

  computed: {
    ...accessorMapper('cart', ['isCartExist']),

    count() {
      return this.$accessor.cart.getCount;
    },

    total() {
      return this.$accessor.cart.getTotal;
    },

    getImg() {
      return this.$device.isMobileOrTablet ? 'cart-bag' : 'cart-outline';
    },

    goToCart() {
      return this.isCartExist ? '/cart' : '';
    },

    isTotal() {
      return this.isCartExist ? this.total : 'Cart';
    },

    classNames() {
      return [useClassName(this.$props, 'cart'), useSetClassName(this.isCartExist, 'cart--active')];
    }
  }
});
</script>

<style lang="scss" scoped>
.cart {
  color: #ccc;
  cursor: pointer;

  @include lt-md {
    display: flex;
    align-items: center;
    justify-content: center;
    order: 4;
    padding: 6px;
    color: black;
    margin-right: -6px;
  }

  &:hover {
    opacity: 0.6;
  }

  &__figure {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0 auto;

    @include gt-sm {
      width: 28px;
      height: 28px;
    }
  }

  &__icon {
    @include gt-sm {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    @include lt-md {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }
  }

  &__figcaption {
    @include gt-sm {
      font-family: $golos-medium;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      margin-top: 7px;
      color: $color-light-grey;
    }

    @include lt-md {
      display: none;
    }
  }

  &__counter {
    background: currentColor;
  }

  &--inline {
    @include gt-sm {
      display: flex;
      align-items: center;
    }

    .cart__figure {
      @include gt-sm {
        width: 16px;
        height: 16px;
      }
    }

    .cart__figcaption {
      @include gt-sm {
        margin: 0 0 0 9px;
      }
    }

    &.cart--active {
      .cart__icon,
      .cart__figcaption {
        @include gt-sm {
          color: $color-white-grey;
        }
      }

      &:hover {
        .cart__icon,
        .cart__figcaption {
          @include gt-sm {
            color: $color-green;
          }
        }
      }

      .cart__figcaption {
        @include gt-sm {
          margin: 0 0 0 20px;
        }
      }
    }

    .cart__icon {
      @include gt-sm {
        width: 16px;
        height: 16px;
      }
    }

    .cart__counter {
      width: 16px;
      height: 16px;
      font-size: 8px;
    }
  }

  &--active {
    color: $color-green;

    .cart__figcaption {
      color: inherit;
    }
  }
}
</style>
