<template>
  <div class="cart-tab">
    <button
      v-for="(item, index) in list"
      :key="index"
      class="cart-tab__item"
      :class="getItemClasses(index)"
      @click="onClick(index)"
    >
      <slot :item="item" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'CartTab',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['small', 'medium', 'large', 'extra-large'].includes(value);
      }
    },
    stretch: {
      type: Boolean,
      default: false
    },

    disabledTabs: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      active: 0
    };
  },

  methods: {
    getItemClasses(index) {
      return {
        'cart-tab__item--active': this.active === index,
        'cart-tab__item--stretch': this.stretch,
        [`cart-tab__size-${this.size}`]: true,
        'cart-tab__item--disabled': this.isItemDisabled(index)
      };
    },

    isItemDisabled(index) {
      return this.disabledTabs.includes(index);
    },

    onClick(index) {
      this.active = index;
      this.$emit('click', index);
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-tab {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 -4px;

  &__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 0 auto;

    outline: none;
    background: #ffffff;
    color: $color-dark-grey;
    border-radius: 12px;
    border: 2px solid #dde0e6;
    padding: 0 18px;
    margin: 0 4px;

    @include gt-md {
      border-radius: 12px;
    }

    @include lt-lg {
      height: 36px;
      padding: 0 10px;
      border-radius: 10px;
    }

    &--active {
      border-color: $color-dark-green;
      background: rgba(0, 153, 89, 0.04);
    }

    &--disabled {
      pointer-events: none;
      user-select: none;
    }
  }

  &__size-small {
    height: 32px;
  }

  &__size-medium {
    height: 44px;
  }

  &__size-large {
    height: 56px;

    @include lt-lg {
      height: 40px;
      padding: 0 6px;
    }
  }

  &__size-extra-large {
    height: 60px;
  }

  &__item--stretch {
    flex: 1 1 0;
    width: 0;
    justify-content: center;
  }
}
</style>
