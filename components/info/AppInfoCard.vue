<template>
  <div class="card" :class="className" :style="{ background: bgColor }">
    <div v-if="number" class="card__number" :class="{ 'has-step': hasStep }">
      <span v-if="hasStep" class="card__number-step">Step</span>
      <span>{{ number }}</span>
    </div>
    <div class="card__content">
      <slot name="link" />
      <slot name="title" />
      <slot name="text" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppInfoCard',

  props: {
    number: {
      type: [Number, String],
      default: ''
    },

    bgColor: {
      type: String,
      default: '#F7F7F7'
    },

    theme: {
      type: String,
      default: '',
      validate(value) {
        return ['extended'].includes(value);
      }
    },

    hasStep: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    className() {
      return {
        [`card--${this.theme}`]: true
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;

  border-radius: 24px;

  flex: 1;

  @include gt-sm {
    gap: 24px;
  }

  @include lt-md {
    gap: 16px;
  }

  &__number {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    font-family: $golos-regular;
    letter-spacing: -0.14px;
    color: $color-dark-grey;
    user-select: none;
    font-size: 14px;
    line-height: 20px;
    width: 26px;
    height: 26px;
    border-radius: 50%;

    &.has-step {
      width: auto;
      height: auto;
      padding: 3px 9px;
      border-radius: 16px;

      & span:first-child {
        margin-right: 3px;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;

    @include gt-sm {
      gap: 16px;
    }

    @include lt-md {
      flex: 1;
      justify-content: space-between;
      gap: 12px;
    }
  }

  &--extended {
    @include gt-sm {
      min-height: 214px;
    }

    .card {
      &__content {
        gap: initial;
      }
    }
  }
}
</style>
