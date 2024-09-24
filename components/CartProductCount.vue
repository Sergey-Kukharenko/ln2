<template>
  <div class="count" :class="classes">
    <cart-button
      :theme="theme"
      :advanced-styles-theme="advancedStylesTheme"
      size="small"
      icon-only
      :disabled="isMinLimit"
      @click="decrement"
    >
      <svg-icon class="count__icon count__icon-minus" name="minus" />
    </cart-button>
    <cart-input
      v-model="passedCount"
      align="center"
      type="number"
      :theme="inputTheme"
      :advanced-styles-theme="advancedStylesTheme"
      size="small"
      :min="0"
      class="count__input"
      @input="onUpdatePassedCount"
    />
    <cart-button
      :theme="theme"
      :advanced-styles-theme="advancedStylesTheme"
      size="small"
      icon-only
      :disabled="disableIncrement"
      @click="increment"
    >
      <svg-icon class="count__icon count__icon-plus" name="plus" />
    </cart-button>

    <div v-if="isLoading" class="count__loader">
      <app-spinner-loader size="28" />
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';

import CartButton from '~/components/CartButton.vue';
import CartInput from '~/components/CartInput.vue';
import AppSpinnerLoader from '~/components/shared/AppSpinnerLoader.vue';

const CART_UPDATE_DEBOUNCE_TIME_MS = 300;

export default {
  name: 'CartProductCount',
  components: {
    CartButton,
    CartInput,
    AppSpinnerLoader
  },
  props: {
    theme: {
      type: String,
      default: 'grey',
      validate(value) {
        return ['green', 'grey', 'turquoise'].includes(value);
      }
    },

    advancedStylesTheme: {
      type: String,
      default: '',
      validate(value) {
        return ['', 'gift'].includes(value);
      }
    },

    count: {
      type: Number,
      default: 1
    },

    isLoading: Boolean,

    disableIncrement: Boolean,

    greenInput: Boolean
  },

  data() {
    return {
      passedCount: this.count
    };
  },

  computed: {
    inputTheme() {
      return this.greenInput && this.$route.name === 'gifts' ? 'green' : this.theme;
    },

    classes() {
      return {
        [`count--theme-${this.theme}`]: true,
        [`count--advanced-theme-${this.advancedStylesTheme}`]: this.advancedStylesTheme
      };
    },

    isMinLimit() {
      return this.passedCount <= 0;
    }
  },

  methods: {
    increment() {
      this.passedCount += 1;
      this.updateCount();
    },

    decrement() {
      this.passedCount -= 1;
      this.updateCount();
    },

    onUpdatePassedCount(v) {
      this.passedCount = Number(v);
      this.updateCount();
    },

    updateCount: debounce(function () {
      this.$emit('update:count', this.passedCount);
    }, CART_UPDATE_DEBOUNCE_TIME_MS)
  }
};
</script>

<style lang="scss" scoped>
.count {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  &__icon {
    width: 12px;
    color: $color-white-grey;
  }

  &__icon-minus {
    height: 2px;
  }

  &__icon-plus {
    height: 12px;
  }

  &__input {
    margin: 0 4px;
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(#fff, 0.8);
    cursor: not-allowed;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  &--theme-grey {
    & .count__icon {
      color: $color-white-grey;
    }
  }

  &--theme-green {
    & .count__icon {
      color: #eaeaea;
    }
  }

  &--theme-turquoise {
    & .count__icon {
      color: $color-green;
    }
  }
}
</style>
