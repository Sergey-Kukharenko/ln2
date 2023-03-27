<template>
  <div class="count">
    <basket-button theme="grey" size="small" :icon-only="true" :disabled="isMinLimit" @click="decrement">
      <svg-icon class="count__icon-minus" name="minus" />
    </basket-button>
    <basket-input v-model="passedCount" align="center" type="number" size="small" :min="0" class="count__input" />
    <basket-button theme="grey" size="small" :icon-only="true" @click="increment">
      <svg-icon class="count__icon-plus" name="plus" />
    </basket-button>
    <div v-if="isLoading" class="count__loader">
      <app-spinner-loader size="28" />
    </div>
  </div>
</template>

<script>
import AppSpinnerLoader from '~/components/shared/AppSpinnerLoader';

export default {
  name: 'BasketProductCount',
  components: {
    AppSpinnerLoader
  },
  props: {
    count: {
      type: Number,
      default: 1
    },

    isLoading: Boolean
  },

  computed: {
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

  &__icon-minus {
    width: 12px;
    height: 2px;
  }

  &__icon-plus {
    width: 12px;
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
}
</style>
