<template>
  <div class="count" :class="classes">
    <basket-button
      :theme="theme"
      :advanced-styles-theme="advancedStylesTheme"
      size="small"
      :icon-only="true"
      :disabled="isMinLimit"
      @click="decrement"
    >
      <svg-icon class="count__icon count__icon-minus" name="minus" />
    </basket-button>
    <basket-input
      v-model="passedCount"
      align="center"
      type="number"
      :theme="theme"
      :advanced-styles-theme="advancedStylesTheme"
      size="small"
      :min="0"
      class="count__input"
    />
    <basket-button
      :theme="theme"
      :advanced-styles-theme="advancedStylesTheme"
      size="small"
      :icon-only="true"
      @click="increment"
    >
      <svg-icon class="count__icon count__icon-plus" name="plus" />
    </basket-button>
    <div v-if="isLoading" class="count__loader">
      <app-spinner-loader size="28" />
    </div>
  </div>
</template>

<script>
import AppSpinnerLoader from '~/components/shared/AppSpinnerLoader';
import BasketInput from '~/components/BasketInput.vue';
import BasketButton from '~/components/BasketButton.vue';

export default {
  name: 'BasketProductCount',
  components: {
    BasketButton,
    BasketInput,
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

    isLoading: Boolean
  },

  computed: {
    classes() {
      return {
        [`count--theme-${this.theme}`]: true,
        [`count--advanced-theme-${this.advancedStylesTheme}`]: this.advancedStylesTheme
      };
    },

    isMinLimit() {
      return this.passedCount <= 0;
    },

    passedCount: {
      get() {
        return this.count;
      },

      set(newVal) {
        this.$emit('update:count', +newVal);
      }
    }
  },

  methods: {
    increment() {
      this.passedCount++;
    },

    decrement() {
      this.passedCount--;
    }
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
