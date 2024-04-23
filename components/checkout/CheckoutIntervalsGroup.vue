<template>
  <div class="checkout-intervals-group">
    <div v-for="(item, idx) in list" :key="idx" class="interval-wrapper">
      <div
        class="interval-item"
        :class="{ 'interval-item--error': item.error }"
        @click="$emit('set-interval-type', item.type)"
      >
        <div class="interval-item__title">{{ item.title }}</div>
        <div class="interval-item__value">
          {{ item.value }} <span v-if="!item.value" class="interval-item__value--default">{{ item.default }}</span>
          <svg-icon class="interval-item__icon" name="chevron-right" />
        </div>
        <div v-if="item.value" class="interval-item__delivery">{{ item.delivery }}</div>
      </div>
      <div class="interval-error">
        {{ item.error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutIntervalsGroup',

  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
.checkout-intervals-group {
  display: flex;
  justify-content: space-between;
  width: 100%;

  @include gt-sm {
    gap: 16px;
    min-height: 62px;
    margin-top: 14px;
  }

  @include lt-lg {
    margin-top: 12px;
    gap: 8px;
    min-height: 56px;
  }
}

.interval-wrapper {
  gap: 4px;
  flex: 1;
}

.interval-item {
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  box-sizing: border-box;
  border-radius: 12px;
  user-select: none;
  position: relative;

  @include gt-sm {
    padding: 12px 16px;
    cursor: pointer;
  }

  @include lt-lg {
    padding: 14px 16px;
  }

  &--error {
    border: 1px solid $color-red;
  }

  &__icon {
    width: 16px;
    height: 16px;
  }

  &__title {
    font-family: $golos-medium;
    color: $color-white-grey;

    @include gt-sm {
      font-size: 14px;
      line-height: 18px;
      letter-spacing: -0.01em;
    }

    @include lt-lg {
      font-size: 12px;
      line-height: 15.6px;
      letter-spacing: -0.02em;
    }
  }

  &__value {
    display: flex;
    justify-content: space-between;
    font-family: $golos-regular;

    @include gt-sm {
      font-size: 14px;
      line-height: 18px;
      letter-spacing: -0.02em;
    }

    @include lt-lg {
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.02em;
    }

    &--default {
      color: $color-dark-green;
    }
  }

  &__delivery {
    position: absolute;
    font-family: $golos-medium;
    font-size: 12px;
    font-weight: 500;
    color: $color-dark-green;

    @include gt-sm {
      top: 12px;
      right: 20px;
      font-size: 14px;
      line-height: 20px;
    }

    @include lt-lg {
      top: 14px;
      right: 20px;
      font-size: 12px;
      line-height: 14px;
      letter-spacing: -0.03em;
    }
  }
}

.interval-error {
  font-family: $golos-regular;
  color: $color-red;
  padding: 4px 16px;

  @include gt-sm {
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.02em;
  }

  @include lt-lg {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.02em;
  }
}
</style>
